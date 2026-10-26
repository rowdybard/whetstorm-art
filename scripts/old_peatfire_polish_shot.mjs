// Screenshots for the Old Peatfire polish (the Mirefen world boss): his body
// under the default graphics tier, and the Fire Breath ground warning held
// part-way through its cast bar so a still can show it.
//
// Offline flow (no server). Needs `npm run dev`. Writes PNGs to tmp/.
//   SHOT=body|breath   what to capture (default body)
//   GFX=low|medium|... forces the render tier through ?gfx= (default medium for
//                      body, low for breath; software GL picks low on its own)
//   HOLD=0.45          breath only: the cast-bar progress to hold the still at
//   SHOT_TAG=after     file name suffix
// e.g. SHOT=breath SHOT_TAG=before node scripts/old_peatfire_polish_shot.mjs
import fs from 'node:fs';
import puppeteer from 'puppeteer-core';
import { BROWSER_PATH } from './browser_path.mjs';
import { enterOfflineGame } from './enter_offline_game.mjs';
import { assertLoopbackUrl } from './lib/loopback_guard.mjs';

const SHOT = process.env.SHOT ?? 'body';
const GFX = process.env.GFX ?? (SHOT === 'body' ? 'medium' : 'low');
const HOLD = Number(process.env.HOLD ?? 0.45);
const TAG = process.env.SHOT_TAG ?? 'shot';
// It drives /dev cheats, so it only ever points at a local dev server.
const BASE = assertLoopbackUrl(process.env.GAME_URL ?? 'http://localhost:5173', 'GAME_URL');
const URL = `${BASE.origin}/?gfx=${GFX}`;
// SwiftShader renders the medium tier at a few frames a second: give the
// world time to stream in and the camera time to settle before shooting.
const SETTLE_S = Number(process.env.SETTLE_S ?? (GFX === 'low' ? 6 : 30));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync('tmp', { recursive: true });

const browser = await puppeteer.launch({
  executablePath: BROWSER_PATH,
  headless: 'new',
  args: [
    '--no-sandbox',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--window-size=1280,720',
  ],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });
const errors = [];
page.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.message}`));

await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
await enterOfflineGame(page, {
  charClass: 'warrior',
  charName: 'Fenn',
  settleMs: 4000,
  gameBootTimeoutMs: 90000,
});
const chat = (line) => page.evaluate((l) => window.__game.world.chat(l), line);
await chat('/dev level 12');
await chat('/dev immortal');
// The day/night scrub is a client chat hook, so it goes through the chat box.
await page.keyboard.press('Enter');
await sleep(200);
await page.keyboard.type('/daynight day');
await page.keyboard.press('Enter');
// About 15 yd south of his hollow, outside his 13 yd aggro.
await chat('/dev tp 138 371');
await sleep(1500);

const dismissOverlays = () =>
  page.evaluate(() => {
    document.querySelector('#loading-screen')?.classList.remove('visible', 'fade');
    for (const b of document.querySelectorAll('button')) {
      if (b.textContent.trim() === 'Dismiss') b.click();
    }
  });

if (SHOT === 'body') {
  // Face him toward the camera every few frames (his idle turns him away).
  await page.evaluate(() => {
    const g = window.__game;
    const boss = [...g.sim.entities.values()].find((e) => e.templateId === 'old_peatfire');
    g.sim.player.facing = 0;
    g.input.camYaw = 0;
    g.input.camPitch = 0.12;
    g.input.camDist = 7;
    setInterval(() => {
      boss.facing = Math.PI;
    }, 20);
  });
} else {
  // Pull him, then hold his Fire Breath bar part-way so the still shows the
  // warning; the sim keeps ticking, the hold only refills the bar.
  await page.evaluate((hold) => {
    const g = window.__game;
    const boss = [...g.sim.entities.values()].find((e) => e.templateId === 'old_peatfire');
    const p = g.sim.player;
    p.pos.x = boss.pos.x + 1;
    p.pos.z = boss.pos.z - 6;
    g.input.camYaw = 0.5;
    g.input.camPitch = 0.6;
    g.input.camDist = 22;
    setInterval(() => {
      boss.castingAbility = 'old_peatfire_breath';
      boss.castTotal = 2;
      boss.castRemaining = 2 * (1 - hold);
      boss.breathTimer = 10;
    }, 20);
  }, HOLD);
}
for (let i = 0; i < SETTLE_S; i++) {
  await sleep(1000);
  await dismissOverlays();
}
const path = `tmp/old_peatfire_${SHOT}_${GFX}_${TAG}.png`;
await page.screenshot({ path });
console.log('wrote', path);
if (errors.length) console.log(`PAGE ERRORS:\n${errors.join('\n')}`);
await browser.close();
