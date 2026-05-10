# Deploy notes

Source for **https://φ.monster** (`xn--7xa.monster`).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # → ./dist
npm run preview
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) auto-builds and publishes to GitHub Pages on push to `main`.

The `public/CNAME` file pins the custom domain. It uses Punycode (`xn--7xa.monster`) — required for IDN domains on GitHub Pages.

### One-time GitHub Pages setup

In the repo settings: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### DNS (apex `φ.monster`)

| Type  | Name | Value             |
|-------|------|-------------------|
| A     | @    | 185.199.108.153   |
| A     | @    | 185.199.109.153   |
| A     | @    | 185.199.110.153   |
| A     | @    | 185.199.111.153   |
| AAAA  | @    | 2606:50c0:8000::153 |
| AAAA  | @    | 2606:50c0:8001::153 |
| AAAA  | @    | 2606:50c0:8002::153 |
| AAAA  | @    | 2606:50c0:8003::153 |

After DNS propagates, enable **Enforce HTTPS** in Pages settings.

## Stack

- **Astro 4** — static site generator
- **Phaser 3** — title-screen arcade canvas
- **Press Start 2P / VT323** — pixel typography (Google Fonts)
- Procedural sprites (no asset files)
