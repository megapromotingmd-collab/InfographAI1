
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { TextArea, Input } from '../Input';
import { QueueItem } from '../../types';

interface SketchBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (items: Omit<QueueItem, 'projectId'>[]) => void;
}

interface SlideSketch {
  id: string;
  title: string;
  notes: string;
  canvasData: string | null; // Base64
}

export const SketchBuilder: React.FC<SketchBuilderProps> = ({ isOpen, onClose, onSubmit }) => {
  const [slides, setSlides] = useState<SlideSketch[]>([
    { id: '1', title: 'Cover Slide', notes: 'Title: Future of Tech\nVisuals: Minimalist background.', canvasData: null }
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeSlide = slides[activeSlideIndex];

  // Initialize/Restore Canvas for active slide
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set white background default
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // If data exists, draw it
    if (activeSlide.canvasData) {
        const img = new Image();
        img.src = activeSlide.canvasData;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    } else {
        // Draw placeholder grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // grid lines
        for(let i=0; i<canvas.width; i+=50) { ctx.moveTo(i,0); ctx.lineTo(i, canvas.height); }
        for(let i=0; i<canvas.height; i+=50) { ctx.moveTo(0,i); ctx.lineTo(canvas.width, i); }
        ctx.stroke();
    }
  }, [activeSlideIndex, isOpen]);

  const saveCurrentCanvas = () => {
      if(canvasRef.current) {
          const data = canvasRef.current.toDataURL('image/png');
          updateSlide(activeSlide.id, { canvasData: data });
      }
  };

  const updateSlide = (id: string, updates: Partial<SlideSketch>) => {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addSlide = () => {
      saveCurrentCanvas();
      const newId = (slides.length + 1).toString();
      setSlides(prev => [...prev, { id: newId, title: `Slide ${newId}`, notes: '', canvasData: null }]);
      setActiveSlideIndex(slides.length);
  };

  const handleGenerate = () => {
    saveCurrentCanvas();
    // Convert Sketches to QueueItems
    const queueItems: Omit<QueueItem, 'projectId'>[] = slides.map((s, idx) => ({
        id: `sketch-${Date.now()}-${idx}`,
        setName: "Pitch Sketch Deck",
        slideNumber: (idx + 1).toString(),
        shortTopic: s.title,
        fullPrompt: `
        SLIDE ${idx+1}: ${s.title}
        NOTES: ${s.notes}
        `,
        status: 'pending',
        sketchReference: s.canvasData || undefined // Pass the sketch!
    }));

    onSubmit(queueItems);
    onClose();
  };

  // Drawing Logic (Simple Marker)
  const startDrawing = (e: React.MouseEvent) => {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      const rect = canvas.getBoundingClientRect();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };
  
  const draw = (e: React.MouseEvent) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-2xl flex overflow-hidden shadow-2xl animate-fadeIn">
          
          {/* LEFT: SLIDE LIST */}
          <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col">
              <div className="p-4 border-b border-slate-200 bg-white">
                  <h3 className="font-bold text-slate-800">Pitch Sketcher</h3>
                  <p className="text-xs text-slate-500">Visual Layout Builder</p>
              </div>
              <div className="flex-grow overflow-y-auto p-2 space-y-2">
                  {slides.map((s, idx) => (
                      <div 
                        key={s.id} 
                        onClick={() => { saveCurrentCanvas(); setActiveSlideIndex(idx); }}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${idx === activeSlideIndex ? 'bg-white border-crail-500 shadow-md ring-1 ring-crail-500' : 'bg-slate-100 border-transparent hover:bg-white hover:border-slate-300'}`}
                      >
                          <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold text-slate-500">#{idx + 1}</span>
                              {s.canvasData && <span className="text-[10px] text-green-600">✓ Drawn</span>}
                          </div>
                          <p className="font-bold text-sm truncate">{s.title}</p>
                      </div>
                  ))}
                  <button onClick={addSlide} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 font-bold hover:border-crail-500 hover:text-crail-500 transition-colors">
                      + Add Slide
                  </button>
              </div>
          </div>

          {/* CENTER: CANVAS */}
          <div className="flex-grow bg-slate-200 flex flex-col items-center justify-center p-8 relative">
              <div className="mb-2 text-slate-500 text-sm font-bold flex gap-4">
                  <span>Draw Layout Layout (Boxes, Arrows)</span>
              </div>
              <div className="bg-white shadow-xl rounded overflow-hidden" style={{ width: 800, height: 450 }}>
                  <canvas 
                    ref={canvasRef}
                    width={800}
                    height={450}
                    className="cursor-crosshair w-full h-full"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={() => setIsDrawing(false)}
                    onMouseLeave={() => setIsDrawing(false)}
                  />
              </div>
              <div className="mt-4 flex gap-2">
                  <button onClick={() => {
                      const canvas = canvasRef.current;
                      if(canvas) {
                          const ctx = canvas.getContext('2d');
                          ctx?.clearRect(0,0,800,450);
                          ctx!.fillStyle='#fff';
                          ctx?.fillRect(0,0,800,450);
                      }
                  }} className="px-4 py-2 bg-white rounded shadow text-xs font-bold text-red-500 hover:bg-red-50">Clear Canvas</button>
              </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="w-80 bg-white border-l border-slate-200 p-6 flex flex-col">
              <h3 className="font-serif text-xl font-bold mb-6">Slide Details</h3>
              
              <div className="space-y-4 flex-grow">
                  <Input 
                    label="Slide Title" 
                    value={activeSlide.title} 
                    onChange={e => updateSlide(activeSlide.id, { title: e.target.value })} 
                  />
                  <TextArea 
                    label="Content Notes & Prompt" 
                    placeholder="Describe what should be in the boxes... e.g., 'Chart on left, text on right describing growth.'"
                    value={activeSlide.notes}
                    onChange={e => updateSlide(activeSlide.id, { notes: e.target.value })}
                    className="h-48"
                  />
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                  <Button onClick={handleGenerate} className="w-full">Generate All Slides</Button>
                  <Button variant="ghost" onClick={onClose} className="w-full">Cancel</Button>
              </div>
          </div>
      </div>
    </div>
  );
};
