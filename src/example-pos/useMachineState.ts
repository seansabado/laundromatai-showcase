import { useCallback, useState } from "react";
import type { MachineSnapshot, MachineState } from "../shared/types/pos";
import { fakeMachines } from "./fakeData";

const MACHINE_TRANSITIONS: Record<MachineState, MachineState[]> = {
  idle: ["in_use", "maintenance"],
  in_use: ["idle", "maintenance"],
  maintenance: ["idle"],
};

export const useMachineState = () => {
  const [machines, setMachines] = useState<MachineSnapshot[]>(fakeMachines);
  const [lastError, setLastError] = useState<string | null>(null);

  const canTransition = useCallback(
    (from: MachineState, to: MachineState) =>
      MACHINE_TRANSITIONS[from].includes(to),
    [],
  );

  const setMachineState = useCallback(
    (machineId: string, state: MachineState) => {
      let changed = false;

      setMachines((prev) =>
        prev.map((machine) =>
          machine.machineId === machineId
            ? (() => {
                if (!canTransition(machine.state, state)) {
                  setLastError(
                    `Invalid machine transition: ${machine.state} -> ${state}`,
                  );
                  return machine;
                }

                changed = true;
                setLastError(null);
                return {
                  ...machine,
                  state,
                  updatedAt: new Date().toISOString(),
                };
              })()
            : machine,
        ),
      );

      return changed;
    },
    [canTransition],
  );

  return {
    machines,
    setMachineState,
    canTransition,
    lastError,
  };
};
