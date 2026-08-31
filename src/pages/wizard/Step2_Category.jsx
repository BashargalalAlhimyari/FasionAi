/**
 * Step2_Category.jsx — Gender / Target category selection.
 */
import { useWizardStore } from '../../store/wizardStore';
import { User, Baby } from 'lucide-react';

// SVG icon for women (lucide doesn't have a women-specific icon, using UserRound)
function WomenIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M12 11v9" />
      <path d="M9 17h6" />
    </svg>
  );
}

const CATEGORIES = [
  {
    id: 'men',
    label: 'رجالي',
    desc: 'ملابس ومنتجات الرجال',
    Icon: ({ color, size }) => <User size={size} color={color} strokeWidth={2} />,
    gradient: 'linear-gradient(135deg, rgba(30,60,100,0.5), rgba(20,40,70,0.3))',
    border: 'rgba(80,120,180,0.35)',
    iconColor: '#6A9FD8',
  },
  {
    id: 'women',
    label: 'نسائي',
    desc: 'ملابس ومنتجات المرأة',
    Icon: ({ color, size }) => <WomenIcon size={size} color={color} />,
    gradient: 'linear-gradient(135deg, rgba(100,30,70,0.5), rgba(70,20,50,0.3))',
    border: 'rgba(180,80,130,0.35)',
    iconColor: '#D48FAB',
  },
  {
    id: 'kids',
    label: 'أطفال',
    desc: 'ملابس ومنتجات الأطفال',
    Icon: ({ color, size }) => <Baby size={size} color={color} strokeWidth={2} />,
    gradient: 'linear-gradient(135deg, rgba(30,100,60,0.5), rgba(20,70,40,0.3))',
    border: 'rgba(80,180,110,0.35)',
    iconColor: '#7BC99A',
  },
];

export default function Step2_Category() {
  const { gender, setGender } = useWizardStore();

  return (
    <div dir="rtl">
      <h2 style={headingStyle}>الفئة المستهدفة</h2>
      <p style={subStyle}>اختر الفئة التي ينتمي إليها منتجك لنعرض لك الخيارات المناسبة.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {CATEGORIES.map((cat) => {
          const isSelected = gender === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setGender(cat.id)}
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '1.125rem',
                border: `1.5px solid ${isSelected ? '#D4AF37' : cat.border}`,
                background: isSelected ? 'rgba(156,122,46,0.12)' : cat.gradient,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '1.25rem',
                textAlign: 'right', transition: 'all 0.22s', outline: 'none',
                boxShadow: isSelected ? '0 0 20px rgba(156,122,46,0.25)' : 'none',
              }}
            >
              {/* Icon box */}
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: isSelected ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${isSelected ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s',
              }}>
                <cat.Icon
                  size={24}
                  color={isSelected ? '#D4AF37' : cat.iconColor}
                />
              </div>

              {/* Label */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 700, fontSize: '1.05rem',
                  color: isSelected ? '#D4AF37' : '#fff',
                  marginBottom: '0.25rem', fontFamily: 'Cairo, sans-serif',
                }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>
                  {cat.desc}
                </div>
              </div>

              {/* Check */}
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.08)',
                border: `1.5px solid ${isSelected ? '#D4AF37' : 'rgba(255,255,255,0.15)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', color: '#0D0D0D', fontWeight: 700,
                flexShrink: 0, transition: 'all 0.2s',
              }}>
                {isSelected ? '✓' : ''}
              </div>
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
