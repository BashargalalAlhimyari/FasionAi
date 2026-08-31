/**
 * Theme store — manages dark/light mode toggle.
 * Persists to localStorage. Applies/removes 'light' class on <html>.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
  }
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      isDark: true, // default: dark mode

      toggleTheme() {
        const next = !get().isDark;
        set({ isDark: next });
        applyTheme(next);
      },

      initTheme() {
        applyTheme(get().isDark);
      },
    }),
    {
      name: 'fashionai-theme',
    }
  )
);
