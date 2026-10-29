// Original paintings for two crafted weapons.
const OSMIUM_GLYPHSTEEL_ITEM_ART = new Map<string, string>([
  ['thorium_warblade', '/ui/whetstorm/items/thorium_warblade.webp'],
  ['arcanite_war_axe', '/ui/whetstorm/items/arcanite_war_axe.webp'],
]);

export function osmiumGlyphsteelItemImageUrl(id: string): string | null {
  return OSMIUM_GLYPHSTEEL_ITEM_ART.get(id) ?? null;
}
