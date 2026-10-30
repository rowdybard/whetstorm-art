import { ORIGINAL_ARMORY_ART_DIR } from './armory_guildmark_art';

// Original 2D paintings; held 3D models remain separate restricted assets.
const ORIGINAL_SKINS = new Set([
  'cinderbrand_sword',
  'emberbite_axe',
  'smoulderfall_mace',
  'ashspark_dagger',
  'forgeheart_staff',
  'emberwrought_wand',
  'cinderlatch_crossbow',
]);

export function emberwroughtArmorySkinArt(id: string): string | null {
  return ORIGINAL_SKINS.has(id) ? `${ORIGINAL_ARMORY_ART_DIR}/${id}.webp` : null;
}
