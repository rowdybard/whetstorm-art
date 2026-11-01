// @vitest-environment happy-dom
import { afterEach, expect, it, vi } from 'vitest';

vi.mock('../src/ui/i18n', () => ({
  t: (key: string) => key === 'playerCard.nativeShareTitle' ? 'WHETSTORM LONG TRANSLATED WORDMARK' : key,
  formatNumber: (value: number) => String(value),
  getLanguage: () => 'en',
  languageTag: () => 'en',
}));

import { cardCanvasToBlob, cardCanvasToUploadBlob, renderPlayerCardCanvas } from '../src/ui/hud/player_card/player_card';
import { HEADER_RIGHT_EDGE } from '../src/ui/hud/player_card/card_layout';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it.each([true, false])('brands the preview and export when mark loading is %s', async (loads) => {
  const sources: string[] = [];
  vi.stubGlobal('Image', class {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    width = 128;
    height = 128;
    set src(value: string) {
      sources.push(value);
      if (loads) this.onload?.();
      else this.onerror?.();
    }
  });
  vi.stubGlobal('getComputedStyle', () => ({ getPropertyValue: () => '#333' }));
  const gradient = () => ({ addColorStop: vi.fn() });
  const context = {
    arcTo: vi.fn(), beginPath: vi.fn(), closePath: vi.fn(),
    createLinearGradient: vi.fn(gradient), createRadialGradient: vi.fn(gradient),
    drawImage: vi.fn(), fill: vi.fn(), fillRect: vi.fn(), fillText: vi.fn(),
    measureText: vi.fn((text: string) => ({ width: text.length * 8 })),
    moveTo: vi.fn(), restore: vi.fn(), save: vi.fn(), scale: vi.fn(),
    stroke: vi.fn(), strokeRect: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  const portrait = document.createElement('canvas');
  const canvas = await renderPlayerCardCanvas({
    name: 'A'.repeat(100), className: 'Warrior', classColor: '#a86', level: 20,
    realm: 'Realm', characterImage: portrait, primaryStats: [], combatStats: [], gear: [],
    topPercent: null, balance: null, devTier: null, devMergedPrs: null,
    referralHandle: 'adventurer', referralCount: null, siteUrl: 'https://example.test',
  });
  expect(sources).toEqual(['/ui/whetstorm/mark.svg']);
  expect(context.fillText).toHaveBeenCalledWith('WHETSTORM LONG TRANSLATED WORDMARK', 1156, 130, 132);
  // Canvas maxWidth bounds even a much longer translation to the reserved column.
  const brand = vi.mocked(context.fillText).mock.calls.find(([text]) => text === 'WHETSTORM LONG TRANSLATED WORDMARK');
  expect(brand).toBeDefined();
  expect(brand![1] - brand![3]!).toBeGreaterThan(HEADER_RIGHT_EDGE);
  const name = vi.mocked(context.fillText).mock.calls.find(([, x, y]) => x === 478 && y === 96);
  expect(name?.[0]).toMatch(/…$/);
  expect(478 + String(name![0]).length * 8).toBeLessThanOrEqual(HEADER_RIGHT_EDGE);
  expect(context.fillText).not.toHaveBeenCalledWith('WORLD OF CLAUDECRAFT', expect.anything(), expect.anything());
  if (loads) expect(context.drawImage).toHaveBeenCalledWith(expect.anything(), 1058, 38, 64, 64);
  else expect(context.drawImage).not.toHaveBeenCalledWith(expect.anything(), 1058, 38, 64, 64);
  const blob = new Blob(['png'], { type: 'image/png' });
  const toBlob = vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback) => callback(blob));
  expect(await cardCanvasToBlob(canvas)).toBe(blob);
  expect(await cardCanvasToUploadBlob(canvas)).toBe(blob);
  expect(toBlob).toHaveBeenCalledTimes(2);
  expect(canvas.width).toBe(1200);
  expect(canvas.height).toBe(630);
});
