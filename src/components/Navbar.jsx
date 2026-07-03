import { useEffect, useState } from 'react';

/**
 * Navbar — Bright Scandinavian navbar with forest green logo and sage status pill.
 */

const LABELS = ['Upload', 'Detect', 'Recipes', 'Cook'];

export default function Navbar({ currentScreen, onNavigate, canNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-200/60' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-10 py-6 flex items-center justify-between">
        {/* ── Logo ── */}
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-forest flex items-start">
              Chef<span className="gradient-text">Snap</span> AI<span className="text-[9px] font-normal text-stone-400 ml-0.5 mt-0.5">™</span>
            </h1>
            <p className="text-[10px] text-stone-400 font-medium tracking-[0.2em] uppercase">
              Snap · Detect · Cook
            </p>
          </div>
        </div>

        {/* ── Navigation Pills ── */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 bg-stone-100/70 rounded-full px-1.5 py-1.5 border border-stone-200/50">
            {LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => canNavigate(i) && onNavigate(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  i === currentScreen
                    ? 'bg-white text-forest shadow-sm'
                    : 'text-stone-400 hover:text-stone-600'
                } ${!canNavigate(i) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="bg-sage/60 rounded-full px-3.5 py-1.5 text-[11px] font-mono text-forest/70 flex items-center gap-2 tracking-wide border border-brand-200/40">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            Pipeline Active
          </div>
        </div>
      </div>
    </nav>
  );
}
