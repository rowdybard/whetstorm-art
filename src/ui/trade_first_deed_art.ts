// Original crests for early crafting progression.
const ART: ReadonlyMap<string, string> = new Map([
  ['prog_callused_hands', '/ui/whetstorm/deeds/prog_callused_hands.webp'],
  ['prog_tools_of_the_trade', '/ui/whetstorm/deeds/prog_tools_of_the_trade.webp'],
  ['prog_guildsworn', '/ui/whetstorm/deeds/prog_guildsworn.webp'],
  ['prog_masterwright', '/ui/whetstorm/deeds/prog_masterwright.webp'],
]);

export function tradeFirstDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
