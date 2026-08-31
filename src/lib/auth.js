/**
 * auth.js — Google Identity Services (GSI) integration.
 *
 * Replaces firebase.js entirely. No Firebase dependency.
 *
 * Flow:
 *   1. App loads → initGoogleAuth() injects the GSI script tag
 *   2. User clicks Sign-In → signInWithGoogle() triggers a Google One Tap / popup
 *   3. Google calls our callback with a credential (Google ID token)
 *   4. We POST the credential to /api/auth/google
 *   5. Backend verifies + issues our own JWT
 *   6. We store JWT + user in Zustand authStore (in-memory)
 *
 * Usage:
 *   import { initGoogleAuth, signInWithGoogle, signOut } from '@/lib/auth';
 */
import api from './axios';
import { useAuthStore } from '../store/authStore';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/** Load the GSI script once and resolve when ready. */
let gsiScriptPromise = null;

function loadGsiScript() {
  if (gsiScriptPromise) return gsiScriptPromise;

  gsiScriptPromise = new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      return resolve();
    }
    const script   = document.createElement('script');
    script.src     = 'https://accounts.google.com/gsi/client';
    script.async   = true;
    script.defer   = true;
    script.onload  = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Identity Services script'));
    document.head.appendChild(script);
  });

  return gsiScriptPromise;
}

/**
 * Initialize GSI. Call once in your root component (e.g. App.jsx or main.jsx).
 * This renders the invisible One Tap prompt if the user has a Google session.
 */
export async function initGoogleAuth() {
  await loadGsiScript();

  window.google.accounts.id.initialize({
    client_id:         GOOGLE_CLIENT_ID,
    callback:          handleCredentialResponse,
    auto_select:       false, // don't auto-sign-in silently; let user explicitly tap
    cancel_on_tap_outside: true,
  });
}

/**
 * Trigger the Google Sign-In popup (called from a sign-in button).
 * Returns a Promise that resolves to { jwt, user } or throws on failure.
 */
export function signInWithGoogle() {
  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.id) {
      return reject(new Error('Google Identity Services not initialized'));
    }

    // Override the global callback temporarily to capture this specific sign-in
    window.__fashionaiAuthResolve = resolve;
    window.__fashionaiAuthReject  = reject;

    window.google.accounts.id.prompt((notification) => {
      if (
        notification.isNotDisplayed() ||
        notification.isSkippedMoment() ||
        notification.isDismissedMoment()
      ) {
        // One Tap was not shown — fall back to the rendered button flow
        // The button renders via renderGoogleButton() — this is fine.
      }
    });
  });
}

/**
 * Render a Google Sign-In button into a container element.
 * @param {HTMLElement} container
 * @param {{ theme?, size?, text? }} options
 */
export function renderGoogleButton(container, options = {}) {
  if (!window.google?.accounts?.id) return;

  window.google.accounts.id.renderButton(container, {
    type:  'standard',
    theme: options.theme || 'filled_black',
    size:  options.size  || 'large',
    text:  options.text  || 'signin_with',
    logo_alignment: 'left',
    width: options.width || 280,
    locale: 'ar', // Arabic UI for the Google button
  });
}

/**
 * Internal callback invoked by GSI when a credential is returned.
 * Exchanges Google ID token for our own JWT via the backend.
 */
async function handleCredentialResponse(response) {
  const { credential } = response;

  try {
    useAuthStore.getState().setLoading(true);

    const { data } = await api.post('/api/auth/google', { credential });
    const { jwt, user } = data;

    useAuthStore.getState().setAuth(jwt, user);

    // Resolve any pending signInWithGoogle() promise
    if (window.__fashionaiAuthResolve) {
      window.__fashionaiAuthResolve({ jwt, user });
      window.__fashionaiAuthResolve = null;
      window.__fashionaiAuthReject  = null;
    }
  } catch (err) {
    useAuthStore.getState().setLoading(false);
    if (window.__fashionaiAuthReject) {
      window.__fashionaiAuthReject(err);
      window.__fashionaiAuthResolve = null;
      window.__fashionaiAuthReject  = null;
    }
    console.error('[Auth] Google credential exchange failed:', err);
  }
}

/**
 * Sign out the current user.
 * Clears JWT from Zustand store and revokes the Google session.
 */
export function signOut() {
  const { user, clearAuth } = useAuthStore.getState();

  clearAuth();

  // Revoke Google's session so the user is fully signed out
  if (window.google?.accounts?.id && user?.email) {
    window.google.accounts.id.revoke(user.email, () => {});
  }
}
