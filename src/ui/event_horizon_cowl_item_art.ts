// Original Whetstorm paintings for all Event Horizon cowl hoard tiers.
const ART: ReadonlyMap<string, string> = new Map([
  ['rare_cowl_of_event_horizon', '/ui/whetstorm/items/rare_cowl_of_event_horizon.webp'],
  ['cowl_of_event_horizon', '/ui/whetstorm/items/cowl_of_event_horizon.webp'],
  ['legendary_cowl_of_event_horizon', '/ui/whetstorm/items/legendary_cowl_of_event_horizon.webp'],
]);
export function eventHorizonCowlItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
