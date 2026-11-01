# Legacy pet skill art disposition

Scope: eight pet action-bar icons. This is a source-tree integration ledger, not proof of a release package or permission grant. Checked art worktree at `57bc3efc060b9d4b55a2a1225a77c62fd731f1aa` and reference checkout `D:/action-mmo` at `20807967fcd145c348499e88205eb1357ebf6c67` on 2026-11-01; other concurrent changes may advance either checkout.

`CREDITS.md` row “Shared pet action-bar command icons” identifies `public/ui/skills/pet/*.webp` as project assets, rights reserved, **No, permission required**. The historical `public/ui/skills/pet/mapping.json` identifies the eight assets and records their original source references; retain that mapping, historical lineage and credit even when distributing replacements. The proposed disposition for the old binaries is exclusion from a Whetstorm release after the checks below, not deletion from this checkout.

| Action identity | Restricted reference-checkout file | Original art-branch replacement |
| --- | --- | --- |
| `pet_aggressive` | `public/ui/skills/pet/pet_aggressive.webp` | `public/ui/whetstorm/abilities/pet_aggressive.webp` |
| `pet_attack` | `public/ui/skills/pet/pet_attack.webp` | `public/ui/whetstorm/abilities/pet_attack.webp` |
| `pet_defensive` | `public/ui/skills/pet/pet_defensive.webp` | `public/ui/whetstorm/abilities/pet_defensive.webp` |
| `pet_feed` | `public/ui/skills/pet/pet_feed.webp` | `public/ui/whetstorm/abilities/pet_feed.webp` |
| `pet_growl` | `public/ui/skills/pet/pet_growl.webp` | `public/ui/whetstorm/abilities/pet_growl.webp` |
| `pet_mend` | `public/ui/skills/pet/pet_mend.webp` | `public/ui/whetstorm/abilities/pet_mend.webp` |
| `pet_passive` | `public/ui/skills/pet/pet_passive.webp` | `public/ui/whetstorm/abilities/pet_passive.webp` |
| `pet_water_jet` | `public/ui/skills/pet/pet_water_jet.webp` | `public/ui/whetstorm/abilities/pet_water_jet.webp` |

All eight old files exist in the reference checkout and are absent from this partial art worktree; all eight replacement files exist in the art worktree. Presence or absence in either source checkout does not establish downstream package contents. Original prompts and source/output hashes are recorded in `docs/design/whetstorm-art/skills/pet-commands/provenance.json`, `pet-stances/provenance.json`, and `pet-specials/provenance.json`.

`src/ui/pet_action_icons.ts` maps the live command keys to these identities; `src/ui/hud.ts` passes pet-bar icons through `iconDataUrl('ability', iconId)`. In the art branch, `src/ui/icons.ts` routes ability and aura identities through `whetstormPetCommandImageUrl` in `src/ui/whetstorm_pet_command_art.ts`, which returns the replacements above. The reference checkout instead explicitly routes these IDs to `/ui/skills/pet/<id>.webp` in its `abilityImageUrl`; the reference checkout has not thereby acquired the art-branch routing.

On 2026-11-01 the three candidate tests named below passed in the partial art
checkout (3 files, 6 tests):

```powershell
node node_modules/vitest/vitest.mjs run --config bags_fish_temp.config.ts tests/whetstorm_pet_command_candidate.test.ts tests/whetstorm_pet_stances_candidate.test.ts tests/whetstorm_pet_specials_candidate.test.ts --maxWorkers=1
```

The local config is untracked and is not a release gate; rerun with the
complete candidate's normal configuration after integration.

Before excluding old files from a full release candidate:

1. Integrate the mapping, replacement binaries and relevant routing into the full candidate. Audit all direct references to `/ui/skills/pet/`, `PET_ACTION_IMAGE_IDS`, and these eight IDs, including pet bar, aura and any other image consumers; retain a working fallback and do not infer safety from this partial checkout.
2. Run `tests/whetstorm_pet_command_candidate.test.ts`, `tests/whetstorm_pet_stances_candidate.test.ts`, `tests/whetstorm_pet_specials_candidate.test.ts` and the full candidate's pet-action tests, then the repository-required integration gate. Verify both `abilityImageUrl` and `iconDataUrl` and all replacement files in the actual build.
3. Inspect the full build/package and any public-copy/static serving step for the eight old paths and bytes. Verify actual pet-bar rendering and failure fallback in the integrated application before disposition. Preserve credits and provenance; source-tree checks are not a package audit.
