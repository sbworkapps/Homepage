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

The project currently deploys to `https://sbworkapps.github.io/Homepage/`. Its build uses the repository path, which is required for that address.

When moving to a custom domain, add `public/CNAME` containing the exact canonical hostname (for example, `www.example.com`), point it at GitHub Pages in Spaceship, and set the same hostname in **Settings → Pages → Custom domain**. Then change the workflow build command to `npm run build`, so assets are served from the domain root. Once GitHub verifies DNS, enable **Enforce HTTPS** there. Use the hostname in `CNAME` consistently: do not mix the apex domain and `www` unless one redirects to the other.
