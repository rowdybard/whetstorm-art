// Original paintings for two daggers.
const VOID_DUSK_ITEM_ART = new Map<string, string>([
  ['voidsong_dirk', '/ui/whetstorm/items/voidsong_dirk.webp'],
  ['duskwhisper', '/ui/whetstorm/items/duskwhisper.webp'],
]);

export function voidDuskItemImageUrl(id: string): string | null {
  return VOID_DUSK_ITEM_ART.get(id) ?? null;
}
