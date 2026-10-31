// Original Whetstorm Rift socket gem paintings.
const ART: ReadonlyMap<string, string> = new Map([
  ['rift_gem_crimson', '/ui/whetstorm/items/rift_gem_crimson.webp'],
  ['rift_gem_azure', '/ui/whetstorm/items/rift_gem_azure.webp'],
  ['rift_gem_verdant', '/ui/whetstorm/items/rift_gem_verdant.webp'],
]);
export function riftGemItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
