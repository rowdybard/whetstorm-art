// Individually painted Whetstorm early-world weapons, kept in a closed map.
const WEAPON_BATCH_TWELVE_ITEM_ART = new Map<string, string>([
  ['caravan_warden_dirk', '/ui/whetstorm/items/caravan_warden_dirk.webp'],
  ['ironedge_longsword', '/ui/whetstorm/items/ironedge_longsword.webp'],
  ['ironshod_maul', '/ui/whetstorm/items/ironshod_maul.webp'],
  ['whetted_iron_dirk', '/ui/whetstorm/items/whetted_iron_dirk.webp'],
]);

export function weaponBatchTwelveItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_TWELVE_ITEM_ART.get(id) ?? null;
}
