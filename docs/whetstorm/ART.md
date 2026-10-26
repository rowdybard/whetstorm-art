# Whetstorm original UI art

Implemented in feature/original-ui-and-icons.

## Visual language

Fixed-dark evergreen surfaces, pale-gold hairlines and ivory text accompany a
lush painted valley. The playable scene stays visible: existing frame positions,
bar dimensions, action slots and mobile control layouts are preserved. Jewel
school colors distinguish magic; quality, range, cooldown and proc feedback
continue through their existing semantic UI states.

The original project mark is an open diamond around a sharpening lightning form.
Primary destination art uses solid readable subjects on enamel fields. Small
secondary controls retain the existing source-code glyph system.

## Shipping sources

- `public/ui/whetstorm/entry-landscape.webp`: original generated landscape,
  optimized to 407 KB. No input images or external art were used.
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
