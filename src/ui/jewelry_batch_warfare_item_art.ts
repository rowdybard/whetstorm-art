// Original paintings for Warfare quartermaster jewelry.
const WARFARE_JEWELRY_ART = new Map<string, string>([
  ['final_oath_medallion', '/ui/whetstorm/items/final_oath_medallion.webp'],
  ['razorwind_torque', '/ui/whetstorm/items/razorwind_torque.webp'],
  ['cinder_sigil_pendant', '/ui/whetstorm/items/cinder_sigil_pendant.webp'],
  ['iron_vow_band', '/ui/whetstorm/items/iron_vow_band.webp'],
]);

export function warfareJewelryItemImageUrl(id: string): string | null {
  return WARFARE_JEWELRY_ART.get(id) ?? null;
}
