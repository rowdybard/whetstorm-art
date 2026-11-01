// Original Ignivar Warspirit Emberscale lower armor paintings.
const ITEM_IMAGES = new Map<string, string>([
  ['warspirit_emberscale_legs', '/ui/whetstorm/items/warspirit_emberscale_legs.webp'],
  ['warspirit_emberscale_gloves', '/ui/whetstorm/items/warspirit_emberscale_gloves.webp'],
]);

export function ignivarWarspiritLowerItemImageUrl(id: string): string | null {
  return ITEM_IMAGES.get(id) ?? null;
}
