import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key }));

import { WEAPON_SKINS } from '../src/sim/content/weapon_skins';
import { solheimArmorySkinArt } from '../src/ui/armory_solheim_art';
import { cosmeticsPanelHtml } from '../src/ui/hud/cosmetics/cosmetics_cards_view';
import { reliquaryCellArt } from '../src/ui/reliquary_cell_art';
import { armorySkinArt } from '../src/ui/woc_store_view';

const url = '/ui/whetstorm/armory/solheim_sword.webp';
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Solheim armory painting', () => {
  it('reaches the owned cosmetic card and Reliquary', () => {
    expect(WEAPON_SKINS.solheim_sword?.collection).toBe('fallen_star');
    expect(solheimArmorySkinArt('solheim_sword')).toBe(url);
    expect(solheimArmorySkinArt('__proto__')).toBeNull();
    expect(armorySkinArt('solheim_sword')).toBe(url);
    expect(reliquaryCellArt({ kind: 'weapon_skin', id: 'solheim_sword' })).toEqual({ kind: 'url', url });
    expect(cosmeticsPanelHtml({
      tab: 'skins', ownedMountSkins: [], wornMountSkin: null, ownsAnyMount: false,
      weaponSkinIds: ['solheim_sword'], weaponSkinLoadout: {}, applicableWeaponTypes: [],
      mechChromaIds: [], wornMech: { catalog: 'mech', skin: 0 },
    })).toContain(url);
  });
  it('pins the text-only master and delivery', async () => {
    const a = JSON.parse(readFileSync('docs/whetstorm/armory-solheim-original-generation.json', 'utf8'));
    expect(a.reference_images).toEqual([]);
    expect(hash(a.file)).toBe('3d358eb936dd0a39d8c31d30ce7cc5728167b42eb5257dd7c6859158519b1c1b');
    expect(hash(a.delivery.path)).toBe('55afad1bb1303345d33b9182316a5b8395ba4e67e531c6e35737c0f9577d3f24');
    expect(await sharp(a.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
  });
});
