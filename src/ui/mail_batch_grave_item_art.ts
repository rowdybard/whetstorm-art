// Original paintings for Gravewyrm dungeon armor drops.
const MAIL_BATCH_GRAVE_ITEM_ART = new Map<string, string>([
  ['gravewyrm_sabatons', '/ui/whetstorm/items/gravewyrm_sabatons.webp'],
  ['deathlord_legguards', '/ui/whetstorm/items/deathlord_legguards.webp'],
  ['deathlord_warplate', '/ui/whetstorm/items/deathlord_warplate.webp'],
  ['deathlords_dread_visage', '/ui/whetstorm/items/deathlords_dread_visage.webp'],
]);

export function mailBatchGraveItemImageUrl(id: string): string | null {
  return MAIL_BATCH_GRAVE_ITEM_ART.get(id) ?? null;
}
