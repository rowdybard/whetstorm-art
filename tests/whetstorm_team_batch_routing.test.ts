import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { ITEMS } from '../src/sim/data';
import { deedCrestId } from '../src/ui/deeds_view';
import { auraImageUrl, deedImageUrl, iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('team art batch public routing', () => {
  it('routes live item identities to their own artwork', () => {
    for (const id of [
      'riftwalkers_tunic',
      'riftwalkers_cord',
      'riftwalkers_treads',
      'artificers_welding_cowl',
      'old_cragmaws_pelt',
      'cracked_ogre_tusk',
      'emberwing_cinderscale',
      'moonscale_saber',
      'palecoil_rod',
      'tideglass_dirk',
    ]) {
      expect(ITEMS[id]).toBeDefined();
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes live deed identities through the crest interface', () => {
    for (const id of [
      'cmb_first_blood',
      'cmb_first_fall',
      'exp_something_shiny',
      'exp_vale_wayfarer',
      'exp_marsh_wayfarer',
      'exp_peaks_wayfarer',
    ]) {
      expect(DEEDS[id]).toBeDefined();
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(deedImageUrl(crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
      expect(iconDataUrl('crest', crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
    }
  });
  it('routes both runtime and family identities for mob effects', () => {
    for (const [id, family] of [
      ['slowstrike_mire_prowler', 'mob_slow_strike'],
      ['stagger_deeprock_kobold', 'mob_stagger_hit'],
      ['tongues_nhalia_mourner', 'mob_tongues'],
      ['wither_fen_troll', 'mob_wither'],
    ]) {
      const url = `/ui/whetstorm/auras/${family}.webp`;
      expect(auraImageUrl(id)).toBe(url);
      expect(auraImageUrl(family)).toBe(url);
      expect(iconDataUrl('aura', id)).toBe(url);
    }
  });
  it('pins combat deed masters and deliveries to the generation record', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-combat-generation.json', 'utf8'),
    );
    expect(records.map((r: { id: string }) => r.id)).toEqual(['cmb_first_blood', 'cmb_first_fall']);
    const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
    expect(new Set(records.map((r: { masterSha256: string }) => r.masterSha256)).size).toBe(2);
    for (const record of records) {
      expect(hash(record.master)).toBe(record.masterSha256);
      expect(hash(record.shipping)).toBe(record.shippingSha256);
      expect(await sharp(record.shipping).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
    }
  });
});
