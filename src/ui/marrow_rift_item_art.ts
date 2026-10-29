// Original paintings for Marrowpoint and the Riftwarden's blade.
const MARROW_RIFT_ITEM_ART = new Map<string, string>([
  ['marrowpoint', '/ui/whetstorm/items/marrowpoint.webp'],
  ['riftwarden_voidblade', '/ui/whetstorm/items/riftwarden_voidblade.webp'],
]);

export function marrowRiftItemImageUrl(id: string): string | null {
  return MARROW_RIFT_ITEM_ART.get(id) ?? null;
}
