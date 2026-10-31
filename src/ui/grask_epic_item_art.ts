// Original Whetstorm paintings for epic and Tarnished Grask hoard items.
const ART: ReadonlyMap<string, string> = new Map([
  ['breastplate_tectonic_might', '/ui/whetstorm/items/breastplate_tectonic_might.webp'],
  ['monolithic_shoulderguards', '/ui/whetstorm/items/monolithic_shoulderguards.webp'],
  ['earthshaker_warboots', '/ui/whetstorm/items/earthshaker_warboots.webp'],
  ['rare_breastplate_tectonic_might', '/ui/whetstorm/items/rare_breastplate_tectonic_might.webp'],
  ['rare_monolithic_shoulderguards', '/ui/whetstorm/items/rare_monolithic_shoulderguards.webp'],
  ['rare_earthshaker_warboots', '/ui/whetstorm/items/rare_earthshaker_warboots.webp'],
]);
export function graskEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
