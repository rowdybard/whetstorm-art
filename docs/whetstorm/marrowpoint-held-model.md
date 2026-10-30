# Marrowpoint held-model substitution

Marrowpoint now resolves to `models/weapons/adv_dagger.glb` for both hands,
reusing the dagger model and `VAR_DAGGER` grip already used by other items.
The KayKit Character Pack Adventures weapon is credited to Kay Lousberg under
CC0 1.0 in `CREDITS.md`: https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0.
The shipped optimized GLB in the full checkout has SHA-256
`f47338d7cdd9645e419c96d7eb224d5aaa711258b5837bf250a94d78a8e8d7d5`.
Its source geometry and decoded texture were compared with the KayKit source;
the shipped texture uses KTX2. This substitution changes no item or combat data.

The old `redskull_dagger.glb` is not removed by this change. This mapping alone
is not a release clearance for that file or other restricted assets. Verify the
replacement on the live rig in both hands, including combat and stowed poses,
before treating the visual fit as complete.
