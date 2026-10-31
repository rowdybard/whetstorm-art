// Original Whetstorm paintings for all three Tempest Vharok hoard armor tiers.
const ART: ReadonlyMap<string, string> = new Map([
  ['hauberk_tempest_gale', '/ui/whetstorm/items/hauberk_tempest_gale.webp'],
  ['gale_strider_boots', '/ui/whetstorm/items/gale_strider_boots.webp'],
  ['tempest_strike_grips', '/ui/whetstorm/items/tempest_strike_grips.webp'],
  ['rare_hauberk_tempest_gale', '/ui/whetstorm/items/rare_hauberk_tempest_gale.webp'],
  ['rare_gale_strider_boots', '/ui/whetstorm/items/rare_gale_strider_boots.webp'],
  ['rare_tempest_strike_grips', '/ui/whetstorm/items/rare_tempest_strike_grips.webp'],
  ['legendary_hauberk_tempest_gale', '/ui/whetstorm/items/legendary_hauberk_tempest_gale.webp'],
  ['legendary_gale_strider_boots', '/ui/whetstorm/items/legendary_gale_strider_boots.webp'],
  ['legendary_tempest_strike_grips', '/ui/whetstorm/items/legendary_tempest_strike_grips.webp'],
]);
export function tempestEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
