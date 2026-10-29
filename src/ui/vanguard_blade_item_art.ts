// Original paintings for two Vanguard blades.
const VANGUARD_BLADE_ITEM_ART = new Map<string, string>([
  ['vanguard_verdict_greatsword', '/ui/whetstorm/items/vanguard_verdict_greatsword.webp'],
  ['vanguard_oath_blade', '/ui/whetstorm/items/vanguard_oath_blade.webp'],
]);

export function vanguardBladeItemImageUrl(id: string): string | null {
  return VANGUARD_BLADE_ITEM_ART.get(id) ?? null;
}
