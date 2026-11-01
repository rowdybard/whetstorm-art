// @vitest-environment happy-dom
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { specIconUrl } from '../src/ui/spec_icon_art';

// The exact identities in LEGACY_SPECIALIZATION_DISPOSITION.md. The six
// Mage and Warrior identities are checked separately for route preservation.
const replacements = {
  paladin: ['holy', 'protection', 'retribution'],
  hunter: ['beast_mastery', 'marksmanship', 'survival'],
  rogue: ['assassination', 'combat', 'subtlety'],
  priest: ['discipline', 'holy', 'shadow'],
  shaman: ['elemental', 'enhancement', 'restoration'],
  warlock: ['affliction', 'demonology', 'destruction'],
  druid: ['balance', 'feral', 'restoration'],
} as const;

type SpecClass = Parameters<typeof specIconUrl>[0]['class'];

it('resolves all 21 class-qualified replacement identities to standalone SVGs', () => {
  const entries = Object.entries(replacements).flatMap(([cls, ids]) => ids.map((id) => [cls, id]));
  expect(entries).toHaveLength(21);
  for (const [cls, id] of entries) {
    const url = `/ui/whetstorm/specs/${cls}/${id}.svg`;
    expect(specIconUrl({ class: cls as SpecClass, id })).toBe(url);
    const svg = readFileSync(`public${url}`, 'utf8');
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    expect(doc.documentElement.localName).toBe('svg');
    expect(doc.querySelector('parsererror')).toBeNull();
    expect(doc.documentElement.getAttribute('viewBox')).toBeTruthy();
    expect(doc.querySelector('path, polygon, rect, circle, ellipse')).not.toBeNull();
    expect(svg).not.toMatch(/<image\b|<foreignObject\b|<script\b|data:image|(?:href|src)\s*=/i);
  }
});

it('keeps Mage and Warrior routes and rejects unknown class-qualified identities', () => {
  for (const [cls, ids] of Object.entries({ mage: ['arcane', 'fire', 'frost'], warrior: ['arms', 'fury', 'prot'] })) {
    for (const id of ids) {
      expect(specIconUrl({ class: cls as SpecClass, id })).toBe(`/ui/whetstorm/specs/${cls}/${id}.svg`);
    }
  }
  expect(specIconUrl({ class: 'paladin', id: 'unknown' })).toBeNull();
  expect(specIconUrl({ class: 'paladin', id: 'balance' })).toBeNull();
  expect(specIconUrl({ class: 'unknown' as SpecClass, id: 'holy' })).toBeNull();
});
