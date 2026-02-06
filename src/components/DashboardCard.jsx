'use client';

export default function DashboardCard({ icon, title, value, color = 'primary', onClick }) {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0 cursor-pointer" style={{ cursor: 'pointer' }} onClick={onClick}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className={`text-${color} me-3`} style={{ fontSize: '2rem' }}>
              <i className={`bi bi-${icon}`}></i>
            </div>
            <div>
              <p className="text-muted mb-1">{title}</p>
              <h5 className="mb-0">{value}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
