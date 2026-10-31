// Original Season 1 Stormbound mail paintings.
const ART = new Map<string, string>([
  ['stormbound_crown', '/ui/whetstorm/items/stormbound_crown.webp'],
  ['stormbound_spaulders', '/ui/whetstorm/items/stormbound_spaulders.webp'],
  ['stormbound_hauberk', '/ui/whetstorm/items/stormbound_hauberk.webp'],
]);

export function stormboundS1ItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
