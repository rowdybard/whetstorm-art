// Original 2D Fallen Star paintings; held models remain separate assets.
const ART = new Map<string, string>([
  ['skyrender_axe', '/ui/whetstorm/armory/skyrender_axe.webp'],
  ['starfall_mace', '/ui/whetstorm/armory/starfall_mace.webp'],
  ['astravyr_dagger', '/ui/whetstorm/armory/astravyr_dagger.webp'],
]);
export function fallenStarTrioArmorySkinArt(id: string): string | null {
  return ART.get(id) ?? null;
}
