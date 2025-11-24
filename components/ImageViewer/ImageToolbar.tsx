
import React from 'react';

interface ImageToolbarProps {
  mode: 'view' | 'edit';
  isProcessing: boolean;
  onEdit: () => void;
  onClose: () => void;
  onBrushToggle: () => void;
  isBrushActive: boolean;
  onUndo: () => void;
  canUndo: boolean;
  onSave: () => void;
}

export const ImageToolbar: React.FC<ImageToolbarProps> = ({
  mode,
  isProcessing,
  onEdit,
  onClose,
  onBrushToggle,
  isBrushActive,
  onUndo,
  canUndo,
  onSave
}) => {
  const glassStyle = "bg-black/40 backdrop-blur-xl border border-white/10 text-white rounded-full shadow-lg transition-all duration-300";
  const btnStyle = "p-3 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <div className="absolute top-6 right-6 z-50 flex gap-4 animate-fade-in">
      
      {/* Edit Controls */}
      {mode === 'edit' && (
        <div className={`${glassStyle} flex items-center px-2 py-1`}>
          <button 
            onClick={onUndo} 
            disabled={!canUndo || isProcessing} 
            className={btnStyle} 
            title="Undo"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
          </button>
          
          <div className="w-[1px] h-6 bg-white/20 mx-1"></div>

          <button 
            onClick={onBrushToggle} 
            disabled={isProcessing}
            className={`${btnStyle} ${isBrushActive ? 'bg-white/20 text-brand' : ''}`}
            title="Brush Tool"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2.5 2.24 0 .46.62.8.8.8h.5c.17 0 .81-.34.81-.8 0-.35.79-.6 1.3-.6 1.83 0 3.67-1.45 3.53-3.71-.03-.52-.18-.92-.44-1.35Z"/></svg>
          </button>
        </div>
      )}

      {/* Main Controls */}
      <div className={`${glassStyle} flex items-center px-2 py-1`}>
        {mode === 'view' ? (
          <button onClick={onEdit} className={btnStyle} title="Edit Image">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
        ) : (
          <button 
             onClick={onSave} 
             disabled={isProcessing}
             className={`${btnStyle} text-green-400 font-bold px-4`}
          >
            Done
          </button>
        )}
        
        <div className="w-[1px] h-6 bg-white/20 mx-1"></div>
        
        <button onClick={onClose} className={btnStyle} title="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  );
};
