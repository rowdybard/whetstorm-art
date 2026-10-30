// Original Anvil sigil paintings in a closed map.
const ART = new Map<string, string>([
  ['sigil_anvil_helmet', '/ui/whetstorm/items/sigil_anvil_helmet.webp'],
  ['sigil_anvil_shoulder', '/ui/whetstorm/items/sigil_anvil_shoulder.webp'],
  ['sigil_anvil_chest', '/ui/whetstorm/items/sigil_anvil_chest.webp'],
  ['sigil_anvil_gloves', '/ui/whetstorm/items/sigil_anvil_gloves.webp'],
  ['sigil_anvil_legs', '/ui/whetstorm/items/sigil_anvil_legs.webp'],
]);

export function anvilSigilsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
