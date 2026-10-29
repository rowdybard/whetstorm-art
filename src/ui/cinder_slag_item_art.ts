// Original paintings for two forge weapons.
const CINDER_SLAG_ITEM_ART = new Map<string, string>([
  ['cinderfang_kris', '/ui/whetstorm/items/cinderfang_kris.webp'],
  ['slagrender_cleaver', '/ui/whetstorm/items/slagrender_cleaver.webp'],
]);

export function cinderSlagItemImageUrl(id: string): string | null {
  return CINDER_SLAG_ITEM_ART.get(id) ?? null;
}
