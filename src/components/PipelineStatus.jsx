/**
 * PipelineStatus — Light pipeline stage display.
 */

const STAGES = [
  { label: 'Image Preprocessing',      status: 'complete', detail: 'Resized to 640×640, normalized' },
  { label: 'YOLOv8 Object Detection',  status: 'complete', detail: '3 objects detected' },
  { label: 'Food Classification Gate', status: 'failed',   detail: 'FAILED — 0/3 objects are food items' },
  { label: 'Ingredient Extraction',    status: 'skipped',  detail: 'Skipped — blocked by gate' },
  { label: 'Recipe Generation Engine', status: 'skipped',  detail: 'Skipped — no valid ingredients' },
];

const STATUS_STYLES = {
  complete: {
    row:  'bg-sage/40 border border-brand-200/40',
    dot:  'bg-brand-100 text-brand-400',
    text: 'text-brand-300',
  },
  failed: {
    row:  'bg-red-50/60 border border-red-200/40',
    dot:  'bg-red-100 text-red-500',
    text: 'text-red-400',
  },
  skipped: {
    row:  'bg-stone-50 border border-stone-200/40',
    dot:  'bg-stone-100 text-stone-400',
    text: 'text-stone-400',
  },
};

const ICONS = {
  complete: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ),
  failed: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  ),
  skipped: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  ),
};

export default function PipelineStatus() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-stone-200/60 shadow-sm animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-semibold mb-6">
        Pipeline Execution Status
      </p>
      <div className="space-y-3">
        {STAGES.map((stage) => {
          const s = STATUS_STYLES[stage.status];
          return (
            <div key={stage.label} className={`flex items-center gap-3.5 px-4 py-3 rounded-xl ${s.row}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${s.dot}`}>
                {ICONS[stage.status]}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium tracking-wide ${stage.status === 'skipped' ? 'text-stone-400' : 'text-stone-700'}`}>
                  {stage.label}
                </p>
                <p className={`text-xs ${s.text} font-mono tracking-wider`}>{stage.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
