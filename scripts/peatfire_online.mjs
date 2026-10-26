// Old Peatfire online: a five-bot party fights the Mirefen world boss on the
// real server while two more clients stand in the fight, so one run checks
// what the offline playtests cannot:
//   - boss damage is server-authoritative: forged frames and client position
//     claims change nothing, every client reads the same boss and party hp on
//     the same tick, and every mechanic hit (or miss) matches the SERVER's own
//     positions at the resolution tick;
//   - every telegraph (the Shuddering Stomp ring, the Fire Breath cast bar,
//     the Peat Blaze ring) reaches every client in range on the same tick;
//   - Sidestep evades a mechanic online, with and without simulated latency,
//     and the server refuses a dodge it should refuse.
// The roster: Tankrik (warrior) holds the boss and never dodges (the control);
// Lumen (paladin) and Laggard (rogue, outside the party, PEATFIRE_LAG_MS each
// way) stand inside the breath cone and the stomp ring and Sidestep both,
// pressing PRESS_LEAD_MS before the impact they see; Vessa (priest), Pyrra
// (mage) and Fletch (hunter) fight from range; Watcher (mage, outside the
// party) only watches from 40 yd and runs the authority probes.
// Requires the server running with ALLOW_DEV_COMMANDS=1 and Old Peatfire alive
// (a kill respawns him an hour later: restart the server to rerun).
//   SERVER_URL          default http://localhost:8787
//   PEATFIRE_LAG_MS     Laggard's one-way delay in ms (default 75, so 150 ms RTT)
//   PEATFIRE_FIGHT_SEC  fight time limit in seconds (default 420)
//   PEATFIRE_LEVEL      bot level (default 12, the boss's level)
//   PEATFIRE_REPORT     optional path for a JSON report of every telegraph and hit
import { writeFileSync } from 'node:fs';
import WebSocket from 'ws';
import { chatCommandMessage, worldAuthMessage } from './lib/world_auth.mjs';

const BASE = process.env.SERVER_URL ?? 'http://localhost:8787';
const WS_BASE = BASE.replace(/^http/, 'ws');
const LAG_MS = Number(process.env.PEATFIRE_LAG_MS ?? 75);
const FIGHT_SEC = Number(process.env.PEATFIRE_FIGHT_SEC ?? 420);
const LEVEL = Number(process.env.PEATFIRE_LEVEL ?? 12);
const REPORT = process.env.PEATFIRE_REPORT ?? '';
const uniq = Date.now().toString(36);
const alpha = uniq.replace(/[0-9]/g, (d) => 'abcdefghij'[Number(d)]).slice(-5);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The boss (src/sim/content/zone2.ts old_peatfire) and its telegraphs. The
// windup is RIFT_MECHANIC_WINDUP_SEC (src/sim/mob/rift_escape_window.ts).
const BOSS = 'old_peatfire';
const BOSS_HOME = { x: 138, z: 386 };
const BREATH_CAST = 'old_peatfire_breath';
const BREATH = { range: 13, halfArc: Math.PI / 6 };
const STOMP_RADIUS = 8;
const STOMP_WINDUP_MS = 1200;
const BLAZE_RADIUS = 12;
const BLAZE_MS = 8000;
// Press this long before the impact the client sees: inside the 200 to 650 ms
// band combat/sidestep.ts works out for 150 ms RTT, and safe at 0 ms too.
const PRESS_LEAD_MS = 350;
// A press covers a landing at most this many ticks after it: the 10-tick
// evade window (8 plus 2 grace, combat/sidestep.ts), its start tick, and one
// tick of client stamping slack.
const EVADE_WINDOW_TICKS = 12;
// The audit reads each body from the snapshot right after the resolution
// tick (players move before mobs act inside Sim.tick), so only a sliver of
// rounding and same-tick displacement is left for the edge band.
const EDGE_YD = 0.75;
const EDGE_RAD = 0.05;
// Entities past 55 yd update at half rate or less (server/entity_update_cadence.ts),
// so the hp comparison only reads bodies inside the full-rate tier.
const FULL_RATE_YD = 50;

let pass = 0;
let fail = 0;
function check(name, cond, extra = '') {
  if (cond) {
    pass++;
    console.log(`OK   ${name}${extra ? ` (${extra})` : ''}`);
  } else {
    fail++;
    console.log(`FAIL ${name} ${extra}`);
  }
}
const info = (text) => console.log(`INFO ${text}`);

async function api(path, body, token) {
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.json().catch(() => ({})) };
}

// Heavy self fields, and the delta-elided scalars this script reads (ssd is
// the Sidestep bank, server/self_scalar_wire.ts), arrive only when they
// changed; an absent field means "same as the previous snapshot".
const DELTA_SELF_KEYS = ['inv', 'equip', 'qlog', 'qdone', 'cds', 'stats', 'party', 'ssd', 'cbt'];
function mergeSelf(prev, next) {
  if (prev) for (const k of DELTA_SELF_KEYS) if (!(k in next) && k in prev) next[k] = prev[k];
  return next;
}

// Entity identity fields ride only in "full" records; "lite" records inherit
// them. Ids in snap.keep are alive but unchanged; anything absent is gone.
const ENTITY_IDENTITY_KEYS = ['k', 'tid', 'nm', 'lv', 'sc', 'c', 'dgn'];
function mergeEnts(prevEnts, snap) {
  const next = new Map();
  for (const w of snap.ents) {
    const prev = prevEnts.get(w.id);
    if (prev && w.k === undefined) {
      for (const key of ENTITY_IDENTITY_KEYS) if (key in prev) w[key] = prev[key];
    }
    next.set(w.id, w);
  }
  for (const id of snap.keep ?? []) {
    const prev = prevEnts.get(id);
    if (prev) next.set(id, prev);
  }
  return next;
}

const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
// Facing f points along (sin f, cos f), the sim's convention.
const angleTo = (from, to) => Math.atan2(to.x - from.x, to.z - from.z);
const along = (o, f, d) => ({ x: o.x + Math.sin(f) * d, z: o.z + Math.cos(f) * d });
const normAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));

class Bot {
  constructor(spec) {
    Object.assign(this, { lagMs: 0, party: true }, spec);
    this.pid = -1;
    this.self = null;
    this.ents = new Map();
    this.tick = 0;
    this.bossId = -1;
    this.breathCasting = false;
    this.pendingBlazeStart = false;
    this.unsettled = []; // landings waiting for the post-resolution snapshot
    // What this client saw: telegraph receipts, boss hits on itself, refusals.
    this.telegraphs = [];
    this.hits = [];
    this.errors = [];
    this.dodges = [];
    this.view = new Map(); // tick -> { boss hp, [pid]: hp } from that tick's first snapshot
    this.viewLast = new Map(); // the same, from that tick's last snapshot
    this.repeatedTicks = new Set(); // ticks this client got more than one snapshot for
    this.lastInput = { key: '', at: 0 };
    this.lastCastAt = 0;
    this.deaths = 0;
  }

  async join() {
    const reg = await api('/api/register', {
      username: `peat_${this.name}_${uniq}`,
      password: 'hunter22',
      email: `peat_${this.name}_${uniq}@example.com`,
    });
    this.token = reg.body.token;
    const char = await api(
      '/api/characters',
      { name: this.name + alpha, class: this.cls },
      this.token,
    );
    this.charId = char.body.id;
    await new Promise((resolve, reject) => {
      this.ws = new WebSocket(`${WS_BASE}/ws`);
      const to = setTimeout(() => reject(new Error(`${this.name} join timeout`)), 8000);
      this.ws.on('open', () => {
        this.ws.send(JSON.stringify(worldAuthMessage(this.token, this.charId)));
      });
      this.ws.on('message', (data) => {
        const handle = () => {
          const msg = JSON.parse(String(data));
          if (msg.t === 'hello') {
            this.pid = msg.pid;
            clearTimeout(to);
            resolve();
          } else this.receive(msg);
        };
        // Simulated latency: every frame is processed lagMs late, in order.
        if (this.lagMs > 0) setTimeout(handle, this.lagMs);
        else handle();
      });
      this.ws.on('error', reject);
    });
  }

  send(frame) {
    const text = JSON.stringify(frame);
    const go = () => {
      if (this.ws.readyState === WebSocket.OPEN) this.ws.send(text);
    };
    if (this.lagMs > 0) setTimeout(go, this.lagMs);
    else go();
  }
  cmd(payload) {
    this.send({ t: 'cmd', ...payload });
  }
  chat(text) {
    this.send(chatCommandMessage(text));
  }
  // Movement is intent only (server/movement_input_timeline_v2.ts); resend on
  // a change or once a second so a held key never goes stale.
  input(mi, facing) {
    const key = `${JSON.stringify(mi)}|${facing === undefined ? '' : facing.toFixed(2)}`;
    const now = performance.now();
    if (key === this.lastInput.key && now - this.lastInput.at < 1000) return;
    this.lastInput = { key, at: now };
    this.send({ t: 'input', mi, ...(facing !== undefined ? { facing } : {}) });
  }
  sidestep(dir, kind, plannedImpactAt) {
    const boss = this.boss();
    this.dodges.push({
      kind,
      dir,
      sentAt: performance.now(),
      plannedImpactAt,
      tick: this.tick,
      bossYd: boss && this.self ? Number(dist(this.pos(), boss).toFixed(2)) : null,
    });
    this.cmd({ cmd: 'sidestep', dir });
  }

  receive(msg) {
    const at = performance.now();
    if (msg.t === 'snap') {
      if (msg.tick === this.tick) this.repeatedTicks.add(msg.tick);
      this.tick = msg.tick;
      this.self = mergeSelf(this.self, msg.self);
      this.ents = mergeEnts(this.ents, msg);
      this.ents.set(this.self.id, this.self);
      const boss = this.boss();
      if (boss) this.bossId = boss.id;
      const me = this.pos();
      const row = {};
      for (const e of this.ents.values()) {
        if (e.k !== 'player' && e.tid !== BOSS) continue;
        if (dist(e, me) <= FULL_RATE_YD) row[e.id] = e.hp;
      }
      // A loop pass that runs no tick still broadcasts under the same tick
      // number. A change made between ticks (a /dev revive) shows in the
      // player's own record at once but in other clients' copies only on the
      // next tick (the per-tick entity wire cache), so the check compares each
      // tick's first snapshot.
      if (!this.view.has(this.tick)) this.view.set(this.tick, row);
      this.viewLast.set(this.tick, row);
      for (const rec of this.unsettled) {
        rec.pos = me;
        rec.dead = !!this.self.dead;
        if (rec.kind === 'breathLand' && boss)
          Object.assign(rec, { x: boss.x, z: boss.z, f: boss.f });
      }
      this.unsettled.length = 0;
      if (boss) this.observeBossCast(boss, at);
    } else if (msg.t === 'events') {
      for (const ev of msg.list) this.onEvent(ev, at);
    }
  }

  // The Fire Breath telegraph is the boss's cast bar (the entity's `cast`).
  observeBossCast(boss, at) {
    const casting = boss.cast === BREATH_CAST && !boss.dead;
    if (casting && !this.breathCasting) {
      const rec = { kind: 'breathCast', tick: this.tick, at, x: boss.x, z: boss.z, f: boss.f };
      rec.castRem = boss.castRem;
      this.telegraphs.push(rec);
      this.breathPressed = false;
    }
    if (casting) this.onBreathBar?.(boss, at);
    this.breathCasting = casting;
  }

  onEvent(ev, at) {
    const boss = this.boss();
    const pos = this.self ? { x: this.self.x, z: this.self.z } : null;
    // A tick's events arrive just before that tick's snapshot, so an event is
    // stamped with the previous snapshot's tick (a 2 s cast reads 39, not 40).
    const base = { tick: this.tick, at, pos, dead: !!this.self?.dead };
    if (ev.type === 'log' && typeof ev.text === 'string' && ev.text.includes('Peat Blaze')) {
      this.pendingBlazeStart = true;
    } else if (ev.type === 'spellfxAt' && ev.fx === 'runeCircle' && ev.radius === STOMP_RADIUS) {
      this.telegraphs.push({ ...base, kind: 'stompRing', x: ev.x, z: ev.z });
      this.onStompRing?.(ev, at);
    } else if (ev.type === 'spellfxAt' && ev.fx === 'nova' && ev.radius === BLAZE_RADIUS) {
      const kind = this.pendingBlazeStart ? 'blazeStart' : 'blazePulse';
      this.pendingBlazeStart = false;
      const rec = { ...base, kind, x: ev.x, z: ev.z };
      this.telegraphs.push(rec);
      if (kind === 'blazePulse') this.unsettled.push(rec);
      if (kind === 'blazeStart') this.onBlazeStart?.(ev, at);
    } else if (ev.type === 'spellfx' && boss && ev.sourceId === boss.id) {
      const kind = ev.fx === 'fireCone' ? 'breathLand' : ev.fx === 'nova' ? 'stompLand' : null;
      if (kind) {
        const rec = { ...base, kind, x: boss.x, z: boss.z, f: boss.f };
        this.telegraphs.push(rec);
        this.unsettled.push(rec);
      }
    } else if (
      ev.type === 'damage' &&
      boss &&
      ev.sourceId === boss.id &&
      ev.targetId === this.pid
    ) {
      this.hits.push({ ...base, ability: ev.ability, amount: ev.amount, kind: ev.kind });
    } else if (ev.type === 'error' && ev.pid === this.pid) {
      this.errors.push({ ...base, text: ev.text });
    }
  }

  boss() {
    for (const e of this.ents.values()) if (e.tid === BOSS) return e;
    return null;
  }
  pos() {
    return { x: this.self.x, z: this.self.z };
  }
  hasAura(id) {
    return (this.self?.auras ?? []).some((a) => a.id === id);
  }
  // Walk toward goal (intent only); stop inside tol and face `faceAt`.
  moveTo(goal, tol, faceAt) {
    const p = this.pos();
    if (dist(p, goal) > tol) {
      this.input({ f: 1 }, angleTo(p, goal));
      return false;
    }
    this.input({}, faceAt ? angleTo(p, faceAt) : undefined);
    return true;
  }
}

// ---- telegraph sync and hit audit, read after the fight ----

// Every instance of `kind` any client saw, grouped across clients by tick.
function telegraphInstances(bots, kind) {
  const all = bots.flatMap((b) =>
    b.telegraphs.filter((t) => t.kind === kind).map((t) => ({ ...t, bot: b })),
  );
  all.sort((a, b) => a.tick - b.tick);
  const groups = [];
  for (const t of all) {
    const g = groups.find((x) => Math.abs(x.tick - t.tick) <= 4);
    if (g) g.seen.push(t);
    else groups.push({ tick: t.tick, seen: [t] });
  }
  return groups;
}

function syncReport(bots, kind) {
  const groups = telegraphInstances(bots, kind);
  let missing = 0;
  let maxTickSpread = 0;
  let maxPosSpread = 0;
  let maxMsSpread = 0;
  for (const g of groups) {
    const names = new Set(g.seen.map((t) => t.bot.name));
    missing += bots.filter((b) => !names.has(b.name)).length;
    const ticks = g.seen.map((t) => t.tick);
    maxTickSpread = Math.max(maxTickSpread, Math.max(...ticks) - Math.min(...ticks));
    const p0 = g.seen[0];
    for (const t of g.seen) maxPosSpread = Math.max(maxPosSpread, dist(t, p0));
    const prompt = g.seen.filter((t) => t.bot.lagMs === 0).map((t) => t.at);
    if (prompt.length > 1)
      maxMsSpread = Math.max(maxMsSpread, Math.max(...prompt) - Math.min(...prompt));
  }
  return { kind, instances: groups.length, missing, maxTickSpread, maxPosSpread, maxMsSpread };
}

// Is a body at `p` inside the area a landing resolved, by the server's own
// numbers? 'in', 'out', or 'edge' (inside the one-tick tolerance).
function classify(kind, land, p) {
  if (kind === 'breathLand') {
    const d = dist(p, land);
    const off = Math.abs(normAngle(angleTo(land, p) - land.f));
    if (d < BREATH.range - EDGE_YD && off < BREATH.halfArc - EDGE_RAD) return 'in';
    if (d > BREATH.range + EDGE_YD || off > BREATH.halfArc + EDGE_RAD) return 'out';
    return 'edge';
  }
  const r = kind === 'stompLand' ? STOMP_RADIUS : BLAZE_RADIUS;
  const d = dist(p, land);
  if (d < r - EDGE_YD) return 'in';
  if (d > r + EDGE_YD) return 'out';
  return 'edge';
}

const ABILITY_OF = {
  breathLand: 'Fire Breath',
  stompLand: 'Shuddering Stomp',
  blazePulse: 'Peat Blaze',
};

// For each landing a client saw, did the hit it got (or did not get) match
// where the server had that client's body? The stomp resolves from the ring
// center the windup stamped (locomotion.ts tickRiftMechanicWindups), so the
// center comes from the matching stompRing.
function auditLandings(b) {
  const out = [];
  const rings = b.telegraphs.filter((t) => t.kind === 'stompRing');
  for (const land of b.telegraphs) {
    const ability = ABILITY_OF[land.kind];
    if (!ability || !land.pos || land.dead) continue;
    let area = land;
    if (land.kind === 'stompLand') {
      const ring = rings.filter((r) => r.tick <= land.tick && land.tick - r.tick <= 40).at(-1);
      if (!ring) continue;
      area = ring;
    }
    const where = classify(land.kind, { ...area, f: land.f }, land.pos);
    const hit = b.hits.find((h) => h.tick === land.tick && h.ability === ability);
    out.push({ bot: b.name, kind: land.kind, tick: land.tick, where, result: hit?.kind ?? 'none' });
  }
  return out;
}

async function main() {
  const tank = new Bot({ name: 'Tankrik', cls: 'warrior', role: 'tank' });
  const pala = new Bot({ name: 'Lumen', cls: 'paladin', role: 'dodger' });
  const priest = new Bot({ name: 'Vessa', cls: 'priest', role: 'healer' });
  const mage = new Bot({ name: 'Pyrra', cls: 'mage', role: 'ranged' });
  const hunter = new Bot({ name: 'Fletch', cls: 'hunter', role: 'ranged' });
  const laggard = new Bot({
    name: 'Laggard',
    cls: 'rogue',
    role: 'dodger',
    party: false,
    lagMs: LAG_MS,
  });
  const watcher = new Bot({ name: 'Watcher', cls: 'mage', role: 'watcher', party: false });
  const bots = [tank, pala, priest, mage, hunter, laggard, watcher];
  const partyBots = bots.filter((b) => b.party);
  const dodgers = [pala, laggard];

  console.log(`joining ${bots.length} bots (Laggard at ${LAG_MS} ms each way)...`);
  for (const b of bots) await b.join();
  check(
    'seven clients joined',
    bots.every((b) => b.pid > 0),
  );

  for (const b of partyBots.slice(1)) {
    tank.cmd({ cmd: 'pinvite', id: b.pid });
    await sleep(250);
    b.cmd({ cmd: 'paccept' });
    await sleep(250);
  }
  await sleep(800);
  check(
    'party of five formed (Laggard and Watcher stay outside it)',
    tank.self?.party?.members?.length === 5,
    `members=${tank.self?.party?.members?.length}`,
  );

  // Staging 24 yd south of his hollow: outside his 13 yd aggro even when he has
  // wandered the full 9 yd from his spawn toward the row (a reused server).
  const staging = (i) => ({ x: BOSS_HOME.x - 6 + i * 2, z: BOSS_HOME.z - 24 });
  bots.forEach((b, i) => {
    b.cmd({ cmd: 'dev_level', level: LEVEL });
    const spot = b === watcher ? { x: BOSS_HOME.x + 40, z: BOSS_HOME.z } : staging(i);
    b.cmd({ cmd: 'dev_teleport', x: spot.x, z: spot.z });
  });
  priest.cmd({ cmd: 'cast', ability: 'power_word_fortitude' });
  for (const b of [pala, priest, mage, hunter])
    b.cmd({ cmd: 'dev_give', item: 'spring_water', count: 20 });
  await sleep(1500);
  check(
    `all at level ${LEVEL}`,
    bots.every((b) => b.self?.lv === LEVEL),
    JSON.stringify(bots.map((b) => b.self?.lv)),
  );
  const boss0 = tank.boss();
  check(
    'Old Peatfire is alive and in every client snapshot',
    !!boss0 && !boss0.dead && bots.every((b) => b.boss()),
  );
  if (!boss0 || boss0.dead) {
    console.log('Old Peatfire is not up (he respawns an hour after a kill): restart the server.');
    for (const b of bots) b.ws.close();
    process.exit(1);
  }
  const hp0 = bots.map((b) => b.boss()?.hp);
  check(
    'every client reads the same full boss hp',
    hp0.every((h) => h === boss0.mhp),
    JSON.stringify(hp0),
  );

  // ---- authority probes, before the pull ----
  const wPos = watcher.pos();
  // A forged damage frame and a forged command: the server owns combat.
  watcher.send({
    t: 'events',
    list: [{ type: 'damage', sourceId: watcher.pid, targetId: boss0.id, amount: 99999 }],
  });
  watcher.cmd({ cmd: 'damage', targetId: boss0.id, amount: 99999 });
  watcher.cmd({ cmd: 'kill', id: boss0.id });
  // A position claim riding the movement frame: movement is intent only.
  watcher.send({ t: 'input', mi: {}, x: boss0.x, y: boss0.y, z: boss0.z, pos: boss0 });
  // A fireball from 40 yd, past its range: the server validates range.
  watcher.cmd({ cmd: 'target', id: boss0.id });
  watcher.cmd({ cmd: 'cast', ability: 'fireball' });
  await sleep(3500);
  const bossAfterProbe = tank.boss();
  check(
    'forged damage frames, a forged kill and an out-of-range fireball leave the boss untouched',
    bossAfterProbe.hp === boss0.mhp && !bossAfterProbe.aggro,
    `hp=${bossAfterProbe.hp}/${boss0.mhp} aggro=${bossAfterProbe.aggro ?? 'none'} watcherErrors=${JSON.stringify(watcher.errors.map((e) => e.text))}`,
  );
  check(
    'a position claim on the movement frame does not move the client',
    dist(watcher.pos(), wPos) < 0.5,
    `moved ${dist(watcher.pos(), wPos).toFixed(2)} yd`,
  );
  // Two Sidesteps spend the bank; the third is refused by the server.
  for (const dir of ['back', 'forward', 'back']) {
    watcher.sidestep(dir, 'probe');
    await sleep(450);
  }
  await sleep(500);
  check(
    'the server spends two Sidestep charges and refuses the third',
    watcher.self.ssd?.[0] === 0 &&
      watcher.errors.filter((e) => e.text === 'Sidestep is not ready yet.').length === 1,
    `ssd=${JSON.stringify(watcher.self.ssd)} errors=${JSON.stringify(watcher.errors.map((e) => e.text))}`,
  );
  watcher.errors.length = 0;
  watcher.cmd({ cmd: 'dev_teleport', x: wPos.x, z: wPos.z });

  // ---- dodge reactions: what each dodger does when it SEES a telegraph ----
  for (const d of dodgers) {
    d.onStompRing = (ev, at) => {
      if (!d.self || d.self.dead || dist(d.pos(), ev) > STOMP_RADIUS - 0.5) return;
      // Sideways keeps the body inside the 8 yd ring from 4 yd out (4 then 7.2
      // yd), so only the evade window can save it: the iframe test.
      const impact = at + STOMP_WINDUP_MS;
      setTimeout(() => d.sidestep('left', 'stomp', impact), STOMP_WINDUP_MS - PRESS_LEAD_MS);
    };
    // Watch the live bar like a player: it pauses while he chases (the cast
    // only counts down in his attack state), so a timer set at cast start can
    // fire early. Press once the bar shows PRESS_LEAD_MS left, if still in the
    // cone; straight back stays inside it (4 then 10 yd of 13).
    d.onBreathBar = (boss, at) => {
      if (d.breathPressed || !d.self || d.self.dead) return;
      if ((boss.castRem ?? 2) * 1000 > PRESS_LEAD_MS) return;
      d.breathPressed = true;
      const p = d.pos();
      const off = Math.abs(normAngle(angleTo(boss, p) - boss.f));
      if (dist(p, boss) > BREATH.range || off > BREATH.halfArc) return;
      d.sidestep('back', 'breath', at + (boss.castRem ?? 0) * 1000);
    };
    d.onBlazeStart = (ev, at) => {
      d.blazeUntil = at + BLAZE_MS + 500;
      d.blazeCenter = { x: ev.x, z: ev.z };
    };
  }

  // ---- the fight ----
  console.log('pulling Old Peatfire...');
  const start = Date.now();
  let lastTelemetry = 0;
  let bossDead = false;
  let stunProbeSent = false;
  let firstStunTick = null;
  const healers = new Set([priest.pid, pala.pid]);
  const rangedSlot = new Map([
    [priest, -5],
    [mage, 0],
    [hunter, 5],
  ]);

  while (Date.now() - start < FIGHT_SEC * 1000 && !bossDead) {
    const now = performance.now();
    const boss = tank.boss();
    if (!boss || boss.dead || boss.hp <= 0) {
      bossDead = true;
      break;
    }
    if (Date.now() - lastTelemetry > 20_000) {
      lastTelemetry = Date.now();
      console.log(
        `  t=${Math.round((Date.now() - start) / 1000)}s boss=${boss.hp}/${boss.mhp} aggro=${boss.aggro ?? '-'} ` +
          bots
            .filter((b) => b !== watcher)
            .map(
              (b) =>
                `${b.name.slice(0, 4)}:${b.self?.dead ? 'DEAD' : `${b.self?.hp}/${b.self?.mhp}`}`,
            )
            .join(' '),
      );
    }
    const B = { x: boss.x, z: boss.z };
    for (const b of bots) {
      if (!b.self || b === watcher) continue;
      if (b.self.dead) {
        if (!b.deadSince) {
          b.deadSince = now;
          b.deaths++;
        } else if (now - b.deadSince > 3000) {
          b.chat('/dev revive');
          b.deadSince = now; // retry later if the revive is slow; not a new death
        }
        continue;
      }
      b.deadSince = 0;
      // Laggard is a probe, not a fighter: keep it standing between mechanics.
      if (b === laggard && b.self.hp / b.self.mhp < 0.5) b.chat('/dev heal');

      // Tank: hold the boss facing away from the ranged group. Never dodges.
      if (b === tank) {
        const goal = along(B, angleTo(B, b.pos()), 3);
        if (dist(b.pos(), B) > 4.5) b.moveTo(goal, 0.8, B);
        else b.input({}, angleTo(b.pos(), B));
        if (b.self.target !== boss.id) b.cmd({ cmd: 'target', id: boss.id });
        if (!b.self.auto) b.cmd({ cmd: 'attack' });
        if (b.hasAura('stomp_stun') && !stunProbeSent) {
          // The server must refuse a dodge from inside a stun.
          stunProbeSent = true;
          firstStunTick = b.tick;
          b.sidestep('left', 'stunProbe');
        }
        // The level 12 warrior kit (src/sim/content/classes.ts): Taunt takes
        // him back whenever he turns, Heroic Strike spends the rage.
        if ((b.self.gcd ?? 0) <= 0 && !b.self.cast && now - b.lastCastAt > 600) {
          b.lastCastAt = now;
          if (boss.aggro && boss.aggro !== tank.pid) b.cmd({ cmd: 'cast', ability: 'taunt' });
          else if ((b.self.res ?? 0) >= 15) b.cmd({ cmd: 'cast', ability: 'heroic_strike' });
        }
        continue;
      }

      // Dodgers: leave the Peat Blaze ring on foot, otherwise hold inside the
      // breath cone and the stomp ring (Lumen left of his nose, Laggard right).
      if (b.role === 'dodger') {
        if (b.blazeUntil && now < b.blazeUntil) {
          const away = along(b.blazeCenter, angleTo(b.blazeCenter, b.pos()), BLAZE_RADIUS + 4);
          b.moveTo(away, 1, B);
          continue;
        }
        const side = b === pala ? 0.26 : -0.26;
        const spot = along(B, (boss.f ?? 0) + side, 4);
        const ready = b.moveTo(spot, 0.8, B);
        if (b === pala && ready) {
          if (b.self.target !== boss.id) b.cmd({ cmd: 'target', id: boss.id });
          if (!b.self.auto) b.cmd({ cmd: 'attack' });
        }
      } else {
        // Ranged and healer: 20 yd behind him, outside every telegraph. Stand
        // still while already clear (walking would cancel the cast).
        const d = dist(b.pos(), B);
        const off = Math.abs(normAngle(angleTo(B, b.pos()) - (boss.f ?? 0)));
        if (d < 16 || d > 27 || off < Math.PI / 2) {
          const behind = along(B, (boss.f ?? 0) + Math.PI, 20);
          const spot = along(behind, (boss.f ?? 0) + Math.PI / 2, rangedSlot.get(b) ?? 0);
          b.moveTo(spot, 1.5, B);
        } else b.input({}, angleTo(b.pos(), B));
      }

      if ((b.self.gcd ?? 0) > 0 || b.self.cast || now - b.lastCastAt < 600) continue;
      // Healers top up the lowest party member first.
      if (healers.has(b.pid)) {
        const hurt = (b.self.party?.members ?? [])
          .filter((m) => !m.dead && m.hp / m.mhp < (b === priest ? 0.85 : 0.45))
          .sort((x, y) => x.hp / x.mhp - y.hp / y.mhp)[0];
        if (hurt) {
          b.lastCastAt = now;
          b.cmd({ cmd: 'target', id: hurt.pid });
          b.cmd({ cmd: 'cast', ability: b === priest ? 'lesser_heal' : 'holy_light' });
          continue;
        }
        if (b === priest && tank.self && !tank.self.dead && tank.self.hp / tank.self.mhp < 0.9) {
          b.lastCastAt = now;
          b.cmd({ cmd: 'target', id: tank.pid });
          b.cmd({ cmd: 'cast', ability: 'power_word_shield' });
          continue;
        }
      }
      if (b === priest || b === laggard) continue;
      if (b.self.target !== boss.id) b.cmd({ cmd: 'target', id: boss.id });
      if (b === hunter && !b.self.auto) b.cmd({ cmd: 'attack' });
      b.lastCastAt = now;
      if (b === mage && (b.self.res ?? 0) >= 30) b.cmd({ cmd: 'cast', ability: 'fireball' });
      if (b === hunter && (b.self.res ?? 0) >= 25) b.cmd({ cmd: 'cast', ability: 'arcane_shot' });
      if (b === pala) b.cmd({ cmd: 'cast', ability: 'hammer_of_grace' });
    }
    await sleep(100);
  }
  const elapsed = Math.round((Date.now() - start) / 1000);
  await sleep(1000);

  // ---- results ----
  console.log('\n-- the fight --');
  const endBoss = tank.boss();
  check(
    'Old Peatfire defeated by the party',
    bossDead,
    `elapsed=${elapsed}s boss=${endBoss ? `${endBoss.hp}/${endBoss.mhp}` : 'gone'} deaths=${JSON.stringify(Object.fromEntries(bots.map((b) => [b.name, b.deaths])))}`,
  );

  console.log('\n-- telegraph sync (every client in range, same tick) --');
  const kinds = ['stompRing', 'stompLand', 'breathCast', 'breathLand', 'blazeStart', 'blazePulse'];
  const sync = kinds.map((k) => syncReport(bots, k));
  for (const s of sync) {
    info(
      `${s.kind}: ${s.instances} seen, ${s.missing} client misses, tick spread ${s.maxTickSpread}, ` +
        `center spread ${s.maxPosSpread.toFixed(2)} yd, receipt spread ${s.maxMsSpread.toFixed(0)} ms (0 ms clients)`,
    );
  }
  for (const k of ['stompRing', 'breathCast', 'blazeStart']) {
    const s = sync.find((x) => x.kind === k);
    check(
      `${k} reached all seven clients on the same tick`,
      s.instances > 0 &&
        s.missing === 0 &&
        s.maxTickSpread <= (k === 'breathCast' ? 1 : 0) &&
        s.maxPosSpread < 0.5,
      `instances=${s.instances} misses=${s.missing} tickSpread=${s.maxTickSpread}`,
    );
  }

  console.log('\n-- server-authoritative hp --');
  // Every client's copy of the boss and of each player, on ticks two clients share.
  const compareViews = (viewOf) => {
    let compared = 0;
    const mismatches = [];
    for (const [tick, ref] of viewOf(tank)) {
      for (const b of bots) {
        if (b === tank) continue;
        const row = viewOf(b).get(tick);
        if (!row) continue;
        for (const [id, hp] of Object.entries(ref)) {
          if (!(id in row) || row[id] === null || hp === null) continue;
          compared++;
          if (row[id] !== hp)
            mismatches.push({ tick, viewer: b.name, id, tank: hp, other: row[id] });
        }
      }
    }
    return { compared, mismatches };
  };
  const first = compareViews((b) => b.view);
  check(
    'every client reads identical boss and player hp on every shared tick (full-rate tier)',
    first.compared > 1000 && first.mismatches.length === 0,
    `compared=${first.compared} mismatches=${first.mismatches.length} ${JSON.stringify(first.mismatches.slice(0, 5))}`,
  );
  const last = compareViews((b) => b.viewLast);
  const repeated = new Set(bots.flatMap((b) => [...b.repeatedTicks]));
  info(
    `snapshots repeating a tick number: ${repeated.size} ticks; last-snapshot hp mismatches: ${last.mismatches.length}, ${last.mismatches.filter((m) => repeated.has(m.tick)).length} of them on a repeated tick ${JSON.stringify(last.mismatches.slice(0, 3))}`,
  );
  const audits = bots.flatMap(auditLandings);
  // Every bot, dodgers included; landings inside the edge band are neither.
  const audited = audits.filter((a) => a.where !== 'edge');
  // Any damage record counts as resolved (an absorbed hit or an evade still ran).
  const wrong = audited.filter((a) => (a.where === 'in') !== (a.result !== 'none'));
  check(
    'every mechanic hit matches the server position (in the area: hit or evade; outside: nothing)',
    audited.length > 0 && wrong.length === 0,
    `landings=${audited.length} in=${audited.filter((a) => a.where === 'in').length} wrong=${JSON.stringify(wrong.slice(0, 5))}`,
  );
  const watcherHits = watcher.hits.length;
  info(
    `Watcher (outside the party, 40 yd) saw ${watcherHits} boss hits on itself; boss hits on party members are party-scoped by design (server/event_delivery.ts)`,
  );

  console.log('\n-- Sidestep online --');
  for (const d of dodgers) {
    const mine = audits.filter((a) => a.bot === d.name);
    for (const kind of ['stompLand', 'breathLand']) {
      const inside = mine.filter((a) => a.kind === kind && a.where !== 'out');
      const evaded = inside.filter((a) => a.result === 'evade').length;
      const landed = inside.filter((a) => a.result !== 'evade' && a.result !== 'none').length;
      const pressed = d.dodges.filter(
        (x) => x.kind === (kind === 'stompLand' ? 'stomp' : 'breath'),
      );
      // Pair each press with the landing it was made for. A landing later than
      // the Sidestep window came after the boss stalled the cast (he chased),
      // so it is reported, not held against the dodge.
      const paired = pressed
        .map((x) => ({
          press: x,
          land: mine.find((a) => a.kind === kind && a.tick >= x.tick && a.tick - x.tick <= 40),
        }))
        .filter((p) => p.land && p.land.where !== 'out');
      const timely = paired.filter((p) => p.land.tick - p.press.tick <= EVADE_WINDOW_TICKS);
      const missed = timely.filter((p) => p.land.result !== 'evade' && p.land.result !== 'none');
      info(
        `${d.name} (${d.lagMs * 2} ms RTT) ${ABILITY_OF[kind]}: ${inside.length} landed with the body inside, ${evaded} evaded, ${landed} hit, ${pressed.length} dodges pressed, ${paired.length - timely.length} landed after the window`,
      );
      check(
        `${d.name} (${d.lagMs * 2} ms RTT) evades every ${ABILITY_OF[kind]} it pressed Sidestep for`,
        timely.length > 0 && missed.length === 0,
        `evaded ${evaded} of ${inside.length}; ${timely.length} timely presses, missed ${JSON.stringify(missed.map((p) => ({ press: p.press.tick, land: p.land.tick, result: p.land.result })))}`,
      );
    }
    const stunned =
      d.telegraphs.some((t) => t.kind === 'stompLand') &&
      d.hits.some((h) => h.ability === 'Shuddering Stomp' && h.kind !== 'evade');
    info(`${d.name} took a stomp hit (and so a stun) at least once: ${stunned}`);
    const blaze = d.hits.filter((h) => h.ability === 'Peat Blaze');
    info(
      `${d.name} Peat Blaze damage taken after walking out: ${blaze.reduce((s, h) => s + h.amount, 0)} over ${blaze.length} pulses`,
    );
  }
  const tankStomps = tank.hits.filter((h) => h.ability === 'Shuddering Stomp');
  check(
    'the control (Tankrik, never dodges) takes Shuddering Stomp and its stun',
    tankStomps.some((h) => h.amount > 0) && firstStunTick !== null,
    `stomp hits=${tankStomps.length} firstStunTick=${firstStunTick}`,
  );
  if (stunProbeSent) {
    check(
      'the server refuses a Sidestep from inside the stomp stun',
      tank.errors.some((e) => e.text === 'You cannot sidestep right now.'),
      JSON.stringify(tank.errors.map((e) => e.text).filter((t) => /sidestep/i.test(t))),
    );
  }
  const tankBreath = tank.hits.filter((h) => h.ability === 'Fire Breath');
  const tankBlaze = tank.hits.filter((h) => h.ability === 'Peat Blaze');
  info(
    `Tankrik took Fire Breath ${tankBreath.length}x (${tankBreath.reduce((s, h) => s + h.amount, 0)}), Peat Blaze ${tankBlaze.length} pulses (${tankBlaze.map((h) => h.amount).join(',')})`,
  );

  if (REPORT) {
    const report = {
      server: BASE,
      lagMs: LAG_MS,
      level: LEVEL,
      elapsedSec: elapsed,
      bossDead,
      deaths: Object.fromEntries(bots.map((b) => [b.name, b.deaths])),
      sync,
      audits,
      dodges: Object.fromEntries(dodgers.map((d) => [d.name, d.dodges])),
      telegraphs: Object.fromEntries(bots.map((b) => [b.name, b.telegraphs])),
      hits: Object.fromEntries(bots.map((b) => [b.name, b.hits])),
      errors: Object.fromEntries(bots.map((b) => [b.name, b.errors])),
    };
    writeFileSync(REPORT, JSON.stringify(report, null, 2));
    console.log(`report written to ${REPORT}`);
  }

  for (const b of bots) b.ws.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('fatal:', err);
  process.exit(1);
});
