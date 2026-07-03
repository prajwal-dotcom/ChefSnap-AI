import { useEffect, useRef, useCallback } from 'react';

/**
 * Toast — Light notification system with terracotta/sage variants.
 */

const COLORS = {
  brand:   'bg-sage/80 border-brand-200/50 text-forest',
  red:     'bg-red-50 border-red-200/50 text-red-700',
  emerald: 'bg-sage/80 border-brand-200/50 text-forest',
  purple:  'bg-purple-50 border-purple-200/50 text-purple-700',
};

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2.5 items-end">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const timerRef = useRef(null);
  const dismiss = useCallback(() => onDismiss(toast.id), [toast.id, onDismiss]);

  useEffect(() => {
    timerRef.current = setTimeout(dismiss, 2800);
    return () => clearTimeout(timerRef.current);
  }, [dismiss]);

  return (
    <div
      className={`${COLORS[toast.color] || COLORS.brand} border backdrop-blur-sm rounded-2xl px-5 py-3 text-sm font-medium tracking-wide shadow-md animate-slide-up cursor-pointer`}
      onClick={dismiss}
    >
      {toast.message}
    </div>
  );
}
