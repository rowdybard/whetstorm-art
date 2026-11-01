// Original 2D paintings; the held 3D models remain separate restricted assets.
const ORIGINAL_SKINS = new Set(['cosmarch_staff', 'emberwish_wand']);

export function cosmarchEmberwishArmorySkinArt(id: string): string | null {
  return ORIGINAL_SKINS.has(id) ? `/ui/whetstorm/armory/${id}.webp` : null;
}
