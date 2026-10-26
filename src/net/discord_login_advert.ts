// Whether the login server has Discord sign-in configured (Whetstorm C1).
//
// "Continue with Discord" and the two Discord menu entries need a Discord app of
// our own. The server's public /api/status document carries the advert
// (`discord.enabled`, from server/discord_configured.ts), so a server with no
// Discord client shows no dead button. The read is kept per realm base once it
// succeeds (kept until reload: a server's Discord config is read at boot). A
// read that fails in a way a retry can fix (no answer, a timeout, a server
// error) is retried on a backoff, because the first reads run while the page is
// busy (module load, then the world build) and a busy main thread can outlast
// the timeout. A new caller during a backoff wait (the login panel showing, the
// HUD mounting) ends the wait and restarts the schedule, so it never waits out
// an old caller's backoff. Once the attempts are spent, or on a definitive
// failure (a 4xx, a body that is not JSON), the read is not kept, so the next
// call asks again. Every failure reads as "not configured": the buttons stay
// hidden (fails closed).

import { apiUrl } from '../client_origin';

/** Ends a read's backoff wait early; null while no wait is running. */
interface Waker {
  wake: (() => void) | null;
}

/** One read of one base: its promise, plus the waker for its backoff waits. */
interface AdvertRead {
  readonly advert: Promise<boolean>;
  readonly waker: Waker;
}

const reads = new Map<string, AdvertRead>();

/** The waits between attempts after a failure a retry can fix. */
const RETRY_DELAYS_MS: readonly number[] = [2000, 5000, 10000];

/** Resolves true only when `base`'s /api/status says Discord sign-in is configured. */
export function discordLoginAdvert(
  base = '',
  fetchImpl: typeof fetch = fetch,
  retryDelaysMs: readonly number[] = RETRY_DELAYS_MS,
): Promise<boolean> {
  const kept = reads.get(base);
  if (kept !== undefined) {
    kept.waker.wake?.();
    return kept.advert;
  }
  const waker: Waker = { wake: null };
  const read: AdvertRead = {
    waker,
    advert: readWithRetries(base, fetchImpl, retryDelaysMs, waker).then((enabled) => {
      if (enabled === null && reads.get(base) === read) reads.delete(base);
      return enabled === true;
    }),
  };
  reads.set(base, read);
  return read.advert;
}

/** How one attempt ended: the advert, or a failure a retry can or cannot fix. */
type Attempt = boolean | 'retry' | 'fail';

/** The first good read, or null once the attempts are spent or a failure is definitive. */
async function readWithRetries(
  base: string,
  fetchImpl: typeof fetch,
  retryDelaysMs: readonly number[],
  waker: Waker,
): Promise<boolean | null> {
  for (let attempt = 0; ; attempt++) {
    const result = await readAdvert(base, fetchImpl);
    if (typeof result === 'boolean') return result;
    if (result === 'fail' || attempt >= retryDelaysMs.length) return null;
    if (await sleepUnlessWoken(waker, retryDelaysMs[attempt])) attempt = -1;
  }
}

/** Waits `ms`, or less if a new caller wakes the read; resolves true when woken. */
function sleepUnlessWoken(waker: Waker, ms: number): Promise<boolean> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      waker.wake = null;
      resolve(false);
    }, ms);
    waker.wake = () => {
      clearTimeout(timer);
      waker.wake = null;
      resolve(true);
    };
  });
}

/** Statuses a retry can fix besides any 5xx: a request timeout and rate limiting. */
const RETRYABLE_STATUS = new Set([408, 429]);

async function readAdvert(base: string, fetchImpl: typeof fetch): Promise<Attempt> {
  let res: Response;
  try {
    res = await fetchImpl(apiUrl('/api/status', base), { signal: AbortSignal.timeout(3000) });
  } catch {
    return 'retry'; // no answer: offline, refused, or timed out
  }
  if (!res.ok) return res.status >= 500 || RETRYABLE_STATUS.has(res.status) ? 'retry' : 'fail';
  try {
    const doc = (await res.json()) as { discord?: { enabled?: unknown } } | null;
    return doc?.discord?.enabled === true;
  } catch (err) {
    // A body that is not JSON (a static host's HTML fallback) will not change on a
    // retry; a read cut off mid body (the timeout on a busy page) can.
    return err instanceof SyntaxError ? 'fail' : 'retry';
  }
}

/** "Continue with Discord", its "or use email" divider and the two Discord menu entries. */
const DISCORD_ENTRY_IDS = ['btn-login-discord', 'auth-or-divider', 'mobile-discord', 'mm-discord'];

/**
 * Unhides every Discord affordance present in `doc` once `base` adverts a configured
 * Discord app. Safe to call on every showing of the login panel: a kept good read
 * costs no request, a read waiting to retry tries again now, and a failed one is
 * asked again.
 */
export function revealDiscordEntries(base: string, doc: Document = document): void {
  const els = DISCORD_ENTRY_IDS.map((id) => doc.getElementById(id));
  revealIfDiscordConfigured(els, discordLoginAdvert(base));
}

/** Unhides each element once `advert` resolves true; otherwise leaves them as they are. */
export function revealIfDiscordConfigured(
  els: readonly (HTMLElement | null)[],
  advert: Promise<boolean>,
): void {
  void advert.then((enabled) => {
    if (!enabled) return;
    for (const el of els) if (el) el.hidden = false;
  });
}

/** Test seam: forget every kept advert. */
export function resetDiscordLoginAdvertsForTest(): void {
  reads.clear();
}
