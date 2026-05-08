# Docs Index

**[← Back to README](../README.md)**

This is the full documentation index for `laundromatai-showcase`.

---

## Start Here

| Doc                                                  | Purpose                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| [hiring-manager.md](hiring-manager.md)               | One-pager for hiring managers — what this repo proves and what to look at |
| [demo-script.md](demo-script.md)                     | 90-second guided demo walkthrough (Step 1 → 4)                            |
| [interview-walkthrough.md](interview-walkthrough.md) | How to explain this repo in a technical interview                         |
| [case-study.md](case-study.md)                       | Engineering narrative: the problem, the design, the outcome               |

---

## Architecture

| Doc                                                                              | Purpose                                               |
| -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [architecture.md](architecture.md)                                               | System architecture overview and component diagram    |
| [decisions-index.md](decisions-index.md)                                         | Summary index of all ADRs                             |
| [adr/0001-tenant-isolation.md](adr/0001-tenant-isolation.md)                     | ADR: Tenant isolation as a first-class constraint     |
| [adr/0002-offline-queue-strategy.md](adr/0002-offline-queue-strategy.md)         | ADR: Optimistic offline queue with explicit lifecycle |
| [adr/0003-callable-guard-composition.md](adr/0003-callable-guard-composition.md) | ADR: Composable callable guards                       |

---

## Patterns & Design

| Doc                                                        | Purpose                                            |
| ---------------------------------------------------------- | -------------------------------------------------- |
| [multi-tenant-design.md](multi-tenant-design.md)           | Multi-tenant isolation design in detail            |
| [offline-mode.md](offline-mode.md)                         | Offline queue deep dive                            |
| [cloud-functions-patterns.md](cloud-functions-patterns.md) | Callable Cloud Functions guard patterns            |
| [firestore-patterns.md](firestore-patterns.md)             | Firestore-style hook and data-loading abstractions |
| [feature-role-walkthrough.md](feature-role-walkthrough.md) | Feature-to-role access matrix and guard mechanics  |

---

## Production & Security

| Doc                                                | Purpose                                                    |
| -------------------------------------------------- | ---------------------------------------------------------- |
| [production-hardening.md](production-hardening.md) | What real production deployment of these patterns requires |
| [security-boundaries.md](security-boundaries.md)   | What is and is not in this repo — explicit exclusion list  |

---

## Assets

| File                                                                       | Purpose                  |
| -------------------------------------------------------------------------- | ------------------------ |
| [assets/ui-demo-laundromatai-app.png](assets/ui-demo-laundromatai-app.png) | UI screenshot of the app |

---

## For Teams & Hiring

| Doc                                | Purpose                                                               |
| ---------------------------------- | --------------------------------------------------------------------- |
| [pr-example.md](pr-example.md)     | Example self-review PR description — how I communicate in code review |
| [../CHANGELOG.md](../CHANGELOG.md) | Release history with dated entries                                    |
