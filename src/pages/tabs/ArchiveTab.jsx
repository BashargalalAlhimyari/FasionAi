/**
 * ArchiveTab.jsx — Design archive with empty state and real-data grid.
 * Fetches from GET /api/dashboard/archive.
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios';

function EmptyState({ onCreateClick }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 1.5rem', direction: 'rtl' }}>
      <div style={{
        width: '100px', height: '100px', borderRadius: '24px',
        background: 'rgba(156,122,46,0.08)', border: '1px solid rgba(156,122,46,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.5rem', fontSize: '2.8rem', color: 'rgba(156,122,46,0.5)',
      }}>
        ◫
      </div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', fontFamily: 'Cairo, sans-serif' }}>
        لا توجد تصاميم بعد
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', maxWidth: '320px', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: '2rem' }}>
        تصاميمك ستظهر هنا بعد إنشاء أول تصميم. ابدأ الآن وحوّل صور منتجاتك إلى إبداعات احترافية.
      </p>
      <button
        onClick={onCreateClick}
        style={{
          padding: '12px 32px', borderRadius: '12px', border: 'none', cursor: 'pointer',
          fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Cairo, sans-serif',
          background: 'linear-gradient(135deg, #9C7A2E, #B08F42)',
          color: '#0D0D0D',
          boxShadow: '0 0 20px rgba(156,122,46,0.25)',
        }}
      >
        إنشاء أول تصميم
      </button>
    </div>
  );
}

function DesignCard({ design }) {
  const date = new Date(design.createdAt).toLocaleDateString('ar-SA', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <div style={{
      borderRadius: '16px', overflow: 'hidden',
      background: 'rgba(26,26,26,0.8)',
      border: '1px solid rgba(255,255,255,0.07)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ aspectRatio: '1/1', background: 'rgba(0,0,0,0.3)', overflow: 'hidden' }}>
        {design.thumbnailUrl ? (
          <img src={design.thumbnailUrl} alt="design" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '2rem' }}>✦</div>
        )}
      </div>
      <div style={{ padding: '10px 12px', direction: 'rtl' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>{date}</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <a
            href={design.fullImageUrl || design.thumbnailUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1, padding: '6px 0', borderRadius: '8px', textAlign: 'center',
              background: 'rgba(156,122,46,0.15)', border: '1px solid rgba(156,122,46,0.3)',
              color: '#B08F42', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600,
            }}
          >
            تحميل
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ArchiveTab() {
  const navigate  = useNavigate();
  const [designs, setDesigns]  = useState([]);
  const [loading, setLoading]  = useState(true);
  const [error,   setError]    = useState(null);
  const [page,    setPage]     = useState(1);
  const [total,   setTotal]    = useState(0);
  const LIMIT = 20;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.get(`/api/dashboard/archive?page=${page}&limit=${LIMIT}`)
      .then(({ data }) => {
        if (!cancelled) {
          setDesigns(data.designs);
          setTotal(data.pagination.total);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.data?.message || 'حدث خطأ أثناء تحميل الأرشيف.');
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [page]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>جاري التحميل…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', direction: 'rtl' }}>
        <p style={{ color: '#e87070', fontSize: '0.9rem' }}>{error}</p>
      </div>
    );
  }

  if (designs.length === 0) {
    return <EmptyState onCreateClick={() => navigate('/dashboard/create')} />;
  }

  return (
    <div style={{ padding: '1.5rem', direction: 'rtl' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#fff', fontFamily: 'Cairo, sans-serif' }}>
          الأرشيف
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
          {total} تصميم
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '1rem',
      }}>
        {designs.map((d) => <DesignCard key={d._id} design={d} />)}
      </div>

      {/* Pagination */}
      {total > LIMIT && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            style={{
              padding: '8px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent', color: page === 1 ? 'rgba(255,255,255,0.2)' : '#fff',
              cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: '0.85rem',
            }}
          >
            السابق
          </button>
          <span style={{ color: 'rgba(255,255,255,0.5)', alignSelf: 'center', fontSize: '0.85rem' }}>
            {page} / {Math.ceil(total / LIMIT)}
          </span>
          <button
            disabled={page >= Math.ceil(total / LIMIT)}
            onClick={() => setPage(p => p + 1)}
            style={{
              padding: '8px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent', color: page >= Math.ceil(total / LIMIT) ? 'rgba(255,255,255,0.2)' : '#fff',
              cursor: page >= Math.ceil(total / LIMIT) ? 'not-allowed' : 'pointer', fontSize: '0.85rem',
            }}
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}
