import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { archetypeImageUrl, professionImageUrl } from '../src/ui/hud/professions/profession_art';
import { professionIconUrl } from '../src/ui/icons';

describe('original profession archetype paintings', () => {
  it('routes the remaining profession pairs through the UI', () => {
    for (const [pair, id] of [
      ['inscription+enchanting', 'archetype_arcanist'],
      ['jewelcrafting+weaponcrafting', 'archetype_bladewright'],
      ['leatherworking+tailoring', 'archetype_outfitter'],
      ['tailoring+inscription', 'archetype_mageweaver'],
    ]) {
      const url = `/ui/whetstorm/professions/${id}.webp`;
      expect(archetypeImageUrl(pair)).toBe(url);
      expect(professionImageUrl(id)).toBe(url);
      expect(professionIconUrl(id)).toBe(url);
    }
    expect(professionImageUrl('../archetype_arcanist')).toBeNull();
  });
  it('pins independent sources and decodable shipping files', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/profession-archetypes-b-generation.json', 'utf8'),
    );
    expect(records).toHaveLength(4);
    expect(new Set(records.map((r: { masterSha256: string }) => r.masterSha256)).size).toBe(4);
    for (const r of records) {
      expect(r.reference_images).toEqual([]);
      for (const [path, digest] of [
        [r.master, r.masterSha256],
        [r.shipping, r.shippingSha256],
      ]) {
        expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(digest);
      }
      expect(await sharp(r.shipping).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
    }
  });
});
