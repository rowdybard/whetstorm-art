// Original Whetstorm paintings for the upper Wildfang raid set.
const IDS = new Set(['wildfang_emberhide_helmet', 'wildfang_emberhide_shoulder', 'wildfang_emberhide_chest']);

export function wildfangUpperItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
