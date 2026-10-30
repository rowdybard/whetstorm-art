import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const provenance = JSON.parse(
  readFileSync('docs/whetstorm/nythraxis-mob-portrait-generation.json', 'utf8'),
) as {
  id: string;
  delivery: { path: string; sha256: string };
  master: { path: string; sha256: string };
};
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Nythraxis mob portrait', () => {
  it('preserves the master and its 128px delivery', async () => {
    expect(provenance.id).toBe('nythraxis_scourge_of_thornpeak');
    expect(provenance.delivery.path).toBe(
      'public/ui/whetstorm/mobs/nythraxis_scourge_of_thornpeak.webp',
    );
    expect(provenance.master.path).toBe(
      'docs/design/whetstorm-art/mobs/nythraxis_scourge_of_thornpeak.png',
    );
    expect(digest(provenance.delivery.path)).toBe(provenance.delivery.sha256);
    expect(digest(provenance.master.path)).toBe(provenance.master.sha256);
    expect(await sharp(provenance.delivery.path).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
      hasAlpha: false,
    });
    const master = await sharp(provenance.master.path).metadata();
    expect(master.format).toBe('png');
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.height).toBeGreaterThanOrEqual(512);
  });
});
