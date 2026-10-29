// Original, individually painted Whetstorm mail armor.
const MAIL_NEXT_ART = new Map<string, string>([
  ['siltguard_helm', '/ui/whetstorm/items/siltguard_helm.webp'],
  ['bulwark_rusted_pauldrons', '/ui/whetstorm/items/bulwark_rusted_pauldrons.webp'],
  ['blackwater_vanguard_chest', '/ui/whetstorm/items/blackwater_vanguard_chest.webp'],
  ['cryptplate_helm', '/ui/whetstorm/items/cryptplate_helm.webp'],
]);

export function mailNextItemImageUrl(id: string): string | null {
  return MAIL_NEXT_ART.get(id) ?? null;
}
