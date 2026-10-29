// Original paintings for obtainable Reliquary and Drowned Litany leather armor.
const LEATHER_DELVE_NEXT_ITEM_ART = new Map<string, string>([
  ['reliquary_leather_chest', '/ui/whetstorm/items/reliquary_leather_chest.webp'],
  ['reliquary_gloves_rog', '/ui/whetstorm/items/reliquary_gloves_rog.webp'],
  ['reedstalker_jerkin', '/ui/whetstorm/items/reedstalker_jerkin.webp'],
  ['widow_silk_hood', '/ui/whetstorm/items/widow_silk_hood.webp'],
]);

export function leatherDelveNextItemImageUrl(id: string): string | null {
  return LEATHER_DELVE_NEXT_ITEM_ART.get(id) ?? null;
}
