// Original paintings for four Highwatch quest objects.
const QUEST_HIGHWATCH_SECOND_ART = new Map<string, string>([
  ['ogre_war_totem', '/ui/whetstorm/items/ogre_war_totem.webp'],
  ['wyrmcult_orders', '/ui/whetstorm/items/wyrmcult_orders.webp'],
  ['ritual_phylactery', '/ui/whetstorm/items/ritual_phylactery.webp'],
  ['vanguard_bone', '/ui/whetstorm/items/vanguard_bone.webp'],
]);

export function questHighwatchSecondItemImageUrl(id: string): string | null {
  return QUEST_HIGHWATCH_SECOND_ART.get(id) ?? null;
}
