/**
 * TopNav.jsx — Desktop top navigation bar (≥768px).
 * RTL-aware: logo on right, account on left.
 */
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const NAV_ITEMS = [
  { to: '/dashboard/create',    label: 'تصميم جديد',   icon: '✦' },
  { to: '/dashboard/templates', label: 'القوالب',       icon: '⊞' },
  { to: '/dashboard/occasions', label: 'مناسبات',       icon: '◈' },
  { to: '/dashboard/archive',   label: 'الأرشيف',       icon: '◫' },
];

export default function TopNav() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        background: 'rgba(13,13,13,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        direction: 'rtl',
      }}
    >
      {/* Logo / Brand name — right side in RTL */}
      <button
        onClick={() => navigate('/dashboard/create')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '10px',
          textDecoration: 'none', marginLeft: 'auto',
        }}
      >
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          overflow: 'hidden', border: '1px solid rgba(156,122,46,0.4)',
        }}>
          <img src="/logo.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span style={{
          fontWeight: 700, fontSize: '1.05rem',
          background: 'linear-gradient(135deg, #B08F42, #9C7A2E)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontFamily: 'Cairo, sans-serif',
        }}>
          FashionAI Studio
        </span>
      </button>

      {/* Navigation links — center */}
      <nav style={{ display: 'flex', gap: '0.25rem', margin: '0 2rem' }}>
        {NAV_ITEMS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '8px',
              textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
              transition: 'all 0.2s',
              color: isActive ? '#B08F42' : 'rgba(255,255,255,0.65)',
              background: isActive ? 'rgba(156,122,46,0.12)' : 'transparent',
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Account avatar — left side in RTL */}
      <button
        onClick={() => navigate('/dashboard/account')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '4px 8px', borderRadius: '10px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid rgba(156,122,46,0.5)' }}
          />
        ) : (
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'rgba(156,122,46,0.2)', border: '2px solid rgba(156,122,46,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#B08F42', fontWeight: 700, fontSize: '0.85rem',
          }}>
            {user?.displayName?.[0] || '؟'}
          </div>
        )}
      </button>
    </header>
  );
}
