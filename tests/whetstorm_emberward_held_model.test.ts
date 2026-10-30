import { describe, expect, it } from 'vitest';
import {
  characterPreloadUrls,
  itemOffhandModelUrl,
  offhandModelUrl,
} from '../src/render/characters/manifest';
import { WEAPON_SKINS } from '../src/sim/content/weapon_skins';
import { ITEMS } from '../src/sim/data';
import { itemImageUrl } from '../src/ui/icons';

describe('Varkhul Emberward held model', () => {
  const url = 'models/weapons/shield_round.glb';

  it('uses the round shield through the live offhand resolver with every weapon skin', () => {
    expect(itemOffhandModelUrl('varkhul_emberward')).toBe(url);
    expect(offhandModelUrl('varkhul_emberward', null)).toBe(url);
    for (const skinId of Object.keys(WEAPON_SKINS)) {
      expect(offhandModelUrl('varkhul_emberward', skinId)).toBe(url);
    }
    expect(characterPreloadUrls(true)).toContain(url);
    expect(characterPreloadUrls(false)).toContain(url);
  });

  it('inherits the replacement for every existing heroic copy and keeps its painting', () => {
    for (const item of Object.values(ITEMS).filter(
      (item) => item.heroicOf === 'varkhul_emberward',
    )) {
      expect(itemOffhandModelUrl(item.id)).toBe(url);
      expect(offhandModelUrl(item.id, null)).toBe(url);
    }
    expect(itemImageUrl('varkhul_emberward')).toBe('/ui/whetstorm/items/varkhul_emberward.webp');
  });
});
