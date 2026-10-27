// Original paintings for early quest materials.
const EARLY_QUEST_MATERIAL_ART = new Map<string, string>([
  ['greyjaw_fang', '/ui/whetstorm/items/greyjaw_fang.webp'],
  ['webwood_silk', '/ui/whetstorm/items/webwood_silk.webp'],
  ['supply_crate', '/ui/whetstorm/items/supply_crate.webp'],
  ['bandit_bandana', '/ui/whetstorm/items/bandit_bandana.webp'],
]);

export function earlyQuestMaterialItemImageUrl(id: string): string | null {
  return EARLY_QUEST_MATERIAL_ART.get(id) ?? null;
}
