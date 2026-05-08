# laundromatai-showcase

## Overview

This repository is a SAFE, NON-PROPRIETARY showcase of engineering patterns I use when building multi-tenant SaaS systems. It focuses on architecture style, separation of concerns, and implementation quality using fake data and generic examples.

Nothing in this repository is copied from production systems.

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

## How To Navigate

- Docs first:
  - docs/architecture.md
  - docs/offline-mode.md
  - docs/firestore-patterns.md
  - docs/multi-tenant-design.md
  - docs/cloud-functions-patterns.md
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

## Author

Sean Raynon
Founder & CTO - LaundromatAI
https://laundromatai.app
https://www.linkedin.com/in/seanraynon/
