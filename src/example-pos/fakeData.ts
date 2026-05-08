import type { MachineSnapshot, PosLineItem } from "../shared/types/pos";

export const fakeLineItems: PosLineItem[] = [
  { id: "svc_wash_1", name: "Wash + Dry (8kg)", qty: 1, unitPrice: 180 },
  { id: "svc_fold_1", name: "Fold Service", qty: 1, unitPrice: 40 },
];

export const fakeMachines: MachineSnapshot[] = [
  { machineId: "WM-01", state: "idle", updatedAt: new Date().toISOString() },
  { machineId: "WM-02", state: "in_use", updatedAt: new Date().toISOString() },
  {
    machineId: "DR-01",
    state: "maintenance",
    updatedAt: new Date().toISOString(),
  },
];
