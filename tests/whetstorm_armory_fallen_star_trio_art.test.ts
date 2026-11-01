import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it, vi } from 'vitest';
vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key }));
import { WEAPON_SKINS } from '../src/sim/content/weapon_skins';
import { fallenStarTrioArmorySkinArt } from '../src/ui/armory_fallen_star_trio_art';
import { cosmeticsPanelHtml } from '../src/ui/hud/cosmetics/cosmetics_cards_view';
import { reliquaryCellArt } from '../src/ui/reliquary_cell_art';
import { armorySkinArt } from '../src/ui/woc_store_view';

const entries = [['skyrender_axe', 'axe'], ['starfall_mace', 'mace'], ['astravyr_dagger', 'dagger']] as const;
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Fallen Star armory paintings', () => {
  it('reaches owned cosmetics and Reliquary through production selectors', () => {
    for (const [id, type] of entries) {
      const url = `/ui/whetstorm/armory/${id}.webp`;
      expect(WEAPON_SKINS[id]).toMatchObject({ collection: 'fallen_star', weaponType: type });
      expect(fallenStarTrioArmorySkinArt(id)).toBe(url);
      expect(armorySkinArt(id)).toBe(url);
      expect(reliquaryCellArt({ kind: 'weapon_skin', id })).toEqual({ kind: 'url', url });
      expect(cosmeticsPanelHtml({
        tab: 'skins', ownedMountSkins: [], wornMountSkin: null, ownsAnyMount: false,
        weaponSkinIds: [id], weaponSkinLoadout: {}, applicableWeaponTypes: [],
        mechChromaIds: [], wornMech: { catalog: 'mech', skin: 0 },
      })).toContain(url);
    }
    expect(fallenStarTrioArmorySkinArt('__proto__')).toBeNull();
    expect(fallenStarTrioArmorySkinArt('solheim_sword')).toBeNull();
  });
  it('pins text-only original masters and deliveries', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/armory-fallen-star-trio-generation.json', 'utf8'));
    expect(assets.map((a: { skinId: string }) => a.skinId)).toEqual(entries.map(([id]) => id));
    expect(new Set(assets.map((a: { sha256: string }) => a.sha256)).size).toBe(3);
    for (const a of assets) {
      expect(a.reference_images).toEqual([]);
      expect(hash(a.file)).toBe(a.sha256);
      expect(hash(a.delivery.path)).toBe(a.delivery.sha256);
      expect(await sharp(a.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp' });
    }
  });
});
