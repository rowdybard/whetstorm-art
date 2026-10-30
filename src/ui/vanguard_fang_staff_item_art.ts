// Original paintings for two Vanguard weapons.
const VANGUARD_FANG_STAFF_ITEM_ART = new Map<string, string>([
  ['vanguard_fang_dagger', '/ui/whetstorm/items/vanguard_fang_dagger.webp'],
  ['vanguard_warstaff', '/ui/whetstorm/items/vanguard_warstaff.webp'],
]);

export function vanguardFangStaffItemImageUrl(id: string): string | null {
  return VANGUARD_FANG_STAFF_ITEM_ART.get(id) ?? null;
}
