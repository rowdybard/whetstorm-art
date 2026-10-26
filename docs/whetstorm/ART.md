# Whetstorm original UI art

Implemented in feature/original-ui-and-icons.

## Visual language

Fixed-dark evergreen surfaces, pale-gold hairlines and ivory text accompany a
four original island paintings. The playable scene stays visible: existing frame positions,
bar dimensions, action slots and mobile control layouts are preserved. Jewel
school colors distinguish magic; quality, range, cooldown and proc feedback
continue through their existing semantic UI states.

The original project mark is an open diamond around a sharpening lightning form.
Primary destination art uses solid readable subjects on enamel fields. Small
secondary controls retain the existing source-code glyph system.

## Shipping sources

- `public/website-hero-{arena,road,smokewatch,peatfire}.png`: four original
  title/loading paintings following the owner's 2026-10-26 brief, with WebP
  delivery copies. The earlier valley landscape was rejected and removed.
- `public/website-portal-frame.png`: original RGBA frame. Runtime nine-slice
  uses 400/280/320/280 without center fill, preserving live HTML controls.
- `src/ui/original_icon_art.ts`: editable polygon source shared by SVG and
  synchronous/worker Canvas rendering; recipe metadata supplies subject, school
  and placement. No inherited spell or item bitmap is read by these paths.
- `public/ui/whetstorm/mapping.json`: the original static artwork catalog.
- `public/ui/whetstorm/classes`: nine compatibility marks for the current game
  classes plus separate art for Cleric, Ranger, Brute, Bulwark, Stormcaller,
  Bladedancer and Warden. This does not rename or implement gameplay classes.
- `public/ui/whetstorm/chrome`, `specs`, `currency`, `status`: original HUD art.

## Integration boundary

This art pass changes presentation, not simulation, combat, item or ability IDs,
wire protocols, auth behavior, or player data. Existing CSS layers and themeable
window presets remain. New fixed-dark entry controls use 16px inputs, visible
focus and touch target floors. The old provenance records remain historical;
this document is not a claim that all other game assets are cleared for release.

The source snapshot omits the full game's tests, generated artifacts and media.
Focused implementation checks do not replace the full-checkout merge gate or a
real-browser desktop/mobile review. No production deploy is included.

## Owner priority update, 2026-10-26

The attached brief is preserved as `OWNER_ART_BRIEF.txt`. It supersedes the
earlier broad replacement order: title/loading and frame, seven launch emblems,
Bulwark's eight skills, the other six kits, essential HUD art, Old Peatfire,
weapons, arena pieces, starting gear, then class bodies. The current launch art
names are Bulwark, Brute, Whirlblade, Ranger, Skybinder, Cleric and Warden.
These names do not silently migrate the existing simulation's class IDs.
Do not spend new illustration effort on the retired nine-class skills, generated
target portraits, terrain maps or licensed free-pack scenery. Store and Claudium
art is a removal task, not a new art commission. Remaining items and Deeds are
later release work in encounter order, not part of the immediate milestone.
