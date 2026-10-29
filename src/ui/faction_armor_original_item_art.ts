// Original paintings for faction leather and mail armor.
const FACTION_ARMOR_ORIGINAL_ITEM_ART = new Map<string, string>([
  ['riftwalkers_tunic', '/ui/whetstorm/items/riftwalkers_tunic.webp'],
  ['riftwalkers_cord', '/ui/whetstorm/items/riftwalkers_cord.webp'],
  ['riftwalkers_treads', '/ui/whetstorm/items/riftwalkers_treads.webp'],
  ['artificers_welding_cowl', '/ui/whetstorm/items/artificers_welding_cowl.webp'],
]);

export function factionArmorOriginalItemImageUrl(id: string): string | null {
  return FACTION_ARMOR_ORIGINAL_ITEM_ART.get(id) ?? null;
}
