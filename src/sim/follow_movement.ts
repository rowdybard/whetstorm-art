// /follow's trailing step (the second forced-movement mode, beside charge),
// moved verbatim out of the Sim coordinator behind the SimContext seam. It
// trails another player at FOLLOW_STOP_DIST, turns to face the leader even
// while held in place, and ends on any manual locomotion, combat, a missing
// leader or a leader past FOLLOW_MAX_RANGE. True when it owns this tick's step.
// Draws no rng.

import { isRooted, isStunned } from './combat/cc';
import { zoneAt } from './data';
import { PLAYER_BODY_RADIUS, PLAYER_MAX_CLIMB_SLOPE, PLAYER_SWIM_DEPTH } from './pathfind';
import { SWIM_SPEED_MULT } from './player_motion';
import { cancelProfessionSessionOnDisplacement } from './professions/session_teardown';
import { rideSteepnessAt, shoreStepOut, stepWaterLevel } from './ride_height';
import type { PlayerMeta } from './sim';
import type { SimContext } from './sim_context';
import { DT, dist2d, type Entity, isNonSpellCast, RUN_SPEED, steadyAngleTo } from './types';
import { groundHeight, waterLevelAt } from './world';

const BODY_RADIUS = PLAYER_BODY_RADIUS;
const MAX_CLIMB_SLOPE = PLAYER_MAX_CLIMB_SLOPE;
const SWIM_DEPTH = PLAYER_SWIM_DEPTH; // ground this far under the water line = deep water
const FOLLOW_STOP_DIST = 3; // /follow trails this close behind the leader (yards)
const FOLLOW_MAX_RANGE = 60; // give up follow once the leader is this far away

export function updateFollowMovement(ctx: SimContext, p: Entity, meta: PlayerMeta): boolean {
  if (p.followTargetId === null) return false;
  const inp = meta.moveInput;
  // any manual locomotion (incl. camera turns) breaks follow, classic-style
  if (
    inp.forward ||
    inp.back ||
    inp.strafeLeft ||
    inp.strafeRight ||
    inp.jump ||
    inp.turnLeft ||
    inp.turnRight
  ) {
    ctx.stopFollow(p, 'You stop following.');
    return false;
  }
  const t = ctx.entities.get(p.followTargetId);
  if (!t || t.dead || t.kind !== 'player' || !ctx.players.has(t.id)) {
    ctx.stopFollow(p, 'There is no one to follow.');
    return false;
  }
  if (p.inCombat) {
    ctx.stopFollow(p, 'You stop following - you are in combat.');
    return false;
  }
  const d = dist2d(p.pos, t.pos);
  if (d > FOLLOW_MAX_RANGE) {
    ctx.stopFollow(p, `${t.name} is too far away to follow.`);
    return false;
  }
  // always turn to face the leader, even while held in place
  p.facing = steadyAngleTo(p.pos, t.pos, p.facing);
  if (isStunned(p) || isRooted(p) || d <= FOLLOW_STOP_DIST) return true;
  let speed = RUN_SPEED * ctx.moveSpeedMult(p);
  if (ctx.isSwimming(p)) speed *= SWIM_SPEED_MULT;
  const step = Math.min(speed * DT, d - FOLLOW_STOP_DIST);
  const nx = p.pos.x + Math.sin(p.facing) * step;
  const nz = p.pos.z + Math.cos(p.facing) * step;
  const h1 = groundHeight(nx, nz, ctx.cfg.seed);
  if (h1 < waterLevelAt(nx, nz, ctx.cfg.seed) - SWIM_DEPTH) return true; // don't trail into deep water
  // ridden-surface slopes plus the shore step-out (ride_height.ts), matching
  // the movement kernel: a follower crosses the same fords and climbs the
  // same low banks its leader just walked.
  const wls = stepWaterLevel(p.pos.x, p.pos.z, nx, nz, ctx.cfg.seed);
  const r0 = Math.max(groundHeight(p.pos.x, p.pos.z, ctx.cfg.seed), wls);
  const r1 = Math.max(h1, wls);
  if (
    r1 > r0 &&
    step > 1e-5 &&
    ((r1 - r0) / step > MAX_CLIMB_SLOPE ||
      (h1 >= wls && rideSteepnessAt(nx, nz, ctx.cfg.seed) > MAX_CLIMB_SLOPE)) &&
    !shoreStepOut(p.pos.x, p.pos.z, nx, nz, ctx.cfg.seed, MAX_CLIMB_SLOPE)
  ) {
    return true; // wall/cliff
  }
  const fromX = p.pos.x;
  const fromZ = p.pos.z;
  const resolved = ctx.resolveMove(p.pos.x, p.pos.z, nx, nz, BODY_RADIUS, p);
  p.pos.x = resolved.x;
  p.pos.z = resolved.z;
  p.pos.y = groundHeight(resolved.x, resolved.z, ctx.cfg.seed);
  p.vy = 0;
  p.onGround = true;
  p.fallStartY = p.pos.y;
  // A tow across a zone line ends a live gather/fishing session: the
  // follow walk skips stepPlayerMotion (whose move-input cancel guards
  // every self-propelled crossing), so without this a leader could carry
  // an angler into another zone mid-session and fish it against the
  // wrong zone's rules. The session check leads: it is the cheap common
  // case (almost no towed player is mid-session), so the two zone walks
  // run only when there is something to cancel.
  if (isNonSpellCast(p.castingAbility) && zoneAt(fromX, fromZ).id !== zoneAt(p.pos.x, p.pos.z).id) {
    cancelProfessionSessionOnDisplacement(ctx, p);
  }
  return true;
}
