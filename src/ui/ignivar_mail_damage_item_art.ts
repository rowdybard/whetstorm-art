// Original paintings for the Crucible mail damage offset pieces.
const ART = new Map<string, string>([
  ['warforged_waistguard', '/ui/whetstorm/items/warforged_waistguard.webp'],
  ['furnace_march_greaves', '/ui/whetstorm/items/furnace_march_greaves.webp'],
]);

export function ignivarMailDamageItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
