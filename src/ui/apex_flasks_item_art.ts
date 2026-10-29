// Original paintings for crafted apex alchemy flasks.
const APEX_FLASKS_ART = new Map<string, string>([
  ['ironhusk_flask', '/ui/whetstorm/items/ironhusk_flask.webp'],
  ['warboar_flask', '/ui/whetstorm/items/warboar_flask.webp'],
  ['runewater_flask', '/ui/whetstorm/items/runewater_flask.webp'],
]);

export function apexFlasksItemImageUrl(id: string): string | null {
  return APEX_FLASKS_ART.get(id) ?? null;
}
