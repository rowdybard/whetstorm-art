import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { cinderweaveUpperItemImageUrl } from '../src/ui/cinderweave_upper_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "cinderweave_cowl",
    "1569e1338de85ccee8ee3e464563ae7298d8721b54633e23626d9cf675ae9cb2",
    "e503d9d763fc82b6554a95bd11ecc6b272914de8b936dbc40e2af37c719dd208"
  ],
  [
    "cinderweave_mantle",
    "defde65ebe648e82547fbf491740723fcbd24f4e5b36cc10f59fad3f35921a28",
    "8fae762634970a1c0157d65ae234c3e0330a178266e2d86ec6768f471cc997b8"
  ],
  [
    "cinderweave_raiment",
    "003cdd59a54a72e71fd1e78854192ef44ffd6d93d886be2cbe6db9734a200ada",
    "1c57c0273c9a30b4027adbc8898c5bc5adb972ef0b23dcff6da4d7e3e91a7d58"
  ]
];
it('maps Cinderweave upper equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/cinderweave-upper-equipment/upper-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(cinderweaveUpperItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/cinderweave-upper-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(cinderweaveUpperItemImageUrl('unknown')).toBeNull();
});
