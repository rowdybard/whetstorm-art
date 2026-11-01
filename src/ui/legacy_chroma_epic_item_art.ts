// Original conceptual inventory paintings for four legacy mech chromas.
const ART = new Map<string, string>([
  ['imperial_crimson_armor_plate', '/ui/whetstorm/items/imperial_crimson_armor_plate.webp'],
  ['imperial_gold_armor_plate', '/ui/whetstorm/items/imperial_gold_armor_plate.webp'],
  ['vanguard_azure_armor_plate', '/ui/whetstorm/items/vanguard_azure_armor_plate.webp'],
  ['vanguard_chrome_armor_plate', '/ui/whetstorm/items/vanguard_chrome_armor_plate.webp'],
]);

export function legacyChromaEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
