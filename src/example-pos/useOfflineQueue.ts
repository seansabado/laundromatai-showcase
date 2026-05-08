import { useCallback, useMemo, useState } from "react";
import { makeId } from "../shared/utils/id";

export type QueueStatus = "queued" | "syncing" | "synced" | "failed";

export interface OfflineAction<T = Record<string, unknown>> {
  actionId: string;
  type: string;
  payload: T;
  createdAt: string;
  retryCount: number;
  status: QueueStatus;
}

export const useOfflineQueue = () => {
  const [queue, setQueue] = useState<OfflineAction[]>([]);

  const enqueue = useCallback(
    (type: string, payload: Record<string, unknown>) => {
      const action: OfflineAction = {
        actionId: makeId("action"),
        type,
        payload,
        createdAt: new Date().toISOString(),
        retryCount: 0,
        status: "queued",
      };

      setQueue((prev) => [...prev, action]);
      return action;
    },
    [],
  );

  const markStatus = useCallback((actionId: string, status: QueueStatus) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.actionId === actionId ? { ...item, status } : item,
      ),
    );
  }, []);

  const processQueue = useCallback(async () => {
    for (const action of queue) {
      if (action.status !== "queued" && action.status !== "failed") continue;
      markStatus(action.actionId, "syncing");
      try {
        // Fake sync delay to simulate network processing.
        await new Promise((resolve) => setTimeout(resolve, 150));
        markStatus(action.actionId, "synced");
      } catch {
        markStatus(action.actionId, "failed");
      }
    }
  }, [markStatus, queue]);

  const pendingCount = useMemo(
    () =>
      queue.filter(
        (item) => item.status === "queued" || item.status === "failed",
      ).length,
    [queue],
  );

  return {
    queue,
    enqueue,
    processQueue,
    pendingCount,
  };
};
