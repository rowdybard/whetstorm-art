const REGIONAL_CLOTH_REWARDS_ART: ReadonlyMap<string, string> = new Map([
  ['cinderwalk_treads', '/ui/whetstorm/items/cinderwalk_treads.webp'],
  ['hearthlined_treads', '/ui/whetstorm/items/hearthlined_treads.webp'],
  ['moonfleece_mitts', '/ui/whetstorm/items/moonfleece_mitts.webp'],
]);

export function regionalClothRewardsItemImageUrl(id: string): string | null {
  return REGIONAL_CLOTH_REWARDS_ART.get(id) ?? null;
}
