// Individually painted reward from The Grand Necromancer.
const VELKHAR_QUEST_WEAPON = new Map<string, string>([
  ['staff_of_velkhar', '/ui/whetstorm/items/staff_of_velkhar.webp'],
]);

export function velkharQuestWeaponItemImageUrl(id: string): string | null {
  return VELKHAR_QUEST_WEAPON.get(id) ?? null;
}
