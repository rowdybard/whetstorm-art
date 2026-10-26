// Whetstorm ships with no crypto, wallet, or real-money store. The upstream
// commerce features (the $WOC wallet link and holder flair, Daily Rewards, and
// the Claudium store) stay in the tree but are switched off here until they are
// removed or rebuilt. A build opts back in with VITE_COMMERCE_ENABLED=1.

// The index signature keeps this from being a weak type, so Vite's ImportMetaEnv
// (which only declares VITE_* keys through its own index signature) stays assignable.
export interface CommerceEnv {
  readonly [key: string]: unknown;
  readonly VITE_COMMERCE_ENABLED?: string;
}

/** True only when the build explicitly opts into the upstream commerce features. */
export function commerceEnabled(env: CommerceEnv = import.meta.env): boolean {
  return String(env.VITE_COMMERCE_ENABLED ?? '').trim() === '1';
}
