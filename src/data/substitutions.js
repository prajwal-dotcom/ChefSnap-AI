/**
 * Substitution mappings for the smart-swap engine.
 * Each key is an ingredient name → array of alternative options.
 */

export const SUBSTITUTIONS = {
  Tomato: [
    { original: 'Tomato', sub: 'Sun-dried Tomatoes',  note: 'More concentrated flavor, use half the quantity', icon: '🍅' },
    { original: 'Tomato', sub: 'Canned Tomato Puree', note: 'Great for sauces and curries',                    icon: '🥫' },
  ],
  Onion: [
    { original: 'Onion', sub: 'Shallots', note: 'Milder, sweeter flavor profile',           icon: '🧅' },
    { original: 'Onion', sub: 'Leeks',    note: 'Use the white part for similar texture',    icon: '🥬' },
  ],
  'Bell Pepper': [
    { original: 'Bell Pepper', sub: 'Poblano Pepper', note: 'Slightly spicy alternative',       icon: '🫑' },
    { original: 'Bell Pepper', sub: 'Zucchini',       note: 'Similar crunch in stir-fries',     icon: '🥒' },
  ],
  Garlic: [
    { original: 'Garlic', sub: 'Garlic Powder',        note: 'Use ⅛ tsp per clove',                                    icon: '🧄' },
    { original: 'Garlic', sub: 'Asafoetida (Hing)',     note: 'Pinch replaces 1 clove, common in Indian cooking',       icon: '✨' },
  ],
  'Red Chili': [
    { original: 'Red Chili', sub: 'Paprika + Cayenne', note: 'Blend for color and heat control',                icon: '🌶️' },
    { original: 'Red Chili', sub: 'Black Pepper',      note: 'Different heat profile, works well in soups',     icon: '⚫' },
  ],
  Lemon: [
    { original: 'Lemon', sub: 'Lime',                        note: 'Slightly more tart, works in most recipes',   icon: '🍋' },
    { original: 'Lemon', sub: 'Vinegar (White/Apple Cider)', note: 'Use half the quantity for acidity',           icon: '🫗' },
  ],
  Butter: [
    { original: 'Butter', sub: 'Ghee',       note: 'Higher smoke point, richer nutty flavor', icon: '🧈' },
    { original: 'Butter', sub: 'Olive Oil',   note: 'Healthier fat, use ¾ the quantity',       icon: '🫒' },
  ],
};
