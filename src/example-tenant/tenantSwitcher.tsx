import { useMemo, useState, type ReactNode } from "react";
import { TenantContext } from "./tenantContext";
import type { ShowcaseTenant, ShowcaseBranch } from "./tenantTypes";
import type { TenantRole } from "../shared/types/tenant";

const TENANTS: ShowcaseTenant[] = [
  {
    id: "tenant_demo_1",
    name: "Lola Nena's Laundry",
    plan: "growth",
    enabledFeatures: ["pos", "offline-queue", "analytics", "machines"],
  },
  {
    id: "tenant_demo_2",
    name: "SpinCycle Express",
    plan: "enterprise",
    enabledFeatures: ["pos", "offline-queue", "analytics", "machines", "hr", "payroll"],
  },
];

const ALL_BRANCHES: ShowcaseBranch[] = [
  {
    id: "branch_mkt_1",
    tenantId: "tenant_demo_1",
    name: "Makati Branch",
    location: "Ayala Ave, Makati",
  },
  {
    id: "branch_qc_1",
    tenantId: "tenant_demo_1",
    name: "Quezon City Branch",
    location: "Katipunan Ave, QC",
  },
  {
    id: "branch_pasig_1",
    tenantId: "tenant_demo_2",
    name: "Ortigas Center",
    location: "Pasig, Metro Manila",
  },
  {
    id: "branch_bgc_1",
    tenantId: "tenant_demo_2",
    name: "BGC Branch",
    location: "Taguig, Metro Manila",
  },
];

interface Props {
  children: ReactNode;
}

export const TenantProvider = ({ children }: Props) => {
  const [currentTenantId, setCurrentTenantId] = useState<string>(TENANTS[0].id);
  const [currentBranchId, setCurrentBranchId] = useState<string>(ALL_BRANCHES[0].id);
  const [previewRole, setPreviewRole] = useState<TenantRole>("owner");

  const currentTenant = useMemo(
    () => TENANTS.find((t) => t.id === currentTenantId) ?? null,
    [currentTenantId],
  );

  const branches = useMemo(
    () => ALL_BRANCHES.filter((b) => b.tenantId === currentTenantId),
    [currentTenantId],
  );

  const currentBranch = useMemo(
    () => branches.find((b) => b.id === currentBranchId) ?? branches[0] ?? null,
    [branches, currentBranchId],
  );

  const switchTenant = (tenantId: string) => {
    setCurrentTenantId(tenantId);
    const firstBranch = ALL_BRANCHES.find((b) => b.tenantId === tenantId);
    if (firstBranch) setCurrentBranchId(firstBranch.id);
  };

  return (
    <TenantContext.Provider
      value={{
        tenants: TENANTS,
        currentTenant,
        branches,
        currentBranch,
        role: "owner",
        previewRole,
        switchTenant,
        switchBranch: setCurrentBranchId,
        switchPreviewRole: setPreviewRole,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};
