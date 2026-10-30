# Duskwhisper and Courtier's Bonefang held-model substitution

Both items now use `models/weapons/adv_dagger.glb`, the existing KayKit dagger
credited to Kay Lousberg under CC0 1.0 in `CREDITS.md`:
https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0.
The full checkout's optimized GLB has SHA-256
`f47338d7cdd9645e419c96d7eb224d5aaa711258b5837bf250a94d78a8e8d7d5`.
The replacement uses the same `VAR_DAGGER` family and default fit as other
items already mapped to `adv_dagger`. The old `purple_dagger` has its own
scale and position override; this is not applied to the different replacement.

The existing Duskwhisper painting shows a dark curved blade with a violet gem;
Courtier's Bonefang shows a pale curved blade with a violet grip. Both remain
unchanged, and neither painting is an exact depiction of the shared KayKit
model. The substitute loses the old model's violet-themed visual identity.
No item or combat data changed.

The restricted `purple_dagger.glb` remains on disk and is not cleared for
release by this mapping change. Verify the replacement on the live rig and in
browser, in both hands, during combat and in stowed poses; screenshots and
visual fit have not been checked in this partial checkout.
