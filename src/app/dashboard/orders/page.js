'use server';

import { cookies } from 'next/headers';
import db from '../../../lib/db.js';
import PageHeader from '../../../components/PageHeader.jsx';
import SectionCard from '../../../components/SectionCard.jsx';
import DashboardCard from '../../../components/DashboardCard.jsx';
import DataTable from '../../../components/DataTable.jsx';

export default async function OrdersPage() {
  let user = null;

  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user_id')?.value ?? null;

    if (userId) {
      const results = await db.query('SELECT id, email, role_id FROM users WHERE id = ?', [userId]);
      if (results.length > 0) user = results[0];
    }
  } catch (e) {
    console.error('[Orders] Error:', e);
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h2>Access Denied</h2>
        <p className="text-muted">Please login to access this page.</p>
        <a href="/login" className="btn btn-primary">Login</a>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <PageHeader
        icon="clipboard-check"
        title="Orders Management"
        subtitle="View and manage all customer orders"
        actions={
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>New Order
          </button>
        }
      />

      <div className="row mb-4">
        <DashboardCard
          icon="box-seam"
          title="Total Orders"
          value="1,234"
          color="primary"
        />
        <DashboardCard
          icon="hourglass-split"
          title="Pending"
          value="156"
          color="warning"
        />
        <DashboardCard
          icon="check-circle"
          title="Completed"
          value="892"
          color="success"
        />
        <DashboardCard
          icon="x-circle"
          title="Cancelled"
          value="34"
          color="danger"
        />
      </div>

      <SectionCard title="Recent Orders" icon="list-check">
        <DataTable
          headers={['Order ID', 'Customer', 'Amount', 'Status', 'Date']}
          data={[
            { 'Order ID': '#ORD001', Customer: 'Acme Corp', Amount: '$1,200', Status: 'Completed', Date: '2026-02-01' },
            { 'Order ID': '#ORD002', Customer: 'TechCo', Amount: '$850', Status: 'Pending', Date: '2026-02-02' },
            { 'Order ID': '#ORD003', Customer: 'Global Traders', Amount: '$2,500', Status: 'Completed', Date: '2026-02-03' },
          ]}
        />
      </SectionCard>

      <SectionCard title="Orders by Status" icon="funnel">
        <div className="row">
          <div className="col-md-4">
            <div style={{ padding: '1rem' }}>
              <div className="d-flex justify-content-between mb-2">
                <span>Pending</span>
                <span className="badge bg-warning">156</span>
              </div>
              <div className="progress" role="progressbar">
                <div className="progress-bar bg-warning" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ padding: '1rem' }}>
              <div className="d-flex justify-content-between mb-2">
                <span>Completed</span>
                <span className="badge bg-success">892</span>
              </div>
              <div className="progress" role="progressbar">
                <div className="progress-bar bg-success" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ padding: '1rem' }}>
              <div className="d-flex justify-content-between mb-2">
                <span>Cancelled</span>
                <span className="badge bg-danger">34</span>
              </div>
              <div className="progress" role="progressbar">
                <div className="progress-bar bg-danger" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
