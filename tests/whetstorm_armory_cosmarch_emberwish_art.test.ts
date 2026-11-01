import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key }));

import { WEAPON_SKINS } from '../src/sim/content/weapon_skins';
import { cosmarchEmberwishArmorySkinArt } from '../src/ui/armory_cosmarch_emberwish_art';
import { cosmeticsPanelHtml } from '../src/ui/hud/cosmetics/cosmetics_cards_view';
import { reliquaryCellArt } from '../src/ui/reliquary_cell_art';
import { armorySkinArt } from '../src/ui/woc_store_view';

const ids = ['cosmarch_staff', 'emberwish_wand'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original CosmArch and Emberwish armory paintings', () => {
  it('reaches owned cosmetic cards and the Reliquary', () => {
    const html = cosmeticsPanelHtml({
      tab: 'skins', ownedMountSkins: [], wornMountSkin: null, ownsAnyMount: false,
      weaponSkinIds: ids, weaponSkinLoadout: {}, applicableWeaponTypes: [],
      mechChromaIds: [], wornMech: { catalog: 'mech', skin: 0 },
    });
    for (const id of ids) {
      const url = `/ui/whetstorm/armory/${id}.webp`;
      expect(WEAPON_SKINS[id]?.collection).toBe('fallen_star');
      expect(cosmarchEmberwishArmorySkinArt(id)).toBe(url);
      expect(armorySkinArt(id)).toBe(url);
      expect(reliquaryCellArt({ kind: 'weapon_skin', id })).toEqual({ kind: 'url', url });
      expect(html).toContain(url);
    }
    expect(cosmarchEmberwishArmorySkinArt('__proto__')).toBeNull();
  });
  it('pins distinct text-only masters and deliveries', async () => {
    const a = JSON.parse(readFileSync('docs/whetstorm/armory-cosmarch-emberwish-generation.json', 'utf8'));
    expect(a.reference_images).toEqual([]);
    expect(a.assets.map((x: { skinId: string }) => x.skinId)).toEqual(ids);
    expect(a.assets.map((x: { file: string }) => hash(x.file))).toEqual([
      '27812f230223627cc5c755412c2031efcf1df51501aae0b90d09f2744f9b190f',
      '017eec675bb447b738d888a363014726151d2e68a4daf2ed4cb27c5446c4dd6a',
    ]);
    expect(a.assets.map((x: { delivery: { path: string } }) => hash(x.delivery.path))).toEqual([
      '90592d2a6485ad7527e6b364484b5e9d64b9d42244361003c4d939a30fffc225',
      '192c59c873d14bece167f740f1c1868c3045c2ca006c7e731221b0fad859980d',
    ]);
    for (const x of a.assets) expect(await sharp(x.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
  });
});
