// Original Cinderweave upper equipment paintings.
const ART = new Map<string, string>([
  ['cinderweave_cowl', '/ui/whetstorm/items/cinderweave_cowl.webp'],
  ['cinderweave_mantle', '/ui/whetstorm/items/cinderweave_mantle.webp'],
  ['cinderweave_raiment', '/ui/whetstorm/items/cinderweave_raiment.webp'],
]);

export function cinderweaveUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
