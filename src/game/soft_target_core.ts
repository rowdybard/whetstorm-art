// Which enemy sits under the Action Combat crosshair (the soft target).
//
// Action Combat aims with the camera: the crosshair is the screen centre, and
// the chase camera looks along its yaw, so "nearest the crosshair" is the
// enemy whose bearing FROM THE CAMERA is closest to that yaw. The cone is
// measured on the ground plane. The chase camera looks down at the avatar, so
// how high an enemy sits on screen mostly says how far away it is, not where
// the player is aiming; the range gate answers distance, the cone answers aim.
//
// The crosshair test is SIZE-AWARE. A candidate counts when the aim ray passes
// within its body radius, not only when its centre sits inside the cone: the
// angle that is ranked and gated is the angle to the nearest edge of the body
// (zero when the ray crosses it). So a big boss whose centre is off the
// crosshair is still picked while the player aims at its flank. The radius is
// the caller's pure input (soft_target_reach.ts derives it from the server's
// own reach table, so a body that earns extra reach is exactly as wide here).
//
// Three more gates keep the pick to something the server will accept: the
// caller's reach rule, asked with the distance from the PLAYER (attacks range
// from the body, not the lens; soft_target_reach.ts answers it with the
// server's own reach function), the player's front arc around the aim (the
// sim refuses a cast at a target behind you), and line of sight. Who may be
// attacked, how far the player reaches and what blocks sight are the caller's
// own rules (injected predicates), the same split the pad picker in
// auto_target.ts uses. The pick is only a client choice: it is sent through
// the ordinary target command and the server validates it.
//
// Pure: no DOM, no Three, no world handle, no clock. Registered in
// UI_PURE_CORES (tests/architecture.test.ts) so the purity scan holds it.

import { MELEE_ARC } from '../sim/types';

const DEG = Math.PI / 180;

/**
 * The tuning table for Action Combat soft targeting. Range and front arc are
 * existing numbers (the client's attack-nearest reach, the sim's melee facing
 * arc). Everything else has no classic formula behind it: these are STARTING
 * VALUES for the owner to tune by feel, kept in this one table on purpose.
 */
export const SOFT_TARGET_TUNING = {
  /** The outer bound, yards from the player: nothing farther is ever looked
   *  at, and an explicit Tab or click target holds out to here. The same 40
   *  the attack-nearest key and the pad auto-target reach (AUTO_TARGET_RANGE),
   *  so all three agree on "nearby". The pick itself is narrower: it also has
   *  to pass the caller's reach rule (the server's attack reach). */
  range: 40,
  /** Half-angle of the pick cone around the crosshair ray (starting value). */
  halfAngle: 12 * DEG,
  /** The current soft target stays valid out to this wider half-angle, so a
   *  target on the cone's edge does not drop in and out (starting value). */
  keepHalfAngle: 16 * DEG,
  /** A challenger must sit this much closer to the crosshair than the current
   *  soft target before the pick moves, so two close enemies do not flicker
   *  (starting value). */
  switchMargin: 3 * DEG,
  /** An explicit Tab or click target holds while it stays inside this wide
   *  cone (roughly the visible view) and in range (starting value). */
  holdHalfAngle: 45 * DEG,
  /** The sim's melee facing half-arc: a cast at a target outside it is
   *  refused with "You must be facing your target". */
  frontArc: MELEE_ARC,
  /** How often the pick re-runs, in milliseconds (starting value). Ten picks a
   *  second keeps the line-of-sight walks off every frame. */
  pickIntervalMs: 100,
  /** The shortest gap before re-sending the same target after the world did
   *  not take it (starting value), so a refused pick never spams the wire. */
  resendMs: 1000,
} as const;

/** Angle and distance quanta for tie-breaking (see compareSoftPick). */
export const SOFT_TARGET_ANGLE_QUANTUM = 1e-4;
export const SOFT_TARGET_DISTANCE_QUANTUM = 1e-3;
/** Most line-of-sight checks one pick may spend before giving up. */
export const SOFT_TARGET_MAX_LOS_CHECKS = 8;
/** Inside this distance a bearing from the player is noise, so the front arc
 *  passes (an enemy standing on the player is never "behind" them). */
const FRONT_ARC_MIN_DIST = 0.1;

/** The little the picker reads off an entity. */
export interface SoftTargetEntity {
  readonly id: number;
  readonly pos: { readonly x: number; readonly z: number };
}

/** The crosshair ray on the ground plane: the camera's position and its yaw.
 *  The ray runs along (sin yaw, cos yaw), the chase camera's and the sim
 *  facing's shared convention (sim/types.ts angleTo). */
export interface SoftTargetAim {
  x: number;
  z: number;
  yaw: number;
}

/** Where the pick looks from and how wide. */
export interface SoftTargetGeometry {
  aim: SoftTargetAim;
  /** The player's position: range, reach and the front arc are measured from
   *  here. */
  from: { readonly x: number; readonly z: number };
  /** The outer bound in yards (centre to centre). */
  range: number;
  halfAngle: number;
  frontArc: number;
}

export interface SoftTargetQuery<E extends SoftTargetEntity> extends SoftTargetGeometry {
  /** The body radius (yards) the aim ray may pass within and still count. */
  bodyRadius(e: E): number;
  /** The caller's reach rule: would the player's attack land on `e` from
   *  `distance` yards (centre to centre, measured from the player)? */
  inReach(e: E, distance: number): boolean;
  /** The caller's attack rule (faction, dead, pvp opt-in). */
  isAttackable(e: E): boolean;
  /** The caller's sight rule, asked only for cone survivors, best first. */
  hasLineOfSight(e: E): boolean;
}

/** The candidate field. Each pass walks it afresh through `values()`, which a
 *  Map (the world's entity map) and an array both provide, so a one-shot
 *  iterator can never silently empty the later passes. */
export interface SoftTargetField<E> {
  values(): Iterable<E>;
}

/** The winning pick's numbers, written into a caller-owned container so a
 *  per-tick pick allocates nothing. */
export interface SoftTargetPick {
  id: number | null;
  /** Angular offset from the crosshair ray, radians. */
  offset: number;
  /** Ground distance from the player, yards. */
  distance: number;
}

export function createSoftTargetPick(): SoftTargetPick {
  return { id: null, offset: 0, distance: 0 };
}

function wrap(a: number): number {
  let r = a % (2 * Math.PI);
  if (r > Math.PI) r -= 2 * Math.PI;
  if (r < -Math.PI) r += 2 * Math.PI;
  return r;
}

/**
 * The angular offset (radians) of a body at `pos` with `radius` from the
 * crosshair ray, or -1 when it is outside the gates: farther than `range` from
 * the player, centred behind the camera, wider than `halfAngle` off the ray,
 * or outside the player's `frontArc` around the aim yaw. The offset is taken
 * to the body's nearest edge: the ray's perpendicular miss distance less the
 * radius, so it is zero whenever the ray passes through the body. Reach,
 * attackability and sight are NOT checked here.
 */
export function softTargetOffset(
  pos: { readonly x: number; readonly z: number },
  radius: number,
  g: SoftTargetGeometry,
  halfAngle: number,
  frontArc: number,
): number {
  const fx = pos.x - g.from.x;
  const fz = pos.z - g.from.z;
  const distance = Math.hypot(fx, fz);
  if (!(distance <= g.range)) return -1;
  const sin = Math.sin(g.aim.yaw);
  const cos = Math.cos(g.aim.yaw);
  const vx = pos.x - g.aim.x;
  const vz = pos.z - g.aim.z;
  const along = vx * sin + vz * cos;
  if (!(along > 0)) return -1;
  const miss = Math.abs(vx * cos - vz * sin) - (radius > 0 ? radius : 0);
  const offset = miss > 0 ? Math.atan2(miss, along) : 0;
  if (offset > halfAngle) return -1;
  if (distance >= FRONT_ARC_MIN_DIST) {
    const bearing = Math.atan2(fx, fz);
    if (Math.abs(wrap(bearing - g.aim.yaw)) > frontArc) return -1;
  }
  return offset;
}

/**
 * Strict total order over picks: the smaller angle off the crosshair wins;
 * angles within SOFT_TARGET_ANGLE_QUANTUM tie and break to the nearer enemy
 * (distances within SOFT_TARGET_DISTANCE_QUANTUM tie), and a full tie breaks
 * to the LOWER entity id. Quantized rather than epsilon-compared so the order
 * is transitive and the result never depends on iteration order.
 * Negative when `a` ranks first.
 */
export function compareSoftPick(
  aOffset: number,
  aDistance: number,
  aId: number,
  bOffset: number,
  bDistance: number,
  bId: number,
): number {
  const ao = Math.round(aOffset / SOFT_TARGET_ANGLE_QUANTUM);
  const bo = Math.round(bOffset / SOFT_TARGET_ANGLE_QUANTUM);
  if (ao !== bo) return ao - bo;
  const ad = Math.round(aDistance / SOFT_TARGET_DISTANCE_QUANTUM);
  const bd = Math.round(bDistance / SOFT_TARGET_DISTANCE_QUANTUM);
  if (ad !== bd) return ad - bd;
  return aId - bId;
}

/**
 * The attackable, in-reach enemy nearest the crosshair, or null when none
 * qualifies.
 * Each pass finds the best candidate ranked strictly after the last one that
 * failed line of sight, so sight is only ever asked of the front runners, at
 * most SOFT_TARGET_MAX_LOS_CHECKS times, and nothing is allocated. `out`
 * receives the winner's offset and distance (its id is the return value).
 */
export function pickSoftTarget<E extends SoftTargetEntity>(
  entities: SoftTargetField<E>,
  q: SoftTargetQuery<E>,
  out: SoftTargetPick = createSoftTargetPick(),
): number | null {
  let floorOffset = -1;
  let floorDistance = 0;
  let floorId = 0;
  out.id = null;
  for (let pass = 0; pass < SOFT_TARGET_MAX_LOS_CHECKS; pass++) {
    let best: E | null = null;
    let bestOffset = 0;
    let bestDistance = 0;
    for (const e of entities.values()) {
      // The cheap outer bound first, so the radius is only asked of the few
      // bodies near the player, never of the whole field.
      const distance = Math.hypot(e.pos.x - q.from.x, e.pos.z - q.from.z);
      if (!(distance <= q.range)) continue;
      const offset = softTargetOffset(e.pos, q.bodyRadius(e), q, q.halfAngle, q.frontArc);
      if (offset < 0) continue;
      if (
        floorOffset >= 0 &&
        compareSoftPick(offset, distance, e.id, floorOffset, floorDistance, floorId) <= 0
      )
        continue;
      if (
        best !== null &&
        compareSoftPick(offset, distance, e.id, bestOffset, bestDistance, best.id) >= 0
      )
        continue;
      if (!q.inReach(e, distance) || !q.isAttackable(e)) continue;
      best = e;
      bestOffset = offset;
      bestDistance = distance;
    }
    if (best === null) return null;
    if (q.hasLineOfSight(best)) {
      out.id = best.id;
      out.offset = bestOffset;
      out.distance = bestDistance;
      return best.id;
    }
    floorOffset = bestOffset;
    floorDistance = bestDistance;
    floorId = best.id;
  }
  return null;
}
