import React from 'react';

const SPONSORS = [
  { name: 'Alba', style: 'font-black tracking-tighter text-rose-600' },
  { name: 'SODIMAC', style: 'font-black tracking-wide text-red-700 italic' },
  { name: 'LOMA NEGRA', style: 'font-bold tracking-tight text-slate-800' },
  { name: 'weber', style: 'font-extrabold text-green-600 lowercase' },
  { name: 'Easy', style: 'font-black italic text-red-600 transform -skew-x-6' },
  { name: 'Sinteplast', style: 'font-bold text-blue-500' },
  { name: 'Blaisten', style: 'font-serif font-bold text-slate-900' },
  { name: 'Sherwin Williams', style: 'font-bold text-blue-800 tracking-tight' },
  { name: 'Klaukol', style: 'font-black text-red-600 uppercase' },
  { name: 'Holcim', style: 'font-bold text-red-600' },
];

export const SponsorTicker: React.FC = () => {
  // We duplicate the list to ensure smooth infinite scrolling without gaps
  const displaySponsors = [...SPONSORS, ...SPONSORS];

  return (
    <div className="w-full bg-white border-y border-slate-200 py-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
          Confían en nosotros las marcas líderes de Argentina
        </p>
      </div>
      
      <div className="flex w-[200%] animate-scroll">
        {displaySponsors.map((sponsor, index) => (
          <div 
            key={`${sponsor.name}-${index}`} 
            className="flex-1 flex items-center justify-center min-w-[150px] md:min-w-[200px] px-8 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
          >
            <span className={`text-2xl md:text-3xl ${sponsor.style} select-none`}>
              {sponsor.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* Gradient fade effect on sides */}
      <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
    </div>
  );
};