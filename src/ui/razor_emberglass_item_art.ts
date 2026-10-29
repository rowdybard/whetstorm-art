// Original paintings for two warfare weapons.
const RAZOR_EMBERGLASS_ITEM_ART = new Map<string, string>([
  ['first_blood_razor', '/ui/whetstorm/items/first_blood_razor.webp'],
  ['emberglass_warstaff', '/ui/whetstorm/items/emberglass_warstaff.webp'],
]);

export function razorEmberglassItemImageUrl(id: string): string | null {
  return RAZOR_EMBERGLASS_ITEM_ART.get(id) ?? null;
}
