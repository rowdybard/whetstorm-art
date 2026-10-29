// Original paintings for Vael heroic leather armor.
const VAEL_LEATHER_ORIGINAL_ITEM_ART = new Map<string, string>([
  ['tidebound_spaulders', '/ui/whetstorm/items/tidebound_spaulders.webp'],
  ['tideguard_faceguard', '/ui/whetstorm/items/tideguard_faceguard.webp'],
  ['dreamroot_boots', '/ui/whetstorm/items/dreamroot_boots.webp'],
]);

export function vaelLeatherOriginalItemImageUrl(id: string): string | null {
  return VAEL_LEATHER_ORIGINAL_ITEM_ART.get(id) ?? null;
}
