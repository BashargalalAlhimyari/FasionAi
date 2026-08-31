/**
 * WizardShell.jsx — 8-step design creation wizard container.
 */
import { useWizardStore } from '../../store/wizardStore';
import Step1_UploadPhoto   from './Step1_UploadPhoto';
import Step2_Category      from './Step2_Category';
import Step3_ProductType   from './Step3_ProductType';
import Step4_ChooseModel   from './Step4_ChooseModel';
import Step5_Background    from './Step5_Background';
import Step6_DesignType    from './Step6_DesignType';
import Step7_BrandElements from './Step7_BrandElements';
import Step8_Review        from './Step8_Review';

const STEPS = [
  { label: 'صورة المنتج',   component: Step1_UploadPhoto   },
  { label: 'الفئة',         component: Step2_Category      },
  { label: 'نوع المنتج',    component: Step3_ProductType   },
  { label: 'الموديل',       component: Step4_ChooseModel   },
  { label: 'الخلفية',       component: Step5_Background    },
  { label: 'نوع التصميم',   component: Step6_DesignType    },
  { label: 'عناصر الهوية',  component: Step7_BrandElements },
  { label: 'مراجعة',        component: Step8_Review        },
];

function canAdvance(step, s) {
  switch (step) {
    case 1: return !!s.productPhotoPreview;
    case 2: return !!s.gender;
    case 3: return !!s.productType;
    case 4: return s.modelIndex !== null;
    case 5: return !!s.backgroundType;
    case 6: return !!s.designType;
    case 7: return true;
    case 8: return false;
    default: return false;
  }
}

export default function WizardShell() {
  const store       = useWizardStore();
  const currentStep = store.currentStep;
  const stepIndex   = currentStep - 1;
  const StepComponent = STEPS[stepIndex]?.component;
  const totalSteps  = STEPS.length;
  const progress    = (currentStep / totalSteps) * 100;
  const canGo       = canAdvance(currentStep, store);
  const isLastStep  = currentStep === totalSteps;

  return (
    <div dir="rtl" style={{ maxWidth: '640px', margin: '0 auto', paddingBottom: '4rem' }}>

      {/* ── Progress bar ─────────────────────────────────────── */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '0.75rem',
        }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            الخطوة {currentStep} من {totalSteps}
          </span>
          <span style={{
            fontSize: '0.8rem', fontWeight: 600,
            background: 'linear-gradient(to left, #D4AF37, #9C7A2E)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {STEPS[stepIndex]?.label}
          </span>
        </div>

        {/* Track */}
        <div style={{
          width: '100%', height: '3px',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: '999px', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(to left, #D4AF37, #9C7A2E)',
            borderRadius: '999px',
            transition: 'width 0.35s ease',
          }} />
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: i < stepIndex
                ? '#9C7A2E'
                : i === stepIndex
                  ? '#D4AF37'
                  : 'rgba(255,255,255,0.12)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>

      {/* ── Step content ─────────────────────────────────────── */}
      <div key={currentStep} style={{ animation: 'fade-in 0.22s ease forwards' }}>
        {StepComponent && <StepComponent />}
      </div>

      {/* ── Navigation buttons ──────────────────────────────── */}
      {!isLastStep && (
        <div style={{
          display: 'flex', gap: '0.75rem', marginTop: '2rem',
        }}>
          {currentStep > 1 && (
            <button
              onClick={store.goBack}
              style={{
                flex: '0 0 100px',
                padding: '0.875rem',
                borderRadius: '0.875rem',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.95rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
              }}
            >
              رجوع
            </button>
          )}
          <button
            onClick={store.goNext}
            disabled={!canGo}
            style={{
              flex: 1, padding: '0.875rem',
              borderRadius: '0.875rem', border: 'none',
              background: canGo
                ? 'linear-gradient(to left, #9C7A2E, #D4AF37)'
                : 'rgba(255,255,255,0.06)',
              color: canGo ? '#0D0D0D' : 'rgba(255,255,255,0.22)',
              fontSize: '0.95rem', fontWeight: 700,
              cursor: canGo ? 'pointer' : 'not-allowed',
              fontFamily: 'Cairo, sans-serif',
              boxShadow: canGo ? '0 0 20px rgba(156,122,46,0.3)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            التالي
          </button>
        </div>
      )}

      {/* Back button on review step */}
      {isLastStep && (
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={store.goBack}
            style={{
              padding: '0.625rem 1.5rem',
              borderRadius: '0.875rem',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.88rem', cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif',
            }}
          >
            ← رجوع لتعديل الاختيارات
          </button>
        </div>
      )}
    </div>
  );
}
