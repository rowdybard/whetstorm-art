// Original paintings for early roadward mail armor.
const PLATE_ROADWARD_ITEM_ART = new Map<string, string>([
  ['roadwardens_helm', '/ui/whetstorm/items/roadwardens_helm.webp'],
  ['reinforced_pauldrons', '/ui/whetstorm/items/reinforced_pauldrons.webp'],
  ['outrider_brigandine', '/ui/whetstorm/items/outrider_brigandine.webp'],
  ['outrider_legguards', '/ui/whetstorm/items/outrider_legguards.webp'],
]);

export function plateRoadwardItemImageUrl(id: string): string | null {
  return PLATE_ROADWARD_ITEM_ART.get(id) ?? null;
}
