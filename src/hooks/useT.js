/**
 * useT — lightweight translation hook for the ar.json strings file.
 * Supports simple {{key}} interpolation.
 *
 * Usage:
 *   const t = useT();
 *   t('auth.signInButton')             → "المتابعة بحساب Google"
 *   t('dashboard.dailyUsage', { remaining: 2, cap: 3 })
 *     → "متبقي لك 2 من 3 تصاميم اليوم"
 */
import ar from '../translations/ar.json';

/** Recursively resolve a dot-notation path in the strings object. */
function resolve(obj, path) {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object') return acc[key];
    return undefined;
  }, obj);
}

/** Replace {{key}} placeholders with values from the params object. */
function interpolate(str, params = {}) {
  if (!str || !params) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    params[key] !== undefined ? String(params[key]) : `{{${key}}}`
  );
}

export function useT() {
  return (path, params) => {
    const value = resolve(ar, path);
    if (value === undefined) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[useT] Missing translation key: "${path}"`);
      }
      return path; // fallback: return the key itself
    }
    if (typeof value === 'string') {
      return interpolate(value, params);
    }
    // If value is an array (e.g. ai.loading), return it directly
    return value;
  };
}
