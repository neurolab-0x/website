# Deployment Runbook

## Canonical Path

This repository deploys the frontend application to Vercel as the primary production target.

GitHub Actions is responsible for:

- validating quality on pull requests and `main`
- running security analysis
- publishing a Docker image to GitHub Container Registry

The Docker image is a secondary artifact and does not by itself create a live production deployment.

## Required Repository Settings

Configure branch protection for `main`:

- require pull requests before merging
- require status checks to pass before merging
- require `Code Quality`
- optionally require `Lint and Security Analysis`

If the repository uses Vercel's GitHub integration, verify that Vercel is allowed to create preview and production deployments from the repository.

## Required Vercel Settings

In the Vercel project dashboard, verify:

- Production Branch: `main`
- Framework Preset: `Vite`
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm run build`
- Output Directory: `dist`

If any of those fields are overridden in the dashboard, they should match the values above.

Also verify that no deployment protection rule is blocking automatic production promotion after a successful build unless that gate is intentional.

## Expected Delivery Flow

1. Open a pull request.
2. GitHub Actions runs `Code Quality` and `Lint and Security Analysis`.
3. Vercel creates a preview deployment for the pull request.
4. Merge into `main`.
5. GitHub Actions runs again on `main`.
6. Vercel creates and promotes the production deployment from `main`.
7. GitHub Actions publishes a Docker image to GHCR on `main` and version tags.

## Security Maintenance

The repository includes an automated security autofix workflow that:

- runs on a schedule or manual dispatch
- applies `pnpm audit --fix`
- reruns lint, test, and build
- opens a pull request instead of writing directly to `main`

Review those pull requests carefully because `pnpm audit --fix` may add `overrides` rather than upgrading direct dependencies cleanly.

## Docker Artifact

The published image is built from [Dockerfile](/home/polo/Documents/Neurolab/website/Dockerfile:1) and pushed to `ghcr.io/<owner>/<repo>`.

It is suitable for:

- local container testing
- alternate hosting targets
- release artifact distribution

It is not currently connected to an automated runtime deployment target.

## Operational Checks

After each production deployment, verify:

- the deployed site loads at the production domain
- client-side routing works on refresh for nested routes
- the latest commit SHA matches the active deployment
- no Vercel deployment is left in a waiting or protection-blocked state

## Repo Hygiene Follow-Up

The repository still contains multiple lockfiles. If `pnpm` is the permanent standard, clean this up in a dedicated follow-up change:

- keep `pnpm-lock.yaml`
- remove unused lockfiles
- make sure local development, CI, Vercel, and Docker all use the same package manager
