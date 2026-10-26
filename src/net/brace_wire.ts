// The client half of the Brace self wire (`brs`, server/self_scalar_wire.ts):
// the stored stance as [up, meter, anchorTick, broken] with the flags as 0/1,
// null before the first raise, delta-guarded like the rest of the self
// scalars (an absent key means unchanged). The server ships it only on a
// raise, a lower, a blocked hit or a break, so the mirror keeps the last
// snapshot's tick and derives the live meter with the sim's own rule
// (combat/brace_meter.ts fillBraceStatus). Read by ClientWorld.braceStatus
// for the HUD; display only, never an outcome.

import { type BraceStatus, createBraceStatus, fillBraceStatus } from '../sim/combat/brace_meter';
import { DT } from '../sim/types';

/** The local clock may age the last snapshot's tick by at most this many
 *  ticks, so a stalled stream freezes the readout instead of running it on. */
const MAX_EXTRAPOLATED_TICKS = 2;

function wireTick(value: unknown): number | null {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function wireBit(value: unknown): boolean | null {
  return value === 0 || value === 1 ? value === 1 : null;
}

interface StoredStance {
  up: boolean;
  meter: number;
  anchorTick: number;
  broken: boolean;
}

export class BraceWireMirror {
  private stance: StoredStance | undefined = undefined;
  private tick = 0;
  private tickAtMs = 0;

  /** Decode one snapshot: `raw` is the self record's `brs` (undefined keeps
   *  the mirror), `tick` the snapshot's own tick, `nowMs` the local clock. */
  apply(raw: unknown, tick: unknown, nowMs: number): void {
    const snapTick = wireTick(tick);
    if (snapTick !== null) {
      this.tick = snapTick;
      this.tickAtMs = nowMs;
    }
    if (raw === undefined) return;
    if (raw === null) {
      this.stance = undefined;
      return;
    }
    if (!Array.isArray(raw) || raw.length !== 4) return;
    const up = wireBit(raw[0]);
    const meter = raw[1];
    const anchorTick = wireTick(raw[2]);
    const broken = wireBit(raw[3]);
    if (up === null || broken === null || anchorTick === null) return;
    if (typeof meter !== 'number' || !Number.isFinite(meter) || meter < 0) return;
    this.stance = { up, meter, anchorTick, broken };
  }

  /** The readout at `nowMs`: the last snapshot's tick, aged by the local clock
   *  for a smooth meter (at most MAX_EXTRAPOLATED_TICKS). */
  status(out: BraceStatus = createBraceStatus(), nowMs?: number): BraceStatus {
    const aged =
      nowMs !== undefined && this.tickAtMs > 0
        ? Math.min(MAX_EXTRAPOLATED_TICKS, Math.max(0, (nowMs - this.tickAtMs) / 1000 / DT))
        : 0;
    return fillBraceStatus(this.stance, this.tick + aged, out);
  }
}

// One mirror per ClientWorld, created on first use, so the coordinator carries
// no field for it (and a test's prototype-built client works unchanged).
const mirrors = new WeakMap<object, BraceWireMirror>();

export function braceWireFor(owner: object): BraceWireMirror {
  let mirror = mirrors.get(owner);
  if (!mirror) {
    mirror = new BraceWireMirror();
    mirrors.set(owner, mirror);
  }
  return mirror;
}
