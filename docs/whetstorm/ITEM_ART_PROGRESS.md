# Item painting checkpoint

Early progression deed follow-up: three original crests cover First Steps,
Finding Your Feet and Well Rested through the shared game and guide lookup.
Prompts, source hashes and delivery hashes are in
`deed-progression-generation.json`. Size review and focused routing tests passed;
guide build, browser, locked Reliquary state and shipping-tree clearance remain
open. The inherited deed assets still need physical disposition.

Early deed integration follow-up: the four existing first-ore, first-timber,
first-herb and Vale-first-cast paintings now route through the game crest
lookup and the guide page. Focused game-routing and source-hash tests passed.
The shipping WebPs have opaque dark backgrounds; verify locked Reliquary
states, guide rendering and the full build in the complete checkout. The old
inherited files have not been physically removed and release clearance remains
open. The earlier thirty-fourth checkpoint below describes the pre-integration
state.

Regional glove follow-up: three original paintings bring this effort to 542
individual item paintings. Of 1,626 catalog IDs, 559 have individual paintings
and 1,067 do not; the remainder includes retired entries and variants. Prompts
and hashes are in `regional-gloves-generation.json`. Size review and focused
routing tests passed; browser, full gate and shipping-tree clearance remain open.

Regional footwear follow-up: three original paintings bring this effort to
539 individual item paintings. Of 1,626 catalog IDs, 556 have individual
paintings and 1,070 do not; the remainder includes retired entries and
variants. Prompts and hashes are in `regional-footwear-generation.json`.
Size review and focused routing tests passed; browser, full gate and
shipping-tree clearance remain open.

Regional cloth reward follow-up: three original paintings bring this effort
to 536 individual item paintings. Of 1,626 catalog IDs, 553 have individual
paintings and 1,073 do not; the remainder includes retired entries and
variants. Prompts and hashes are in `regional-cloth-rewards-generation.json`.
Size review and focused routing tests passed; browser, full gate and
shipping-tree clearance remain open.

Vendor chest follow-up: three original paintings bring this effort to 533
individual item paintings. Of 1,626 catalog IDs, 550 have individual paintings
and 1,076 do not; the remainder includes retired entries and variants. Prompts
and hashes are in `vendor-chest-generation.json`. Size review and focused
routing tests passed; browser, full gate and shipping-tree clearance remain open.

Barksong follow-up: one original leather glove painting brings this effort to
530 individual item paintings. Of 1,626 catalog IDs, 547 have individual
paintings and 1,079 do not; the remainder includes retired entries and
variants. Prompt and hashes are in `barksong-handguards-generation.json`.
Size review and focused routing tests passed; browser, full gate and
shipping-tree clearance remain open.

Fenbloom follow-up: one original leather leg painting brings this effort to
529 individual item paintings. Of 1,626 catalog IDs, 546 now have individual
paintings and 1,080 do not; the raw remainder includes retired entries and
variants. Its prompt, source and hashes are in
`fenbloom-breeches-generation.json`. Size review and focused routing tests
passed; browser, full gate and shipping-tree clearance remain open.

Aura follow-up: four combat-effect paintings cover eight exact runtime IDs.
The aura strip now resolves painted mob family IDs to Whetstorm art, including
earlier families. The hunter-authored `pack_frenzy` keeps its ability art.
Prompts and hashes are in `mob-aura-combat-generation.json`; the 32/48/64-pixel
review and focused routing and image checks passed. Browser, full gate and
shipping-tree clearance remain open.

Fortieth checkpoint: four cloth armor paintings bring this effort to 528
individual item paintings. Of 1,626 catalog IDs, 545 resolve to individual
paintings and 1,081 do not; the raw remainder includes retired entries and
variants. Twelve original mob aura paintings cover 17 exact effect identities,
with related effects deliberately sharing family artwork. Prompts and hashes
are in `cloth-batch-brood-generation.json`, `mob-aura-control-generation.json`,
`mob-aura-curses-generation.json` and `mob-aura-drains-generation.json`.
Size reviews and focused image and routing tests passed. Browser testing, the
full gate and shipping-tree clearance remain open.

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

Thirty-ninth checkpoint: four cloth pieces, four farming materials, four
jewelry pieces and four mail pieces add 16 unique item paintings. This effort
has created 524 paintings for 524 item IDs without deliberate reuse. Of 1,626
catalog IDs, 541 have direct individual paintings and 1,085 do not; the raw
remainder includes retired compatibility entries and variants. Records are
`cloth-delve-amberfall-generation.json`, `farming-thornpeak-generation.json`,
`jewelry-batch-apex-generation.json` and `mail-wildheart-apex-generation.json`.
Eight original mob aura paintings cover 19 exact effect identities, deliberately
sharing images within the arcane rot, blind, cinder, concuss, corrode, disarm,
ensnare and frostbite families. Records are `mob-aura-status-generation.json`
and `mob-aura-debuffs-generation.json`. The restricted inherited files still
need physical removal in a complete candidate and build verification. Inventory
size reviews and focused image and routing tests passed. Browser, full gate and
shipping-tree clearance remain open.

Thirty-eighth checkpoint: four mail pieces, four leather pieces, three alchemy
items and four enchanting materials add 15 unique item paintings. This effort
has created 508 paintings for 508 item IDs without deliberate reuse. Of 1,626
catalog IDs, 525 have direct individual paintings and 1,101 do not; the raw
remainder includes retired compatibility entries and variants. Records are
`mail-thornpeak-generation.json`, `leather-thornpeak-third-generation.json`,
`potion-later-generation.json` and `resonant-material-generation.json`.
Four original mob aura paintings also cover nine exact runtime identities:
slow, three bleeds, two poisons and three plagues. Their deliberate shared
effect art and provenance are in `mob-aura-original-batch-generation.json`.
The public aura resolver now recognizes those identities. The earlier failure
to reach them through `auraImageUrl` is covered by a regression test.

The 3D audit confirmed Old Peatfire's current model is shared with other
creatures and has unrecorded rights in the existing inventory; a replacement
must use its own mapping and preserve its combat animation contract. Existing
KayKit player bodies and several starter weapons are listed as CC0. Concept
art already exists; no 3D model or paid generation was performed. Inventory
reviews and focused image and routing tests passed. Browser, full gate,
physical old-file removal and shipping-tree clearance remain open.

Thirty-seventh checkpoint: four alchemy items, four farming materials, four
heroic jewelry items, four dungeon mail items and two heroic cloth items add
18 unique paintings. This effort has created 493 paintings for 493 item IDs
without deliberate reuse. Of 1,626 catalog IDs, 510 have direct individual
paintings and 1,116 do not; that remainder includes retired compatibility IDs
and variants, not only obtainable items. Skullsmasher's Warbelt is depicted as
its name suggests; its live catalog slot is chest. Records are
`alchemy-bottles-generation.json`, `farm-highland-material-generation.json`,
`jewelry-heroic-quartermaster-generation.json`, `mail-dungeon-original-generation.json`
and `armor-batch-shadowpulse-generation.json`. A separate original well-fed
aura painting is routed through the art branch; `well-fed-aura-generation.json`
records its provenance. The full game's restricted aura file still requires
physical removal and build verification. Inventory-size reviews and focused
image and routing tests passed. Browser, full gate and shipping-tree clearance
remain open.

Thirty-sixth checkpoint: four bags and fishing catches, four cloth pieces,
four leather pieces, four provisioning materials and four alchemy items add
20 unique paintings. This effort has created 475 paintings for 475 item IDs
without deliberate reuse. Of 1,626 catalog IDs, 492 have direct individual
paintings and 1,134 do not. The catalog includes retired compatibility IDs and
variants, so the remaining number is not an obtainable-item requirement count.
Records are `bags-fish-batch-generation.json`, `cloth-batch-six-generation.json`,
`leather-litany-original-generation.json`, `material-provisioning-generation.json`
and `potion-alchemy-next-generation.json`. The fixture audit confirmed the
four local freight drafts concern world interaction objects or cargo state;
they remain unintegrated and are not counted. Inventory-size reviews and
focused image and item-routing tests passed. Browser, full gate and shipping-tree
clearance remain open.

Thirty-fifth checkpoint: four mail pieces, four leather pieces, one food,
four farming materials and two quest items add 15 unique paintings. This effort
has created 455 paintings for 455 item IDs without deliberate reuse. Of 1,626
catalog IDs, 472 have direct individual paintings and 1,154 do not. The food,
quest and dungeon gear include later content. The artists' catalog scans found
no other clear eligible unmapped food or carried quest objects, subject to a
future full-catalog audit. Records are `mail-batch-grave-generation.json`,
`leather-wyrm-original-generation.json`, `food-evergarden-greens-generation.json`,
`material-advance-generation.json` and `quest-batch-signet-brand-generation.json`.
The Deeds audit additionally identified the guide generator's separate paths;
game and guide integration, opaque-reliquary handling, physical replacement and
complete-checkout validation remain open. Inventory-size reviews and focused
image and item-routing tests passed. Browser, full gate and shipping-tree
clearance remain open.

Thirty-fourth checkpoint: four mail pieces, four leather pieces, four foods,
four crafting materials and four treasure maps add 20 unique paintings. This
effort has created 440 paintings for 440 item IDs without deliberate reuse. Of
1,626 catalog IDs, 457 have direct individual paintings and 1,169 do not.
Records are `mail-osmium-generation.json`, `leather-peak-next-generation.json`,
`food-later-fish-harvest-generation.json`, `material-component-batch-generation.json`
and `quest-batch-treasure-maps-generation.json`. Four additional original early
Deeds paintings are prepared and hash-checked in `deed-batch-early-generation.json`;
they are not wired into the game or guide. Their opaque backgrounds require
reliquary-state handling and validation in the complete checkout. The attempted
reliquary integration test could not load missing `thornhollow_field.generated` in
this partial checkout, so the runtime change was not retained. Inventory-size
reviews and focused image and item-routing tests passed. Browser, full gate and
shipping-tree clearance remain open.

Thirty-third checkpoint: four mail pieces, four cloth pieces, four foods,
four Warfare jewelry pieces, four harvest materials and four quest objects add
24 unique paintings. This effort has created 420 paintings for 420 IDs without
deliberate reuse. Of 1,626 catalog IDs, 437 have direct individual paintings
and 1,189 do not. Warfare jewelry, some food and heroic gear are later content.
Records are `mail-delve-original-generation.json`, `cloth-batch-five-generation.json`,
`food-highwatch-apex-generation.json`, `jewelry-batch-warfare-generation.json`,
`material-harvest-next-generation.json` and `quest-batch-relics-generation.json`.
Inventory-size reviews and focused image and routing tests passed. Browser,
full gate and shipping-tree clearance remain open.

Thirty-second checkpoint: four mail pieces, four leather pieces, four foods,
four jewelry pieces, four crafting materials and four quest drops add 24 unique
paintings. This effort has created 396 paintings for 396 IDs without deliberate
reuse. Of 1,626 catalog IDs, 413 have direct individual paintings and 1,213 do
not. Some jewelry, dungeon and realm quest items are later rewards. Records are
`mail-next-generation.json`, `leather-delve-next-generation.json`,
`food-fen-highwatch-generation.json`, `jewelry-forge-generation.json`,
`material-highpine-next-generation.json` and `quest-batch-realm-drops-generation.json`.
Inventory-size reviews and focused image and routing tests passed. Browser,
full gate and shipping-tree clearance remain open.

Thirty-first checkpoint: four mail pieces, four cloth pieces, four foods,
four later-tier jewelry pieces, four crafting materials and four quest objects
add 24 unique paintings. This effort has created 372 paintings for 372 IDs
without deliberate reuse. Of 1,626 catalog IDs, 389 have direct individual
paintings and 1,237 do not. Chime Shard and the jewelry are later-tier content.
Records are `mail-boneward-generation.json`, `cloth-batch-four-generation.json`,
`food-highwatch-supplies-generation.json`, `jewelry-batch-later-tier-generation.json`,
`material-chime-cloth-generation.json` and `quest-batch-clues-crypt-generation.json`.
Four additional freight fixture candidates were generated but are unintegrated
and uncounted pending confirmation of inventory use; their local provenance is
`quest-batch-freight-generation.json`. Inventory-size reviews and focused image
and routing tests passed. Browser, full gate and shipping-tree clearance remain open.

Thirtieth checkpoint: four mail pieces, four leather pieces, four foods, four
faction jewelry pieces, four farming materials and four quest objects add 24
unique paintings. This effort has created 348 paintings for 348 IDs without
deliberate reuse. Of 1,626 catalog IDs, 365 have direct individual paintings
and 1,261 do not. Faction jewelry is later reputation content. Records are
`mail-highwatch-generation.json`, `leather-thornpeak-generation.json`,
`food-zone-two-generation.json`, `jewelry-champions-generation.json`,
`farm-materials-original-generation.json` and `quest-shore-original-generation.json`.
Inventory-size reviews and focused image and routing tests passed. Browser,
full gate and shipping-tree clearance remain open.

Twenty-ninth checkpoint: four mail pieces, four cloth pieces, four foods, four
jewelry pieces, four crafting reagents and four quest objects add 24 unique
paintings. This effort has created 324 paintings for 324 IDs without deliberate
reuse. Of 1,626 catalog IDs, 341 have direct individual paintings and 1,285 do
not. Records are `mail-reliquary-generation.json`, `cloth-batch-three-generation.json`,
`food-cooking-later-generation.json`, `jewelry-faction-craft-generation.json`,
`craft-reagent-original-batch-generation.json` and `quest-batch-thornpeak-generation.json`.
Inventory-size reviews and focused image and routing tests passed. Browser,
full gate and shipping-tree clearance remain open.

Twenty-eighth checkpoint: four mail pieces, four leather pieces, four conjured
foods and drinks, four jewelry pieces, four plant materials and four quest
objects add 24 unique paintings. This effort has created 300 paintings for 300
IDs without deliberate reuse. Of 1,626 catalog IDs, 317 have direct individual
paintings and 1,309 do not. Records are `sanctum-mail-item-art-generation.json`,
`leather-batch-crafted-generation.json`, `food-conjured-later-generation.json`,
`jewelry-batch-next-generation.json`, `herb-plant-next-generation.json` and
`quest-highwatch-second-generation.json`. Inventory-size reviews and focused
image and routing tests passed. Browser, full gate and shipping-tree clearance
remain open.

Twenty-seventh checkpoint: four mail pieces, four cloth pieces, four foods,
four jewelry pieces, four gathering materials and four quest objects add 24
unique paintings. This effort has created 276 paintings for 276 IDs without
deliberate reuse. Of 1,626 catalog IDs, 293 have direct individual paintings
and 1,333 do not. The retired Monarch's Crown was skipped. Records are
`plate-roadward-batch-generation.json`, `cloth-batch-two-generation.json`,
`food-early-second-generation.json`, `jewelry-batch-two-generation.json`,
`material-herb-hide-batch-generation.json` and `quest-batch-waterways-generation.json`.
Inventory-size reviews and focused image and routing tests passed. Browser,
full gate and shipping-tree clearance remain open.

Twenty-sixth checkpoint: four weapons, four cloth armor pieces, four leather
armor pieces, four foods, four crafting materials and four quest objects add
24 unique paintings. This effort has created 252 paintings for 252 IDs without
deliberate reuse. Of 1,626 catalog IDs, 269 have direct individual paintings
and 1,357 do not. Two weapons are level-25 epic crafts. An extra generated
ironbark candidate duplicated an already-painted ID and was not integrated or
counted. Records are `weapon-batch-twentyfour-generation.json`,
`cloth-batch-one-generation.json`, `leather-batch-original-generation.json`,
`food-original-batch-generation.json`, `material-orewood-batch-generation.json`
and `quest-batch-highwatch-generation.json`. Inventory-size reviews and focused
image and routing tests passed. Browser, full gate and shipping-tree clearance
remain open.

Twenty-fifth checkpoint: four weapons, four consumables, four crafting
materials and four jewelry paintings add 16 unique paintings. This effort has
created 228 paintings for 228 IDs without deliberate reuse. Of 1,626 catalog
IDs, 245 have direct individual paintings and 1,381 do not. The generation
records are `weapon-batch-twentythree-generation.json`,
`consumable-batch-generation.json`, `early-material-fifteen-generation.json`,
and `jewelry-batch-generation.json`. Inventory-size reviews and focused image,
routing and original-art tests passed. Browser, full gate and shipping-tree
clearance remain open.

Twenty-fourth checkpoint: four recovered armor paintings add four unique
paintings, bringing this effort to 212 paintings for 212 IDs without deliberate
reuse. Of 1,626 catalog IDs, 229 have direct individual paintings and 1,397 do
not. The prompts, masters and hashes are recorded in
`armor-batch-twentytwo-generation.json`; its 32, 48 and 64 pixel review and
focused image, routing and original-art tests passed. Browser, full gate and
shipping-tree clearance remain open.

Twenty-third checkpoint: four armor pieces and four weapons add eight unique
paintings, bringing this effort to 208 paintings for 208 IDs without deliberate
reuse. Of 1,626 catalog IDs, 225 have direct individual paintings and 1,401 do
not. Records are in `armor-batch-twentyone-generation.json` and
`weapon-batch-twentyone-generation.json`; size reviews and focused image,
routing and original-art tests passed. Browser, full gate and shipping-tree
clearance remain open.

Twenty-second checkpoint: four armor pieces and four weapons add eight unique
paintings, bringing this effort to 200 paintings for 200 IDs without deliberate
reuse. Of 1,626 catalog IDs, 217 have direct individual paintings and 1,409 do
not. Records are in `armor-batch-twenty-generation.json` and
`weapon-batch-twenty-generation.json`; size reviews and focused image, routing
and original-art tests passed. Browser, full gate and shipping-tree clearance
remain open.

Twenty-first checkpoint: four armor pieces and four weapons add eight unique
paintings, bringing this effort to 192 paintings for 192 IDs without deliberate
reuse. Of 1,626 catalog IDs, 209 have direct individual paintings and 1,417
do not. Records are in `armor-batch-nineteen-generation.json` and
`weapon-batch-nineteen-generation.json`; size reviews and focused image,
routing and original-art tests passed. A duplicate gaff candidate was not
integrated or counted. Browser, full gate and shipping-tree clearance remain
open.

Twentieth checkpoint: four early gathering, equipment and elixir items add
four unique paintings, bringing this effort to 184 paintings for 184 IDs
without deliberate reuse. Of 1,626 catalog IDs, 201 have direct individual
paintings and 1,425 do not. Records are in `marsh-batch-eighteen-generation.json`;
size review and focused image, routing and original-art tests passed. Browser,
full gate and shipping-tree clearance remain open.

Nineteenth checkpoint: four marsh quest armor pieces add four unique
paintings, bringing this effort to 180 paintings for 180 IDs without
deliberate reuse. Of 1,626 catalog IDs, 197 have direct individual paintings
and 1,429 do not. Records are in `armor-batch-seventeen-generation.json`;
size review and focused image, routing and original-art tests passed. Browser,
full gate and shipping-tree clearance remain open.

Eighteenth checkpoint: three marsh weapons and one pair of cloth wraps add
four unique paintings, bringing this effort to 176 paintings for 176 IDs with
no deliberate reuse. Of 1,626 catalog IDs, 193 have direct individual
paintings and 1,433 do not. Records are in `marsh-batch-seventeen-generation.json`;
size review and focused image, routing and original-art tests passed. Browser,
full gate and shipping-tree clearance remain open.

Seventeenth checkpoint: four marsh quest objects add four unique paintings,
bringing this effort to 172 paintings for 172 IDs with no deliberate reuse.
Of 1,626 catalog IDs, 189 have direct individual paintings and 1,437 do not.
Records are in `quest-batch-sixteen-generation.json`. The first ward stone
was revised to avoid resemblance to another game's icon; its source and
prompt are retained outside public. Size review and focused image, routing
and original-art tests passed. Browser, full gate and shipping-tree clearance
remain open.

Sixteenth checkpoint: four marsh weapons add four unique paintings, bringing
this effort to 168 paintings for 168 IDs with no deliberate reuse. Of 1,626
catalog IDs, 185 have direct individual paintings and 1,441 do not. Records
are in `weapon-batch-fifteen-generation.json`; size review and focused image,
routing and original-art tests passed. Browser, full gate and shipping-tree
clearance remain open.

Fifteenth checkpoint: four marsh armor pieces add four unique paintings,
bringing this effort to 164 paintings for 164 IDs with no deliberate reuse.
Of 1,626 catalog IDs, 181 have direct individual paintings and 1,445 do not.
Their records are in `armor-batch-fifteen-generation.json`; size review and
focused image, routing and original-art tests passed. Browser, full gate and
shipping-tree clearance remain open.

Fourteenth checkpoint: four marsh materials, four armor pieces and four
weapons add 12 unique paintings, bringing this effort to 160 paintings for
160 IDs with no deliberate reuse. Of 1,626 catalog IDs, 177 have direct
individual paintings and 1,449 do not. Records are in
`early-material-fourteen-generation.json`, `armor-batch-fourteen-generation.json`
and `weapon-batch-fourteen-generation.json`. Size reviews and focused image,
routing and original-art tests passed. Browser, full gate and shipping-tree
clearance remain open.

Thirteenth checkpoint: four marsh quest items, four armor pieces and four
weapons add 12 unique paintings, bringing this effort to 148 paintings for
148 IDs with no deliberate reuse. Of 1,626 catalog IDs, 165 have direct
individual paintings and 1,461 do not. Records are in
`early-material-thirteen-generation.json`, `armor-batch-thirteen-generation.json`
and `weapon-batch-thirteen-generation.json`. Size reviews and focused image,
routing and original-art tests passed. Browser, full gate and shipping-tree
clearance remain open.

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
