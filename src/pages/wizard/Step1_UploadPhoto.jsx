/**
 * Step1_UploadPhoto.jsx — Product photo upload step.
 * Supports click-to-browse and drag-and-drop.
 * Validates: image files only, max 10 MB.
 */
import { useRef, useState } from 'react';
import { useWizardStore } from '../../store/wizardStore';
import { UploadCloud, Lightbulb } from 'lucide-react';

const MAX_MB = 10;
const MAX_BYTES = MAX_MB * 1024 * 1024;

export default function Step1_UploadPhoto() {
  const { productPhotoPreview, setProductPhoto } = useWizardStore();
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('يرجى اختيار صورة فقط (JPG، PNG، WebP)');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(`حجم الصورة يتجاوز ${MAX_MB} ميجابايت`);
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => setProductPhoto(file, e.target.result);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => processFile(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  return (
    <div dir="rtl">
      <h2 style={headingStyle}>صورة المنتج</h2>
      <p style={subStyle}>ارفع صورة واضحة لمنتجك على خلفية فاتحة للحصول على أفضل نتيجة.</p>

      {/* Drop zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          width: '100%',
          minHeight: '300px',
          borderRadius: '1.25rem',
          border: `2px dashed ${dragging ? '#D4AF37' : productPhotoPreview ? '#9C7A2E' : 'rgba(255,255,255,0.15)'}`,
          background: dragging
            ? 'rgba(156,122,46,0.08)'
            : productPhotoPreview
              ? 'rgba(156,122,46,0.04)'
              : 'rgba(255,255,255,0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {productPhotoPreview ? (
          <>
            <img
              src={productPhotoPreview}
              alt="معاينة المنتج"
              style={{
                maxWidth: '100%', maxHeight: '350px',
                objectFit: 'contain', borderRadius: '0.75rem',
                padding: '1rem',
              }}
            />
            {/* Change overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0, transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.opacity = 1; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; e.currentTarget.style.opacity = 0; }}
            >
              <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>تغيير الصورة</span>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            {/* Upload icon */}
            <div style={{
              width: '64px', height: '64px', borderRadius: '16px',
              background: 'rgba(156,122,46,0.12)',
              border: '1px solid rgba(156,122,46,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
              fontSize: '1.75rem',
            }}>
              <UploadCloud size={28} color="#D4AF37" strokeWidth={2} />
            </div>
            <p style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem' }}>
              اسحب الصورة هنا أو اضغط للاختيار
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
              JPG، PNG، WebP — بحد أقصى {MAX_MB} ميجابايت
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p style={{ color: '#e87070', fontSize: '0.83rem', marginTop: '0.75rem', textAlign: 'center' }}>
          {error}
        </p>
      )}

      {/* Tip */}
      {!productPhotoPreview && (
        <div style={{
          marginTop: '1.25rem',
          padding: '0.875rem 1.125rem',
          borderRadius: '0.875rem',
          background: 'rgba(156,122,46,0.06)',
          border: '1px solid rgba(156,122,46,0.15)',
          fontSize: '0.82rem',
          lineHeight: 1.7,
          display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
        }}>
          <Lightbulb size={16} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: 'rgba(255,255,255,0.75)' }}>نصيحة:</strong> الصور ذات الخلفية البيضاء أو الفاتحة تعطي أفضل نتائج مع الذكاء الاصطناعي.
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
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
