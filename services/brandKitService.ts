import { GoogleGenAI } from "@google/genai";
import { getUserGeminiKey } from "./userKeyStore";
import { BrandKitFormState, BrandKitProject } from "../modules/brand-kit/types";

const fallbackSvg = (title: string) => {
  const encoded = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'>
      <defs>
        <linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#C15F3C'/>
          <stop offset='100%' stop-color='#D4785A'/>
        </linearGradient>
      </defs>
      <rect width='600' height='400' fill='url(#g)'/>
      <text x='50%' y='50%' fill='#0A0A0A' font-family='Inter, Arial' font-size='32' font-weight='700' text-anchor='middle'>${title}</text>
      <text x='50%' y='60%' fill='#0A0A0A' font-family='Inter, Arial' font-size='16' text-anchor='middle'>Preview înlocuire după generare</text>
    </svg>
  `);
  return `data:image/svg+xml,${encoded}`;
};

export const generateBrandOverviewDraft = async (form: BrandKitFormState) => {
  const key = getUserGeminiKey();
  if (!key) {
    return {
      summary: `Brand ${form.name}: ${form.visualGoals}`,
      positioning: `${form.industry} • public: ${form.audience}`,
      tone: form.tone,
      promises: ["Claritate vizuală", "Consistență", "Identitate recognoscibilă"],
    } satisfies NonNullable<BrandKitProject['overview']>;
  }

  const ai = new GoogleGenAI({ apiKey: key });
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Creează un rezumat de brand concis în română pentru ${form.name}. 
    Categoria: ${form.category}, industrie: ${form.industry}, public: ${form.audience}. 
    Valori: ${form.values}. Ton: ${form.tone}. 
    Obiective vizuale: ${form.visualGoals}. 
    Returnează JSON cu {summary, positioning, tone, promises[]}.`;
  try {
    const res = await model.generateContent(prompt);
    const text = res.response.text();
    const parsed = JSON.parse(text || '{}');
    return parsed;
  } catch (e) {
    console.warn('Gemini overview fallback', e);
    return {
      summary: `Brand ${form.name}: ${form.visualGoals}`,
      positioning: `${form.industry} • public: ${form.audience}`,
      tone: form.tone,
      promises: ["Claritate vizuală", "Consistență", "Identitate recognoscibilă"],
    } satisfies NonNullable<BrandKitProject['overview']>;
  }
};

export const generateBrandAssetMock = async (kind: BrandKitProject['assets'][number]['kind'], title: string) => {
  const key = getUserGeminiKey();
  // For now we return a branded SVG placeholder; if key exists, it can be swapped with real generations later.
  if (!key) return fallbackSvg(title);
  return fallbackSvg(title);
};
