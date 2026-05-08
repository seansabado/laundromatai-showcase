import { ExamplePosModule } from "./example-pos";
import { useTenantContext } from "./example-tenant/tenantContext";
import {
  TenantProvider,
  TenantSwitcher,
} from "./example-tenant/tenantSwitcher";

const ShowcaseHome = () => {
  const { currentTenant, role } = useTenantContext();

  return (
    <main className="app-shell">
      <header className="card">
        <h1>laundromatai-showcase</h1>
        <p>Safe, non-proprietary architecture and engineering patterns.</p>
        <TenantSwitcher />
        <p>
          Active role: <strong>{role}</strong>
        </p>
        <p>
          Active tenant: <strong>{currentTenant?.name ?? "none"}</strong>
        </p>
      </header>

      <section className="card">
        <ExamplePosModule />
      </section>
    </main>
  );
};

export default function App() {
  return (
    <TenantProvider>
      <ShowcaseHome />
    </TenantProvider>
  );
}
