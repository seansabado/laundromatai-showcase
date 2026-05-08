# What I Would Improve With More Time

## Summary

This roadmap captures high-impact next steps that would increase realism while preserving the safe, non-proprietary scope.

## Priority 1

- Add integration tests for POS flow from draft to queued offline to synced submission.
- Improve offline conflict handling with a conflict classifier and operator resolution UI.
- Add deterministic retry scheduling with persisted metadata and jittered backoff.

## Priority 2

- Extend machine state handling with transition history and reason codes.
- Build richer fake adapters, including a tenant-scoped in-memory Firestore-like adapter.
- Add accessibility audits in CI, including keyboard and contrast checks.

## Priority 3

- Add a tracing demo that correlates queue action IDs with callable audit logs.
- Add scenario scripts such as network drop during checkout, permission denied, and retry exhaustion.
- Add static performance budget checks that fail CI on bundle or interaction regressions.

## Success Criteria

- Better realism without exposing proprietary logic
- Stronger reliability evidence for reviewers
- Clearer demonstration of product and operations thinking
