// Original Whetstorm shadow proc paintings, keyed by exact aura identity.
const SHADOW_PROC_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['voidsong_echo', '/ui/whetstorm/auras/voidsong_echo.webp'],
  ['wlk_forbidden_reflection', '/ui/whetstorm/auras/wlk_forbidden_reflection.webp'],
  ['wlk_forbidden_reflection_lock', '/ui/whetstorm/auras/wlk_forbidden_reflection.webp'],
  ['wlk_leaden_hex_root', '/ui/whetstorm/auras/wlk_leaden_hex.webp'],
  ['wlk_leaden_hex_root_lock', '/ui/whetstorm/auras/wlk_leaden_hex.webp'],
  ['wlk_leaden_hex_slow', '/ui/whetstorm/auras/wlk_leaden_hex.webp'],
]);

export function whetstormShadowProcAuraImageUrl(id: string): string | null {
  return SHADOW_PROC_AURA_ART.get(id) ?? null;
}