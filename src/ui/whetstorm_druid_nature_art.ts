// Original paintings for Druid nature support and control abilities.
const ART = new Map<string, string>([
  ['healing_touch', '/ui/whetstorm/abilities/druid_nature_healing_touch.webp'],
  ['rejuvenation', '/ui/whetstorm/abilities/druid_nature_rejuvenation.webp'],
  ['entangling_roots', '/ui/whetstorm/abilities/druid_nature_entangling_roots.webp'],
  ['barkskin', '/ui/whetstorm/abilities/druid_nature_barkskin.webp'],
]);

export function whetstormDruidNatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
