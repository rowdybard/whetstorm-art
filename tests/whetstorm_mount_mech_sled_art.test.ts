import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it, vi } from 'vitest';

vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key }));
import { MOUNT_SKINS } from '../src/sim/content/mount_skins';
import { cosmeticsPanelHtml } from '../src/ui/hud/cosmetics/cosmetics_cards_view';
import { mechSledMountSkinArt } from '../src/ui/mount_mech_sled_art';
import { mountSkinArt } from '../src/ui/woc_store_view';

const ids = ['mech_bird', 'goblin_rocket_sled'] as const;
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes original cosmetic paintings into mount cards', async () => {
  const { assets } = JSON.parse(readFileSync('docs/whetstorm/mount-cards-mech-sled-generation.json', 'utf8'));
  expect(assets.map((asset: { skinId: string }) => asset.skinId)).toEqual(ids);
  expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(2);
  const html = cosmeticsPanelHtml({ tab: 'mounts', ownedMountSkins: [...ids], wornMountSkin: null, ownsAnyMount: true, weaponSkinIds: [], weaponSkinLoadout: {}, applicableWeaponTypes: [], mechChromaIds: [], wornMech: { catalog: 'mech', skin: 0 } });
  for (const [index, id] of ids.entries()) {
    const asset = assets[index];
    const url = `/ui/whetstorm/mount-cards/${id}.webp`;
    expect(MOUNT_SKINS[id]).toMatchObject({ id, rarity: 'epic' });
    expect(asset.reference_images).toEqual([]);
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ format: 'webp', width: 512, height: 512 });
    expect(mechSledMountSkinArt(id)).toBe(url);
    expect(mountSkinArt(id)).toBe(url);
    expect(html).toContain(url);
  }
  expect(mechSledMountSkinArt('mech_bird_extra')).toBeNull();
  expect(mechSledMountSkinArt('../mech_bird')).toBeNull();
});
