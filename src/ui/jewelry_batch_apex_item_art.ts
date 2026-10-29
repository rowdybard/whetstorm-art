// Individually painted original Whetstorm jewelry, mapped only to live item IDs.
const JEWELRY_BATCH_APEX = new Map<string, string>([
  ['swiftfang_talisman', '/ui/whetstorm/items/swiftfang_talisman.webp'],
  ['medallion_of_endless_profit', '/ui/whetstorm/items/medallion_of_endless_profit.webp'],
  ['warhewn_signet', '/ui/whetstorm/items/warhewn_signet.webp'],
  ['prismglass_loop', '/ui/whetstorm/items/prismglass_loop.webp'],
]);

export function jewelryBatchApexItemImageUrl(id: string): string | null {
  return JEWELRY_BATCH_APEX.get(id) ?? null;
}
