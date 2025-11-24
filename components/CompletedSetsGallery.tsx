
import React from 'react';
import { CompletedSet } from '../types';
import { Button } from './Button';

interface CompletedSetsGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  set: CompletedSet | null;
}

export const CompletedSetsGallery: React.FC<CompletedSetsGalleryProps> = ({ isOpen, onClose, set }) => {
  if (!isOpen || !set) return null;

  const handleDownload = (imageUrl: string, name: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${name.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-pampas">
        {/* Header */}
        <div className="bg-white border-b border-ivory-dark px-6 py-4 flex justify-between items-center shadow-sm">
            <div>
                <h2 className="font-serif text-xl font-bold text-slate-dark">{set.name}</h2>
                <p className="text-sm text-slate-500">{new Date(set.timestamp).toLocaleString()} • {set.items.filter(i => i.status === 'success').length} Images</p>
            </div>
            <Button variant="secondary" onClick={onClose}>Close Gallery</Button>
        </div>

        {/* Grid */}
        <div className="flex-grow overflow-y-auto p-6">
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {/* 1.5 Sheet First */}
                {set.sheetUrl && (
                    <div className="bg-white p-3 rounded-xl shadow-card border-2 border-green-200">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-3 relative">
                             <img src={set.sheetUrl} className="w-full h-full object-cover" alt="Character Sheet" />
                             <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">SHEET 1.5</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-dark">Reference Anchor</span>
                            <button onClick={() => handleDownload(set.sheetUrl!, `${set.name}_Sheet_1.5`)} className="text-crail-500 hover:text-crail-700 text-sm font-semibold">Download</button>
                        </div>
                    </div>
                )}

                {set.items.filter(i => i.status === 'success').map((item, idx) => (
                    <div key={item.id} className="bg-white p-3 rounded-xl shadow-card border border-ivory-dark">
                        <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 mb-3 relative group">
                             <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.shortTopic} />
                             {item.referenceImageUsed && (
                                 <div className="absolute bottom-2 right-2 bg-slate-800/70 text-white text-[8px] px-1.5 py-0.5 rounded backdrop-blur-sm">LOCKED</div>
                             )}
                        </div>
                        <div className="mb-2">
                            <p className="text-xs font-bold text-crail-600 uppercase">{item.slideNumber}</p>
                            <p className="text-xs text-slate-dark truncate font-medium" title={item.shortTopic}>{item.shortTopic}</p>
                        </div>
                        <button 
                            onClick={() => handleDownload(item.imageUrl!, `${set.name}_${item.slideNumber}`)} 
                            className="w-full py-1.5 text-center rounded bg-pampas hover:bg-ivory-dark text-slate-dark text-xs font-semibold transition-colors"
                        >
                            Download
                        </button>
                    </div>
                ))}
             </div>
        </div>
    </div>
  );
};
