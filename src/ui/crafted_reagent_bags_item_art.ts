// Original crafted and reagent bag paintings in a closed map.
const ART = new Map<string, string>([
  ['burlap_reagent_pouch', '/ui/whetstorm/items/burlap_reagent_pouch.webp'],
  ['foragers_haversack', '/ui/whetstorm/items/foragers_haversack.webp'],
  ['loombound_reagent_satchel', '/ui/whetstorm/items/loombound_reagent_satchel.webp'],
  ['sunspun_haversack', '/ui/whetstorm/items/sunspun_haversack.webp'],
]);

export function craftedReagentBagsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
