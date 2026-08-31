/**
 * AccountTab.jsx — User account management.
 * Shows: profile info, brand kit link, usage summary, delete account flow, sign out.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/axios';
import { Palette, LogOut, Trash2, AlertTriangle, ChevronLeft } from 'lucide-react';

export default function AccountTab() {
  const navigate = useNavigate();
  const user     = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [showDeleteConfirm, setShowDeleteConfirm]       = useState(false);
  const [pendingDeletion, setPendingDeletion]            = useState(false);
  const [scheduledDeletionAt, setScheduledDeletionAt]   = useState(null);
  const [isDeleting, setIsDeleting]                     = useState(false);
  const [isCancelling, setIsCancelling]                 = useState(false);
  const [error, setError]                               = useState('');

  const handleSignOut = () => {
    clearAuth();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setError('');
    try {
      const { data } = await api.delete('/api/dashboard/account');
      setPendingDeletion(true);
      setScheduledDeletionAt(data.scheduledDeletionAt);
      setShowDeleteConfirm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء حذف الحساب.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDeletion = async () => {
    setIsCancelling(true);
    try {
      await api.post('/api/dashboard/account/cancel-deletion');
      setPendingDeletion(false);
      setScheduledDeletionAt(null);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء إلغاء الطلب.');
    } finally {
      setIsCancelling(false);
    }
  };

  const deletionDateStr = scheduledDeletionAt
    ? new Date(scheduledDeletionAt).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '2rem 1.5rem', direction: 'rtl' }}>

      {/* Pending deletion banner */}
      {pendingDeletion && (
        <div style={{
          marginBottom: '2rem', padding: '16px 20px', borderRadius: '14px',
          background: 'rgba(140,59,59,0.15)', border: '1px solid rgba(140,59,59,0.4)',
        }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#e87070', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} /> حسابك مجدول للحذف في {deletionDateStr}
          </p>
          <button
            onClick={handleCancelDeletion}
            disabled={isCancelling}
            style={{
              padding: '7px 18px', borderRadius: '8px', border: '1px solid rgba(140,59,59,0.5)',
              background: 'transparent', color: '#e87070', fontSize: '0.83rem', cursor: 'pointer',
            }}
          >
            {isCancelling ? 'جاري الإلغاء…' : 'إلغاء طلب الحذف'}
          </button>
        </div>
      )}

      {/* Profile card */}
      <div style={{
        padding: '24px', borderRadius: '20px', marginBottom: '1.5rem',
        background: 'rgba(26,26,26,0.7)', border: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0' }}>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid rgba(156,122,46,0.5)' }}
            />
          ) : (
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: 'rgba(156,122,46,0.2)', border: '2px solid rgba(156,122,46,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '1.3rem', color: '#B08F42',
            }}>
              {user?.displayName?.[0] || '؟'}
            </div>
          )}
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
              {user?.displayName || 'مستخدم'}
            </p>
            <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>
              {user?.email || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Actions list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

        {/* Brand Kit */}
        <ActionRow
          label="الهوية البصرية للمتجر"
          sublabel="تعديل الألوان والشعار وحسابات التواصل"
          icon={<Palette size={20} />}
          onClick={() => navigate('/brandkit')}
        />

        {/* Sign out */}
        <ActionRow
          label="تسجيل الخروج"
          sublabel="الخروج من الجلسة الحالية"
          icon={<LogOut size={20} />}
          onClick={handleSignOut}
          danger={false}
        />

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.5rem 0' }} />

        {/* Delete account */}
        {!pendingDeletion && (
          <ActionRow
            label="حذف الحساب"
            sublabel="سيُحذف حسابك نهائياً بعد 14 يوماً من التأكيد"
            icon={<Trash2 size={20} />}
            onClick={() => setShowDeleteConfirm(true)}
            danger
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{ marginTop: '1rem', padding: '12px 16px', borderRadius: '10px', background: 'rgba(140,59,59,0.15)', border: '1px solid rgba(140,59,59,0.4)' }}>
          <p style={{ margin: 0, color: '#e87070', fontSize: '0.85rem' }}>{error}</p>
        </div>
      )}

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{
            maxWidth: '420px', width: '100%', padding: '2rem',
            borderRadius: '20px', background: '#1A1A1A',
            border: '1px solid rgba(140,59,59,0.4)',
            direction: 'rtl',
          }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700, color: '#fff', fontFamily: 'Cairo, sans-serif' }}>
              هل أنت متأكد من حذف الحساب؟
            </h3>
            <p style={{ margin: '0 0 1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.7 }}>
              ستُحذف جميع بياناتك وتصاميمك نهائياً بعد 14 يوماً من تأكيد الحذف. يمكنك إلغاء طلب الحذف خلال هذه المدة.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                style={{
                  flex: 1, padding: '11px', borderRadius: '10px', border: 'none',
                  background: 'rgba(140,59,59,0.8)', color: '#fff', fontWeight: 600,
                  fontSize: '0.9rem', cursor: isDeleting ? 'not-allowed' : 'pointer',
                  opacity: isDeleting ? 0.6 : 1,
                }}
              >
                {isDeleting ? 'جاري…' : 'نعم، احذف حسابي'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  flex: 1, padding: '11px', borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent', color: 'rgba(255,255,255,0.8)',
                  fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sub-component ──────────────────────────────────────────────────────────── */
function ActionRow({ label, sublabel, icon, onClick, danger = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        width: '100%', padding: '16px 18px', borderRadius: '14px',
        border: `1px solid ${hovered ? (danger ? 'rgba(140,59,59,0.5)' : 'rgba(255,255,255,0.12)') : 'rgba(255,255,255,0.07)'}`,
        background: hovered ? (danger ? 'rgba(140,59,59,0.1)' : 'rgba(255,255,255,0.04)') : 'rgba(26,26,26,0.5)',
        cursor: 'pointer', textAlign: 'right', direction: 'rtl',
        transition: 'all 0.2s',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: danger ? '#e87070' : '#B08F42', minWidth: '32px', height: '32px', borderRadius: '8px', background: danger ? 'rgba(232,112,112,0.1)' : 'rgba(176,143,66,0.1)' }}>{icon}</span>
      <div style={{ flex: 1, marginRight: '8px' }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.92rem', color: danger ? '#e87070' : '#fff' }}>
          {label}
        </p>
        {sublabel && (
          <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
            {sublabel}
          </p>
        )}
      </div>
      <span style={{ color: 'rgba(255,255,255,0.2)' }}><ChevronLeft size={18} /></span>
    </button>
  );
}
