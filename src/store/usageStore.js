/**
 * usageStore.js — Zustand store for daily design usage state.
 * Fetches from GET /api/dashboard/usage and caches results.
 */
import { create } from 'zustand';
import api from '../lib/axios';

export const useUsageStore = create((set, get) => ({
  count:         0,
  cap:           3,
  remaining:     3,
  resetAt:       null,
  isTestAccount: false,
  isLoading:     false,
  error:         null,
  lastFetched:   null,

  async fetchUsage() {
    // Avoid re-fetching within 60 seconds
    const { lastFetched } = get();
    if (lastFetched && Date.now() - lastFetched < 60_000) return;

    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/api/dashboard/usage');
      set({
        count:         data.count,
        cap:           data.cap,
        remaining:     data.remaining,
        resetAt:       data.resetAt,
        isTestAccount: data.isTestAccount,
        isLoading:     false,
        lastFetched:   Date.now(),
      });
    } catch (err) {
      set({ isLoading: false, error: err.message });
    }
  },

  // Call this after a successful design generation (Phase 4)
  incrementCount() {
    set((state) => ({
      count:     state.count + 1,
      remaining: Math.max(0, state.remaining - 1),
    }));
  },

  reset() {
    set({ count: 0, remaining: get().cap, lastFetched: null });
  },
}));
