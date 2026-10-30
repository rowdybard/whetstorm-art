// Original paintings for two catalog weapons.
const FERAL_RIME_ITEM_ART = new Map<string, string>([
  ['vanguard_feral_staff', '/ui/whetstorm/items/vanguard_feral_staff.webp'],
  ['rimefang', '/ui/whetstorm/items/rimefang.webp'],
]);

export function feralRimeItemImageUrl(id: string): string | null {
  return FERAL_RIME_ITEM_ART.get(id) ?? null;
}
