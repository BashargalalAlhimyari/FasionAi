/**
 * axios.js — Axios base instance for all API calls.
 *
 * Auth strategy: JWT from Zustand authStore injected into Authorization header.
 * No Firebase dependency. JWT is in-memory only.
 *
 * Also sends X-Timezone-Offset header for server-side daily cap computation.
 * (Backend uses this offset to derive the user's local date — never trusts it for auth.)
 */
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Client's UTC offset — computed once at module load, e.g. "+03:00"
const timezoneOffset = (() => {
  const offsetMins = -new Date().getTimezoneOffset(); // JS gives inverted sign
  const sign   = offsetMins >= 0 ? '+' : '-';
  const abs    = Math.abs(offsetMins);
  const hours  = String(Math.floor(abs / 60)).padStart(2, '0');
  const mins   = String(abs % 60).padStart(2, '0');
  return `${sign}${hours}:${mins}`;
})();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 90_000, // 90s — Gemini generation (try-on + bg + overlay) can take time
  headers: {
    'Content-Type':      'application/json',
    'X-Timezone-Offset': timezoneOffset,
  },
});

// ── Request interceptor: inject JWT from authStore ────────────────────────────
api.interceptors.request.use((config) => {
  const jwt = useAuthStore.getState().jwt;
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

// ── Response interceptor: handle 401 globally ─────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state and fire event — AuthProvider/router listens to redirect
      useAuthStore.getState().clearAuth();
      window.dispatchEvent(new CustomEvent('fashionai:session-expired'));
    }
    return Promise.reject(error);
  }
);

export default api;
