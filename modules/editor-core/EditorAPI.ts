
import { GoogleGenAI } from "@google/genai";
import { EditRequest } from "./types";
import { getUserGeminiKey } from "../../services/userKeyStore";

// Helper to strip base64 header
const getBase64Data = (base64String: string) => {
  if (base64String.includes(',')) {
    return base64String.split(',')[1];
  }
  return base64String;
};

export const generateEditedImage = async (request: EditRequest): Promise<string> => {
  const apiKey = getUserGeminiKey();
  if (!apiKey) throw new Error("No Gemini API Key configured. Please add your key in the API Key settings.");
  const ai = new GoogleGenAI({ apiKey });
  
  // Using Nano Banana Pro (Gemini 3 Pro) for multimodal editing capability
  const model = 'gemini-3-pro-image-preview';

  const systemPrompt = `
    TASK: VISUAL INSTRUCTION-BASED IMAGE EDITING
    
    ROLE: Expert Senior Photo Retoucher & Illustrator.

    INPUTS:
    1.  **ORIGINAL IMAGE**: The source image to be edited.
    2.  **ANNOTATED IMAGE (VISUAL GUIDE)**: The same image but with red markings, circles, arrows, or handwritten text indicating specific changes.
    3.  **USER INSTRUCTION**: A text description of the desired change.

    STRICT EDITING PROTOCOL:
    1.  **LOCATE**: Look at the ANNOTATED IMAGE. Identify the areas marked (circled, highlighted, or pointed to). Read any handwritten text on the image.
    2.  **INTERPRET**: Combine the visual markings with the USER INSTRUCTION to understand exactly *what* to change and *where*.
    3.  **EXECUTE**: Apply the changes to the ORIGINAL IMAGE.
    4.  **CLEANUP**: The final output MUST BE CLEAN. Do NOT include the red markings, text notes, or circles in the result. They are only instructions.
    5.  **PRESERVE**: Do NOT change the style, lighting, character identity, or background of areas NOT marked for editing. Zero Tolerance for style drift.

    CONTEXT:
    Style: ${request.styleContext || 'Match Original'}
    User Request: "${request.prompt}"
  `;

  try {
    const parts = [
      { text: systemPrompt },
      {
        inlineData: {
            mimeType: 'image/png',
            data: getBase64Data(request.image)
        }
      },
      {
         text: "VISUAL GUIDE (Annotations):"
      },
      {
        inlineData: {
            mimeType: 'image/png',
            data: getBase64Data(request.annotations)
        }
      }
    ];

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts },
      config: {
        imageConfig: {
            aspectRatio: "1:1", // The model will attempt to match input aspect ratio
            imageSize: "2K"
        }
      }
    });

    // Extract Result
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

    if (!newImageUrl) {
        throw new Error("Model did not return an image. It might have been filtered.");
    }

    return newImageUrl;

  } catch (error) {
    console.error("Editor API Error:", error);
    throw error;
  }
};
