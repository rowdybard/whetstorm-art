// Original paintings for Boneward mail armor.
const MAIL_BONEWARD_ITEM_ART = new Map<string, string>([
  ['boneplate_vest', '/ui/whetstorm/items/boneplate_vest.webp'],
  ['drogmar_warboots', '/ui/whetstorm/items/drogmar_warboots.webp'],
  ['marrowlord_boneboots', '/ui/whetstorm/items/marrowlord_boneboots.webp'],
  ['boneguard_breastplate', '/ui/whetstorm/items/boneguard_breastplate.webp'],
]);

export function mailBonewardItemImageUrl(id: string): string | null {
  return MAIL_BONEWARD_ITEM_ART.get(id) ?? null;
}
