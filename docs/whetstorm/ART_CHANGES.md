# Whetstorm launch art pack, 2026-10-26

This pack contains 20 original PNG paintings from the owner's art priority brief.
All were generated through OpenAI's built-in image tool. No third-party image
inputs were used. The frame had one edit using its own original first output.
Square masters are 1024x1024. Landscapes are 1672x941. The frame is 1024x1536 RGBA.

## PNG files in this ZIP

| Path | Subject |
| --- | --- |
| public/website-hero-arena.png | Sandstone island arena at sunrise |
| public/website-hero-road.png | Coastal road, cattle ford, hot pools and lookout |
| public/website-hero-smokewatch.png | Cliff lookout, lightning sword and distant peat smoke |
| public/website-hero-peatfire.png | Peatfire rising from the bog opposite three heroes |
| public/website-portal-frame.png | Iron, bronze and whetstone login frame with alpha |
| public/ui/classes/bulwark.png | Shield and crossed spear |
| public/ui/classes/brute.png | Great axe embedded in cracked rock |
| public/ui/classes/whirlblade.png | Crossed curved blades and wind |
| public/ui/classes/ranger.png | Longbow, arrow and feather |
| public/ui/classes/skybinder.png | Crystal-cage staff and lightning |
| public/ui/classes/cleric.png | Sun-headed mace and hanging lantern |
| public/ui/classes/warden.png | Rune cairn and root-bound staff |
| public/ui/skills/bulwark/bulwark_spear_thrust.png | Spear stabbing above a shield rim |
| public/ui/skills/bulwark/bulwark_shield_sweep.png | Angled shield and broad sweep arc |
| public/ui/skills/bulwark/bulwark_challenge.png | Shield impact and ringing amber waves |
| public/ui/skills/bulwark/bulwark_javelin.png | Whole thrown javelin and wind trails |
| public/ui/skills/bulwark/bulwark_shield_rush.png | Forward shield and trailing dust |
| public/ui/skills/bulwark/bulwark_release.png | Shield at the center of a blue shockwave |
| public/ui/skills/bulwark/bulwark_breakwater.png | Planted shield splitting two fire streams |
| public/ui/skills/bulwark/bulwark_unbroken.png | Cracked shield bound by gold/blue light |

## Runtime and integration

The art branch includes WebP copies: landscapes below 481 KB each, class emblems
at 256px, and skills at 128px below 9 KB each. The title scenes, eleven-choice
loading catalog, weekly-track headers and wiki hero now use the new landscapes.
The rejected earlier valley is removed. The frame uses nine-slice
400/280/320/280 without center fill; the larger actual bottom slice excludes
inner-edge artwork. It is decorative, behind controls, and never takes input.

The seven class paintings are available through `launchClassIconUrl` in
`src/ui/launch_art.ts`. Existing simulation class IDs and the current nine-class
picker are unchanged. Claude's new roster must consume that explicit art seam.
The eight Bulwark IDs in the table resolve to painted art through the existing
ability/aura image URL APIs. They do not create or balance abilities. Existing
synchronous Canvas/worker fallbacks retain their procedural contract.

Skill PNGs in this ZIP are source masters. In the art Git branch they live under
`docs/design/whetstorm-art/skills/bulwark/`, with only WebPs under public/ui/skills
to preserve the repository's WebP-only shipping rule. Do not leave source PNGs
in that shipping folder when integrating this ZIP into the full game.

Prompts, source hashes and processing live in title-art-generation.json and
launch-art-generation.json. accepted-launch-art.json pins all 20 source and
delivery images. It records technical intake, not owner style approval.

## Remaining work

The other six launch skill kits wait for their approved ability briefs, as the
owner document specifies. Essential HUD motifs and pointers are next, followed
by Peatfire's model concept, nine starter weapon concepts, arena pieces, starter
gear and class bodies in the brief's order. Legacy skills, Deeds, store and
Claudium artwork are not newly commissioned by this pack.

Before release, remove retired upstream binaries from the full checkout even
if no runtime path requests them. Focused guards reject the old title/loading
and navigation paintings. No complete asset licence clearance is claimed.
Full-game gate, desktop/mobile browser review and live deployment are not
completed by this art pack. No live deployment was changed.
