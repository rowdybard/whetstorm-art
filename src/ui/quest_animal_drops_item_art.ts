// Original paintings for quest collection animal drops.
const QUEST_ANIMAL_DROPS_ART = new Map<string, string>([
  ['thick_winter_pelt', '/ui/whetstorm/items/thick_winter_pelt.webp'],
  ['ridge_stalker_pelt', '/ui/whetstorm/items/ridge_stalker_pelt.webp'],
  ['plump_fen_eel', '/ui/whetstorm/items/plump_fen_eel.webp'],
]);

export function questAnimalDropsItemImageUrl(id: string): string | null {
  return QUEST_ANIMAL_DROPS_ART.get(id) ?? null;
}
