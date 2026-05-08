import { useCallback, useState } from "react";

export type PosFlowState =
  | "idle"
  | "drafting"
  | "queued_offline"
  | "submitted"
  | "syncing"
  | "error";

const ALLOWED_TRANSITIONS: Record<PosFlowState, PosFlowState[]> = {
  idle: ["drafting"],
  drafting: ["queued_offline", "submitted", "idle"],
  queued_offline: ["syncing", "idle"],
  submitted: ["idle"],
  syncing: ["submitted", "error", "idle"],
  error: ["drafting", "idle"],
};

export const usePosStateMachine = () => {
  const [state, setState] = useState<PosFlowState>("idle");
  const [lastError, setLastError] = useState<string | null>(null);

  const canTransition = useCallback(
    (next: PosFlowState) => ALLOWED_TRANSITIONS[state].includes(next),
    [state],
  );

  const transition = useCallback(
    (next: PosFlowState, errorMessage?: string) => {
      if (!ALLOWED_TRANSITIONS[state].includes(next)) {
        setLastError(`Invalid transition: ${state} -> ${next}`);
        return false;
      }

      setState(next);
      setLastError(errorMessage ?? null);
      return true;
    },
    [state],
  );

  const reset = useCallback(() => {
    setState("idle");
    setLastError(null);
  }, []);

  return {
    state,
    lastError,
    canTransition,
    transition,
    reset,
  };
};
