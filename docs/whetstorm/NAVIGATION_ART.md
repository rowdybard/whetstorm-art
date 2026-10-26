# Original navigation and creature crest replacements

Batch: 2026-10-26, feature/original-ui-and-icons.

## Delivered inventory

| Family | Distinct original masters | Runtime consumers |
| --- | --- | --- |
| Map markers | 29 | World map, minimap, delve schematic, atlas legend |
| Creature families | 13 | Family crest resolver, target portraits and tooltips |
| Status | 2 | NPC and dead crest identities |

These are 44 separate SVG files with deliberately authored subjects, not catalog
IDs routed through a generic fallback. Boss and combat status art were already
original and are not counted again. Every new asset has a subject, SHA-256 and
exact historical replacement path in `public/ui/whetstorm/mapping.json`.

## Source and reproduction

Run `node scripts/generate_whetstorm_navigation_art.mjs` from the repository.
The generator contains the original editable geometry and fixed art palette.
It uses only Node built-ins, produces identical bytes on repeated runs and
updates this batch's mapping entries without altering other assets.

No inherited artwork, reference images or external generation service was used.
The CREDITS.md register marks the superseded map and crest paintings as
permission-required; their historical attribution is retained unchanged.

## Presentation and semantics

Markers use a transparent 64px canvas, a safe margin and bold silhouettes.
Quest punctuation is geometry rather than a font. Ore, wood, herbs, stations,
navigation and reward objects have deliberately different shapes. Directional
arrows distinguish entering, descending, exiting and connecting passages.

The existing map marker loader is unchanged. It still rasterizes exact-size
sprites once, adds terrain-separating keylines, derives gathering cooldowns and
locks, and preserves rank, opened, active, jammed and bountiful treatments.
The artwork does not encode or change gameplay state. Existing missing-art
fallbacks, graphics-tier behavior and palette refresh remain in place.

The atlas legend's five direct CSS image routes are updated alongside the
shared map catalog. Creature/status IDs retain their closed-set validation.

## Verification and remaining review

The focused navigation suite tests all runtime routes, asset existence,
manifest hashes, distinct masters, safe SVG content, quest/reward routing and
every supported cache size through an injected Canvas host. It also rejects
the exact 44 retired paintings if they exist under public/, because Vite copies
that directory verbatim even when no runtime URL references a file.

All 44 SVGs were parsed as XML and rasterized with CairoSVG 2.8.2. The contact
sheet at `docs/screenshots/whetstorm-navigation-art/contact-sheet.png` shows
16px, 24px and 48px views on a dark ground, plus light-ground checks. It is an
asset inspection sheet, not a browser or gameplay screenshot. Raw light-ground
views intentionally omit the map cache's terrain keyline.

A bounded read-only frontend review found no runtime regression. Browser
decoding and in-game map/portrait legibility remain unverified. The full game
gate remains blocked by the partial checkout's missing dependencies and media.
The owner has rejected the current entry landscape; this batch does not count
that landscape as approved art or revise it.

## Shipping boundary

This source snapshot did not contain the 44 superseded bitmap files, so no
binary deletion is claimed here. Integration into the full game checkout must
remove those exact files before release; the focused test fails if they remain.
Other permission-required art families and non-commercial audio still require
their own replacements. This batch does not clear the full game for release.
No live deployment is changed.
