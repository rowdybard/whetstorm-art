// Original paintings for combat achievements.
const COMBAT_MASTERY_DEED_ART = new Map<string, string>([
  ['cmb_slayer', '/ui/whetstorm/deeds/cmb_slayer.webp'],
  ['cmb_heavy_hitter', '/ui/whetstorm/deeds/cmb_heavy_hitter.webp'],
  ['cmb_critical_eye', '/ui/whetstorm/deeds/cmb_critical_eye.webp'],
]);

export function combatMasteryDeedImageUrl(id: string): string | null {
  return COMBAT_MASTERY_DEED_ART.get(id) ?? null;
}
