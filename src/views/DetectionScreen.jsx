import { NONFOOD_ITEMS, FOOD_INGREDIENTS } from '../data/ingredients';
import IngredientBadge from '../components/IngredientBadge';
import Banner from '../components/Banner';
import PipelineStatus from '../components/PipelineStatus';

/**
 * DetectionScreen — Bright detection results with sage stats and terracotta accents.
 */

export default function DetectionScreen({
  uploadMode,
  detectedIngredients,
  onBack,
  onProceed,
  onOpenSubstitution,
}) {
  const isNonFood = uploadMode === 'nonfood';
  const avgConf = detectedIngredients.length
    ? Math.round(detectedIngredients.reduce((a, b) => a + b.confidence, 0) / detectedIngredients.length)
    : 0;

  return (
    <section className="max-w-5xl mx-auto px-10">
      {/* Header */}
      <div className="text-center mb-16 animate-slide-up">
        <div className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-8 border ${
          isNonFood
            ? 'bg-red-50/60 border-red-200/40'
            : 'bg-sage/50 border-brand-200/30'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isNonFood ? 'bg-red-400' : 'bg-brand-400'} animate-pulse`} />
          <span className={`text-xs font-medium font-mono tracking-widest ${isNonFood ? 'text-red-600/70' : 'text-forest/70'}`}>
            YOLOv8 Analysis Complete · {isNonFood ? '0 Food Items' : `${FOOD_INGREDIENTS.length} Items`} Detected
          </span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight mb-5 text-forest">
          {isNonFood ? (
            <><span className="text-red-600">Non-Food</span> Detected</>
          ) : (
            <>Ingredient <span className="gradient-text">Detection</span> Results</>
          )}
        </h2>
        <p className="text-stone-500 font-light max-w-lg mx-auto leading-relaxed tracking-wide">
          {isNonFood
            ? 'The vision engine detected non-food objects in your image. Please upload a photo containing food ingredients.'
            : 'Our YOLOv8 vision engine has identified the following ingredients with confidence scores.'}
        </p>
      </div>

      {/* ── Non-Food Path ── */}
      {isNonFood && (
        <>
          <div className="max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <Banner
              variant="error"
              title="⚠ Food Validation Failed"
              icon={
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              }
            >
              <p className="text-red-700/60 text-sm font-light leading-relaxed mb-6 tracking-wide">
                The YOLOv8 classification layer has determined that the uploaded image{' '}
                <strong className="font-semibold">does not contain food items</strong>. The pipeline has been halted at the
                validation gate to prevent invalid recipe generation.
              </p>
              <div className="bg-white rounded-xl p-5 border border-red-200/40">
                <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-semibold mb-4">
                  Detected Non-Food Objects
                </p>
                <div className="flex flex-wrap gap-3">
                  {NONFOOD_ITEMS.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 bg-red-50/60 border border-red-200/40 rounded-xl px-4 py-2.5">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="text-sm font-medium text-red-700/70 tracking-wide">{item.name}</span>
                      <span className="text-xs font-mono text-red-400/50 tracking-wider">{item.confidence}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Banner>
          </div>

          <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <PipelineStatus />
          </div>
        </>
      )}

      {/* ── Food Path ── */}
      {!isNonFood && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            {detectedIngredients.map((item, i) => (
              <IngredientBadge
                key={item.name}
                ingredient={item}
                index={i}
                onOpenSubstitution={onOpenSubstitution}
              />
            ))}
          </div>

          {/* Summary Stats */}
          <div className="max-w-2xl mx-auto grid grid-cols-3 gap-5 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-xl p-6 text-center border border-stone-200/60 shadow-sm">
              <p className="text-2xl font-extrabold gradient-text">{detectedIngredients.length}</p>
              <p className="text-xs text-stone-400 mt-1.5 tracking-wide">Ingredients Found</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-stone-200/60 shadow-sm">
              <p className="text-2xl font-extrabold text-brand-400">{avgConf}%</p>
              <p className="text-xs text-stone-400 mt-1.5 tracking-wide">Avg Confidence</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-stone-200/60 shadow-sm">
              <p className="text-2xl font-extrabold text-terracotta">1.2s</p>
              <p className="text-xs text-stone-400 mt-1.5 tracking-wide">Inference Time</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-8 animate-slide-up" style={{ animationDelay: '0.45s' }}>
            <div className="bg-purple-50/40 rounded-xl px-6 py-4 flex items-center gap-3 border border-purple-200/40">
              <span className="text-purple-400">💡</span>
              <p className="text-xs text-stone-500 font-light tracking-wide">
                <strong className="text-purple-600 font-medium">Tip:</strong> Click any ingredient badge to explore smart substitution options.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-5 mt-14 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <button onClick={onBack} className="bg-white hover-lift rounded-2xl px-8 py-3.5 text-sm font-semibold flex items-center gap-2.5 border border-stone-200/60 shadow-sm hover:bg-stone-50 transition-all duration-300 tracking-wide text-stone-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Upload New Image
        </button>
        {!isNonFood && (
          <button onClick={onProceed} className="bg-forest text-white font-bold text-sm px-10 py-3.5 rounded-2xl hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/15 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2.5 tracking-wide">
            Generate Recipes
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
