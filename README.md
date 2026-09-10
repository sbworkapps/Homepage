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

`public/CNAME` contains the canonical hostname `sbapps.dev`. Point it at GitHub Pages in Spaceship, then set `sbapps.dev` in **Settings → Pages → Custom domain**. Once GitHub verifies DNS, enable **Enforce HTTPS** there. Use `sbapps.dev` consistently rather than mixing it with `www.sbapps.dev` unless one redirects to the other.
