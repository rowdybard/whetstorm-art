import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key, formatNumber: String }));
vi.mock('../src/guide/content.generated', () => ({ GUIDE_DEEDS: [] }));
vi.mock('../src/ui/icons', () => ({ iconDataUrl: (_kind: string, id: string) => `icon:${id}` }));

import { catalogSections } from '../src/guide/pages/deeds';

describe('guide deed crest routing', () => {
  it('renders the original category crest instead of a legacy path', () => {
    const html = catalogSections([
      {
        id: 'exp_first_ore',
        category: 'exploration',
        name: 'Ore',
        renown: 1,
        feat: false,
        rewardTitle: null,
        rewardBorder: null,
        crest: '/ui/deeds/legacy.webp',
      },
      {
        id: 'unpainted',
        category: 'combat',
        name: 'Combat',
        renown: 1,
        feat: false,
        rewardTitle: null,
        rewardBorder: null,
        crest: '/ui/deeds/legacy.webp',
      },
    ] as never);
    expect(html).toContain('icon:deed_exp_first_ore');
    expect(html).toContain('icon:deed_cat_combat');
    expect(html).not.toContain('/ui/deeds/');
    expect(html).toContain('alt=""');
  });
});
