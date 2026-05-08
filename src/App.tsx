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
      <div className="bg-orb orb-one" aria-hidden="true" />
      <div className="bg-orb orb-two" aria-hidden="true" />

      <header className="card hero-card">
        <span className="eyebrow">Engineering Showcase</span>
        <h1>laundromatai-showcase</h1>
        <p className="lead">
          Safe, non-proprietary architecture and engineering patterns styled to
          match the LaundromatAI marketing visual language.
        </p>

        <TenantSwitcher />

        <div className="meta-grid">
          <article className="meta-card">
            <span className="meta-label">Active role</span>
            <strong>{role}</strong>
          </article>
          <article className="meta-card">
            <span className="meta-label">Active tenant</span>
            <strong>{currentTenant?.name ?? "none"}</strong>
          </article>
          <article className="meta-card">
            <span className="meta-label">Plan tier</span>
            <strong>{currentTenant?.plan ?? "none"}</strong>
          </article>
        </div>
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
