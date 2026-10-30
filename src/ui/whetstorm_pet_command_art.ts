// Original Whetstorm pet command paintings, keyed by pet action icon identity.
const ART: ReadonlyMap<string, string> = new Map([
  ['pet_attack', '/ui/whetstorm/abilities/pet_attack.webp'],
  ['pet_growl', '/ui/whetstorm/abilities/pet_growl.webp'],
  ['pet_mend', '/ui/whetstorm/abilities/pet_mend.webp'],
  ['pet_passive', '/ui/whetstorm/abilities/pet_passive.webp'],
  ['pet_feed', '/ui/whetstorm/abilities/pet_feed.webp'],
  ['pet_defensive', '/ui/whetstorm/abilities/pet_defensive.webp'],
  ['pet_aggressive', '/ui/whetstorm/abilities/pet_aggressive.webp'],
  ['pet_water_jet', '/ui/whetstorm/abilities/pet_water_jet.webp'],
  ['emberkin_felbolt', '/ui/whetstorm/abilities/emberkin_felbolt.webp'],
  ['gloomshade_abyssal_chain', '/ui/whetstorm/abilities/gloomshade_abyssal_chain.webp'],
]);
export function whetstormPetCommandImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
