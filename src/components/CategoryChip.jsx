import { CATEGORY_ICONS } from '../data/categories';

/**
 * CategoryChip — Sage green active state, stone inactive.
 */

export default function CategoryChip({ category, isActive, onSelect }) {
  const icon = CATEGORY_ICONS[category] || '📌';

  return (
    <button
      onClick={() => onSelect(category)}
      className={`
        px-6 py-2.5 rounded-full text-sm font-medium tracking-wide
        transition-all duration-300 ease-out
        ${isActive
          ? 'chip-active'
          : 'bg-white text-stone-500 border border-stone-200/60 hover:bg-stone-50 hover:text-stone-700 shadow-sm'}
      `}
    >
      {icon} {category}
    </button>
  );
}
