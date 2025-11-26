import React from 'react';

interface AdBannerProps {
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  variant?: 'primary' | 'secondary';
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  title, 
  description, 
  imageUrl, 
  ctaText,
  variant = 'primary'
}) => {
  const isPrimary = variant === 'primary';

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-md border group cursor-pointer transition-transform hover:scale-[1.02] ${isPrimary ? 'border-blue-200 bg-blue-50' : 'border-amber-200 bg-amber-50'}`}>
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm z-10 text-slate-500">
        Publicidad
      </div>
      
      <div className="flex flex-row p-4 gap-4 items-center">
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-sm">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1">
          <h4 className={`font-bold text-lg leading-tight ${isPrimary ? 'text-blue-900' : 'text-amber-900'}`}>
            {title}
          </h4>
          <p className="text-xs text-slate-600 mt-1 mb-2 line-clamp-2">
            {description}
          </p>
          <button className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
            isPrimary 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}>
            {ctaText} &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};