// Original trophy paintings in a closed map.
const ART = new Map<string, string>([
  ['guardian_core', '/ui/whetstorm/items/guardian_core.webp'],
  ['gleamstag_charm', '/ui/whetstorm/items/gleamstag_charm.webp'],
  ['cracked_wyrm_scale', '/ui/whetstorm/items/cracked_wyrm_scale.webp'],
]);

export function guardianTrophiesItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
