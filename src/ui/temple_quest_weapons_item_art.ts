// Individually painted class rewards from the Palecoil quest.
const TEMPLE_QUEST_WEAPONS = new Map<string, string>([
  ['moonscale_saber', '/ui/whetstorm/items/moonscale_saber.webp'],
  ['palecoil_rod', '/ui/whetstorm/items/palecoil_rod.webp'],
  ['tideglass_dirk', '/ui/whetstorm/items/tideglass_dirk.webp'],
]);

export function templeQuestWeaponsItemImageUrl(id: string): string | null {
  return TEMPLE_QUEST_WEAPONS.get(id) ?? null;
}
