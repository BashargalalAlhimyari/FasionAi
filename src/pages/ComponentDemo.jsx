/**
 * ComponentDemo — Phase 0 storybook-style demo page.
 * Shows every base component in both dark and light context.
 * Accessible at /demo in development.
 */
import { useState } from 'react';
import { Layers, ImageOff, Wand2, Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';
import {
  Button,
  Input,
  Card,
  Modal,
  ProgressBar,
  EmptyState,
  ErrorState,
  AILoadingComponent,
} from '../components/ui';
import { useThemeStore } from '../store/themeStore';

// ── Section wrapper ────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h2 className="text-heading-2 text-text-on-dark mb-1">{title}</h2>
      <div className="w-12 h-[2px] bg-accent-gold mb-6 rounded-full" />
      {children}
    </div>
  );
}

export default function ComponentDemo() {
  const { isDark, toggleTheme } = useThemeStore();
  const [modalOpen, setModalOpen]       = useState(false);
  const [progressStep, setProgressStep] = useState(3);
  const [inputVal, setInputVal]         = useState('');
  const [inputErr, setInputErr]         = useState('');

  return (
    <div className="min-h-dvh" style={{ background: 'var(--color-bg)' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-30 border-b px-6 py-4 flex items-center justify-between"
        style={{
          background: 'var(--color-primary)',
          borderColor: 'var(--color-border-neutral)',
        }}
      >
        <div>
          <h1 className="text-heading-3 text-text-on-dark">
            فاشن AI ستوديو — معرض المكونات
          </h1>
          <p className="text-caption text-text-on-dark-muted mt-0.5">
            Phase 0 — نظام التصميم
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-caption text-accent-gold border border-border-gold px-3 py-2 rounded hover:bg-accent-gold/10 transition-colors"
          id="theme-toggle-btn"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          {isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}
        </button>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 py-12">

        {/* ── 1. Buttons ─────────────────────────────────────── */}
        <Section title="الأزرار">
          <div className="flex flex-wrap gap-4 items-center">
            <Button id="btn-primary">زر أساسي</Button>
            <Button id="btn-secondary" variant="secondary">زر ثانوي</Button>
            <Button id="btn-ghost" variant="ghost">زر شفاف</Button>
            <Button id="btn-danger" variant="danger">حذف</Button>
            <Button id="btn-loading" loading>جاري الحفظ…</Button>
            <Button id="btn-sm" size="sm">صغير</Button>
            <Button id="btn-lg" size="lg">كبير</Button>
            <Button id="btn-disabled" disabled>معطّل</Button>
          </div>
        </Section>

        {/* ── 2. Input ───────────────────────────────────────── */}
        <Section title="حقول الإدخال">
          <div className="flex flex-col gap-4 max-w-md">
            <Input
              id="input-normal"
              label="اسم المتجر"
              placeholder="مثال: بوتيك لمسة"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <Input
              id="input-error"
              label="اسم المستخدم"
              placeholder="أدخل اسم المستخدم..."
              error="هذا الحقل مطلوب."
            />
            <Input
              id="input-hint"
              label="رقم الهاتف"
              placeholder="+966..."
              hint="سيظهر هذا الرقم على تصاميمك."
            />
          </div>
        </Section>

        {/* ── 3. Cards ──────────────────────────────────────── */}
        <Section title="البطاقات">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card id="card-default">
              <h3 className="text-heading-3 text-text-on-dark mb-2">بطاقة عادية</h3>
              <p className="text-body text-text-on-dark-muted">
                هذا نص تجريبي داخل بطاقة المكون القياسية.
              </p>
            </Card>
            <Card id="card-elevated" elevated>
              <h3 className="text-heading-3 text-text-on-dark mb-2">بطاقة مرتفعة</h3>
              <p className="text-body text-text-on-dark-muted">
                بطاقة ذات مستوى أعلى لتمييز المحتوى.
              </p>
            </Card>
            <Card id="card-with-action">
              <h3 className="text-heading-3 text-text-on-dark mb-2">بطاقة بإجراء</h3>
              <p className="text-body text-text-on-dark-muted mb-4">
                بطاقة تحتوي على زر إجراء.
              </p>
              <Button size="sm" id="card-action-btn">ابدأ الآن</Button>
            </Card>
          </div>
        </Section>

        {/* ── 4. Progress Bar ───────────────────────────────── */}
        <Section title="شريط التقدم">
          <div className="max-w-lg flex flex-col gap-6">
            <ProgressBar
              current={progressStep}
              total={7}
              stepLabel="اختيار الموديل"
            />
            <div className="flex gap-3">
              <Button
                id="progress-back"
                size="sm"
                variant="secondary"
                onClick={() => setProgressStep((s) => Math.max(1, s - 1))}
              >
                السابق
              </Button>
              <Button
                id="progress-next"
                size="sm"
                onClick={() => setProgressStep((s) => Math.min(7, s + 1))}
              >
                التالي
              </Button>
            </div>
          </div>
        </Section>

        {/* ── 5. Toast ──────────────────────────────────────── */}
        <Section title="الإشعارات (Toast)">
          <div className="flex flex-wrap gap-3">
            <Button
              id="toast-success"
              size="sm"
              variant="secondary"
              onClick={() => toast.success('تم إنشاء التصميم بنجاح!')}
            >
              نجاح
            </Button>
            <Button
              id="toast-error"
              size="sm"
              variant="danger"
              onClick={() => toast.error('حدث خطأ أثناء إنشاء التصميم.')}
            >
              خطأ
            </Button>
            <Button
              id="toast-info"
              size="sm"
              variant="ghost"
              onClick={() => toast('جاري معالجة طلبك...', { duration: 4000 })}
            >
              معلومة
            </Button>
          </div>
        </Section>

        {/* ── 6. Modal ──────────────────────────────────────── */}
        <Section title="النوافذ المنبثقة (Modal)">
          <Button id="open-modal-btn" onClick={() => setModalOpen(true)}>
            فتح النافذة
          </Button>
          <Modal
            open={modalOpen}
            onOpenChange={setModalOpen}
            title="تأكيد الإجراء"
            description="هل أنت متأكد من رغبتك في المتابعة؟ لا يمكن التراجع عن هذا الإجراء."
          >
            <div className="flex gap-3 justify-end mt-4">
              <Button
                id="modal-cancel-btn"
                variant="secondary"
                onClick={() => setModalOpen(false)}
              >
                إلغاء
              </Button>
              <Button
                id="modal-confirm-btn"
                variant="danger"
                onClick={() => {
                  setModalOpen(false);
                  toast.success('تم تنفيذ الإجراء.');
                }}
              >
                تأكيد
              </Button>
            </div>
          </Modal>
        </Section>

        {/* ── 7. Empty State ─────────────────────────────────── */}
        <Section title="الحالة الفارغة">
          <Card className="max-w-md">
            <EmptyState
              icon={Layers}
              title="لا توجد تصاميم بعد"
              description="ابدأ بإنشاء أول تصميم لمتجرك."
              actionLabel="إنشاء تصميم جديد"
              onAction={() => toast('سيتم توجيهك إلى منشئ التصاميم...')}
            />
          </Card>
        </Section>

        {/* ── 8. Error State ─────────────────────────────────── */}
        <Section title="حالة الخطأ">
          <div className="flex flex-col gap-6 max-w-md">
            <ErrorState
              variant="inline"
              title="فشل رفع الصورة"
              message="تعذّر رفع الصورة. يُرجى التحقق من الاتصال والمحاولة مجدداً."
              retryLabel="إعادة المحاولة"
              onRetry={() => toast('جاري إعادة المحاولة...')}
            />
            <Card>
              <ErrorState
                variant="block"
                title="حدث خطأ أثناء التوليد"
                message="حدث خطأ أثناء إنشاء التصميم. يُرجى المحاولة مرة أخرى."
                onRetry={() => toast.success('تم إعادة المحاولة.')}
              />
            </Card>
          </div>
        </Section>

        {/* ── 9. AI Loading ──────────────────────────────────── */}
        <Section title="شاشة التحميل (AI)">
          <Card className="max-w-sm mx-auto">
            <AILoadingComponent />
          </Card>
        </Section>

        {/* ── 10. Color Palette ──────────────────────────────── */}
        <Section title="لوحة الألوان">
          <div className="flex flex-wrap gap-3">
            {[
              ['bg-primary',       'Primary',       '#0D0D0D'],
              ['bg-secondary',     'Secondary',     '#1A1A1A'],
              ['bg-secondary-alt', 'Secondary Alt', '#262626'],
              ['bg-accent-gold',   'Accent Gold',   '#9C7A2E'],
              ['bg-accent-gold-hover', 'Gold Hover','#B08F42'],
              ['bg-accent-gold-muted', 'Gold Muted','#6E5720'],
              ['bg-success',       'Success',       '#6B7A4A'],
              ['bg-error',         'Error',         '#8C3B3B'],
            ].map(([cls, name, hex]) => (
              <div key={cls} className="flex flex-col items-center gap-1">
                <div
                  className={`w-16 h-16 rounded border border-[rgba(255,255,255,0.15)] ${cls}`}
                  title={hex}
                />
                <span className="text-[11px] text-text-on-dark-muted text-center leading-tight">
                  {name}
                  <br />
                  <span className="text-accent-gold">{hex}</span>
                </span>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}
