// Paints the Action Combat crosshair: one fixed mark at the screen centre (the
// point the camera aims through), the Sidestep pips and the Brace meter under
// it, built on first show and then only ever written through the shared
// PainterHost writers, so a steady frame writes nothing. The skeleton is static markup
// with no player or server value in it. Registered in HOT_PAINTERS
// (tests/hud_perf_budget.test.ts).

import { SIDESTEP_TUNING } from '../../../sim/combat/sidestep';
import { t } from '../../i18n';
import type { PainterHostWriters } from '../../painter_host';
import {
  type ActionCrosshairInput,
  createActionCrosshairState,
  resolveActionCrosshair,
} from './crosshair_view';

export interface ActionCrosshairPainterDeps {
  writers: PainterHostWriters;
  /** The element the crosshair is appended to (the HUD root). */
  host: () => HTMLElement | null;
  /** The pending line's text. */
  hintText: () => string;
}

export class ActionCrosshairPainter {
  private root: HTMLElement | null = null;
  private hint: HTMLElement | null = null;
  private pipRow: HTMLElement | null = null;
  private pips: HTMLElement[] = [];
  private braceBar: HTMLElement | null = null;
  private readonly state = createActionCrosshairState();

  constructor(private readonly deps: ActionCrosshairPainterDeps) {}

  paint(input: ActionCrosshairInput): void {
    const s = resolveActionCrosshair(input, this.state);
    // Never built until it first shows: a player who keeps the mode off never
    // gets the node at all.
    if (!s.visible && this.root === null) return;
    const root = this.ensure();
    if (root === null || this.hint === null) return;
    const w = this.deps.writers;
    w.setDisplay(root, s.visible ? '' : 'none');
    w.toggleClass(root, 'is-reticle-hidden', !s.reticle);
    w.toggleClass(root, 'is-pending', s.pending);
    w.toggleClass(root, 'is-engaged', s.engaged);
    if (s.pending) w.setText(this.hint, this.deps.hintText());
    if (this.braceBar !== null) {
      w.setDisplay(this.braceBar, s.brace ? '' : 'none');
      if (s.brace) {
        w.toggleClass(this.braceBar, 'is-up', s.braceUp);
        w.toggleClass(this.braceBar, 'is-broken', s.braceBroken);
        w.setStyleProp(this.braceBar, '--brace-fill', String(s.braceFill));
      }
    }
    if (this.pipRow === null) return;
    w.setDisplay(this.pipRow, s.pips ? '' : 'none');
    if (!s.pips) return;
    for (let i = 0; i < this.pips.length; i++) {
      const pip = this.pips[i];
      w.toggleClass(pip, 'is-ready', i < s.ready);
      const charging = i === s.ready && s.ready < this.pips.length;
      w.toggleClass(pip, 'is-charging', charging);
      w.setStyleProp(pip, '--sidestep-fill', charging ? String(s.fill) : '0');
    }
  }

  private ensure(): HTMLElement | null {
    if (this.root !== null) return this.root;
    const host = this.deps.host();
    if (host === null) return null;
    const root = document.createElement('div');
    root.id = 'action-crosshair';
    root.innerHTML =
      '<div class="action-crosshair__reticle" aria-hidden="true"></div>' +
      '<div class="action-crosshair__hint"></div>' +
      '<div class="action-crosshair__pips" aria-hidden="true">' +
      '<span class="action-crosshair__pip"></span>'.repeat(SIDESTEP_TUNING.maxCharges) +
      '</div>' +
      '<div class="action-crosshair__brace" aria-hidden="true">' +
      '<span class="action-crosshair__brace-fill"></span></div>';
    host.appendChild(root);
    this.root = root;
    this.hint = root.querySelector<HTMLElement>('.action-crosshair__hint');
    this.pipRow = root.querySelector<HTMLElement>('.action-crosshair__pips');
    this.braceBar = root.querySelector<HTMLElement>('.action-crosshair__brace');
    this.pips = Array.from(root.querySelectorAll<HTMLElement>('.action-crosshair__pip'));
    return root;
  }
}

/** The crosshair the Hud composes, on the shared writers and the HUD root. */
export function mountActionCrosshair(writers: PainterHostWriters): ActionCrosshairPainter {
  return new ActionCrosshairPainter({
    writers,
    host: () => document.getElementById('ui'),
    hintText: () => t('hudChrome.actionCombat.clickToAim'),
  });
}
