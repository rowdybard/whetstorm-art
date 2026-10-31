import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { gracewingLowerItemImageUrl } from '../src/ui/gracewing_lower_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "vanguard_priest_holy_legs",
    "45575fbf449ee80e91cf89e2a065098ec859cdd0a08a8c3afdf894bf297690bf",
    "ca61eb45ed6aeeca12b0f538cf07a34e10893f8f4b3c3c8fa9d686603bb78e35"
  ],
  [
    "vanguard_priest_holy_gloves",
    "6584be782eb34a2ad58714d512a212054a48cd85cbf85cbac27cee24edca4ef0",
    "d921c460032deaa39164f795dfde58556e99ebc46779aef29d4918e37ae8588b"
  ]
];
it('maps Gracewing lower equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/gracewing-lower-equipment/lower-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(2);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(gracewingLowerItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/gracewing-lower-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(gracewingLowerItemImageUrl('unknown')).toBeNull();
});
