// Original magical crafting material paintings in a closed map.
const ART = new Map<string, string>([
  ['sundered_essence', '/ui/whetstorm/items/sundered_essence.webp'],
  ['rift_essence', '/ui/whetstorm/items/rift_essence.webp'],
]);

export function materialEssenceBatchItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
