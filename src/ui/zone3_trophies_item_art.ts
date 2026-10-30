// Original zone trophy paintings in a closed map.
const ART = new Map<string, string>([
  ['ogre_toe_ring', '/ui/whetstorm/items/ogre_toe_ring.webp'],
  ['inert_storm_shard', '/ui/whetstorm/items/inert_storm_shard.webp'],
  ['frayed_prayer_beads', '/ui/whetstorm/items/frayed_prayer_beads.webp'],
]);

export function zone3TrophiesItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
