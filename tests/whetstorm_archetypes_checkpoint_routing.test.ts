import { describe, expect, it } from 'vitest';
import {
  archetypeImageUrl,
  MASTERWORK_SEAL_IMAGE_URL,
  professionImageUrl,
} from '../src/ui/hud/professions/profession_art';
import { professionIconUrl } from '../src/ui/icons';

describe('original archetypes and masterwork seal routing', () => {
  it('routes each profession pair through the game resolver', () => {
    for (const [pair, id] of [
      ['alchemy+cooking', 'archetype_apothecary'],
      ['armorcrafting+engineering', 'archetype_cogsmith'],
      ['cooking+leatherworking', 'archetype_trapper'],
      ['enchanting+jewelcrafting', 'archetype_gembinder'],
      ['engineering+alchemy', 'archetype_bombardier'],
    ]) {
      expect(archetypeImageUrl(pair)).toBe(`/ui/whetstorm/professions/${id}.webp`);
      expect(professionIconUrl(id)).toBe(`/ui/whetstorm/professions/${id}.webp`);
    }
    expect(archetypeImageUrl('weaponcrafting+armorcrafting')).toBe(
      '/ui/professions/archetype_smith.webp',
    );
  });
  it('routes the masterwork seal for resolver and direct constant consumers', () => {
    const url = '/ui/whetstorm/professions/masterwork_seal.webp';
    expect(professionImageUrl('masterwork_seal')).toBe(url);
    expect(MASTERWORK_SEAL_IMAGE_URL).toBe(url);
  });
});
