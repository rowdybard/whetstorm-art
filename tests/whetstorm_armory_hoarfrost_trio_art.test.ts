import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it, vi } from 'vitest';
vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key }));
import { WEAPON_SKINS } from '../src/sim/content/weapon_skins';
import { hoarfrostTrioArmorySkinArt } from '../src/ui/armory_hoarfrost_trio_art';
import { cosmeticsPanelHtml } from '../src/ui/hud/cosmetics/cosmetics_cards_view';
import { reliquaryCellArt } from '../src/ui/reliquary_cell_art';
import { armorySkinArt } from '../src/ui/woc_store_view';
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
it('routes the Hoarfrost trio through owned cosmetics and Reliquary', async () => {
  const records = JSON.parse(readFileSync('docs/whetstorm/armory-hoarfrost-trio-generation.json', 'utf8')).assets;
  const models = [['hoarfrost_vigil_staff', 'staff', 'hoarfrost_vigil'], ['everwinter_wand', 'wand', 'shard_of_everwinter'], ['winterbite', 'bow', 'winterbite']];
  expect(records).toHaveLength(3);
  for (const [id, weaponType, model] of models) {
    const record = records.find((entry: { skinId: string }) => entry.skinId === id);
    expect(WEAPON_SKINS[id]).toMatchObject({ collection: 'hoarfrost', weaponType, model });
    expect(record.referenceImages).toEqual([]);
    expect(hash(record.master)).toBe(record.masterSha256);
    expect(hash(record.shipping)).toBe(record.shippingSha256);
    expect(await sharp(record.shipping).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128, hasAlpha: false });
    const url = `/ui/whetstorm/armory/${id}.webp`;
    expect(hoarfrostTrioArmorySkinArt(id)).toBe(url);
    expect(armorySkinArt(id)).toBe(url);
    expect(reliquaryCellArt({ kind: 'weapon_skin', id })).toEqual({ kind: 'url', url });
    const html = cosmeticsPanelHtml({ tab: 'skins', ownedMountSkins: [], wornMountSkin: null, ownsAnyMount: false, weaponSkinIds: [id], weaponSkinLoadout: {}, applicableWeaponTypes: [], mechChromaIds: [], wornMech: { catalog: 'mech', skin: 0 } });
    expect(html).toContain(url);
  }
  expect(hoarfrostTrioArmorySkinArt('unknown')).toBeNull();
});
