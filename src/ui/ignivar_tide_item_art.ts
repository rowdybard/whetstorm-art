// Original paintings for the Crucible mail healing offset pieces.
const ART = new Map<string, string>([
  ['tidebinder_links', '/ui/whetstorm/items/tidebinder_links.webp'],
  ['springwarden_sabatons', '/ui/whetstorm/items/springwarden_sabatons.webp'],
]);

export function ignivarTideItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
