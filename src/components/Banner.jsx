/**
 * Banner — Light alert banners with colored accent bars.
 */

const variants = {
  error: {
    wrapper: 'border-red-200/60 bg-red-50/60',
    bar:     'bg-gradient-to-r from-red-400 via-terracotta to-red-400',
    iconBg:  'bg-red-100',
    title:   'text-red-700',
  },
  info: {
    wrapper: 'border-purple-200/60 bg-purple-50/40',
    bar:     'bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400',
    iconBg:  'bg-purple-100',
    title:   'text-purple-700',
  },
};

export default function Banner({ variant = 'error', icon, title, children }) {
  const v = variants[variant] ?? variants.error;

  return (
    <div className={`rounded-2xl border ${v.wrapper} p-8 relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${v.bar}`} />
      <div className="flex items-start gap-5">
        <div className={`w-12 h-12 rounded-xl ${v.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`${v.title} font-bold text-lg mb-3 tracking-wide`}>{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
}
