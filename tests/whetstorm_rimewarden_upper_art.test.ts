import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { rimewardenUpperItemImageUrl } from '../src/ui/rimewarden_upper_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "vanguard_mage_frost_helmet",
    "049c815ab7685a9a4ef4beebd6bc97fc368f930b4182b426ca7f41040951d174",
    "e15674e60cab15aa620b63dfa9507829f8ab3d5de6cb8dbe1835aadd2a21868f"
  ],
  [
    "vanguard_mage_frost_shoulder",
    "235cf8c736e4f627f5f275a89d57312cab209036095ab24b02636430f0c46340",
    "beddfba3cf9aae3389fd6571c04a32d29fdfbd0f41c978123b7b04b86c93e3a5"
  ],
  [
    "vanguard_mage_frost_chest",
    "02bfdcaff081f04582f5608cb5072bf271d191c2cda657bb51166963c93de7a6",
    "d39001afa4523e128dda4f65144e5f52a1d3c373c210be0c6f4e162e7237d2b4"
  ]
];
it('maps Rimewarden upper equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/rimewarden-upper-equipment/upper-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(rimewardenUpperItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/rimewarden-upper-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(rimewardenUpperItemImageUrl('unknown')).toBeNull();
});
