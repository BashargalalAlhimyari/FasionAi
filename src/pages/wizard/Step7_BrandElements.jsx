/**
 * Step7_BrandElements.jsx — Per-account social toggles + logo toggle.
 * Reads user's brand kit social accounts and lets user select individually.
 */
import { useEffect, useState } from 'react';
import { useWizardStore } from '../../store/wizardStore';
import api from '../../lib/axios';
import {
  Bookmark, Camera, MessageCircle,
  Music2, Ghost, Hash, Phone, Link,
} from 'lucide-react';

const PLATFORM_LABELS = {
  instagram: 'إنستغرام',
  whatsapp: 'واتساب',
  tiktok: 'تيك توك',
  snapchat: 'سناب شات',
  x: 'X (تويتر)',
  phone: 'رقم الهاتف',
};

const PLATFORM_ICONS = {
  instagram: Camera,
  whatsapp: MessageCircle,
  tiktok: Music2,
  snapchat: Ghost,
  x: Hash,
  phone: Phone,
};

function Toggle({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      style={{
        width: '44px', height: '24px', borderRadius: '12px', border: 'none',
        background: value
          ? 'linear-gradient(to left, #9C7A2E, #D4AF37)'
          : 'rgba(255,255,255,0.1)',
        cursor: 'pointer', position: 'relative',
        transition: 'background 0.2s', flexShrink: 0, padding: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: '3px',
        right: value ? '3px' : 'calc(100% - 21px)',
        width: '18px', height: '18px', borderRadius: '50%',
        background: '#fff', transition: 'right 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }} />
    </button>
  );
}

export default function Step7_BrandElements() {
  const { showLogo, selectedSocials, setShowLogo, initSocials, toggleSocial } = useWizardStore();
  const [socials, setSocials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch store data to get social accounts
  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const { data } = await api.get('/api/store');
        const storeSocials = data.socialAccounts || [];
        setSocials(storeSocials);
        initSocials(storeSocials.map((s) => s.platform));
      } catch (err) {
        console.error('Failed to fetch store socials:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSocials();
  }, []); // eslint-disable-line

  return (
    <div dir="rtl">
      <h2 style={headingStyle}>عناصر الهوية</h2>
      <p style={subStyle}>اختر ما تريد إظهاره في التصميم النهائي من عناصر هويتك البصرية.</p>

      {/* Logo toggle */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>شعار المتجر</div>
        <div style={rowStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1 }}>
            <div style={iconBox(showLogo)}>
              <Bookmark size={18} color={showLogo ? '#D4AF37' : 'rgba(255,255,255,0.4)'} strokeWidth={2} />
            </div>
            <div>
              <div style={rowLabelStyle}>شعار المتجر</div>
              <div style={rowSubStyle}>يظهر في زاوية التصميم</div>
            </div>
          </div>
          <Toggle value={showLogo} onChange={setShowLogo} />
        </div>
      </div>

      {/* Social accounts */}
      <div style={{ ...sectionStyle, marginTop: '1rem' }}>
        <div style={sectionHeaderStyle}>حسابات التواصل</div>

        {socials.length === 0 ? (
          <div style={{
            padding: '1.25rem', textAlign: 'center',
            color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem',
            fontFamily: 'Cairo, sans-serif', lineHeight: 1.7,
          }}>
            لم تُضَف حسابات تواصل بعد.<br />
            <span style={{ color: '#D4AF37' }}>
              يمكنك إضافتها من إعدادات هوية المتجر.
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {socials.map((acc, i) => {
              const isOn = selectedSocials.includes(acc.platform);
              const isLast = i === socials.length - 1;
              const PlatformIcon = PLATFORM_ICONS[acc.platform] ?? Link;
              return (
                <div
                  key={i}
                  style={{
                    ...rowStyle,
                    borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    paddingBottom: isLast ? 0 : '0.875rem',
                    marginBottom: isLast ? 0 : '0.875rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1 }}>
                    <div style={{
                      ...iconBox(isOn),
                      background: isOn ? 'rgba(156,122,46,0.12)' : 'rgba(255,255,255,0.05)',
                    }}>
                      <PlatformIcon size={17} color={isOn ? '#D4AF37' : 'rgba(255,255,255,0.4)'} strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ ...rowLabelStyle, color: isOn ? '#fff' : 'rgba(255,255,255,0.45)' }}>
                        {PLATFORM_LABELS[acc.platform] ?? acc.platform}
                      </div>
                      <div style={rowSubStyle}>{acc.value}</div>
                    </div>
                  </div>
                  <Toggle value={isOn} onChange={() => toggleSocial(acc.platform)} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary */}
      {(showLogo || selectedSocials.length > 0) && (
        <div style={{
          marginTop: '1.25rem', padding: '0.875rem 1.125rem',
          borderRadius: '0.875rem',
          background: 'rgba(156,122,46,0.07)',
          border: '1px solid rgba(156,122,46,0.18)',
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
        }}>
          سيظهر في التصميم: {[
            showLogo ? 'الشعار' : null,
            ...selectedSocials.map((p) => PLATFORM_LABELS[p] ?? p),
          ].filter(Boolean).join(' · ')}
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
  marginBottom: '1.5rem', lineHeight: 1.6,
};
const sectionStyle = {
  padding: '1rem 1.25rem',
  borderRadius: '1rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.07)',
};
const sectionHeaderStyle = {
  fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em',
  color: 'rgba(255,255,255,0.3)', marginBottom: '0.875rem',
  textTransform: 'uppercase',
};
const rowStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
};
const rowLabelStyle = {
  fontWeight: 600, fontSize: '0.88rem', color: '#fff',
  fontFamily: 'Cairo, sans-serif',
};
const rowSubStyle = {
  fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)', marginTop: '2px',
  direction: 'ltr', textAlign: 'right',
};
const iconBox = (isActive) => ({
  width: '36px', height: '36px', borderRadius: '10px',
  background: isActive ? 'rgba(156,122,46,0.12)' : 'rgba(255,255,255,0.05)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0, transition: 'background 0.2s',
});
