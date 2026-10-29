import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import evidence from '../docs/whetstorm/thornpeak-trophy-material-generation.json';
import { ZONE3_ITEMS, ZONE3_MOBS } from '../src/sim/content/zone3';
import { thornpeakTrophyMaterialItemImageUrl } from '../src/ui/thornpeak_trophy_material_item_art';

it('maps distinct live Thornpeak elite reagents to intact original paintings', async () => {
  const sources = [
    ['old_cragmaws_pelt', 'old_cragmaw'],
    ['cracked_ogre_tusk', 'brutok_skullsmasher'],
    ['emberwing_cinderscale', 'voskar_emberwing'],
  ] as const;
  const hashes = new Set<string>();
  for (const [id, mob] of sources) {
    expect(ZONE3_ITEMS[id]?.kind).toBe('junk');
    expect(ZONE3_MOBS[mob].loot?.some((entry) => 'itemId' in entry && entry.itemId === id)).toBe(
      true,
    );
    const url = thornpeakTrophyMaterialItemImageUrl(id);
    expect(url).toBe(`/ui/whetstorm/items/${id}.webp`);
    const bytes = readFileSync(`public${url}`);
    const hash = createHash('sha256').update(bytes).digest('hex');
    expect(hash).toBe(evidence.assets.find((asset) => asset.itemId === id)?.delivery.sha256);
    hashes.add(hash);
    const metadata = await sharp(bytes).metadata();
    expect([metadata.format, metadata.width, metadata.height, metadata.hasAlpha]).toEqual([
      'webp',
      128,
      128,
      false,
    ]);
  }
  expect(hashes.size).toBe(sources.length);
  expect(thornpeakTrophyMaterialItemImageUrl('__proto__')).toBeNull();
  expect(thornpeakTrophyMaterialItemImageUrl('missing')).toBeNull();
});
