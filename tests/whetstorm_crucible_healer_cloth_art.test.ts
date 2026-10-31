import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { crucibleHealerClothItemImageUrl } from '../src/ui/crucible_healer_cloth_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "crucible_healer_cloth_chest",
    "7fa532cec255961a9df0ebf2f244ddb767dc9aac51a27bf81ca4ddacf28864a8",
    "654a9d1c8a90fb223f89ed049b0f76274bf22555d9a8c59297e09145b789904b"
  ],
  [
    "crucible_healer_cloth_waist",
    "0145f5bbb7f79855dc9327d7bb5a8b0fa374a97513236f70c05cb17d9ad3e998",
    "1a341cba2b6fe4cc3c77e7ff396abd06fcd2592eb23e26d6d0dd2a9530bf9f20"
  ],
  [
    "crucible_healer_cloth_feet",
    "accdc6cfde9f869e03d56fbd246934f872842fb4d97ee51ca1ccfb499124d114",
    "19196d050d86aaf99cc8d492bd61606e4c0cfee7034fbe7f83b683cffe1126d7"
  ]
];
it('maps the three healer cloth pieces to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/crucible-healer-cloth/armor-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(crucibleHealerClothItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/crucible-healer-cloth/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(crucibleHealerClothItemImageUrl('unknown')).toBeNull();
});
