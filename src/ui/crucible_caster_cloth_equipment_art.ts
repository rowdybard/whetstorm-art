// Original Crucible caster cloth equipment paintings.
const ART = new Map<string, string>([
  ['crucible_caster_cloth_chest', '/ui/whetstorm/items/crucible_caster_cloth_chest.webp'],
  ['crucible_caster_cloth_waist', '/ui/whetstorm/items/crucible_caster_cloth_waist.webp'],
  ['crucible_caster_cloth_feet', '/ui/whetstorm/items/crucible_caster_cloth_feet.webp'],
]);

export function crucibleCasterClothEquipmentImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
