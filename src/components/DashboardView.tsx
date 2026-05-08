import { TrendingUp, ShoppingCart, Cpu, Radio, AlertTriangle } from "lucide-react";
import { useTenantContext } from "../example-tenant/tenantContext";
import { formatCurrency } from "../shared/utils/formatCurrency";
import { formatDate } from "../shared/utils/formatDate";

interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  accent?: string;
}

const KpiCard = ({ label, value, sub, icon, accent = "violet" }: KpiCardProps) => (
  <article className={`kpi-card kpi-${accent}`}>
    <div className="kpi-icon">{icon}</div>
    <div className="kpi-body">
      <span className="kpi-label">{label}</span>
      <strong className="kpi-value">{value}</strong>
      {sub && <span className="kpi-sub">{sub}</span>}
    </div>
  </article>
);

const RECENT_ORDERS = [
  { id: "order_9a1b", customer: "Maria Santos", status: "completed", total: 580, branch: "Makati Branch", createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString() },
  { id: "order_7f2c", customer: "Juan dela Cruz", status: "in_progress", total: 340, branch: "Makati Branch", createdAt: new Date(Date.now() - 22 * 60 * 1000).toISOString() },
  { id: "order_3e8d", customer: "Ana Reyes", status: "completed", total: 720, branch: "Quezon City Branch", createdAt: new Date(Date.now() - 41 * 60 * 1000).toISOString() },
  { id: "order_1d4f", customer: "Carlo Mendoza", status: "queued", total: 290, branch: "Makati Branch", createdAt: new Date(Date.now() - 58 * 60 * 1000).toISOString() },
  { id: "order_6b5a", customer: "Liza Bautista", status: "completed", total: 950, branch: "Quezon City Branch", createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString() },
];

const MACHINE_SUMMARY = [
  { id: "WM-01", type: "Washer", state: "in_use" },
  { id: "WM-02", type: "Washer", state: "idle" },
  { id: "WM-03", type: "Washer", state: "idle" },
  { id: "DR-01", type: "Dryer", state: "in_use" },
  { id: "DR-02", type: "Dryer", state: "maintenance" },
  { id: "DR-03", type: "Dryer", state: "in_use" },
];

const statusLabel: Record<string, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  queued: "Queued",
  failed: "Failed",
};

const statusClass: Record<string, string> = {
  completed: "badge-green",
  in_progress: "badge-violet",
  queued: "badge-slate",
  failed: "badge-red",
};

const machineClass: Record<string, string> = {
  idle: "machine-idle",
  in_use: "machine-inuse",
  maintenance: "machine-maint",
};

export const DashboardView = () => {
  const { currentBranch, currentTenant } = useTenantContext();

  return (
    <div className="dashboard-wrap">
      {/* Safe boundary notice */}
      <div className="safe-boundary-bar">
        <AlertTriangle size={13} />
        <span>
          Showcase data only — safe to share. Real customer data, financials, and
          credentials are not present.
        </span>
      </div>

      {/* KPI row */}
      <div className="kpi-grid">
        <KpiCard
          label="Revenue Today"
          value={formatCurrency(4280)}
          sub="↑ 12% vs yesterday"
          icon={<TrendingUp size={18} />}
          accent="violet"
        />
        <KpiCard
          label="Orders Today"
          value="23"
          sub={`${currentBranch?.name ?? "All branches"}`}
          icon={<ShoppingCart size={18} />}
          accent="cyan"
        />
        <KpiCard
          label="Machines Active"
          value="4 / 6"
          sub="1 in maintenance"
          icon={<Cpu size={18} />}
          accent="green"
        />
        <KpiCard
          label="Queue Pending"
          value="3"
          sub="Offline orders awaiting sync"
          icon={<Radio size={18} />}
          accent="amber"
        />
      </div>

      <div className="dashboard-cols">
        {/* Recent orders */}
        <section className="panel dashboard-panel">
          <h3>Recent Orders</h3>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Total</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id}>
                  <td className="order-id-cell">{order.id.slice(0, 12)}</td>
                  <td>{order.customer}</td>
                  <td className="muted-cell">{order.branch}</td>
                  <td>
                    <span className={`badge ${statusClass[order.status] ?? "badge-slate"}`}>
                      {statusLabel[order.status] ?? order.status}
                    </span>
                  </td>
                  <td>{formatCurrency(order.total)}</td>
                  <td className="muted-cell">{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Machine summary */}
        <section className="panel dashboard-panel">
          <h3>Machine Fleet</h3>
          <div className="machine-grid">
            {MACHINE_SUMMARY.map((m) => (
              <article key={m.id} className={`machine-tile ${machineClass[m.state] ?? ""}`}>
                <span className="machine-id">{m.id}</span>
                <span className="machine-type">{m.type}</span>
                <span className="machine-state-dot" />
                <span className="machine-state-label">{m.state.replace("_", " ")}</span>
              </article>
            ))}
          </div>

          {/* Plan tier note */}
          <div className="plan-tier-note">
            <span className="plan-badge plan-badge-growth">{currentTenant?.plan}</span>
            <span className="plan-note-text">
              Plan: <strong>{currentTenant?.plan}</strong> · {currentTenant?.enabledFeatures.length} features enabled
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
