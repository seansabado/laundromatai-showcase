import { useCallback, useMemo, useState } from "react";
import { makeId } from "../shared/utils/id";

export type QueueStatus = "queued" | "syncing" | "synced" | "failed";
export type QueueErrorClass = "none" | "transient" | "permanent";

const MAX_RETRIES = 3;

export interface OfflineAction<T = Record<string, unknown>> {
  actionId: string;
  idempotencyKey: string;
  type: string;
  payload: T;
  createdAt: string;
  retryCount: number;
  status: QueueStatus;
  errorClass: QueueErrorClass;
  lastError: string | null;
  syncedAt?: string;
  nextAttemptAt?: string;
}

type SyncFn = (action: OfflineAction) => Promise<void>;

const defaultSyncFn: SyncFn = async () => {
  await new Promise((resolve) => setTimeout(resolve, 120));
};

const classifyError = (error: unknown): QueueErrorClass => {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  if (
    message.includes("permission") ||
    message.includes("invalid") ||
    message.includes("schema")
  ) {
    return "permanent";
  }
  return "transient";
};

const backoffMs = (retryCount: number): number => {
  const base = 250;
  return base * Math.pow(2, retryCount);
};

export const useOfflineQueue = () => {
  const [queue, setQueue] = useState<OfflineAction[]>([]);

  const enqueue = useCallback(
    (type: string, payload: Record<string, unknown>) => {
      const action: OfflineAction = {
        actionId: makeId("action"),
        idempotencyKey: makeId("idem"),
        type,
        payload,
        createdAt: new Date().toISOString(),
        retryCount: 0,
        status: "queued",
        errorClass: "none",
        lastError: null,
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

  const processQueue = useCallback(
    async (syncFn: SyncFn = defaultSyncFn) => {
      for (const action of queue) {
        if (action.status !== "queued" && action.status !== "failed") continue;

        if (
          action.nextAttemptAt &&
          new Date(action.nextAttemptAt).getTime() > Date.now()
        ) {
          continue;
        }

        if (action.retryCount >= MAX_RETRIES) {
          continue;
        }

        markStatus(action.actionId, "syncing");
        try {
          await syncFn(action);
          setQueue((prev) =>
            prev.map((item) =>
              item.actionId === action.actionId
                ? {
                    ...item,
                    status: "synced",
                    syncedAt: new Date().toISOString(),
                    errorClass: "none",
                    lastError: null,
                    nextAttemptAt: undefined,
                  }
                : item,
            ),
          );
        } catch (error) {
          const errorClass = classifyError(error);
          const retryCount = action.retryCount + 1;
          const nextAttemptAt = new Date(
            Date.now() + backoffMs(action.retryCount),
          ).toISOString();

          setQueue((prev) =>
            prev.map((item) =>
              item.actionId === action.actionId
                ? {
                    ...item,
                    status:
                      errorClass === "permanent" || retryCount >= MAX_RETRIES
                        ? "failed"
                        : "queued",
                    retryCount,
                    errorClass,
                    lastError:
                      error instanceof Error
                        ? error.message
                        : "Unknown sync error",
                    nextAttemptAt:
                      errorClass === "permanent" || retryCount >= MAX_RETRIES
                        ? undefined
                        : nextAttemptAt,
                  }
                : item,
            ),
          );
        }
      }
    },
    [markStatus, queue],
  );

  const clearSynced = useCallback(() => {
    setQueue((prev) => prev.filter((item) => item.status !== "synced"));
  }, []);

  const resetFailed = useCallback(() => {
    setQueue((prev) =>
      prev.map((item) =>
        item.status === "failed"
          ? {
              ...item,
              status: "queued",
              retryCount: 0,
              errorClass: "none",
              lastError: null,
              nextAttemptAt: undefined,
            }
          : item,
      ),
    );
  }, []);

  const pendingCount = useMemo(
    () =>
      queue.filter(
        (item) => item.status === "queued" || item.status === "failed",
      ).length,
    [queue],
  );

  const metrics = useMemo(
    () => ({
      queued: queue.filter((item) => item.status === "queued").length,
      syncing: queue.filter((item) => item.status === "syncing").length,
      synced: queue.filter((item) => item.status === "synced").length,
      failed: queue.filter((item) => item.status === "failed").length,
    }),
    [queue],
  );

  return {
    queue,
    enqueue,
    processQueue,
    clearSynced,
    resetFailed,
    pendingCount,
    metrics,
  };
};
