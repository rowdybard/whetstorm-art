// Original paintings for the Crucible leather healing offset pieces.
const ART = new Map<string, string>([
  ['grovetender_belt', '/ui/whetstorm/items/grovetender_belt.webp'],
  ['dewfall_moccasins', '/ui/whetstorm/items/dewfall_moccasins.webp'],
]);

export function ignivarGroveItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
