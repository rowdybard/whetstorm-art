import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ZONE3_MOBS } from '../src/sim/content/zone3';

const entry = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/varkas-boneguard-provenance.json', 'utf8'),
).entries[0];
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Varkas Boneguard portrait', () => {
  it('covers the Bound Guardian summoned undead and pins the original artwork', async () => {
    expect(ZONE3_MOBS.bound_guardian.summonAdds?.mobId).toBe('varkas_boneguard');
    expect(ZONE3_MOBS.varkas_boneguard.family).toBe('undead');
    expect(entry.id).toBe('varkas_boneguard');
    expect(entry.path).toBe('public/ui/whetstorm/mobs/varkas_boneguard.webp');
    expect(entry.master.path).toBe('docs/design/whetstorm-art/mobs/varkas_boneguard.png');
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
