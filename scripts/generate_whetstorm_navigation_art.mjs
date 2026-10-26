// Original editable Whetstorm vector masters. No inherited image inputs.
// Run from any directory: node scripts/generate_whetstorm_navigation_art.mjs
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = `${root}public/ui/whetstorm/`;
// Geometry uses a 64px canvas with a transparent safety margin. Four-pixel
// outlines remain one pixel wide at the smallest 16px map presentation.
const path = (d, fill = 'none') => `<path d="${d}" fill="${fill}"/>`;
const circle = (cx, cy, r, fill = 'none') =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
const rect = (x, y, w, h, rx = 2, fill = 'none') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
const ink = '#071512';
const gold = '#f2d68c';
const mint = '#9debb8';
const ice = '#a8e6ff';
const lilac = '#d9bdff';
const arch = path('M14 53V29C14 7 50 7 50 29V53M24 53V30C24 19 40 19 40 30V53');
const down = path('M23 32L32 41L41 32M32 21V41');
const up = path('M23 32L32 23L41 32M32 23V44');
const box = rect(11, 24, 42, 29) + path('M11 35H53M22 24V16H42V24');
const skull =
  path('M20 40C8 18 21 9 32 9C43 9 56 18 44 40L42 53H22Z', ink) +
  circle(24, 28, 3, 'currentColor') +
  circle(40, 28, 3, 'currentColor') +
  path('M28 44V52M36 44V52');
const markers = {
  'dungeon-entrance': [gold, arch + down, 'Stone arch with inward/downward arrow'],
  'dungeon-exit': [ice, arch + up, 'Stone arch with outward/upward arrow'],
  'gather-ore': [
    ice,
    path('M10 48L17 25L30 15L44 23L54 46L43 53H21Z', ink) + path('M17 25L32 33L44 23M32 33L29 51'),
    'Angular split ore boulder',
  ],
  'gather-wood': [
    gold,
    path('M16 51V15H30V51ZM30 25L45 12L53 22L30 43', ink) + path('M21 22V42M38 27L45 21'),
    'Forked cut timber',
  ],
  'gather-herb': [
    mint,
    path(
      'M32 54V23M32 38C11 41 9 28 11 18C24 18 32 26 32 38ZM32 30C31 14 42 10 53 12C53 24 45 31 32 30Z',
      ink,
    ),
    'Two broad leaves on a stem',
  ],
  'farm-patch': [
    mint,
    path('M9 46L32 56L55 46L32 36Z', ink) +
      path(
        'M32 41V15M32 29C18 30 16 20 16 16C26 16 32 21 32 29ZM32 23C33 12 41 10 48 11C47 20 41 24 32 23Z',
        ink,
      ),
    'Sprout above a diamond soil plot',
  ],
  'station-forge': [
    gold,
    path('M8 25H56L47 36H35V46H44V53H18V46H27V36H18Z', ink),
    'Anvil with broad horn and foot',
  ],
  'station-kitchens': [
    gold,
    rect(13, 28, 38, 25, 7, ink) + path('M9 28H55M22 20V11M32 20V7M42 20V11'),
    'Cooking pot with three steam strokes',
  ],
  'station-apothecary': [
    mint,
    path('M25 10H39M27 10V28L15 47Q12 54 21 54H43Q52 54 49 47L37 28V10M22 39H42', ink),
    'Flat-bottomed alchemy flask',
  ],
  'station-tannery': [
    gold,
    path('M21 10L32 17L43 10L54 23L45 32L50 44L39 54L32 47L25 54L14 44L19 32L10 23Z', ink) +
      path('M32 25V39'),
    'Spread hide with four tapered corners',
  ],
  'station-loom': [
    gold,
    path('M14 11V54M50 11V54M14 17H50M14 47H50M24 17V47M32 17V47M40 17V47M19 27H45M19 37H45'),
    'Rectangular loom and woven grid',
  ],
  'station-toolworks': [
    ice,
    path('M13 10L23 21L21 29L42 50Q48 55 53 49Q57 44 51 39L30 20L32 12L23 7L24 18L18 21Z', ink),
    'Open-jaw workshop wrench',
  ],
  'service-mailbox': [
    gold,
    rect(10, 18, 44, 31, 3, ink) + path('M11 20L32 36L53 20M11 48L24 37M53 48L40 37'),
    'Sealed envelope',
  ],
  'service-noticeboard': [
    gold,
    rect(12, 12, 40, 35, 2, ink) + path('M19 47V56M45 47V56M23 22H41M23 32H36'),
    'Posted board on two legs',
  ],
  'quest-available': [
    gold,
    path('M27 10H37L35 37H29Z', gold) + circle(32, 49, 5, gold),
    'Heavy exclamation mark',
  ],
  'quest-ready': [
    gold,
    path('M20 23C20 8 46 8 46 23C46 33 32 31 32 40') + circle(32, 51, 4, gold),
    'Heavy question mark',
  ],
  'quest-repeat': [
    ice,
    path('M15 27C17 9 47 9 49 27M49 37C47 55 17 55 15 37M41 22L49 29L56 20M23 42L15 35L8 44'),
    'Two opposing repeat arrows',
  ],
  'quest-cooldown': [
    ice,
    circle(32, 32, 21, ink) + path('M32 17V32L43 39'),
    'Clock face with distinct hands',
  ],
  'delve-entrance': [
    gold,
    path('M9 53L15 21L25 21L32 10L42 21H49L55 53Z', ink) + path('M24 51V37L32 29L40 37V51'),
    'Jagged cave mouth',
  ],
  'delve-passage': [
    gold,
    path('M11 17H39V47H11M22 32H53M43 22L53 32L43 42'),
    'Side corridor with rightward arrow',
  ],
  'delve-surface-exit': [
    mint,
    path('M13 49H51M32 47V21M21 31L32 20L43 31M16 19L12 15M48 19L52 15M32 12V7'),
    'Up arrow emerging toward daylight',
  ],
  'rift-entrance': [
    lilac,
    path('M32 7L48 18L54 35L43 54L22 54L10 35L17 18Z', ink) +
      path('M31 17L23 31L35 31L28 45L42 27H31Z', lilac),
    'Fractured upright portal',
  ],
  'rift-descent': [
    lilac,
    path('M12 12H26V25H39V38H52V52M34 16V29M28 23L34 29L40 23'),
    'Three descending stair steps',
  ],
  'rift-beacon': [
    ice,
    path('M22 54H42L37 32H27ZM32 12L43 23L32 34L21 23Z', ink) +
      path('M11 16L16 20M48 20L53 16M32 6V3'),
    'Raised crystal beacon',
  ],
  'rift-egress': [
    ice,
    path('M27 12H13V52H27M26 32H54M44 22L54 32L44 42'),
    'Open doorway with outward arrow',
  ],
  'reward-treasure': [
    gold,
    rect(10, 22, 44, 31, 4, ink) + path('M10 33H54M22 22V53M42 22V53M27 33H37V41H27Z', gold),
    'Banded treasure chest',
  ],
  'reward-locked-cache': [
    gold,
    box + rect(24, 31, 16, 15, 2, ink) + path('M27 31V26C27 18 37 18 37 26V31'),
    'Secured cache with central padlock',
  ],
  'reward-reliquary': [
    lilac,
    path('M12 51H52M17 51V23H47V51M12 23L32 9L52 23ZM26 32L32 27L38 32V42H26Z', ink),
    'Pediment shrine with inset relic',
  ],
  'world-passage': [
    ice,
    path('M8 45V31L17 20L26 31V45M38 45V31L47 20L56 31V45M22 33H42M32 25L42 33L32 41'),
    'Bridge connecting two route gates',
  ],
};
const families = {
  beast: [
    gold,
    path('M18 42L24 33H40L46 42L41 53H23Z', ink) +
      circle(14, 25, 5, ink) +
      circle(26, 16, 5, ink) +
      circle(39, 16, 5, ink) +
      circle(51, 25, 5, ink),
    'Four-toed paw',
  ],
  humanoid: [
    gold,
    circle(32, 19, 10, ink) + path('M13 53V44C13 29 51 29 51 44V53Z', ink),
    'Upright head and shoulders',
  ],
  mudfin: [
    mint,
    path('M12 35L5 23V46L13 39C29 61 53 47 57 33C45 16 26 15 12 35ZM27 23L34 10L43 24', ink) +
      circle(45, 31, 2, 'currentColor'),
    'Fish head with a tall dorsal fin',
  ],
  spider: [
    lilac,
    circle(32, 37, 11, ink) +
      circle(32, 22, 6, ink) +
      path(
        'M22 31L11 21L6 26M22 36L7 34M23 26L19 10L12 8M22 42L10 48L8 55M42 31L53 21L58 26M42 36L57 34M41 26L45 10L52 8M42 42L54 48L56 55',
      ),
    'Spider with four pairs of articulated legs',
  ],
  burrower: [
    gold,
    path('M10 50C11 24 25 16 40 24L53 39L44 50Z', ink) +
      path('M18 49L21 39M29 49L32 39M40 49L43 40M40 24L44 15L48 28'),
    'Low digging body and three claws',
  ],
  undead: [ice, skull, 'Skull with hollow eye sockets'],
  troll: [
    mint,
    path('M18 18L32 10L46 18L49 39L40 53H24L15 39Z', ink) +
      path('M18 38L11 29L13 47L23 44M46 38L53 29L51 47L41 44M23 26H27M37 26H41'),
    'Long face with paired upward tusks',
  ],
  ogre: [
    gold,
    path('M12 45L16 19L30 10L47 18L53 45L42 54H23Z', ink) +
      path('M20 29H28M36 29H44M26 43H39M22 39V45M42 39V45'),
    'Broad heavy brow and lower fangs',
  ],
  elemental: [
    ice,
    path('M32 7L50 29L44 51L23 55L11 35Z', ink) + path('M32 20L39 32L31 43L24 33Z', ice),
    'Faceted floating elemental core',
  ],
  dragonkin: [
    gold,
    path('M10 14L25 20L39 12L36 25L53 34L47 45L31 45L23 55L18 42L26 32L19 26Z', ink) +
      path('M38 30H44M38 44L44 53'),
    'Horned long-snouted dragon profile',
  ],
  reptile: [
    mint,
    path('M9 31L23 21L43 24L55 35L47 44L26 45L13 39Z', ink) +
      path('M25 22L28 13L34 24M37 24L41 15L46 28M18 33H24M37 36H52'),
    'Low reptile head with dorsal spines',
  ],
  demon: [
    lilac,
    path('M20 23L9 10L12 31L20 36L24 49L32 56L40 49L44 36L52 31L55 10L44 23L32 18Z', ink) +
      path('M23 33L28 35M36 35L41 33M28 45H36'),
    'Split horns around an angular face',
  ],
  sheep: [
    gold,
    path('M18 40C4 36 6 20 17 19C19 5 33 5 38 15C51 11 61 26 51 36L44 40', ink) +
      path('M23 29H41L39 49L32 55L25 49Z', ink),
    'Wool cloud around a narrow face',
  ],
};
const status = {
  npc: [
    mint,
    circle(32, 20, 9, ink) + path('M15 53V45C15 31 49 31 49 45V53M45 13H57M51 7V19'),
    'Friendly person with a small service cross',
  ],
  dead: [ice, path('M12 50L52 13M12 13L52 50') + skull, 'Skull crossed by diagonal bones'],
};

const entries = [];
function emit(group, table, oldDirectory, oldName = (id) => id) {
  mkdirSync(`${base}${group}`, { recursive: true });
  for (const [id, [color, geometry, subject]] of Object.entries(table)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><g color="${color}" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${geometry}</g></svg>\n`;
    const relative = `${group}/${id}.svg`;
    writeFileSync(`${base}${relative}`, svg);
    entries.push({
      path: relative,
      subject,
      sha256: createHash('sha256').update(svg).digest('hex'),
      supersedes: `/ui/${oldDirectory}/${oldName(id)}.webp`,
      source: 'Original hand-authored Whetstorm vector geometry; no image inputs',
    });
  }
}
emit('map-markers', markers, 'map-markers', (id) => id.replaceAll('-', '_'));
emit('families', families, 'crests/families');
emit('status', status, 'crests/status');
const mapping = JSON.parse(readFileSync(`${base}mapping.json`, 'utf8'));
const paths = new Set(entries.map((entry) => entry.path));
mapping.assets = mapping.assets.filter((entry) => !paths.has(entry.path));
mapping.assets.push(...entries);
writeFileSync(`${base}mapping.json`, `${JSON.stringify(mapping, null, 2)}\n`);
console.log(`Wrote ${entries.length} original assets (29 map markers, 13 families, 2 statuses).`);
