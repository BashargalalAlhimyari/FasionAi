import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import App from './App.jsx';
import { queryClient } from './lib/queryClient';
import { useThemeStore } from './store/themeStore';

// ── Initialize theme before render (prevents flash) ────────────────────────
useThemeStore.getState().initTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        {/* Sonner toaster — RTL-positioned, 4s default duration */}
        <Toaster
          position="top-center"
          dir="rtl"
          duration={4000}
          closeButton
          richColors={false}
          toastOptions={{
            className: 'fashionai-toast',
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
