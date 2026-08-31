/**
 * Step8_Review.jsx — Full summary of all wizard selections + Create CTA.
 * CTA is disabled in Phase 4.1, active in Phase 4.3.
 */
import { useWizardStore } from '../../store/wizardStore';

const GENDER_LABELS   = { men: 'رجالي', women: 'نسائي', kids: 'أطفال' };
const BACKGROUND_SCENES = {
  studio: 'ستوديو احترافي', outdoor: 'الهواء الطلق',
  cafe: 'كافيه', hotel: 'فندق فاخر', mall: 'ممر تسوق', minimal: 'مينيمال داكن',
};
const DESIGN_TYPES    = { ecommerce: 'متجر إلكتروني', story: 'ستوري / ريلز', square: 'بوست مربع' };
const PLATFORM_LABELS = {
  instagram: 'إنستغرام', whatsapp: 'واتساب', tiktok: 'تيك توك',
  snapchat: 'سناب شات', x: 'X', phone: 'هاتف',
};

const PRODUCT_LABELS = {
  shirts: 'قمصان وتيشيرتات', pants: 'بناطيل وجينز', jackets: 'جاكيتات وسترات',
  thobes: 'ثياب وأزياء رسمية', dresses: 'فساتين', abayas: 'عبايات',
  blouses: 'بلايز وتنانير', pants_w: 'بناطيل نسائية', kids_sets: 'طقم أطفال',
  kids_shirts: 'قمصان أطفال', kids_pants: 'بناطيل أطفال', girls_dress: 'فساتين بنات',
  shoes: 'أحذية', bags: 'حقائب', accessories: 'إكسسوار', watches: 'ساعات',
};

function Row({ label, value, extra }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.75rem 1.125rem',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {extra}
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', fontFamily: 'Cairo, sans-serif' }}>
          {value || '—'}
        </span>
      </div>
    </div>
  );
}

export default function Step8_Review() {
  const {
    productPhotoPreview, gender, productType, modelIndex,
    backgroundType, backgroundColor, backgroundScene,
    designType, showLogo, selectedSocials, reset,
  } = useWizardStore();

  const bgLabel = backgroundType === 'color'
    ? (backgroundColor === '#FFFFFF' ? 'أبيض' : backgroundColor)
    : BACKGROUND_SCENES[backgroundScene] ?? backgroundScene;

  const socialsLabel = selectedSocials.length > 0
    ? selectedSocials.map((p) => PLATFORM_LABELS[p] ?? p).join(' · ')
    : 'لا شيء';

  return (
    <div dir="rtl">
      <h2 style={headingStyle}>مراجعة الطلب</h2>
      <p style={subStyle}>تحقق من اختياراتك قبل إنشاء التصميم.</p>

      {/* Product photo preview */}
      {productPhotoPreview && (
        <div style={{
          marginBottom: '1.25rem', borderRadius: '1rem', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)', height: '150px',
          background: '#111',
        }}>
          <img
            src={productPhotoPreview}
            alt="صورة المنتج"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      )}

      {/* Summary table */}
      <div style={{
        borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)', overflow: 'hidden',
        marginBottom: '1.5rem',
      }}>
        <Row label="الفئة"      value={GENDER_LABELS[gender]} />
        <Row label="نوع المنتج" value={PRODUCT_LABELS[productType]} />
        <Row label="الموديل"    value={modelIndex !== null ? `موديل ${modelIndex + 1}` : null} />
        <Row
          label="الخلفية"
          value={bgLabel}
          extra={backgroundType === 'color' ? (
            <div style={{
              width: '14px', height: '14px', borderRadius: '3px',
              background: backgroundColor, border: '1px solid rgba(255,255,255,0.2)',
            }} />
          ) : <span style={{ fontSize: '0.9rem' }}>
            {backgroundType === 'scene' ? '🏙️' : ''}
          </span>}
        />
        <Row label="نوع التصميم" value={DESIGN_TYPES[designType]} />
        <Row label="الشعار"      value={showLogo ? 'يظهر' : 'مخفي'} />
        <div style={{ padding: '0.75rem 1.125rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>التواصل</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', justifyContent: 'flex-end', maxWidth: '60%' }}>
            {selectedSocials.length === 0 ? (
              <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)' }}>لا شيء</span>
            ) : selectedSocials.map((p) => (
              <span key={p} style={{
                fontSize: '0.72rem', padding: '2px 8px', borderRadius: '99px',
                background: 'rgba(156,122,46,0.15)',
                border: '1px solid rgba(156,122,46,0.3)',
                color: '#D4AF37', fontFamily: 'Cairo, sans-serif',
              }}>
                {PLATFORM_LABELS[p] ?? p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Create button — enabled in Phase 4.3 */}
      <button
        disabled
        title="سيتم تفعيله في المرحلة القادمة"
        style={{
          width: '100%', padding: '1.125rem', borderRadius: '1rem',
          border: 'none',
          background: 'linear-gradient(to left, #9C7A2E, #D4AF37)',
          color: '#0D0D0D', fontSize: '1.05rem', fontWeight: 700,
          cursor: 'not-allowed', opacity: 0.45,
          fontFamily: 'Cairo, sans-serif', marginBottom: '0.75rem',
        }}
      >
        ✦ إنشاء التصميم — قريباً
      </button>

      {/* Reset */}
      <button
        onClick={reset}
        style={{
          width: '100%', padding: '0.625rem',
          background: 'transparent', border: 'none',
          color: 'rgba(255,255,255,0.28)', fontSize: '0.82rem',
          cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
          textDecoration: 'underline',
        }}
      >
        إعادة البدء من الأول
      </button>
    </div>
  );
}

const headingStyle = {
  fontSize: '1.3rem', fontWeight: 700, color: '#fff',
  marginBottom: '0.5rem', fontFamily: 'Cairo, sans-serif',
};
const subStyle = {
  fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)',
  marginBottom: '1.5rem', lineHeight: 1.6,
};
