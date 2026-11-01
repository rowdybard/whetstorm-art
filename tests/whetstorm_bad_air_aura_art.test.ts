import { existsSync } from 'node:fs';
import { expect, it } from 'vitest';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity, hasAuraRecipe, iconDataUrl } from '../src/ui/icons';
import { delveAffixImageUrl } from '../src/ui/hud/delve/delve_affix_art';

it('uses the existing Bad Air affix art for its live damage-over-time aura', () => {
  const url = '/ui/whetstorm/delve-affixes/bad_air.svg';
  expect(existsSync(`public${url}`)).toBe(true);
  expect(delveAffixImageUrl('bad_air')).toBe(url);
  const id = resolveAuraIconId({ id: 'bad_air', kind: 'dot' }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity);
  expect(id).toBe('bad_air');
  expect(auraImageUrl(id)).toBe(url);
  expect(iconDataUrl('aura', id)).toBe(url);
});
