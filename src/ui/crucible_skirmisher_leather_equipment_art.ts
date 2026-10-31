// Original Crucible Skirmisher leather equipment paintings.
const ART = new Map<string, string>([
  ['crucible_agi_leather_chest', '/ui/whetstorm/items/crucible_agi_leather_chest.webp'],
  ['crucible_agi_leather_waist', '/ui/whetstorm/items/crucible_agi_leather_waist.webp'],
  ['crucible_agi_leather_feet', '/ui/whetstorm/items/crucible_agi_leather_feet.webp'],
]);

export function crucibleSkirmisherLeatherEquipmentImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
