"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    // Bootstrap JS needs window
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-md-4 col-lg-3">

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              <h4 className="text-center mb-3 fw-bold">ERP System Login</h4>
              <p className="text-center text-muted mb-4">
                Sign in to continue
              </p>

              <form id="loginForm">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="admin@erm.local"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>

              <div
                id="loginError"
                className="alert alert-danger mt-3 d-none"
              ></div>

            </div>
          </div>

          <p className="text-center text-muted mt-3 small">
            © {new Date().getFullYear()} ERP Management System
          </p>

        </div>
      </div>
    </div>
  );
}
