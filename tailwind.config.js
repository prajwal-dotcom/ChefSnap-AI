/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        /* ── Forest Green scale (primary brand) ── */
        brand: {
          50:  '#f2f6f4',
          100: '#E2ECE9',
          200: '#c2d5cc',
          300: '#5a8a73',
          400: '#3d6b54',
          500: '#2D4238',
          600: '#243630',
          700: '#1a2922',
          800: '#111c17',
          900: '#0a110d',
        },
        forest:     '#2D4238',
        sage:       '#E2ECE9',
        terracotta: '#C07A65',
        cream:      '#FAF9F6',
      },
      animation: {
        'float':      'float 7s ease-in-out infinite',
        'slide-up':   'slideUp 0.6s cubic-bezier(0.16,1,0.3,1)',
        'fade-in':    'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'pop':        'pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275)',
        'warm-pulse': 'warmPulse 3s ease-in-out infinite',
        'drift-1':    'drift1 18s ease-in-out infinite',
        'drift-2':    'drift2 22s ease-in-out infinite',
        'drift-3':    'drift3 25s ease-in-out infinite',
        'drift-4':    'drift4 20s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInUp: {
          '0%':   { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pop: {
          '0%':   { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)',   opacity: 1 },
        },
        warmPulse: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(45,66,56,0.04)' },
          '50%':     { boxShadow: '0 0 0 8px rgba(45,66,56,0.00)' },
        },
        drift1: {
          '0%':   { transform: 'translateY(0)   rotate(0deg)' },
          '25%':  { transform: 'translateY(-18px) rotate(4deg)' },
          '50%':  { transform: 'translateY(-8px)  rotate(-3deg)' },
          '75%':  { transform: 'translateY(-22px) rotate(2deg)' },
          '100%': { transform: 'translateY(0)   rotate(0deg)' },
        },
        drift2: {
          '0%':   { transform: 'translate(0, 0)      rotate(0deg)' },
          '33%':  { transform: 'translate(12px, -14px) rotate(-5deg)' },
          '66%':  { transform: 'translate(-8px, -24px) rotate(3deg)' },
          '100%': { transform: 'translate(0, 0)      rotate(0deg)' },
        },
        drift3: {
          '0%':   { transform: 'translate(0, 0)       rotate(0deg)' },
          '20%':  { transform: 'translate(-10px, -20px) rotate(6deg)' },
          '50%':  { transform: 'translate(6px, -10px)  rotate(-4deg)' },
          '80%':  { transform: 'translate(-14px, -26px) rotate(3deg)' },
          '100%': { transform: 'translate(0, 0)       rotate(0deg)' },
        },
        drift4: {
          '0%':   { transform: 'translateY(0)    rotate(0deg)' },
          '30%':  { transform: 'translateY(-16px) rotate(-6deg)' },
          '60%':  { transform: 'translateY(-28px) rotate(4deg)' },
          '100%': { transform: 'translateY(0)    rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
};
