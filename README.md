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

For a custom domain, add `public/CNAME` containing the exact canonical hostname (for example, `www.example.com`). The deployment workflow already builds for the domain root.

At Spaceship, point the domain at GitHub Pages, then add the same hostname in **Settings → Pages → Custom domain** for the GitHub repository. Once GitHub verifies DNS, enable **Enforce HTTPS** there. Use the hostname in `CNAME` consistently: do not mix the apex domain and `www` unless one redirects to the other.
