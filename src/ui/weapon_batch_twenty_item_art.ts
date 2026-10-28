// Original paintings for early-zone temple and delve weapons.
const WEAPON_BATCH_TWENTY_ITEM_ART = new Map<string, string>([
  ['drownedmoon_maul', '/ui/whetstorm/items/drownedmoon_maul.webp'],
  ['drownedmoon_scepter', '/ui/whetstorm/items/drownedmoon_scepter.webp'],
  ['drownedmoon_kris', '/ui/whetstorm/items/drownedmoon_kris.webp'],
  ['nhalias_bell_maul', '/ui/whetstorm/items/nhalias_bell_maul.webp'],
]);

export function weaponBatchTwentyItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_TWENTY_ITEM_ART.get(id) ?? null;
}
