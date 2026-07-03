import { RECIPES } from '../data/recipes';
import { CATEGORIES } from '../data/categories';
import CategoryChip from '../components/CategoryChip';
import RecipeCard from '../components/RecipeCard';

/**
 * RecipeGrid — Bright grid with sage chip filters and white recipe cards.
 */

export default function RecipeGrid({ activeCategory, onCategoryChange, onSelectRecipe, onBack }) {
  const filtered =
    activeCategory === 'All'
      ? RECIPES
      : RECIPES.filter((r) => r.categories.includes(activeCategory));

  return (
    <section className="max-w-6xl mx-auto px-10">
      {/* Header */}
      <div className="text-center mb-16 animate-slide-up">
        <div className="inline-flex items-center gap-2.5 bg-sage/50 rounded-full px-5 py-2 mb-8 border border-brand-200/30">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-xs font-medium text-forest/70 tracking-widest">
            Recipe Engine · {filtered.length} Recipes Generated
          </span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight mb-5 text-forest">
          AI-Generated <span className="gradient-text">Recipes</span>
        </h2>
        <p className="text-stone-500 font-light max-w-lg mx-auto leading-relaxed tracking-wide">
          Based on your detected ingredients, here are chef-curated recipes tailored for you.
        </p>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-14 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat}
            category={cat}
            isActive={activeCategory === cat}
            onSelect={onCategoryChange}
          />
        ))}
      </div>

      {/* Recipe Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} onSelect={onSelectRecipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 animate-fade-in">
          <span className="text-5xl mb-5 block">🍽️</span>
          <p className="text-stone-600 text-lg font-medium tracking-wide">No recipes found in this category</p>
          <p className="text-stone-400 text-sm font-light mt-2 tracking-wide">Try selecting a different filter above</p>
        </div>
      )}

      {/* Back */}
      <div className="text-center mt-14 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <button onClick={onBack} className="bg-white hover-lift rounded-2xl px-8 py-3.5 text-sm font-semibold flex items-center gap-2.5 mx-auto border border-stone-200/60 shadow-sm hover:bg-stone-50 transition-all duration-300 tracking-wide text-stone-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Detection
        </button>
      </div>
    </section>
  );
}
