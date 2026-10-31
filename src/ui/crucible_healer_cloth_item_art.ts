// Original Crucible healer cloth paintings.
const ART = new Map<string, string>([
  ['crucible_healer_cloth_chest', '/ui/whetstorm/items/crucible_healer_cloth_chest.webp'],
  ['crucible_healer_cloth_waist', '/ui/whetstorm/items/crucible_healer_cloth_waist.webp'],
  ['crucible_healer_cloth_feet', '/ui/whetstorm/items/crucible_healer_cloth_feet.webp'],
]);

export function crucibleHealerClothItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
