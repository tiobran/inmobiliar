import React from 'react';
import { CostAnalysis } from '../types';

interface CostEstimatorProps {
  analysis: CostAnalysis | null;
  loading: boolean;
  onSimulate?: () => void;
}

// Helper para iconos según categoría
const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('pintura')) return '🎨';
  if (cat.includes('piso') || cat.includes('suelo')) return '🪵';
  if (cat.includes('electric') || cat.includes('luz')) return '💡';
  if (cat.includes('agua') || cat.includes('plomer')) return '🚰';
  if (cat.includes('albañil') || cat.includes('pared')) return '🧱';
  if (cat.includes('limpieza')) return '🧹';
  if (cat.includes('mueble') || cat.includes('deco')) return '🪑';
  return '🛠️';
};

const getUrgencyStyles = (urgency: string) => {
  switch (urgency) {
    case 'Alta': return 'bg-red-100 text-red-700 border-red-200';
    case 'Media': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Baja': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const CostEstimator: React.FC<CostEstimatorProps> = ({ analysis, loading, onSimulate }) => {
  const today = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 h-full flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-100 border-t-blue-600 mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center text-xl">🏠</div>
        </div>
        <h3 className="text-lg font-bold text-slate-800">Calculando Materiales y Mano de Obra...</h3>
        <p className="text-slate-500 text-sm mt-2 text-center max-w-xs">
          Nuestra IA está consultando precios de mercado actualizados en Argentina.
        </p>
        <div className="mt-6 w-full max-w-xs bg-slate-100 rounded-full h-2 overflow-hidden">
          <div className="bg-blue-600 h-full animate-scroll w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 h-full flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 border border-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 3.666A5.002 5.002 0 0112 21a5.002 5.002 0 01-5.556-3.587M9 10.334V3m6 7.334V3M9 7L9 3m6 4L15 3M9 16.5l3 1.5 3-1.5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">Presupuesto Detallado</h3>
        <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto mb-6">
          Sube una foto para recibir un desglose ítem por ítem con precios de materiales y mano de obra.
        </p>
        
        {onSimulate && (
          <button 
            onClick={onSimulate}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-md mb-6 flex items-center gap-2"
          >
            <span>📄</span> Ver Ejemplo de Presupuesto
          </button>
        )}

        <div className="flex gap-2 text-xs text-slate-400 font-medium bg-slate-50 py-2 px-4 rounded-lg border border-slate-100">
          <span className="flex items-center">✅ Precios CABA/GBA</span>
          <span className="flex items-center">✅ Materiales</span>
          <span className="flex items-center">✅ Mano de Obra</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 h-full flex flex-col overflow-hidden relative">
      {/* Header Invoice Style */}
      <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            🧾 Presupuesto Estimado
          </h3>
          <p className="text-xs text-slate-500 mt-1">Ref: #IA-{Math.floor(Math.random() * 10000)} • {today}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition" title="Descargar PDF">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition" title="Compartir">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Summary Box */}
      <div className="px-6 py-4 bg-blue-50/50 border-b border-blue-100">
        <p className="text-sm text-blue-800 leading-relaxed font-medium">
          <span className="mr-2">💡</span>
          {analysis.summary}
        </p>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {analysis.items.map((item, index) => (
          <div key={index} className="group relative pl-4 border-l-2 border-slate-200 hover:border-blue-500 transition-colors">
            
            {/* Header Item */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label={item.category}>
                  {getCategoryIcon(item.category)}
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{item.category}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${getUrgencyStyles(item.urgency)}`}>
                    {item.urgency}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-bold text-slate-800">US$ {item.estimatedCostUSD.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400">IVA incl.</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 mb-3 leading-relaxed">
              {item.description}
            </p>

            {/* Price Range Visualization (Mock UI for visual detail) */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1 overflow-hidden flex">
              <div className="bg-slate-300 w-[20%]"></div>
              <div className="bg-blue-500 w-[40%] relative group-hover:bg-blue-600 transition-colors"></div>
              <div className="bg-slate-300 w-[40%]"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Económico</span>
              <span className="font-medium text-slate-600">Promedio Mercado</span>
              <span>Premium</span>
            </div>

          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="bg-slate-900 p-6 text-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10">
        <div className="space-y-1 mb-4 border-b border-slate-700 pb-4">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Subtotal Materiales (est.)</span>
            <span>US$ {(analysis.totalCostUSD * 0.45).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-400">
            <span>Mano de Obra (est.)</span>
            <span>US$ {(analysis.totalCostUSD * 0.55).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Inversión Total Estimada</span>
            <div className="text-[10px] text-slate-500 mt-1">Dólar BNA Venta</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
              US$ {analysis.totalCostUSD.toLocaleString()}
            </div>
            <div className="text-sm text-slate-400 font-medium">
              ≈ AR$ {analysis.totalCostARS.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};