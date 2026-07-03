/**
 * RecipeCard — White panel with soft shadow, hover:scale(1.02), terracotta time badge.
 */

export default function RecipeCard({ recipe, index, onSelect }) {
  return (
    <div
      className="recipe-card bg-white rounded-3xl overflow-hidden cursor-pointer animate-fade-in-up border border-stone-200/60 shadow-sm"
      style={{ animationDelay: `${index * 0.09}s` }}
      onClick={() => onSelect(recipe.id)}
    >
      {/* Header */}
      <div className={`relative h-44 bg-gradient-to-br ${recipe.gradient} flex items-center justify-center overflow-hidden`}>
        <span className="text-7xl">{recipe.image}</span>

        <div className="absolute top-3 left-3 flex items-center gap-2">
          {recipe.categories.map((c) => (
            <span key={c} className="text-[10px] font-semibold uppercase tracking-widest bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-forest/80">
              {c}
            </span>
          ))}
        </div>

        <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm rounded-full px-2.5 py-1 text-[11px] font-mono text-terracotta flex items-center gap-1 tracking-wide">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {recipe.time}
        </div>
      </div>

      {/* Body */}
      <div className="p-7">
        <h3 className="font-bold text-lg text-forest mb-2 leading-tight tracking-wide">{recipe.name}</h3>
        <p className="text-xs text-stone-500 font-light leading-relaxed mb-6 line-clamp-2">{recipe.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-stone-400">
            <span className="flex items-center gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} className={i < recipe.difficultyLevel ? 'text-terracotta' : 'text-stone-200'}>★</span>
              ))}
              <span className="ml-1 tracking-wide text-stone-500">{recipe.difficulty}</span>
            </span>
            <span className="text-stone-200">·</span>
            <span className="tracking-wide">{recipe.servings} servings</span>
          </div>
          <span className="text-xs font-mono text-brand-300/70 tracking-wider">{recipe.calories} kcal</span>
        </div>
      </div>
    </div>
  );
}
