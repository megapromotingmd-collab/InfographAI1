import React from 'react';

interface ShowcaseSectionProps {
  onNavigate: () => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-32 bg-pampas border-y border-neutral-200 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-crail-500 font-bold uppercase tracking-widest text-xs mb-3 block">Capabilități Vizuale</span>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Generare Controlată</h2>
            <p className="text-slate-600 leading-relaxed">
              Platforma asigură că personajele și stilurile rămân identice în toate cadrele generate, indiferent de complexitatea scenei.
            </p>
          </div>
          <button 
            onClick={onNavigate}
            className="px-6 py-3 border border-slate-300 rounded-full font-bold text-slate-700 hover:bg-white hover:border-slate-900 transition-all whitespace-nowrap"
          >
            Vezi Galerie Exemple →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group relative aspect-[3/4] bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-neutral-100 mb-4 flex items-center justify-center text-slate-300">
                           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Placeholder {item}</span>
                    </div>
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors"></div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};