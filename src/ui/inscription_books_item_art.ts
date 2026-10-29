// Original paintings for crafted inscription offhands.
const INSCRIPTION_BOOKS_ART = new Map<string, string>([
  ['silverleaf_primer', '/ui/whetstorm/items/silverleaf_primer.webp'],
  ['goldleaf_folio', '/ui/whetstorm/items/goldleaf_folio.webp'],
  ['sunpetal_grimoire', '/ui/whetstorm/items/sunpetal_grimoire.webp'],
]);

export function inscriptionBooksItemImageUrl(id: string): string | null {
  return INSCRIPTION_BOOKS_ART.get(id) ?? null;
}
