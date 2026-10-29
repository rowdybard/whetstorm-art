// Original gathering tool paintings in a closed map.
const ART = new Map<string, string>([
  ['arcanite_mining_pick', '/ui/whetstorm/items/arcanite_mining_pick.webp'],
  ['ashwood_axe', '/ui/whetstorm/items/ashwood_axe.webp'],
  ['elderwood_axe', '/ui/whetstorm/items/elderwood_axe.webp'],
  ['sunpetal_sickle', '/ui/whetstorm/items/sunpetal_sickle.webp'],
]);

export function gatheringToolsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
