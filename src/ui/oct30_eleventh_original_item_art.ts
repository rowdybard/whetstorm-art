// Original paintings for the eleventh October 30 item batch.
const ART = new Map<string, string>([
  ['verdant_heart_vestment', '/ui/whetstorm/items/verdant_heart_vestment.webp'],
  ['sunbone_oracles_crown', '/ui/whetstorm/items/sunbone_oracles_crown.webp'],
  ['bloodmane_war_legguards', '/ui/whetstorm/items/bloodmane_war_legguards.webp'],
  ['frostmane_mantle', '/ui/whetstorm/items/frostmane_mantle.webp'],
]);

export function oct30EleventhOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
