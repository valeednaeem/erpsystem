'use client';

import { useState, useEffect } from 'react';
import PageHeader from '../../../../components/PageHeader.jsx';
import SectionCard from '../../../../components/SectionCard.jsx';

export default function PermissionsPage() {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('roles');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch roles - you'll need to create this API endpoint
      // const rolesRes = await fetch('/api/roles');
      // const rolesData = await rolesRes.json();
      // setRoles(rolesData.data || []);

      // Fetch users - you'll need to create this API endpoint
      // const usersRes = await fetch('/api/users');
      // const usersData = await usersRes.json();
      // setUsers(usersData.data || []);

      // Mock data for now
      setRoles([
        { id: 1, name: 'Admin', description: 'Full access to all features' },
        { id: 2, name: 'Manager', description: 'Department and team management' },
        { id: 3, name: 'Staff', description: 'Regular staff access' },
      ]);

      setUsers([
        { id: 1, email: 'admin@company.com', role: 'Admin' },
        { id: 2, email: 'manager@company.com', role: 'Manager' },
        { id: 3, email: 'staff@company.com', role: 'Staff' },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <PageHeader
        icon="shield-lock"
        title="Permissions & Roles Management"
        subtitle="Manage user roles and assign permissions"
      />

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="mb-4">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'roles' ? 'active' : ''}`}
                  onClick={() => setActiveTab('roles')}
                  type="button"
                  role="tab"
                >
                  <i className="bi bi-shield-check me-2"></i>Roles
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                  onClick={() => setActiveTab('users')}
                  type="button"
                  role="tab"
                >
                  <i className="bi bi-people me-2"></i>Users
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'permissions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('permissions')}
                  type="button"
                  role="tab"
                >
                  <i className="bi bi-key me-2"></i>Permissions
                </button>
              </li>
            </ul>
          </div>

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <SectionCard title="Role Management" icon="shield-check">
              <div className="row">
                {roles.map((role) => (
                  <div key={role.id} className="col-md-6 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{role.name}</h5>
                        <p className="card-text text-muted">{role.description}</p>
                        <button className="btn btn-sm btn-primary">Edit Permissions</button>
                        <button className="btn btn-sm btn-secondary ms-2">View Users</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <SectionCard title="User Management" icon="people">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Email</th>
                      <th>Current Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>
                          <span className="badge bg-primary">{user.role}</span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-warning me-2">Change Role</button>
                          <button className="btn btn-sm btn-info">Permissions</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}

          {/* Permissions Tab */}
          {activeTab === 'permissions' && (
            <SectionCard title="System Permissions" icon="key">
              <div className="row">
                <div className="col-md-6">
                  <h6>Available Permissions</h6>
                  <div className="list-group">
                    <label className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultChecked />
                      Create Orders
                    </label>
                    <label className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultChecked />
                      Edit Orders
                    </label>
                    <label className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultChecked />
                      Delete Orders
                    </label>
                    <label className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" />
                      Manage Users
                    </label>
                    <label className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" />
                      View Reports
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <h6>Department Permissions</h6>
                  <div className="list-group">
                    <label className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultChecked />
                      Sales & Marketing Access
                    </label>
                    <label className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultChecked />
                      Production Access
                    </label>
                    <label className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultChecked />
                      Inventory Access
                    </label>
                    <label className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" />
                      Finance Access
                    </label>
                    <label className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" />
                      HR Access
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button className="btn btn-success">
                  <i className="bi bi-check-circle me-2"></i>Save Changes
                </button>
              </div>
            </SectionCard>
          )}
        </>
      )}
    </div>
  );
}
