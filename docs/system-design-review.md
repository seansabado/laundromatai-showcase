# System Design Review (Showcase)

## Summary

This document presents a senior-level review lens for the showcase architecture, focusing on reliability, boundaries, and operability under realistic constraints.

## Scope

Reviewed components:

- UI and offline queue behavior in `src/example-pos/`
- Tenant boundary checks in `src/example-functions/`
- Shared hooks and typed contracts in `src/shared/`

Out of scope:

- Production infrastructure specifics
- Real schema implementation
- Proprietary business logic

## Bottleneck Analysis

- Queue processing loop:
  - Risk: burst actions may increase sync duration.
  - Mitigation: bounded retries, backoff scheduling, explicit queue metrics.

- Transition-heavy state updates:
  - Risk: invalid transitions cause inconsistent UX.
  - Mitigation: state machine guards and explicit transition errors.

- Tenant context hydration:
  - Risk: stale tenant context can pollute reads.
  - Mitigation: typed context + guard checks in callable layer.

## Failure Modes and Responses

| Failure Mode               | Impact                   | Detection                     | Mitigation                          |
| -------------------------- | ------------------------ | ----------------------------- | ----------------------------------- |
| Temporary network drop     | Delayed sync             | Queue growth and retry count  | Backoff and queued retry            |
| Permanent request error    | Action never syncs       | `failed` state + error class  | Operator reset/retry flow           |
| Invalid machine transition | Incorrect workflow state | Transition guard error        | Block transition and expose warning |
| Missing tenant ID          | Unauthorized access path | Guard throws `invalid-tenant` | Fail closed and log audit           |

## Scale Assumptions (Showcase)

- This sample models correctness first, not throughput.
- Queue and telemetry are memory-based to remain safe/public.
- Pattern scales by replacing fake adapters with durable storage and async workers.

## Operational Playbook (Sample)

- Detect:
  - Observe queue failure ratio and pending count trend.

- Triage:
  - Classify failed actions as transient or permanent.

- Recover:
  - Reset failed queue entries after fixing root issue.

- Learn:
  - Capture repeated failure signatures for guardrail improvements.

## Risks

- In-memory telemetry does not persist across reloads.
- Synthetic data cannot represent all production edge conditions.

## Next Steps

1. Add persisted telemetry snapshots for trend analysis.
2. Add load simulation for queue stress tests.
3. Add synthetic incident scripts and runbook validation tests.
