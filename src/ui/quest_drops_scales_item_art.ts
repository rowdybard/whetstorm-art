// Original quest-gated drops, mapped by item id only.
const QUEST_DROPS_SCALES_ART = new Map<string, string>([
  ['ps_lustrous_pearl', '/ui/whetstorm/items/ps_lustrous_pearl.webp'],
  ['palecoil_heartscale', '/ui/whetstorm/items/palecoil_heartscale.webp'],
  ['emberwing_scale', '/ui/whetstorm/items/emberwing_scale.webp'],
]);

export function questDropsScalesItemImageUrl(id: string): string | null {
  return QUEST_DROPS_SCALES_ART.get(id) ?? null;
}
