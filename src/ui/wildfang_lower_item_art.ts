// Original Whetstorm paintings for the lower Wildfang raid set.
const IDS = new Set(['wildfang_emberhide_gloves', 'wildfang_emberhide_legs']);

export function wildfangLowerItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
