// Original paintings for glowing quest collection drops.
const QUEST_GLOWING_DROPS_ART = new Map<string, string>([
  ['aurora_mote', '/ui/whetstorm/items/aurora_mote.webp'],
  ['blessed_embers', '/ui/whetstorm/items/blessed_embers.webp'],
  ['gilded_sap_clot', '/ui/whetstorm/items/gilded_sap_clot.webp'],
]);

export function questGlowingDropsItemImageUrl(id: string): string | null {
  return QUEST_GLOWING_DROPS_ART.get(id) ?? null;
}
