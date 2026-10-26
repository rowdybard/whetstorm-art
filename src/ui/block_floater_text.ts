// The floating text a landed block shows, for both block kinds the damage
// event carries. A classic shield block still deals reduced damage, so it
// floats the amount ("-120 Block"). A Brace block (Whetstorm W4, the event's
// `braced` flag) stopped the hit outright, so it floats the one word "Braced"
// instead of a "-0 Block" that would read as a classic block that rolled
// well. Both keep the block colour and the block sound (fct_event.ts and the
// combat SFX key off the event's kind).

import { blockFctAmountText } from './fct_core';
import { t } from './i18n';

/** The FCT text for a landed block; `taken` is the player's own side. */
export function blockFloaterText(
  ev: { amount: number; crit: boolean; braced?: true },
  taken: boolean,
): string {
  if (ev.braced) return t('hudChrome.brace.floating');
  return t('hud.combat.floatingBlock', { amount: blockFctAmountText(ev.amount, ev.crit, taken) });
}
