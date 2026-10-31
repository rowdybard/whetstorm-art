// Original Whetstorm paintings for epic Grask hoard items.
const ART: ReadonlyMap<string, string> = new Map([
  ['breastplate_tectonic_might', '/ui/whetstorm/items/breastplate_tectonic_might.webp'],
  ['monolithic_shoulderguards', '/ui/whetstorm/items/monolithic_shoulderguards.webp'],
  ['earthshaker_warboots', '/ui/whetstorm/items/earthshaker_warboots.webp'],
]);
export function graskEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
