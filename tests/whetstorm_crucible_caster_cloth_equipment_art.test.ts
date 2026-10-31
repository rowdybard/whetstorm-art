import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { crucibleCasterClothEquipmentImageUrl } from '../src/ui/crucible_caster_cloth_equipment_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "crucible_caster_cloth_chest",
    "b3dd7b892103864510d34c23c73049020619e9a9f6e854bcc1cfa3d498e38dec",
    "e145a0bb4c4cf8be50a2d025af6a50d621e8e518c4f56b20a417e2373fb03c37"
  ],
  [
    "crucible_caster_cloth_waist",
    "26ae0300b63f048683a1b398036fe0e56fe406946efc682adf6dd8e5c1f0bed3",
    "43b54d6f2bf19987acfee35734ee72dd85962c74737f36beeaa552f6efc91b3f"
  ],
  [
    "crucible_caster_cloth_feet",
    "1625bd33bfa3c913002e5ce8913252e2074e7c78750199c426f86a8e34b01b8d",
    "b872c04ea739b2419b7b1c238ff6d35552950f3eedfc419fdf31f53d9ac3fec4"
  ]
];
it('maps caster cloth equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/crucible-caster-cloth-equipment/equipment-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(crucibleCasterClothEquipmentImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/crucible-caster-cloth-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(crucibleCasterClothEquipmentImageUrl('unknown')).toBeNull();
});
