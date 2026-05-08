# Security Boundaries (Showcase)

## Summary

This showcase is intentionally designed to demonstrate secure engineering patterns while excluding all sensitive implementation details.

## Trust Boundaries

1. Client boundary:

- Browser state is untrusted.
- Tenant IDs from client input must be revalidated server-side.

1. Function boundary:

- Every callable action requires authentication.
- Tenant access is validated before any action logic.

1. Data boundary:

- Data access is tenant-scoped.
- Cross-tenant operations are denied by default.

## Data Classification

- All sample data in this repository is synthetic.
- No customer, production, or regulated data is included.
- No API keys, tokens, or credentials are stored.

## Security Controls Demonstrated

- `requireAuth` pattern for identity checks
- `verifyTenantAccess` pattern for tenant boundary enforcement
- `logAudit` pattern for traceability
- Typed request contracts to reduce unsafe assumptions

## Explicit Exclusions

- Real production architecture details
- Real schema designs
- Real security rules from any live system
- Real incident handling or internal runbooks
