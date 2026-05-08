import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useMachineState } from "./useMachineState";

describe("useMachineState", () => {
  it("allows valid transition idle -> in_use", () => {
    const { result } = renderHook(() => useMachineState());

    const target = result.current.machines.find((m) => m.machineId === "WM-01");
    expect(target?.state).toBe("idle");

    act(() => {
      result.current.setMachineState("WM-01", "in_use");
    });

    const updated = result.current.machines.find(
      (m) => m.machineId === "WM-01",
    );
    expect(updated?.state).toBe("in_use");
  });

  it("blocks invalid transition maintenance -> in_use", () => {
    const { result } = renderHook(() => useMachineState());

    const target = result.current.machines.find((m) => m.machineId === "DR-01");
    expect(target?.state).toBe("maintenance");

    act(() => {
      result.current.setMachineState("DR-01", "in_use");
    });

    const after = result.current.machines.find((m) => m.machineId === "DR-01");
    expect(after?.state).toBe("maintenance");
    expect(result.current.lastError).toContain("Invalid machine transition");
  });
});
