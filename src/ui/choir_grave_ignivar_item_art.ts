// Original paintings for heroic armor, Ignivar offhands, and grave offerings.
const CHOIR_GRAVE_IGNIVAR_ITEM_ART = new Map<string, string>([
  ['lunar_choir_leggings', '/ui/whetstorm/items/lunar_choir_leggings.webp'],
  ['choir_blessed_spaulders', '/ui/whetstorm/items/choir_blessed_spaulders.webp'],
  ['tideworn_warboots', '/ui/whetstorm/items/tideworn_warboots.webp'],
  ['shroud_of_the_gravewyrm', '/ui/whetstorm/items/shroud_of_the_gravewyrm.webp'],
  ['varkhul_emberward', '/ui/whetstorm/items/varkhul_emberward.webp'],
  ['bulwark_of_the_inner_crucible', '/ui/whetstorm/items/bulwark_of_the_inner_crucible.webp'],
  ['ember_wardens_barrier', '/ui/whetstorm/items/ember_wardens_barrier.webp'],
  ['orb_of_the_last_spring', '/ui/whetstorm/items/orb_of_the_last_spring.webp'],
  ['grave_sir_aldren', '/ui/whetstorm/items/grave_sir_aldren.webp'],
  ['grave_high_priest_malric', '/ui/whetstorm/items/grave_high_priest_malric.webp'],
  ['grave_captain_voss', '/ui/whetstorm/items/grave_captain_voss.webp'],
  ['barrow_grave_offering', '/ui/whetstorm/items/barrow_grave_offering.webp'],
]);

export function choirGraveIgnivarItemImageUrl(id: string): string | null {
  return CHOIR_GRAVE_IGNIVAR_ITEM_ART.get(id) ?? null;
}
