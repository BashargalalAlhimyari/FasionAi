import { useCallback } from 'react';
import arTranslations from './ar.json';

/**
 * A simple hook to fetch translated strings from ar.json.
 * Supports nested keys like 'auth.signInSubtitle'.
 */
export function useT() {
  return useCallback((key, fallback = '') => {
    if (!key) return fallback;
    
    // Resolve nested path (e.g., "auth.signInSubtitle")
    const value = key.split('.').reduce((obj, k) => (obj || {})[k], arTranslations);
    
    if (value !== undefined) {
      return value;
    }
    return fallback || key; // Return fallback or the key itself if not found
  }, []);
}
