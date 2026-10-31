// Original Whetstorm paintings for the epic Hoarfrost Warden hoard items.
const ART: ReadonlyMap<string, string> = new Map([
  ['permafrost_legguards', '/ui/whetstorm/items/permafrost_legguards.webp'],
  ['frostbitten_rime_slippers', '/ui/whetstorm/items/frostbitten_rime_slippers.webp'],
  ['rime_crusted_grips', '/ui/whetstorm/items/rime_crusted_grips.webp'],
]);
export function hoarfrostEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
