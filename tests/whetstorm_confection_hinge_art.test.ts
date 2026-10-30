import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

describe('original confection hinge art', () => {
  it('ships the documented master and a screen-blend-ready WebP', async () => {
    const provenance = JSON.parse(
      await readFile(
        'public/ui/whetstorm/minigames/confection-hinge-original-provenance.json',
        'utf8',
      ),
    );
    for (const entry of [provenance, provenance.master]) {
      const bytes = await readFile(entry.path);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(entry.sha256);
    }
    const image = sharp(provenance.path);
    const metadata = await image.metadata();
    expect([metadata.format, metadata.width, metadata.height]).toEqual(['webp', 384, 256]);
    const { data, info } = await image.removeAlpha().raw().toBuffer({ resolveWithObject: true });
    for (const [x, y] of [
      [0, 0],
      [383, 0],
      [0, 255],
      [383, 255],
    ]) {
      const offset = (y * info.width + x) * info.channels;
      expect(Math.max(...data.subarray(offset, offset + 3))).toBeLessThan(5);
    }
  });
});
