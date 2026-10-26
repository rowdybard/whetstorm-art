# Put Whetstorm online: Fly.io and Cloudflare Pages

Three pieces, two hosts:

- **The game server** (the world and accounts) runs on **Fly.io**. Its address
  will be `https://whetstorm-game.fly.dev`. Players never open it directly.
- **The database** (where characters are saved) runs on **Fly.io** too, as a
  second small app that only the game server can reach.
- **The website** (the game itself, the page players open) runs on
  **Cloudflare Pages**. Its address will be `https://whetstorm.pages.dev`.
  It rebuilds by itself every time something is merged into `main`.

The files that make this work are `fly.toml`, `deploy/fly/Dockerfile`,
`deploy/fly-db/fly.toml`, `public/_redirects` and `public/_headers`. They must
be on `main` before you start. Do not use the "Launch an app" screen on the
Fly.io website: it ignores these files and makes up its own settings.

## What it costs

Prices checked on 2026-10-25; Fly's pricing page has the current numbers.

| Piece | Plan | About |
|---|---|---|
| Game server | Fly `shared-cpu-4x`, 1 GB | $8 a month |
| Database | Fly `shared-cpu-1x`, 512 MB, plus a 3 GB disk | $4 a month |
| Database backups | A copy of the disk every day, kept 14 days | free (the first 10 GB are free) |
| Website | Cloudflare Pages free plan | free |

This size is for testing with about 10 players at once. Before a real launch,
the game server should move up to `performance-1x` (about $31 a month instead
of $8, for roughly 40 to 50 players). Ask Claude to make that change: it goes
in `fly.toml`, because the next deploy undoes a size change made any other way.

## Part 1: Install the Fly tool (once)

1. Open **PowerShell**.
2. Paste this and press Enter:

   ```
   pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
   ```

   If it says `pwsh` is not found, use the same line with `powershell` in
   place of the first word `pwsh`. If Windows asks whether to allow changes,
   press **Yes**.
3. Close PowerShell and open it again. If `fly` is not recognized after
   that, type `flyctl` in place of `fly` in every command in this guide.
4. Run `fly auth login`. A browser window opens: sign in there.
5. In the Fly.io dashboard, open **Billing** and add a credit card if there
   is none yet. A free-trial account stops every machine after five minutes
   and does not allow the game server's size.

## Part 2: Create the two apps

1. In PowerShell, go to your Whetstorm folder and get the latest `main`:

   ```
   cd C:\path\to\whetstorm
   git checkout main
   git pull
   ```

2. Create the game server app and the database app:

   ```
   fly apps create whetstorm-game
   fly apps create whetstorm-db
   ```

   If Fly says a name is taken, stop here and tell Claude. The names are
   written into the settings files and the steps below, so Claude changes them
   in one place.

## Part 3: Create the database

Do all of this in **one** PowerShell window, in the Whetstorm folder, in this
order. Copy each line exactly.

1. Create the database's disk:

   ```
   fly volumes create pgdata --region iad --size 3 --snapshot-retention 14 -a whetstorm-db --yes
   ```

2. Make a random database password. Nothing is printed, and you never need to
   see or type it:

   ```
   $pw = [guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')
   ```

3. Give the password to the database, and the database's address (with the
   same password) to the game server:

   ```
   fly secrets set "POSTGRES_PASSWORD=$pw" -a whetstorm-db --stage
   fly secrets set "DATABASE_URL=postgres://whetstorm:$pw@whetstorm-db.internal:5432/whetstorm" -a whetstorm-game --stage
   ```

4. Start the database:

   ```
   fly deploy -c deploy/fly-db/fly.toml --ha=false
   ```

5. Check it: `fly status -a whetstorm-db` should list exactly one machine,
   and its state should be `started`.

If you close the window after step 2 but before step 4, start again from
step 2. Once step 4 has run, the window no longer matters: both apps already
have the password.

## Part 4: Start the game server

1. Still in the Whetstorm folder, run:

   ```
   fly deploy --ha=false
   ```

   It builds on Fly's computers and takes a few minutes. `--ha=false` matters
   every time: without it Fly starts a spare copy, and two copies means two
   separate worlds.
2. Check it: open `https://whetstorm-game.fly.dev/livez` in your browser. It
   should say `ok`. `https://whetstorm-game.fly.dev/api/status` should start
   with `{"ok":true`.
3. Run `fly status -a whetstorm-game`. It should list exactly one machine. If
   it lists two, run `fly scale count 1 -a whetstorm-game --yes`.

If a check fails, run `fly logs -a whetstorm-game --no-tail` and send Claude
what it prints.

## Part 5: Put the website on Cloudflare Pages

1. In the Cloudflare dashboard, open **Workers & Pages**, then
   **Create application**, then **Pages**, then **Connect to Git**.
2. Choose GitHub, allow Cloudflare to see `rowdybard/whetstorm`, pick it, and
   press **Begin setup**.
3. Fill in:
   - **Project name:** `whetstorm`
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** `pnpm run build`
   - **Build output directory:** `dist`
   - **Root directory:** leave empty
4. Under **Environment variables**, add these three:

   | Variable name | Value |
   |---|---|
   | `VITE_API_ORIGIN` | `https://whetstorm-game.fly.dev` (your server address, starting with `https://`, no `/` at the end) |
   | `PNPM_VERSION` | `10.34.5` |
   | `NODE_VERSION` | `22.22.0` |

5. Press **Save and Deploy**. The first build takes several minutes.
6. When it finishes, Cloudflare shows the website address. It is
   `https://whetstorm.pages.dev` unless that name was taken. Write it down.
7. Turn off preview sites: open the project's **Settings**, then **Build**,
   then **Branch control**, and set **Preview branch** to **None**. Preview
   sites cannot sign in, and each one uses up builds from the free plan.

## Part 6: Let the server accept the website

The server only accepts sign-ins from addresses it knows. Tell it the website
address from Part 5 (exactly, starting with `https://`, no `/` at the end):

```
fly secrets set "CLIENT_ORIGINS=https://whetstorm.pages.dev" -a whetstorm-game
```

This restarts the server, which takes about a minute.

## Part 7: Play

Open the website address. Make sure the world picker says **Online**, press
**Play**, then **Create Account**. The realm is called **Whetstorm**. Make a
character and enter the world.

## After setup

- **Website:** updates by itself after every merge into `main`.
- **Game server:** does not update by itself. Right after every merge, run
  these in the Whetstorm folder, so the server matches the new website:

  ```
  git checkout main
  git pull
  fly deploy --ha=false
  ```

  The deploy sends the files in the folder as they are, so it must be on
  an up-to-date `main`. If git says you have local changes, stop and ask
  Claude.

  Players are disconnected for about a minute while it restarts; it saves
  everyone first.
- **Database:** never needs a deploy unless Claude says so.
- **Bigger machine:** ask Claude (see "What it costs"). Never run
  `fly scale count` with a number above 1, for either app.

## If something goes wrong

| What you see | What to do |
|---|---|
| The world list says "No worlds available.", or signing in says "Connection to the server was lost." | Open `https://whetstorm-game.fly.dev/livez`. If it does not say `ok`, see the database row below. If it does, check `CLIENT_ORIGINS` (Part 6): it must match the website address exactly. Then check `VITE_API_ORIGIN` in the Pages project's **Settings**, under **Variables and Secrets**. After you change it, open the latest deployment in Cloudflare and press **Retry deployment**: the address is built into the website. |
| The website shows nothing, or **Play** does nothing | `VITE_API_ORIGIN` is malformed: in the Pages project's **Settings**, under **Variables and Secrets**, it must start with `https://` and have no quotes or spaces. Fix it, then press **Retry deployment** on the latest deployment. |
| The server will not start and the logs mention `CLIENT_ORIGINS` | The address has a typo: it needs `https://` and nothing after the name. |
| The server logs mention the database (`ENOTFOUND`, `ECONNREFUSED`, `password authentication failed`) | Run `fly status -a whetstorm-db`. If its machine is not `started`, run `fly machine start -a whetstorm-db` (a list appears: press Space to tick the machine, then Enter) and then `fly deploy --ha=false` for the server. Otherwise send Claude what `fly logs -a whetstorm-db --no-tail` prints. |
| The game goes offline by itself a few minutes after every start | The Fly account is still on its free trial: add a credit card under **Billing** in the Fly.io dashboard, then run `fly machine start -a whetstorm-db` (press Space to tick the machine, then Enter) and `fly deploy --ha=false`. |
| The website build fails on Cloudflare | Open the failed build in Cloudflare, copy the last lines of its log, and send them to Claude. |

## Not covered yet

- The admin dashboard, the map editor and the frame art of two world-quest
  puzzle windows expect the website and the server to share one address, so
  they do not work on this setup yet. Nobody has admin rights on a fresh
  database either.
- Character share and profile links point at the server address, so they open
  a page that does not exist there.
- Email (password reset), Discord sign-in and its widget, other sign-in
  pop-ups, and Cloudflare Turnstile are not set up.
