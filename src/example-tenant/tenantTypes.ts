import type {
  TenantInfo,
  TenantMembership,
  TenantRole,
} from "../shared/types/tenant";

export type ShowcaseTenant = TenantInfo;

export interface ShowcaseTenantContextValue {
  tenants: ShowcaseTenant[];
  currentTenant: ShowcaseTenant | null;
  role: TenantRole;
  switchTenant: (tenantId: string) => void;
}

export type ShowcaseMembership = TenantMembership;
