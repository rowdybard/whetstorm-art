// Original early journey and rare-craft deed crests.
const ART: ReadonlyMap<string, string> = new Map([
  ['prog_first_planting', '/ui/whetstorm/deeds/prog_first_planting.webp'],
  ['prog_ready_for_an_adventure', '/ui/whetstorm/deeds/prog_ready_for_an_adventure.webp'],
  ['prog_alchemy_rare', '/ui/whetstorm/deeds/prog_alchemy_rare.webp'],
  ['prog_cooking_rare', '/ui/whetstorm/deeds/prog_cooking_rare.webp'],
]);

export function journeyCraftDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
