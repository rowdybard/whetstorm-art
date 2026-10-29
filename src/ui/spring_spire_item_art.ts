// Original paintings for two Crucible staves.
const SPRING_SPIRE_ITEM_ART = new Map<string, string>([
  ['staff_of_the_last_spring', '/ui/whetstorm/items/staff_of_the_last_spring.webp'],
  ['forgefire_spire', '/ui/whetstorm/items/forgefire_spire.webp'],
]);

export function springSpireItemImageUrl(id: string): string | null {
  return SPRING_SPIRE_ITEM_ART.get(id) ?? null;
}
