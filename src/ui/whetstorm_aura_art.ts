import { whetstormMobAuraBatchImageUrl } from './whetstorm_mob_aura_batch_art';
import { whetstormMobAuraDebuffsImageUrl } from './whetstorm_mob_aura_debuffs_art';
import { whetstormMobAuraStatusImageUrl } from './whetstorm_mob_aura_status_art';

// Original Whetstorm aura paintings, keyed by exact runtime identity.
const WHETSTORM_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['well_fed', '/ui/whetstorm/auras/well_fed.webp'],
]);

export function whetstormAuraImageUrl(id: string): string | null {
  return (
    WHETSTORM_AURA_ART.get(id) ??
    whetstormMobAuraBatchImageUrl(id) ??
    whetstormMobAuraDebuffsImageUrl(id) ??
    whetstormMobAuraStatusImageUrl(id)
  );
}
