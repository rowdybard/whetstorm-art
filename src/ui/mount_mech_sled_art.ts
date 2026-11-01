// Original mount cosmetic card paintings; the held 3D mount assets are separate.
const IDS = new Set(['mech_bird', 'goblin_rocket_sled']);
export function mechSledMountSkinArt(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/mount-cards/${id}.webp` : null;
}
