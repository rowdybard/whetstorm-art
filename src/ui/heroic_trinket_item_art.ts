// Original paintings for four heroic trinkets.
const ART = new Map<string, string>([
  ['bastion_sigil', '/ui/whetstorm/items/bastion_sigil.webp'],
  ['mooring_stone', '/ui/whetstorm/items/mooring_stone.webp'],
  ['menders_hourglass', '/ui/whetstorm/items/menders_hourglass.webp'],
  ['wellspring_seed', '/ui/whetstorm/items/wellspring_seed.webp'],
]);

export function heroicTrinketItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
