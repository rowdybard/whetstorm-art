// Original, individually painted Whetstorm delve mail armor.
const MAIL_DELVE_ORIGINAL_ART = new Map<string, string>([
  ['litany_shoulder', '/ui/whetstorm/items/litany_shoulder.webp'],
  ['litany_plate_chest', '/ui/whetstorm/items/litany_plate_chest.webp'],
  ['deacon_reliquary_helm', '/ui/whetstorm/items/deacon_reliquary_helm.webp'],
  ['morthens_cryptforged_hauberk', '/ui/whetstorm/items/morthens_cryptforged_hauberk.webp'],
]);

export function mailDelveOriginalItemImageUrl(id: string): string | null {
  return MAIL_DELVE_ORIGINAL_ART.get(id) ?? null;
}
