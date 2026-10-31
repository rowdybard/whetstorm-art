// Original Void and Tides hoard tier paintings.
const ART = new Map<string, string>([
  ['rare_orb_collapsing_void', '/ui/whetstorm/items/rare_orb_collapsing_void.webp'],
  ['legendary_orb_collapsing_void', '/ui/whetstorm/items/legendary_orb_collapsing_void.webp'],
  ['rare_chalice_of_living_tides', '/ui/whetstorm/items/rare_chalice_of_living_tides.webp'],
  ['legendary_chalice_of_living_tides', '/ui/whetstorm/items/legendary_chalice_of_living_tides.webp'],
]);

export function voidTidesHoardTierItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
