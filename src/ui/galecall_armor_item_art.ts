// Original Galecall mail set paintings.
const GALECALL_ARMOR_ITEM_ART = new Map<string, string>([
  ['stormcallers_crown', '/ui/whetstorm/items/stormcallers_crown.webp'],
  ['stormcallers_spaulders', '/ui/whetstorm/items/stormcallers_spaulders.webp'],
  ['stormcallers_handguards', '/ui/whetstorm/items/stormcallers_handguards.webp'],
  ['stormcallers_waistguard', '/ui/whetstorm/items/stormcallers_waistguard.webp'],
]);

export function galecallArmorItemImageUrl(id: string): string | null {
  return GALECALL_ARMOR_ITEM_ART.get(id) ?? null;
}
