// Original Whetstorm mount cosmetic card paintings.
const IDS: ReadonlySet<string> = new Set(['chimeglass_tortoise', 'rickshaw_mount']);
export function originalMountCosmeticCardArt(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/mount-skins/${id}.webp` : null;
}
