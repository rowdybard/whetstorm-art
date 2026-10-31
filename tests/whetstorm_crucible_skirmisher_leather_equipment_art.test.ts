import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { crucibleSkirmisherLeatherEquipmentImageUrl } from '../src/ui/crucible_skirmisher_leather_equipment_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "crucible_agi_leather_chest",
    "26fa83f575ea81726c9d93d78af5b86081ad2e48bba002adba095161e0591538",
    "304117b41b17d393f9806bbbff6ed10c957be639cdd52bf9bf3b4506c370fe1c"
  ],
  [
    "crucible_agi_leather_waist",
    "c38c15104fd0d8f705573dc5f4fc4009b8734ce165dd8e26feeac4327de1d805",
    "1f821d39f4fd7d4e20f198f95881ca862edb2df464f7d83c56b5e6a2af205b44"
  ],
  [
    "crucible_agi_leather_feet",
    "c1d7231753a52fec878919d1be6ef12ff3649e0f71a4cc46ae3c021f8695ad88",
    "87ffcb594de3e01da6e369dbcfcd89857776f4f1b0774b326acac74ef73d2444"
  ]
];
it('maps Skirmisher leather equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/crucible-skirmisher-leather-equipment/equipment-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(crucibleSkirmisherLeatherEquipmentImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/crucible-skirmisher-leather-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(crucibleSkirmisherLeatherEquipmentImageUrl('unknown')).toBeNull();
});
