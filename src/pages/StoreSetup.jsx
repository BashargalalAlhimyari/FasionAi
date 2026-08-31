import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import api from '../lib/axios';

const SOCIAL_PLATFORMS = [
  { id: 'instagram', label: 'إنستجرام' },
  { id: 'whatsapp', label: 'واتساب' },
  { id: 'tiktok', label: 'تيك توك' },
  { id: 'snapchat', label: 'سناب شات' },
  { id: 'x', label: 'إكس (تويتر)' },
  { id: 'phone', label: 'رقم الجوال' },
];

export default function StoreSetup() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [storeName, setStoreName] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [colors, setColors] = useState(['#9C7A2E']); // Default gold color
  const [socials, setSocials] = useState([]); // [{ platform: 'instagram', value: '' }]

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError('حجم الصورة يجب أن لا يتجاوز 10 ميجابايت.');
      return;
    }

    setError('');

    // Client-side compression
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      setLogoFile(compressedFile);
      setLogoPreview(URL.createObjectURL(compressedFile));
    } catch (err) {
      console.error('Error compressing image:', err);
      setError('فشل في ضغط الصورة. يرجى المحاولة بصورة أخرى.');
    }
  };

  const addColor = () => {
    if (colors.length >= 5) return;
    setColors([...colors, '#ffffff']);
  };

  const updateColor = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const removeColor = (index) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const addSocial = () => {
    setSocials([...socials, { platform: 'instagram', value: '' }]);
  };

  const updateSocialPlatform = (index, platform) => {
    const newSocials = [...socials];
    newSocials[index].platform = platform;
    setSocials(newSocials);
  };

  const updateSocialValue = (index, value) => {
    const newSocials = [...socials];
    newSocials[index].value = value;
    setSocials(newSocials);
  };

  const removeSocial = (index) => {
    const newSocials = [...socials];
    newSocials.splice(index, 1);
    setSocials(newSocials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storeName.trim()) {
      setError('يرجى إدخال اسم المتجر.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('storeName', storeName.trim());
      formData.append('colors', JSON.stringify(colors));

      const validSocials = socials.filter(s => s.value.trim() !== '');
      formData.append('socialAccounts', JSON.stringify(validSocials));

      if (logoFile) {
        formData.append('logo', logoFile);
      }

      await api.post('/api/store/setup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // For Phase 1 & 2, dashboard doesn't exist yet, we will redirect to /brandkit to see the saved data
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const resData = err.response?.data;
      const errMsg = resData?.details ? `${resData.message} (${resData.details})` : (resData?.message || 'حدث خطأ أثناء إعداد المتجر.');
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center p-4 py-12 relative overflow-hidden"
      style={{ backgroundImage: 'url(/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/70 to-neutral-950/95 z-0"></div>

      <div className="max-w-2xl w-full bg-neutral-900/50 backdrop-blur-2xl p-10 md:p-14 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-neutral-800/60 z-10 relative my-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-gold/10 via-gold-light/10 to-gold/10 rounded-[2rem] blur-md opacity-50 -z-10"></div>

        <h2 className="text-3xl font-bold mb-6 font-cairo text-center bg-gradient-to-l from-gold-light via-gold to-white bg-clip-text text-transparent">إعداد المتجر</h2>
        <p className="text-neutral-400 mb-12 text-center text-base leading-relaxed">أدخل بيانات متجرك للبدء في تصميم صورك الاحترافية.</p>

        {error && <div className="bg-red-950/40 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8 text-sm shadow-inner">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">

          {/* Store Name */}
          <div className="bg-neutral-950/30 p-8 rounded-2xl border border-neutral-800/50 shadow-inner">
            <label className="block text-base font-medium text-neutral-200 mb-4">اسم المتجر</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-5 py-7 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-base"
              placeholder="مثال: بوتيك الأناقة"
              required
            />
          </div>

          {/* Logo */}
          <div className="bg-neutral-950/30 p-8 rounded-2xl border border-neutral-800/50 shadow-inner">
            <label className="block text-base font-medium text-neutral-200 mb-6">شعار المتجر (اختياري)</label>
            <div className="flex items-center gap-8">
              <div
                className="w-24 h-24 rounded-full border-2 border-dashed border-neutral-600 flex items-center justify-center overflow-hidden bg-neutral-900 cursor-pointer hover:border-gold transition-colors shadow-inner shrink-0"
                onClick={() => fileInputRef.current?.click()}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover bg-white" />
                ) : (
                  <span className="text-neutral-500 text-sm">رفع</span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm transition-colors shadow-md w-fit"
                >
                  اختيار صورة
                </button>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  JPG, PNG, WebP<br />
                  (سيتم ضغطها تلقائياً)
                </p>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoChange}
              accept="image/jpeg, image/png, image/webp"
              className="hidden"
            />
          </div>

          {/* Brand Colors */}
          <div className="bg-neutral-950/30 p-8 rounded-2xl border border-neutral-800/50 shadow-inner">
            <label className="block text-base font-medium text-neutral-200 mb-6">ألوان المتجر الرئيسية</label>
            <div className="flex flex-wrap gap-4 mb-6">
              {colors.map((color, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-neutral-900 p-3 rounded-xl border border-neutral-700 shadow-sm">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(idx, e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-neutral-900 border-none"
                  />
                  {colors.length > 1 && (
                    <button type="button" onClick={() => removeColor(idx)} className="text-red-500 hover:text-red-400 font-bold px-3 text-lg">×</button>
                  )}
                </div>
              ))}
            </div>
            {colors.length < 5 && (
              <button
                type="button"
                onClick={addColor}
                className="text-base text-gold hover:text-gold-light transition-colors flex items-center gap-2 mt-4"
              >
                <span className="text-xl">+</span> إضافة لون آخر
              </button>
            )}
          </div>

          {/* Social Accounts */}
          <div className="bg-neutral-950/30 p-8 rounded-2xl border border-neutral-800/50 shadow-inner">
            <label className="block text-base font-medium text-neutral-200 mb-6">حسابات التواصل الاجتماعي (اختياري)</label>
            <div className="flex flex-col gap-4 mb-8">
              {socials.map((social, idx) => (
                <div key={idx} className="flex gap-3 items-start bg-neutral-900 p-3 rounded-xl border border-neutral-800 shadow-sm">
                  <div className="relative w-1/3">
                    <select
                      value={social.platform}
                      onChange={(e) => updateSocialPlatform(idx, e.target.value)}
                      className="w-full bg-neutral-900 border-none text-white focus:outline-none focus:ring-0 py-3.5 pl-8 pr-4 rounded-lg appearance-none cursor-pointer"
                    >
                      {SOCIAL_PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-xs">
                      ▼
                    </div>
                  </div>
                  <input
                    type="text"
                    value={social.value}
                    onChange={(e) => updateSocialValue(idx, e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-5 py-3.5 text-white focus:outline-none focus:border-gold focus:ring-1 transition-colors text-base"
                    placeholder="الرابط أو اسم المستخدم"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => removeSocial(idx)}
                    className="p-3.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors font-medium h-full"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSocial}
              className="text-base px-6 py-4 w-full bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-white rounded-xl transition-colors shadow-sm"
            >
              + إضافة حساب جديد
            </button>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-bold py-5 px-6 rounded-xl transition-all duration-300 text-lg"
              style={{
                background: isLoading ? '#262626' : 'linear-gradient(to left, #9C7A2E, #D4AF37)',
                color: isLoading ? '#737373' : '#0a0a0a',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: isLoading ? 'none' : '0 0 25px rgba(156,122,46,0.4)',
              }}
            >
              {isLoading ? 'جاري الحفظ...' : 'إكمال إعداد المتجر'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
