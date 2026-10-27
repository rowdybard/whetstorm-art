# Item painting checkpoint

2026-10-27: The live catalog contains 1,626 item IDs. This checkpoint adds
12 unique paintings and routes 12 IDs: four early creature drops, four pieces
of armor and four gathering tools. Together with 17 previously mapped IDs,
29 IDs have individual paintings; 1,597 do not. No painting in this batch is
deliberately reused. No failed painting is included; the first fishing-pole
revision is retained in the source records. The later quest-material and armor
images described below are not included in this first-checkpoint count.

The masters, prompts, references, hashes and export details are recorded in
`early-drop-item-art-generation.json`, `armor-batch-generation.json`, and
`tool-batch-generation.json`. The corresponding size reviews are under
`docs/screenshots/whetstorm-starter-items/`.

The item image APIs use the paintings; the synchronous canvas/worker fallback
still uses procedural artwork. Browser testing and the complete repository
gate remain open. This partial checkout does not establish removal of inherited
media from the complete shipping tree; release clearance remains open.

Second checkpoint: four quest materials and four armor pieces add eight more
unique paintings for eight IDs. This makes 20 new paintings in this effort,
37 directly painted IDs in the 1,626-item catalog, and 1,589 IDs without their
own painting. No deliberate reuse is included in these new batches. Sources,
prompts and hashes are in `early-quest-material-art-generation.json` and
`armor-batch-two-generation.json`; their size reviews are in the same
screenshots directory. Focused tests passed for both batches and the original
art routing contract. Browser, full gate and shipping-tree checks remain open.

Third checkpoint: four armor pieces and four profession tools add eight
individual paintings, bringing this effort to 28 new paintings and 45 mapped
IDs overall. Of 1,626 current IDs, 1,581 lack an individual painting. The new
work deliberately reuses no painting. Source records are in
`armor-batch-three-generation.json` and `tool-batch-three-generation.json`.
Both batches were reviewed at inventory sizes and passed focused routing,
image and original-art contract tests. Browser and full-gate checks remain
open, as does removal of inherited art in the complete shipping tree.

Fourth checkpoint: four early materials, four armor pieces and four tools
add 12 unique paintings. This effort has added 40 paintings, with 57 IDs now
mapped to individual paintings and 1,569 of the 1,626 catalog IDs remaining
without one. None of the new paintings are deliberately reused. The records
are `early-material-four-generation.json`, `armor-batch-four-generation.json`
and `tool-batch-four-generation.json`. Inventory-size reviews and focused
routing, image and original-art tests passed. Browser, full gate and full
shipping-tree clearance remain open.

Fifth checkpoint: four quest objects, four armor pieces and four tools add 12
unique paintings. This effort has added 52 paintings for 52 item IDs, with no
deliberate reuse. In total 69 of 1,626 item IDs now map directly to individual
paintings; 1,557 do not. Source and delivery records are in
`early-material-five-generation.json`, `armor-batch-five-generation.json` and
`tool-batch-five-generation.json`. Inventory-size reviews and focused image,
routing and original-art contract tests passed. Browser verification, the full
gate and shipping-tree clearance remain open.

Sixth checkpoint: four quest objects and items, four armor pieces and four
weapons add 12 unique paintings, bringing this effort to 64 paintings for 64
IDs without deliberate reuse. Of 1,626 catalog IDs, 81 now have direct
individual paintings and 1,545 do not. Records are in
`early-material-six-generation.json`, `armor-batch-six-generation.json` and
`weapon-batch-six-generation.json`. The blessed tallow was revised for clearer
distinction from plain tallow; its first source and prompt remain recorded.
Size reviews and focused image, routing and original-art tests passed. Browser,
full gate and shipping-tree clearance remain open.

Twelfth checkpoint: four potions, four armor pieces and four weapons add 12
unique paintings, bringing this effort to 136 paintings for 136 IDs with no
deliberate reuse. Of 1,626 catalog IDs, 153 have direct individual paintings
and 1,473 do not. Records are in `early-material-twelve-generation.json`,
`armor-batch-twelve-generation.json` and `weapon-batch-twelve-generation.json`.
Size reviews and focused image, routing and original-art tests passed. Browser,
full gate and shipping-tree clearance remain open.

Eleventh checkpoint: four cooked foods, four armor pieces and four weapons add
12 unique paintings, bringing this effort to 124 paintings for 124 IDs with
no deliberate reuse. Of 1,626 catalog IDs, 141 have direct individual
paintings and 1,485 do not. Records are in
`early-material-eleven-generation.json`, `armor-batch-eleven-generation.json`
and `weapon-batch-eleven-generation.json`. Size reviews and focused image,
routing and original-art tests passed. Browser, full gate and shipping-tree
clearance remain open.

Tenth checkpoint: four fishing items, four armor pieces and four weapons add
12 unique paintings, bringing this effort to 112 paintings for 112 IDs with
no deliberate reuse. Of 1,626 catalog IDs, 129 have direct individual
paintings and 1,497 do not. Records are in `early-material-ten-generation.json`,
`armor-batch-ten-generation.json` and `weapon-batch-ten-generation.json`.
Size reviews and focused image, routing and original-art tests passed. Browser,
full gate and shipping-tree clearance remain open.

Ninth checkpoint: four gathering materials, four armor pieces and four weapons
add 12 unique paintings, bringing this effort to 100 paintings for 100 IDs
without deliberate reuse. Of 1,626 catalog IDs, 117 have direct individual
paintings and 1,509 do not. Records are in `early-material-nine-generation.json`,
`armor-batch-nine-generation.json` and `weapon-batch-nine-generation.json`.
Size reviews and focused image, routing and original-art tests passed. Browser,
full gate and shipping-tree clearance remain open.

Seventh checkpoint: four quest and crafting objects, four armor pieces and
four weapons add 12 unique paintings, bringing this effort to 76 paintings
for 76 IDs without deliberate reuse. Of 1,626 catalog IDs, 93 have direct
individual paintings and 1,533 do not. Records are in
`early-material-seven-generation.json`, `armor-batch-seven-generation.json`
and `weapon-batch-seven-generation.json`. Size reviews and focused image,
routing and original-art tests passed. Browser, full gate and shipping-tree
clearance remain open.

Eighth checkpoint: four gathering ingredients, four armor pieces and four
weapons add 12 unique paintings, bringing this effort to 88 paintings for 88
IDs without deliberate reuse. Of 1,626 catalog IDs, 105 have direct individual
paintings and 1,521 do not. Records are in `early-material-eight-generation.json`,
`armor-batch-eight-generation.json` and `weapon-batch-eight-generation.json`.
Size reviews and focused image, routing and original-art tests passed. Browser,
full gate and shipping-tree clearance remain open.
