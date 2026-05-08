import { useMemo, useState } from "react";
import { fakeLineItems } from "./fakeData";
import { useOfflineQueue } from "./useOfflineQueue";
import { useMachineState } from "./useMachineState";
import { makeId } from "../shared/utils/id";
import { formatCurrency } from "../shared/utils/formatCurrency";
import { formatDate } from "../shared/utils/formatDate";
import { useOnlineStatus } from "../shared/hooks/useOnlineStatus";
import type { PosOrder } from "../shared/types/pos";

export const ExamplePosModule = () => {
  const [orders, setOrders] = useState<PosOrder[]>([]);
  const { queue, enqueue, processQueue, pendingCount } = useOfflineQueue();
  const { machines, setMachineState } = useMachineState();
  const isOnline = useOnlineStatus();

  const total = useMemo(
    () =>
      fakeLineItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0),
    [],
  );

  const createFakeOrder = () => {
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
      });
    }
  };

  return (
    <section style={{ fontFamily: "sans-serif", display: "grid", gap: 12 }}>
      <header>
        <h2>Example POS Module (Showcase)</h2>
        <p>Status: {isOnline ? "Online" : "Offline"}</p>
        <p>Pending Offline Actions: {pendingCount}</p>
        <button onClick={createFakeOrder}>Create Fake Order</button>
        <button onClick={() => void processQueue()} disabled={!isOnline}>
          Sync Queue
        </button>
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
              onClick={() => setMachineState(machine.machineId, "in_use")}
            >
              Set In Use
            </button>
            <button
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
        {queue.length === 0 ? <p>Queue is empty.</p> : null}
        {queue.map((action) => (
          <div key={action.actionId}>
            <span>{action.type}</span> - <span>{action.status}</span> -{" "}
            <span>{formatDate(action.createdAt)}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
