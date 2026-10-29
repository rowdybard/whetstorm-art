// Original skill-75 profession component paintings in a closed map.
const PROFESSION_INTERMEDIATE_ART = new Map<string, string>([
  ['forgefold_plating', '/ui/whetstorm/items/forgefold_plating.webp'],
  ['wyrmhide_cording', '/ui/whetstorm/items/wyrmhide_cording.webp'],
  ['sunspun_bolt', '/ui/whetstorm/items/sunspun_bolt.webp'],
  ['duskforged_billet', '/ui/whetstorm/items/duskforged_billet.webp'],
]);

export function professionIntermediateItemImageUrl(id: string): string | null {
  return PROFESSION_INTERMEDIATE_ART.get(id) ?? null;
}
