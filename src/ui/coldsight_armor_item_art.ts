// Original Coldsight Tracker leather set paintings.
const COLDSIGHT_ARMOR_ITEM_ART = new Map<string, string>([
  ['coldsight_trackers_helmet', '/ui/whetstorm/items/coldsight_trackers_helmet.webp'],
  ['coldsight_trackers_shoulder', '/ui/whetstorm/items/coldsight_trackers_shoulder.webp'],
  ['coldsight_trackers_chest', '/ui/whetstorm/items/coldsight_trackers_chest.webp'],
  ['coldsight_trackers_gloves', '/ui/whetstorm/items/coldsight_trackers_gloves.webp'],
  ['coldsight_trackers_legs', '/ui/whetstorm/items/coldsight_trackers_legs.webp'],
]);

export function coldsightArmorItemImageUrl(id: string): string | null {
  return COLDSIGHT_ARMOR_ITEM_ART.get(id) ?? null;
}
