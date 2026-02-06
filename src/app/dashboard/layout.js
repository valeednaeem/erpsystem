import React from 'react';
import DashboardMenu from '../../components/DashboardMenu.jsx';
import { cookies } from 'next/headers';
import db from '../../lib/db.js';

export const metadata = {
  title: "ERP Dashboard",
  description: "Enterprise Resource Planning System",
};

export default async function DashboardLayout({ children }) {
    let user = null;
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('user_id')?.value ?? null;
        if (userId) {
            const results = await db.query('SELECT id, email FROM users WHERE id = ?', [userId]);
            if (results.length > 0) user = results[0];
        }
    } catch (e) {
        // ignore
    }
    return (
        <>
            <DashboardMenu user={user} />
            <div className="container-fluid py-3">
                {children}
            </div>
        </>
    );
}
