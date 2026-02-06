'use client';

import { useState, useEffect } from 'react';
import PageHeader from '../../../components/PageHeader.jsx';
import SectionCard from '../../../components/SectionCard.jsx';
import DataTable from '../../../components/DataTable.jsx';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch('/api/departments');
      const json = await res.json();
      if (json.success) setDepartments(json.data);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      alert('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.slug) {
      alert('Please fill all fields');
      return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/departments/${editingId}` : '/api/departments';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (json.success) {
        alert(`Department ${editingId ? 'updated' : 'created'} successfully`);
        setFormData({ name: '', slug: '' });
        setEditingId(null);
        setShowForm(false);
        fetchDepartments();
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleEdit = (row) => {
    setFormData({ name: row.name, slug: row.slug });
    setEditingId(row.id);
    setShowForm(true);
  };

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.name}"?`)) return;

    try {
      const res = await fetch(`/api/departments/${row.id}`, { method: 'DELETE' });
      const json = await res.json();

      if (json.success) {
        alert('Department deleted successfully');
        fetchDepartments();
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', slug: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="container-fluid py-4">
      <PageHeader
        icon="building"
        title="Department Management"
        subtitle="Create and manage your organization's departments"
        actions={
          !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              <i className="bi bi-plus-circle me-2"></i>Add Department
            </button>
          )
        }
      />

      {showForm && (
        <SectionCard title={editingId ? 'Edit Department' : 'New Department'} icon="pencil">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Department Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., Sales & Marketing"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Slug</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., sales-marketing"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-check-circle me-2"></i>{editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                <i className="bi bi-x-circle me-2"></i>Cancel
              </button>
            </div>
          </form>
        </SectionCard>
      )}

      <SectionCard title="Departments List" icon="list-ul">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <DataTable
            headers={['id', 'name', 'slug']}
            data={departments}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </SectionCard>
    </div>
  );
}
