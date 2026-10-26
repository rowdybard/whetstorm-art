// Sidestep (Whetstorm W3): the action-combat dodge. A short dash in the
// direction the player steers, with an evade window that opens on the first
// dash tick. It layers on top of auto-attack and classic targeting: nothing
// else about combat changes.
//
// The rules, stated once:
//   - The dash covers SIDESTEP_TUNING.distanceYd over dashTicks ticks through
//     the shared walking kernel (player_motion.ts stepPlayerMotion), so walls,
//     slopes, step-ups, fences, shallow water and the instanced-region resolver
//     treat it exactly like walking. Only the speed and the heading differ.
//   - The dash is movement, so it interrupts the player's own cast the way
//     walking would: a cast that cannot be cast while moving is cancelled on
//     the first dash tick, a mobile cast survives. A Sidestep is refused, and
//     spends nothing, while channeling an uninterruptible ability (Bladestorm
//     today): that channel is a commitment by owner ruling, and a dash would
//     stack the evade window on a channel that already ignores pushback.
//   - The evade window is SIDESTEP_WINDOW_TICKS long and opens on the tick the
//     command is processed. While it is open, every hit from an enemy resolves
//     as an Evade for no damage (sidestepEvadesHit, consulted by dealDamage),
//     every harmful aura an enemy applies is refused (sidestepRefusesAura,
//     Sim.applyAura), and every enemy knockback is refused
//     (sidestepRefusesKnockback, knockback.ts). These are the three funnels
//     every hostile effect passes through, the Ice Block precedent, and all
//     three ask the one predicate below (sidestepWindowOpen plus the enemy
//     rule), so there is one central check.
//   - An evaded hit returns before any threat, combat entry, pushback, rage or
//     tap is recorded: it is the same early return a leashing mob's Evade
//     takes. A mob that already holds the player on its hate table keeps them
//     in combat; a hit that only would have started combat does not. A DoT
//     tick the window evades feeds its source nothing either: no leech heal,
//     no bleed stage (combat/auras.ts asks sidestepEvadesHit after the tick).
//   - Not covered, on purpose: sourceless environmental damage (falling,
//     drowning, fatigue, lava, a death zone) and self damage still land, and
//     an unbreakable encounter control (cc.ts isUnbreakableControlAura) still
//     applies, as it does through Ice Block.
//   - Charges: the bank holds maxCharges and regains one every rechargeTicks.
//     The live count is derived from the stored bank and the tick (no
//     per-tick upkeep), so a full bank costs nothing at rest.
//
// Latency: the window starts when the server processes the command, never
// earlier, and the server never rewinds a hit it has already resolved. A
// telegraph reaches the client one way late and the press travels one way
// back, so online the press must land at least one round trip (plus up to one
// tick of command quantization) before the impact the client sees, and covers
// it if made less than WINDOW + RTT before. At 150 ms RTT the band is 200 to
// 650 ms ahead of the visible impact. graceTicks is the part of the window
// past the base evadeTicks: it forgives the early press latency pushes
// players into. Worked margins for Old Peatfire: tests/sidestep.test.ts.
//
// Every tuning value below is a STARTING value for playtests. There is no
// classic formula behind any of them (the classic dodge is a hit-table roll,
// not a dash), so retune freely here and nowhere else.
//
// Player text: the two refusals are single-line English ctx.error literals with
// matcher rows in src/ui/sim_i18n.ts (the S3 guard scans this file).

import { isDebuffAura } from '../aura_classify';
import { ABILITIES } from '../data';
import { refusedWhileDead } from '../dead_gate';
import { type PlayerMotionDeps, stepPlayerMotion } from '../player_motion';
import type { PlayerMeta } from '../sim';
import type { SimContext } from '../sim_context';
import {
  type Aura,
  DT,
  type Entity,
  type MoveInput,
  RUN_SPEED,
  type SidestepState,
} from '../types';
import { gliderOwnsMovement } from '../world_quest_glider';
import { wispMazeOwnsMovement } from '../world_quest_wisp_maze';
import { lowerBrace } from './brace_meter';
import { hasUnbreakableMovementLock, isRooted, isUnbreakableControlAura } from './cc';

/** Starting values, no classic formula behind any of them (see the header). */
export const SIDESTEP_TUNING = {
  /** Yards the dash covers on flat open ground. */
  distanceYd: 6,
  /** Ticks the dash runs (0.25 s at 20 Hz). */
  dashTicks: 5,
  /** Base evade window in ticks, opening on the first dash tick (0.4 s). */
  evadeTicks: 8,
  /** Latency grace added to the window (0.1 s): forgives an early press. */
  graceTicks: 2,
  /** Charges the bank holds when full. */
  maxCharges: 2,
  /** Ticks to regain one charge (5.5 s), one charge at a time. */
  rechargeTicks: 110,
} as const;

/** The whole evade window in ticks: the base window plus the latency grace. */
export const SIDESTEP_WINDOW_TICKS = SIDESTEP_TUNING.evadeTicks + SIDESTEP_TUNING.graceTicks;

/** Dash speed in yards per second (24 with the starting values). */
export const SIDESTEP_DASH_SPEED = SIDESTEP_TUNING.distanceYd / (SIDESTEP_TUNING.dashTicks * DT);

/** An external move of more than this between two dash ticks ends the dash. */
const EXTERNAL_MOVE_YD = 1;

/** Relative to the way the player faces: the eight stick and key directions. */
export const SIDESTEP_DIRECTIONS = [
  'forward',
  'back',
  'left',
  'right',
  'forwardLeft',
  'forwardRight',
  'backLeft',
  'backRight',
] as const;

export type SidestepDirection = (typeof SIDESTEP_DIRECTIONS)[number];

/** The wire guard: anything else is dropped before the sim sees it. */
export function isSidestepDirection(value: unknown): value is SidestepDirection {
  return typeof value === 'string' && (SIDESTEP_DIRECTIONS as readonly string[]).includes(value);
}

/** The HUD readout (IWorld.sidestepStatus). Seconds, not ticks. */
export interface SidestepStatus {
  charges: number;
  maxCharges: number;
  /** Seconds until the next charge lands, 0 with a full bank. */
  rechargeRemaining: number;
  /** Seconds one charge takes to regain. */
  rechargeTotal: number;
}

export function createSidestepStatus(): SidestepStatus {
  return {
    charges: SIDESTEP_TUNING.maxCharges,
    maxCharges: SIDESTEP_TUNING.maxCharges,
    rechargeRemaining: 0,
    rechargeTotal: SIDESTEP_TUNING.rechargeTicks * DT,
  };
}

const S = Math.SQRT1_2;
// Local (strafe-right, forward) unit vectors, the movement kernel's convention.
const LOCAL: Readonly<Record<SidestepDirection, readonly [number, number]>> = {
  forward: [0, 1],
  back: [0, -1],
  left: [-1, 0],
  right: [1, 0],
  forwardLeft: [-S, S],
  forwardRight: [S, S],
  backLeft: [-S, -S],
  backRight: [S, -S],
};

/** The world yaw a direction resolves to for a body facing `facing`. Facing f
 *  points along (sin f, cos f) and screen-right is (-cos f, sin f), as in
 *  player_motion.ts, so the yaw comes back in the same convention. */
export function sidestepYaw(facing: number, direction: SidestepDirection): number {
  const [mx, mz] = LOCAL[direction];
  const sin = Math.sin(facing);
  const cos = Math.cos(facing);
  return Math.atan2(mz * sin - mx * cos, mz * cos + mx * sin);
}

export interface SidestepBank {
  charges: number;
  nextChargeTick: number;
}

/** The live bank at `tick`, derived from the stored one without mutating it. */
export function sidestepBankAt(
  state: Pick<SidestepState, 'charges' | 'nextChargeTick'> | undefined,
  tick: number,
  out: SidestepBank,
): SidestepBank {
  const max = SIDESTEP_TUNING.maxCharges;
  if (!state) {
    out.charges = max;
    out.nextChargeTick = 0;
    return out;
  }
  let charges = state.charges;
  let next = state.nextChargeTick;
  while (charges < max && next > 0 && tick >= next) {
    charges++;
    next = charges < max ? next + SIDESTEP_TUNING.rechargeTicks : 0;
  }
  out.charges = charges;
  out.nextChargeTick = charges < max ? next : 0;
  return out;
}

/** Fill the HUD readout for a stored bank at `tick`. */
export function fillSidestepStatus(
  state: Pick<SidestepState, 'charges' | 'nextChargeTick'> | undefined,
  tick: number,
  out: SidestepStatus,
): SidestepStatus {
  const bank = sidestepBankAt(state, tick, scratchBank);
  out.charges = bank.charges;
  out.maxCharges = SIDESTEP_TUNING.maxCharges;
  out.rechargeTotal = SIDESTEP_TUNING.rechargeTicks * DT;
  out.rechargeRemaining =
    bank.nextChargeTick > 0 ? Math.max(0, bank.nextChargeTick - tick) * DT : 0;
  return out;
}

const scratchBank: SidestepBank = { charges: 0, nextChargeTick: 0 };

/** The self wire's `ssd` value: the stored bank as [charges, nextChargeTick],
 *  null before the first Sidestep. It moves only when a charge is spent; the
 *  client derives the live count from it and the snapshot tick. */
export function sidestepWire(e: Pick<Entity, 'sidestep'>): [number, number] | null {
  const s = e.sidestep;
  return s ? [s.charges, s.nextChargeTick] : null;
}

/** The read-only status for a resolved player (Sim.sidestepStatus). */
export function sidestepStatusFor(
  ctx: SimContext,
  pid: number | undefined,
  out: SidestepStatus = createSidestepStatus(),
): SidestepStatus {
  const r = ctx.resolve(pid);
  return fillSidestepStatus(r?.e.sidestep, ctx.tickCount, out);
}

// Every state that refuses a Sidestep without spending a charge (death is the
// shared dead gate). Movement-owning modes first: a dash cannot start inside
// another exclusive mover (player_movement_modes.ts), a charge, a fall into
// deep water, a mount or a lock. The Brace (brace.ts) refuses a raise, and
// lowers a raised stance, in exactly these states.
export function sidestepBlocked(ctx: SimContext, p: Entity, meta: PlayerMeta): boolean {
  if (meta.vehicle || p.ferryRide || meta.mountRace?.phase === 'countdown') return true;
  if (gliderOwnsMovement(meta) || wispMazeOwnsMovement(meta)) return true;
  if (p.leap || p.climb || p.valkyrsCalling || p.chargeTargetId !== null) return true;
  if ((p.sidestep?.dashTicksLeft ?? 0) > 0) return true;
  // isRooted covers every stun, fear (an incapacitate), polymorph and stasis.
  if (isRooted(p) || hasUnbreakableMovementLock(p)) return true;
  if (p.mountKey !== '' || (p.mountCastRemaining > 0 && p.mountCastKey === '')) return true;
  if (ctx.isSwimming(p)) return true;
  const casting = p.castingAbility;
  return casting !== null && p.channeling && ABILITIES[casting]?.uninterruptible === true;
}

/** Start a Sidestep for the resolved player (IWorld.sidestep). Refusals spend
 *  nothing and say why; true when the dash started. Draws no rng. */
export function startSidestep(
  ctx: SimContext,
  direction: SidestepDirection,
  pid?: number,
): boolean {
  const r = ctx.resolve(pid);
  if (!r || !isSidestepDirection(direction)) return false;
  if (refusedWhileDead(ctx, pid)) return false;
  const p = r.e;
  if (sidestepBlocked(ctx, p, r.meta)) {
    ctx.error(p.id, 'You cannot sidestep right now.');
    return false;
  }
  const bank = sidestepBankAt(p.sidestep, ctx.tickCount, scratchBank);
  if (bank.charges <= 0) {
    ctx.error(p.id, 'Sidestep is not ready yet.');
    return false;
  }
  p.sidestep ??= {
    charges: 0,
    nextChargeTick: 0,
    dashTicksLeft: 0,
    yaw: 0,
    evadeUntilTick: 0,
    lastX: 0,
    lastZ: 0,
  };
  const s = p.sidestep;
  s.charges = bank.charges - 1;
  // A full bank starts its first recharge now; a short one keeps its clock.
  s.nextChargeTick =
    bank.nextChargeTick > 0 ? bank.nextChargeTick : ctx.tickCount + SIDESTEP_TUNING.rechargeTicks;
  s.dashTicksLeft = SIDESTEP_TUNING.dashTicks;
  s.yaw = sidestepYaw(p.facing, direction);
  // Commands land between ticks, so the first tick the window covers is the
  // next one: tickCount + 1 through tickCount + SIDESTEP_WINDOW_TICKS.
  s.evadeUntilTick = ctx.tickCount + 1 + SIDESTEP_WINDOW_TICKS;
  s.lastX = p.pos.x;
  s.lastZ = p.pos.z;
  // A deliberate move ends a follow, as a movement key would.
  if (p.followTargetId !== null) ctx.stopFollow(p, 'You stop following.');
  // A Sidestep out of a raised Brace (brace.ts) lowers it: the dash wins.
  lowerBrace(p, ctx.tickCount);
  return true;
}

const DASH_INPUT: Readonly<MoveInput> = Object.freeze({
  forward: true,
  back: false,
  turnLeft: false,
  turnRight: false,
  strafeLeft: false,
  strafeRight: false,
  jump: false,
  dive: false,
  surface: false,
});

// The live kernel deps with the dash speed in place of the run speed, built
// once per deps object so a dash tick allocates nothing.
const dashDepsCache = new WeakMap<PlayerMotionDeps, PlayerMotionDeps>();
function dashDeps(deps: PlayerMotionDeps): PlayerMotionDeps {
  let wrapped = dashDepsCache.get(deps);
  if (!wrapped) {
    wrapped = { ...deps, moveSpeedMult: () => SIDESTEP_DASH_SPEED / RUN_SPEED };
    dashDepsCache.set(deps, wrapped);
  }
  return wrapped;
}

/** One dash tick (player_movement_modes.ts). True while the dash owns the
 *  step; a death, a lock or an external move ends it early. */
export function advanceSidestep(ctx: SimContext, p: Entity, deps: PlayerMotionDeps): boolean {
  const s = p.sidestep;
  if (!s || s.dashTicksLeft <= 0) return false;
  if (
    p.dead ||
    isRooted(p) ||
    hasUnbreakableMovementLock(p) ||
    Math.hypot(p.pos.x - s.lastX, p.pos.z - s.lastZ) > EXTERNAL_MOVE_YD
  ) {
    endDash(ctx, p, s);
    return false;
  }
  // The kernel walks "forward"; point the body along the dash for the step and
  // hand the facing back, so the dash never turns the player.
  const facing = p.facing;
  p.facing = s.yaw;
  stepPlayerMotion(dashDeps(deps), p, DASH_INPUT);
  p.facing = facing;
  s.dashTicksLeft--;
  s.lastX = p.pos.x;
  s.lastZ = p.pos.z;
  if (s.dashTicksLeft === 0) endDash(ctx, p, s);
  return true;
}

// A dash that ends in the air (off a ledge) keeps falling at run speed at
// most: the dash speed never carries into a long glide.
function endDash(ctx: SimContext, p: Entity, s: SidestepState): void {
  s.dashTicksLeft = 0;
  if (p.onGround) return;
  const cap = RUN_SPEED * ctx.moveSpeedMult(p);
  const speed = Math.hypot(p.vx, p.vz);
  if (speed > cap && speed > 1e-9) {
    p.vx *= cap / speed;
    p.vz *= cap / speed;
  }
}

/** Whether `target`'s evade window covers the current tick. */
export function sidestepWindowOpen(ctx: SimContext, target: Entity): boolean {
  const s = target.sidestep;
  return s !== undefined && ctx.tickCount < s.evadeUntilTick;
}

// The enemy rule, shared with the Guardian Ward (damage.ts) and the Brace
// (brace.ts): a wild mob is an enemy when it is hostile, anything else when
// the hostility rules say so.
export function isEnemySource(ctx: SimContext, source: Entity, target: Entity): boolean {
  return source.kind === 'mob' && source.ownerId === null
    ? source.hostile
    : ctx.isHostileTo(source, target);
}

/** dealDamage: an enemy hit on a player inside the window is an Evade. */
export function sidestepEvadesHit(ctx: SimContext, source: Entity | null, target: Entity): boolean {
  if (target.kind !== 'player' || source === null || source.id === target.id) return false;
  return sidestepWindowOpen(ctx, target) && isEnemySource(ctx, source, target);
}

/** Sim.applyAura: a harmful aura from an enemy (or from a source already gone)
 *  is refused inside the window. Helpful and self auras, non-harmful encounter
 *  state, and unbreakable encounter control still land. */
export function sidestepRefusesAura(ctx: SimContext, target: Entity, aura: Aura): boolean {
  if (target.kind !== 'player' || aura.sourceId === target.id) return false;
  if (isUnbreakableControlAura(aura) || !isDebuffAura(aura.kind, aura.value)) return false;
  if (!sidestepWindowOpen(ctx, target)) return false;
  const source = ctx.entities.get(aura.sourceId);
  return source === undefined || isEnemySource(ctx, source, target);
}

/** knockback.ts: an enemy shove inside the window moves the player 0 yards. */
export function sidestepRefusesKnockback(ctx: SimContext, source: Entity, target: Entity): boolean {
  return sidestepEvadesHit(ctx, source, target);
}
