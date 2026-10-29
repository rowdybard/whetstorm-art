// Original profession station paintings in a closed map.
const ART = new Map<string, string>([
  ['masters_field_forge', '/ui/whetstorm/items/masters_field_forge.webp'],
  ['grand_cauldron', '/ui/whetstorm/items/grand_cauldron.webp'],
  ['laden_hearth', '/ui/whetstorm/items/laden_hearth.webp'],
]);

export function professionStationsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
