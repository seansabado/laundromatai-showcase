# Failure Drill: Offline Checkout Resilience

## Summary

This drill demonstrates how the sample POS flow behaves during connectivity and validation failures.

## Goal

Validate that the system:

- Preserves user actions during offline periods
- Retries transient failures
- Surfaces permanent failures clearly
- Supports operator recovery paths

## Drill Scenarios

### Scenario A: Network drop during order creation

1. Simulate offline mode in browser.
2. Click "Create Fake Order".
3. Verify order appears and queue action is created.
4. Verify POS flow moves to `queued_offline`.

Expected outcome:

- No data loss in session
- Queue pending count increases

### Scenario B: Transient sync failure

1. Reconnect network.
2. Run "Sync Queue" repeatedly until one transient error is observed.
3. Inspect queue action:
   - status returns to `queued`
   - retryCount increments
   - errorClass is `transient`

Expected outcome:

- Retry path remains recoverable
- next attempt timestamp is scheduled

### Scenario C: Permanent validation failure

1. Force a permanent error path (invalid schema/permission style message).
2. Run sync.
3. Inspect queue action:
   - status becomes `failed`
   - errorClass is `permanent`

Expected outcome:

- Action is not endlessly retried
- Operator can use "Reset Failed" after corrective action

## Observability Checks

During drills, verify telemetry panel updates:

- sync success ratio
- queue failure ratio
- estimated sync latency

## Exit Criteria

- All scenarios reproduce expected states
- Recovery controls behave predictably
- No uncaught runtime errors occur
