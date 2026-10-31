// Original Season 1 Ashstalker leather paintings.
const ART = new Map<string, string>([
  ['ashstalker_cowl', '/ui/whetstorm/items/ashstalker_cowl.webp'],
  ['ashstalker_shoulderguards', '/ui/whetstorm/items/ashstalker_shoulderguards.webp'],
  ['ashstalker_harness', '/ui/whetstorm/items/ashstalker_harness.webp'],
]);

export function ashstalkerS1ItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
