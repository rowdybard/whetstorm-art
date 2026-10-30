import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { TEMPLE_DUNGEON_DEFS, TEMPLE_DUNGEON_MOBS } from '../src/sim/content/temple';

it('pins the remaining active Drowned Temple target art to original masters', async () => {
  const { entries } = JSON.parse(
    readFileSync('public/ui/whetstorm/mobs/drowned-temple-remaining-provenance.json', 'utf8'),
  );
  expect(entries.map((entry: { id: string }) => entry.id)).toEqual([
    'choirmother_selthe',
    'moonspawn',
  ]);
  expect(
    TEMPLE_DUNGEON_DEFS.drowned_temple.spawns.some((s) => s.mobId === 'choirmother_selthe'),
  ).toBe(true);
  expect(TEMPLE_DUNGEON_MOBS.ysolei.summonAdds?.mobId).toBe('moonspawn');
  expect(TEMPLE_DUNGEON_MOBS.choirmother_selthe.family).toBe('humanoid');
  expect(TEMPLE_DUNGEON_MOBS.moonspawn.family).toBe('mudfin');
  for (const entry of entries) {
    expect(entry.source).toBe('OpenAI built-in image generation, text only');
    expect(entry.prompt.length).toBeGreaterThan(100);
    expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
    expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
    for (const asset of [entry, entry.master]) {
      expect(createHash('sha256').update(readFileSync(asset.path)).digest('hex')).toBe(
        asset.sha256,
      );
    }
    expect(await sharp(entry.path).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
    });
    const master = await sharp(entry.master.path).metadata();
    expect(master.format).toBe('png');
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.width).toBe(master.height);
  }
  expect(new Set(entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(
    entries.length,
  );
});
