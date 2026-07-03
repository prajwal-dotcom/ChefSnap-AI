/**
 * IngredientBadge — White card with forest green confidence bar.
 */

export default function IngredientBadge({ ingredient, index, onOpenSubstitution }) {
  const { name, confidence, emoji } = ingredient;

  return (
    <div
      className="ingredient-badge bg-white rounded-2xl p-7 text-center animate-fade-in-up cursor-pointer group relative border border-stone-200/60 shadow-sm"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onOpenSubstitution(name)}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{emoji}</div>
      <p className="font-semibold text-forest tracking-wide mb-2.5">{name}</p>

      <div className="w-full bg-stone-100 rounded-full h-1.5 mb-2 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-300 transition-all duration-1000 ease-out"
          style={{ width: `${confidence}%` }}
        />
      </div>
      <p className="text-xs font-mono text-brand-400/70 tracking-wider">{confidence}%</p>

      <div
        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-purple-50 border border-purple-200/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        title="View substitutions"
      >
        <svg className="w-3.5 h-3.5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      </div>
    </div>
  );
}
