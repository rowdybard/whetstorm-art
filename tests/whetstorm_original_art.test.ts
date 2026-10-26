import { describe, expect, it } from 'vitest';
import { TRINKET_AURA_ITEM } from '../src/sim/content/trinkets';
import { ABILITIES, ITEMS } from '../src/sim/data';
import { CLASS_ART_IDS, classIconUrl } from '../src/ui/class_icon_art';
import { abilityImageUrl, iconDataUrl, itemImageUrl } from '../src/ui/icons';
import {
  originalIconSvg,
  originalIconUrl,
  originalModifierRecipe,
  paintOriginalIcon,
} from '../src/ui/original_icon_art';

const recipe = { bg: 'holy', pal: 'gold', prims: [{ p: 'shield' }, { p: 'cross', s: 0.4 }] };
function expectOriginal(url: string | null) {
  expect(url).toMatch(/^data:image\/svg\+xml,/);
  if (!url) throw new Error('Expected an original SVG data URL');
  const svg = decodeURIComponent(url.split(',').slice(1).join(','));
  expect(svg).toContain('<polygon');
  expect(svg).not.toMatch(/<script|<image|<foreignObject|onload=/i);
}
describe('original Whetstorm artwork contract', () => {
  it('covers the complete live ability catalog with native artwork', () => {
    expect(Object.keys(ABILITIES).length).toBeGreaterThan(400);
    for (const id of Object.keys(ABILITIES)) expectOriginal(abilityImageUrl(id));
  });
  it('covers every live item without inherited bitmap requests', () => {
    expect(Object.keys(ITEMS).length).toBeGreaterThan(1600);
    for (const id of Object.keys(ITEMS)) {
      expectOriginal(itemImageUrl(id));
      expectOriginal(iconDataUrl('item', id));
    }
  });
  it('keeps a trinket aura identical to its originating item', () => {
    expect(Object.keys(TRINKET_AURA_ITEM).length).toBeGreaterThan(20);
    for (const [aura, item] of Object.entries(TRINKET_AURA_ITEM)) {
      expect(iconDataUrl('aura', aura)).toBe(iconDataUrl('item', item));
    }
  });
  it('preserves the closed current roster independently from launch art', () => {
    expect([...CLASS_ART_IDS].sort()).toEqual([
      'druid',
      'hunter',
      'mage',
      'paladin',
      'priest',
      'rogue',
      'shaman',
      'warlock',
      'warrior',
    ]);
    for (const id of CLASS_ART_IDS)
      expect(classIconUrl(id)).toBe(`/ui/whetstorm/classes/${id}.svg`);
    expect(classIconUrl('cleric')).toBeNull();
  });
  it('rejects hostile and stale catalog paths while retaining a safe fallback', () => {
    for (const id of ['__proto__', 'constructor', 'toString', '../../secret', '<script>']) {
      expect(abilityImageUrl(id)).toBeNull();
      expect(itemImageUrl(id)).toBeNull();
      expect(classIconUrl(id)).toBeNull();
      expectOriginal(iconDataUrl('ability', id));
    }
  });
  it('has deliberate modifier subjects instead of one unknown talent icon', () => {
    expect(originalModifierRecipe('pal_r8_steady_hands')?.prims[0].p).toBe('hand');
    expect(originalModifierRecipe('pal_r11_fist_of_justice')?.prims[0].p).toBe('fist');
    expect(originalModifierRecipe('pal_r14_sacred_reserve')?.prims[0].p).toBe('potion');
    expect(originalModifierRecipe('__proto__')).toBeNull();
  });
  it('is deterministic, cached and safe for non-finite requested sizes', () => {
    expect(originalIconSvg(recipe, 'ward')).toBe(originalIconSvg(recipe, 'ward'));
    expect(originalIconUrl(recipe, 'ward')).toBe(originalIconUrl(recipe, 'ward'));
    expect(originalIconSvg(recipe, '<script>', NaN)).toContain('width="96"');
    expect(originalIconSvg(recipe, '<script>')).not.toContain('<script>');
    expect(originalIconSvg(recipe, 'ward', 32)).toContain('width="32"');
  });
  it('draws the synchronous artwork with finite coordinates on an injected host', () => {
    let draws = 0;
    const state: Record<string, unknown> = {
      createLinearGradient: () => ({ addColorStop: () => {} }),
    };
    const ctx = new Proxy(state, {
      get(target, key) {
        if (typeof key === 'string' && key in target) return target[key];
        return (...args: unknown[]) => {
          for (const value of args)
            if (typeof value === 'number') expect(Number.isFinite(value)).toBe(true);
          draws++;
        };
      },
      set(target, key, value) {
        target[String(key)] = value;
        return true;
      },
    }) as unknown as CanvasRenderingContext2D;
    paintOriginalIcon(ctx, recipe, 'ward', 32);
    expect(draws).toBeGreaterThan(30);
  });
});
