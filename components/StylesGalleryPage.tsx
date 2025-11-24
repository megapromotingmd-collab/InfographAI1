import React from 'react';
import { Button } from './Button';

interface StylesGalleryPageProps {
  onBack: () => void;
}

export const StylesGalleryPage: React.FC<StylesGalleryPageProps> = ({ onBack }) => {
  const styles = [
    { name: "Photorealistic", desc: "National Geographic", gradient: "from-[#1f2937] via-[#0b1325] to-[#06080f]" },
    { name: "Anime", desc: "Sharp Cel-Shading", gradient: "from-[#1f1c3a] via-[#2b1d4a] to-[#0b0b0b]" },
    { name: "3D Render", desc: "Pixar / Disney", gradient: "from-[#0f172a] via-[#0b2447] to-[#0b0b0b]" },
    { name: "Claymation", desc: "Plasticine Texture", gradient: "from-[#3b1c0f] via-[#2a120a] to-[#0a0a0a]" },
    { name: "Digital Painting", desc: "ArtStation", gradient: "from-[#2a1a2a] via-[#311b3a] to-[#0a0a0a]" },
    { name: "Comic Book", desc: "Graphic Novel", gradient: "from-[#1f2937] via-[#2f1b1b] to-[#0a0a0a]" },
    { name: "Watercolor", desc: "Soft / Creative", gradient: "from-[#1c2d3a] via-[#1f3a2d] to-[#0a0a0a]" },
    { name: "Low-poly 3D", desc: "Geometric", gradient: "from-[#102a43] via-[#0b3b52] to-[#0a0a0a]" },
    { name: "Oil Painting", desc: "Impresionist", gradient: "from-[#332218] via-[#402819] to-[#0a0a0a]" },
    { name: "Vector Clean", desc: "SVG Style", gradient: "from-[#0f172a] via-[#1d2f3a] to-[#0a0a0a]" },
    { name: "Paper Cut-out", desc: "Craft / Layered", gradient: "from-[#2d2416] via-[#3a2c18] to-[#0a0a0a]" },
    { name: "Storybook", desc: "Whimsical", gradient: "from-[#1f2937] via-[#1f3a37] to-[#0a0a0a]" },
    { name: "Retro Futuristic", desc: "Vaporwave", gradient: "from-[#2b1c3a] via-[#1b2f4a] to-[#0b0b0b]" },
    { name: "Lego Style", desc: "Plastic bricks", gradient: "from-[#1f2022] via-[#2f302c] to-[#0b0b0b]" },
    { name: "Flat Illustration", desc: "Corporate clean", gradient: "from-[#1c1c2a] via-[#1f2c3a] to-[#0a0a0a]" },
    { name: "Pencil Sketch", desc: "Monocrom", gradient: "from-[#1c1c1c] via-[#262626] to-[#0a0a0a]" },
    { name: "Vector Minimal", desc: "Hyper-minimal", gradient: "from-[#121212] via-[#1c1c1c] to-[#0a0a0a]" },
    { name: "BJD Doll", desc: "Porțelan / resin", gradient: "from-[#1f1b22] via-[#2a2330] to-[#0b0b0b]" },
    { name: "Paper South Park", desc: "Cutout TV style", gradient: "from-[#1c2222] via-[#222c2f] to-[#0a0a0a]" },
    { name: "Wool / Knitted", desc: "Amigurumi", gradient: "from-[#201c22] via-[#2a2430] to-[#0b0b0b]" },
  ];

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
          <span className="text-crail-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 inline-flex px-4 py-2 rounded-full border border-crail-500/30">20 STILURI ARTISTICE</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Galeria de Stiluri Vizuale</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Explorează cele 20 de stiluri artistice disponibile în platformă. Fiecare stil păstrează consistența personajelor — fără drift.
          </p>
        </header>

        {/* Filters (Mock) */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
             {['Toate', 'Realistic', 'Artistic', '3D', 'Ilustrație'].map(f => (
                 <button key={f} className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${f === 'Toate' ? 'bg-crail-500 text-white border-crail-500' : 'bg-neutral-surface text-text-secondary border-white/10 hover:border-crail-500'}`}>
                     {f}
                 </button>
             ))}
        </div>

        {/* Styles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {styles.map((style, i) => (
                <div key={style.name} className="group cursor-default bg-neutral-surface rounded-2xl overflow-hidden border border-white/10 hover:border-crail-500/60 transition-all duration-300 hover:-translate-y-1 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
                    <div className="aspect-[3/4] relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} group-hover:scale-105 transition-transform duration-700`} />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.18),transparent_55%)]" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                             <p className="font-serif text-xl font-bold text-white">{style.name}</p>
                             <p className="text-xs text-text-muted uppercase tracking-[0.2em] mt-1">{style.desc}</p>
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white font-bold border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">Generează în Acest Stil</span>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-text-secondary uppercase tracking-widest">
                          <span className="w-2 h-2 rounded-full bg-crail-500"></span> Consistență garantată
                        </div>
                        <div className="space-y-2 text-sm text-text-secondary">
                            <div className="flex items-center gap-2"><CheckMark /> Detalii vizuale controlate</div>
                            <div className="flex items-center gap-2"><CheckMark /> Iluminare stabilă</div>
                            <div className="flex items-center gap-2"><CheckMark /> Ancoră 1.5 pentru personaje</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center bg-neutral-surface rounded-3xl p-16 text-white relative overflow-hidden border border-white/10">
           <div className="absolute top-0 right-0 w-64 h-64 bg-crail-500 rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Pregătit să Creezi?</h2>
             <p className="text-text-secondary mb-8 max-w-lg mx-auto">Începe propriul proiect și testează fiecare stil cu Zero Drift.</p>
             <Button onClick={onBack} className="bg-crail-500 hover:bg-crail-600 text-white border-none shadow-lg shadow-crail/30">Începe să Creezi</Button>
           </div>
        </div>
      </main>
    </div>
  );
};

const CheckMark = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-crail-500" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
