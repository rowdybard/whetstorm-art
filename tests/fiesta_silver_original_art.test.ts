import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { Window } from 'happy-dom';
import { describe, expect, it, vi } from 'vitest';
import { AUGMENTS } from '../src/sim/content/augments';
import { fiestaAugmentImageUrl } from '../src/ui/hud/fiesta/fiesta_art';
import { FiestaController } from '../src/ui/hud/fiesta/fiesta_controller';

vi.mock('../src/ui/i18n', () => ({
  t: (key: string, values?: { name?: string }) => values?.name ?? key,
  tOptional: (key: string) => (key.includes('aug_brutality.name') ? 'Brutality' : key),
  formatNumber: String,
}));

const ids = [
  'aug_brutality',
  'aug_spellfire',
  'aug_toughness',
  'aug_keen_eye',
  'aug_fleetfoot',
  'aug_ironhide',
  'aug_mending',
];

describe('original Fiesta silver augment art', () => {
  it('covers exactly the live silver wave with distinct recorded assets', () => {
    const provenance = JSON.parse(
      readFileSync('docs/whetstorm/fiesta-silver-original-art.json', 'utf8'),
    );
    expect(
      AUGMENTS.filter((augment) => augment.tier === 'silver').map((augment) => augment.id),
    ).toEqual(ids);
    expect(provenance.records.map((record: { id: string }) => record.id)).toEqual(ids);
    const hashes = new Set<string>();
    for (const record of provenance.records) {
      expect(fiestaAugmentImageUrl(record.id)).toBe(
        `/ui/whetstorm/fiesta/augments/${record.id}.svg`,
      );
      expect(record.path).toBe(`public${fiestaAugmentImageUrl(record.id)}`);
      const bytes = readFileSync(record.path);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(record.sha256);
      expect(bytes.toString()).toContain('viewBox="0 0 48 48"');
      hashes.add(record.sha256);
    }
    expect(hashes.size).toBe(ids.length);
    expect(fiestaAugmentImageUrl('aug_vampirism')).toBe('/ui/fiesta/augments/aug_vampirism.webp');
    expect(fiestaAugmentImageUrl('../aug_brutality')).toBeNull();
    expect(fiestaAugmentImageUrl('unknown')).toBeNull();
  });

  it('keeps the named card and its category fallback after an image error', () => {
    const window = new Window();
    const document = window.document as unknown as Document;
    document.body.innerHTML = '<div id="ui"></div>';
    const pick = vi.fn();
    const controller = new FiestaController({
      document,
      world: () => ({ arenaInfo: null, arenaAugmentPick: pick }),
      audio: { click: vi.fn(), scorePing: vi.fn(), revive: vi.fn() },
      crestIconUrl: () => '',
      random: () => 0,
      schedule: () => {},
    });
    (controller as unknown as { renderAugments: (offer: object) => void }).renderAugments({
      wave: 1,
      tier: 'silver',
      choices: ['aug_brutality'],
    });
    const card = document.querySelector<HTMLButtonElement>('.fa-card');
    if (!card) throw new Error('Missing augment card');
    const label = card.getAttribute('aria-label');
    expect(label).toContain('Brutality');
    expect(card.querySelector('.fa-desc')?.textContent).toBeTruthy();
    const image = card.querySelector('img');
    if (!image) throw new Error('Missing augment image');
    expect(image.getAttribute('src')).toBe(fiestaAugmentImageUrl('aug_brutality'));
    image.dispatchEvent(new window.Event('error') as unknown as Event);
    expect(card.querySelector('span.fa-icon svg')).not.toBeNull();
    expect(card.getAttribute('aria-label')).toBe(label);
    card.click();
    expect(pick).toHaveBeenCalledWith('aug_brutality');
  });
});
