# Deed art checkpoint

At art-branch revision `efedb4fae1`, a read-only census enumerated all 325
`DEEDS` entries and evaluated `earlyDeedImageUrl`, `deedImageUrl`,
`deedCrestId` and the production crest `iconDataUrl` route. All 325 IDs
resolved consistently to existing Whetstorm deed images. The files produced
325 distinct SHA-256 hashes. The next revision `02e1d91b73` changed only
integration documentation, so the same routing snapshot applies there.

This verifies exact-byte uniqueness and file presence, not perceptual
distinctness, acquisition, image decoding in every browser, visual fit or
release-package clearance. Eighteen entries describe retired Vale Cup or
Fiesta activities; Brightwood Remembered depends on an existing tradable
retired relic; the Grand Reliquary remains blocked in normal play by
source-pending catalog relics. Do not treat the presence of art as proof of
current attainability.

The full reference checkout retains historical permission-required deed
images and older tests that pin their routes. See
`FULL_GAME_ART_INTEGRATION_NOTES.md` before assembling a release candidate.
Focused batch tests and reviews do not replace the full gate or in-game
validation.
