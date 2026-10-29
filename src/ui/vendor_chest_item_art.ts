const VENDOR_CHEST_ART: ReadonlyMap<string, string> = new Map([
  ['wardplate_cuirass', '/ui/whetstorm/items/wardplate_cuirass.webp'],
  ['nightweave_tunic', '/ui/whetstorm/items/nightweave_tunic.webp'],
  ['veilcloth_robe', '/ui/whetstorm/items/veilcloth_robe.webp'],
]);

export function vendorChestItemImageUrl(id: string): string | null {
  return VENDOR_CHEST_ART.get(id) ?? null;
}
