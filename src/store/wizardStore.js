/**
 * wizardStore.js — Zustand store for the 8-step design creation wizard.
 */
import { create } from 'zustand';

const initialState = {
  currentStep: 1,
  started: false,

  // Step 1 — Product photo
  productPhoto: null,
  productPhotoPreview: null,

  // Step 2 — Gender / Category
  gender: null,              // 'men' | 'women' | 'kids'

  // Step 3 — Product type (filtered by gender)
  productType: null,         // e.g. 'shirts' | 'dresses' | 'shoes' ...

  // Step 4 — Model (auto-filtered by gender from step 2)
  modelIndex: null,          // 0–3

  // Step 5 — Background
  backgroundType: null,      // 'color' | 'scene'
  backgroundColor: '#FFFFFF',
  backgroundScene: null,     // 'studio' | 'outdoor' | 'cafe' | 'hotel' | 'mall'

  // Step 6 — Design type
  designType: null,          // 'ecommerce' | 'story' | 'square'

  // Step 7 — Brand elements (per-account toggles)
  showLogo: true,
  selectedSocials: [],       // array of platform ids e.g. ['instagram', 'whatsapp']

  // Step 8 — Review (no state, read-only)
};

export const useWizardStore = create((set, get) => ({
  ...initialState,

  // Navigation
  start:  () => set({ started: true, currentStep: 1 }),
  goNext: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 8) })),
  goBack: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
  setStep: (step) => set({ currentStep: step }),

  // Step setters
  setProductPhoto: (file, preview) =>
    set({ productPhoto: file, productPhotoPreview: preview }),

  setGender: (gender) =>
    // Reset product type and model when gender changes
    set({ gender, productType: null, modelIndex: null }),

  setProductType: (type) => set({ productType: type }),

  setModel: (index) => set({ modelIndex: index }),

  setBackgroundColor: (color) =>
    set({ backgroundType: 'color', backgroundColor: color, backgroundScene: null }),

  setBackgroundScene: (scene) =>
    set({ backgroundType: 'scene', backgroundScene: scene, backgroundColor: '#FFFFFF' }),

  setDesignType: (type) => set({ designType: type }),

  setShowLogo: (val) => set({ showLogo: val }),

  // Initialize selectedSocials from user's accounts (called on step 7 mount)
  initSocials: (platforms) =>
    set((s) => ({
      selectedSocials: s.selectedSocials.length > 0 ? s.selectedSocials : [...platforms],
    })),

  toggleSocial: (platform) =>
    set((s) => ({
      selectedSocials: s.selectedSocials.includes(platform)
        ? s.selectedSocials.filter((p) => p !== platform)
        : [...s.selectedSocials, platform],
    })),

  reset: () => set({ ...initialState }),
}));
