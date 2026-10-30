// Original paintings for obtainable mount reins and keys.
const MOUNT_REINS_REMAINING_ART = new Map<string, string>([
  ['reins_valorsteed', '/ui/whetstorm/items/reins_valorsteed.webp'],
  ['reins_avian_strider', '/ui/whetstorm/items/reins_avian_strider.webp'],
  ['reins_lanternback_troll', '/ui/whetstorm/items/reins_lanternback_troll.webp'],
  ['reins_stormfeather_griffin', '/ui/whetstorm/items/reins_stormfeather_griffin.webp'],
  ['reins_thunderstrut_gobbler', '/ui/whetstorm/items/reins_thunderstrut_gobbler.webp'],
  ['reins_aether_hover_cycle', '/ui/whetstorm/items/reins_aether_hover_cycle.webp'],
]);
export function mountReinsRemainingItemImageUrl(id: string): string | null {
  return MOUNT_REINS_REMAINING_ART.get(id) ?? null;
}
