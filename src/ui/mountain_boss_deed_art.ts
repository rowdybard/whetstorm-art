// Original paintings for mountain boss deeds.
const MOUNTAIN_BOSS_DEED_ART = new Map<string, string>([
  ['cmb_thunzharr', '/ui/whetstorm/deeds/cmb_thunzharr.webp'],
  ['cmb_thunzharr_unbroken', '/ui/whetstorm/deeds/cmb_thunzharr_unbroken.webp'],
  ['cmb_thunzharr_ten', '/ui/whetstorm/deeds/cmb_thunzharr_ten.webp'],
]);

export function mountainBossDeedImageUrl(id: string): string | null {
  return MOUNTAIN_BOSS_DEED_ART.get(id) ?? null;
}
