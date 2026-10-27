// Individually painted, original Whetstorm art for current starter items.
// A closed map prevents arbitrary IDs from becoming asset paths.
const STARTER_ITEM_ART = new Map<string, string>([
  ['baked_bread', '/ui/whetstorm/items/baked_bread.webp'],
  ['spring_water', '/ui/whetstorm/items/spring_water.webp'],
  ['recruit_tunic', '/ui/whetstorm/items/recruit_tunic.webp'],
  ['apprentice_robe', '/ui/whetstorm/items/apprentice_robe.webp'],
  ['footpad_jerkin', '/ui/whetstorm/items/footpad_jerkin.webp'],
  ['worn_sword', '/ui/whetstorm/items/worn_sword.webp'],
  ['rusty_dagger', '/ui/whetstorm/items/rusty_dagger.webp'],
  ['rusty_hatchet', '/ui/whetstorm/items/rusty_hatchet.webp'],
  ['gnarled_staff', '/ui/whetstorm/items/gnarled_staff.webp'],
  ['training_mace', '/ui/whetstorm/items/training_mace.webp'],
  ['eastbrook_buckler', '/ui/whetstorm/items/eastbrook_buckler.webp'],
]);

export function starterItemImageUrl(id: string): string | null {
  return STARTER_ITEM_ART.get(id) ?? null;
}
