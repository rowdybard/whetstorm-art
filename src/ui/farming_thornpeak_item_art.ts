// Original Thornpeak farming material paintings in a closed map.
const ART = new Map<string, string>([
  ['thornpeak_cabbage_seed', '/ui/whetstorm/items/thornpeak_cabbage_seed.webp'],
  ['thornpeak_cabbage', '/ui/whetstorm/items/thornpeak_cabbage.webp'],
  ['fine_thornpeak_cabbage', '/ui/whetstorm/items/fine_thornpeak_cabbage.webp'],
  ['frost_lentils_seed', '/ui/whetstorm/items/frost_lentils_seed.webp'],
]);

export function farmingThornpeakItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
