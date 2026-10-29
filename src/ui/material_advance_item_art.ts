// Original farming material paintings in a closed map.
const MATERIAL_ADVANCE_ART = new Map<string, string>([
  ['compost', '/ui/whetstorm/items/compost.webp'],
  ['growth_tonic', '/ui/whetstorm/items/growth_tonic.webp'],
  ['marsh_rice_seed', '/ui/whetstorm/items/marsh_rice_seed.webp'],
  ['fine_marsh_rice', '/ui/whetstorm/items/fine_marsh_rice.webp'],
]);

export function materialAdvanceItemImageUrl(id: string): string | null {
  return MATERIAL_ADVANCE_ART.get(id) ?? null;
}
