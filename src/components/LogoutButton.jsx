'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log('[LogoutButton] Logout successful, clearing session');
        // Wait a moment to ensure cookie is cleared on server
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Redirect to home and force refresh to clear session from layout
        router.push('/');
        router.refresh(); // Refresh to re-render layout without user session
      } else {
        console.error('[LogoutButton] Logout failed:', response.status);
        alert('Logout failed');
      }
    } catch (e) {
      console.error('[LogoutButton] Logout error:', e);
      alert('Logout error');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      disabled={isLoggingOut}
      style={{ 
        padding: '6px 12px', 
        borderRadius: 6, 
        background: '#e53e3e', 
        color: 'white', 
        border: 'none', 
        cursor: isLoggingOut ? 'not-allowed' : 'pointer',
        opacity: isLoggingOut ? 0.6 : 1,
      }}
    >
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </button>
  );
}
