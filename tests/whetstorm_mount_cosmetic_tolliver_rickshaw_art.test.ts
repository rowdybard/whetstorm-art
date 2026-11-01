import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it, vi } from 'vitest';
vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key }));
import { MOUNT_SKINS } from '../src/sim/content/mount_skins';
import { originalMountCosmeticCardArt } from '../src/ui/mount_cosmetic_tolliver_rickshaw_art';
import { mountSkinArt } from '../src/ui/woc_store_view';
import { cosmeticsPanelHtml } from '../src/ui/hud/cosmetics/cosmetics_cards_view';
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
it('routes original mount cards for owned cosmetics', async () => {
  const records = JSON.parse(readFileSync('docs/whetstorm/mount-cosmetic-tolliver-rickshaw-generation.json', 'utf8')).assets;
  expect(records).toHaveLength(2);
  for (const id of ['chimeglass_tortoise', 'rickshaw_mount'] as const) {
    const record = records.find((entry: { skinId: string }) => entry.skinId === id);
    expect(MOUNT_SKINS[id]).toMatchObject({ id, rarity: 'epic' });
    expect(record.referenceImages).toEqual([]);
    expect(hash(record.master)).toBe(record.masterSha256);
    expect(hash(record.shipping)).toBe(record.shippingSha256);
    expect(await sharp(record.shipping).metadata()).toMatchObject({ format: 'webp', width: 512, height: 512, hasAlpha: false });
    const url = `/ui/whetstorm/mount-skins/${id}.webp`;
    expect(originalMountCosmeticCardArt(id)).toBe(url);
    expect(mountSkinArt(id)).toBe(url);
    const html = cosmeticsPanelHtml({ tab: 'mounts', ownedMountSkins: [id], wornMountSkin: null, ownsAnyMount: true, weaponSkinIds: [], weaponSkinLoadout: {}, applicableWeaponTypes: [], mechChromaIds: [], wornMech: { catalog: 'mech', skin: 0 } });
    expect(html).toContain(url);
  }
  expect(originalMountCosmeticCardArt('unknown')).toBeNull();
});
