import { expect, it, vi } from 'vitest';

vi.mock('../src/ui/i18n', () => ({
  formatDuration: String,
  formatMoney: String,
  formatNumber: String,
  t: (key: string) => key,
}));
vi.mock('../src/ui/entity_i18n', () => ({ itemDisplayName: () => 'item' }));
vi.mock('../src/ui/entity_display_core', () => ({
  npcDisplayName: () => '',
  npcDisplayTitle: () => '',
}));

import { WEEKLY_QUESTS } from '../src/sim/content/weekly_quests';
import { itemImageUrl } from '../src/ui/icons';
import { buildWeeklyQuestDialog } from '../src/ui/weekly_quests_view';

it('uses the shared original item art for the weekly emissary cache', () => {
  const dialog = buildWeeklyQuestDialog(WEEKLY_QUESTS[0], 20, 'reset');
  const art = itemImageUrl('emissary_cache');
  expect(art).toBeTruthy();
  expect(dialog.rewardItemIcon).toBe(art);
  expect(dialog.rewardItemIcon).not.toContain('ui/items/emissary_cache.webp');
});
