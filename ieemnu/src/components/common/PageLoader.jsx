/**
 * PageLoader Component
 * Reusable loading skeleton that shows while page content loads
 * Prevents animation tearing and ensures smooth page transitions
 */

import { memo } from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader = memo(({ title = 'Loading', color = 'teal' }) => {
  const colorClasses = {
    teal: 'from-teal-600 via-cyan-600 to-blue-700',
    blue: 'from-blue-600 via-indigo-600 to-purple-700',
    purple: 'from-purple-600 via-pink-600 to-rose-700',
    green: 'from-green-600 via-emerald-600 to-teal-700',
  };

  const gradient = colorClasses[color] || colorClasses.teal;

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${gradient}`}>
      <div className="text-center">
        {/* Animated spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-white/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin" />
          <Loader2 className="absolute inset-0 m-auto w-6 h-6 text-white animate-spin" style={{ animationDuration: '1.5s' }} />
        </div>
        
        {/* Loading text */}
        <h2 className="text-lg font-bold text-white mb-1">{title}</h2>
        <p className="text-white/70 text-sm">Please wait...</p>
        
        {/* Skeleton preview */}
        <div className="flex justify-center gap-3 mt-6">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className="w-10 h-10 rounded-full bg-white/20 animate-pulse" 
              style={{ animationDelay: `${i * 0.15}s` }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
});

PageLoader.displayName = 'PageLoader';

export default PageLoader;
