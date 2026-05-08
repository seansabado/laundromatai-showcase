import { useMemo, useState } from "react";
import { fakeLineItems } from "./fakeData";
import { useOfflineQueue } from "./useOfflineQueue";
import { useMachineState } from "./useMachineState";
import { usePosStateMachine } from "./usePosStateMachine";
import { makeId } from "../shared/utils/id";
import { formatCurrency } from "../shared/utils/formatCurrency";
import { formatDate } from "../shared/utils/formatDate";
import { useOnlineStatus } from "../shared/hooks/useOnlineStatus";
import type { PosOrder } from "../shared/types/pos";

interface StatusPillProps {
  label: string;
  value: string;
}

const StatusPill = ({ label, value }: StatusPillProps) => (
  <div style={{ display: "inline-flex", gap: 6, marginRight: 8 }}>
    <strong>{label}:</strong>
    <span>{value}</span>
  </div>
);

export const ExamplePosModule = () => {
  const [orders, setOrders] = useState<PosOrder[]>([]);
  const [syncError, setSyncError] = useState<string | null>(null);

  const {
    queue,
    enqueue,
    processQueue,
    pendingCount,
    metrics,
    clearSynced,
    resetFailed,
  } = useOfflineQueue();
  const {
    machines,
    setMachineState,
    canTransition,
    lastError: machineError,
  } = useMachineState();
  const posFlow = usePosStateMachine();
  const isOnline = useOnlineStatus();

  const total = useMemo(
    () =>
      fakeLineItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0),
    [],
  );

  const createFakeOrder = () => {
    posFlow.transition("drafting");

    const order: PosOrder = {
      id: makeId("order"),
      tenantId: "tenant_demo_1",
      createdAt: new Date().toISOString(),
      status: isOnline ? "created" : "queued",
      items: fakeLineItems,
      total,
    };

    setOrders((prev) => [order, ...prev]);

    if (!isOnline) {
      enqueue("ORDER_CREATE", {
        orderId: order.id,
        total: order.total,
        idempotencyKey: `order:${order.id}`,
      });
      posFlow.transition("queued_offline");
    } else {
      posFlow.transition("submitted");
    }
  };

  const runSync = async () => {
    setSyncError(null);

    posFlow.transition("syncing");
    await processQueue(async (action) => {
      if (action.type === "ORDER_CREATE" && Math.random() < 0.25) {
        throw new Error("Transient network timeout");
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    const hasFailed = queue.some((item) => item.status === "failed");
    if (hasFailed) {
      setSyncError("Some queued actions failed. Reset and retry is available.");
      posFlow.transition("error", "sync_failed");
      return;
    }

    posFlow.transition("submitted");
  };

  return (
    <section
      style={{
        fontFamily: "sans-serif",
        display: "grid",
        gap: 12,
        maxWidth: 920,
      }}
    >
      <header>
        <h2>Example POS Module (Showcase)</h2>
        <div style={{ display: "grid", gap: 6 }}>
          <StatusPill label="Network" value={isOnline ? "Online" : "Offline"} />
          <StatusPill label="POS Flow" value={posFlow.state} />
          <StatusPill label="Pending" value={String(pendingCount)} />
        </div>
        <button onClick={createFakeOrder}>Create Fake Order</button>
        <button onClick={() => void runSync()} disabled={!isOnline}>
          Sync Queue
        </button>
        <button onClick={clearSynced}>Clear Synced</button>
        <button onClick={resetFailed}>Reset Failed</button>

        {posFlow.lastError ? (
          <p style={{ color: "#b45309" }}>Flow warning: {posFlow.lastError}</p>
        ) : null}
        {syncError ? <p style={{ color: "#b91c1c" }}>{syncError}</p> : null}
        {machineError ? (
          <p style={{ color: "#b91c1c" }}>{machineError}</p>
        ) : null}
      </header>

      <div>
        <h3>Machines</h3>
        {machines.map((machine) => (
          <div key={machine.machineId}>
            <strong>{machine.machineId}</strong> - {machine.state} -{" "}
            {formatDate(machine.updatedAt)}
            <button onClick={() => setMachineState(machine.machineId, "idle")}>
              Set Idle
            </button>
            <button
              disabled={!canTransition(machine.state, "in_use")}
              onClick={() => setMachineState(machine.machineId, "in_use")}
            >
              Set In Use
            </button>
            <button
              disabled={!canTransition(machine.state, "maintenance")}
              onClick={() => setMachineState(machine.machineId, "maintenance")}
            >
              Set Maintenance
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3>Orders</h3>
        {orders.length === 0 ? <p>No orders yet.</p> : null}
        {orders.map((order) => (
          <article key={order.id}>
            <div>Order: {order.id}</div>
            <div>Created: {formatDate(order.createdAt)}</div>
            <div>Status: {order.status}</div>
            <div>Total: {formatCurrency(order.total)}</div>
          </article>
        ))}
      </div>

      <div>
        <h3>Offline Queue</h3>
        <p>
          queued={metrics.queued} syncing={metrics.syncing} synced=
          {metrics.synced} failed={metrics.failed}
        </p>
        {queue.length === 0 ? <p>Queue is empty.</p> : null}
        {queue.map((action) => (
          <article
            key={action.actionId}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: 8,
              marginBottom: 8,
            }}
          >
            <div>
              <strong>{action.type}</strong> ({action.status})
            </div>
            <div>Created: {formatDate(action.createdAt)}</div>
            <div>Retries: {action.retryCount}</div>
            <div>Idempotency: {action.idempotencyKey}</div>
            {action.nextAttemptAt ? (
              <div>Next attempt: {formatDate(action.nextAttemptAt)}</div>
            ) : null}
            {action.lastError ? (
              <div style={{ color: "#b91c1c" }}>Error: {action.lastError}</div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
};
