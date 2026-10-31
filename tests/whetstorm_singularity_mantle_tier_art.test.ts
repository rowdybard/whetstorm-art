import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { singularityMantleTierItemImageUrl } from '../src/ui/singularity_mantle_tier_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "mantle_of_singularity",
    "9a8dbc98bd382a93e87ace1a887a8b744c5e219cdbfea732d5e085f515856c6c",
    "2e56222818312da399f0e3a0c2edeefc17de5ed23fe174bda01a34ea4f3ada19"
  ],
  [
    "rare_mantle_of_singularity",
    "b74748aae3a851dd1b30368ac0dcfbf805def3e51d2f83ec0ff1594fb1f4d682",
    "93f822d8329e23b1c4bd62a0f36b204aa210b66b68ebe58b1f49a155c6784cb8"
  ],
  [
    "legendary_mantle_of_singularity",
    "740390c91acbe112c052fac09ae6ff901e79d0d0479ce9c837c9d9d28a651a4e",
    "748bf6ac53f75c03437623e656fbca950acb111b62baf276f44f6c0f24eaeeef"
  ]
];
it('maps Singularity mantle tiers to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/singularity-mantle-tiers/tier-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(singularityMantleTierItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/singularity-mantle-tiers/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(singularityMantleTierItemImageUrl('unknown')).toBeNull();
});
