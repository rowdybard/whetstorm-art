// Original paintings for Thornpeak mail armor.
const MAIL_THORNPEAK_ITEM_ART = new Map<string, string>([
  ['deathlord_sabatons', '/ui/whetstorm/items/deathlord_sabatons.webp'],
  ['peaksong_helm', '/ui/whetstorm/items/peaksong_helm.webp'],
  ['thunderward_legguards', '/ui/whetstorm/items/thunderward_legguards.webp'],
  ['crownforged_gauntlets', '/ui/whetstorm/items/crownforged_gauntlets.webp'],
]);

export function mailThornpeakItemImageUrl(id: string): string | null {
  return MAIL_THORNPEAK_ITEM_ART.get(id) ?? null;
}
