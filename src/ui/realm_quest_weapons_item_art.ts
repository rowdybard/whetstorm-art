// Individually painted class rewards from Calming the Deep.
const REALM_QUEST_WEAPONS = new Map<string, string>([
  ['veilsteel_blade', '/ui/whetstorm/items/veilsteel_blade.webp'],
  ['duskfang_dirk', '/ui/whetstorm/items/duskfang_dirk.webp'],
  ['gleamwood_stave', '/ui/whetstorm/items/gleamwood_stave.webp'],
]);

export function realmQuestWeaponsItemImageUrl(id: string): string | null {
  return REALM_QUEST_WEAPONS.get(id) ?? null;
}
