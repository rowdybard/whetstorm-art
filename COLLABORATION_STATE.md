# Collaboration state

## Current checkpoint

- The owner's source snapshot at declared revision `64dcb3e84` is imported.
- Source provenance and byte checksums are recorded in `SOURCE_SNAPSHOT.json`.
- `START_HERE.md` records repository routing, the approved UI direction, seven
  launch classes and the required checkpoint workflow.
- No UI, icon, combat or asset replacement is implemented in this initial seed.
- Earlier uncommitted UI prototypes were lost during workspace maintenance and
  are not represented as recovered work.

## Verification scope

This import is checked for archive path safety, file completeness, byte identity
and Git object integrity. It does not establish that the game builds or runs.
The input intentionally omits tests, media and generated artifacts; see
`ZIP_README.md`.

## Next work

1. Confirm the private collaboration remote and keep GitHub Actions disabled.
2. Have Claude read `START_HERE.md`, then the fork's existing handoff and rules.
3. Add the completed art audit if it exists outside this snapshot.
4. Create a scoped UI feature branch and implement the login/creation and HUD
   work with original spell and item icons.
5. Save and push verified milestones, then integrate reviewed changes into the
   owner's complete game checkout.

