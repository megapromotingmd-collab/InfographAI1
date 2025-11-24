
import React, { useState, useEffect, useRef } from 'react';
import { ImageToolbar } from './ImageToolbar';
import { ImageEditorCanvas } from './ImageEditorCanvas';
import { generateEditedImage } from '../../modules/editor-core/EditorAPI';

interface ImageViewerProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onSave: (newImageSrc: string) => void;
  styleContext?: string; // e.g. "Photorealistic"
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onSave,
  styleContext
}) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBrushActive, setIsBrushActive] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  
  // Layout State
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 });
  
  // Editor State
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize
  useEffect(() => {
    if (isOpen && imageSrc) {
      setCurrentImage(imageSrc);
      setHistory([imageSrc]);
      setMode('view');
      setIsBrushActive(false);
      setPrompt('');
    }
  }, [isOpen, imageSrc]);

  // Handle Image Load for Sizing
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImgDims({ w: img.clientWidth, h: img.clientHeight });
  };

  // Re-measure on resize
  useEffect(() => {
    const handleResize = () => {
        const img = document.getElementById('active-editor-image') as HTMLImageElement;
        if(img) setImgDims({ w: img.clientWidth, h: img.clientHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMaskUpdate = (canvas: HTMLCanvasElement) => {
    maskCanvasRef.current = canvas;
  };

  // Helper to merge Canvas markings onto the image visually (for the AI)
  // Actually, we can just send the canvas as a separate overlay image.
  // The API expects `annotations` base64.
  const getAnnotationLayer = (): string | null => {
      if (!maskCanvasRef.current) return null;
      return maskCanvasRef.current.toDataURL('image/png');
  };

  const executeEdit = async () => {
    if (!prompt.trim() || !currentImage) return;
    if (!maskCanvasRef.current) {
        alert("Please use the marker to indicate area/changes.");
        return;
    }

    setIsProcessing(true);
    
    // 1. Get Annotation Layer (The red drawings)
    const annotations = getAnnotationLayer();
    if (!annotations) { setIsProcessing(false); return; }

    try {
        // 2. Send to API using the Visual Instruction strategy
        const newImage = await generateEditedImage({
            image: currentImage,
            annotations: annotations,
            prompt: prompt,
            styleContext: styleContext
        });

        // 3. Update State
        setHistory(prev => [...prev, newImage]);
        setCurrentImage(newImage);
        
        // 4. Reset Prompt but keep in Edit Mode to allow further edits
        setPrompt('');
        
        // Optional: Clear canvas automatically? 
        // User might want to keep markings if edit failed or needs refinement.
        // Let's clear it for a fresh start on the new image.
        const ctx = maskCanvasRef.current.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, maskCanvasRef.current.width, maskCanvasRef.current.height);

    } catch (error) {
        console.error("Edit Failed", error);
        alert("Edit Failed: " + (error instanceof Error ? error.message : "Unknown Error"));
    } finally {
        setIsProcessing(false);
    }
  };

  const handleUndo = () => {
    if (history.length > 1) {
        const newHistory = [...history];
        newHistory.pop(); // Remove current
        setCurrentImage(newHistory[newHistory.length - 1]);
        setHistory(newHistory);
    }
  };

  const handleSaveAndClose = () => {
      if (currentImage && currentImage !== imageSrc) {
          onSave(currentImage);
      }
      onClose();
  };

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center overflow-hidden animate-fade-in">
      
      {/* 1. TOOLBAR */}
      <ImageToolbar 
        mode={mode}
        isProcessing={isProcessing}
        onEdit={() => { setMode('edit'); setIsBrushActive(true); }}
        onClose={handleSaveAndClose}
        onBrushToggle={() => setIsBrushActive(!isBrushActive)}
        isBrushActive={isBrushActive}
        onUndo={handleUndo}
        canUndo={history.length > 1}
        onSave={handleSaveAndClose}
      />

      {/* 2. MAIN WORKSPACE */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center p-8 select-none"
      >
         <div className="relative shadow-2xl rounded-lg overflow-hidden max-w-full max-h-full border border-white/10">
            {/* Base Image */}
            <img 
                id="active-editor-image"
                src={currentImage} 
                className="max-w-full max-h-[85vh] object-contain select-none pointer-events-none"
                alt="Editing"
                onLoad={handleImageLoad}
            />

            {/* Canvas Layer */}
            {mode === 'edit' && (
                <div 
                    className="absolute top-0 left-0"
                    style={{ width: imgDims.w, height: imgDims.h }}
                >
                    <ImageEditorCanvas 
                        width={imgDims.w}
                        height={imgDims.h}
                        isActive={isBrushActive && !isProcessing}
                        brushSize={8} // Thinner for writing/annotating
                        onMaskUpdate={handleMaskUpdate}
                    />
                </div>
            )}

            {/* Loading Overlay */}
            {isProcessing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                    <div className="w-16 h-16 border-4 border-crail-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white font-serif font-bold tracking-widest text-sm animate-pulse">NANO BANANA IS EDITING...</p>
                    <p className="text-white/50 text-xs mt-2">Analyzing Visual Instructions...</p>
                </div>
            )}
         </div>
      </div>

      {/* 3. PROMPT BAR (Only in Edit Mode) */}
      {mode === 'edit' && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 animate-slide-up px-6">
              <div className="bg-neutral-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex flex-col gap-2 shadow-2xl">
                  <div className="flex gap-2 items-center px-2">
                       <span className="text-xs font-bold text-crail-500 uppercase">Universal Editor</span>
                       <span className="text-xs text-white/50">Draw on image + Describe changes below</span>
                  </div>
                  <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. 'Make the highlighted pants dark blue', 'Remove logo'..."
                        className="flex-grow bg-white/10 rounded-xl border border-white/10 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:bg-white/20 font-sans text-sm transition-colors"
                        onKeyDown={(e) => e.key === 'Enter' && executeEdit()}
                        disabled={isProcessing}
                    />
                    <button 
                        onClick={executeEdit}
                        disabled={!prompt.trim() || isProcessing}
                        className="bg-crail-500 hover:bg-crail-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-6 font-bold transition-all shadow-lg shadow-crail/20"
                    >
                        Apply
                    </button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};
