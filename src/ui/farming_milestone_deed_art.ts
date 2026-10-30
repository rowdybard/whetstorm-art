// Original paintings for farming and feast milestones.
const ART = new Map<string, string>([
  ['prog_farming_100', '/ui/whetstorm/deeds/prog_farming_100.webp'],
  ['col_farm_roster', '/ui/whetstorm/deeds/col_farm_roster.webp'],
  ['prog_field_to_feast', '/ui/whetstorm/deeds/prog_field_to_feast.webp'],
]);

export function farmingMilestoneDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
