import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { archetypeImageUrl, professionImageUrl } from '../src/ui/hud/professions/profession_art';
import { professionIconUrl } from '../src/ui/icons';

describe('original smith profession crest', () => {
  it('routes the actual profession pair and rejects unknown identities', () => {
    const url = '/ui/whetstorm/professions/archetype_smith.webp';
    expect(archetypeImageUrl('weaponcrafting+armorcrafting')).toBe(url);
    expect(professionImageUrl('archetype_smith')).toBe(url);
    expect(professionIconUrl('archetype_smith')).toBe(url);
    expect(professionImageUrl('../archetype_smith')).toBeNull();
  });

  it('pins original and shipping assets', async () => {
    const record = JSON.parse(
      readFileSync('docs/whetstorm/profession-smith-generation.json', 'utf8'),
    );
    expect(record.reference_images).toEqual([]);
    for (const [path, digest] of [
      [record.master, record.masterSha256],
      [record.shipping, record.shippingSha256],
    ]) {
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(digest);
    }
    expect(await sharp(record.shipping).metadata()).toMatchObject({
      width: 128,
      height: 128,
      format: 'webp',
    });
  });
});
