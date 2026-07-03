/**
 * Ingredient datasets for YOLOv8 detection simulation.
 *
 * FOOD_INGREDIENTS — items detected when a valid food image is analyzed.
 * NONFOOD_ITEMS    — items detected when a non-food image is analyzed.
 */

export const FOOD_INGREDIENTS = [
  { name: 'Tomato',      confidence: 94, emoji: '🍅', color: 'red'    },
  { name: 'Onion',       confidence: 89, emoji: '🧅', color: 'amber'  },
  { name: 'Bell Pepper', confidence: 91, emoji: '🫑', color: 'green'  },
  { name: 'Garlic',      confidence: 87, emoji: '🧄', color: 'stone'  },
  { name: 'Red Chili',   confidence: 85, emoji: '🌶️', color: 'red'    },
  { name: 'Lemon',       confidence: 92, emoji: '🍋', color: 'yellow' },
];

export const NONFOOD_ITEMS = [
  { name: 'Phone Charger', confidence: 96, emoji: '🔌', color: 'gray' },
  { name: 'Wallet',        confidence: 91, emoji: '👛', color: 'gray' },
  { name: 'USB Cable',     confidence: 88, emoji: '🔗', color: 'gray' },
];
