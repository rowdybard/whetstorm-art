import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it, vi } from 'vitest';

vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key }));
import { WEAPON_SKINS } from '../src/sim/content/weapon_skins';
import { hoarfrostThreeArmorySkinArt } from '../src/ui/armory_hoarfrost_three_art';
import { cosmeticsPanelHtml } from '../src/ui/hud/cosmetics/cosmetics_cards_view';
import { reliquaryCellArt } from '../src/ui/reliquary_cell_art';
import { armorySkinArt } from '../src/ui/woc_store_view';

const cases = [
  ['ice_fang_sword', 'sword', 'ice_fang'],
  ['rimecrusher_mace', 'mace', 'rimecrusher'],
  ['frostbite_dagger', 'dagger', 'frostbite'],
] as const;
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes each retained Hoarfrost cosmetic in owned cards and Reliquary', async () => {
  const { assets } = JSON.parse(readFileSync('docs/whetstorm/armory-hoarfrost-three-generation.json', 'utf8'));
  expect(assets.map((asset: { skinId: string }) => asset.skinId)).toEqual(cases.map(([id]) => id));
  expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(3);
  for (const [index, [id, weaponType, model]] of cases.entries()) {
    const asset = assets[index];
    const url = `/ui/whetstorm/armory/${id}.webp`;
    expect(WEAPON_SKINS[id]).toMatchObject({ collection: 'hoarfrost', rarity: 'epic', weaponType, model });
    expect(asset.reference_images).toEqual([]);
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
    expect(hoarfrostThreeArmorySkinArt(id)).toBe(url);
    expect(armorySkinArt(id)).toBe(url);
    expect(reliquaryCellArt({ kind: 'weapon_skin', id })).toEqual({ kind: 'url', url });
    const html = cosmeticsPanelHtml({ tab: 'skins', ownedMountSkins: [], wornMountSkin: null, ownsAnyMount: false, weaponSkinIds: [id], weaponSkinLoadout: {}, applicableWeaponTypes: [], mechChromaIds: [], wornMech: { catalog: 'mech', skin: 0 } });
    expect(html).toContain(url);
  }
  expect(hoarfrostThreeArmorySkinArt('ice_fang_sword_extra')).toBeNull();
  expect(hoarfrostThreeArmorySkinArt('../ice_fang_sword')).toBeNull();
});
