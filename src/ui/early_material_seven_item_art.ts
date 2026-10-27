// Original early quest and crafting item paintings in a closed map.
const EARLY_MATERIAL_SEVEN_ART = new Map<string, string>([
  ['gravecaller_sigil', '/ui/whetstorm/items/gravecaller_sigil.webp'],
  ['weathered_ledger_page', '/ui/whetstorm/items/weathered_ledger_page.webp'],
  ['morthen_grimoire', '/ui/whetstorm/items/morthen_grimoire.webp'],
  ['copper_ore', '/ui/whetstorm/items/copper_ore.webp'],
]);

export function earlyMaterialSevenItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_SEVEN_ART.get(id) ?? null;
}
