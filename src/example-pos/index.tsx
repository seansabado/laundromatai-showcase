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
    <section className="module">
      <header className="module-header">
        <div>
          <h2>Example POS Module</h2>
          <p className="module-subtitle">
            Multi-tenant safe simulation of order flow, machine state, and
            offline queue behavior.
          </p>
        </div>

        <div className="status-stack">
          <span
            className={`status-pill ${isOnline ? "is-online" : "is-offline"}`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
          <span className="status-pill">Pending Actions: {pendingCount}</span>
        </div>
      </header>

      <div className="action-row">
        <button className="btn btn-primary" onClick={createFakeOrder}>
          Create Fake Order
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => void processQueue()}
          disabled={!isOnline}
        >
          Sync Queue
        </button>
      </div>

      <div className="section-grid">
        <section className="panel">
          <h3>Machines</h3>
          <div className="list-stack">
            {machines.map((machine) => (
              <article key={machine.machineId} className="row-card">
                <div>
                  <strong>{machine.machineId}</strong>
                  <div className="muted-row">
                    State: {machine.state} | Updated:{" "}
                    {formatDate(machine.updatedAt)}
                  </div>
                </div>

                <div className="chip-row">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setMachineState(machine.machineId, "idle")}
                  >
                    Idle
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => setMachineState(machine.machineId, "in_use")}
                  >
                    In Use
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      setMachineState(machine.machineId, "maintenance")
                    }
                  >
                    Maintenance
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Orders</h3>
          {orders.length === 0 ? (
            <p className="muted-empty">No orders yet.</p>
          ) : null}
          <div className="list-stack">
            {orders.map((order) => (
              <article key={order.id} className="row-card compact">
                <div>Order: {order.id}</div>
                <div>Created: {formatDate(order.createdAt)}</div>
                <div>Status: {order.status}</div>
                <div>Total: {formatCurrency(order.total)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Offline Queue</h3>
          {queue.length === 0 ? (
            <p className="muted-empty">Queue is empty.</p>
          ) : null}
          <div className="list-stack">
            {queue.map((action) => (
              <article key={action.actionId} className="row-card compact">
                <span>{action.type}</span>
                <span>{action.status}</span>
                <span>{formatDate(action.createdAt)}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};
