import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { crucibleHealerLeatherEquipmentImageUrl } from '../src/ui/crucible_healer_leather_equipment_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "crucible_healer_leather_chest",
    "f1e0e9569d71dec4e9f36e227338d12ddc0cccf023460e8c13af07a9906bffd3",
    "0f6203064d83feacd7d8e449076e42b21445af63f083ccf696890605ceb70be5"
  ],
  [
    "crucible_healer_leather_waist",
    "c29199684a4e2b1d7a30e81ce588a2da277965156628b4cc7f7e62810e0ba6d9",
    "127f49162563470a7b2299ef3ebde716a2d72073eef84241dd6794fd271dc5d4"
  ],
  [
    "crucible_healer_leather_feet",
    "b800757cdabdcf3f517890b4597f15c85232fbe1975d11c2c0a5bdf3af194cc0",
    "f194ba091038c599bb61623bf213ca4ac94052c6e7707794504a25fc920cce1f"
  ]
];
it('maps healer leather equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/crucible-healer-leather-equipment/equipment-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(crucibleHealerLeatherEquipmentImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/crucible-healer-leather-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(crucibleHealerLeatherEquipmentImageUrl('unknown')).toBeNull();
});
