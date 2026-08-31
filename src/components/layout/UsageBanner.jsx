/**
 * UsageBanner.jsx — Daily design usage counter banner.
 * Fetches from /api/dashboard/usage and displays remaining count.
 * Hidden for test accounts. Shows warning when cap is exhausted.
 */
import { useEffect } from 'react';
import { useUsageStore } from '../../store/usageStore';

function formatResetTime(resetAt) {
  if (!resetAt) return '';
  try {
    const d = new Date(resetAt);
    return d.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch {
    return '';
  }
}

export default function UsageBanner() {
  const { count, cap, remaining, resetAt, isTestAccount, isLoading, fetchUsage } = useUsageStore();

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  // Test accounts and loading state — render nothing
  if (isTestAccount || isLoading) return null;

  const isCapped  = remaining === 0;
  const pct       = cap > 0 ? Math.round((count / cap) * 100) : 0;

  return (
    <div
      style={{
        margin: '0 auto 1.5rem',
        maxWidth: '640px',
        padding: '14px 20px',
        borderRadius: '14px',
        background: isCapped
          ? 'rgba(140,59,59,0.15)'
          : 'rgba(156,122,46,0.08)',
        border: `1px solid ${isCapped ? 'rgba(140,59,59,0.4)' : 'rgba(156,122,46,0.25)'}`,
        direction: 'rtl',
      }}
    >
      {isCapped ? (
        /* Exhausted state */
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.1rem' }}>⚠️</span>
          <div>
            <p style={{ margin: 0, fontWeight: 600, color: '#e87070', fontSize: '0.9rem' }}>
              استنفدت تصاميم اليوم
            </p>
            {resetAt && (
              <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                تتجدد في {formatResetTime(resetAt)}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Normal state */
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
              تصاميم اليوم
            </span>
            <span style={{ color: '#B08F42', fontWeight: 600, fontSize: '0.9rem' }}>
              {remaining} متبقي من {cap}
            </span>
          </div>
          {/* Progress bar */}
          <div style={{
            height: '4px', borderRadius: '4px',
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: '4px',
              width: `${pct}%`,
              background: pct > 80
                ? 'linear-gradient(90deg, #9C7A2E, #e87070)'
                : 'linear-gradient(90deg, #6E5720, #B08F42)',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
