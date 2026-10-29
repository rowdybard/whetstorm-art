// Original paintings for carried utility supplies.
const UTILITY_SUPPLIES_ART = new Map<string, string>([
  ['cartographers_ink', '/ui/whetstorm/items/cartographers_ink.webp'],
  ['lucent_reagent', '/ui/whetstorm/items/lucent_reagent.webp'],
  ['deed_of_making', '/ui/whetstorm/items/deed_of_making.webp'],
]);

export function utilitySuppliesItemImageUrl(id: string): string | null {
  return UTILITY_SUPPLIES_ART.get(id) ?? null;
}
