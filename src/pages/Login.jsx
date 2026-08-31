import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { initGoogleAuth, renderGoogleButton } from '../lib/auth';
import { useAuthStore } from '../store/authStore';
import { useT } from '../translations/useT';

export default function Login() {
  const t = useT();
  const navigate = useNavigate();
  const jwt = useAuthStore((state) => state.jwt);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = !!jwt;
  const buttonContainerRef = useRef(null);

  // لتمييز ما إذا كان المستخدم مسجلاً دخوله مسبقاً (جلسة عائدة) 
  // أو أن هذا تسجيل دخول جديد للتو.
  const wasAuthOnMount = useRef(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (wasAuthOnMount.current) {
      // مستخدم عائد: نوجّه للوحة التحكم دائماً (لتجنب التوجيه الخاطئ لـ store-setup بسبب بطء قاعدة البيانات أو جلسة قديمة)
      navigate('/dashboard', { replace: true });
    } else {
      // تسجيل دخول جديد للتو: نعتمد على استجابة الباك إند المباشرة (hasStore)
      const hasStore = useAuthStore.getState().user?.hasStore;
      navigate(hasStore === false ? '/store-setup' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Initialize GSI and render button
    initGoogleAuth().then(() => {
      if (buttonContainerRef.current) {
        renderGoogleButton(buttonContainerRef.current, { text: 'continue_with' });
      }
    });
  }, []);

  return (
    <div
      className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundImage: 'url(/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950/90 z-0"></div>

      {/* Card — wider with generous padding all around */}
      <div
        className="w-full bg-neutral-900/50 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-neutral-800/60 z-10 relative text-center"
        style={{ maxWidth: '36rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '4rem', paddingBottom: '4rem' }}
      >
        <div className="absolute -inset-1 bg-gradient-to-b from-gold/10 to-transparent rounded-[2.5rem] blur opacity-40"></div>

        <div className="relative">
          {/* Logo — centered */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <div
              className="rounded-2xl overflow-hidden border border-neutral-700/50 shadow-[0_0_15px_rgba(156,122,46,0.3)]"
              style={{ width: '72px', height: '72px' }}
            >
              <img src="/logo.png" alt="FashionAI Logo" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Title */}
          <h1
            className="font-bold text-white font-cairo bg-gradient-to-l from-gold-light via-gold to-white bg-clip-text text-transparent"
            style={{ fontSize: '2rem', lineHeight: '1.3', marginBottom: '1rem' }}
          >
            FashionAI Studio
          </h1>

          {/* Subtitle */}
          <p
            className="text-neutral-400 leading-relaxed"
            style={{ fontSize: '1rem', marginBottom: '3rem', paddingLeft: '1rem', paddingRight: '1rem' }}
          >
            {t('auth.signInSubtitle')}
          </p>

          {/* Login Container — generous inner padding, max-width to keep button away from card edges */}
          <div
            className="bg-neutral-950/40 rounded-2xl border border-neutral-800/50 shadow-inner flex flex-col items-center"
            style={{ padding: '2.5rem 1.25rem' }}
          >
            {isLoading && (
              <div className="text-gold animate-pulse text-sm font-medium" style={{ marginBottom: '1.5rem' }}>
                {t('common.loading')}
              </div>
            )}

            <div
              className={`flex justify-center transition-opacity duration-300 ${isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}
              ref={buttonContainerRef}
            ></div>

            {!isLoading && (
              <p
                className="text-neutral-500"
                style={{ fontSize: '0.8125rem', marginTop: '2.5rem' }}
              >
                تسجيل الدخول مؤمن عبر Google Identity Services
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
