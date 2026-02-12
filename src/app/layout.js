import "./globals.css";
export const dynamic = "force-dynamic";
import { cookies } from 'next/headers';
import db from '../lib/db.js';
// import dynamic from 'next/dynamic';
import Link from "next/link";
import Script from "next/script";
import MainMenu from '../components/MainMenu.jsx';

// const LogoutButton = dynamic(() => import('../components/LogoutButton'));

export const metadata = {
  title: "Frontend Web App - Enterprise Resource Planning System",
  description: "The frontend web app for the presentation of the products being produced by the company running this software. The Enterprise Resource Planning System",
};

export default async function RootLayout({ children }) {
  let userId = null;
  let user = null;

  try {
    const cookieStore = await cookies();
    console.log(cookieStore);
    userId = cookieStore.get('user_id')?.value ?? null;

    if (userId) {
      const results = await db.query('SELECT id, email, role_id FROM users WHERE id = ?', [userId]);
      if (results.length > 0) user = results[0];
    }
  } catch (error) {
    console.error('[layout] Error:', error);
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
      </head>
      <body className="bg-light">
        <MainMenu />
        <main>
          {children}
        </main>
        <footer className="bg-dark text-white text-center py-3 mt-5">
          <p className="mb-0">&copy; 2026 ERP System. All rights reserved.</p>
        </footer>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></Script>
      </body>
    </html>
  );
}
