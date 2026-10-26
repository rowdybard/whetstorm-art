import { VARKHUL_BOSS_ID } from '../ignivar_raid_ids';
import { IGNIVAR_BOSS_ID, MELEE_RANGE } from '../types';
import { feralMeleeReachBonus, type MeleeReachActor } from './feral_reach';

export const RAID_BOSS_PLAYER_MELEE_RANGE = 8;
/** The Buried Hoard bosses are big bodies too: their own swing reaches a player
 *  the player's could not reach back (playtest). */
export const HOARD_BOSS_PLAYER_MELEE_RANGE = 7;

/** Player melee reach against named big bodies, keyed by template id. A body
 *  this large holds its target past stock MELEE_RANGE (its desiredRange in
 *  mob_combat.ts), so without the extra yards a melee player has to walk into
 *  the model to swing. Size each entry to the model scale: the raid bosses
 *  (scale 3.2 to 3.4) take 8, a body in the Buried Hoard band (scale 2.6 to
 *  3.3) takes the Hoard reach. The rift bosses ride the prefix rule below. */
export const BIG_BODY_PLAYER_MELEE_RANGE: Readonly<Record<string, number>> = {
  [IGNIVAR_BOSS_ID]: RAID_BOSS_PLAYER_MELEE_RANGE,
  [VARKHUL_BOSS_ID]: RAID_BOSS_PLAYER_MELEE_RANGE,
  // Mirefen's open-world wyrm (content/zone2.ts): scale 2.85, holding 5.5 yd.
  old_peatfire: HOARD_BOSS_PLAYER_MELEE_RANGE,
};

interface AttackTarget {
  kind: string;
  templateId: string;
}

/** Gives player melee attacks room for the authored size of the big bodies
 *  above, then adds whatever extra reach the ATTACKER carries
 *  (combat/feral_reach.ts: a feral druid reaches one yard further with every
 *  melee attack). The attacker is optional so a caller that has no actor to
 *  offer keeps the old answer exactly; omitting it never changes a range. */
export function effectivePlayerAttackRange(
  target: AttackTarget,
  authoredRange: number,
  attacker?: MeleeReachActor | null,
): number {
  const baseRange = authoredRange > 0 ? authoredRange : MELEE_RANGE;
  const bonus = feralMeleeReachBonus(attacker, authoredRange);
  if (baseRange <= MELEE_RANGE && target.kind === 'mob') {
    // Own keys only, so an id like 'constructor' never reads the prototype.
    if (Object.hasOwn(BIG_BODY_PLAYER_MELEE_RANGE, target.templateId)) {
      return BIG_BODY_PLAYER_MELEE_RANGE[target.templateId] + bonus;
    }
    if (target.templateId.startsWith('rift_boss_')) return HOARD_BOSS_PLAYER_MELEE_RANGE + bonus;
  }
  return baseRange + bonus;
}
