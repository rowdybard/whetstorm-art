// Original Whetstorm paintings for all three Grask hoard item tiers.
const ART: ReadonlyMap<string, string> = new Map([
  ['breastplate_tectonic_might', '/ui/whetstorm/items/breastplate_tectonic_might.webp'],
  ['monolithic_shoulderguards', '/ui/whetstorm/items/monolithic_shoulderguards.webp'],
  ['earthshaker_warboots', '/ui/whetstorm/items/earthshaker_warboots.webp'],
  ['rare_breastplate_tectonic_might', '/ui/whetstorm/items/rare_breastplate_tectonic_might.webp'],
  ['rare_monolithic_shoulderguards', '/ui/whetstorm/items/rare_monolithic_shoulderguards.webp'],
  ['rare_earthshaker_warboots', '/ui/whetstorm/items/rare_earthshaker_warboots.webp'],
  [
    'legendary_breastplate_tectonic_might',
    '/ui/whetstorm/items/legendary_breastplate_tectonic_might.webp',
  ],
  [
    'legendary_monolithic_shoulderguards',
    '/ui/whetstorm/items/legendary_monolithic_shoulderguards.webp',
  ],
  ['legendary_earthshaker_warboots', '/ui/whetstorm/items/legendary_earthshaker_warboots.webp'],
]);
export function graskEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
