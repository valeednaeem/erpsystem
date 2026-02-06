'use client';

export default function SectionCard({ title, icon, children }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-light border-0">
        <h5 className="mb-0">
          <i className={`bi bi-${icon} me-2`}></i>
          {title}
        </h5>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
