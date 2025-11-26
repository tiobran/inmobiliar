import React, { useState, useMemo } from 'react';
import { Provider, RenovationItem } from '../types';

interface ProviderListProps {
  renovationItems: RenovationItem[];
}

// Mock data for providers in Argentina
const MOCK_PROVIDERS: Provider[] = [
  { id: '1', name: 'Carlos Gomez', profession: 'Albañilería y Pintura', rating: 4.8, location: 'Palermo, CABA', imageUrl: 'https://picsum.photos/60/60?random=1', isPromoted: true },
  { id: '2', name: 'Estudio Arquitectura BA', profession: 'Arquitectura', rating: 5.0, location: 'Recoleta, CABA', imageUrl: 'https://picsum.photos/60/60?random=2', isPromoted: true },
  { id: '3', name: 'ElectroSol', profession: 'Electricidad', rating: 4.5, location: 'Córdoba Capital', imageUrl: 'https://picsum.photos/60/60?random=3' },
  { id: '4', name: 'Muebles & Diseño', profession: 'Interiorismo', rating: 4.9, location: 'San Isidro, GBA', imageUrl: 'https://picsum.photos/60/60?random=4' },
  { id: '5', name: 'Plomería Total', profession: 'Plomería', rating: 4.2, location: 'Rosario, SF', imageUrl: 'https://picsum.photos/60/60?random=5' },
  { id: '6', name: 'Pisos Brillantes', profession: 'Pulido de Pisos', rating: 4.7, location: 'Belgrano, CABA', imageUrl: 'https://picsum.photos/60/60?random=6' },
  { id: '7', name: 'Gasistas Matriculados', profession: 'Gasista', rating: 4.6, location: 'La Plata, PBA', imageUrl: 'https://picsum.photos/60/60?random=7' },
];

export const ProviderList: React.FC<ProviderListProps> = ({ renovationItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Extract unique professions for the filter dropdown
  const categories = useMemo(() => {
    const professions = MOCK_PROVIDERS.map(p => p.profession);
    return ['Todos', ...Array.from(new Set(professions))];
  }, []);

  // Filter logic
  const filteredProviders = useMemo(() => {
    return MOCK_PROVIDERS.filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            provider.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || provider.profession === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleContact = (name: string) => {
    alert(`¡Hola! Hemos enviado tu solicitud de contacto a ${name}.\n\nPronto recibirás un mensaje en tu WhatsApp para coordinar el presupuesto.`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Directorio de Profesionales
      </h3>
      
      {/* Filters Area */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre o zona..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <div key={provider.id} className={`flex items-start p-4 rounded-lg transition-colors ${provider.isPromoted ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50 hover:bg-slate-100 border border-transparent'}`}>
              <img src={provider.imageUrl} alt={provider.name} className="w-12 h-12 rounded-full object-cover mr-4" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{provider.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">{provider.profession}</p>
                  </div>
                  {provider.isPromoted && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">PRO</span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {provider.location}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1 text-xs">★</span>
                    <span className="text-xs font-bold text-slate-700">{provider.rating}</span>
                  </div>
                  <button 
                    onClick={() => handleContact(provider.name)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold uppercase tracking-wide hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                  >
                    Contactar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500 text-sm">
            No se encontraron profesionales con esos filtros.
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center border-t border-slate-100 pt-4">
        <button className="text-blue-600 text-sm font-medium hover:underline">Ver todos los profesionales</button>
      </div>
    </div>
  );
};