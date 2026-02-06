'use server';

import { cookies } from 'next/headers';
import db from '../../../lib/db.js';
import PageHeader from '../../../components/PageHeader.jsx';
import SectionCard from '../../../components/SectionCard.jsx';
import DashboardCard from '../../../components/DashboardCard.jsx';

export default async function OverviewPage() {
  let user = null;

  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user_id')?.value ?? null;

    if (userId) {
      const results = await db.query('SELECT id, email, role_id FROM users WHERE id = ?', [userId]);
      if (results.length > 0) user = results[0];
    }
  } catch (e) {
    console.error('[Overview] Error:', e);
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
        icon="graph-up"
        title="Overview & Reports"
        subtitle="Business analytics and performance metrics"
      />

      <div className="row mb-4">
        <DashboardCard
          icon="graph-up"
          title="Sales Growth"
          value="+24%"
          color="success"
        />
        <DashboardCard
          icon="clock-history"
          title="Pending Orders"
          value="45"
          color="warning"
        />
        <DashboardCard
          icon="check-circle"
          title="Completed"
          value="892"
          color="info"
        />
        <DashboardCard
          icon="exclamation-triangle"
          title="Issues"
          value="8"
          color="danger"
        />
      </div>

      <SectionCard title="Monthly Revenue" icon="bar-chart">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p className="text-muted">Chart will be displayed here with data from your database</p>
          <div style={{ height: '300px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}></div>
        </div>
      </SectionCard>

      <SectionCard title="Sales by Department" icon="pie-chart">
        <div className="row">
          <div className="col-md-6">
            <div style={{ padding: '1rem' }}>
              <div className="d-flex justify-content-between mb-2">
                <span>Sales & Marketing</span>
                <span className="badge bg-primary">25%</span>
              </div>
              <div className="progress" role="progressbar">
                <div className="progress-bar w-25"></div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div style={{ padding: '1rem' }}>
              <div className="d-flex justify-content-between mb-2">
                <span>Production</span>
                <span className="badge bg-success">35%</span>
              </div>
              <div className="progress" role="progressbar">
                <div className="progress-bar bg-success" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
