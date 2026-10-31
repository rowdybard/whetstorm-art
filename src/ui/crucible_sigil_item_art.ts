// Original paintings for Crucible sigils.
const ART = new Map<string, string>([
  ['sigil_ember_helmet', '/ui/whetstorm/items/sigil_ember_helmet.webp'],
  ['sigil_tempest_helmet', '/ui/whetstorm/items/sigil_tempest_helmet.webp'],
  ['sigil_ember_shoulder', '/ui/whetstorm/items/sigil_ember_shoulder.webp'],
  ['sigil_tempest_shoulder', '/ui/whetstorm/items/sigil_tempest_shoulder.webp'],
  ['sigil_ember_chest', '/ui/whetstorm/items/sigil_ember_chest.webp'],
  ['sigil_tempest_chest', '/ui/whetstorm/items/sigil_tempest_chest.webp'],
  ['sigil_ember_gloves', '/ui/whetstorm/items/sigil_ember_gloves.webp'],
  ['sigil_tempest_gloves', '/ui/whetstorm/items/sigil_tempest_gloves.webp'],
]);

export function crucibleSigilItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
