// Original Whetstorm 2D paintings. Held models remain separate assets.
const ORIGINAL_SKINS = new Set([
  'guildmark_arming_sword',
  'brasscap_axe',
  'tempered_flanged_mace',
  'guildmark_dirk',
  'brasscrown_staff',
  'lacquered_wand',
  'fletcher_s_guild_bow',
]);

export const ORIGINAL_ARMORY_ART_DIR = '/ui/whetstorm/armory';

export function originalArmorySkinArt(id: string): string | null {
  return ORIGINAL_SKINS.has(id) ? `${ORIGINAL_ARMORY_ART_DIR}/${id}.webp` : null;
}
