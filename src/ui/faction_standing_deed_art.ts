// Original paintings for faction standing milestones.
const ART = new Map<string, string>([
  ['prog_rift_watch_trusted', '/ui/whetstorm/deeds/prog_rift_watch_trusted.webp'],
  ['prog_church_order_trusted', '/ui/whetstorm/deeds/prog_church_order_trusted.webp'],
  ['prog_automatons_trusted', '/ui/whetstorm/deeds/prog_automatons_trusted.webp'],
  ['prog_faction_champion_all', '/ui/whetstorm/deeds/prog_faction_champion_all.webp'],
]);

export function factionStandingDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
