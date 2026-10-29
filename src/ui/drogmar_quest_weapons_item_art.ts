// Individually painted class rewards from Warlord Drogmar.
const DROGMAR_QUEST_WEAPONS = new Map<string, string>([
  ['drogmars_skullcleaver', '/ui/whetstorm/items/drogmars_skullcleaver.webp'],
  ['ogre_bonecharm_staff', '/ui/whetstorm/items/ogre_bonecharm_staff.webp'],
  ['gutripper_shiv', '/ui/whetstorm/items/gutripper_shiv.webp'],
]);

export function drogmarQuestWeaponsItemImageUrl(id: string): string | null {
  return DROGMAR_QUEST_WEAPONS.get(id) ?? null;
}
