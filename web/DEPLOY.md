# Deployment — First Choice (firstchoiceco.com)

**Live** on a shared Ubuntu 24.04 box at `185.231.183.39` (⚠️ also hosts **vibeapp.ir** — never touch its nginx vhosts or Postgres DBs). ~1 GB RAM, so we **build locally and ship the standalone bundle** (the box can't build).

## Server layout
- **App:** `/var/www/firstchoiceco.com` (Next.js `output: 'standalone'`).
- **Service:** systemd `firstchoice` → `node server.js` on **127.0.0.1:3100**, Node 22 via nvm (`/home/ubuntu/.nvm/versions/node/v22.23.0/bin/node`). System Node 18 left alone for vibeapp. `MemoryHigh=400M`.
- **Env:** `/etc/firstchoice.env` (root 600) — `PAYLOAD_SECRET`, `DATABASE_URI`, `PORT=3100`, `HOSTNAME=127.0.0.1`, `NODE_ENV=production`.
- **DB:** Postgres 18, database/role `firstchoice` (own password). Payload adapter has `push: true`, so schema auto-syncs on boot.
- **nginx:** `/etc/nginx/sites-available/firstchoiceco.com` → proxy to :3100, self-signed origin cert in `/etc/nginx/ssl/`. Cloudflare SSL = **Full**.
- **DNS:** Cloudflare. Apex `firstchoiceco.com` A → `185.231.183.39` (proxied); `www` CNAME → apex. **Email stays on cPanel** (`mail.*` A + `MX` → 89.39.208.146 — do not change).

## Redeploy (from this repo)
```bash
cd web && npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
tar -czf /tmp/fc-standalone.tgz -C .next/standalone .
# ship + on server: extract into /var/www/firstchoiceco.com, then RE-ADD the linux sharp binaries:
#   tar -xzf fc-sharp.tgz -C /var/www/firstchoiceco.com/node_modules   (@img/sharp-linux-x64 + sharp-libvips-linux-x64)
sudo systemctl restart firstchoice
```
> **sharp gotcha:** Next's standalone tracing drops the platform sharp binaries; always re-add `node_modules/@img/{sharp-linux-x64,sharp-libvips-linux-x64}` (and `sharp`) from a linux-x64 install, or `/admin` + `/api` will 500.
