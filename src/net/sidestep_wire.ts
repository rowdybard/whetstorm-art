// The client half of the Sidestep self wire (`ssd`, server/self_scalar_wire.ts):
// the stored bank as [charges, nextChargeTick], null before the first dodge,
// delta-guarded like the rest of the self scalars (an absent key means
// unchanged). The server ships it only when a charge is SPENT, so the mirror
// keeps the last snapshot's tick and derives the live count and the recharge
// with the sim's own rule (combat/sidestep.ts fillSidestepStatus). Read by
// ClientWorld.sidestepStatus for the HUD; display only, never an outcome.

import {
  createSidestepStatus,
  fillSidestepStatus,
  type SidestepBank,
  type SidestepStatus,
} from '../sim/combat/sidestep';
import { DT } from '../sim/types';

/** The local clock may age the last snapshot's tick by at most this many
 *  ticks, so a stalled stream freezes the readout instead of running it on. */
const MAX_EXTRAPOLATED_TICKS = 2;

function wireTick(value: unknown): number | null {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

export class SidestepWireMirror {
  private bank: SidestepBank | undefined = undefined;
  private tick = 0;
  private tickAtMs = 0;

  /** Decode one snapshot: `raw` is the self record's `ssd` (undefined keeps
   *  the mirror), `tick` the snapshot's own tick, `nowMs` the local clock. */
  apply(raw: unknown, tick: unknown, nowMs: number): void {
    const snapTick = wireTick(tick);
    if (snapTick !== null) {
      this.tick = snapTick;
      this.tickAtMs = nowMs;
    }
    if (raw === undefined) return;
    if (raw === null) {
      this.bank = undefined;
      return;
    }
    if (!Array.isArray(raw) || raw.length !== 2) return;
    const charges = wireTick(raw[0]);
    const nextChargeTick = wireTick(raw[1]);
    if (charges === null || nextChargeTick === null) return;
    this.bank = { charges, nextChargeTick };
  }

  /** The readout at `nowMs`: the last snapshot's tick, aged by the local clock
   *  for a smooth recharge sweep (at most MAX_EXTRAPOLATED_TICKS). */
  status(out: SidestepStatus = createSidestepStatus(), nowMs?: number): SidestepStatus {
    const aged =
      nowMs !== undefined && this.tickAtMs > 0
        ? Math.min(MAX_EXTRAPOLATED_TICKS, Math.max(0, (nowMs - this.tickAtMs) / 1000 / DT))
        : 0;
    return fillSidestepStatus(this.bank, this.tick + aged, out);
  }
}

// One mirror per ClientWorld, created on first use, so the coordinator carries
// no field for it (and a test's prototype-built client works unchanged).
const mirrors = new WeakMap<object, SidestepWireMirror>();

export function sidestepWireFor(owner: object): SidestepWireMirror {
  let mirror = mirrors.get(owner);
  if (!mirror) {
    mirror = new SidestepWireMirror();
    mirrors.set(owner, mirror);
  }
  return mirror;
}
