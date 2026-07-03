import { SUBSTITUTIONS } from '../data/substitutions';

/**
 * SubstitutionModal — Light cream overlay with white card.
 */

export default function SubstitutionModal({ ingredientName, isOpen, onClose, showToast }) {
  if (!isOpen || !ingredientName) return null;

  const subs = SUBSTITUTIONS[ingredientName];
  if (!subs || subs.length === 0) return null;

  const handleApply = (subName) => {
    showToast(`✅ ${subName} substitution applied to recipe engine`, 'purple');
    setTimeout(onClose, 500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center modal-overlay p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl p-9 max-w-lg w-full animate-pop relative border border-stone-200/60 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors duration-200"
        >
          <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/50 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-forest tracking-wide">Smart Substitutions</h3>
            <p className="text-sm text-stone-500 font-light">
              Alternatives for <span className="text-brand-400 font-semibold">{ingredientName}</span>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {subs.map((sub, i) => (
            <button
              key={i}
              onClick={() => handleApply(sub.sub)}
              className="w-full text-left group rounded-2xl bg-stone-50/70 border border-stone-200/50 hover:border-purple-300/50 p-5 transition-all duration-300 cursor-pointer hover:bg-purple-50/40"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sub.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-stone-400 line-through">{sub.original}</span>
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <span className="text-sm font-semibold text-forest tracking-wide">{sub.sub}</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full border border-purple-200/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-50">
                  <svg className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-stone-400 font-light pl-11 tracking-wide">{sub.note}</p>
            </button>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200/50 flex items-center gap-2 text-xs text-stone-400 font-light tracking-wide">
          <svg className="w-4 h-4 text-brand-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Substitution ratios are automatically adjusted by the recipe engine.
        </div>
      </div>
    </div>
  );
}
