import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { crucibleGuardianLeatherEquipmentImageUrl } from '../src/ui/crucible_guardian_leather_equipment_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pins = [
  [
    "crucible_tank_leather_chest",
    "1d07b343ceab371a059b703717a4b78f69c6ccdd7333bbb7f269171218cf502d",
    "2bea87187d7c26920abbb43218a2a259bdbfd1bb705ecdc647f5a476cd22b7c4"
  ],
  [
    "crucible_tank_leather_waist",
    "e34b6e7f5be673904c43a5b7f2d02945c8b149f29f528715dcada448d5430d9f",
    "308429957618b234c521e4f5bc1a54f0e57fa2a5890ec312cb8c733ea431745f"
  ],
  [
    "crucible_tank_leather_feet",
    "3a16ee8d4d6143cc15a10cf6a31c80052cef33f53c82f907932ceb967703314f",
    "9827d235194eb9355c30510eacdb78a1fe3b26cf041faebfd2ea8e9830d30371"
  ]
];
it('maps Guardian leather equipment to unique recorded 128px paintings', async () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/crucible-guardian-leather-equipment/equipment-provenance.md', 'utf8');
  expect(new Set(pins.map((p) => p[2])).size).toBe(3);
  for (const [id, master, output] of pins) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(crucibleGuardianLeatherEquipmentImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(note).toContain(master);
    expect(note).toContain(output);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/crucible-guardian-leather-equipment/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(crucibleGuardianLeatherEquipmentImageUrl('unknown')).toBeNull();
});
