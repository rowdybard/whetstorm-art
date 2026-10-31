// Original Crucible caster leather equipment paintings.
const ART = new Map<string, string>([
  ['crucible_caster_leather_chest', '/ui/whetstorm/items/crucible_caster_leather_chest.webp'],
  ['crucible_caster_leather_waist', '/ui/whetstorm/items/crucible_caster_leather_waist.webp'],
  ['crucible_caster_leather_feet', '/ui/whetstorm/items/crucible_caster_leather_feet.webp'],
]);

export function crucibleCasterLeatherEquipmentImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
