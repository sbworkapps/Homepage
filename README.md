# SBoyle portfolio

Single-page portfolio and services website built with React, TypeScript, and Vite.

## Local development

```bash
npm install
npm run dev
```

Run checks with `npm test` and create the production build with `npm run build`.

## GitHub Pages

The workflow at `.github/workflows/deploy.yml` deploys every push to `main`. In the repository settings, set **Pages → Build and deployment → GitHub Actions**.

The project is configured to deploy from the root path of a custom domain rather than a GitHub repository subpath.

`public/CNAME` contains the canonical hostname `sboyle.dev`. Point it at GitHub Pages in Spaceship, then set `sboyle.dev` in **Settings → Pages → Custom domain**. Once GitHub verifies DNS, enable **Enforce HTTPS** there. Use `sboyle.dev` consistently rather than mixing it with `www.sboyle.dev` unless one redirects to the other.
