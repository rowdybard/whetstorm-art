import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it, vi } from 'vitest';
vi.mock('../src/ui/i18n', () => ({ t: (key: string) => key, formatNumber: (value: number) => String(value) }));
import { bankRungClaudiumTagHtml } from '../src/ui/bank_rung_view';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('retains the original alpha-bearing price token and its recorded lineage', async () => {
  const record = JSON.parse(readFileSync('docs/whetstorm/price-token-generation.json', 'utf8'));
  expect(record.source).toBe('OpenAI built-in image generation');
  expect(record.referenceImages).toEqual([]);
  expect(hash(record.master)).toBe(record.masterSha256);
  expect(hash(record.shipping)).toBe(record.shippingSha256);
  expect(await sharp(record.shipping).metadata()).toMatchObject({ format: 'webp', width: 64, height: 64, hasAlpha: true });
  const { data, info } = await sharp(record.shipping).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  expect(data[3]).toBe(0);
  expect(data[((32 * info.width + 32) * 4) + 3]).toBeGreaterThan(240);
});

it('uses the replacement token on the bank price tag', () => {
  const html = bankRungClaudiumTagHtml({ cost: 123, skuId: 'test' });
  expect(html).toContain('/ui/whetstorm/currency/price-token.webp');
  expect(html).toContain('123');
  expect(html).not.toContain('/claudium/icons/claudium_coin_64.webp');
});
