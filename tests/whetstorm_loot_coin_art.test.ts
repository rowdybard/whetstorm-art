import { existsSync } from 'node:fs';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl } from '../src/ui/icons';

it('uses the existing original gold coin for the loot money row', () => {
  const url = '/ui/whetstorm/hud/currency/coin_gold.webp';
  expect(Object.hasOwn(ITEMS, 'coin_gold')).toBe(false);
  expect(existsSync(`public${url}`)).toBe(true);
  expect(iconDataUrl('item', 'coin_gold')).toBe(url);
});
