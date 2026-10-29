import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('eighteenth resumed original art checkpoint', () => {
  it('routes weapons, fishing rods and progression supplies', () => {
    for (const id of [
      'thorium_warblade',
      'arcanite_war_axe',
      'soul_stone',
      'wyrmfall_core',
      'lastflame_core',
      'stormreel_fishing_rod',
      'tidewrought_fishing_rod',
      'clockreel_fishing_rod',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes bloom and ward status effects', () => {
    for (const id of [
      'deathbloom',
      'lifebloom',
      'nythraxis_transition_pause',
      'nythraxis_wardstone_lit',
    ]) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
