// Original paintings for the four carried treasure map rarities.
const QUEST_TREASURE_MAP_ART = new Map<string, string>([
  ['treasure_map_common', '/ui/whetstorm/items/treasure_map_common.webp'],
  ['treasure_map_rare', '/ui/whetstorm/items/treasure_map_rare.webp'],
  ['treasure_map_epic', '/ui/whetstorm/items/treasure_map_epic.webp'],
  ['treasure_map_legendary', '/ui/whetstorm/items/treasure_map_legendary.webp'],
]);

export function questTreasureMapItemImageUrl(id: string): string | null {
  return QUEST_TREASURE_MAP_ART.get(id) ?? null;
}
