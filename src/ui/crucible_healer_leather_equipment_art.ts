// Original Crucible healer leather equipment paintings.
const ART = new Map<string, string>([
  ['crucible_healer_leather_chest', '/ui/whetstorm/items/crucible_healer_leather_chest.webp'],
  ['crucible_healer_leather_waist', '/ui/whetstorm/items/crucible_healer_leather_waist.webp'],
  ['crucible_healer_leather_feet', '/ui/whetstorm/items/crucible_healer_leather_feet.webp'],
]);

export function crucibleHealerLeatherEquipmentImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
