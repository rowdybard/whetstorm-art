// Original Whetstorm paintings for inert legacy reins items.
const IDS = new Set(['reins_chimeglass_tortoise', 'reins_rickshaw_mount']);

export function legacyReinsItemImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/items/${id}.webp` : null;
}
