import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES, CLASSES } from '../src/sim/data';
import { iconDataUrl } from '../src/ui/icons';
import { whetstormShamanSignatureImageUrl } from '../src/ui/whetstorm_shaman_signature_art';

it('routes four active Shaman abilities to distinct, traceable paintings', async () => {
  const ids = ['chain_lightning', 'flame_shock', 'frost_shock', 'ghost_wolf'];
  const provenance = JSON.parse(readFileSync('public/ui/whetstorm/abilities/shaman-core-provenance.json', 'utf8'));
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    expect(ABILITIES[entry.id]?.class).toBe('shaman');
    expect(CLASSES.shaman.abilities).toContain(entry.id);
    const url = `/ui/whetstorm/abilities/shaman_core_${entry.id}.webp`;
    expect(whetstormShamanSignatureImageUrl(entry.id)).toBe(url);
    expect(iconDataUrl('ability', entry.id)).toBe(url);
    for (const file of [entry, entry.master]) {
      const bytes = readFileSync(file.path);
      expect(bytes.length).toBe(file.bytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256);
    }
    const bytes = readFileSync(entry.path);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128, hasAlpha: false });
    await sharp(bytes).raw().toBuffer();
    hashes.add(entry.sha256);
  }
  expect(hashes.size).toBe(4);
  expect(whetstormShamanSignatureImageUrl('../ghost_wolf')).toBeNull();
});
