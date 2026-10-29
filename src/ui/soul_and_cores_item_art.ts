// Original paintings for the soul stone and progression cores.
const SOUL_AND_CORES_ART = new Map<string, string>([
  ['soul_stone', '/ui/whetstorm/items/soul_stone.webp'],
  ['wyrmfall_core', '/ui/whetstorm/items/wyrmfall_core.webp'],
  ['lastflame_core', '/ui/whetstorm/items/lastflame_core.webp'],
]);

export function soulAndCoresItemImageUrl(id: string): string | null {
  return SOUL_AND_CORES_ART.get(id) ?? null;
}
