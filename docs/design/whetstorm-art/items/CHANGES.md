# Starter item artwork

Original square item paintings, derived from the matching original Whetstorm
weapon concepts. Each source PNG, prompt and reference hash is recorded in
`docs/whetstorm/starter-item-art-generation.json`. These are unassigned artwork
for the new launch-class inventory: final item IDs and runtime wiring await the
class implementation. They are not a claim that inherited item art is removed.

- `bulwark-spear.png`: starter spear.
- `bulwark-shield.png`: starter shield.
- `brute-great-axe.png`: starter great axe.
- `whirlblade-short-sword.png`: starter curved blade.
- `ranger-longbow.png`: starter bow.
- `skybinder-staff.png`: caged-crystal staff.
- `cleric-mace.png`: sun-headed mace.
- `cleric-lantern.png`: unlit lantern.
- `warden-staff.png`: root-bound stone staff.

The two staff paintings were revised after checking the first versions at
32 pixels. Earlier versions are retained under `source-versions/`; their full
provenance is in the generation record. A 32/48/64 pixel contact sheet is at
`docs/screenshots/whetstorm-starter-items/item-sizes.png`. In-game testing
remains necessary after item mappings and runtime sizing are implemented.

- `baked_bread.png`: cottage loaf for the existing `baked_bread` item.
- `spring_water.png`: bottle for the existing `spring_water` item.

The two starter rations now resolve through `starterItemImageUrl` and the
existing item icon API. Their 128px WebPs and source hashes are recorded in the
generation record. The remaining weapon paintings still await launch IDs.
