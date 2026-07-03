import { useState, useCallback } from 'react';
import { SUBSTITUTIONS } from '../data/substitutions';

/**
 * StepByStepGuide — Premium bright cooking guide with terracotta time badges.
 */

export default function StepByStepGuide({ recipe, onBack, onOpenSubstitution, showToast }) {
  const [checked, setChecked] = useState(() => new Array(recipe.steps.length).fill(false));
  const doneCount = checked.filter(Boolean).length;
  const pct = Math.round((doneCount / recipe.steps.length) * 100);
  const allDone = doneCount === recipe.steps.length;

  const totalMin = parseInt(recipe.time) || 30;
  const prepMin = Math.round(totalMin * 0.3);

  const toggleStep = useCallback(
    (index) => {
      setChecked((prev) => {
        const next = [...prev];
        next[index] = !next[index];
        if (next.every(Boolean)) {
          showToast('🎉 All steps completed — Enjoy your meal!', 'emerald');
        }
        return next;
      });
    },
    [showToast],
  );

  return (
    <section className="max-w-4xl mx-auto px-10">
      {/* Back link */}
      <div className="animate-slide-up">
        <button onClick={onBack} className="flex items-center gap-2.5 text-sm text-stone-400 hover:text-forest transition-colors duration-300 mb-10 group tracking-wide">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Recipes
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl overflow-hidden mb-12 border border-stone-200/60 shadow-sm">
          <div className={`relative h-56 bg-gradient-to-br ${recipe.gradient} flex items-center justify-center`}>
            <span className="text-8xl animate-float">{recipe.image}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-8 right-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {recipe.categories.map((c) => (
                  <span key={c} className="text-[10px] font-semibold uppercase tracking-[0.2em] bg-sage/80 px-3 py-1 rounded-full text-forest/80 border border-brand-200/40">
                    {c}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl font-extrabold text-forest tracking-tight">{recipe.name}</h2>
            </div>
          </div>

          {/* Meta Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-stone-200/60 border-t border-stone-200/60">
            <Stat label="Total Time" value={recipe.time} valueClass="text-terracotta" />
            <Stat label="Prep Time" value={`${prepMin} min`} valueClass="text-terracotta" />
            <Stat label={recipe.difficulty}>
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 3 }, (_, i) => (
                  <span key={i} className={`text-sm ${i < recipe.difficultyLevel ? 'text-terracotta' : 'text-stone-200'}`}>★</span>
                ))}
              </div>
            </Stat>
            <Stat label="Calories" value={recipe.calories} valueClass="text-brand-400" />
          </div>
        </div>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Ingredients Panel */}
        <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-white rounded-2xl p-8 sticky top-28 border border-stone-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-7">
              <h3 className="text-base font-bold text-forest flex items-center gap-2.5 tracking-wide">
                <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                </svg>
                Ingredients
              </h3>
              <span className="text-xs text-stone-400 font-mono tracking-wider">{recipe.servings} servings</span>
            </div>

            <ul className="space-y-1.5">
              {recipe.ingredients.map((ing) => {
                const matchedSub = recipe.substitutions.find((s) => ing.includes(s));
                return (
                  <li
                    key={ing}
                    className={`flex items-start gap-3 text-sm py-3 px-3 rounded-xl hover:bg-stone-50 transition-colors duration-200 group ${matchedSub ? 'cursor-pointer' : ''}`}
                    onClick={() => matchedSub && onOpenSubstitution(matchedSub)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-300/60 mt-2 flex-shrink-0" />
                    <span className="text-stone-600 font-light leading-relaxed tracking-wide">{ing}</span>
                    {matchedSub && (
                      <span className="ml-auto text-[10px] text-purple-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                        </svg>
                        Swap
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            {recipe.substitutions.length > 0 && (
              <div className="mt-7 pt-6 border-t border-stone-200/50">
                <p className="text-[10px] text-purple-500/50 uppercase tracking-[0.2em] font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                  Quick Substitutions Available
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {recipe.substitutions.map((s) => {
                    const sub = SUBSTITUTIONS[s];
                    if (!sub || sub.length === 0) return null;
                    return (
                      <button
                        key={s}
                        onClick={() => onOpenSubstitution(s)}
                        className="text-xs bg-purple-50/60 hover:bg-purple-50 border border-purple-200/40 rounded-xl px-3.5 py-1.5 text-purple-600/70 transition-all duration-300 flex items-center gap-1.5 hover:scale-105 tracking-wide"
                      >
                        <span>{s}</span>
                        <svg className="w-3 h-3 text-purple-400/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        <span className="text-purple-500/60">{sub[0].sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Steps Panel */}
        <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-2xl p-8 border border-stone-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-base font-bold text-forest flex items-center gap-2.5 tracking-wide">
                <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
                Cooking Steps
              </h3>
              <span className="text-xs font-mono text-brand-400/60 tracking-wider">
                {doneCount}/{recipe.steps.length} completed
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-stone-100 rounded-full h-1.5 mb-10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-300 transition-all duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-5">
              {recipe.steps.map((step, i) => (
                <div
                  key={i}
                  className={`group flex gap-5 p-5 rounded-2xl hover:bg-stone-50/70 transition-all duration-300 border border-transparent hover:border-stone-200/50 ${
                    checked[i] ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex-shrink-0 pt-0.5">
                    <label className="relative flex items-center justify-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={checked[i]}
                        onChange={() => toggleStep(i)}
                      />
                      <div className="w-7 h-7 rounded-lg border-2 border-stone-300 peer-checked:border-brand-400 peer-checked:bg-sage flex items-center justify-center transition-all duration-300">
                        <svg className={`w-4 h-4 text-forest transition-opacity duration-300 ${checked[i] ? 'opacity-100' : 'opacity-0'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </label>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-semibold text-brand-300/60 uppercase tracking-[0.2em]">
                          Step {i + 1}
                        </span>
                        <p className={`text-sm text-stone-700 font-light leading-relaxed mt-2 tracking-wide transition-all duration-300 ${
                          checked[i] ? 'line-through text-stone-400' : ''
                        }`}>
                          {step.text}
                        </p>
                      </div>
                      {step.time !== '—' && (
                        <span className="flex-shrink-0 text-[11px] font-mono text-terracotta bg-orange-50/60 border border-orange-200/30 rounded-lg px-3 py-1 mt-1 flex items-center gap-1 tracking-wider">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {step.time}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {allDone && (
              <div className="mt-10 rounded-2xl bg-sage/40 border border-brand-200/40 p-7 text-center animate-pop">
                <span className="text-4xl mb-3 block">🎉</span>
                <h4 className="text-lg font-bold text-forest tracking-wide mb-1">Cooking Complete!</h4>
                <p className="text-sm text-stone-500 font-light tracking-wide">
                  Your <span className="text-brand-400 font-semibold">{recipe.name}</span> is ready to serve. Bon appétit!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, valueClass = 'text-forest', children }) {
  return (
    <div className="p-6 text-center">
      {children || <p className={`text-lg font-bold ${valueClass}`}>{value}</p>}
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mt-1.5">{label}</p>
    </div>
  );
}
