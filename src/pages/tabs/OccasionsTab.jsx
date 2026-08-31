/**
 * OccasionsTab.jsx — Occasions feature (Phase 4 placeholder).
 */
export default function OccasionsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 1.5rem', direction: 'rtl' }}>
      <div style={{
        width: '100px', height: '100px', borderRadius: '24px',
        background: 'rgba(156,122,46,0.1)', border: '1px solid rgba(156,122,46,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.5rem', fontSize: '2.5rem',
      }}>
        ◈
      </div>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', fontFamily: 'Cairo, sans-serif' }}>
        مناسبات المتجر
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', maxWidth: '340px', lineHeight: 1.7, fontSize: '0.9rem' }}>
        صمّم منشورات مناسباتية بلمسة علامتك التجارية — رمضان، العيد، الجمعة البيضاء وأكثر. قريباً.
      </p>
    </div>
  );
}
