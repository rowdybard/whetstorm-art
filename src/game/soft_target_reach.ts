// How far the Action Combat soft target may reach, and how wide a body the
// crosshair ray may clip, both answered from the SERVER'S own reach table so
// the pick never lands on something the server would refuse to let the player
// hit.
//
// Reach: the player's auto-attack acceptance, restated exactly as the sim's
// swing loop gates it (combat/auto_attack.ts tryPlayerSwing): a ranged auto
// profile (a hunter's Auto Shot, a caster's wand, form-aware through
// rangedAutoProfile) lands out to its maxRange, outside the hunter's dead zone;
// everything else is melee, out to effectivePlayerAttackRange (the server's
// reach function: big bodies such as the raid bosses and the Buried Hoard
// bosses earn extra yards there, and a feral druid adds its own). So a normal
// mob 6 yd away is never a melee pick, and a raid boss 7.5 yd away is.
//
// Radius: the walker body every unit resolves its moves with (PLAYER_BODY_RADIUS)
// plus the extra reach the TARGET'S body earns in that same table
// (effectivePlayerAttackRange(t, MELEE_RANGE) - MELEE_RANGE, with no attacker,
// so a feral druid's longer arms never widen the enemy). A body the server
// treats as three yards bigger is three yards wider under the crosshair.
//
// Pure: no DOM, no Three, no world handle. Registered in UI_PURE_CORES
// (tests/architecture.test.ts).

import type { MeleeReachActor } from '../sim/combat/feral_reach';
import { effectivePlayerAttackRange } from '../sim/combat/player_attack_reach';
import { PLAYER_BODY_RADIUS } from '../sim/pathfind';
import { MELEE_RANGE } from '../sim/types';

/** The two fields the server's reach table reads off a target. */
export interface SoftTargetReachTarget {
  readonly kind: string;
  readonly templateId: string;
}

/** A ranged auto profile as content/classes.ts authors it (the fields the
 *  swing loop's range gate reads). Null or undefined means melee only. */
export interface SoftTargetRangedReach {
  readonly maxRange: number;
  readonly minRange: number;
  readonly wand?: boolean;
}

/** The extra yards the target's own body earns in the server's reach table
 *  (zero for an ordinary mob or a player). */
export function softTargetBodyReach(t: SoftTargetReachTarget): number {
  return Math.max(0, effectivePlayerAttackRange(t, MELEE_RANGE) - MELEE_RANGE);
}

/** The body radius the crosshair ray may pass within (yards). */
export function softTargetBodyRadius(t: SoftTargetReachTarget): number {
  return PLAYER_BODY_RADIUS + softTargetBodyReach(t);
}

/**
 * Would the player's auto-attack land on `t` from `distance` yards (centre to
 * centre)? The swing loop's range gates, in its order: the ranged profile
 * first (no dead zone for a wand), then melee reach. Facing and sight are the
 * picker's other gates.
 */
export function softTargetInReach(
  t: SoftTargetReachTarget,
  distance: number,
  actor: MeleeReachActor | null,
  ranged: SoftTargetRangedReach | null | undefined,
): boolean {
  if (ranged && distance <= ranged.maxRange && distance >= (ranged.wand ? 0 : ranged.minRange)) {
    return true;
  }
  return distance <= effectivePlayerAttackRange(t, MELEE_RANGE, actor);
}
