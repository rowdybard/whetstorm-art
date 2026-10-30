import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key }));

import { RELIQUARY_HORIZON_WEAPON_SKINS } from '../src/sim/content/reliquary';
import { WEAPON_SKINS } from '../src/sim/content/weapon_skins';
import { originalArmorySkinArt } from '../src/ui/armory_guildmark_art';
import { cosmeticsPanelHtml } from '../src/ui/hud/cosmetics/cosmetics_cards_view';
import { reliquaryCellArt, reliquaryCellArtOpaque } from '../src/ui/reliquary_cell_art';
import { armorySkinArt } from '../src/ui/woc_store_view';

const ids = [
  'guildmark_arming_sword',
  'brasscap_axe',
  'tempered_flanged_mace',
  'guildmark_dirk',
  'brasscrown_staff',
  'lacquered_wand',
  'fletcher_s_guild_bow',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Guildmark Armory thumbnails', () => {
  it('routes live skins through the Reliquary and cosmetics card consumers', () => {
    const html = cosmeticsPanelHtml({
      tab: 'skins',
      ownedMountSkins: [],
      wornMountSkin: null,
      ownsAnyMount: false,
      weaponSkinIds: ids,
      weaponSkinLoadout: {},
      applicableWeaponTypes: [],
      mechChromaIds: [],
      wornMech: { catalog: 'mech', skin: 0 },
    });
    for (const id of ids) {
      const url = `/ui/whetstorm/armory/${id}.webp`;
      expect(WEAPON_SKINS[id]?.collection).toBe('guildmark');
      expect(RELIQUARY_HORIZON_WEAPON_SKINS).toContain(id);
      expect(originalArmorySkinArt(id)).toBe(url);
      expect(armorySkinArt(id)).toBe(url);
      const art = reliquaryCellArt({ kind: 'weapon_skin', id });
      expect(art).toEqual({ kind: 'url', url });
      if (art === null) throw new Error(`Missing Reliquary art for ${id}`);
      expect(reliquaryCellArtOpaque(art)).toBe(true);
      expect(html).toContain(url);
    }
    for (const id of ['__proto__', '../guildmark_dirk', 'unknown']) {
      expect(originalArmorySkinArt(id)).toBeNull();
      expect(reliquaryCellArt({ kind: 'weapon_skin', id })).toBeNull();
    }
    expect(armorySkinArt('cinderbrand_sword')).toBe('/ui/store/armory/cinderbrand_sword.webp');
  });
  it('pins independent masters, deliveries and provenance', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/armory-guildmark-original-generation.json', 'utf8'),
    );
    expect(assets.map((a: { skinId: string }) => a.skinId)).toEqual(ids);
    const hashes = new Set<string>();
    for (const a of assets) {
      expect(a.reference_images).toEqual([]);
      expect(a.status).toContain('3D skin remains restricted');
      expect(a.file).toBe(`docs/design/whetstorm-art/armory/${a.skinId}.png`);
      expect(a.delivery.path).toBe(`public/ui/whetstorm/armory/${a.skinId}.webp`);
      expect(hash(a.file)).toBe(a.sha256);
      expect(hash(a.delivery.path)).toBe(a.delivery.sha256);
      expect(await sharp(a.delivery.path).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
        hasAlpha: false,
      });
      hashes.add(a.sha256);
    }
    expect(hashes.size).toBe(ids.length);
  });
});
