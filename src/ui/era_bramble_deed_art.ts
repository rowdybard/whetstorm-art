// Original paintings for an era milestone and a collection deed.
const ART: ReadonlyMap<string, string> = new Map([
  ['col_set_bramblehide', '/ui/whetstorm/deeds/col_set_bramblehide.webp'],
  ['feat_era_cap', '/ui/whetstorm/deeds/feat_era_cap.webp'],
]);

export function eraBrambleDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
