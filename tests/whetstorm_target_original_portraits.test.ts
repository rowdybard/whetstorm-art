import { existsSync } from 'node:fs';
import { expect, it } from 'vitest';
import { targetPortraitSourceId, targetPortraitUrl } from '../src/ui/target_portrait_view';

it('routes original mob portraits while retaining non-mob, alias, and unknown behavior', () => {
  const ids = [
    'forest_wolf',
    'wild_boar',
    'webwood_spider',
    'mudfin_murloc',
    'mire_prowler',
    'deepfen_murloc',
    'mire_widow',
    'drowned_dead',
    'ridge_stalker',
    'deeprock_kobold',
    'thornpeak_ogre',
    'stormcrag_elemental',
    'morthen',
    'vael_the_mistcaller',
    'ysolei',
    'ignivar_herald_of_the_last_flame',
    'varkhul_forgefather_of_the_last_flame',
    'nythraxis_scourge_of_thornpeak',
  ];
  for (const id of ids) {
    const url = targetPortraitUrl(id, true);
    expect(url, id).toMatch(/^\/ui\/whetstorm\//);
    expect(existsSync(`public${url}`), id).toBe(true);
    expect(targetPortraitUrl(id, false)).toBeNull();
  }
  expect(targetPortraitSourceId('guardian_stampede_1', true)).toBe('wild_boar');
  expect(targetPortraitUrl('guardian_stampede_1', true)).toBe(targetPortraitUrl('wild_boar', true));
  expect(targetPortraitUrl('forest_wolf_extra', true)).toBe('/ui/mobs/forest_wolf_extra.webp');
  expect(targetPortraitUrl('unknown/creature', true)).toBe('/ui/mobs/unknown%2Fcreature.webp');
});
