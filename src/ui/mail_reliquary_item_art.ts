// Original paintings for crafted and reliquary mail armor.
const MAIL_RELIQUARY_ITEM_ART = new Map<string, string>([
  ['sootscale_mantle', '/ui/whetstorm/items/sootscale_mantle.webp'],
  ['reliquary_plate_chest', '/ui/whetstorm/items/reliquary_plate_chest.webp'],
  ['reliquary_helm', '/ui/whetstorm/items/reliquary_helm.webp'],
  ['reliquary_shoulder', '/ui/whetstorm/items/reliquary_shoulder.webp'],
]);

export function mailReliquaryItemImageUrl(id: string): string | null {
  return MAIL_RELIQUARY_ITEM_ART.get(id) ?? null;
}
