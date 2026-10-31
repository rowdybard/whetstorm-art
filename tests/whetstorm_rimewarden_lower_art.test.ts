import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { rimewardenLowerItemImageUrl } from '../src/ui/rimewarden_lower_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "vanguard_mage_frost_legs",
    "32052fdcac067fbeab23f21fb084fa44c365dc3f977aac624ca3fa853af984e4",
    "e3f489fe959eed4c1950418161b0a5264114b7ce738f16d4b6a9afea7a886bbd"
  ],
  [
    "vanguard_mage_frost_gloves",
    "c8ec78a9efb5ed9a4231235a4df0d323f7b32c827a8fbf0e35386a70ff4edbe1",
    "fec2d8aea34dd30e96881d521291aa147105675596dde8812775d01899811e64"
  ]
];
it('maps Rimewarden lower equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/rimewarden-lower-equipment/lower-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(2);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(rimewardenLowerItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/rimewarden-lower-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(rimewardenLowerItemImageUrl('unknown')).toBeNull();
});
