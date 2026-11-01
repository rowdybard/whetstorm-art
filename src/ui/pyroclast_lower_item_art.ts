// Original Whetstorm paintings for the lower Pyroclast raid set.
const IDS = new Set(['pyroclast_gloves', 'pyroclast_legs']);

export function pyroclastLowerItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
