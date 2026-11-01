// Original paintings for the Crucible mail tank offset pieces.
const ART = new Map<string, string>([
  ['forgewall_girdle', '/ui/whetstorm/items/forgewall_girdle.webp'],
  ['anvilstance_sabatons', '/ui/whetstorm/items/anvilstance_sabatons.webp'],
]);

export function ignivarMailTankItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}