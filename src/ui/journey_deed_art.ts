// Original paintings for journeys and discoveries.
const JOURNEY_DEED_ART = new Map<string, string>([
  ['exp_long_road_north', '/ui/whetstorm/deeds/exp_long_road_north.webp'],
  ['exp_world_traveler', '/ui/whetstorm/deeds/exp_world_traveler.webp'],
  ['exp_clue_first_casket', '/ui/whetstorm/deeds/exp_clue_first_casket.webp'],
  ['exp_harbor_to_harbor', '/ui/whetstorm/deeds/exp_harbor_to_harbor.webp'],
]);

export function journeyDeedImageUrl(id: string): string | null {
  return JOURNEY_DEED_ART.get(id) ?? null;
}
