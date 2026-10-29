// Original Mournweave cloth set paintings.
const MOURNWEAVE_ARMOR_ITEM_ART = new Map<string, string>([
  ['necromancers_starshroud', '/ui/whetstorm/items/necromancers_starshroud.webp'],
  ['necromancers_soulsteps', '/ui/whetstorm/items/necromancers_soulsteps.webp'],
  ['necromancers_soulspire_mantle', '/ui/whetstorm/items/necromancers_soulspire_mantle.webp'],
]);

export function mournweaveArmorItemImageUrl(id: string): string | null {
  return MOURNWEAVE_ARMOR_ITEM_ART.get(id) ?? null;
}
