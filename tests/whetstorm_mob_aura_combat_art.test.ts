import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity } from '../src/ui/icons';

const families: Record<string, string[]> = {
  mob_mortal_strike: [
    'mortal_wound_bastion_revenant',
    'mortal_wound_deathstalker_voss',
    'mortal_wound_reliquary_gravecall_acolyte',
    'mortal_wound_voskar_emberwing',
  ],
  mob_pack_frenzy: ['pack_frenzy'],
  mob_rally: ['rally_ironvein_foreman'],
  mob_rampage: ['rampage_rift_boss_brute', 'rampage_warlord_drogmar'],
};
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('combat aura artwork', () => {
  it('routes mob runtime and family identities without stealing the hunter effect', () => {
    for (const [family, ids] of Object.entries(families)) {
      for (const id of ids) {
        const identity = resolveAuraIconId(
          { id, kind: 'mob_buff' },
          hasAbilityIconIdentity,
          () => false,
          hasAuraImageIdentity,
        );
        expect(identity).toBe(family);
        expect(auraImageUrl(id)).toBe(`/ui/whetstorm/auras/${family}.webp`);
        expect(auraImageUrl(identity)).toBe(`/ui/whetstorm/auras/${family}.webp`);
      }
    }
    expect(
      resolveAuraIconId(
        { id: 'pack_frenzy', kind: 'hunter_frenzy' },
        hasAbilityIconIdentity,
        () => false,
        hasAuraImageIdentity,
      ),
    ).toBe('unleash_beast');
  });

  it('routes earlier mob families through the identity used by the aura strip', () => {
    for (const [id, family] of [
      ['aoe_slow', 'mob_aoe_slow'],
      ['blind_vale_bandit', 'mob_blind'],
      ['corrode_deepfen_murloc', 'mob_corrode'],
      ['lockout_threnos_first_voice', 'mob_lockout'],
      ['hex_mudfin_murloc', 'mob_polymorph_hex'],
      ['cost_tax_gravecaller_mender', 'mob_cost_tax'],
    ]) {
      const identity = resolveAuraIconId(
        { id, kind: 'mob_debuff' },
        hasAbilityIconIdentity,
        () => false,
        hasAuraImageIdentity,
      );
      expect(identity).toBe(family);
      expect(auraImageUrl(identity)).toBe(`/ui/whetstorm/auras/${family}.webp`);
    }
  });

  it('pins distinct source and delivery images and their provenance', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mob-aura-combat-generation.json', 'utf8'),
    );
    expect(assets).toHaveLength(4);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(4);
    for (const asset of assets) {
      expect(asset.runtimeIds).toEqual(families[asset.id]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(asset.reference_images).toEqual([]);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
    }
  });
});
