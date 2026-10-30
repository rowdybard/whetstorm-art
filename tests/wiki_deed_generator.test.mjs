import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../scripts/wiki/build_content.mjs', import.meta.url), 'utf8');

test('guide deed generator omits legacy crests while retaining public metadata and spoiler filters', () => {
  const start = source.indexOf('const guideHiddenDungeonIds =');
  const end = source.indexOf('// The Reliquary catalog', start);
  assert.ok(start >= 0 && end > start, 'deed generator section exists');
  const deeds = {
    public: {
      id: 'public',
      name: 'Public',
      category: 'combat',
      renown: 5,
      reward: { kind: 'title', text: 'Victor' },
    },
    hidden: { id: 'hidden', hidden: true },
    gated: { id: 'gated', trigger: { dungeonId: 'secret' } },
    flawless: { id: 'flawless' },
  };
  const result = runInNewContext(`${source.slice(start, end)}\nJSON.stringify(deeds)`, {
    DUNGEONS: { secret: { id: 'secret', guideVisible: false } },
    FINAL_BOSS_DUNGEONS: { boss: 'secret' },
    FLAWLESS_TASKS: { boss: 'flawless' },
    DEED_ORDER: Object.keys(deeds),
    DEEDS: deeds,
  });
  assert.deepEqual(JSON.parse(result), [
    {
      id: 'public',
      name: 'Public',
      category: 'combat',
      renown: 5,
      feat: false,
      rewardTitle: 'Victor',
    },
  ]);
  assert.doesNotMatch(source, /\/ui\/deeds\//);
  assert.match(source, /crest\?: string;/);
});
