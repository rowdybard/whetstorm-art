// Original Whetstorm paintings for the lower Cinderbark raid set.
const IDS = new Set(['cinderbark_gloves', 'cinderbark_legs']);

export function cinderbarkLowerItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
