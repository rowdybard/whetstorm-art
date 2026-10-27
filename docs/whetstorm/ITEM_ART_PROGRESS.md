# Item painting checkpoint

2026-10-27: The live catalog contains 1,626 item IDs. This checkpoint adds
12 unique paintings and routes 12 IDs: four early creature drops, four pieces
of armor and four gathering tools. Together with 17 previously mapped IDs,
29 IDs have individual paintings; 1,597 do not. No painting in this batch is
deliberately reused. No failed painting is included; the first fishing-pole
revision is retained in the source records. Later quest-material and armor
images are in progress and are not included in these counts.

The masters, prompts, references, hashes and export details are recorded in
`early-drop-item-art-generation.json`, `armor-batch-generation.json`, and
`tool-batch-generation.json`. The corresponding size reviews are under
`docs/screenshots/whetstorm-starter-items/`.

The item image APIs use the paintings; the synchronous canvas/worker fallback
still uses procedural artwork. Browser testing and the complete repository
gate remain open. This partial checkout does not establish removal of inherited
media from the complete shipping tree; release clearance remains open.
