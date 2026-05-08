# laundromatai-showcase

[![CI](https://github.com/seansabado/laundromatai-showcase/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/seansabado/laundromatai-showcase/actions/workflows/ci.yml)
[![Coverage](https://github.com/seansabado/laundromatai-showcase/actions/workflows/ci.yml/badge.svg?branch=main&label=coverage)](https://github.com/seansabado/laundromatai-showcase/actions/workflows/ci.yml)
[![Last Commit](https://img.shields.io/github/last-commit/seansabado/laundromatai-showcase?label=last%20commit)](https://github.com/seansabado/laundromatai-showcase/commits/main)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **Safe to share.** No proprietary source, no real customer data, no credentials.  
> Everything here is fake data + generic patterns extracted from first principles.

## What You Can Learn From This Repo in 5 Minutes

This is a **runnable engineering showcase** of the patterns I apply when building multi-tenant SaaS systems. It is not a toy — the patterns mirror real production decisions:

| Pattern                    | What it proves                                                            |
| -------------------------- | ------------------------------------------------------------------------- |
| Tenant isolation guard     | Every data path scopes to `tenantId` before execution                     |
| Offline queue with retry   | Orders survive connectivity loss; no silent data loss                     |
| Failure-mode demo          | Simulate sync failure, inspect per-event trace log, watch retry lifecycle |
| Callable guard composition | Auth + tenant check + audit logging composable without repetition         |
| Firestore-style hooks      | Fake data loading that mirrors real Firestore query shape                 |
| Multi-tenant role access   | Role-checked UI + guard ensures least-privilege per role                  |

**Live demo →** [seansabado.github.io/laundromatai-showcase](https://seansabado.github.io/laundromatai-showcase/)

---

## Quick Start

```bash
npm install
npm run dev
# open http://localhost:5173
```

Quality gate (runs in CI on every push):

```bash
npm run typecheck   # zero TypeScript errors required
npm run test        # unit tests for queue lifecycle + tenant guard
npm run coverage    # coverage report in coverage/
npm run build       # production build must succeed
```

---

## 90-Second Demo Path

**See [docs/demo-script.md](docs/demo-script.md) for the full guided walkthrough.**

Quick version:

1. Open the app → observe the **Tenant Switcher** — switching context resets all state, no cross-tenant bleed
2. Go offline (DevTools → Network → Offline) → create orders → watch them queue instead of drop
3. Come back online → click **Sync Queue** → watch status transition `queued → syncing → synced`
4. Click **Simulate Fail** before syncing → watch the fail/retry cycle in the **Telemetry Log** panel

---

## Why This Is Safe to Share

- No proprietary source code
- No real Firestore schema or production collections
- No real customer, order, or financial data
- No API keys, credentials, or environment variables
- No production deployment logic
- No business-specific pricing or algorithmic logic

The fake data, hook signatures, and guard patterns are written from first principles to demonstrate _engineering judgment_, not to reproduce any employer's system.

---

## Architecture Decisions

See [docs/decisions-index.md](docs/decisions-index.md) for a summary of all ADRs.

| ADR                                                     | Decision                                                          |
| ------------------------------------------------------- | ----------------------------------------------------------------- |
| [ADR-0001](docs/adr/0001-tenant-isolation.md)           | Tenant isolation as a first-class constraint, not an afterthought |
| [ADR-0002](docs/adr/0002-offline-queue-strategy.md)     | Optimistic offline queue with explicit status lifecycle           |
| [ADR-0003](docs/adr/0003-callable-guard-composition.md) | Composable callable guards over ad-hoc per-function checks        |

---

## For Hiring Managers

**→ [docs/hiring-manager.md](docs/hiring-manager.md)** — One-page summary of what this repo demonstrates, what production-grade problems it addresses, and what to look for.

---

## How To Navigate

- **[docs/index.md](docs/index.md)** — Full docs navigation index
- [docs/demo-script.md](docs/demo-script.md) — Guided demo walkthrough
- [docs/hiring-manager.md](docs/hiring-manager.md) — Hiring manager one-pager
- [docs/architecture.md](docs/architecture.md) — System architecture overview
- [docs/decisions-index.md](docs/decisions-index.md) — All ADRs summarized
- [docs/feature-role-walkthrough.md](docs/feature-role-walkthrough.md) — Feature-to-role access map
- [docs/production-hardening.md](docs/production-hardening.md) — Production-hardening patterns documented
- [docs/offline-mode.md](docs/offline-mode.md) — Offline queue deep dive
- [docs/multi-tenant-design.md](docs/multi-tenant-design.md) — Multi-tenant isolation design
- [docs/security-boundaries.md](docs/security-boundaries.md) — What is and is not in scope
- [docs/case-study.md](docs/case-study.md) — Engineering case study narrative
- [docs/interview-walkthrough.md](docs/interview-walkthrough.md) — Interview-ready talking points

---

## Frontend examples

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

Sean Raynon
Founder & CTO - LaundromatAI
[https://laundromatai.app](https://laundromatai.app)
[https://www.linkedin.com/in/seanraynon/](https://www.linkedin.com/in/seanraynon/)
