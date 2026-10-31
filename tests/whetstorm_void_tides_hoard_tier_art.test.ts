import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { voidTidesHoardTierItemImageUrl } from '../src/ui/void_tides_hoard_tier_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "rare_orb_collapsing_void",
    "336621c689e292b5a73e0b731f1ab5c4603aea16c2e7795fd09008d4971f3b12",
    "65f0cd30452c2625a79fdda507f31b2c7d37b21e6ec3d36bd56cb9673bdc7d2c"
  ],
  [
    "legendary_orb_collapsing_void",
    "bccc694a243cf413bbda3e34898acc1c089f8cf5a614baabccff4610171daa23",
    "aa49644460e04239619f44cbce752f6307976f3a7c99d2b4baaaa856502fa1c7"
  ],
  [
    "rare_chalice_of_living_tides",
    "a16e869ff849c18adfe096d2f6f5c46bf8c2dc7fa5f58d09af6daa4ec4b53100",
    "062ff5c7b853b43c49e2d589f1159ca7a9743d8f375cef9170af1a2bb6493f1e"
  ],
  [
    "legendary_chalice_of_living_tides",
    "3d968d0b68a4ecd8d922eb51ea0e9933c6876a456205f0b9c83aef067cf62c7c",
    "0bcff404de21b8d441a8c04109d81b8383ec722a804917a435b14cc699796758"
  ]
];
it('maps Void and Tides tiers to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/void-tides-hoard-tiers/tier-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(4);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(voidTidesHoardTierItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/void-tides-hoard-tiers/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(voidTidesHoardTierItemImageUrl('unknown')).toBeNull();
});
