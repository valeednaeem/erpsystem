export const metadata = {
  title: "ERP Management System - Wall-V",
  description: "The Enterprise Resource Planning System from Wall-V provides you all the aspects to manage your business efficiently.",
  keywords: "ERP, Enterprise Resource Planning, Business Management, Inventory, Production, Sales, Procurement, Human Resource Management",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex">
      <aside className="sidebar bg-dark text-white p-3">
        <h5>ERM System</h5>
        <nav>
          <a href="/dashboard/sales">Sales</a><br />
          <a href="/dashboard/production">Production</a><br />
          <a href="/dashboard/warehouse">Warehouse</a><br />
          <a href="/dashboard/inventory">Inventory</a><br />
          <a href="/dashboard/procurement">Procurement</a><br />
          <a href="/dashboard/hr">HR</a><br />
          <a href="/dashboard/admin">Admin</a>
        </nav>
      </aside>

      <main className="flex-fill p-4">
        {children}
      </main>
    </div>
  );
}
