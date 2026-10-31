# Claudium hero art audit

The conditional Claudium hero illustration is referenced as
`/claudium/claudium_coin_hero_3q.webp`. It is absent from this checkout's
`public/claudium/` directory, so these references cannot display the bitmap here.

- `src/ui/claudium_window.ts` uses it in the Claudium balance panel.
- `src/styles/components.css` uses it in the WOC Store hero background;
  `src/styles/hud.mobile.css` overrides its mobile placement.
- `src/main.ts` attaches Claudium hooks in an online, non-native session when
  commerce is enabled. The relevant balance or store surface must also be open.

`CREDITS.md`, the Claudium visual asset set row, describes the historical art as
project-generated through Higgsfield and states that its rights are reserved and
permission is required. The payment-rail brand icons are a separate credit entry.

A future replacement must represent the actual Claudium currency and product
identity accurately. Do not invent a new currency design or imply a different
product; verify its identity and relevant rights before selecting replacement art.

## Other conditional commerce images

The Claudium asset-set credit also marks
`/claudium/icons/claudium_coin_64.webp` and
`/claudium/icons/stack_{single,small,large}_256.webp` as permission-required.
The coin is requested by the Armory cards and inspector, mount cards, Store
balance, charter and bank-price views, Claudium window, and HUD launcher. The
Claudium window chooses a stack for its purchase-pack rows. These are distinct
from the hero bitmap. `src/main.ts` gates the Store surface on
`commerceEnabled()` and, for native sessions, wallet readiness; it attaches
Claudium hooks on non-native sessions when commerce is enabled. Individual
price and pack images also require their corresponding rows or surfaces to be
rendered, so these references do not imply universal visibility.

`/claudium/icons/solana-icon.webp` and `/claudium/icons/usdc-icon.webp` are
selected for their respective payment rails in `src/ui/claudium_window.ts`.
The separate brand-marks credit identifies them as third-party trademarks; do
not treat them as project-owned or as covered by the Claudium art row.

`src/ui/woc_store_view.ts` uses original Whetstorm thumbnails for Guildmark and
Emberwrought skins, but falls back to `/ui/store/armory/<skinId>.webp` for
other catalog skins. For example, the Hoarfrost `ice_fang_sword.webp` and
Fallen Star `solheim_sword.webp` thumbnails are covered by the Season 1 Armory
storefront-render credit marked permission-required. The Store builds its
catalog rows even when a service price is absent, subject to the Store surface
being enabled and opened.

The same view constructs `/ui/store/mount_skins/<skinId>.webp` for the active
`mech_bird`, `chimeglass_tortoise`, `rickshaw_mount`, and
`goblin_rocket_sled` catalog IDs. No specific credit row for these thumbnail
images was found; their terms remain unresolved rather than established as
permission-required. These paths and the legacy coin and Armory bitmap examples
exist in the separate `D:/action-mmo` reference checkout but are absent from
this partial art worktree. The code and file checks were static: runtime
visibility and downstream package contents were not inspected.
