// Original Crucible Guardian leather equipment paintings.
const ART = new Map<string, string>([
  ['crucible_tank_leather_chest', '/ui/whetstorm/items/crucible_tank_leather_chest.webp'],
  ['crucible_tank_leather_waist', '/ui/whetstorm/items/crucible_tank_leather_waist.webp'],
  ['crucible_tank_leather_feet', '/ui/whetstorm/items/crucible_tank_leather_feet.webp'],
]);

export function crucibleGuardianLeatherEquipmentImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
