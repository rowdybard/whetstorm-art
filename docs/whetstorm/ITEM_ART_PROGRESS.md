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
