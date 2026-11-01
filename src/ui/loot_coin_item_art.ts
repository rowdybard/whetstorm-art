// The loot money row shares the existing Whetstorm gold currency painting.
export function lootCoinItemImageUrl(id: string): string | null {
  return id === 'coin_gold' ? '/ui/whetstorm/hud/currency/coin_gold.webp' : null;
}
