/**
 * CreateTab.jsx — Design creation entry point (Phase 4+).
 * Shows the 7-step wizard or an intro screen if user hasn't started yet.
 */
import { useWizardStore } from '../../store/wizardStore';
import UsageBanner from '../../components/layout/UsageBanner';
import WizardShell from '../wizard/WizardShell';

export default function CreateTab() {
  const { started, start } = useWizardStore();

  if (!started) {
    return (
      <div dir="rtl" style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '2rem 1.5rem',
        minHeight: '60vh',
      }}>
        <UsageBanner />

        {/* Hero */}
        <div style={{
          width: '100px', height: '100px', borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(156,122,46,0.2), rgba(110,87,32,0.1))',
          border: '1px solid rgba(156,122,46,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.75rem', fontSize: '2.5rem',
          boxShadow: '0 0 40px rgba(156,122,46,0.15)',
        }}>
          ✦
        </div>

        <h1 style={{
          fontSize: '1.55rem', fontWeight: 700, color: '#fff',
          marginBottom: '0.625rem', textAlign: 'center',
          fontFamily: 'Cairo, sans-serif',
        }}>
          إنشاء تصميم جديد
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem',
          textAlign: 'center', maxWidth: '360px',
          lineHeight: 1.7, marginBottom: '2.25rem',
        }}>
          حوّل صور منتجاتك إلى تصاميم تسويقية احترافية في ثوانٍ باستخدام الذكاء الاصطناعي.
        </p>

        <button
          onClick={() => start()}
          style={{
            padding: '0.875rem 2.5rem',
            borderRadius: '0.875rem', border: 'none',
            cursor: 'pointer', fontWeight: 700,
            fontSize: '1rem', fontFamily: 'Cairo, sans-serif',
            background: 'linear-gradient(135deg, #9C7A2E, #D4AF37)',
            color: '#0D0D0D',
            boxShadow: '0 0 25px rgba(156,122,46,0.35)',
            transition: 'all 0.2s',
          }}
        >
          ابدأ التصميم
        </button>
      </div>
    );
  }

  // Wizard in progress
  return (
    <div dir="rtl" style={{ padding: '0.5rem 0' }}>
      <UsageBanner />
      <div style={{ marginTop: '1rem' }}>
        <WizardShell />
      </div>
    </div>
  );
}
