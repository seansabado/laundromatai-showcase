import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useOfflineQueue } from "./useOfflineQueue";

describe("useOfflineQueue", () => {
  it("enqueues actions and increments pending count", () => {
    const { result } = renderHook(() => useOfflineQueue());

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_1" });
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_2" });
    });

    expect(result.current.queue).toHaveLength(2);
    expect(result.current.pendingCount).toBe(2);
    expect(result.current.queue[0].status).toBe("queued");
  });

  it("marks queued actions as synced when processed", async () => {
    const { result } = renderHook(() => useOfflineQueue());

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_sync" });
    });

    await act(async () => {
      await result.current.processQueue();
    });

    expect(result.current.queue[0].status).toBe("synced");
    expect(result.current.pendingCount).toBe(0);
  });

  it("retries transient errors and keeps action queued", async () => {
    const { result } = renderHook(() => useOfflineQueue());

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_retry" });
    });

    await act(async () => {
      await result.current.processQueue(async () => {
        throw new Error("Temporary timeout");
      });
    });

    expect(result.current.queue[0].status).toBe("queued");
    expect(result.current.queue[0].retryCount).toBe(1);
    expect(result.current.queue[0].errorClass).toBe("transient");
  });

  it("marks action failed on permanent errors", async () => {
    const { result } = renderHook(() => useOfflineQueue());

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_perm" });
    });

    await act(async () => {
      await result.current.processQueue(async () => {
        throw new Error("Invalid schema");
      });
    });

    expect(result.current.queue[0].status).toBe("failed");
    expect(result.current.queue[0].errorClass).toBe("permanent");
  });
});
