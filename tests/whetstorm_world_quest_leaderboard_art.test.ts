import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { Window } from 'happy-dom';
import { describe, expect, it, vi } from 'vitest';
import { WORLD_QUEST_SCOREBOARDS } from '../src/sim/world_quest_scoreboards';
import { buildWorldQuestLadderView } from '../src/ui/world_quest_leaderboard_view';
import { WorldQuestLeaderboardWindow } from '../src/ui/world_quest_leaderboard_window';
import type { IWorld } from '../src/world_api';

vi.mock('../src/ui/i18n', () => ({
  t: (key: string) => key,
  formatNumber: String,
}));
vi.mock('../src/ui/world_quest_view', () => ({ worldQuestDisplayName: (id: string) => id }));

const boards = [
  'north_watch_cannon',
  'last_keep_cannon',
  'calligraphy',
  'slalom',
  'forge',
  'glider',
];

describe('original world quest leaderboard art', () => {
  it('routes all live board cards and earned medals to distinct, recorded SVGs', () => {
    const record = JSON.parse(
      readFileSync('docs/whetstorm/world-quest-leaderboard-art.json', 'utf8'),
    );
    const images = new Set<string>();
    for (const board of WORLD_QUEST_SCOREBOARDS) {
      const view = buildWorldQuestLadderView(board.id, { kind: 'loading' }, '');
      for (const card of view.cards) images.add(card.art);
    }
    expect([...images].sort()).toEqual(
      boards.map((id) => `/ui/whetstorm/world-quest-leaderboard/${id}.svg`).sort(),
    );
    expect(record.assets).toHaveLength(6);
    for (const asset of record.assets) {
      const svg = readFileSync(asset.path, 'utf8');
      expect(createHash('sha256').update(svg).digest('hex')).toBe(asset.sha256);
      expect(svg).toContain('viewBox="0 0 420 180"');
      expect(svg).not.toMatch(/<image\b|<script\b|(?:href|src)\s*=/i);
    }
  });

  it('renders real card and medal URLs while preserving board navigation and names', async () => {
    const window = new Window();
    const root = window.document.createElement('div') as unknown as HTMLElement;
    window.document.body.appendChild(root as unknown as Node);
    const read = vi.fn(async (board: string) => ({
      board,
      page: 0,
      pageSize: 20,
      pageCount: 1,
      total: 3,
      leaders: [
        { rank: 1, name: 'A', medal: 'gold', metric: 10 },
        { rank: 2, name: 'B', medal: 'silver', metric: 9 },
        { rank: 3, name: 'C', medal: 'bronze', metric: 8 },
      ],
    }));
    const painter = new WorldQuestLeaderboardWindow({
      root: () => root,
      world: () => ({ player: { name: 'A' }, worldQuestLeaderboard: read }) as unknown as IWorld,
      closeOthers: () => {},
      captureFocus: () => null,
      restoreFocus: () => {},
    });
    painter.open();
    await vi.waitFor(() => expect(root.querySelectorAll('.wql-medal-icon')).toHaveLength(4));
    expect(root.querySelector('.wql-card-art')?.getAttribute('style')).toContain(
      'north_watch_cannon.svg',
    );
    for (const medal of ['gold', 'silver', 'bronze']) {
      expect(root.innerHTML).toContain(`/ui/whetstorm/leaderboard/medal_${medal}.svg`);
    }
    const card = root.querySelector<HTMLButtonElement>('[data-wql-board="forge"]');
    expect(card?.textContent).toBeTruthy();
    expect(card?.querySelector('.wql-card-art')?.getAttribute('aria-hidden')).toBe('true');
    card?.click();
    await vi.waitFor(() => expect(read).toHaveBeenCalledWith('forge', 0, expect.any(Number), 'A'));
    expect(root.querySelector('[data-wql-board="forge"]')?.getAttribute('aria-pressed')).toBe(
      'true',
    );
  });
});
