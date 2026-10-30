import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { PRACTICE_DUMMY_MOBS, PRACTICE_ROW_ORDER } from '../src/sim/content/practice_dummies';

const ids = ['friendly_player_dummy', 'normal_boss_dummy', 'heroic_boss_dummy'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original practice dummy portraits', () => {
  it('pins distinct art for the three live, differently tinted practice targets', async () => {
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/practice-dummies-provenance.json', 'utf8'),
    );
    expect(entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(new Set(ids.map((id) => PRACTICE_DUMMY_MOBS[id].color)).size).toBe(ids.length);
    expect(new Set(entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(ids.length);
    for (const entry of entries) {
      expect(PRACTICE_ROW_ORDER).toContain(entry.id);
      expect(entry.source).toBe('OpenAI built-in image generation, text only');
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
      expect(hash(entry.path)).toBe(entry.sha256);
      expect(hash(entry.master.path)).toBe(entry.master.sha256);
      expect(await sharp(entry.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      expect((await sharp(entry.master.path).metadata()).format).toBe('png');
    }
  });
});
