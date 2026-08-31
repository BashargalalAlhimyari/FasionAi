/**
 * Step6_DesignType.jsx — Output format / design type selection.
 */
import { useWizardStore } from '../../store/wizardStore';
import { ShoppingBag, Smartphone, Square } from 'lucide-react';

const TYPES = [
  {
    id: 'ecommerce',
    label: 'متجر إلكتروني',
    desc: 'صورة منتج رأسية للكتالوج ومتاجر التجزئة',
    ratio: '3:4', ratioW: 60, ratioH: 80,
    Icon: ShoppingBag,
  },
  {
    id: 'story',
    label: 'ستوري / ريلز',
    desc: 'تنسيق رأسي لإنستغرام وسناب شات',
    ratio: '9:16', ratioW: 45, ratioH: 80,
    Icon: Smartphone,
  },
  {
    id: 'square',
    label: 'بوست مربع',
    desc: 'تنسيق مربع لمنشورات السوشيال ميديا',
    ratio: '1:1', ratioW: 80, ratioH: 80,
    Icon: Square,
  },
];

export default function Step6_DesignType() {
  const { designType, setDesignType } = useWizardStore();

  return (
    <div dir="rtl">
      <h2 style={headingStyle}>نوع التصميم</h2>
      <p style={subStyle}>اختر التنسيق المناسب للمنصة التي ستنشر عليها.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {TYPES.map((type) => {
          const isSelected = designType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setDesignType(type.id)}
              style={{
                padding: '1rem 1.25rem', borderRadius: '1.125rem',
                border: `1.5px solid ${isSelected ? '#D4AF37' : 'rgba(255,255,255,0.08)'}`,
                background: isSelected ? 'rgba(156,122,46,0.1)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.125rem',
                textAlign: 'right', transition: 'all 0.2s', outline: 'none',
                boxShadow: isSelected ? '0 0 16px rgba(156,122,46,0.2)' : 'none',
              }}
            >
              {/* Aspect ratio visual */}
              <div style={{ flexShrink: 0, width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: `${type.ratioW * 0.46}px`, height: `${type.ratioH * 0.46}px`,
                  borderRadius: '4px',
                  border: `2px solid ${isSelected ? '#D4AF37' : 'rgba(255,255,255,0.2)'}`,
                  background: isSelected ? 'rgba(156,122,46,0.15)' : 'rgba(255,255,255,0.05)',
                  transition: 'all 0.2s',
                }} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  {/* Lucide icon */}
                  <type.Icon
                    size={16}
                    color={isSelected ? '#D4AF37' : 'rgba(255,255,255,0.55)'}
                    strokeWidth={2}
                  />
                  <span style={{
                    fontWeight: 700, fontSize: '0.95rem',
                    color: isSelected ? '#D4AF37' : '#fff',
                    fontFamily: 'Cairo, sans-serif',
                  }}>
                    {type.label}
                  </span>
                  <span style={{
                    fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px',
                    border: `1px solid ${isSelected ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    color: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.35)',
                  }}>
                    {type.ratio}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                  {type.desc}
                </div>
              </div>

              {isSelected && (
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: '#D4AF37', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', color: '#0D0D0D', fontWeight: 700,
                }}>✓</div>
              )}
            </button>
          );
        })}
      </div>
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
