// Original paintings for the crafted Crucible Prowler's Leather collection.
const ART = new Map<string, string>([
  ['crucible_str_leather_chest', '/ui/whetstorm/items/crucible_str_leather_chest.webp'],
  ['crucible_str_leather_waist', '/ui/whetstorm/items/crucible_str_leather_waist.webp'],
  ['crucible_str_leather_feet', '/ui/whetstorm/items/crucible_str_leather_feet.webp'],
]);

export function crucibleProwlerLeatherItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
