/**
 * Step5_Background.jsx — Background selection.
 * Two tabs: Color picker | Environment scene (AI-generated).
 */
import { useWizardStore } from '../../store/wizardStore';
import {
  Camera, TreePine, Coffee, Building2,
  Store, Moon, Palette, ImageIcon,
  Circle,
} from 'lucide-react';

const SCENES = [
  { id: 'studio',  label: 'ستوديو احترافي', Icon: Camera,    desc: 'خلفية بيضاء مع إضاءة ناعمة' },
  { id: 'outdoor', label: 'الهواء الطلق',   Icon: TreePine,  desc: 'طبيعة خضراء وهواء منعش' },
  { id: 'cafe',    label: 'كافيه',           Icon: Coffee,    desc: 'أجواء دافئة ومريحة' },
  { id: 'hotel',   label: 'فندق فاخر',       Icon: Building2, desc: 'ديكور راقٍ وفاخر' },
  { id: 'mall',    label: 'ممر تسوق',        Icon: Store,     desc: 'بيئة تسوق عصرية' },
  { id: 'minimal', label: 'مينيمال داكن',    Icon: Moon,      desc: 'خلفية داكنة بسيطة' },
];

const SOLID_COLORS = [
  { hex: '#FFFFFF', label: 'أبيض' },
  { hex: '#F5F5F5', label: 'رمادي فاتح' },
  { hex: '#F0EBE0', label: 'كريمي' },
  { hex: '#E8F0E8', label: 'أخضر ناعم' },
  { hex: '#E8EAF0', label: 'أزرق ناعم' },
  { hex: '#0D0D0D', label: 'أسود' },
];

export default function Step5_Background() {
  const {
    backgroundType, backgroundColor, backgroundScene,
    setBackgroundColor, setBackgroundScene,
  } = useWizardStore();

  const activeTab = backgroundType === 'scene' ? 'scene' : 'color';

  return (
    <div dir="rtl">
      <h2 style={headingStyle}>الخلفية</h2>
      <p style={subStyle}>اختر لون خلفية أو مشهداً بيئياً سيُنشئه الذكاء الاصطناعي.</p>

      {/* Tab switcher */}
      <div style={{
        display: 'flex',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '0.875rem', padding: '4px',
        marginBottom: '1.5rem',
        border: '1px solid rgba(255,255,255,0.07)',
      }}>
        {[
          { id: 'color', label: 'لون', Icon: Palette },
          { id: 'scene', label: 'مشهد بيئي', Icon: ImageIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === 'color') setBackgroundColor(backgroundColor || '#FFFFFF');
              else setBackgroundScene(backgroundScene || 'studio');
            }}
            style={{
              flex: 1, padding: '0.625rem 0.5rem',
              borderRadius: '0.625rem', border: 'none',
              background: activeTab === tab.id
                ? 'linear-gradient(to left, #9C7A2E, #B08F42)'
                : 'transparent',
              color: activeTab === tab.id ? '#0D0D0D' : 'rgba(255,255,255,0.55)',
              fontWeight: activeTab === tab.id ? 700 : 400,
              fontSize: '0.875rem', cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.375rem',
            }}
          >
            <tab.Icon size={15} strokeWidth={2} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Color tab */}
      {activeTab === 'color' && (
        <div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem', marginBottom: '1.25rem',
          }}>
            {SOLID_COLORS.map((c) => {
              const isSelected = backgroundType === 'color' && backgroundColor === c.hex;
              return (
                <button
                  key={c.hex}
                  onClick={() => setBackgroundColor(c.hex)}
                  style={{
                    padding: 0, borderRadius: '0.875rem',
                    border: `2px solid ${isSelected ? '#D4AF37' : 'rgba(255,255,255,0.08)'}`,
                    overflow: 'hidden', cursor: 'pointer', outline: 'none',
                    boxShadow: isSelected ? '0 0 14px rgba(156,122,46,0.3)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    height: '56px', background: c.hex,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {isSelected && (
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: c.hex === '#0D0D0D' ? '#fff' : 'rgba(0,0,0,0.35)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem',
                        color: c.hex === '#0D0D0D' ? '#0D0D0D' : '#fff',
                        fontWeight: 700,
                      }}>✓</div>
                    )}
                  </div>
                  <div style={{
                    padding: '0.375rem', textAlign: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    fontSize: '0.72rem',
                    color: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                    fontFamily: 'Cairo, sans-serif',
                  }}>
                    {c.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom color picker */}
          <div style={{
            padding: '0.875rem 1.125rem', borderRadius: '0.875rem',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              style={{
                width: '44px', height: '44px', borderRadius: '0.5rem',
                border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                padding: 0, background: 'transparent',
              }}
            />
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif' }}>
                لون مخصص
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                {backgroundColor}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scene tab */}
      {activeTab === 'scene' && (
        <div>
          <div style={{
            padding: '0.625rem 1rem', marginBottom: '1rem',
            borderRadius: '0.75rem',
            background: 'rgba(156,122,46,0.07)',
            border: '1px solid rgba(156,122,46,0.2)',
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6,
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <ImageIcon size={14} color="rgba(212,175,55,0.7)" />
            سينشئ الذكاء الاصطناعي الخلفية البيئية المختارة تلقائياً خلف الموديل.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            {SCENES.map((scene) => {
              const isSelected = backgroundType === 'scene' && backgroundScene === scene.id;
              return (
                <button
                  key={scene.id}
                  onClick={() => setBackgroundScene(scene.id)}
                  style={{
                    padding: '1rem', borderRadius: '1rem',
                    border: `1.5px solid ${isSelected ? '#D4AF37' : 'rgba(255,255,255,0.08)'}`,
                    background: isSelected ? 'rgba(156,122,46,0.1)' : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer', textAlign: 'right', outline: 'none',
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? '0 0 14px rgba(156,122,46,0.2)' : 'none',
                    display: 'flex', flexDirection: 'column', gap: '0.5rem',
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: isSelected ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>
                    <scene.Icon
                      size={18}
                      color={isSelected ? '#D4AF37' : 'rgba(255,255,255,0.55)'}
                      strokeWidth={1.75}
                    />
                  </div>
                  <div style={{
                    fontWeight: 700, fontSize: '0.875rem',
                    color: isSelected ? '#D4AF37' : '#fff',
                    fontFamily: 'Cairo, sans-serif',
                  }}>
                    {scene.label}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)' }}>
                    {scene.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const headingStyle = {
  fontSize: '1.3rem', fontWeight: 700, color: '#fff',
  marginBottom: '0.5rem', fontFamily: 'Cairo, sans-serif',
};
const subStyle = {
  fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)',
  marginBottom: '1.25rem', lineHeight: 1.6,
};
