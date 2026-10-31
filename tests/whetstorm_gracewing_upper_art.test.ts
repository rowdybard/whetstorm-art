import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { gracewingUpperItemImageUrl } from '../src/ui/gracewing_upper_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "vanguard_priest_holy_helmet",
    "c8c08643c15500d4affedc49ac684a0537d6d5afbec19bdbcb9f1a9df94017b3",
    "84929e85241f9c3295698f5b793884f0ba916668f71f2d97c7151299b8b2010a"
  ],
  [
    "vanguard_priest_holy_shoulder",
    "d3bd3b48abf64171d1387723ec96ce38dee3a3461c17a9b970ce727efcab0ddc",
    "2221df3e031acdb4902393d8698a5010c8afd1abce8736710876a9c6a2321ffb"
  ],
  [
    "vanguard_priest_holy_chest",
    "bd943374735647bdc99208ab61f6de909efd9e2dfbd310bed74f1e8fed0302a0",
    "9691bd0b57dfbd825d0e0a12bf6c1e5ca73e79529f5fe3af00c5a5f3cd59083c"
  ]
];
it('maps Gracewing upper equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/gracewing-upper-equipment/upper-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(gracewingUpperItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/gracewing-upper-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(gracewingUpperItemImageUrl('unknown')).toBeNull();
});
