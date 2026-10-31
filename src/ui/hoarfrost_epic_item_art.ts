// Original Whetstorm paintings for epic and Tarnished Hoarfrost hoard items.
const ART: ReadonlyMap<string, string> = new Map([
  ['permafrost_legguards', '/ui/whetstorm/items/permafrost_legguards.webp'],
  ['frostbitten_rime_slippers', '/ui/whetstorm/items/frostbitten_rime_slippers.webp'],
  ['rime_crusted_grips', '/ui/whetstorm/items/rime_crusted_grips.webp'],
  ['rare_permafrost_legguards', '/ui/whetstorm/items/rare_permafrost_legguards.webp'],
  ['rare_frostbitten_rime_slippers', '/ui/whetstorm/items/rare_frostbitten_rime_slippers.webp'],
  ['rare_rime_crusted_grips', '/ui/whetstorm/items/rare_rime_crusted_grips.webp'],
]);
export function hoarfrostEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
