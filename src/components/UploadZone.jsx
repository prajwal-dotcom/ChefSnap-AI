import { useRef } from 'react';

/**
 * UploadZone — Bright drag-and-drop with warm-pulse when primed.
 */

export default function UploadZone({ previewSrc, onFileSelect, isPulsing = false }) {
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('ring-2', 'ring-brand-300/40');
  };
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('ring-2', 'ring-brand-300/40');
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('ring-2', 'ring-brand-300/40');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) onFileSelect(file);
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      className={`
        relative max-w-2xl mx-auto rounded-3xl bg-white border border-stone-200/60
        shadow-sm hover-lift cursor-pointer group animate-slide-up overflow-hidden
        transition-all duration-500
        ${isPulsing ? 'animate-warm-pulse ring-1 ring-brand-200/60' : ''}
      `}
      style={{ animationDelay: '0.1s' }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} />

      <div className="relative">
        <div className="aspect-[16/10] w-full overflow-hidden bg-stone-50">
          {previewSrc ? (
            <img src={previewSrc} alt="Uploaded ingredients" className="w-full h-full object-cover" />
          ) : (
            <DefaultIllustration />
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent flex flex-col items-center justify-end pb-12 group-hover:from-white/100 transition-all duration-500">
          <div className="w-14 h-14 rounded-2xl bg-sage border border-brand-200/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
            <svg className="w-7 h-7 text-forest" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <p className="text-forest font-semibold text-lg tracking-wide mb-1.5">
            Drop image here or click to browse
          </p>
          <p className="text-stone-400 text-sm font-light tracking-wide">
            Supports JPG, PNG, WebP · Max 10MB
          </p>
        </div>
      </div>
    </div>
  );
}

function DefaultIllustration() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#FAF9F6" />
      <rect x="120" y="130" width="560" height="280" rx="30" fill="#E2ECE9" opacity="0.4" />
      <rect x="135" y="145" width="530" height="250" rx="22" fill="#E2ECE9" opacity="0.25" />
      <circle cx="260" cy="260" r="55" fill="#dc2626" opacity="0.6" />
      <circle cx="260" cy="260" r="48" fill="#ef4444" opacity="0.65" />
      <path d="M245 215 Q260 200 275 215" stroke="#22c55e" strokeWidth="4" fill="none" />
      <ellipse cx="420" cy="280" rx="50" ry="42" fill="#d97706" opacity="0.5" />
      <ellipse cx="420" cy="280" rx="42" ry="35" fill="#fbbf24" opacity="0.4" />
      <ellipse cx="420" cy="280" rx="28" ry="22" fill="#fde68a" opacity="0.3" />
      <path d="M410 240 Q420 225 430 240" stroke="#65a30d" strokeWidth="3" fill="none" />
      <ellipse cx="560" cy="260" rx="42" ry="52" fill="#16a34a" opacity="0.55" />
      <ellipse cx="560" cy="260" rx="35" ry="45" fill="#22c55e" opacity="0.45" />
      <rect x="555" y="208" width="10" height="16" rx="3" fill="#15803d" />
      <ellipse cx="340" cy="350" rx="28" ry="24" fill="#d6d3d1" opacity="0.7" />
      <ellipse cx="340" cy="350" rx="22" ry="18" fill="#e7e5e4" opacity="0.6" />
      <path d="M490 340 Q530 320 550 350 Q530 360 490 340Z" fill="#dc2626" opacity="0.55" />
      <ellipse cx="200" cy="360" rx="30" ry="24" fill="#eab308" opacity="0.55" />
      <ellipse cx="200" cy="360" rx="24" ry="18" fill="#facc15" opacity="0.45" />
      <text x="400" y="460" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13" fill="#a8a29e" fontWeight="400">
        Sample ingredient spread — upload your own photo
      </text>
    </svg>
  );
}
