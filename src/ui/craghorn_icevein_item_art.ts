// Original paintings for two common weapons.
const CRAGHORN_ICEVEIN_ITEM_ART = new Map<string, string>([
  ['craghorn_staff', '/ui/whetstorm/items/craghorn_staff.webp'],
  ['icevein_dirk', '/ui/whetstorm/items/icevein_dirk.webp'],
]);

export function craghornIceveinItemImageUrl(id: string): string | null {
  return CRAGHORN_ICEVEIN_ITEM_ART.get(id) ?? null;
}
