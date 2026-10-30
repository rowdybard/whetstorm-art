// Original Whetstorm paintings for four Grandmaster craft milestones.
const ART: ReadonlyMap<string, string> = new Map([
  ['prog_grandmaster_alchemy', '/ui/whetstorm/deeds/prog_grandmaster_alchemy.webp'],
  ['prog_grandmaster_cooking', '/ui/whetstorm/deeds/prog_grandmaster_cooking.webp'],
  ['prog_grandmaster_enchanting', '/ui/whetstorm/deeds/prog_grandmaster_enchanting.webp'],
  ['prog_grandmaster_inscription', '/ui/whetstorm/deeds/prog_grandmaster_inscription.webp'],
]);
export function grandmasterCraftDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
