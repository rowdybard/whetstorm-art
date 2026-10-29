// Original Ignivar ring paintings in a closed map.
const ART = new Map<string, string>([
  ['seal_of_the_forgewall', '/ui/whetstorm/items/seal_of_the_forgewall.webp'],
  ['band_of_marked_strikes', '/ui/whetstorm/items/band_of_marked_strikes.webp'],
  ['circle_of_cinders', '/ui/whetstorm/items/circle_of_cinders.webp'],
  ['loop_of_quiet_springs', '/ui/whetstorm/items/loop_of_quiet_springs.webp'],
]);

export function jewelryIgnivarRingsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
