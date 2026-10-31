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
