import { useMemo, useState, type ReactNode } from "react";
import { TenantContext } from "./tenantContext";
import type { ShowcaseTenant } from "./tenantTypes";

const TENANTS: ShowcaseTenant[] = [
  {
    id: "tenant_demo_1",
    name: "Demo Tenant One",
    plan: "free",
    enabledFeatures: ["pos", "offline-queue"],
  },
  {
    id: "tenant_demo_2",
    name: "Demo Tenant Two",
    plan: "growth",
    enabledFeatures: ["pos", "offline-queue", "analytics"],
  },
];

interface Props {
  children: ReactNode;
}

export const TenantProvider = ({ children }: Props) => {
  const [currentTenantId, setCurrentTenantId] = useState<string>(TENANTS[0].id);

  const currentTenant = useMemo(
    () => TENANTS.find((tenant) => tenant.id === currentTenantId) ?? null,
    [currentTenantId],
  );

  return (
    <TenantContext.Provider
      value={{
        tenants: TENANTS,
        currentTenant,
        role: "owner",
        switchTenant: setCurrentTenantId,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const TenantSwitcher = () => {
  return (
    <TenantContext.Consumer>
      {(value) => {
        if (!value) return null;

        return (
          <label className="control">
            <span className="control-label">Active Tenant</span>
            <select
              className="control-input"
              value={value.currentTenant?.id ?? ""}
              onChange={(event) => value.switchTenant(event.target.value)}
            >
              {value.tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name} ({tenant.plan})
                </option>
              ))}
            </select>
          </label>
        );
      }}
    </TenantContext.Consumer>
  );
};
