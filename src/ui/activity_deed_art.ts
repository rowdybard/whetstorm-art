// Original paintings for exploration activities.
const ACTIVITY_DEED_ART = new Map<string, string>([
  ['exp_arcane_calligraphy', '/ui/whetstorm/deeds/exp_arcane_calligraphy.webp'],
  ['exp_forge_helper', '/ui/whetstorm/deeds/exp_forge_helper.webp'],
  ['exp_duskweave_dispatches', '/ui/whetstorm/deeds/exp_duskweave_dispatches.webp'],
  ['exp_wisp_maze', '/ui/whetstorm/deeds/exp_wisp_maze.webp'],
  ['exp_arcane_calligraphy_gold', '/ui/whetstorm/deeds/exp_arcane_calligraphy_gold.webp'],
  ['exp_last_barricade', '/ui/whetstorm/deeds/exp_last_barricade.webp'],
  ['exp_borrowed_face', '/ui/whetstorm/deeds/exp_borrowed_face.webp'],
  ['cmb_coinsack_caught', '/ui/whetstorm/deeds/cmb_coinsack_caught.webp'],
  ['chr_marsh_rares_ii', '/ui/whetstorm/deeds/chr_marsh_rares_ii.webp'],
  ['chr_gleamstag', '/ui/whetstorm/deeds/chr_gleamstag.webp'],
  ['chr_drakemaw_broodlord', '/ui/whetstorm/deeds/chr_drakemaw_broodlord.webp'],
  ['chr_maw_matriarch', '/ui/whetstorm/deeds/chr_maw_matriarch.webp'],
]);

export function activityDeedImageUrl(id: string): string | null {
  return ACTIVITY_DEED_ART.get(id) ?? null;
}
