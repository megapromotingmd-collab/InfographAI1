import { GoogleGenAI } from "@google/genai";
import { GenerationConfig, SearchDepth, TextDensity } from "../types";
import { STYLE_RULES } from "../constants";
import { getUserGeminiKey } from "./userKeyStore";

interface AIStudioWindow {
  aistudio?: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  };
}

export const checkApiKey = async (): Promise<boolean> => {
  const storedKey = getUserGeminiKey();
  return !!storedKey;
};

// Deprecated: This function is no longer used. API keys are now managed through the ApiKeyModal component.
export const promptForKeySelection = async (): Promise<void> => {
  console.warn("promptForKeySelection is deprecated. Please use the ApiKeyModal component instead.");
};

// Helper to strip base64 header
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

// Helper to format errors consistently
const formatError = (error: any): Error => {
    if (error instanceof Error) return error;
    
    // Handle object errors (common with Gemini SDK)
    if (typeof error === 'object' && error !== null) {
        // Handle specific API error structure
        if (error.error) {
            const code = error.error.code || 'Unknown Code';
            const status = error.error.status || 'Unknown Status';
            const msg = error.error.message || 'The API returned an empty error message (likely timeout or overload).';
            return new Error(`Gemini API Error [${code} ${status}]: ${msg}`);
        }
        return new Error(JSON.stringify(error));
    }
    return new Error(String(error));
};

// --- NEW: Image Optimizer to prevent Payload Too Large / Proxy Errors ---
// UPDATED: Reduced maxWidth to 800 and quality to 0.6 to prevent 500 Internal Server Errors
const resizeImage = (base64Str: string, maxWidth = 800): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio but cap max width
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
          ctx.fillStyle = '#FFFFFF'; // Ensure no transparency issues
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG 0.6 (Aggressive optimization for stability)
          resolve(canvas.toDataURL('image/jpeg', 0.6)); 
      } else {
          resolve(base64Str); // Fallback
      }
    };
    img.onerror = () => {
        console.warn("Image resize failed, using original.");
        resolve(base64Str); // Fallback
    };
  });
};

// Resolve API key from localStorage only
const getActiveApiKey = async (): Promise<string | undefined> => {
  return getUserGeminiKey() || undefined;
};

/**
 * PHASE 2 & 3: GENERATE IMAGE 1.5 (Technical Character Sheet OR Brand Identity Sheet)
 * This function creates the "Reference Anchor" for the entire set.
 * 
 * @param mode 'character' (default) or 'brand' (for pitch decks)
 */
export const generateCharacterSheet = async (baseImage: string, style: string, refinement?: string, mode: 'character' | 'brand' = 'character'): Promise<string> => {
  // Always initialize client just before use to capture latest env/key state
  const apiKey = await getActiveApiKey();
  if (!apiKey) throw new Error("No Gemini API Key configured. Please click the key icon in the header to configure your API key.");
  const ai = new GoogleGenAI({ apiKey });

  // OPTIMIZE INPUT IMAGE TO PREVENT TIMEOUTS (Aggressive 800px limit)
  const optimizedBaseImage = await resizeImage(baseImage, 800);

  // GET STRICT STYLE RULES
  const styleEnforcement = STYLE_RULES[style] || `STYLE ENFORCEMENT: ${style}`;

  let systemInstruction = "";

  if (mode === 'character') {
      systemInstruction = `
    ========================================================================
    SYSTEM OVERRIDE: ACTIVATE CHARACTER CONSISTENCY ENGINE v2.0
    TASK: GENERATE TECHNICAL REFERENCE SHEET (IMAGE 1.5) WITH STYLE DNA
    ========================================================================
    
    INPUT: You have been provided with a source image containing a character.
    
    OBJECTIVE: Deconstruct this character and re-assemble them into a formal TECHNICAL CHARACTER SHEET.
    This sheet will be used as the ABSOLUTE GROUND TRUTH for a production pipeline.
    
    ------------------------------------------------------------------------
    🔴 STRICT VISUAL STYLE ENFORCEMENT 🔴
    The generated sheet MUST strictly adhere to the following visual rules:
    ${styleEnforcement}
    ------------------------------------------------------------------------

    STRICT LAYOUT REQUIREMENTS (Do not deviate):
    Generate a single high-resolution image containing two distinct zones:
    
    ZONE A: THE CHARACTER (Left 75% of Image)
    1.  **FRONT VIEW**: Full body, standing straight, arms relaxed. Clear view of costume details.
    2.  **SIDE PROFILE**: Full body, exact same scale, facing right.
    3.  **3/4 PORTRAIT**: A dynamic close-up capturing the exact facial features, eye shape, and hair structure.
    
    ZONE B: VISUAL STYLE DNA (Right 25% Side Panel - CRITICAL)
    You MUST include a dedicated vertical sidebar on the right edge containing:
    1.  **COLOR PALETTE**: 5-7 distinct color swatches (circles) with HEX codes if possible.
    2.  **MATERIAL SPHERE**: A rendered sphere demonstrating the *exact* material finish (e.g., clay, paper, skin).
    3.  **LIGHTING CUBE**: A small cube showing how light and shadow behave in this specific style.
    4.  **METADATA**: Text labels for "Style Name" and "Texture Type".
    `;
  } else {
      // BRAND MODE (PITCH DECK)
      systemInstruction = `
    ========================================================================
    SYSTEM OVERRIDE: ACTIVATE BRAND IDENTITY ENGINE v1.0
    TASK: GENERATE CORPORATE BRAND GUIDELINES SHEET (IMAGE 1.5)
    ========================================================================
    
    INPUT: You have been provided with a logo or source image representing a company.
    
    OBJECTIVE: Deconstruct this input and create a CORPORATE IDENTITY BOARD.
    This sheet will be used as the ABSOLUTE GROUND TRUTH for a business pitch deck.
    
    ------------------------------------------------------------------------
    🔴 STRICT VISUAL STYLE ENFORCEMENT 🔴
    The generated sheet MUST strictly adhere to the following visual rules:
    ${styleEnforcement}
    ------------------------------------------------------------------------

    STRICT LAYOUT REQUIREMENTS (Do not deviate):
    Generate a single high-resolution image containing two distinct zones:
    
    ZONE A: PRIMARY BRAND ASSETS (Left 75% of Image)
    1.  **LOGO DISPLAY**: Clear, high-res version of the logo on both light and dark backgrounds.
    2.  **KEY VISUAL**: A sample marketing image or product shot in the requested style.
    3.  **TYPOGRAPHY**: Display the primary font alphabet (Aa Bb Cc) to establish the clean, corporate look.
    
    ZONE B: VISUAL STYLE DNA (Right 25% Side Panel - CRITICAL)
    You MUST include a dedicated vertical sidebar on the right edge containing:
    1.  **COLOR PALETTE**: 5 distinct brand color swatches (squares).
    2.  **GRAPHIC ELEMENT**: A sample icon or UI button style.
    3.  **TEXTURE SWATCH**: Background texture sample (e.g., clean paper, tech mesh).
    4.  **METADATA**: Text labels for "Brand Mood" (e.g., "Trustworthy", "Innovative").
      `;
  }

  const prompt = `
    ${systemInstruction}

    ${refinement ? `
    ⚠️ **USER REFINEMENT INSTRUCTIONS (CRITICAL PRIORITY)** ⚠️
    The user has requested specific adjustments to this anchor sheet:
    "${refinement}"
    
    INSTRUCTION: YOU MUST APPLY THESE CHANGES. 
    ` : ''}

    CRITICAL CONSISTENCY RULES:
    -   **IDENTITY LOCK**: The subject MUST be derived from the input image (unless modified by user refinement).
    -   **STYLE LOCK**: Use the visual style: "${style}".
    -   **COLOR ACCURACY**: Extract the exact colors from the source.
    
    QUALITY CONTROL:
    -   High Definition, 2K Resolution.
    -   NO ARTIFACTS, NO BLUR.
    -   The "Style DNA" panel must be clearly separated.
    
    OUTPUT FORMAT:
    -   Clean, isolated elements + Style DNA panel.
  `;

  const imagePart = {
    inlineData: {
      mimeType: getMimeType(optimizedBaseImage),
      data: getBase64Data(optimizedBaseImage)
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: prompt },
          imagePart
        ]
      },
      config: {
        imageConfig: {
            aspectRatio: "16:9", // Always wide for the sheet to fit panels
            imageSize: "2K" 
        }
      }
    });

    return extractImageFromResponse(response);
  } catch (error) {
    console.error("Character Sheet Generation Error:", error);
    throw formatError(error);
  }
};

/**
 * PHASE 4: GENERATE SLIDE WITH CONSISTENCY LOCK + SKETCH SUPPORT
 */
export const generateInfographic = async (config: GenerationConfig, referenceImage?: string): Promise<string> => {
  // Always initialize client just before use to capture latest env/key state
  const apiKey = await getActiveApiKey();
  if (!apiKey) throw new Error("No Gemini API Key configured. Please click the key icon in the header to configure your API key.");
  const ai = new GoogleGenAI({ apiKey });

  const useSearch = config.searchDepth !== SearchDepth.NONE;
  const strictResearch = config.searchDepth === SearchDepth.DEEP;
  const hasSketch = !!config.sketchReference;

  // GET STRICT STYLE RULES
  const styleEnforcement = STYLE_RULES[config.style] || `STYLE ENFORCEMENT: ${config.style}`;

  // Determine Text Density instructions
  let textInstructions = "";
  switch (config.textDensity) {
    case TextDensity.NONE:
      textInstructions = "STRICT RULE: DO NOT include any text inside the image. Pure visual storytelling. No labels, no titles, no speech bubbles.";
      break;
    case TextDensity.MINIMAL:
      textInstructions = "TEXT RULE: Minimal. Only include short, punchy headlines or single-word labels where absolutely necessary for clarity. Avoid paragraphs.";
      break;
    case TextDensity.BALANCED:
      textInstructions = "TEXT RULE: Balanced. Include a clear main headline and brief, bulleted key points (2-3 words max per point). Ensure text is integrated artistically.";
      break;
    case TextDensity.DETAILED:
      textInstructions = "TEXT RULE: High density. Create a rich infographic layout. Include detailed explanations, data values, descriptive labels, and a clear hierarchy of information.";
      break;
    default:
      textInstructions = "TEXT RULE: Balanced text and visuals.";
  }

  // 1. Base System Prompt
  let prompt = `
    ============================================================
    ROLE: Lead Storyboard Artist & Scientific Illustrator
    ============================================================
    
    VISUAL STYLE: ${config.style}
    COMPLEXITY: ${config.complexity}
    
    ------------------------------------------------------------------------
    🔴 STRICT VISUAL STYLE ENFORCEMENT 🔴
    The generated image MUST strictly adhere to the following visual rules with ZERO deviation:
    ${styleEnforcement}
    ------------------------------------------------------------------------
    
    ${textInstructions}
    
    QUALITY PROTOCOL:
    - Generate a pristine, high-definition image (2K).
    - NO JPEG artifacts, NO glitching, NO distorted faces.
    - Perfect anatomy and perspective.
    - Text (if allowed) MUST be legible, correctly spelled (in ${config.language}), and aesthetically placed.
    `;

  // 2. Reference Image Logic (The Core of Consistency)
  if (referenceImage) {
    prompt += `
    
    🔴 **CRITICAL INSTRUCTION: CHARACTER/BRAND DNA ACTIVE** 🔴
    
    You have been provided with a Technical Reference Sheet (1.5) containing the Subject/Brand and the Visual Style DNA.
    
    MANDATORY PROCESSING STEPS:
    1.  **SCAN THE DNA PANEL**: Look at the RIGHT SIDE of the reference image. Analyze the "Style DNA" panel.
    2.  **EXTRACT PARAMETERS**:
        -   Read the Color Palette swatches.
        -   Analyze the Material/Texture samples.
        -   Observe the Lighting/Mood.
    3.  **APPLY TO SCENE**: Transfer these exact physical properties to the new scene generated below.
    
    CONSISTENCY CHECKS:
    -   **IF CHARACTER**: Does the face match the reference sheet? Are they wearing the EXACT same clothes?
    -   **IF BRAND/PITCH**: Are the brand colors (from the palette) used dominantly? Is the logo placement consistent? Is the mood identical?
    
    SCENE INSTRUCTION:
    Take the subject from the Reference Sheet and place them according to the SCENE DESCRIPTION below.
    Keep the background and lighting consistent with the extracted Style DNA.
    `;
  } else {
    // Fallback for Slide 1 (only if no global upload was provided)
    prompt += `
    *** INITIAL DESIGN PHASE ***
    1. Read the "Concept" and "Description" below carefully.
    2. Create a unique, memorable design.
    3. Make features distinct so they can be easily replicated in future images.
    `;
  }

  // 3. Sketch Logic
  if (hasSketch) {
      prompt += `
      
      📝 **LAYOUT CONTROL ACTIVE (SKETCH PROVIDED)** 📝
      
      You have been provided with a SKETCH image.
      INSTRUCTION: Use the sketch as a strict guide for COMPOSITION and LAYOUT.
      - Place objects exactly where drawn in the sketch.
      - Follow the box outlines for text/image placement.
      - Transform the crude sketch into the final high-quality style defined above (${config.style}).
      `;
  }

  // 4. Research & Context
  prompt += `
    *** RESEARCH MODE: ${config.searchDepth} ***
    ${strictResearch ? "INSTRUCTION: Use Google Search to verify ALL technical, anatomical, and historical facts. If the user mentions a specific machine or animal, it MUST look accurate." : ""}
    ${!useSearch ? "INSTRUCTION: Pure creative mode. No external research." : ""}

    *** OUTPUT SPECIFICATIONS ***
    Aspect Ratio: ${config.format}
    Language: ${config.language}

    ============================================================
    SCENE SCRIPT (CONTEXT + ACTION):
    ============================================================
    ${config.topic}
  `;

  try {
    const tools: any[] = [];
    if (useSearch) {
        tools.push({ googleSearch: {} });
    }

    const parts: any[] = [{ text: prompt }];

    // Attach Reference Image if it exists (OPTIMIZED)
    if (referenceImage) {
      const optimizedRef = await resizeImage(referenceImage, 800); // Enforce 800px limit
      parts.push({
        inlineData: {
          mimeType: getMimeType(optimizedRef),
          data: getBase64Data(optimizedRef)
        }
      });
    }

    // Attach Sketch if it exists (OPTIMIZED)
    if (config.sketchReference) {
        const optimizedSketch = await resizeImage(config.sketchReference, 800); // Enforce 800px limit
        parts.push({
            text: "--- LAYOUT SKETCH REFERENCE BELOW ---"
        });
        parts.push({
            inlineData: {
                mimeType: getMimeType(optimizedSketch),
                data: getBase64Data(optimizedSketch)
            }
        });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: parts
      },
      config: {
        imageConfig: {
            aspectRatio: config.format, 
            imageSize: "2K" 
        },
        tools: tools.length > 0 ? tools : undefined
      }
    });

    return extractImageFromResponse(response);

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw formatError(error);
  }
};

// Helper to extract image or handle error text
const extractImageFromResponse = (response: any): string => {
    let imageUrl = '';
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      const textOutput = response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textOutput) {
        console.warn("Model returned text instead of image:", textOutput);
        throw new Error(`Model refused image generation. Reason: ${textOutput.substring(0, 150)}...`);
      }
      throw new Error("No image data found. The model might have been filtered or encountered an error.");
    }

    return imageUrl;
};
