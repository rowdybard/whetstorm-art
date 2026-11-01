import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it, vi } from 'vitest';

vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key }));

import { WEAPON_SKINS } from '../src/sim/content/weapon_skins';
import { fallenStarRangedArmorySkinArt } from '../src/ui/armory_fallen_star_ranged_art';
import { cosmeticsPanelHtml } from '../src/ui/hud/cosmetics/cosmetics_cards_view';
import { reliquaryCellArt } from '../src/ui/reliquary_cell_art';
import { armorySkinArt } from '../src/ui/woc_store_view';

const ids = ['encore_bow', 'meteorlatch_crossbow'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes the retained Fallen Star ranged cosmetics to their original art', async () => {
  expect(WEAPON_SKINS.encore_bow).toMatchObject({ collection: 'fallen_star', weaponType: 'bow', handling: 'crossbow', model: 'encore_the_second_falling_star' });
  expect(WEAPON_SKINS.meteorlatch_crossbow).toMatchObject({ collection: 'fallen_star', weaponType: 'crossbow', model: 'meteorlatch_the_sky_s_last_judgment' });
  const { records } = JSON.parse(readFileSync('docs/whetstorm/armory-fallen-star-ranged-generation.json', 'utf8'));
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  expect(new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size).toBe(2);
  const html = cosmeticsPanelHtml({ tab: 'skins', ownedMountSkins: [], wornMountSkin: null, ownsAnyMount: false, weaponSkinIds: ids, weaponSkinLoadout: {}, applicableWeaponTypes: [], mechChromaIds: [], wornMech: { catalog: 'mech', skin: 0 } });
  for (const record of records) {
    const url = `/ui/whetstorm/armory/${record.id}.webp`;
    expect(record.referenceImages).toEqual([]);
    expect(hash(record.master)).toBe(record.masterSha256);
    expect(hash(record.shipping)).toBe(record.shippingSha256);
    expect(await sharp(record.shipping).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128, hasAlpha: false });
    expect(fallenStarRangedArmorySkinArt(record.id)).toBe(url);
    expect(armorySkinArt(record.id)).toBe(url);
    expect(reliquaryCellArt({ kind: 'weapon_skin', id: record.id })).toEqual({ kind: 'url', url });
    expect(html).toContain(url);
  }
  expect(fallenStarRangedArmorySkinArt('unknown')).toBeNull();
});
