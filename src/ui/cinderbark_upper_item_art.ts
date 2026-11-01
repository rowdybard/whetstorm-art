// Original Whetstorm paintings for the upper Cinderbark raid set.
const IDS = new Set(['cinderbark_helmet', 'cinderbark_shoulder', 'cinderbark_chest']);

export function cinderbarkUpperItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
