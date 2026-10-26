# Whetstorm art and UI workspace

This is the private collaboration workspace requested by the owner. It starts
with the supplied Whetstorm source snapshot, declared revision `64dcb3e84`.
Read this file before following the older repository routing in `CLAUDE.md`.

## Repository routing

- The private collaboration repository is
  [rowdybard/whetstorm-art](https://github.com/rowdybard/whetstorm-art).
- The owner's existing game repository remains `rowdybard/whetstorm`.
- Work on art and UI feature branches here. Push recoverable checkpoints and
  open reviewable pull requests against this repository's `main`.
- Moving reviewed changes into the game repository is a separate owner-approved
  integration step. Never push directly to its `main`.
- Keep this repository private. Do not publish its source, assets or a website.
- Never write to `levy-street/world-of-claudecraft`, invoke its release tooling,
  or turn on commerce, analytics or upstream account links.
- Inherited `.github/workflows` must remain disabled on GitHub. They refer to
  upstream infrastructure. Disable Actions before the first push.

## Read next

1. `AGENTS.md` and `CLAUDE.md` for the architecture and invariants.
2. `docs/whetstorm/HANDOFF.md` for the current game state and integration seams.
3. `docs/whetstorm/ROADMAP.md` for the existing backlog.
4. `CREDITS.md` for the asset provenance register.
5. The relevant directory's `CLAUDE.md` before reading or changing its files.

The routing above is the owner's instruction for this new collaboration
repository. The existing game code, inherited documentation and license notices
are preserved from the snapshot.

## Current art and UI brief

- Classic TERA atmosphere: lush, vibrant fantasy colors with original designs.
- Minimal, legible interface art and clearly differentiated silhouettes.
- Start with login, character creation, HUD and action bars.
- Replace spell and item icons with original artwork.
- Keep combat behavior, keybinds, cooldown feedback, targeting and accessibility
  intact. Preserve the deterministic sim and `IWorld` boundary.
- 3D asset replacement comes later. Do not spend generation credits on it now.

The owner supplied these seven launch class identities for the art direction:

| Class | Role |
| --- | --- |
| Cleric | Healer who keeps the group alive |
| Ranger | Ranged bow user |
| Brute | Heavy two-handed melee damage |
| Bulwark | Shield-and-spear tank, frontal blocks and boss control |
| Stormcaller | Lightning and wind area spells |
| Bladedancer | Fast dual blades, dodges and chained combos |
| Warden | Support totems and wards, group buffs and enemy slows |

This is an art brief, not an instruction to silently rename existing sim class
IDs or change their abilities. Confirm the current class implementation before
integrating the launch roster into gameplay.

## Snapshot limitations

`ZIP_README.md` documents the omitted media, tests, non-English translations,
generated artifacts and large data files. This is not a complete runnable game
checkout. Do not infer build or gameplay success from this import.

The completed Astra art audit is not included in this snapshot. The included
handoff and `CREDITS.md` are references, not a substitute for claiming that the
completed audit was read. Bring that audit into this repository when supplied.

`SOURCE_SNAPSHOT.json` records the archive checksum, the declared original
revision, the new import commit and a checksum for every imported file. The new
Git history begins at the supplied snapshot; it does not contain the private
game repository's earlier history.

## Checkpoint contract

- Update `COLLABORATION_STATE.md` with what is implemented, what is verified,
  the exact commands and results, and the next step.
- Commit and push each meaningful milestone to its feature branch before
  pausing. A local file or a chat status message is not a recoverable checkpoint.
- Keep overlapping files under one implementation owner. Use at most three
  agents at once, including the orchestrator.
- Report running, blocked and completed work accurately. Do not claim background
  work is running after an agent or process has stopped.
- Run the relevant checks in the complete game checkout before integration.
  Record missing inputs and failed checks plainly. Never label unrun checks green.
