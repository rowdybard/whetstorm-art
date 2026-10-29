// Original Whetstorm class resource and status paintings, keyed by exact aura identity.
const CLASS_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['affliction_doom', '/ui/whetstorm/auras/affliction_doom.webp'],
  ['icicles', '/ui/whetstorm/auras/icicles.webp'],
  ['soul_fragments', '/ui/whetstorm/auras/soul_fragments.webp'],
  ['winters_chill', '/ui/whetstorm/auras/winters_chill.webp'],
]);

export function whetstormClassAuraImageUrl(id: string): string | null {
  return CLASS_AURA_ART.get(id) ?? null;
}