import { cookies, headers } from 'next/headers';
import db from '../../../../lib/db.js';
import { DEPARTMENTS } from '../../../../lib/departments';

export default async function DepartmentPage({ params }) {
  const { slug } = params;

  // find department
  const dept = DEPARTMENTS.find((d) => d.slug === slug);
  if (!dept) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Not found</h2>
        <p>Department {slug} was not found.</p>
      </div>
    );
  }

  // read user id from cookie
  let userId = null;
  try {
    const cookieStore = cookies();
    userId = cookieStore.get('user_id')?.value ?? null;
  } catch (e) {
    const cookieHeader = headers().get('cookie') || '';
    const parsed = Object.fromEntries(
      cookieHeader.split('; ').filter(Boolean).map((c) => {
        const idx = c.indexOf('=');
        return [c.slice(0, idx), c.slice(idx + 1)];
      })
    );
    userId = parsed['user_id'] || null;
  }

  if (!userId) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Access Denied</h2>
        <p>You must be logged in as an administrator to view this page.</p>
      </div>
    );
  }

  const results = await db.query('SELECT id, email, role_id FROM users WHERE id = ?', [userId]);
  const user = results.length > 0 ? results[0] : null;

  if (!user || user.role_id !== 1) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Unauthorized</h2>
        <p>This department page is available to administrators only.</p>
      </div>
    );
  }

  // Admin view: show department details and placeholder management UI
  return (
    <div style={{ padding: 20 }}>
      <h1>{dept.name} — Admin</h1>
      <p>Slug: {dept.slug}</p>

      <section style={{ marginTop: 20 }}>
        <h3>Department Settings</h3>
        <p>Placeholder settings for {dept.name}. You can add forms here to edit department metadata.</p>
        <button style={{ padding: '8px 12px', background: '#3182ce', color: 'white', border: 'none', borderRadius: 6 }}>Edit Department</button>
        <button style={{ padding: '8px 12px', marginLeft: 8, background: '#e53e3e', color: 'white', border: 'none', borderRadius: 6 }}>Delete Department</button>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Role & Permission Quick Links</h3>
        <p>Links to manage which roles/permissions can access this department (scaffold only).</p>
        <ul>
          <li><a href="#">Assign role permissions</a></li>
          <li><a href="#">Assign user permissions</a></li>
        </ul>
      </section>
    </div>
  );
}
