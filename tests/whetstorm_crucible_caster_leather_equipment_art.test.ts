import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { crucibleCasterLeatherEquipmentImageUrl } from '../src/ui/crucible_caster_leather_equipment_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "crucible_caster_leather_chest",
    "df8c010a0826195a92bfff3b20d18d23a627cc2881f4bf721c527edf6ad66728",
    "fc4dae25b37c13532808c4e0a64758168323e8366905ed8669ed5be2f6173903"
  ],
  [
    "crucible_caster_leather_waist",
    "8c5b8b21a2e7eef979e19c3b1ae4ac10f37237536ccb0f85faeb37e2e1fe5f1a",
    "0bcd5c3a7cc6d8e34dd356eaa20942f5601284cd4e053ae0f25f2d38abb4b287"
  ],
  [
    "crucible_caster_leather_feet",
    "28560fda57223d7896dd1bfb15ba7163a656da8387a13b158b6271c9035d748a",
    "26af7b7eb121741c0c4e2642e96c7ca0633752aee979854ea1c9cf41c0e3701a"
  ]
];
it('maps caster leather equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/crucible-caster-leather-equipment/equipment-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(crucibleCasterLeatherEquipmentImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/crucible-caster-leather-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(crucibleCasterLeatherEquipmentImageUrl('unknown')).toBeNull();
});
