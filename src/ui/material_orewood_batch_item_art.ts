// Original ore and wood paintings in a closed map.
const ART = new Map<string, string>([
  ['fine_iron_ore', '/ui/whetstorm/items/fine_iron_ore.webp'],
  ['ashwood_log', '/ui/whetstorm/items/ashwood_log.webp'],
  ['fine_ashwood_log', '/ui/whetstorm/items/fine_ashwood_log.webp'],
  ['thorium_ore', '/ui/whetstorm/items/thorium_ore.webp'],
]);

export function materialOrewoodBatchItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
