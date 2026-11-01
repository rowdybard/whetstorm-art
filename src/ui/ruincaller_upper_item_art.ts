// Original Whetstorm paintings for the upper Ruincaller raid set.
const IDS = new Set(['ruincaller_helmet', 'ruincaller_shoulder', 'ruincaller_chest']);

export function ruincallerUpperItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
