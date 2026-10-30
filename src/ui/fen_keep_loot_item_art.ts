// Original paintings for fen loot and the Last Keep keepsake.
const FEN_KEEP_LOOT_ART = new Map<string, string>([
  ['soggy_moccasin', '/ui/whetstorm/items/soggy_moccasin.webp'],
  ['deepfen_pearl', '/ui/whetstorm/items/deepfen_pearl.webp'],
  ['last_keep_signet', '/ui/whetstorm/items/last_keep_signet.webp'],
]);

export function fenKeepLootItemImageUrl(id: string): string | null {
  return FEN_KEEP_LOOT_ART.get(id) ?? null;
}
