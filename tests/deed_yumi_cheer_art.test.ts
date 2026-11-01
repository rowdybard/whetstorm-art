import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl } from '../src/ui/icons';
import { yumiCheerDeedImageUrl } from '../src/ui/yumi_cheer_deed_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Yumi cheer deed painting', () => {
  it('maps the live hidden deed to its pinned original artwork', async () => {
    const { records } = JSON.parse(readFileSync('docs/whetstorm/deed-yumi-cheer-generation.json', 'utf8'));
    expect(records.map((record: { id: string }) => record.id)).toEqual(['hid_yumi_cheer']);
    const [record] = records;
    expect(DEEDS[record.id].name).toBe("Yumi's Biggest Fan");
    expect(yumiCheerDeedImageUrl(record.id)).toBe(`/${record.shipping.replace(/^public\//, '')}`);
    const crest = deedCrestId(record.id, DEEDS[record.id].category);
    expect(crest).toBe('deed_hid_yumi_cheer');
    expect(iconDataUrl('crest', crest)).toBe(`/${record.shipping.replace(/^public\//, '')}`);
    expect(yumiCheerDeedImageUrl('unknown')).toBeNull();
    expect(record.referenceImages).toEqual([]);
    expect(hash(record.master)).toBe(record.masterSha256);
    expect(hash(record.shipping)).toBe(record.shippingSha256);
    expect(await sharp(record.shipping).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
