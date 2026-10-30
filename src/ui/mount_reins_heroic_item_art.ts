// Original paintings for collectible heroic mount reins.
const MOUNT_REINS_HEROIC_ART = new Map<string, string>([
  ['reins_grag_bear', '/ui/whetstorm/items/reins_grag_bear.webp'],
  ['reins_stalkglider_snail', '/ui/whetstorm/items/reins_stalkglider_snail.webp'],
  ['reins_shadowjump_toad', '/ui/whetstorm/items/reins_shadowjump_toad.webp'],
]);

export function mountReinsHeroicItemImageUrl(id: string): string | null {
  return MOUNT_REINS_HEROIC_ART.get(id) ?? null;
}
