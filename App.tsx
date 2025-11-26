import React, { useState, useRef } from 'react';
import { analyzeImageCosts, generateRenovationPreview } from './services/geminiService';
import { AppState, CostAnalysis, TransformationStyle } from './types';
import { CostEstimator } from './components/CostEstimator';
import { ProviderList } from './components/ProviderList';
import { AdBanner } from './components/AdBanner';
import { SponsorTicker } from './components/SponsorTicker';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    originalImage: null,
    generatedImage: null,
    isAnalyzing: false,
    isGenerating: false,
    analysis: null,
    selectedStyle: TransformationStyle.ORIGINAL,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setState(prev => ({ 
          ...prev, 
          originalImage: base64, 
          generatedImage: null, 
          analysis: null,
          selectedStyle: TransformationStyle.ORIGINAL 
        }));
        
        // Auto trigger analysis on upload
        performAnalysis(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const performAnalysis = async (base64: string) => {
    setState(prev => ({ ...prev, isAnalyzing: true }));
    try {
      const analysisResult = await analyzeImageCosts(base64);
      setState(prev => ({ ...prev, analysis: analysisResult, isAnalyzing: false }));
    } catch (error) {
      console.error(error);
      setState(prev => ({ ...prev, isAnalyzing: false }));
      alert("Error al analizar la imagen. Verifica tu API Key o intenta con otra foto.");
    }
  };

  // Función para cargar datos simulados (Demo)
  const handleSimulate = () => {
    const MOCK_ANALYSIS: CostAnalysis = {
      items: [
        {
          category: "Albañilería y Paredes",
          description: "Picado de revoque en sector con humedad ascendente (12m²), tratamiento con bloqueador hidrófugo inyectable y revoque nuevo completo con terminación fina.",
          estimatedCostARS: 850000,
          estimatedCostUSD: 850,
          urgency: "Alta"
        },
        {
          category: "Pisos y Revestimientos",
          description: "Pulido integral de parquet de Roble de Eslavonia existente y aplicación de 3 manos de laca poliuretánica satinada de alto tránsito (Plastificado).",
          estimatedCostARS: 420000,
          estimatedCostUSD: 420,
          urgency: "Media"
        },
        {
          category: "Pintura General",
          description: "Aplicación de enduido completo en muros y cielorrasos para alisar imperfecciones, lijado y 2 manos de látex interior lavable premium (Alba/Sherwin).",
          estimatedCostARS: 380000,
          estimatedCostUSD: 380,
          urgency: "Media"
        },
        {
          category: "Electricidad",
          description: "Reemplazo de 8 cajas de tomas y puntos por línea moderna (Cambre Siglo XXII). Verificación de cableado y puesta a tierra.",
          estimatedCostARS: 150000,
          estimatedCostUSD: 150,
          urgency: "Baja"
        }
      ],
      totalCostARS: 1800000,
      totalCostUSD: 1800,
      summary: "La propiedad tiene excelente potencial. La inversión principal debe enfocarse en resolver la humedad de cimientos antes de cualquier tratamiento estético. El piso de roble es recuperable y aumentará significativamente el valor de tasación."
    };

    setState(prev => ({
      ...prev,
      analysis: MOCK_ANALYSIS,
      // Si no hay imagen cargada, cargamos una de ejemplo para que no quede vacío
      originalImage: prev.originalImage || "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop"
    }));
  };

  const handleStyleChange = async (style: TransformationStyle) => {
    if (!state.originalImage) return;
    
    setState(prev => ({ ...prev, selectedStyle: style }));

    if (style === TransformationStyle.ORIGINAL) {
      setState(prev => ({ ...prev, generatedImage: null }));
      return;
    }

    setState(prev => ({ ...prev, isGenerating: true }));
    try {
      const resultImage = await generateRenovationPreview(state.originalImage, style);
      setState(prev => ({ ...prev, generatedImage: resultImage, isGenerating: false }));
    } catch (error) {
      console.error(error);
      setState(prev => ({ ...prev, isGenerating: false }));
      alert("Error al generar la imagen. Intenta nuevamente.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">I</div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">inmueblar<span className="text-blue-600">.com</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 mr-4">
              <a href="#" className="hover:text-blue-600">Vender Propiedad</a>
              <a href="#" className="hover:text-blue-600">Buscar Profesionales</a>
            </nav>
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <button className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">
                Ingresar
              </button>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Potencia tu venta inmobiliaria con IA</h1>
              <p className="text-slate-600 max-w-2xl">Sube una foto. Detectamos problemas, estimamos costos y rediseñamos el espacio.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Image Area & Controls (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Show CTA if no user image is uploaded yet */}
              {!state.originalImage && (
                <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">¿Querés saber cuánto vale arreglar tu propiedad?</h2>
                  <p className="text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
                    Subí una foto de cualquier ambiente. Nuestra IA analizará humedades, pisos y pintura, y te dará un presupuesto estimado con proveedores locales.
                  </p>
                  <button 
                      onClick={triggerFileInput}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center gap-3"
                  >
                      📷 Subir Foto de mi Propiedad
                  </button>
                  <p className="text-xs text-slate-400 mt-6">Admite JPG y PNG hasta 10MB. Análisis 100% Gratuito.</p>
                </div>
              )}

              {/* Image Display Area - Only Visible when Image Uploaded */}
              {state.originalImage && (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden relative aspect-video group">
                    <img 
                      src={state.generatedImage || state.originalImage} 
                      alt="Property" 
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                    
                    {/* Comparison Toggle */}
                    {state.generatedImage && (
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold pointer-events-none">
                        Vista: {state.selectedStyle}
                      </div>
                    )}

                    {/* Loading Overlay */}
                    {(state.isGenerating || state.isAnalyzing) && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-3"></div>
                          <span className="text-blue-900 font-bold animate-pulse">
                            {state.isGenerating ? 'Rediseñando espacio...' : 'Analizando reparaciones...'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Reset Button */}
                    <button 
                      onClick={() => setState(prev => ({...prev, originalImage: null, generatedImage: null, analysis: null}))}
                      className="absolute top-4 left-4 bg-white/90 text-slate-700 p-2 rounded-lg hover:bg-white shadow-md transition"
                      title="Subir nueva imagen"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                </div>
              )}

              {/* Hidden File Input (Always rendered) */}
              <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
              />

              {/* Transformation Controls - Only show if image is uploaded */}
              {state.originalImage && (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Herramientas de Diseño IA</h3>
                  <div className="flex flex-wrap gap-2">
                     {Object.values(TransformationStyle).map((style) => (
                       <button
                        key={style}
                        onClick={() => handleStyleChange(style)}
                        disabled={state.isGenerating}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          state.selectedStyle === style
                            ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                       >
                         {style === TransformationStyle.FIX_HUMIDITY ? '✨ Reparar Paredes' : style}
                       </button>
                     ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Data & Providers (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Cost Estimator */}
              <div className="flex-1">
                <CostEstimator 
                  analysis={state.analysis} 
                  loading={state.isAnalyzing} 
                  onSimulate={handleSimulate}
                />
              </div>

              {/* Ad Banner injected here */}
              <AdBanner 
                title="Pinturas Alba" 
                description="20% OFF en látex interior para renovar tu hogar." 
                imageUrl="https://picsum.photos/seed/paint/200/200" 
                ctaText="Ver Oferta"
                variant="primary"
              />

              {/* Providers List (Only show if analysis exists) */}
              {state.analysis && (
                <div>
                   <ProviderList renovationItems={state.analysis.items} />
                </div>
              )}
              
              {/* Secondary Ad Banner */}
              {state.analysis && (
                <AdBanner 
                  title="Pisos Patagonia" 
                  description="La mejor madera para tus pisos. Pulido e instalación." 
                  imageUrl="https://picsum.photos/seed/floors/200/200" 
                  ctaText="Cotizar"
                  variant="secondary"
                />
              )}
            </div>

          </div>

          {/* Bottom Advertising Section */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center">
                 <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                 Aliados Estratégicos
              </h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">Espacio Publicitario</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <AdBanner 
                title="Easy Argentina" 
                description="Todo en construcción, remodelación y decoración. Envíos a todo el país." 
                imageUrl="https://picsum.photos/seed/construction/200/200" 
                ctaText="Ver Catálogo"
                variant="primary"
              />
               <AdBanner 
                title="RE/MAX Argentina" 
                description="¿Querés vender esta propiedad? Tasamos tu inmueble en 24hs." 
                imageUrl="https://picsum.photos/seed/realty/200/200" 
                ctaText="Contactar Agente"
                variant="secondary"
              />
               <AdBanner 
                title="Zurich Seguros" 
                description="Protegé tu hogar contra incendios y robos. Cotizá tu seguro online." 
                imageUrl="https://picsum.photos/seed/insurance/200/200" 
                ctaText="Cotizar Ahora"
                variant="primary"
              />
            </div>
          </div>

        </div>
      </main>
      
      {/* Brand Ticker */}
      <SponsorTicker />
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; 2024 Inmueblar.com. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-blue-600">Términos</a>
            <a href="#" className="hover:text-blue-600">Privacidad</a>
            <a href="#" className="hover:text-blue-600">Anunciar Aquí</a>
          </div>
          <p className="mt-4 text-xs">Desarrollado con Gemini AI API.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;