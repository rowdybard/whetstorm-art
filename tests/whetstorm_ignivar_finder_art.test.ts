import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { buildDungeonFinderView, finderPortraitUrl } from '../src/ui/dungeon_finder_view';
import type { DungeonFinderInfo } from '../src/world_api';

const portrait = '/ui/whetstorm/encounters/ignivar-finder.webp';

describe('original Ignivar finder portrait', () => {
  it('shows the original in both raid difficulties and retains other portraits', () => {
    const info = {
      roles: [],
      queue: null,
      proposal: null,
      cooldown: 0,
      myListing: null,
      myApplication: null,
    } as DungeonFinderInfo;
    for (const difficulty of ['normal', 'heroic']) {
      const view = buildDungeonFinderView({
        info,
        board: null,
        playerLevel: 20,
        playerClass: 'warrior',
        playerId: 1,
        specRole: null,
        party: null,
        partyLeaderName: null,
        lockouts: [],
        tab: 'catalogue',
        selectedActivityId: `ignivar_raid_arena_${difficulty}`,
        stagedActivityIds: [],
      });
      expect(view.kind).toBe('live');
      if (view.kind !== 'live') throw new Error('finder unexpectedly loading');
      expect(
        view.detail?.encounters.find((e) => e.mobId === 'ignivar_herald_of_the_last_flame')
          ?.portraitUrl,
      ).toBe(portrait);
      expect(view.rows.find((r) => r.id === `ignivar_raid_arena_${difficulty}`)?.portraitUrl).toBe(
        '/ui/dungeons/varkhul_forgefather_of_the_last_flame.webp',
      );
    }
    expect(finderPortraitUrl('ignivar_herald_of_the_last_flame_extra')).toBe(
      '/ui/dungeons/ignivar_herald_of_the_last_flame_extra.webp',
    );
  });

  it('keeps the generated master and shipped image bound to their provenance', () => {
    const record = JSON.parse(
      readFileSync('docs/whetstorm/ignivar-finder-art-generation.json', 'utf8'),
    );
    expect(`/${record.deliveryPath.replace(/^public\//, '')}`).toBe(portrait);
    for (const [path, hash] of [
      [record.masterPath, record.masterSha256],
      [record.deliveryPath, record.deliverySha256],
    ]) {
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
    }
    expect(record.deliveryDimensions).toEqual([128, 128]);
  });
});
