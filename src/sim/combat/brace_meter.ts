// Brace (Whetstorm W4), the pure half: the tuning table, the lazily derived
// meter, the frontal arc test and the per-hit area note. A leaf with no
// SimContext, so the movement kernel (player_motion.ts), the death path, the
// Sidestep, the mob mechanic drivers and the client mirror can all read it
// without an import cycle. The rules live in combat/brace.ts.

import { type BraceState, DT, type Entity, normAngle, type Vec3 } from '../types';

/** Starting values for playtests. There is no classic formula behind any of
 *  them (the classic shield block is a hit-table roll, not a held stance), so
 *  retune freely here and nowhere else. */
export const BRACE_TUNING = {
  /** The meter when full. */
  meterMax: 100,
  /** Meter drained per second while the stance is held. */
  drainPerSec: 10,
  /** Meter a raise spends up front, so flicker-raising into each hit costs. */
  raiseCost: 5,
  /** Meter a blocked hit drains, per whole max HP of incoming damage (a hit
   *  worth a tenth of max HP costs 10). */
  blockDrainPerMaxHp: 100,
  /** Meter regained per second while the stance is down. */
  refillPerSec: 20,
  /** After a break, the meter must refill to this before the next raise. */
  recoverAt: 40,
  /** The frontal arc, in degrees total, centered on the player's facing. */
  arcDeg: 120,
  /** Run speed while braced is capped at this fraction (a stronger slow
   *  still wins; no buff lifts it). */
  moveSpeedMult: 0.5,
} as const;

/** Half the frontal arc, in radians. */
export const BRACE_HALF_ARC = (BRACE_TUNING.arcDeg * Math.PI) / 180 / 2;

/** A source closer than this sits underfoot: there is no front to judge, so
 *  the hit lands. */
const UNDERFOOT_YD = 0.1;

const TICKS_PER_SEC = Math.round(1 / DT);

/** Meter values are stored to two decimals, so the wire stays short. */
function quantize(meter: number): number {
  return Math.round(meter * 100) / 100;
}

type MeterFields = Pick<BraceState, 'up' | 'meter' | 'anchorTick'>;

/** The live meter at `tick`, derived from the stored anchor without mutating
 *  it: full before the first raise, draining while up, refilling while down.
 *  Integer tick math over the whole-number rates keeps it exact on every host. */
export function braceMeterAt(s: MeterFields | undefined, tick: number): number {
  if (!s) return BRACE_TUNING.meterMax;
  const ticks = Math.max(0, tick - s.anchorTick);
  if (s.up) return Math.max(0, s.meter - (ticks * BRACE_TUNING.drainPerSec) / TICKS_PER_SEC);
  return Math.min(
    BRACE_TUNING.meterMax,
    s.meter + (ticks * BRACE_TUNING.refillPerSec) / TICKS_PER_SEC,
  );
}

/** Whether a break still bars the next raise at `tick`. */
export function braceBrokenAt(
  s: (MeterFields & Pick<BraceState, 'broken'>) | undefined,
  tick: number,
): boolean {
  return s?.broken === true && braceMeterAt(s, tick) < BRACE_TUNING.recoverAt;
}

export function newBraceState(): BraceState {
  return {
    up: false,
    meter: BRACE_TUNING.meterMax,
    anchorTick: 0,
    broken: false,
    areaSourceId: -1,
    areaX: 0,
    areaZ: 0,
    areaUnblockable: false,
  };
}

/** Raise the stance at `tick` from a live meter of `meter`, spending the raise
 *  cost. The caller has already checked the meter rule. */
export function raiseBraceAt(e: Entity, tick: number, meter: number): void {
  e.brace ??= newBraceState();
  const s = e.brace;
  s.meter = quantize(Math.max(0, meter - BRACE_TUNING.raiseCost));
  s.anchorTick = tick;
  s.up = true;
  s.broken = false;
}

/** Lower the stance at `tick` (free). `broken` marks an emptied meter. True
 *  when it was up. Safe on an entity that never braced. */
export function lowerBrace(e: Entity, tick: number, broken = false): boolean {
  const s = e.brace;
  if (!s?.up) return false;
  s.meter = quantize(braceMeterAt(s, tick));
  s.anchorTick = tick;
  s.up = false;
  s.broken = broken;
  return true;
}

/** The client mirror of another entity's `brc` presence bit: only `up` is
 *  meaningful there (the self meter rides `brs`), and it is what makes the
 *  client's own movement kernel apply the slow. */
export function markBraceMirror(e: Entity, up: boolean): void {
  if (up) {
    e.brace ??= newBraceState();
    e.brace.up = true;
  } else if (e.brace) e.brace.up = false;
}

/** Drain the meter of a raised stance for a blocked hit of `amount` against
 *  a body of `maxHp`. The meter floors at 0; the break waits for the brace tick. */
export function drainBraceForBlock(e: Entity, tick: number, amount: number): void {
  const s = e.brace;
  if (!s?.up || amount <= 0) return;
  const cost = (amount / Math.max(1, e.maxHp)) * BRACE_TUNING.blockDrainPerMaxHp;
  s.meter = quantize(Math.max(0, braceMeterAt(s, tick) - cost));
  s.anchorTick = tick;
}

/** Whether a source at (originX, originZ) sits inside `target`'s frontal arc.
 *  Facing f points along (sin f, cos f), the angleTo convention, so this is
 *  the same test the breath cone runs from the other side. Edges count. */
export function braceArcCovers(
  target: { pos: Vec3; facing: number },
  originX: number,
  originZ: number,
): boolean {
  const dx = originX - target.pos.x;
  const dz = originZ - target.pos.z;
  if (dx * dx + dz * dz < UNDERFOOT_YD * UNDERFOOT_YD) return false;
  return Math.abs(normAngle(Math.atan2(dx, dz) - target.facing)) <= BRACE_HALF_ARC + 1e-9;
}

/** An area mechanic is about to hit `target`: until endBraceAreaHit, every hit
 *  and rider from `source` is judged from `origin` (the telegraphed ring, not
 *  where the mob stands now) and lands from any side when `unblockable`.
 *  A no-op for a player who never braced, so it touches no other state. */
export function beginBraceAreaHit(
  target: Entity,
  source: Entity,
  origin: Vec3,
  unblockable: boolean | undefined,
): void {
  const s = target.brace;
  if (!s) return;
  s.areaSourceId = source.id;
  s.areaX = origin.x;
  s.areaZ = origin.z;
  s.areaUnblockable = unblockable === true;
}

/** The area mechanic is done with `target` (its damage and riders resolved). */
export function endBraceAreaHit(target: Entity): void {
  const s = target.brace;
  if (s) s.areaSourceId = -1;
}

/** The HUD readout (IWorld.braceStatus). */
export interface BraceStatus {
  /** The stance is raised. */
  up: boolean;
  /** The live meter, 0 to meterMax. */
  meter: number;
  meterMax: number;
  /** From a break until the meter refills to recoverAt. */
  broken: boolean;
  recoverAt: number;
  /** A raise now would pass the meter rule (always true while up). */
  ready: boolean;
}

export function createBraceStatus(): BraceStatus {
  return {
    up: false,
    meter: BRACE_TUNING.meterMax,
    meterMax: BRACE_TUNING.meterMax,
    broken: false,
    recoverAt: BRACE_TUNING.recoverAt,
    ready: true,
  };
}

/** Fill the HUD readout for a stored stance at `tick` (a fractional tick is
 *  fine: the client ages the last snapshot by its own clock). */
export function fillBraceStatus(
  s: (MeterFields & Pick<BraceState, 'broken'>) | undefined,
  tick: number,
  out: BraceStatus,
): BraceStatus {
  const meter = braceMeterAt(s, tick);
  const broken = braceBrokenAt(s, tick);
  out.up = s?.up === true;
  out.meter = meter;
  out.meterMax = BRACE_TUNING.meterMax;
  out.broken = broken;
  out.recoverAt = BRACE_TUNING.recoverAt;
  out.ready = out.up || (!broken && meter >= BRACE_TUNING.raiseCost);
  return out;
}

/** The self wire's `brs` value: [up, meter, anchorTick, broken] with the two
 *  flags as 0/1, null before the first raise. It moves only on a raise, a
 *  lower, a blocked hit or a break; the client derives the rest. */
export function braceWire(e: Pick<Entity, 'brace'>): [number, number, number, number] | null {
  const s = e.brace;
  return s ? [s.up ? 1 : 0, s.meter, s.anchorTick, s.broken ? 1 : 0] : null;
}
