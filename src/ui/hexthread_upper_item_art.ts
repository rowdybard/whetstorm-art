// Original Whetstorm paintings for the upper Hexthread raid set.
const IDS = new Set(['hexthread_helmet', 'hexthread_shoulder', 'hexthread_chest']);

export function hexthreadUpperItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
