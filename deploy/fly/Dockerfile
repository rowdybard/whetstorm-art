# Whetstorm game server for Fly.io: the authoritative world, REST API and
# WebSocket on one port, WITHOUT the web client (Cloudflare Pages hosts that,
# see docs/whetstorm/deploy-fly-and-pages.md). `fly deploy` builds this from the
# repo root because fly.toml points here; the build context and .dockerignore
# are the root ones. The root Dockerfile is the all-in-one client+server image.

FROM node:26-slim AS build
WORKDIR /app
# Match package.json packageManager (Corepack not required; same as CONTRIBUTING).
RUN npm install -g pnpm@10.34.5
COPY package.json pnpm-lock.yaml .npmrc ./
# The lockfile pins patch file hashes, so a frozen install needs the patches.
COPY patches ./patches
RUN pnpm install --frozen-lockfile
COPY tsconfig.json ./
COPY src ./src
COPY server ./server
# .dockerignore keeps only the build and migration scripts build_server.mjs needs.
COPY scripts ./scripts
# Optional private bot detector; public checkouts fall back to the no-op stub.
COPY private ./private
RUN pnpm run build:server

FROM node:26-slim
WORKDIR /app
ENV NODE_ENV=production
# server/parse/build_version.ts reads the version from package.json in the
# working directory. The esbuild bundle needs nothing else from node_modules.
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist-server ./dist-server
EXPOSE 8787
USER node
CMD ["node", "dist-server/server.cjs"]
