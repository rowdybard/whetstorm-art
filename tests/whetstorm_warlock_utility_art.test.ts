import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/data';
import { abilityImageUrl, iconDataUrl } from '../src/ui/icons';
import { whetstormWarlockUtilityImageUrl } from '../src/ui/whetstorm_warlock_utility_art';

it('pins four active Warlock utility paintings and their independent masters', async () => {
  const hashes: Record<string, string> = {
    evil_eye: '72446307b82efc0fc7ec6d3e2d19007a56fc6bc367d88d259eeb6306f8d90db4',
    cursed_accomplice: 'aa0a8479358849e4e22030dde4a56649e9f6140c4df834253562d76512066127',
    cruel_pact: '8b8b403d4dfbafa4c3addd89c005bffb52e45c8502a4f754d3266c84d4bd1b23',
    vicarious_suffering: '63feace3c66939c7d1414d4efd45bb3c14c247ea90281a2564ab50907f9a31fa',
  };
  const provenance = JSON.parse(readFileSync('public/ui/whetstorm/abilities/warlock-utility-provenance.json', 'utf8'));
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(Object.keys(hashes));
  for (const entry of provenance.entries) {
    expect(ABILITIES[entry.id]?.class).toBe('warlock');
    expect(ABILITIES[entry.id]?.passive).not.toBe(true);
    const url = `/ui/whetstorm/abilities/warlock_utility_${entry.id}.webp`;
    expect(whetstormWarlockUtilityImageUrl(entry.id)).toBe(url);
    expect(abilityImageUrl(entry.id)).toBe(url);
    expect(iconDataUrl('ability', entry.id)).toBe(url);
    const bytes = readFileSync(entry.path);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(hashes[entry.id]);
    expect(entry.sha256).toBe(hashes[entry.id]);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
    const master = readFileSync(entry.master.path);
    expect(createHash('sha256').update(master).digest('hex')).toBe(entry.master.sha256);
    expect((await sharp(master).metadata()).width).toBeGreaterThan(128);
  }
  expect(whetstormWarlockUtilityImageUrl('../evil_eye')).toBeNull();
});
