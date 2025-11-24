
export interface EditorState {
  originalImage: string; // Base64
  currentImage: string; // Base64 (Active version)
  annotationLayer: string | null; // Base64 of the visual markings/text
  prompt: string;
  isProcessing: boolean;
  history: string[]; // Undo stack
  historyIndex: number;
}

export interface EditRequest {
  image: string; // The clean original
  annotations: string; // The image with user's drawings/text overlaid (or just the overlay)
  prompt: string;
  styleContext?: string; // Optional style name to enforce consistency
}
