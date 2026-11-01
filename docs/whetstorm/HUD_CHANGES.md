# Whetstorm essential HUD art, 2026-10-26

## Source-lineage follow-up

The recorded HUD masters and runtime files are present, and the generation
record pins their hashes. The raw generator paths in that record point to a
scratch environment unavailable in this checkout. For example, the bags
image's recorded raw hash differs from its retained master hash, and the
record does not describe that raw-to-master transformation. This difference
could reflect encoding or metadata and does not establish a visual change or
license defect. Retain the existing records and locate the original raw files
or preparation log before claiming that transformation was independently
verified. The same documentation pattern appears across the HUD batch.


20 original PNG masters: eight buttons, six quest/service markers, three coins and three pointers.
Made with OpenAI built-in image generation from text only, with no reference images.

## Files in this ZIP

| PNG archive path | Runtime copy |
| --- | --- |
| public/ui/chrome/bags.png | public/ui/whetstorm/hud/chrome/bags.webp |
| public/ui/chrome/character.png | public/ui/whetstorm/hud/chrome/character.webp |
| public/ui/chrome/spellbook.png | public/ui/whetstorm/hud/chrome/spellbook.webp |
| public/ui/chrome/talents.png | public/ui/whetstorm/hud/chrome/talents.webp |
| public/ui/chrome/questlog.png | public/ui/whetstorm/hud/chrome/questlog.webp |
| public/ui/chrome/map.png | public/ui/whetstorm/hud/chrome/map.webp |
| public/ui/chrome/social.png | public/ui/whetstorm/hud/chrome/social.webp |
| public/ui/chrome/book.png | public/ui/whetstorm/hud/chrome/book.webp |
| public/ui/map-markers/quest_available.png | public/ui/whetstorm/hud/map-markers/quest-available.webp |
| public/ui/map-markers/quest_ready.png | public/ui/whetstorm/hud/map-markers/quest-ready.webp |
| public/ui/map-markers/quest_repeat.png | public/ui/whetstorm/hud/map-markers/quest-repeat.webp |
| public/ui/map-markers/quest_cooldown.png | public/ui/whetstorm/hud/map-markers/quest-cooldown.webp |
| public/ui/map-markers/service_mailbox.png | public/ui/whetstorm/hud/map-markers/service-mailbox.webp |
| public/ui/map-markers/service_noticeboard.png | public/ui/whetstorm/hud/map-markers/service-noticeboard.webp |
| public/ui/currency/coin_copper.png | public/ui/whetstorm/hud/currency/coin_copper.webp |
| public/ui/currency/coin_silver.png | public/ui/whetstorm/hud/currency/coin_silver.webp |
| public/ui/currency/coin_gold.png | public/ui/whetstorm/hud/currency/coin_gold.webp |
| public/ui/cursors/arrow.png | public/ui/whetstorm/hud/cursors/arrow.png |
| public/ui/cursors/gauntlet.png | public/ui/whetstorm/hud/cursors/gauntlet.png |
| public/ui/cursors/hand-grab.png | public/ui/whetstorm/hud/cursors/hand-grab.png |

## Integration and verification

The branch uses compact painted WebPs for the eight primary chrome IDs, the six
quest/service markers and three coin IDs. Other original vector families remain.
Shared lookups, four direct window-header callers, coin CSS and the mailbox
atlas legend are updated. Existing map state, cache sizes and cooldown/lock/rank
treatments are unchanged.

Cursors ship as 32px RGBA PNGs. CSS tokens and the per-frame game resolver agree:
arrow hotspot (4,4), gauntlet (4,3), grab (16,16). Attack/friendly hover uses the
pointing gauntlet. The grabbing hand follows the existing camera-drag state;
this batch does not add pickup-hover classification or change interaction rights.

All requested source PNGs are 1024px and live outside public in the Git branch.
The ZIP maps them to the requested public PNG paths. Do not overwrite a 32px
runtime cursor with its 1024px source master. See the delivery paths above.

The exporter performs numerical resizing/encoding only, preserves generated
alpha, validates a full in-memory image decode before atomic publication, and
pins source/runtime hashes. No background is manually synthesized or removed.
The contact sheet checks 64/32/24/18px plus light-ground and grayscale views.

27 focused tests pass across five files, including closed identities, exact
runtime routes, source/delivery hashes and cursor agreement. A bounded frontend
review found no runtime regression. Real-browser cursor/map/HUD verification
and the complete game gate remain outstanding. No deployment is included.

Next in the owner brief: Peatfire model concept and nine starter weapon concepts.
No Tripo credits have been spent.
