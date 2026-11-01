// Original Whetstorm paintings for the lower Hexthread raid set.
const IDS = new Set(['hexthread_gloves', 'hexthread_legs']);

export function hexthreadLowerItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
