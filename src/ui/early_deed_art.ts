import { activityDeedImageUrl } from './activity_deed_art';
import { ascendantDeedImageUrl } from './ascendant_deed_art';
import { chronicleGatheringDeedImageUrl } from './chronicle_gathering_deed_art';
import { combatMasteryDeedImageUrl } from './combat_mastery_deed_art';
import { craftMasteryDeedImageUrl } from './craft_mastery_deed_art';
import { delveCompanionDeedImageUrl } from './delve_companion_deed_art';
import { delveDiscoveryDeedImageUrl } from './delve_discovery_deed_art';
import { dungeonClearDeedImageUrl } from './dungeon_clear_deed_art';
import { dungeonJourneyDeedImageUrl } from './dungeon_journey_deed_art';
import { dungeonMetaDeedImageUrl } from './dungeon_meta_deed_art';
import { experienceDeedImageUrl } from './experience_deed_art';
import { explorationDeedImageUrl } from './exploration_deed_art';
import { journeyDeedImageUrl } from './journey_deed_art';
import { milestoneDeedImageUrl } from './milestone_deed_art';
import { peaksDiscoveryDeedImageUrl } from './peaks_discovery_deed_art';
import { placeDeedImageUrl } from './place_deed_art';
import { prestigeDeedImageUrl } from './prestige_deed_art';
import { tradeMasteryDeedImageUrl } from './trade_mastery_deed_art';

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
    milestoneDeedImageUrl(id) ??
    tradeMasteryDeedImageUrl(id) ??
    combatMasteryDeedImageUrl(id) ??
    craftMasteryDeedImageUrl(id) ??
    dungeonClearDeedImageUrl(id) ??
    dungeonJourneyDeedImageUrl(id) ??
    dungeonMetaDeedImageUrl(id) ??
    delveDiscoveryDeedImageUrl(id) ??
    delveCompanionDeedImageUrl(id) ??
    experienceDeedImageUrl(id) ??
    prestigeDeedImageUrl(id) ??
    ascendantDeedImageUrl(id) ??
    explorationDeedImageUrl(id) ??
    chronicleGatheringDeedImageUrl(id) ??
    journeyDeedImageUrl(id) ??
    placeDeedImageUrl(id) ??
    peaksDiscoveryDeedImageUrl(id) ??
    activityDeedImageUrl(id)
  );
}
