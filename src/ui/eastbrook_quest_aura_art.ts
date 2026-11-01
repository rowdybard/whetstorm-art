// Original Eastbrook world quest aura paintings, keyed by exact runtime identity.
const ART = new Map<string, string>([
  ['world_quest_delivery_cargo', '/ui/whetstorm/auras/world_quest_delivery_cargo.webp'],
  ['world_quest_shadow_cloak', '/ui/whetstorm/auras/world_quest_shadow_cloak.webp'],
]);

export function eastbrookQuestAuraImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
