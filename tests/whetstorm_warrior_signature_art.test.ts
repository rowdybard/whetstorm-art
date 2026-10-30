import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/data';
import { abilityImageUrl, iconDataUrl } from '../src/ui/icons';
import { whetstormWarriorSignatureImageUrl } from '../src/ui/whetstorm_warrior_signature_art';

it('routes Warrior signature abilities and aura identities to their original paintings', async () => {
  const hashes: Record<string, string> = {
    charge: 'a2b03c5db002bc8a5650eb1b97ec0bf9b16bf9f91f7dfd53f42b25f174d4e708',
    heroic_strike: '78e64ae24733c444fd69d26cb3b18d099533a692386100b03d7c01847e399858',
    execute: 'e4334fb02c6872cca2d04533098170952de6502ba08dba5de34973a569b15f20',
  };
  for (const [id, hash] of Object.entries(hashes)) {
    expect(ABILITIES[id]?.class).toBe('warrior');
    const url = `/ui/whetstorm/abilities/${id}.webp`;
    expect(abilityImageUrl(id)).toBe(url);
    expect(iconDataUrl('ability', id)).toBe(url);
    expect(iconDataUrl('aura', id)).toBe(url);
    const file = `public${url}`;
    const bytes = readFileSync(file);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(hash);
    expect(await sharp(bytes).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
      hasAlpha: false,
    });
    await sharp(bytes).raw().toBuffer();
  }
  expect(whetstormWarriorSignatureImageUrl('../charge')).toBeNull();
  expect(whetstormWarriorSignatureImageUrl('battle_shout')).toBeNull();
  expect(abilityImageUrl('battle_shout')).not.toContain('/ui/whetstorm/abilities/');
});
