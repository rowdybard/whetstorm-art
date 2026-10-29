// Original painted jewelry for live crafted and faction items.
const JEWELRY_FORGE = new Map<string, string>([
  ['dawnkeepers_circle', '/ui/whetstorm/items/dawnkeepers_circle.webp'],
  ['champion_forged_loop', '/ui/whetstorm/items/champion_forged_loop.webp'],
  ['forgewall_gorget', '/ui/whetstorm/items/forgewall_gorget.webp'],
  ['wyrmfall_pendant', '/ui/whetstorm/items/wyrmfall_pendant.webp'],
]);

export function jewelryForgeItemImageUrl(id: string): string | null {
  return JEWELRY_FORGE.get(id) ?? null;
}
