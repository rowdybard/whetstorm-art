# Emberward held shield replacement

The equipped Varkhul Emberward now resolves to the existing KayKit round shield.
The independent inventory painting remains in `src/ui/choir_grave_ignivar_item_art.ts`.
The replacement is a generic round shield and does not match that painting or the
former legendary silhouette. Its existing KayKit grip is reused; grip, stowing,
and animated poses still need visual checks in game, including clipping across
character rigs. No visual verification is claimed here.

`CREDITS.md` identifies the KayKit Adventures character pack and weapons as CC0
and `third_party/licenses/kaykit-cc0.txt` retains the notice. The source path for
this shield is recorded in `scripts/assets/specs/characters.json`. The prior audit
found the old embedded atlas byte-identical to the official KayKit source after
the documented resize; the current KTX2 is a subsequent documented conversion, but
its compressed bytes were not independently reproduced. This is provenance
evidence with that limit, not a claim of a byte-identical current texture.

This change removes the restricted model from the live offhand mapping and its
authored-material opt-in. It does not remove the GLB or all references to it:
`scripts/render_varkhul_drop_icons.mjs`, `public/ui/items/mapping.json`, grip
metadata and potentially other historical or asset records remain. A full-tree
asset removal and verification must cover those references, the shipped GLB and
any generated manifests and historical icon assets before claiming removal.
