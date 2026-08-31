import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * authStore.js — Zustand auth state store.
 * 
 * To maintain session across page reloads (Phase 1 Acceptance Criteria),
 * we persist the JWT and user data to localStorage. 
 * While in-memory is safer against XSS, persisting is required for a seamless UX
 * on a web app unless we implement an httpOnly refresh token flow.
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      jwt:           null,
      user:          null,
      isLoading:     false,
      isInitialized: false,

      /**
       * Called by the auth service after a successful backend exchange.
       */
      setAuth(jwt, user) {
        set({ jwt, user, isLoading: false, isInitialized: true });
      },

      setLoading(isLoading) {
        set({ isLoading });
      },

      /**
       * Clear all auth state (sign-out or session expiry).
       */
      clearAuth() {
        set({ jwt: null, user: null, isLoading: false, isInitialized: true });
      },

      markInitialized() {
        set({ isInitialized: true });
      },
    }),
    {
      name: 'fashionai-auth', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // Only persist jwt and user, don't persist loading states
      partialize: (state) => ({ jwt: state.jwt, user: state.user }),
    }
  )
);
