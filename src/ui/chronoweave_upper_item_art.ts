// Original Whetstorm paintings for the upper Aetherweave raid set.
const IDS = new Set(['chronoweave_helmet', 'chronoweave_shoulder', 'chronoweave_chest']);

export function chronoweaveUpperItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
