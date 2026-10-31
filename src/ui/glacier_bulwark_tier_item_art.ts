// Original Whetstorm paintings for Tarnished and Sovereign Glacier-Hewn Bulwarks.
const ART: ReadonlyMap<string, string> = new Map([
  ['rare_glacier_hewn_bulwark', '/ui/whetstorm/items/rare_glacier_hewn_bulwark.webp'],
  ['legendary_glacier_hewn_bulwark', '/ui/whetstorm/items/legendary_glacier_hewn_bulwark.webp'],
]);
export function glacierBulwarkTierItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
