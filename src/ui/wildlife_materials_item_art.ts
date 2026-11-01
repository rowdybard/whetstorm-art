// Original Whetstorm paintings for retained wildlife materials.
const IDS = new Set(['soft_down', 'amber_hide', 'stag_antler']);

export function wildlifeMaterialsItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
