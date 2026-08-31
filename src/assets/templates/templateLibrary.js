/**
 * templateLibrary.js — Extensible template library configuration.
 *
 * To add new templates: add entries to the arrays below + drop the image files.
 * No component code changes needed.
 *
 * Image specs (required):
 *   - Dimensions: 1080 × 1080 px (square, social-ready)
 *   - Format: JPG or WebP
 *   - Content: product only, clean/neutral background, no text overlays, no model
 *   - Each image should represent a distinct product style within the category
 *
 * File location: src/assets/templates/{category}/template-{n}.jpg
 */

export const TEMPLATE_CATEGORIES = {
  shoes:   'أحذية',
  hats:    'قبعات',
  tshirts: 'تيشرتات',
  pants:   'بناطيل',
};

/**
 * Each entry:
 *   id         — unique string identifier
 *   src        — imported image path
 *   label      — Arabic display label
 *   category   — must match a key in TEMPLATE_CATEGORIES
 *   modelFixed — model image pre-selected for this template (null = any model)
 *   bgFixed    — background style pre-selected for this template (null = any)
 */
export const templateLibrary = [
  // ── Shoes ─────────────────────────────────────────────────────────────────
  // { id: 'shoes-1', src: new URL('./shoes/template-1.jpg', import.meta.url).href, label: 'حذاء رياضي', category: 'shoes', modelFixed: null, bgFixed: 'studio' },
  // { id: 'shoes-2', src: new URL('./shoes/template-2.jpg', import.meta.url).href, label: 'حذاء رسمي', category: 'shoes', modelFixed: null, bgFixed: null },
  // { id: 'shoes-3', src: new URL('./shoes/template-3.jpg', import.meta.url).href, label: 'صندل صيفي', category: 'shoes', modelFixed: null, bgFixed: null },
  // { id: 'shoes-4', src: new URL('./shoes/template-4.jpg', import.meta.url).href, label: 'حذاء بوت', category: 'shoes', modelFixed: null, bgFixed: null },
  // { id: 'shoes-5', src: new URL('./shoes/template-5.jpg', import.meta.url).href, label: 'حذاء كلاسيكي', category: 'shoes', modelFixed: null, bgFixed: null },
  // { id: 'shoes-6', src: new URL('./shoes/template-6.jpg', import.meta.url).href, label: 'حذاء كاجوال', category: 'shoes', modelFixed: null, bgFixed: null },

  // ── Hats ──────────────────────────────────────────────────────────────────
  // { id: 'hats-1', src: new URL('./hats/template-1.jpg', import.meta.url).href, label: 'كاب رياضي', category: 'hats', modelFixed: null, bgFixed: null },
  // { id: 'hats-2', src: new URL('./hats/template-2.jpg', import.meta.url).href, label: 'قبعة صيفية', category: 'hats', modelFixed: null, bgFixed: null },
  // { id: 'hats-3', src: new URL('./hats/template-3.jpg', import.meta.url).href, label: 'بيني شتوي', category: 'hats', modelFixed: null, bgFixed: null },
  // { id: 'hats-4', src: new URL('./hats/template-4.jpg', import.meta.url).href, label: 'قبعة كاجوال', category: 'hats', modelFixed: null, bgFixed: null },
  // { id: 'hats-5', src: new URL('./hats/template-5.jpg', import.meta.url).href, label: 'قبعة كلاسيكية', category: 'hats', modelFixed: null, bgFixed: null },
  // { id: 'hats-6', src: new URL('./hats/template-6.jpg', import.meta.url).href, label: 'قبعة رياضية', category: 'hats', modelFixed: null, bgFixed: null },

  // ── T-Shirts ──────────────────────────────────────────────────────────────
  // { id: 'tshirts-1', src: new URL('./tshirts/template-1.jpg', import.meta.url).href, label: 'تيشرت بيسك', category: 'tshirts', modelFixed: null, bgFixed: null },
  // { id: 'tshirts-2', src: new URL('./tshirts/template-2.jpg', import.meta.url).href, label: 'تيشرت أوفرسايز', category: 'tshirts', modelFixed: null, bgFixed: null },
  // { id: 'tshirts-3', src: new URL('./tshirts/template-3.jpg', import.meta.url).href, label: 'تيشرت برينت', category: 'tshirts', modelFixed: null, bgFixed: null },
  // { id: 'tshirts-4', src: new URL('./tshirts/template-4.jpg', import.meta.url).href, label: 'تيشرت رياضي', category: 'tshirts', modelFixed: null, bgFixed: null },
  // { id: 'tshirts-5', src: new URL('./tshirts/template-5.jpg', import.meta.url).href, label: 'تيشرت بولو', category: 'tshirts', modelFixed: null, bgFixed: null },
  // { id: 'tshirts-6', src: new URL('./tshirts/template-6.jpg', import.meta.url).href, label: 'تيشرت لونغ سليف', category: 'tshirts', modelFixed: null, bgFixed: null },

  // ── Pants ─────────────────────────────────────────────────────────────────
  // { id: 'pants-1', src: new URL('./pants/template-1.jpg', import.meta.url).href, label: 'بنطلون جينز', category: 'pants', modelFixed: null, bgFixed: null },
  // { id: 'pants-2', src: new URL('./pants/template-2.jpg', import.meta.url).href, label: 'بنطلون رياضي', category: 'pants', modelFixed: null, bgFixed: null },
  // { id: 'pants-3', src: new URL('./pants/template-3.jpg', import.meta.url).href, label: 'بنطلون كارغو', category: 'pants', modelFixed: null, bgFixed: null },
  // { id: 'pants-4', src: new URL('./pants/template-4.jpg', import.meta.url).href, label: 'بنطلون رسمي', category: 'pants', modelFixed: null, bgFixed: null },
  // { id: 'pants-5', src: new URL('./pants/template-5.jpg', import.meta.url).href, label: 'بنطلون بيزيق', category: 'pants', modelFixed: null, bgFixed: null },
  // { id: 'pants-6', src: new URL('./pants/template-6.jpg', import.meta.url).href, label: 'شورت صيفي', category: 'pants', modelFixed: null, bgFixed: null },
];

/** Filter helpers */
export const getTemplatesByCategory = (category) =>
  templateLibrary.filter((t) => t.category === category);
