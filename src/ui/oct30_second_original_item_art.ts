// Original paintings for the second October 30 item batch.
const OCT30_SECOND_ORIGINAL_ITEMS = new Map<string, string>([
  ['zealotsbane_blade', '/ui/whetstorm/items/zealotsbane_blade.webp'],
  ['emberwood_staff', '/ui/whetstorm/items/emberwood_staff.webp'],
  ['cultist_flayer', '/ui/whetstorm/items/cultist_flayer.webp'],
  ['ironvein_pickblade', '/ui/whetstorm/items/ironvein_pickblade.webp'],
  ['murloc_hut', '/ui/whetstorm/items/murloc_hut.webp'],
  ['hedgewick_tool_cart', '/ui/whetstorm/items/hedgewick_tool_cart.webp'],
  ['sprung_trap', '/ui/whetstorm/items/sprung_trap.webp'],
  ['shear_storm_lantern', '/ui/whetstorm/items/shear_storm_lantern.webp'],
  ['cragmaw_huntquiver', '/ui/whetstorm/items/cragmaw_huntquiver.webp'],
  ['gravewyrm_bone_quiver', '/ui/whetstorm/items/gravewyrm_bone_quiver.webp'],
  ['direfang_quiver', '/ui/whetstorm/items/direfang_quiver.webp'],
  ['duskforged_bulwark', '/ui/whetstorm/items/duskforged_bulwark.webp'],
  ['templar_dawn_shield', '/ui/whetstorm/items/templar_dawn_shield.webp'],
  ['forgemasters_girdle', '/ui/whetstorm/items/forgemasters_girdle.webp'],
  ['forgemasters_sabatons', '/ui/whetstorm/items/forgemasters_sabatons.webp'],
  ['heroic_gravewyrm_bone_quiver', '/ui/whetstorm/items/gravewyrm_bone_quiver.webp'],
  ['heroic_direfang_quiver', '/ui/whetstorm/items/direfang_quiver.webp'],
]);

export function oct30SecondOriginalItemImageUrl(id: string): string | null {
  return OCT30_SECOND_ORIGINAL_ITEMS.get(id) ?? null;
}
