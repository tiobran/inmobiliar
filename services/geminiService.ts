import { GoogleGenAI, Type } from "@google/genai";
import { CostAnalysis, TransformationStyle } from "../types";

// Initialize the client
// NOTE: In a production environment, you should proxy these requests through a backend
// to avoid exposing the API KEY. For this demo, we use process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes the image to detect defects (humidity, cracks) and estimate renovation costs
 * in the Argentine context.
 */
export const analyzeImageCosts = async (base64Image: string): Promise<CostAnalysis> => {
  const model = "gemini-2.5-flash";
  
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  const prompt = `
    Actúa como un contratista experto y perito arquitecto en Argentina (CABA/GBA).
    Analiza esta imagen con precisión técnica. Identifica patologías constructivas (humedad de cimientos, descascaramiento, fisuras, pisos antiguos) y oportunidades de valorización.
    
    Genera un presupuesto de obra DETALLADO ("Presupuesto Inteligente").
    Para cada ítem, escribe una descripción técnica completa (ej: no digas "pintar pared", di "Tratamiento antihumedad, enduido completo y aplicación de látex interior lavable primera marca").
    
    Calcula costos REALISTAS de mercado (Materiales + Mano de Obra) en Argentina.
    
    Devuelve la respuesta EXCLUSIVAMENTE en formato JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: "Categoría Técnica (ej: Albañilería Gruesa, Revestimientos, Instalaciones)" },
                  description: { type: Type.STRING, description: "Descripción técnica detallada del trabajo y materiales a utilizar" },
                  estimatedCostARS: { type: Type.NUMBER, description: "Costo total en Pesos Argentinos" },
                  estimatedCostUSD: { type: Type.NUMBER, description: "Costo total en Dólares" },
                  urgency: { type: Type.STRING, enum: ["Baja", "Media", "Alta"] }
                }
              }
            },
            totalCostARS: { type: Type.NUMBER },
            totalCostUSD: { type: Type.NUMBER },
            summary: { type: Type.STRING, description: "Dictamen técnico profesional del estado general (max 30 palabras)" }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as CostAnalysis;
    }
    throw new Error("No se pudo generar el análisis JSON.");

  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

/**
 * Generates a transformed version of the image based on the selected style.
 */
export const generateRenovationPreview = async (base64Image: string, style: TransformationStyle): Promise<string> => {
  // Using gemini-2.5-flash-image for image editing/generation capabilities
  const model = "gemini-2.5-flash-image";
  
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  let prompt = "";
  
  switch (style) {
    case TransformationStyle.FIX_HUMIDITY:
      prompt = "Corrige la humedad de las paredes, repara grietas y pinta las paredes de blanco inmaculado. Mantén la estructura original y los muebles. Iluminación natural y limpia. Calidad fotorrealista 4k.";
      break;
    case TransformationStyle.MODERN:
      prompt = "Rediseña esta habitación con un estilo interior moderno y lujoso. Muebles contemporáneos, iluminación cálida, paleta de colores neutros. Calidad fotorrealista 4k, revista de arquitectura.";
      break;
    case TransformationStyle.SCANDINAVIAN:
      prompt = "Rediseña esta habitación con estilo escandinavo (nórdico). Mucha madera clara, blanco, plantas, minimalismo acogedor. Calidad fotorrealista 4k.";
      break;
    case TransformationStyle.INDUSTRIAL:
      prompt = "Rediseña esta habitación con estilo industrial. Paredes de ladrillo visto, conductos visibles, metal negro, cuero, madera rústica. Calidad fotorrealista 4k.";
      break;
    case TransformationStyle.MINIMALIST:
      prompt = "Rediseña esta habitación con estilo minimalista extremo. Espacios abiertos, pocos muebles, líneas limpias, colores monocromáticos. Calidad fotorrealista 4k.";
      break;
    default:
      return base64Image;
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64
            }
          },
          { text: prompt }
        ]
      }
    });

    // Check for image in response
    const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    
    if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
      return `data:${imagePart.inlineData.mimeType || 'image/jpeg'};base64,${imagePart.inlineData.data}`;
    }
    
    throw new Error("No se generó ninguna imagen.");

  } catch (error) {
    console.error("Error generating renovation:", error);
    throw error;
  }
};