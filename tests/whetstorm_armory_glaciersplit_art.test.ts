import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it, vi } from 'vitest';

vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key }));

import { WEAPON_SKINS } from '../src/sim/content/weapon_skins';
import { glaciersplitArmorySkinArt } from '../src/ui/armory_glaciersplit_art';
import { cosmeticsPanelHtml } from '../src/ui/hud/cosmetics/cosmetics_cards_view';
import { reliquaryCellArt } from '../src/ui/reliquary_cell_art';
import { armorySkinArt } from '../src/ui/woc_store_view';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes the retained Glaciersplit cosmetic through owned and Reliquary art', async () => {
  const record = JSON.parse(readFileSync('docs/whetstorm/armory-glaciersplit-generation.json', 'utf8'));
  expect(WEAPON_SKINS.glaciersplit_axe).toMatchObject({ collection: 'hoarfrost', weaponType: 'axe', model: 'glaciersplit' });
  expect(record.referenceImages).toEqual([]);
  expect(hash(record.master)).toBe(record.masterSha256);
  expect(hash(record.shipping)).toBe(record.shippingSha256);
  expect(await sharp(record.shipping).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128, hasAlpha: false });
  const id = 'glaciersplit_axe';
  const url = '/ui/whetstorm/armory/glaciersplit_axe.webp';
  expect(glaciersplitArmorySkinArt(id)).toBe(url);
  expect(glaciersplitArmorySkinArt('unknown')).toBeNull();
  expect(armorySkinArt(id)).toBe(url);
  expect(reliquaryCellArt({ kind: 'weapon_skin', id })).toEqual({ kind: 'url', url });
  const html = cosmeticsPanelHtml({ tab: 'skins', ownedMountSkins: [], wornMountSkin: null, ownsAnyMount: false, weaponSkinIds: [id], weaponSkinLoadout: {}, applicableWeaponTypes: [], mechChromaIds: [], wornMech: { catalog: 'mech', skin: 0 } });
  expect(html).toContain(url);
});
