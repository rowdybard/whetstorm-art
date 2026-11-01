// Original Whetstorm paintings for the upper Pyroclast raid set.
const IDS = new Set(['pyroclast_helmet', 'pyroclast_shoulder', 'pyroclast_chest']);

export function pyroclastUpperItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
