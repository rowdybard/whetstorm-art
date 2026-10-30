// Original paintings for the seventeenth October 30 item batch.
const ART = new Map<string, string>([
  ['smolderstrike_gloves', '/ui/whetstorm/items/smolderstrike_gloves.webp'],
  ['smolderstrike_legs', '/ui/whetstorm/items/smolderstrike_legs.webp'],
  ['ashveil_helmet', '/ui/whetstorm/items/ashveil_helmet.webp'],
  ['ashveil_shoulder', '/ui/whetstorm/items/ashveil_shoulder.webp'],
  [
    'formula_enchant_gloves_forged_might',
    '/ui/whetstorm/items/formula_enchant_gloves_forged_might.webp',
  ],
  ['formula_piston_drive', '/ui/whetstorm/items/formula_piston_drive.webp'],
  ['formula_dawnfire_etching', '/ui/whetstorm/items/formula_dawnfire_etching.webp'],
  ['formula_dawns_benediction', '/ui/whetstorm/items/formula_dawns_benediction.webp'],
]);

export function oct30SeventeenthOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
