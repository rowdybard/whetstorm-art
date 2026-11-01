// Original 2D cosmetic paintings; held models are separate assets.
const SKINS = new Set(['ice_fang_sword', 'rimecrusher_mace', 'frostbite_dagger']);
export function hoarfrostThreeArmorySkinArt(id: string): string | null {
  return SKINS.has(id) ? `/ui/whetstorm/armory/${id}.webp` : null;
}
