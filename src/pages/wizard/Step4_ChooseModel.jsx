/**
 * Step4_ChooseModel.jsx — Model selection, auto-filtered by gender.
 */
import { useState } from 'react';
import { useWizardStore } from '../../store/wizardStore';
import { User } from 'lucide-react';
import { getModelsByCategory, MODEL_CATEGORIES } from '../../assets/models/modelLibrary';

function ModelCard({ model, isSelected, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative', aspectRatio: '3/4',
        borderRadius: '1rem', overflow: 'hidden',
        border: `2px solid ${isSelected ? '#D4AF37' : 'rgba(255,255,255,0.08)'}`,
        cursor: 'pointer', padding: 0, outline: 'none',
        transition: 'all 0.2s',
        boxShadow: isSelected ? '0 0 22px rgba(156,122,46,0.45)' : 'none',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {!imgError && (
        <img
          src={model.src} alt={model.label}
          onError={() => setImgError(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {/* Placeholder when image missing */}
      {imgError && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          background: 'linear-gradient(160deg, #1a1a2e 0%, #0f3460 100%)',
        }}>
          <User
            size={40}
            color="rgba(255,255,255,0.2)"
            strokeWidth={1.25}
          />
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)' }}>
            {model.label}
          </span>
        </div>
      )}

      {/* Selected indicator overlay */}
      {isSelected && (
        <div style={{
          position: 'absolute', top: '8px', right: '8px',
          width: '24px', height: '24px', borderRadius: '50%',
          background: '#D4AF37',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', color: '#0D0D0D', fontWeight: 700,
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)', zIndex: 2,
        }}>✓</div>
      )}

      {/* Label badge */}
      <div style={{
        position: 'absolute', bottom: '8px', left: '50%',
        transform: 'translateX(-50%)',
        padding: '3px 10px', borderRadius: '99px',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Cairo, sans-serif',
        color: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.8)',
        whiteSpace: 'nowrap', zIndex: 2,
        border: `1px solid ${isSelected ? 'rgba(212,175,55,0.3)' : 'transparent'}`,
      }}>
        {model.label}
      </div>
    </button>
  );
}

export default function Step4_ChooseModel() {
  const { gender, modelIndex, setModel } = useWizardStore();
  const activeGender = gender || 'men';
  const models = getModelsByCategory(activeGender);

  return (
    <div dir="rtl">
      <h2 style={headingStyle}>اختيار الموديل</h2>
      <p style={subStyle}>
        اختر الموديل {MODEL_CATEGORIES[activeGender] ? `(${MODEL_CATEGORIES[activeGender]})` : ''}
        {' '}الذي سيعرض منتجك في الصورة النهائية.
      </p>

      {/* Scrollable container if there are many models */}
      <div style={{ 
        maxHeight: '500px', 
        overflowY: 'auto', 
        paddingRight: '4px',
        marginBottom: '1rem',
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
          gap: '1rem' 
        }}>
          {models.map((model, idx) => (
            <ModelCard
              key={model.id} 
              model={model} 
              isSelected={modelIndex === idx}
              onClick={() => setModel(idx)}
            />
          ))}
        </div>
        
        {models.length === 0 && (
          <div style={{
            padding: '3rem 1rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.02)', borderRadius: '1rem',
            border: '1px dashed rgba(255,255,255,0.1)'
          }}>
            لا توجد صور موديلات لهذه الفئة حالياً.
          </div>
        )}
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
