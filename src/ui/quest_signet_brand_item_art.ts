// Original paintings for two quest inventory objects.
const QUEST_SIGNET_BRAND = new Map<string, string>([
  ['kings_signet', '/ui/whetstorm/items/kings_signet.webp'],
  ['ashbone_war_brand', '/ui/whetstorm/items/ashbone_war_brand.webp'],
]);

export function questSignetBrandItemImageUrl(id: string): string | null {
  return QUEST_SIGNET_BRAND.get(id) ?? null;
}
