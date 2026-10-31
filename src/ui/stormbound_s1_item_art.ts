// Original Season 1 Stormbound mail paintings.
const ART = new Map<string, string>([
  ['stormbound_crown', '/ui/whetstorm/items/stormbound_crown.webp'],
  ['stormbound_spaulders', '/ui/whetstorm/items/stormbound_spaulders.webp'],
  ['stormbound_hauberk', '/ui/whetstorm/items/stormbound_hauberk.webp'],
  ['stormbound_waistguard', '/ui/whetstorm/items/stormbound_waistguard.webp'],
  ['stormbound_legmail', '/ui/whetstorm/items/stormbound_legmail.webp'],
  ['stormbound_handguards', '/ui/whetstorm/items/stormbound_handguards.webp'],
  ['stormbound_greaves', '/ui/whetstorm/items/stormbound_greaves.webp'],
]);

export function stormboundS1ItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
