'use server';

import React from 'react';
import { cookies } from 'next/headers';
import db from '../../lib/db.js';
import PageHeader from '../../components/PageHeader.jsx';
import DashboardCard from '../../components/DashboardCard.jsx';
import SectionCard from '../../components/SectionCard.jsx';
import Link from 'next/link.js';

export default async function DashboardPage() {
  let userId = null;
  let user = null;
  let isAdmin = false;

  try {
    const cookieStore = await cookies();
    userId = cookieStore.get('user_id')?.value ?? null;

    if (userId) {
      const results = await db.query('SELECT id, email, role_id FROM users WHERE id = ?', [userId]);
      if (results.length > 0) {
        user = results[0];
        isAdmin = user.role_id === 1;
      }
    }
  } catch (e) {
    console.error('[Dashboard] Error:', e);
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h2>Access Denied</h2>
        <p className="text-muted">Please login to access the dashboard.</p>
        <a href="/login" className="btn btn-primary">Login</a>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <PageHeader
        icon="speedometer2"
        title="Dashboard"
        subtitle="Welcome back! Here's your ERP overview"
      />

      {/* Dashboard Stats */}
      <div className="row mb-4">
        <DashboardCard
          icon="boxes"
          title="Total Orders"
          value="1,234"
          color="primary"
        />
        <DashboardCard
          icon="graph-up"
          title="Revenue"
          value="$45,600"
          color="success"
        />
        <DashboardCard
          icon="people"
          title="Users"
          value="156"
          color="info"
        />
        <DashboardCard
          icon="building"
          title="Departments"
          value="11"
          color="warning"
        />
      </div>

      {/* Quick Actions */}
      <SectionCard title="Quick Actions" icon="lightning-fill">
        <div className="row">
          <div className="col-md-3 mb-2">
            <a href="/dashboard/orders" className="btn btn-outline-primary w-100">
              <i className="bi bi-clipboard-check me-2"></i>View Orders
            </a>
          </div>
          <div className="col-md-3 mb-2">
            <a href="/dashboard/production" className="btn btn-outline-secondary w-100">
              <i className="bi bi-gear me-2"></i>Production Status
            </a>
          </div>
          <div className="col-md-3 mb-2">
            <a href="/dashboard/overview" className="btn btn-outline-info w-100">
              <i className="bi bi-graph-up me-2"></i>Reports
            </a>
          </div>
          {isAdmin && (
            <div className="col-md-3 mb-2">
              <Link href="/dashboard/departments" className="btn btn-outline-warning w-100">
                <i className="bi bi-building me-2"></i>Manage Departments
              </Link>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Admin Panel */}
      {isAdmin && (
        <SectionCard title="Administration Panel" icon="shield-lock">
          <div className="row">
            <div className="col-md-6">
              <h6>Department Management</h6>
              <p className="text-muted">Create, edit, and manage departments. Assign permissions and set department-specific rules.</p>
              <Link href="/dashboard/departments" className="btn btn-sm btn-primary">
                Manage Departments
              </Link>
            </div>
            <div className="col-md-6">
              <h6>User Permissions</h6>
              <p className="text-muted">Assign roles and permissions to users. Control access to specific features and departments.</p>
              <a href="/dashboard/admin/permissions" className="btn btn-sm btn-primary">
                Manage Permissions
              </a>
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
