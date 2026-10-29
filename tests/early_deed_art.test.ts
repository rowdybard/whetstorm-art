import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';

const records = JSON.parse(readFileSync('docs/whetstorm/deed-batch-early-generation.json', 'utf8'))
  .records as Array<{
  id: string;
  master: string;
  masterSha256: string;
  shipping: string;
  shippingSha256: string;
}>;
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('early deed paintings', () => {
  it('maps exactly four distinct live identities to decoded, pinned artwork', async () => {
    expect(records.map((r) => r.id)).toEqual([
      'exp_first_ore',
      'exp_first_timber',
      'exp_first_herb',
      'chr_vale_first_cast',
    ]);
    expect(new Set(records.map((r) => r.shippingSha256)).size).toBe(4);
    for (const record of records) {
      expect(earlyDeedImageUrl(record.id)).toBe(`/${record.shipping.replace(/^public\//, '')}`);
      expect(hash(record.master)).toBe(record.masterSha256);
      expect(hash(record.shipping)).toBe(record.shippingSha256);
      const metadata = await sharp(record.shipping).metadata();
      expect([metadata.format, metadata.width, metadata.height]).toEqual(['webp', 128, 128]);
    }
    expect(earlyDeedImageUrl('unknown')).toBeNull();
  });
});
