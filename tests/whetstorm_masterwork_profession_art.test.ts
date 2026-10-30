import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  WHETSTORM_MASTERWORK_SEAL_IMAGE_URL,
  whetstormMasterworkProfessionImageUrl,
} from '../src/ui/hud/professions/whetstorm_masterwork_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original masterwork seal painting', () => {
  it('routes only the exact identity and exports the same URL for constant consumers', () => {
    expect(whetstormMasterworkProfessionImageUrl('masterwork_seal')).toBe(
      WHETSTORM_MASTERWORK_SEAL_IMAGE_URL,
    );
    expect(WHETSTORM_MASTERWORK_SEAL_IMAGE_URL).toBe(
      '/ui/whetstorm/professions/masterwork_seal.webp',
    );
    expect(whetstormMasterworkProfessionImageUrl('masterwork_seal_extra')).toBeNull();
    expect(whetstormMasterworkProfessionImageUrl('../masterwork_seal')).toBeNull();
  });

  it('pins its original source and shipping file', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/profession-masterwork-generation.json', 'utf8'),
    );
    expect(assets).toHaveLength(1);
    const asset = assets[0];
    expect(asset.reference_images).toEqual([]);
    expect(asset.prompt.length).toBeGreaterThan(50);
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    const source = await sharp(asset.file).metadata();
    expect(source.width).toBeGreaterThanOrEqual(512);
    expect(source.height).toBe(source.width);
    expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
      width: 128,
      height: 128,
      format: 'webp',
    });
    expect(whetstormMasterworkProfessionImageUrl(asset.id)).toBe(
      `/${asset.delivery.path.slice(7)}`,
    );
  });
});
