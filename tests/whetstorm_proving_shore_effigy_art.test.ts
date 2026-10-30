import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { PROVING_SHORE_CAMPS, PROVING_SHORE_MOBS } from '../src/sim/content/proving_shore';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Proving Shore effigy portrait', () => {
  it('records the live camp target and verifies its original master and delivery', async () => {
    expect(PROVING_SHORE_MOBS.training_effigy.dummy).toBe(true);
    expect(
      PROVING_SHORE_CAMPS.some((camp) => camp.mobId === 'training_effigy' && camp.count > 0),
    ).toBe(true);
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/proving-shore-effigy-provenance.json', 'utf8'),
    );
    expect(entries).toHaveLength(1);
    const entry = entries[0];
    expect(entry.id).toBe('training_effigy');
    expect(entry.source).toBe('OpenAI built-in image generation, text only');
    expect(entry.prompt).toContain('straw-stuffed training effigy');
    expect(entry.path).toBe('public/ui/whetstorm/mobs/training_effigy.webp');
    expect(entry.master.path).toBe('docs/design/whetstorm-art/mobs/training_effigy.png');
    for (const asset of [entry, entry.master]) {
      expect(hash(asset.path)).toBe(asset.sha256);
      expect(statSync(asset.path).size).toBe(asset.bytes);
    }
    expect(await sharp(entry.path).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
    });
    const master = await sharp(entry.master.path).metadata();
    expect(master.format).toBe('png');
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.height).toBe(master.width);
  });
});
