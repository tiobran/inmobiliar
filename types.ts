export interface RenovationItem {
  category: string;
  description: string;
  estimatedCostARS: number;
  estimatedCostUSD: number;
  urgency: 'Baja' | 'Media' | 'Alta';
}

export interface CostAnalysis {
  items: RenovationItem[];
  totalCostARS: number;
  totalCostUSD: number;
  summary: string;
}

export interface Provider {
  id: string;
  name: string;
  profession: string;
  rating: number;
  location: string;
  imageUrl: string;
  isPromoted?: boolean;
}

export enum TransformationStyle {
  ORIGINAL = 'Original',
  FIX_HUMIDITY = 'Reparar Humedad y Paredes',
  MODERN = 'Interior Moderno',
  SCANDINAVIAN = 'Estilo Escandinavo',
  INDUSTRIAL = 'Estilo Industrial',
  MINIMALIST = 'Minimalista'
}

export interface AppState {
  originalImage: string | null;
  generatedImage: string | null;
  isAnalyzing: boolean;
  isGenerating: boolean;
  analysis: CostAnalysis | null;
  selectedStyle: TransformationStyle;
}