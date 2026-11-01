// Original Whetstorm paintings for the lower Aetherweave raid set.
const IDS = new Set(['chronoweave_gloves', 'chronoweave_legs']);

export function chronoweaveLowerItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
