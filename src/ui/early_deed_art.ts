import { activityDeedImageUrl } from './activity_deed_art';
import { amberfallEvergardenDeedImageUrl } from './amberfall_evergarden_deed_art';
import { ascendantDeedImageUrl } from './ascendant_deed_art';
import { chronicleGatheringDeedImageUrl } from './chronicle_gathering_deed_art';
import { civicBankDeedImageUrl } from './civic_bank_deed_art';
import { combatMasteryDeedImageUrl } from './combat_mastery_deed_art';
import { combatVictoryDeedImageUrl } from './combat_victory_deed_art';
import { craftMasteryDeedImageUrl } from './craft_mastery_deed_art';
import { craftSkillFinishDeedImageUrl } from './craft_skill_finish_deed_art';
import { craftSkillsDeedImageUrl } from './craft_skills_deed_art';
import { cryptChallengeDeedImageUrl } from './crypt_challenge_deed_art';
import { delveChallengeDeedImageUrl } from './delve_challenge_deed_art';
import { delveCompanionDeedImageUrl } from './delve_companion_deed_art';
import { delveDiscoveryDeedImageUrl } from './delve_discovery_deed_art';
import { dungeonClearDeedImageUrl } from './dungeon_clear_deed_art';
import { dungeonJourneyDeedImageUrl } from './dungeon_journey_deed_art';
import { dungeonMetaDeedImageUrl } from './dungeon_meta_deed_art';
import { earlyCollectionDeedImageUrl } from './early_collection_deed_art';
import { earlySocialDeedImageUrl } from './early_social_deed_art';
import { experienceDeedImageUrl } from './experience_deed_art';
import { explorationDeedImageUrl } from './exploration_deed_art';
import { floodedChallengeDeedImageUrl } from './flooded_challenge_deed_art';
import { gatheringBookendDeedImageUrl } from './gathering_bookend_deed_art';
import { heroicClearDeedImageUrl } from './heroic_clear_deed_art';
import { heroicDepthsDeedImageUrl } from './heroic_depths_deed_art';
import { journeyCraftDeedImageUrl } from './journey_craft_deed_art';
import { journeyDeedImageUrl } from './journey_deed_art';
import { marshChronicleDeedImageUrl } from './marsh_chronicle_deed_art';
import { milestoneDeedImageUrl } from './milestone_deed_art';
import { mountainBossDeedImageUrl } from './mountain_boss_deed_art';
import { nightbloomWraithwoodDeedImageUrl } from './nightbloom_wraithwood_deed_art';
import { peaksDiscoveryDeedImageUrl } from './peaks_discovery_deed_art';
import { placeDeedImageUrl } from './place_deed_art';
import { prestigeDeedImageUrl } from './prestige_deed_art';
import { raidChallengeDeedImageUrl } from './raid_challenge_deed_art';
import { sanctumChallengeDeedImageUrl } from './sanctum_challenge_deed_art';
import { socialMilestoneDeedImageUrl } from './social_milestone_deed_art';
import { thornpeakChronicleDeedImageUrl } from './thornpeak_chronicle_deed_art';
import { tradeFirstDeedImageUrl } from './trade_first_deed_art';
import { tradeMasteryDeedImageUrl } from './trade_mastery_deed_art';
import { tradeSkillDeedImageUrl } from './trade_skill_deed_art';
import { valeChronicleDeedImageUrl } from './vale_chronicle_deed_art';

// Original paintings for early deeds, shared by game and guide.
const EARLY_DEED_ART = new Map<string, string>([
  ['exp_first_ore', '/ui/whetstorm/deeds/exp_first_ore.webp'],
  ['exp_first_timber', '/ui/whetstorm/deeds/exp_first_timber.webp'],
  ['exp_first_herb', '/ui/whetstorm/deeds/exp_first_herb.webp'],
  ['chr_vale_first_cast', '/ui/whetstorm/deeds/chr_vale_first_cast.webp'],
  ['prog_first_steps', '/ui/whetstorm/deeds/prog_first_steps.webp'],
  ['prog_finding_your_feet', '/ui/whetstorm/deeds/prog_finding_your_feet.webp'],
  ['prog_well_rested', '/ui/whetstorm/deeds/prog_well_rested.webp'],
  ['prog_double_digits', '/ui/whetstorm/deeds/prog_double_digits.webp'],
  ['prog_talented', '/ui/whetstorm/deeds/prog_talented.webp'],
  ['prog_specialized', '/ui/whetstorm/deeds/prog_specialized.webp'],
  ['cmb_first_blood', '/ui/whetstorm/deeds/cmb_first_blood.webp'],
  ['cmb_first_fall', '/ui/whetstorm/deeds/cmb_first_fall.webp'],
]);

export function earlyDeedImageUrl(id: string): string | null {
  return (
    EARLY_DEED_ART.get(id) ??
    amberfallEvergardenDeedImageUrl(id) ??
    nightbloomWraithwoodDeedImageUrl(id) ??
    marshChronicleDeedImageUrl(id) ??
    thornpeakChronicleDeedImageUrl(id) ??
    earlyCollectionDeedImageUrl(id) ??
    earlySocialDeedImageUrl(id) ??
    civicBankDeedImageUrl(id) ??
    socialMilestoneDeedImageUrl(id) ??
    valeChronicleDeedImageUrl(id) ??
    milestoneDeedImageUrl(id) ??
    mountainBossDeedImageUrl(id) ??
    tradeMasteryDeedImageUrl(id) ??
    tradeSkillDeedImageUrl(id) ??
    tradeFirstDeedImageUrl(id) ??
    combatMasteryDeedImageUrl(id) ??
    combatVictoryDeedImageUrl(id) ??
    craftMasteryDeedImageUrl(id) ??
    craftSkillFinishDeedImageUrl(id) ??
    craftSkillsDeedImageUrl(id) ??
    cryptChallengeDeedImageUrl(id) ??
    dungeonClearDeedImageUrl(id) ??
    dungeonJourneyDeedImageUrl(id) ??
    dungeonMetaDeedImageUrl(id) ??
    delveDiscoveryDeedImageUrl(id) ??
    delveCompanionDeedImageUrl(id) ??
    delveChallengeDeedImageUrl(id) ??
    experienceDeedImageUrl(id) ??
    floodedChallengeDeedImageUrl(id) ??
    gatheringBookendDeedImageUrl(id) ??
    heroicClearDeedImageUrl(id) ??
    heroicDepthsDeedImageUrl(id) ??
    prestigeDeedImageUrl(id) ??
    raidChallengeDeedImageUrl(id) ??
    sanctumChallengeDeedImageUrl(id) ??
    ascendantDeedImageUrl(id) ??
    explorationDeedImageUrl(id) ??
    chronicleGatheringDeedImageUrl(id) ??
    journeyDeedImageUrl(id) ??
    journeyCraftDeedImageUrl(id) ??
    placeDeedImageUrl(id) ??
    peaksDiscoveryDeedImageUrl(id) ??
    activityDeedImageUrl(id)
  );
}
