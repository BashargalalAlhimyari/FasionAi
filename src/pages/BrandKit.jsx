import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../lib/axios';

const SOCIAL_PLATFORMS = [
  { id: 'instagram', label: 'إنستجرام' },
  { id: 'whatsapp', label: 'واتساب' },
  { id: 'tiktok', label: 'تيك توك' },
  { id: 'snapchat', label: 'سناب شات' },
  { id: 'x', label: 'إكس (تويتر)' },
  { id: 'phone', label: 'رقم الجوال' },
];

export default function BrandKit() {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState(null);
  const [formState, setFormState] = useState({
    storeName: '',
    colors: [],
    socialAccounts: []
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [newColorInput, setNewColorInput] = useState('#D4AF37'); // Default gold color
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    try {
      const { data } = await api.get('/api/store');
      setStoreData(data);
      setFormState({
        storeName: data.storeName || '',
        colors: data.colors || [],
        socialAccounts: data.socialAccounts || []
      });
    } catch (err) {
      console.error(err);
      setError('فشل في تحميل بيانات المتجر.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('حجم الصورة يجب أن لا يتجاوز 5 ميجابايت.');
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setIsDirty(true);
  };

  const handleNameChange = (newName) => {
    setFormState(prev => ({ ...prev, storeName: newName }));
    setIsDirty(true);
  };

  const handleAddColor = (colorHex) => {
    setFormState(prev => ({ ...prev, colors: [...prev.colors, colorHex] }));
    setIsDirty(true);
  };

  const handleRemoveColor = (index) => {
    setFormState(prev => {
      const newColors = [...prev.colors];
      newColors.splice(index, 1);
      return { ...prev, colors: newColors };
    });
    setIsDirty(true);
  };

  const handleAddSocial = () => {
    setFormState(prev => ({
      ...prev,
      socialAccounts: [...prev.socialAccounts, { platform: 'instagram', value: '' }]
    }));
    setIsDirty(true);
  };

  const updateSocialPlatform = (index, platform) => {
    setFormState(prev => {
      const newSocials = [...prev.socialAccounts];
      newSocials[index].platform = platform;
      return { ...prev, socialAccounts: newSocials };
    });
    setIsDirty(true);
  };

  const updateSocialValue = (index, value) => {
    setFormState(prev => {
      const newSocials = [...prev.socialAccounts];
      newSocials[index].value = value;
      return { ...prev, socialAccounts: newSocials };
    });
    setIsDirty(true);
  };

  const handleRemoveSocial = (index) => {
    setFormState(prev => {
      const newSocials = [...prev.socialAccounts];
      newSocials.splice(index, 1);
      return { ...prev, socialAccounts: newSocials };
    });
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!isDirty) return;

    if (!formState.storeName.trim()) {
      toast.error('اسم المتجر مطلوب');
      return;
    }

    try {
      setIsSaving(true);
      setError('');

      const formData = new FormData();
      formData.append('storeName', formState.storeName.trim());
      formData.append('colors', JSON.stringify(formState.colors));
      const validSocials = formState.socialAccounts.filter(s => s.value.trim() !== '');
      formData.append('socialAccounts', JSON.stringify(validSocials));

      if (logoFile) {
        formData.append('logo', logoFile);
      }

      const { data } = await api.put('/api/brandkit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStoreData(data);
      setFormState({
        storeName: data.storeName || '',
        colors: data.colors || [],
        socialAccounts: data.socialAccounts || []
      });
      setLogoFile(null);
      setLogoPreview(null);
      setIsDirty(false);
      toast.success('تم حفظ التعديلات بنجاح 🎉', {
        style: {
          background: 'linear-gradient(to left, #9C7A2E, #D4AF37)',
          color: '#0a0a0a',
          border: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
        },
      });
    } catch (err) {
      console.error(err);
      toast.error('فشل في حفظ التعديلات');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-white">جاري التحميل...</div>;
  }

  if (!storeData) {
    return <div className="p-8 text-center text-red-500">{error || 'بيانات المتجر غير متوفرة.'}</div>;
  }

  return (
    <div
      className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center relative overflow-hidden"
      style={{ padding: '3rem 1rem', backgroundImage: 'url(/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/70 to-neutral-950/95 z-0"></div>

      {/* Back Button */}
      <div style={{ width: '100%', maxWidth: '680px', display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem', marginTop: '1rem', zIndex: 20 }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors bg-neutral-900/50 hover:bg-neutral-800/80 rounded-xl border border-neutral-800/60 backdrop-blur-md"
          style={{ padding: '0.625rem 1.25rem' }}
        >
          <span>&rarr;</span>
          <span className="font-medium" style={{ fontSize: '0.9rem' }}>العودة</span>
        </button>
      </div>

      {/* Card */}
      <div
        className="w-full bg-neutral-900/50 backdrop-blur-2xl rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-neutral-800/60 z-10 relative mb-12"
        style={{ maxWidth: '680px', padding: '2rem 2.5rem' }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-gold/10 via-gold-light/10 to-gold/10 rounded-[2rem] blur-md opacity-50 -z-10"></div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="font-bold font-cairo bg-gradient-to-l from-gold-light via-gold to-white bg-clip-text text-transparent" style={{ fontSize: '1.875rem', marginBottom: '0.75rem' }}>
            تعديل هوية المتجر
          </h2>
          <p className="text-neutral-400" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
            قم بتحديث ألوان وشعار وحسابات التواصل لمتجرك.
          </p>
        </div>

        {/* Alerts */}
        {error && <div className="bg-red-950/40 border border-red-500/50 text-red-400 rounded-xl text-sm shadow-inner" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>{error}</div>}

        {/* Form sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* ── Store Name ─────────────────────────────────────── */}
          <div className="bg-neutral-950/30 rounded-2xl border border-neutral-800/50 shadow-inner" style={{ padding: '1.25rem 1.5rem' }}>
            <label className="block font-medium text-neutral-200" style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              اسم المتجر
            </label>
            <input
              type="text"
              value={formState.storeName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl text-white outline-none focus:border-gold transition-colors"
              style={{ padding: '0.75rem 1rem', fontSize: '0.95rem' }}
            />
          </div>

          {/* ── Logo ───────────────────────────────────────────── */}
          <div className="bg-neutral-950/30 rounded-2xl border border-neutral-800/50 shadow-inner" style={{ padding: '1.25rem 1.5rem' }}>
            <label className="block font-medium text-neutral-200" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
              شعار المتجر
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {/* Logo circle */}
              <div
                className="bg-neutral-900 border-2 border-dashed border-neutral-600 overflow-hidden shadow-inner flex-shrink-0"
                style={{ width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover bg-white" />
                ) : storeData.logoUrl ? (
                  <img src={storeData.logoUrl} alt="Logo" className="w-full h-full object-cover bg-white" />
                ) : (
                  <span className="text-neutral-500 text-xs text-center" style={{ padding: '0.5rem' }}>لا يوجد شعار</span>
                )}
              </div>
              {/* Button + hint */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium shadow-md transition-colors w-fit"
                  style={{ padding: '0.625rem 1.25rem', fontSize: '0.9rem' }}
                >
                  تغيير الشعار
                </button>
                <span className="text-neutral-500" style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>PNG، JPG، WebP<br />(حجم أقصى 5 ميجا)</span>
                <input type="file" ref={fileInputRef} onChange={handleLogoChange} accept="image/jpeg, image/png, image/webp" className="hidden" />
              </div>
            </div>
          </div>

          {/* ── Colors ─────────────────────────────────────────── */}
          <div className="bg-neutral-950/30 rounded-2xl border border-neutral-800/50 shadow-inner" style={{ padding: '1.25rem 1.5rem' }}>
            <label className="block font-medium text-neutral-200" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
              ألوان المتجر
            </label>
            {/* Color swatches */}
            {formState.colors?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1rem' }}>
                {formState.colors.map((color, index) => (
                  <div key={index} className="bg-neutral-900 rounded-xl border border-neutral-700 shadow-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.625rem' }}>
                    <div className="rounded-lg" style={{ width: '24px', height: '24px', backgroundColor: color, flexShrink: 0 }}></div>
                    <span style={{ fontSize: '0.8rem' }}>{color}</span>
                    <button onClick={() => handleRemoveColor(index)} className="text-red-500 hover:text-red-400 font-bold" style={{ fontSize: '1rem', lineHeight: 1, paddingLeft: '4px' }}>×</button>
                  </div>
                ))}
              </div>
            )}
            {/* Add color row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: formState.colors?.length > 0 ? '0.25rem' : '0' }}>
              <input
                type="color"
                value={newColorInput}
                onChange={(e) => setNewColorInput(e.target.value)}
                className="cursor-pointer bg-neutral-900 border-none rounded-lg p-0"
                style={{ width: '36px', height: '36px' }}
              />
              <button
                onClick={() => handleAddColor(newColorInput)}
                className="bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-colors shadow-sm"
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                إضافة لون
              </button>
            </div>
          </div>

          {/* ── Social Accounts ─────────────────────────────────── */}
          <div className="bg-neutral-950/30 rounded-2xl border border-neutral-800/50 shadow-inner" style={{ padding: '1.25rem 1.5rem' }}>
            <label className="block font-medium text-neutral-200" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
              حسابات التواصل
            </label>

            {formState.socialAccounts.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1rem' }}>
                {formState.socialAccounts.map((account, idx) => (
                  <div key={idx} className="bg-neutral-900 rounded-xl border border-neutral-700 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center" style={{ gap: '0.625rem', padding: '0.75rem 1rem' }}>
                    <div className="relative w-full sm:w-auto">
                      <select
                        value={account.platform}
                        onChange={(e) => updateSocialPlatform(idx, e.target.value)}
                        className="w-full sm:w-[120px] bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-gold rounded-lg cursor-pointer transition-colors appearance-none"
                        style={{ padding: '0.5rem 1.75rem 0.5rem 0.75rem', fontSize: '0.9rem' }}
                      >
                        {SOCIAL_PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                      </select>
                      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400" style={{ fontSize: '0.55rem' }}>
                        ▼
                      </div>
                    </div>
                    <div className="flex gap-2 flex-1 w-full">
                      <input
                        type="text"
                        value={account.value}
                        onChange={(e) => updateSocialValue(idx, e.target.value)}
                        className="flex-1 w-full bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                        style={{ padding: '0.5rem 0.875rem', fontSize: '0.9rem', minWidth: '0' }}
                        placeholder="الرابط أو المعرف"
                        dir="ltr"
                      />
                      <button
                        onClick={() => handleRemoveSocial(idx)}
                        className="text-red-500 hover:bg-red-500/10 rounded-lg transition-colors font-medium shrink-0"
                        style={{ padding: '0.25rem 0.625rem', fontSize: '0.85rem' }}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleAddSocial}
              className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white rounded-xl transition-colors shadow-sm"
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.9rem', width: '100%' }}
            >
              + إضافة حساب جديد
            </button>
          </div>

          {/* ── Save Button ─────────────────────────────────────── */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={handleSave}
              disabled={!isDirty || isSaving}
              className="w-full font-bold transition-all duration-300"
              style={{
                padding: '1rem',
                fontSize: '1rem',
                borderRadius: '0.875rem',
                background: (!isDirty || isSaving) ? '#262626' : 'linear-gradient(to left, #9C7A2E, #D4AF37)',
                color: (!isDirty || isSaving) ? '#737373' : '#0a0a0a',
                cursor: (!isDirty || isSaving) ? 'not-allowed' : 'pointer',
                opacity: (!isDirty || isSaving) ? 0.7 : 1,
                boxShadow: (!isDirty || isSaving) ? 'none' : '0 0 20px rgba(156,122,46,0.3)'
              }}
            >
              {isSaving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
