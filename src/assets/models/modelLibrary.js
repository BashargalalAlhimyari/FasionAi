/**
 * modelLibrary.js — Extensible model library configuration.
 */

export const MODEL_CATEGORIES = {
  men:   'رجالي',
  women: 'نسائي',
  kids:  'أطفال',
};

export const modelLibrary = [
  // ── Men ──────────────────────────────────────────────────────────────────
  { id: 'men-1', src: new URL('./men/model-1.jpg', import.meta.url).href, label: 'موديل 1', category: 'men' },
  { id: 'men-2', src: new URL('./men/model-2.jpg', import.meta.url).href, label: 'موديل 2', category: 'men' },
  { id: 'men-3', src: new URL('./men/model-3.jpg', import.meta.url).href, label: 'موديل 3', category: 'men' },
  { id: 'men-4', src: new URL('./men/model-4.jpg', import.meta.url).href, label: 'موديل 4', category: 'men' },
  { id: 'men-5', src: new URL('./men/model-5.jpg', import.meta.url).href, label: 'موديل 5', category: 'men' },
  { id: 'men-6', src: new URL('./men/model-6.jpg', import.meta.url).href, label: 'موديل 6', category: 'men' },

  // ── Women ─────────────────────────────────────────────────────────────────
  { id: 'women-1', src: new URL('./women/model-1.jpg', import.meta.url).href, label: 'موديل 1', category: 'women' },
  { id: 'women-2', src: new URL('./women/model-2.jpg', import.meta.url).href, label: 'موديل 2', category: 'women' },
  { id: 'women-3', src: new URL('./women/model-3.jpg', import.meta.url).href, label: 'موديل 3', category: 'women' },
  { id: 'women-4', src: new URL('./women/model-4.jpg', import.meta.url).href, label: 'موديل 4', category: 'women' },
  { id: 'women-5', src: new URL('./women/model-5.jpg', import.meta.url).href, label: 'موديل 5', category: 'women' },
  { id: 'women-6', src: new URL('./women/model-6.jpg', import.meta.url).href, label: 'موديل 6', category: 'women' },

  // ── Kids ──────────────────────────────────────────────────────────────────
  { id: 'kids-1', src: new URL('./kids/model-1.jpg', import.meta.url).href, label: 'موديل 1', category: 'kids' },
  { id: 'kids-2', src: new URL('./kids/model-2.jpg', import.meta.url).href, label: 'موديل 2', category: 'kids' },
  { id: 'kids-3', src: new URL('./kids/model-3.jpg', import.meta.url).href, label: 'موديل 3', category: 'kids' },
  { id: 'kids-4', src: new URL('./kids/model-4.jpg', import.meta.url).href, label: 'موديل 4', category: 'kids' },
  { id: 'kids-5', src: new URL('./kids/model-5.jpg', import.meta.url).href, label: 'موديل 5', category: 'kids' },
];

/** Filter helpers */
export const getModelsByCategory = (category) =>
  modelLibrary.filter((m) => m.category === category);
