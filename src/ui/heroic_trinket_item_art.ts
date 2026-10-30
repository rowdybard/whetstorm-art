// Original paintings for heroic trinkets.
const ART = new Map<string, string>([
  ['bastion_sigil', '/ui/whetstorm/items/bastion_sigil.webp'],
  ['mooring_stone', '/ui/whetstorm/items/mooring_stone.webp'],
  ['menders_hourglass', '/ui/whetstorm/items/menders_hourglass.webp'],
  ['wellspring_seed', '/ui/whetstorm/items/wellspring_seed.webp'],
  ['paired_talons', '/ui/whetstorm/items/paired_talons.webp'],
  ['hunters_tally', '/ui/whetstorm/items/hunters_tally.webp'],
  ['stormjar', '/ui/whetstorm/items/stormjar.webp'],
  ['echoing_lens', '/ui/whetstorm/items/echoing_lens.webp'],
  ['forgefathers_temper', '/ui/whetstorm/items/forgefathers_temper.webp'],
  ['kindling_orb', '/ui/whetstorm/items/kindling_orb.webp'],
  ['molten_fletching', '/ui/whetstorm/items/molten_fletching.webp'],
  ['last_flame_lantern', '/ui/whetstorm/items/last_flame_lantern.webp'],
  ['gamblers_die', '/ui/whetstorm/items/gamblers_die.webp'],
  ['sundered_prism', '/ui/whetstorm/items/sundered_prism.webp'],
  ['wayfarers_lodestone', '/ui/whetstorm/items/wayfarers_lodestone.webp'],
  ['medallion_of_defiance', '/ui/whetstorm/items/medallion_of_defiance.webp'],
]);

export function heroicTrinketItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
