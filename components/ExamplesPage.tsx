import React from 'react';
import { Button } from './Button';

interface ExamplesPageProps {
  onBack: () => void;
}

export const ExamplesPage: React.FC<ExamplesPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-neutral-bg text-text-primary font-sans selection:bg-crail-500 selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-neutral-bg/80 backdrop-blur-md border-b border-neutral-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="w-10 h-10 bg-crail-500 rounded-xl flex items-center justify-center font-serif font-bold text-white">I</div>
            <span className="font-serif font-bold text-xl tracking-tight text-white">InfographAI</span>
          </div>
          <Button variant="secondary" onClick={onBack}>Înapoi la Home</Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <span className="text-crail-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 inline-flex px-4 py-2 rounded-full border border-crail-500/30">DEMO & EXEMPLE</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Vezi Ce Poți Crea</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Seturi complete generate cu platforma noastră. 15 scene, consistență perfectă, fără drift.
          </p>
        </header>

        {/* Section 1: Full Sets */}
        <section className="mb-24">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <span className="text-crail-500 font-mono text-xs uppercase tracking-[0.3em]">SETURI COMPLETE</span>
                <h2 className="text-3xl font-serif font-bold text-white mt-2">Exemple de Seturi Complete</h2>
              </div>
              <Button onClick={onBack} className="bg-crail-500 hover:bg-crail-600 text-white">Întoarce-te la Platformă</Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {[1, 2].map(set => (
                    <div key={set} className="bg-neutral-surface rounded-3xl p-6 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
                         <div className="flex justify-between items-start mb-6">
                             <div>
                                 <h3 className="font-bold text-xl mb-1 text-white">Aventurile lui Robo-Rex</h3>
                                 <p className="text-sm text-text-secondary">Stil: 3D Pixar Render • 15 Scene</p>
                             </div>
                             <span className="px-3 py-1 bg-crail-500/20 text-crail-200 text-xs font-bold rounded-full border border-crail-500/40">COMPLET</span>
                         </div>
                         
                         {/* Thumbnail Grid */}
                         <div className="grid grid-cols-5 gap-2 mb-6">
                             {[...Array(15)].map((_, i) => (
                                 <div key={i} className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer border border-white/10 bg-neutral-900 hover:border-crail-500/60 transition-all">
                                      <div className="absolute inset-0 flex items-center justify-center text-[10px] text-text-muted bg-gradient-to-br from-neutral-800 to-neutral-900 group-hover:text-white group-hover:scale-105 transition-transform">{i + 1}</div>
                                 </div>
                             ))}
                         </div>
                         
                         <Button variant="secondary" className="w-full text-xs" onClick={onBack}>Vezi Detalii Set</Button>
                    </div>
                ))}
            </div>
        </section>

        {/* Section 2: Complexity Comparison */}
        <section className="mb-24">
            <h2 className="text-3xl font-serif font-bold mb-6 text-white">Comparații de Configurații</h2>
            
            <div className="bg-neutral-surface rounded-3xl border border-white/10 overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
                        <span className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Configurație: Simplu + Fără Text</span>
                        <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg mb-4 flex items-center justify-center text-text-secondary">Preview Imagine Simplă</div>
                        <p className="text-sm text-text-secondary">Ideal pentru cărți de copii sau vizualuri abstracte.</p>
                    </div>
                    <div className="p-8">
                        <span className="block text-xs font-bold text-crail-500 uppercase tracking-widest mb-4">Configurație: Avansat + Text Detaliat</span>
                        <div className="aspect-video bg-gradient-to-br from-crail-500/30 via-neutral-800 to-neutral-900 rounded-lg mb-4 flex items-center justify-center text-white">Preview Imagine Complexă</div>
                        <p className="text-sm text-text-secondary">Perfect pentru materiale educaționale, infografice științifice și prezentări.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 3: Formats */}
        <section>
            <h2 className="text-3xl font-serif font-bold mb-8 text-white">Formate în Acțiune</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['1:1', '3:4', '4:5', '9:16', '4:3', '16:9'].map(ratio => (
                    <div key={ratio} className="flex flex-col items-center">
                        <div 
                            className="bg-neutral-800 w-full mb-3 rounded-lg border border-white/10 relative group overflow-hidden"
                            style={{ aspectRatio: ratio.replace(':', '/') }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text-muted bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                {ratio}
                            </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-text-secondary">{ratio}</span>
                    </div>
                ))}
            </div>
        </section>

      </main>
    </div>
  );
};
