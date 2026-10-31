// Original Singularity mantle tier paintings.
const ART = new Map<string, string>([
  ['mantle_of_singularity', '/ui/whetstorm/items/mantle_of_singularity.webp'],
  ['rare_mantle_of_singularity', '/ui/whetstorm/items/rare_mantle_of_singularity.webp'],
  ['legendary_mantle_of_singularity', '/ui/whetstorm/items/legendary_mantle_of_singularity.webp'],
]);

export function singularityMantleTierItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
