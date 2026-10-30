import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { WARLOCK_PET_MOBS } from '../src/sim/content/warlock_pets';

const entry = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/pyre-colossus-provenance.json', 'utf8'),
).entries[0];
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Pyre Colossus portrait', () => {
  it('pins the original art for the summoned demon', async () => {
    expect(WARLOCK_PET_MOBS.pyre_colossus.family).toBe('demon');
    expect(readFileSync('src/sim/combat/destruction.ts', 'utf8')).toContain(
      "createDemonPet(ctx, player, 'pyre_colossus')",
    );
    expect(entry.id).toBe('pyre_colossus');
    expect(entry.path).toBe('public/ui/whetstorm/mobs/pyre_colossus.webp');
    expect(entry.master.path).toBe('docs/design/whetstorm-art/mobs/pyre_colossus.png');
    expect(entry.source).toBe('OpenAI built-in image generation, text only');
    const asset = readFileSync(entry.path);
    const master = readFileSync(entry.master.path);
    expect(digest(asset)).toBe(entry.sha256);
    expect(asset.length).toBe(entry.bytes);
    expect(digest(master)).toBe(entry.master.sha256);
    expect(master.length).toBe(entry.master.bytes);
    expect(await sharp(asset).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
    });
    const metadata = await sharp(master).metadata();
    expect(metadata.format).toBe('png');
    expect(metadata.width).toBeGreaterThanOrEqual(512);
    expect(metadata.height).toBeGreaterThanOrEqual(512);
  });
});
