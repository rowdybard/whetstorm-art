// Original paintings for four Cinderweave Regalia slots.
const ART = new Map<string, string>([
  ['cinderweave_cord', '/ui/whetstorm/items/cinderweave_cord.webp'],
  ['cinderweave_legwraps', '/ui/whetstorm/items/cinderweave_legwraps.webp'],
  ['cinderweave_handwraps', '/ui/whetstorm/items/cinderweave_handwraps.webp'],
  ['cinderweave_slippers', '/ui/whetstorm/items/cinderweave_slippers.webp'],
]);

export function cinderweaveAccessoriesItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
