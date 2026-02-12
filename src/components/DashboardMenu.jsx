import Link from 'next/link';

export default function DashboardMenu({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" href="/dashboard">
          <i className="bi bi-speedometer2 me-2"></i>Dashboard
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dashboardNav" aria-controls="dashboardNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="dashboardNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/orders">Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/production">Production</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/departments">Departments</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/admin/permissions">Permissions</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-circle"></i> {user?.email || 'User'}
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" href="dashboard/logout">Logout</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
