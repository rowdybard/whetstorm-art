// Original crafting material paintings in a closed map.
const ART = new Map<string, string>([
  ['fine_thorium_ore', '/ui/whetstorm/items/fine_thorium_ore.webp'],
  ['elderwood_log', '/ui/whetstorm/items/elderwood_log.webp'],
  ['fine_elderwood_log', '/ui/whetstorm/items/fine_elderwood_log.webp'],
  ['arcanite_bar', '/ui/whetstorm/items/arcanite_bar.webp'],
]);

export function materialHighpineNextItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
