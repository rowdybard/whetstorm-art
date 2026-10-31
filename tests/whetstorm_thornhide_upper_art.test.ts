import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { thornhideUpperItemImageUrl } from '../src/ui/thornhide_upper_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "thornhide_headdress",
    "f28372d049544a2afd450c24e9249fca1c6050591d7c236d2e45302700e61bb8",
    "0844bf50e3e954eabd6cf93826c5e6e6a7e34de94f3b5eaee4d47232edc4dbc8"
  ],
  [
    "thornhide_mantle",
    "3cdfcfd365998081ab73b8e81d19b2d6f1cb55792ebf82ce28ab142960864e31",
    "372ed920a0ba9b28c80a962afcefe72ebabfb0ffb6cd79238376c49d5e9e7631"
  ],
  [
    "thornhide_vestment",
    "1be83977b6530873c8f1614e46b1bd1dac37563d1fc9f8c1536ba6d335408096",
    "1487d77ca0e96edf8f48ada6fad946accad73b22b2137173e74bf943cb1941f8"
  ]
];
it('maps Thornhide upper equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/thornhide-upper-equipment/upper-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(thornhideUpperItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/thornhide-upper-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(thornhideUpperItemImageUrl('unknown')).toBeNull();
});
