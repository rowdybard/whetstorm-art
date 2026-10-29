// Original paintings for Heroic Quartermaster jewelry.
const ART = new Map<string, string>([
  ['zyzzs_deathless_signet', '/ui/whetstorm/items/zyzzs_deathless_signet.webp'],
  ['architects_cornerstone', '/ui/whetstorm/items/architects_cornerstone.webp'],
  ['yumis_keepsake_locket', '/ui/whetstorm/items/yumis_keepsake_locket.webp'],
  ['zense_meridian', '/ui/whetstorm/items/zense_meridian.webp'],
]);

export function jewelryHeroicQuartermasterItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
