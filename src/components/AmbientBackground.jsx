/**
 * AmbientBackground — Floating minimalist kitchen SVGs.
 *
 * 8 tiny stroke-only outlines (leaf, tomato, citrus wedge, fork, spoon,
 * herb sprig, whisk, chili) scattered along the left/right margins.
 * Each drifts on one of 4 animation tracks (18–25 s loops).
 * Opacity kept at 0.12–0.20 so they sit behind content panels.
 */

const SHAPES = [
  {
    // 1 · Leaf — top-left margin
    className: 'absolute top-[8%] left-[4%] w-10 h-10 opacity-[0.14] animate-drift-1',
    svg: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 32 C8 32 6 16 20 8 C34 16 32 32 32 32" />
        <path d="M20 8 L20 32" />
        <path d="M14 18 Q20 22 20 22" />
        <path d="M26 18 Q20 22 20 22" />
      </svg>
    ),
  },
  {
    // 2 · Tomato circle — right margin, upper
    className: 'absolute top-[14%] right-[6%] w-9 h-9 opacity-[0.12] animate-drift-3',
    svg: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="18" cy="20" r="13" />
        <path d="M12 9 Q18 4 24 9" />
        <line x1="18" y1="7" x2="18" y2="4" />
      </svg>
    ),
  },
  {
    // 3 · Citrus wedge — left margin, middle-upper
    className: 'absolute top-[30%] left-[6%] w-11 h-11 opacity-[0.16] animate-drift-2',
    svg: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 38 A22 22 0 0 1 38 38 Z" />
        <path d="M22 38 L14 24" />
        <path d="M22 38 L22 20" />
        <path d="M22 38 L30 24" />
      </svg>
    ),
  },
  {
    // 4 · Fork — right margin, middle
    className: 'absolute top-[42%] right-[5%] w-7 h-14 opacity-[0.13] animate-drift-4',
    svg: (
      <svg viewBox="0 0 28 56" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <line x1="8" y1="4" x2="8" y2="22" />
        <line x1="14" y1="4" x2="14" y2="22" />
        <line x1="20" y1="4" x2="20" y2="22" />
        <path d="M8 22 Q8 28 14 28 Q20 28 20 22" />
        <line x1="14" y1="28" x2="14" y2="52" />
      </svg>
    ),
  },
  {
    // 5 · Spoon — left margin, middle-lower
    className: 'absolute top-[56%] left-[5%] w-7 h-14 opacity-[0.15] animate-drift-1',
    style: { animationDelay: '-6s' },
    svg: (
      <svg viewBox="0 0 28 56" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <ellipse cx="14" cy="12" rx="9" ry="10" />
        <line x1="14" y1="22" x2="14" y2="52" />
      </svg>
    ),
  },
  {
    // 6 · Herb sprig — right margin, lower-middle
    className: 'absolute top-[64%] right-[7%] w-10 h-12 opacity-[0.14] animate-drift-2',
    style: { animationDelay: '-10s' },
    svg: (
      <svg viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 44 Q20 30 20 8" />
        <path d="M20 14 Q10 10 8 4" />
        <path d="M20 14 Q30 10 32 4" />
        <path d="M20 24 Q12 20 10 14" />
        <path d="M20 24 Q28 20 30 14" />
        <path d="M20 34 Q14 30 12 24" />
        <path d="M20 34 Q26 30 28 24" />
      </svg>
    ),
  },
  {
    // 7 · Whisk — left margin, lower
    className: 'absolute top-[76%] left-[7%] w-8 h-14 opacity-[0.12] animate-drift-3',
    style: { animationDelay: '-8s' },
    svg: (
      <svg viewBox="0 0 32 56" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M10 4 Q6 20 16 28" />
        <path d="M16 4 Q16 20 16 28" />
        <path d="M22 4 Q26 20 16 28" />
        <line x1="16" y1="28" x2="16" y2="52" />
      </svg>
    ),
  },
  {
    // 8 · Chili pepper — right margin, bottom
    className: 'absolute top-[84%] right-[4%] w-10 h-8 opacity-[0.15] animate-drift-4',
    style: { animationDelay: '-5s' },
    svg: (
      <svg viewBox="0 0 40 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18 Q10 4 24 6 Q36 8 38 20 Q36 28 20 26 Q8 24 4 18Z" />
        <path d="M24 6 Q22 2 18 2" />
      </svg>
    ),
  },
];

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft radial warmth (unchanged from before) */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-100/40 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 -left-40 w-[450px] h-[450px] bg-terracotta/[0.04] rounded-full blur-[90px]" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-brand-100/30 rounded-full blur-[80px]" />

      {/* Floating kitchen SVGs */}
      {SHAPES.map((shape, i) => (
        <div key={i} className={`text-brand-300 ${shape.className}`} style={shape.style}>
          {shape.svg}
        </div>
      ))}
    </div>
  );
}
