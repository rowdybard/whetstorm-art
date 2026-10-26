// The Action Combat soft-target controller: runs the crosshair pick
// (soft_target_core.ts) on a cadence and turns it into ordinary target
// commands, the same targetEntity call a click makes. The server stays
// authoritative; this only chooses what to ask for, and the pick only ever
// names something inside the server's own attack reach (soft_target_reach.ts).
//
// Four rules, each pinned by tests/soft_target_controller.test.ts:
// - CHANGE ONLY. A command goes out only when the pick differs from the
//   current target, never per frame or per tick. A pick the world did not take
//   (a refusal, a stale snapshot) is re-sent at most once per `resendMs`.
// - HYSTERESIS. The current soft target keeps the selection while it stays
//   inside the wider keep cone and in reach, until a challenger sits at least
//   `switchMargin` closer to the crosshair, so two enemies side by side do not
//   flicker the target frame.
// - EXPLICIT WINS. A target the controller did not pick (Tab, a click, a party
//   frame, a server-side retarget) holds until it dies, leaves range, or leaves
//   the wide hold cone (roughly the visible view). Only then does the crosshair
//   take over again. A self target never leaves that cone, so it holds until
//   the player picks something else.
// - NOTHING UNDER THE CROSSHAIR CHANGES NOTHING. An empty cone never clears the
//   target, so looking away from a fight cannot drop it.
//
// Pure: no DOM, no Three, no world handle and no clock of its own (the caller
// passes `nowMs`). Registered in UI_PURE_CORES (tests/architecture.test.ts).

import {
  createSoftTargetPick,
  pickSoftTarget,
  SOFT_TARGET_TUNING,
  type SoftTargetAim,
  type SoftTargetEntity,
  type SoftTargetField,
  type SoftTargetQuery,
  softTargetOffset,
} from './soft_target_core';

/** An entity as the controller reads it: the picker's fields plus death. */
export interface SoftTargetLiveEntity extends SoftTargetEntity {
  readonly dead?: boolean;
}

/** What one step reads from the world. The caller owns (and reuses) it. */
export interface SoftTargetWorldView<E extends SoftTargetLiveEntity> {
  /** Every entity the client knows (the world's entity map serves as is). */
  readonly entities: SoftTargetField<E>;
  /** The local player's current target. */
  readonly targetId: number | null;
  entity(id: number): E | undefined;
  /** The body radius the crosshair ray may clip (soft_target_reach.ts). */
  bodyRadius(e: E): number;
  /** The server's attack reach for `e` at `distance` yards from the player. */
  inReach(e: E, distance: number): boolean;
  isAttackable(e: E): boolean;
  hasLineOfSight(e: E): boolean;
}

export type SoftTargetTuning = {
  readonly [K in keyof typeof SOFT_TARGET_TUNING]: number;
};

export class SoftTargetController<E extends SoftTargetLiveEntity> {
  private softId: number | null = null;
  // The last id actually sent and when, kept apart from softId (which an
  // explicit target clears) so a refused pick is never re-sent early.
  private sentId: number | null = null;
  private sentAt = Number.NEGATIVE_INFINITY;
  private nextPickAt = Number.NEGATIVE_INFINITY;
  private view: SoftTargetWorldView<E> | null = null;
  private readonly pick = createSoftTargetPick();
  private readonly aim: SoftTargetAim = { x: 0, z: 0, yaw: 0 };
  private readonly from = { x: 0, z: 0 };
  private readonly query: SoftTargetQuery<E>;

  constructor(
    private readonly send: (id: number) => void,
    private readonly tuning: SoftTargetTuning = SOFT_TARGET_TUNING,
  ) {
    this.query = {
      aim: this.aim,
      from: this.from,
      range: tuning.range,
      halfAngle: tuning.halfAngle,
      frontArc: tuning.frontArc,
      bodyRadius: (e) => this.view?.bodyRadius(e) ?? 0,
      inReach: (e, distance) => this.view?.inReach(e, distance) ?? false,
      isAttackable: (e) => this.view?.isAttackable(e) ?? false,
      hasLineOfSight: (e) => this.view?.hasLineOfSight(e) ?? false,
    };
  }

  /** The id this controller picked and still believes is selected (null while
   *  an explicit target holds or before the first pick). */
  get softTargetId(): number | null {
    return this.softId;
  }

  /** Forget everything: the mode switched off or the session changed. The
   *  current target is left exactly as it is. */
  reset(): void {
    this.softId = null;
    this.sentId = null;
    this.sentAt = Number.NEGATIVE_INFINITY;
    this.nextPickAt = Number.NEGATIVE_INFINITY;
    this.view = null;
  }

  /**
   * Run one pick if the cadence allows. `aim` is the crosshair ray on the
   * ground plane, `from` the player's position. Returns the id sent this step,
   * or null when nothing was sent.
   */
  step(
    view: SoftTargetWorldView<E>,
    aim: SoftTargetAim,
    from: { readonly x: number; readonly z: number },
    nowMs: number,
  ): number | null {
    if (nowMs < this.nextPickAt) return null;
    this.nextPickAt = nowMs + this.tuning.pickIntervalMs;
    this.view = view;
    this.aim.x = aim.x;
    this.aim.z = aim.z;
    this.aim.yaw = aim.yaw;
    this.from.x = from.x;
    this.from.z = from.z;

    const current = view.targetId;
    if (current !== null && current !== this.softId) {
      // Someone else chose this target. It holds while it is still a live,
      // visible choice; once it is not, the crosshair is free to pick.
      this.softId = null;
      const held = view.entity(current);
      if (held && this.explicitHolds(held)) return null;
    }

    // The incumbent soft target, if still valid inside the wider keep cone
    // and still in reach.
    let keepOffset = -1;
    if (current !== null && current === this.softId) {
      const incumbent = view.entity(current);
      if (incumbent && view.isAttackable(incumbent)) {
        const offset = softTargetOffset(
          incumbent.pos,
          view.bodyRadius(incumbent),
          this.query,
          this.tuning.keepHalfAngle,
          this.tuning.frontArc,
        );
        if (
          offset >= 0 &&
          view.inReach(incumbent, Math.hypot(incumbent.pos.x - from.x, incumbent.pos.z - from.z)) &&
          view.hasLineOfSight(incumbent)
        ) {
          keepOffset = offset;
        }
      }
    }

    const best = pickSoftTarget(view.entities, this.query, this.pick);
    if (best === null || best === current) return null;
    if (keepOffset >= 0 && this.pick.offset + this.tuning.switchMargin >= keepOffset) return null;
    if (best === this.sentId && nowMs - this.sentAt < this.tuning.resendMs) return null;
    this.softId = best;
    this.sentId = best;
    this.sentAt = nowMs;
    this.send(best);
    return best;
  }

  private explicitHolds(e: E): boolean {
    if (e.dead) return false;
    // Neither the front arc nor the attack reach applies to a hold: the player
    // chose this target (Tab reaches past melee), and only the wide view cone
    // and the outer range release it.
    const radius = this.view?.bodyRadius(e) ?? 0;
    return softTargetOffset(e.pos, radius, this.query, this.tuning.holdHalfAngle, Math.PI) >= 0;
  }
}
