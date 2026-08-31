/**
 * Dashboard.jsx — Main application shell (Phase 3+).
 * Renders TopNav (desktop) or BottomNav (mobile) and the active tab via <Outlet>.
 */
import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import TopNav    from '../components/layout/TopNav';
import BottomNav from '../components/layout/BottomNav';

const MOBILE_BREAKPOINT = 768;

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#0D0D0D',
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(to bottom, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.75) 60%, rgba(13,13,13,0.95) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Navigation */}
      {isMobile ? <BottomNav /> : <TopNav />}

      {/* Page content */}
      <main
        style={{
          position: 'relative', zIndex: 1,
          paddingTop:    isMobile ? '1.5rem'  : '88px',   // 64px nav + 24px gap
          paddingBottom: isMobile ? '80px'    : '2rem',   // 64px bottom nav + gap
          paddingLeft:   '1rem',
          paddingRight:  '1rem',
          maxWidth:      '1100px',
          margin:        '0 auto',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
