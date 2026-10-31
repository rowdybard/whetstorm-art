// Original Season 1 Furyforged mail paintings.
const ART = new Map<string, string>([
  ['furyforged_warhelm', '/ui/whetstorm/items/furyforged_warhelm.webp'],
  ['furyforged_warspaulders', '/ui/whetstorm/items/furyforged_warspaulders.webp'],
  ['furyforged_warplate', '/ui/whetstorm/items/furyforged_warplate.webp'],
]);

export function furyforgedS1ItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
