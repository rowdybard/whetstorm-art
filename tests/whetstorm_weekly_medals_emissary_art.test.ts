import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { buildWeeklyQuestsView } from '../src/ui/weekly_quests_view';

vi.mock('../src/ui/i18n', () => ({
  t: (key: string) => key,
  formatNumber: String,
  formatDuration: String,
  formatMoney: String,
}));
vi.mock('../src/ui/entity_display_core', () => ({
  npcDisplayName: String,
  npcDisplayTitle: String,
}));
vi.mock('../src/ui/entity_i18n', () => ({ itemDisplayName: () => '' }));
vi.mock('../src/ui/icons', () => ({ iconDataUrl: () => '' }));

const root = resolve(import.meta.dirname, '..');
const ids = ['medal_dungeons', 'medal_raid', 'medal_battlegrounds', 'medal_worldboss', 'emissary'];

describe('original weekly medals and emissary portrait', () => {
  it('uses the committed images for each live card and the emissary', () => {
    const view = buildWeeklyQuestsView({ weeklyQuest: null, weeklyQuestResetAtMs: 0 }, 0);
    expect(view.cards.map((card) => card.medal)).toEqual(
      ids.slice(0, 4).map((id) => `ui/whetstorm/weekly/${id}.webp`),
    );
    expect(view.emissaryPortrait).toBe('ui/whetstorm/weekly/emissary.webp');
  });

  it('pins distinct original masters and delivery images to their provenance', () => {
    const manifest = JSON.parse(
      readFileSync(resolve(root, 'docs/whetstorm/weekly-medals-emissary-art.json'), 'utf8'),
    );
    expect(manifest.source).toBe('OpenAI built-in image generation');
    expect(manifest.externalReferenceImages).toEqual([]);
    expect(manifest.records.map((row: { id: string }) => row.id)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of manifest.records) {
      const master = readFileSync(resolve(root, asset.masterPath));
      const delivery = readFileSync(resolve(root, asset.deliveryPath));
      expect(createHash('sha256').update(master).digest('hex')).toBe(asset.masterSha256);
      expect(createHash('sha256').update(delivery).digest('hex')).toBe(asset.deliverySha256);
      expect(delivery.subarray(8, 12).toString()).toBe('WEBP');
      masters.add(asset.masterSha256);
      deliveries.add(asset.deliverySha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
