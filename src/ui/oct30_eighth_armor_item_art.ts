// Original armor paintings for the eighth October 30 item batch.
const ART = new Map<string, string>([
  ['stormvotive_hauberk', '/ui/whetstorm/items/stormvotive_hauberk.webp'],
  ['vestments_of_the_waking_grove', '/ui/whetstorm/items/vestments_of_the_waking_grove.webp'],
  ['bonelord_mantle', '/ui/whetstorm/items/bonelord_mantle.webp'],
  ['voidscar_handwraps', '/ui/whetstorm/items/voidscar_handwraps.webp'],
]);

export function oct30EighthArmorItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
