// Individually painted Whetstorm art for the first two equipment-reward quests.
// A closed map prevents arbitrary IDs from becoming asset paths.
const EARLY_QUEST_ITEM_ART = new Map<string, string>([
  ['redbrook_blade', '/ui/whetstorm/items/redbrook_blade.webp'],
  ['apprentice_staff', '/ui/whetstorm/items/apprentice_staff.webp'],
  ['keen_dirk', '/ui/whetstorm/items/keen_dirk.webp'],
  ['militia_vest', '/ui/whetstorm/items/militia_vest.webp'],
  ['woven_robe', '/ui/whetstorm/items/woven_robe.webp'],
  ['shadow_jerkin', '/ui/whetstorm/items/shadow_jerkin.webp'],
]);

export function earlyQuestItemImageUrl(id: string): string | null {
  return EARLY_QUEST_ITEM_ART.get(id) ?? null;
}
