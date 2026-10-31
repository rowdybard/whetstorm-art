// Original Chained Ember Choker tier paintings.
const ART = new Map<string, string>([
  ['rare_chained_ember_choker', '/ui/whetstorm/items/rare_chained_ember_choker.webp'],
  ['legendary_chained_ember_choker', '/ui/whetstorm/items/legendary_chained_ember_choker.webp'],
]);

export function chainedEmberChokerTierItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
