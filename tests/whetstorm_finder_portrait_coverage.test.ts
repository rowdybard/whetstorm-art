import { existsSync } from 'node:fs';
import { expect, it } from 'vitest';
import { FINDER_ACTIVITIES } from '../src/sim/content/dungeon_finder';
import { finderPortraitUrl } from '../src/ui/dungeon_finder_view';

it('routes every current Dungeon Finder encounter to a shipped original portrait', () => {
  const ids = new Set(
    FINDER_ACTIVITIES.flatMap((activity) =>
      activity.encounters.map((encounter) => encounter.mobId),
    ),
  );
  expect(ids.size).toBeGreaterThan(0);
  for (const id of ids) {
    const url = finderPortraitUrl(id);
    expect(url, id).toMatch(/^\/ui\/whetstorm\/encounters\/[a-z0-9_-]+\.webp$/);
    expect(existsSync(`public${url}`), id).toBe(true);
  }
  expect(finderPortraitUrl('unknown')).toBe('/ui/dungeons/unknown.webp');
});
