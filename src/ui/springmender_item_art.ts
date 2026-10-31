// Original paintings for Springmender mail armor.
const ART = new Map<string, string>([
  ['springmender_helmet', '/ui/whetstorm/items/springmender_helmet.webp'],
  ['springmender_shoulder', '/ui/whetstorm/items/springmender_shoulder.webp'],
  ['springmender_chest', '/ui/whetstorm/items/springmender_chest.webp'],
  ['springmender_gloves', '/ui/whetstorm/items/springmender_gloves.webp'],
  ['springmender_legs', '/ui/whetstorm/items/springmender_legs.webp'],
]);

export function springmenderItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
