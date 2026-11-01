# Legacy specialization emblem disposition

Scope: the 21 permission-required v0.36 specialization WebPs for seven classes. Source-tree checks used art worktree HEAD `22052a2e4d83d9188c1fabe132c68e0358e6460d` and full reference checkout `D:/action-mmo` HEAD `20807967fcd145c348499e88205eb1357ebf6c67`; concurrent work may advance either. This is a disposition proposal, not proof of release package contents or a permission grant.

`CREDITS.md`, row “v0.36 generated specialization emblems,” identifies these seven classes' three WebPs apiece as project-generated, project asset, rights reserved, **No, permission required**. Its linked `docs/achievements/placeholder-art-completion-2026-08-09/` lineage retains prompts, references and hashes. Preserve historical credit and lineage if old binaries are excluded. The three Mage and three Warrior legacy WebPs are explicitly outside that credit's generated-art scope; their exact rights are unclassified here and they are not part of this 21-file disposition.

Each identity below maps an exact old file `public/ui/specs/<class>/<spec>.webp` to an existing original replacement `public/ui/whetstorm/specs/<class>/<spec>.svg`:

| Class | Exact specification IDs |
| --- | --- |
| `paladin` | `holy`, `protection`, `retribution` |
| `hunter` | `beast_mastery`, `marksmanship`, `survival` |
| `rogue` | `assassination`, `combat`, `subtlety` |
| `priest` | `discipline`, `holy`, `shadow` |
| `shaman` | `elemental`, `enhancement`, `restoration` |
| `warlock` | `affliction`, `demonology`, `destruction` |
| `druid` | `balance`, `feral`, `restoration` |

For example, `paladin/holy` means the old `public/ui/specs/paladin/holy.webp` and replacement `public/ui/whetstorm/specs/paladin/holy.svg`; the same literal path substitution applies to every row. All 21 old paths exist in the reference checkout and are absent from the partial art worktree; all 21 replacement SVGs exist in the art worktree. `docs/whetstorm/ART.md` and `public/ui/whetstorm/mapping.json` identify the Whetstorm specs as original native SVG art; the mapping does not include per-icon hashes or detailed lineage. Neither checkout's source presence proves actual package contents or visual suitability.

The art branch's `src/ui/spec_icon_art.ts` closed class-qualified registry resolves these identities to `/ui/whetstorm/specs/<class>/<spec>.svg`. Consumers include character progression (`character_progression_view.ts`), meter icons (`meters.ts`), talent icon references (`talent_icons.ts`, used by `talents_window.ts`) and the class guide (`src/guide/class_view.ts`). The full reference checkout's selector instead returns `/ui/specs/<class>/<spec>.webp`; the reference has not thereby acquired the art-branch route.

On 2026-11-01, the focused art-checkout registry test passed (2 tests):

```powershell
node node_modules/vitest/vitest.mjs run --config bags_fish_temp.config.ts tests/whetstorm_spec_replacement_art.test.ts --maxWorkers=1
```

It checks the 21 routes and SVG files, unknown IDs, and the six other routes;
it does not establish licensing or in-game rendering. The local config is
untracked and is not a release gate.

Before excluding these old binaries from a full release candidate:

1. Integrate the original SVGs and selector into the full candidate, and audit direct `/ui/specs/` consumers and build references rather than assuming every surface uses the selector. Preserve the historical credits and records.
2. Reconcile the full reference's legacy path expectations in `tests/spec_icons.test.ts`, `tests/placeholder_art_completion.test.ts`, `tests/talent_icons_v2.test.ts`, `tests/character_progression_view.test.ts` and `tests/meters_customization.test.ts`. Run the candidate's spec/talent, character progression, meter and guide tests, including `tests/guide_class_view.test.ts`, plus the required repository gate. Add decisive coverage for all 21 exact URLs and file existence if absent. Check unknown IDs and fallback behavior.
3. Inspect the built output and package, including Vite public-copy behavior, for old paths and bytes. Verify specialization emblems in progression, talent, meter and guide views at desktop and mobile sizes, including SVG load failure behavior. Treat the six Mage/Warrior WebPs as a separate unresolved rights audit; do not delete them under this ledger.
