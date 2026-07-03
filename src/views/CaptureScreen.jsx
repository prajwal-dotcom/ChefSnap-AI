import UploadZone from '../components/UploadZone';

/**
 * CaptureScreen — Bright upload dashboard with forest green CTA.
 */

export default function CaptureScreen({
  uploadMode,
  previewSrc,
  isProcessing,
  onFileSelect,
  onSimulateFood,
  onSimulateNonFood,
  onStartDetection,
}) {
  const canProcess = uploadMode !== null && !isProcessing;

  return (
    <section className="max-w-5xl mx-auto px-10">
      {/* Header */}
      <div className="text-center mb-16 animate-slide-up">
        <div className="inline-flex items-center gap-2.5 bg-sage/50 rounded-full px-5 py-2 mb-8 border border-brand-200/30">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-xs font-medium text-forest/70 tracking-widest uppercase">
            YOLOv8 Vision Engine Ready
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-forest">
          Capture Your <span className="gradient-text">Ingredients</span>
        </h2>
        <p className="text-stone-500 font-light max-w-lg mx-auto text-base leading-relaxed tracking-wide">
          Drop a photo of your ingredients below and our AI engine will identify them with precision confidence scores.
        </p>
      </div>

      <UploadZone
        previewSrc={previewSrc}
        onFileSelect={onFileSelect}
        isPulsing={uploadMode !== null && !isProcessing}
      />

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center justify-center gap-5 mt-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <button
          onClick={onSimulateFood}
          className={`
            bg-white hover-lift rounded-2xl px-8 py-4 text-sm font-semibold border
            flex items-center gap-3 transition-all duration-300 group tracking-wide shadow-sm
            ${uploadMode === 'food'
              ? 'ring-1 ring-brand-300/40 border-brand-200/60 bg-sage/30'
              : 'border-stone-200/60 hover:bg-stone-50'}
          `}
        >
          <span className="text-xl group-hover:scale-125 transition-transform duration-300">🥗</span>
          Simulate Food Image
        </button>
        <button
          onClick={onSimulateNonFood}
          className={`
            bg-white hover-lift rounded-2xl px-8 py-4 text-sm font-semibold border
            flex items-center gap-3 transition-all duration-300 group tracking-wide shadow-sm
            ${uploadMode === 'nonfood'
              ? 'ring-1 ring-red-300/40 border-red-200/60 bg-red-50/30'
              : 'border-stone-200/60 hover:bg-stone-50'}
          `}
        >
          <span className="text-xl group-hover:scale-125 transition-transform duration-300">🔌</span>
          Test Non-Food Detection
        </button>
      </div>

      {/* Process Button */}
      <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={onStartDetection}
          disabled={!canProcess}
          className="relative inline-flex items-center gap-3 bg-forest text-white font-bold text-base px-12 py-4 rounded-2xl hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/15 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 tracking-wide"
        >
          {isProcessing ? (
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          )}
          {isProcessing ? 'Analyzing…' : 'Analyze Ingredients with AI'}
        </button>
      </div>
    </section>
  );
}
