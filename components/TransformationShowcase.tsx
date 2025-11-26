import React from 'react';

export const TransformationShowcase: React.FC = () => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Ejemplo: Recuperación de Valor
        </h3>
        <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full">
          Potenciado por Gemini 2.5
        </span>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        
        {/* Before Image */}
        <div className="relative group overflow-hidden rounded-xl h-[500px] bg-slate-900">
          <div className="absolute top-3 left-3 z-10">
             <span className="bg-red-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 border border-red-700/50">
               🏚️ Estado Original
             </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 z-10">
             <div className="bg-black/70 backdrop-blur text-white text-[10px] px-3 py-2 rounded-lg shadow-sm border-l-2 border-red-500">
               <span className="font-bold block mb-1">Diagnóstico IA:</span>
               Humedad ascendente en muros, parquet de roble degradado, falta de zócalos, instalación eléctrica obsoleta.
             </div>
          </div>
          {/* Imagen local casafea.jpg solicitada por el usuario */}
          <img 
            src="/casafea.jpg" 
            alt="Departamento antiguo estado original con humedad" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
            // Filtros suaves para integrar la imagen pero mantener su aspecto "feo" original
            style={{ filter: 'contrast(1.1) sepia(0.2)' }}
          />
        </div>

        {/* Center Arrow Icon (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-xl border-4 border-slate-50 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </div>

        {/* After Image */}
        <div className="relative group overflow-hidden rounded-xl h-[500px]">
          <div className="absolute top-3 right-3 z-10">
             <span className="bg-emerald-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 border border-emerald-400">
               ✨ Remodelado IA
             </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-end">
             <div className="bg-white/90 backdrop-blur text-slate-800 text-[10px] px-3 py-2 rounded-lg text-right shadow-lg border-r-2 border-emerald-500">
               <span className="font-bold block mb-1 text-emerald-700">Propuesta de Valor:</span>
               Estilo Nórdico Industrial.<br/>
               Restauración de parquet + Cortinas lino.<br/>
               <span className="font-bold text-emerald-600">+42% Valor de Venta</span>
             </div>
          </div>
          {/* Imagen remodelada vertical que coincide en perspectiva (ventana central) */}
          <img 
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop" 
            alt="Departamento remodelado IA" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

      </div>
      <p className="text-center text-xs text-slate-400 mt-3 italic flex items-center justify-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Desliza para ver cómo la IA recupera el valor de mercado de propiedades deterioradas.
      </p>
    </div>
  );
};