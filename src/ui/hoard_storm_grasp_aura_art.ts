// Original Buried Hoard aura paintings, keyed only by exact runtime identity.
const ART = new Map<string, string>([
  ['hoard_storm_surge', '/ui/whetstorm/auras/hoard_storm_surge.webp'],
  ['hoard_tentacle_grasp', '/ui/whetstorm/auras/hoard_tentacle_grasp.webp'],
]);

export function hoardStormGraspAuraImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
