import { GoogleGenAI } from "@google/genai";
import { BrandDetails, BrandOverview, BrandAsset } from "../types";
import { getUserGeminiKey } from "./userKeyStore";

// --- UTILS (Duplicated to ensure strict module isolation) ---

const getBase64Data = (base64String: string) => {
  if (base64String.includes(',')) {
    return base64String.split(',')[1];
  }
  return base64String;
};

const getMimeType = (base64String: string) => {
  if (base64String.includes(';')) {
    return base64String.split(':')[1].split(';')[0];
  }
  return 'image/png';
};

const resizeImage = (base64Str: string, maxWidth = 800): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
          ctx.fillStyle = '#FFFFFF'; 
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.6)); 
      } else {
          resolve(base64Str);
      }
    };
    img.onerror = () => {
        resolve(base64Str);
    };
  });
};

// --- API ---

export const generateBrandOverview = async (details: BrandDetails): Promise<BrandOverview> => {
    const apiKey = getUserGeminiKey();
    if (!apiKey) throw new Error("No Gemini API Key configured. Please add your key in the API Key settings.");
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
    ROLE: Senior Brand Strategist.
    TASK: Analyze the input and generate a concise Brand Strategy Brief.
    
    INPUT:
    Name: ${details.name}
    Type: ${details.type}
    Industry: ${details.industry}
    Audience: ${details.targetAudience}
    Values: ${details.values}
    Tone: ${details.tone}
    
    OUTPUT FORMAT (JSON):
    {
        "missionStatement": "One punchy sentence defining the brand purpose.",
        "positioning": "2-3 sentences on how it stands out in the market.",
        "toneVoice": "3 adjectives describing the voice (e.g. Authoritative, Playful).",
        "visualDirection": "A description of the recommended visual vibe."
    }
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: prompt }] },
            config: { responseMimeType: 'application/json' }
        });
        
        const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("No text generated");
        
        return JSON.parse(text) as BrandOverview;
    } catch (e) {
        console.error("Brand Text Gen Error", e);
        // Fallback
        return {
            missionStatement: `To revolutionize ${details.industry} with ${details.values}.`,
            positioning: "A market leader focused on quality and innovation.",
            toneVoice: details.tone,
            visualDirection: details.visualPreferences
        };
    }
};

export const generateBrandAsset = async (
    assetType: BrandAsset['type'],
    details: BrandDetails,
    overview: BrandOverview
): Promise<string> => {
    const apiKey = getUserGeminiKey();
    if (!apiKey) throw new Error("No Gemini API Key configured. Please add your key in the API Key settings.");
    const ai = new GoogleGenAI({ apiKey });

    let systemPrompt = "";
    const parts: any[] = [];

    // --- PROMPT ENGINEERING ---
    const visualContext = `
    BRAND: ${details.name}
    INDUSTRY: ${details.industry}
    VIBE: ${details.visualPreferences}
    COLORS: ${details.colors}
    VISUAL DIRECTION: ${overview.visualDirection}
    `;

    if (assetType === 'logo') {
        systemPrompt = `
        TASK: GENERATE LOGO CONCEPTS
        Create a professional logo presentation sheet with 4 distinct variations for this brand.
        Style: ${details.visualPreferences}
        Do NOT include realistic photo backgrounds. Keep it on a clean, solid paper texture background.
        Focus on: Iconography, Typography, and Symbolism relevant to ${details.industry}.
        ${visualContext}
        `;
    } else if (assetType === 'moodboard') {
        systemPrompt = `
        TASK: GENERATE VISUAL MOODBOARD
        Create a rich, artistic moodboard collage that defines the aesthetic universe of this brand.
        Include: Textures, lifestyle imagery, color swatches, typography samples, and abstract shapes.
        Layout: Grid-style collage. High aesthetic value.
        ${visualContext}
        `;
    } else if (assetType === 'palette') {
        systemPrompt = `
        TASK: GENERATE COLOR PALETTE & TYPOGRAPHY SYSTEM
        Create a "Brand Guidelines" single page summary.
        1. Show 5 main color circles with hex codes.
        2. Show "Aa Bb Cc" typography samples (Headlines vs Body).
        3. Show a pattern or texture sample.
        Style: Clean, Swiss Design, Minimalist layout.
        ${visualContext}
        `;
    } else if (assetType === 'mockup') {
        systemPrompt = `
        TASK: GENERATE REAL WORLD MOCKUP
        Show this brand applied in the real world.
        Subject: A high-quality photo of a ${details.industry.includes('Tech') ? 'smartphone screen' : details.industry.includes('Coffee') ? 'coffee cup' : 'business card and stationery'} featuring the brand identity.
        Lighting: Professional Studio Lighting.
        ${visualContext}
        `;
    }

    parts.push({ text: systemPrompt });

    // Attach Uploaded Logo if available and relevant (e.g. for mockups or variations)
    if (details.uploadedLogo) {
        const resizedLogo = await resizeImage(details.uploadedLogo, 800);
        parts.push({ text: "REFERENCE LOGO PROVIDED BELOW:" });
        parts.push({
            inlineData: {
                mimeType: getMimeType(resizedLogo),
                data: getBase64Data(resizedLogo)
            }
        });
    }

    // Attach Reference Images (up to 3)
    if (details.referenceImages && details.referenceImages.length > 0) {
        parts.push({ text: "STYLE REFERENCES (INSPIRATION):" });
        for (const ref of details.referenceImages.slice(0, 3)) {
            const resizedRef = await resizeImage(ref, 800);
            parts.push({
                inlineData: {
                    mimeType: getMimeType(resizedRef),
                    data: getBase64Data(resizedRef)
                }
            });
        }
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: { parts },
            config: {
                imageConfig: {
                    aspectRatio: "16:9", // Wide for presentation
                    imageSize: "2K"
                }
            }
        });

        // Extract
        const responseParts = response.candidates?.[0]?.content?.parts;
        let newImageUrl = '';
        if (responseParts) {
            for (const part of responseParts) {
                if (part.inlineData && part.inlineData.data) {
                    newImageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
                    break;
                }
            }
        }
        if (!newImageUrl) throw new Error("No image generated.");
        return newImageUrl;

    } catch (error) {
        console.error("Brand Asset Gen Error", error);
        throw error;
    }
};