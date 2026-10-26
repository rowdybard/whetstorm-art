# Collaboration state

## Current checkpoint

- The owner's source snapshot at declared revision `64dcb3e84` is imported.
- Source provenance and byte checksums are recorded in `SOURCE_SNAPSHOT.json`.
- `START_HERE.md` records repository routing, the approved UI direction, seven
  launch classes and the required checkpoint workflow.
- No UI, icon, combat or asset replacement is implemented in this initial seed.
- Earlier uncommitted UI prototypes were lost during workspace maintenance and
  are not represented as recovered work.

## Remote checkpoint

- The collaboration repository is https://github.com/rowdybard/whetstorm-art.
- GitHub reports the repository as private, owned by `rowdybard`, with `main`
  as its default branch. Authenticated read and push access are verified.
- GitHub Actions was disabled before the first source push and remains disabled.
- The initial source and handoff seed was pushed at
  `873f2446c2ebaba74a7b62df5653465252d8c270`.

## Verification scope

This import is checked for archive path safety, file completeness, byte identity
and Git object integrity. It does not establish that the game builds or runs.
The input intentionally omits tests, media and generated artifacts; see
`ZIP_README.md`.

Initial seed checks and outcomes:

- `git fsck --full`: passed with no Git object errors.
- `git ls-remote origin refs/heads/main`: matched the local seed commit above.
- `gh api repos/rowdybard/whetstorm-art`: returned `private: true`, the expected
  owner and repository, and default branch `main`.
- `gh api repos/rowdybard/whetstorm-art/actions/permissions`: returned
  `enabled: false`.
- The remote `START_HERE.md` blob matched `git rev-parse main:START_HERE.md`.
- Game build, gameplay and automated game tests were not run. Required media,
  tests and generated files are omitted from the supplied snapshot.

## Next work

1. Have Claude read `START_HERE.md`, then the fork's existing handoff and rules.
2. Add the completed art audit if it exists outside this snapshot.
3. Create a scoped UI feature branch and implement the login/creation and HUD
   work with original spell and item icons.
4. Save and push verified milestones, then integrate reviewed changes into the
   owner's complete game checkout.
