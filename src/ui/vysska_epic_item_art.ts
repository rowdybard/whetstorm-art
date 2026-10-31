// Original Whetstorm paintings for epic and Tarnished Vysska hoard armor.
const ART: ReadonlyMap<string, string> = new Map([
  ['silkstalker_woven_vest', '/ui/whetstorm/items/silkstalker_woven_vest.webp'],
  ['spun_venom_spaulders', '/ui/whetstorm/items/spun_venom_spaulders.webp'],
  ['broodmother_chitin_cowl', '/ui/whetstorm/items/broodmother_chitin_cowl.webp'],
  ['venom_etched_waistcord', '/ui/whetstorm/items/venom_etched_waistcord.webp'],
  ['rare_silkstalker_woven_vest', '/ui/whetstorm/items/rare_silkstalker_woven_vest.webp'],
  ['rare_spun_venom_spaulders', '/ui/whetstorm/items/rare_spun_venom_spaulders.webp'],
  ['rare_broodmother_chitin_cowl', '/ui/whetstorm/items/rare_broodmother_chitin_cowl.webp'],
  ['rare_venom_etched_waistcord', '/ui/whetstorm/items/rare_venom_etched_waistcord.webp'],
]);
export function vysskaEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
