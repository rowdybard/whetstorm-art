// Original Whetstorm flask aura paintings, keyed by the resolved flask identity.
const FLASK_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['flask_buff_sta', '/ui/whetstorm/auras/flask_buff_sta.webp'],
  ['flask_buff_ap', '/ui/whetstorm/auras/flask_buff_ap.webp'],
  ['flask_buff_int', '/ui/whetstorm/auras/flask_buff_int.webp'],
]);

export function whetstormFlaskAuraImageUrl(id: string): string | null {
  return FLASK_AURA_ART.get(id) ?? null;
}
