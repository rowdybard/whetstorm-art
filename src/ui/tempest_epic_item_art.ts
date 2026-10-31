// Original Whetstorm paintings for epic Tempest Vharok hoard armor.
const ART: ReadonlyMap<string, string> = new Map([
  ['hauberk_tempest_gale', '/ui/whetstorm/items/hauberk_tempest_gale.webp'],
  ['gale_strider_boots', '/ui/whetstorm/items/gale_strider_boots.webp'],
  ['tempest_strike_grips', '/ui/whetstorm/items/tempest_strike_grips.webp'],
]);
export function tempestEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
