// Original Whetstorm paintings for the lower Ruincaller raid set.
const IDS = new Set(['ruincaller_gloves', 'ruincaller_legs']);

export function ruincallerLowerItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
