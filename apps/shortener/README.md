# Miint URL Shortener

> A lightweight, self-hosted service to create short links with optional TTL and password protection.

## Features

* 🔗 Generate short URLs with random or custom slug.
* ⏳ Set expiry time – either a relative TTL (default **24 h**) or an exact `expiresAt` date.
* 🔒 Optional password to protect private links (BCrypt hashed).
* 👁️ Link preview page shows target title & domain before redirecting.
* 📈 Click counter for basic analytics.
* 🗑️ Built-in cleanup script removes expired links.

## Project structure

```
apps/shortener/
  app/
    api/shorten/route.ts   # POST endpoint to create a short link
    [slug]/route.ts        # GET endpoint that handles redirect + preview
  middleware.ts            # CORS for /api/* paths
  next.config.js           # Next.js (App Router) config
  package.json             # Dependencies & scripts
```

Data is stored via **Prisma** in the shared `packages/db` package (SQLite by default).

## API

### `POST /api/shorten`

Payload (`application/json`):

```jsonc
{
  "url": "https://example.com",      // required – must start with http/https
  "custom": "my-link",              // optional custom slug [3–30] chars
  "ttl": 86400,                      // optional seconds (min 60, max 30d)
  "expiresAt": "2025-01-01T00:00:00Z", // optional ISO date overrides ttl
  "password": "secret"              // optional, plain text (stored hashed)
}
```

Response 200:

```json
{
  "slug": "my-link",
  "short": "https://go.miint.dev/my-link"
}
```

Errors return `{ "error": "message" }` with proper status codes (`400`, `409`, …).

### `GET /:slug`

Query params:

* `pwd` – password (if link is protected)
* `continue=1` – skip preview page (auto-redirect)

If password is required but missing/invalid, a minimal form is displayed. On first visit, a **preview** page shows the link title & domain and asks to continue.

## Local development

```bash
pnpm i
cd apps/shortener
pnpm dev       # runs on http://localhost:3040
```

Make sure the database is ready:

```bash
cd packages/db
pnpm migrate   # creates SQLite file & tables
```

> Use `DATABASE_URL="file:../dev.db"` (default) or point to any other Postgres/MySQL connection string.

### Cleanup cron

Expired links can be removed with:

```bash
pnpm ts-node packages/db/cleanup.ts
```

Schedule this command daily via `cron` or a serverless job.

## Deployment

The app is designed for **Server-full** or **Serverless** deployments. In this monorepo, PM2 config is provided:

```bash
pm2 start apps/pm2.config.cjs
```

* Production port: **3040** (see `pm2.config.cjs`).
* Set `NODE_ENV=production` and any custom `DATABASE_URL`.

## License

MIT © Miint.dev 