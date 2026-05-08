# laundromatai-showcase

[![CI](https://github.com/seansabado/laundromatai-showcase/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/seansabado/laundromatai-showcase/actions/workflows/ci.yml)
[![Coverage](https://github.com/seansabado/laundromatai-showcase/actions/workflows/coverage.yml/badge.svg?branch=main)](https://github.com/seansabado/laundromatai-showcase/actions/workflows/coverage.yml)
[![Pages](https://github.com/seansabado/laundromatai-showcase/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/seansabado/laundromatai-showcase/actions/workflows/pages.yml)
[![Last Commit](https://img.shields.io/github/last-commit/seansabado/laundromatai-showcase?label=last%20commit)](https://github.com/seansabado/laundromatai-showcase/commits/main)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Recruiter Snapshot

This is a safe public portfolio repository that demonstrates how I design multi-tenant SaaS architecture, offline-first POS interaction patterns, callable guard composition, and engineering quality gates (tests + CI + docs) without exposing proprietary code.

## About Me

Sean Raynon  
Founder & CTO - LaundromatAI  
[https://laundromatai.app](https://laundromatai.app)  
[https://www.linkedin.com/in/seanraynon/](https://www.linkedin.com/in/seanraynon/)

## Overview

This repository is a SAFE, NON-PROPRIETARY showcase of engineering patterns I use when building multi-tenant SaaS systems. It focuses on architecture style, separation of concerns, and implementation quality using fake data and generic examples.

Nothing in this repository is copied from production systems.

## Live Demo

- GitHub Pages: [https://seansabado.github.io/laundromatai-showcase/](https://seansabado.github.io/laundromatai-showcase/)

If this link is not live yet, trigger the Pages workflow once from Actions and it will publish automatically.

## UI Demo Preview

![Showcase Demo](docs/assets/showcase-demo.gif)

## Architecture Diagram

![Architecture Overview](docs/assets/architecture-overview.png)

## Tech Stack

- Frontend: React 19, TypeScript, Vite
- Testing: Vitest, Testing Library
- Automation: GitHub Actions (CI, Coverage, Pages)
- Patterns: Offline queue, tenant context isolation, callable auth/guard/audit composition

## Quick Start

Run locally in under 2 minutes.

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

Quality commands:

```bash
npm run typecheck
npm run test
npm run build
```

Run full validation in one command:

```bash
npm run validate
```

## Demo

- App demo GIF: [docs/assets/showcase-demo.gif](docs/assets/showcase-demo.gif)
- Architecture image: [docs/assets/architecture-overview.png](docs/assets/architecture-overview.png)

## What This Repo Demonstrates

- Multi-tenant context and access-guard patterns
- Frontend composition for POS-like workflows
- Offline-first queue and sync concepts for PWA behavior
- Firestore-style hooks and data-loading abstractions (fake only)
- Callable Cloud Functions style wrappers for auth, tenant guard, and audit logging
- Shared utility and type organization for maintainable TypeScript codebases

## What It Does NOT Contain

- No proprietary source code
- No real Firestore schema
- No real customer or business data
- No real API keys, credentials, or environment variables
- No production deployment logic
- No sensitive algorithmic/business logic

## Measurable Outcomes

- Runnable app scaffold with one-command local startup
- CI quality gate on push and pull request:
  - typecheck
  - tests
  - build
- Unit tests included for:
  - offline queue lifecycle (`queued -> syncing -> synced`)
  - tenant guard allow/deny behavior
- Architecture decision records (ADR) included for key design choices
- Security boundaries and exclusions documented explicitly

## Design Tradeoffs

- Architecture rationale and alternatives: [docs/design-tradeoffs.md](docs/design-tradeoffs.md)
- ADR decision trail: [docs/adr/](docs/adr/)

## What I Would Improve With More Time

- Incremental roadmap: [docs/roadmap-next.md](docs/roadmap-next.md)

## How To Navigate

- Docs first:
  - docs/architecture.md
  - docs/offline-mode.md
  - docs/firestore-patterns.md
  - docs/multi-tenant-design.md
  - docs/cloud-functions-patterns.md
  - docs/security-boundaries.md
  - docs/case-study.md
  - docs/interview-walkthrough.md
  - docs/design-tradeoffs.md
  - docs/roadmap-next.md
  - docs/adr/
- Frontend examples:
  - src/example-pos/
  - src/example-tenant/
- Backend pattern examples:
  - src/example-functions/
- Shared patterns:
  - src/shared/hooks/
  - src/shared/utils/
  - src/shared/types/

## Intended Use

Use this repo as a portfolio artifact to discuss engineering approach, architecture tradeoffs, and code quality decisions in interviews, technical reviews, or client discovery conversations.

## Portfolio Positioning

- Case study narrative: `docs/case-study.md`
- Interview walkthrough script (5-minute + 15-minute): `docs/interview-walkthrough.md`
- Security and trust boundaries: `docs/security-boundaries.md`
- ADR decision trail: `docs/adr/*.md`
- Tradeoff rationale: `docs/design-tradeoffs.md`
- Future improvements and product-thinking roadmap: `docs/roadmap-next.md`

## Repository Governance

- Contribution guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security policy: [SECURITY.md](SECURITY.md)
- License: [LICENSE](LICENSE)

## Anti-Patterns Intentionally Avoided

- Global tenant state without scoped verification
- Cross-tenant data access assumptions
- Copying real production schema into public repository
- Client-only authorization checks for sensitive operations
- Silent offline failures without queue visibility
- Unstructured callable handlers without shared guard composition

## Author

See the About Me section near the top for profile and contact links.
