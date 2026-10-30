# Thornpeak Wardblade held-model substitution

The `thornpeak_wardblade` held model now uses the existing
`public/models/weapons/adv_sword_1handed.glb`, including any generated heroic
copy resolved through `heroicOf`. Its source geometry and texture were traced
in the asset audit to Kay Lousberg's [KayKit Character Pack Adventures](https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0),
licensed CC0 1.0, also recorded in `CREDITS.md`. The prior `purple_sword` is a
restricted legacy prototype; this mapping change does not remove that file.

Both models use the `VAR_SWORD` grip family and neither has a per-key grip
override. The replacement shares a model with other swords and loses the old
purple sword's distinctive visual identity. The item painting remains separate.
An active compatible weapon skin can still override the held model.

Live browser review remains required before visual acceptance: check drawn and
stowed grip, scale and orientation, both hands and heroic copies, and upgrade
VFX including the +15 glow and lightning. Capture before and after screenshots.
