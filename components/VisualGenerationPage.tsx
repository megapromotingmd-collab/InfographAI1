import React from 'react';
import { Button } from './Button';
import { Card } from './Card';

interface VisualGenerationPageProps {
  onBack: () => void;
}

export const VisualGenerationPage: React.FC<VisualGenerationPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-pampas text-slate-dark font-sans selection:bg-crail-500 selection:text-white">
      {/* Navbar Placeholder for Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-ivory-dark px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="w-10 h-10 bg-crail-500 rounded-xl flex items-center justify-center font-serif font-bold text-white">I</div>
            <span className="font-serif font-bold text-xl tracking-tight text-slate-dark">InfographAI</span>
          </div>
          <Button variant="secondary" onClick={onBack}>Inapoi la Home</Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <span className="text-crail-500 font-bold uppercase tracking-widest text-xs mb-4 block">Galerie Vizuală</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-dark">Capabilități de Generare</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Exemple de consistență stilistică și adaptabilitate pentru diverse cazuri de utilizare.
          </p>
        </header>

        {/* Categories */}
        <div className="space-y-20">
          
          {/* Section 1: Styles */}
          <section>
            <div className="flex items-end justify-between mb-8 border-b border-ivory-dark pb-4">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-2">Stiluri Artistice</h2>
                <p className="text-slate-500 text-sm">De la fotorealism la ilustrație vectoriala.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="group cursor-default">
                  <div className="aspect-[4/3] bg-slate-200 rounded-lg mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-mono text-xs uppercase tracking-widest">
                      Imagine Demo {i}
                    </div>
                    {/* Placeholder Overlay */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Stil {i === 1 ? 'Fotorealist' : i === 2 ? 'Flat Vector' : 'Claymation'}</h3>
                  <p className="text-sm text-slate-500">Utilizat pentru campanii {i === 1 ? 'documentare' : 'tech'}.</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 2: Consistency */}
          <section>
            <div className="flex items-end justify-between mb-8 border-b border-ivory-dark pb-4">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-2">Consistență Personaj</h2>
                <p className="text-slate-500 text-sm">Menținerea identității vizuale pe parcursul a 15 scene.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-slate-100 rounded-xl border border-ivory-dark flex flex-col items-center justify-center p-4">
                   <div className="w-12 h-12 rounded-full bg-slate-200 mb-4"></div>
                   <span className="text-xs font-mono text-slate-400">Scena {i}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-24 text-center bg-white rounded-3xl p-12 border border-ivory-dark shadow-crail">
           <h2 className="text-3xl font-serif font-bold mb-6">Testează Platforma</h2>
           <p className="text-slate-500 mb-8 max-w-lg mx-auto">Începe propriul proiect și experimentează puterea consistenței vizuale.</p>
           <Button onClick={onBack}>Începe Trial Gratuit</Button>
        </div>
      </main>
    </div>
  );
};