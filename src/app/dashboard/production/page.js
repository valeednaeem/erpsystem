'use server';

import { cookies } from 'next/headers';
import db from '../../../lib/db.js';
import PageHeader from '../../../components/PageHeader.jsx';
import SectionCard from '../../../components/SectionCard.jsx';
import DashboardCard from '../../../components/DashboardCard.jsx';
import DataTable from '../../../components/DataTable.jsx';

export default async function ProductionPage() {
  let user = null;

  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user_id')?.value ?? null;

    if (userId) {
      const results = await db.query('SELECT id, email, role_id FROM users WHERE id = ?', [userId]);
      if (results.length > 0) user = results[0];
    }
  } catch (e) {
    console.error('[Production] Error:', e);
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
        icon="gear"
        title="Production Management"
        subtitle="Monitor production status and schedules"
        actions={
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>New Schedule
          </button>
        }
      />

      <div className="row mb-4">
        <DashboardCard
          icon="hammer"
          title="Active Tasks"
          value="23"
          color="primary"
        />
        <DashboardCard
          icon="hourglass-split"
          title="In Progress"
          value="8"
          color="info"
        />
        <DashboardCard
          icon="check-circle"
          title="Completed"
          value="142"
          color="success"
        />
        <DashboardCard
          icon="percent"
          title="Efficiency"
          value="94%"
          color="warning"
        />
      </div>

      <SectionCard title="Production Status by Department" icon="list-ul">
        <DataTable
          headers={['Department', 'Tasks', 'Completed', 'Efficiency', 'Status']}
          data={[
            { Department: 'Spinning', Tasks: '12', Completed: '10', Efficiency: '95%', Status: 'On Track' },
            { Department: 'Dying House', Tasks: '8', Completed: '6', Efficiency: '88%', Status: 'On Track' },
            { Department: 'Drying Section', Tasks: '5', Completed: '3', Efficiency: '92%', Status: 'Delayed' },
            { Department: 'Production', Tasks: '15', Completed: '12', Efficiency: '96%', Status: 'On Track' },
          ]}
        />
      </SectionCard>

      <SectionCard title="Production Timeline" icon="calendar-event">
        <div className="row">
          <div className="col-md-6">
            <h6>This Week</h6>
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex justify-content-between">
                  <span>Spinning Task #P001</span>
                  <span className="badge bg-success">90%</span>
                </div>
                <small className="text-muted">Due: Feb 7, 2026</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex justify-content-between">
                  <span>Dying Task #D002</span>
                  <span className="badge bg-warning">50%</span>
                </div>
                <small className="text-muted">Due: Feb 8, 2026</small>
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <h6>Next Week</h6>
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex justify-content-between">
                  <span>Production Task #PR001</span>
                  <span className="badge bg-secondary">0%</span>
                </div>
                <small className="text-muted">Due: Feb 14, 2026</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex justify-content-between">
                  <span>Warehouse Task #W001</span>
                  <span className="badge bg-secondary">0%</span>
                </div>
                <small className="text-muted">Due: Feb 15, 2026</small>
              </a>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
