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

It builds with `VITE_BASE_PATH=/<repository-name>/`, which is right for a GitHub project page. For a custom domain later, add a `CNAME` file to `public/` containing the domain, configure DNS with your domain provider, and change the workflow build command to `npm run build` so the site runs at `/`.
