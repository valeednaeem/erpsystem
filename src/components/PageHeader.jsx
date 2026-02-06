'use client';

export default function PageHeader({ icon, title, subtitle, actions }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 className="mb-1">
          <i className={`bi bi-${icon} me-2`}></i>
          {title}
        </h1>
        {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
