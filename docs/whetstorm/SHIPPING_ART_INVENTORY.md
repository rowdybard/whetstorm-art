# Shipping art inventory: recovery checkpoint

This is an inventory of tracked files, not an ownership or license verdict.
It was measured on 2026-10-27 using `git ls-files public` in the complete
Whetstorm game checkout `D:/whetstorm-deploy`, at commit
`587f70cca1ae201fc9341e81c5f065110f71d15c`. That checkout is a separate
repository from this art branch. The check does not inspect ignored or
untracked files, generated deployment output, file contents, or ownership.
Recheck the actual release tree and its build output before shipping.

The game checkout tracks 6,442 files under `public/`. Among its largest
directories are:

| Directory | Tracked files | Notes |
| --- | ---: | --- |
| `public/ui/items/` | 1,474 | 1,473 WebP files and one JSON file |
| `public/ui/skills/` | 487 | Ability art; provenance not established by this count |
| `public/ui/deeds/` | 289 | Deed art; provenance not established by this count |
| `public/ui/mobs/` | 271 | Mob art; provenance not established by this count |
| `public/ui/auras/` | 131 | Aura art; provenance not established by this count |
| `public/ui/weapons/` | 85 | Weapon UI art; provenance not established by this count |
| `public/models/dungeon/` | 440 | Models and other tracked files |
| `public/models/props/` | 224 | Models and other tracked files |
| `public/models/biome/` | 205 | Models and other tracked files |
| `public/models/resources/` | 135 | Models and other tracked files |
| `public/models/creatures/` | 126 | Models and other tracked files |
| `public/models/weapons/` | 110 | Models and other tracked files |
| `public/models/chars/` | 73 | Models and other tracked files |
| `public/textures/skins/` | 75 | Textures and other tracked files |
| `public/textures/terrain/` | 61 | Textures and other tracked files |

At art branch commit `205bc0d5ec02a34bba35d32c268cca834c156e8e`, the
separate partial checkout tracked 400 `public/` files, including 177
`public/ui/whetstorm/items/*.webp` paintings and zero
`public/ui/items/*.webp` files. This absence from the partial checkout does
not remove the inherited files from the complete game checkout. The 177
paintings consist of 17 previously mapped paintings and 160 added in this
effort. See `ITEM_ART_PROGRESS.md` and the generation manifests for details.

The two parallel item artists reached their usage limit while starting the
next batches. They had selected the following live item IDs, but did not
complete paintings for them; verify availability and existing artwork again
before starting:

- Weapons: `mistcallers_edge`, `vaels_mist_staff`, `riptide_dirk`,
  `nhalias_dirgeblade`.

The four reserved armor items were subsequently painted in
`armor-batch-fifteen-generation.json`; they are included in the later
checkpoint in `ITEM_ART_PROGRESS.md`.

Do not infer release clearance from URL routing or file counts. Reconcile the
art branch with the current game branch without overwriting concurrent work,
identify provenance for each remaining shipping asset, replace or remove
restricted assets, and inspect actual packaged output. Browser and full-gate
validation of the item paintings also remain open.
