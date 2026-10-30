// Original Whetstorm pet command paintings, keyed by pet action icon identity.
const ART: ReadonlyMap<string, string> = new Map([
  ['pet_attack', '/ui/whetstorm/abilities/pet_attack.webp'],
  ['pet_growl', '/ui/whetstorm/abilities/pet_growl.webp'],
  ['pet_mend', '/ui/whetstorm/abilities/pet_mend.webp'],
  ['pet_passive', '/ui/whetstorm/abilities/pet_passive.webp'],
]);
export function whetstormPetCommandImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
