import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
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
import { buildWeeklyQuestDialog } from '../src/ui/weekly_quests_view';

it('ships original scene art at every weekly dialog URL', async () => {
  const provenance = JSON.parse(
    readFileSync('docs/whetstorm/weekly-scenes-generation.json', 'utf8'),
  );
  expect(provenance.records.map((record: { id: string }) => record.id).sort()).toEqual(
    WEEKLY_QUESTS.map((quest) => quest.kind).sort(),
  );
  for (const quest of WEEKLY_QUESTS) {
    const art = buildWeeklyQuestDialog(quest, 20, 'reset').art;
    const record = provenance.records.find((entry: { id: string }) => entry.id === quest.kind);
    expect(record.delivery).toBe(`public/${art}`);
    for (const [file, expected] of [
      [record.master, record.masterSha256],
      [record.delivery, record.deliverySha256],
    ]) {
      const bytes = readFileSync(file);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(expected);
    }
    const meta = await sharp(record.delivery).metadata();
    expect(meta.format).toBe('webp');
    expect(meta.width).toBe(768);
    expect(meta.height).toBeGreaterThan(400);
  }
});
