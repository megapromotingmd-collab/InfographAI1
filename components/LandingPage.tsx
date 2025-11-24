import React, { useState, useEffect } from 'react';
import { NewsletterSection } from './Landing/NewsletterSection';
import { PricingSection } from './Landing/PricingSection';
import { content } from './Landing/locales';

interface LandingPageProps {
  onEnterApp: () => void;
  onGoToStyles: () => void;
  onGoToExamples: () => void;
  onGoToHowItWorks: () => void; // NEW PROP
  language: 'RO' | 'EN' | 'RU';
  setLanguage: (lang: 'RO' | 'EN' | 'RU') => void;
}

// --- HOOKS ---

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
};

const useScrambleText = (finalText: string, speed = 40) => {
  const [text, setText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        finalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return finalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= finalText.length) clearInterval(interval);
      iteration += 1 / 2;
    }, speed);
    return () => clearInterval(interval);
  }, [finalText, speed]);

  return text;
};

// --- MICRO COMPONENTS ---

const GradientBorderCard = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <div className={`relative p-[1px] rounded-3xl overflow-hidden group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand-light to-brand animate-gradient-border opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative h-full bg-neutral-surface rounded-[23px] overflow-hidden">
        {children}
    </div>
  </div>
);

const IconShell = ({ children }: { children: React.ReactNode }) => (
  <div className="w-12 h-12 rounded-2xl bg-neutral-bg border border-white/10 flex items-center justify-center text-brand">
    {children}
  </div>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 text-current" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="8" y="5" width="16" height="22" rx="2" className="opacity-80" />
    <path d="M20 5v6h6" />
    <path d="M11 15h10M11 20h7" strokeLinecap="round" />
  </svg>
);

const PaletteIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 5c-7 0-12 4.5-12 10.5S9 26 13 26c1.3 0 2.2-.8 2.2-1.9 0-1.2-.9-2.2-2.2-2.2h5.8c3 0 5.2-2.3 5.2-5.1C24 8 20 5 17 5z" />
    <circle cx="12" cy="13" r="1.6" fill="currentColor" />
    <circle cx="17" cy="10" r="1.6" fill="currentColor" />
    <circle cx="21" cy="14" r="1.6" fill="currentColor" />
    <circle cx="15" cy="17" r="1.6" fill="currentColor" />
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 6a4 4 0 00-8 0v6a4 4 0 004 4" strokeLinecap="round" />
    <path d="M19 6a4 4 0 118 0v6a4 4 0 01-4 4" strokeLinecap="round" />
    <path d="M13 6v20M19 6v20" />
    <path d="M9 14h4M19 14h4M9 22h4M19 22h4" strokeLinecap="round" />
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="6" width="8" height="8" rx="2" />
    <rect x="18" y="6" width="8" height="8" rx="2" />
    <rect x="6" y="18" width="8" height="8" rx="2" />
    <rect x="18" y="18" width="8" height="8" rx="2" />
  </svg>
);

const SmileIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="16" cy="16" r="12" />
    <path d="M12 14h.01M20 14h.01" strokeLinecap="round" />
    <path d="M11 19c1 1.2 2.6 2 5 2s4-0.8 5-2" strokeLinecap="round" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="16" cy="12" r="5" />
    <path d="M7 26c1.5-3.5 5-5 9-5s7.5 1.5 9 5" strokeLinecap="round" />
  </svg>
);

const CapIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 13l12-6 12 6-12 6-12-6z" />
    <path d="M8 15v5c2.5 2 5.5 3 8 3s5.5-1 8-3v-5" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="16" cy="16" r="12" />
    <path d="M16 9v7l5 3" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- MAIN LANDING PAGE ---

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onEnterApp, 
  onGoToStyles, 
  onGoToExamples,
  onGoToHowItWorks,
  language,
  setLanguage 
}) => {
  
  const text = content[language];
  const headline = useScrambleText(text.hero.title);
  const { x, y } = useMousePosition();
  const [selectedStyle, setSelectedStyle] = useState<{ name: string; note: string; gradient: string } | null>(null);
  
  // Parallax Calculation
  const moveX = (x / window.innerWidth) * 20 - 10;
  const moveY = (y / window.innerHeight) * 20 - 10;

  const featureCards = [
    { title: "Scrii scenariul", desc: "Structurat pe SET / SCENĂ, cu context global clar.", icon: DocumentIcon },
    { title: "Alegi stilul", desc: "20 de estetici — de la Photorealistic la Paper Cut-out.", icon: PaletteIcon },
    { title: "AI generează", desc: "Pipeline cu pauze de 60s + ancoră 1.5 pentru consistență.", icon: BrainIcon },
    { title: "Primești setul", desc: "15 scene + ZIP, gata pentru export social sau prezentări.", icon: GridIcon },
  ];

  const styleGallery = [
    { name: "Photorealistic", note: "National Geographic", gradient: "from-[#1f2937] via-[#111827] to-[#0b0b0b]" },
    { name: "Anime", note: "Sharp Cel-Shading", gradient: "from-[#1f1c3a] via-[#2b1d4a] to-[#0b0b0b]" },
    { name: "3D Render", note: "Pixar/Disney", gradient: "from-[#0f172a] via-[#0b2447] to-[#0b0b0b]" },
    { name: "Claymation", note: "Plasticine Texture", gradient: "from-[#3b1c0f] via-[#2a120a] to-[#0a0a0a]" },
    { name: "Digital Painting", note: "ArtStation", gradient: "from-[#2a1a2a] via-[#311b3a] to-[#0a0a0a]" },
    { name: "Comic Book", note: "Graphic Novel", gradient: "from-[#1f2937] via-[#2f1b1b] to-[#0a0a0a]" },
    { name: "Watercolor", note: "Soft & Creative", gradient: "from-[#1c2d3a] via-[#1f3a2d] to-[#0a0a0a]" },
    { name: "Low-poly 3D", note: "Geometric", gradient: "from-[#102a43] via-[#0b3b52] to-[#0a0a0a]" },
    { name: "Oil Painting", note: "Impresionist", gradient: "from-[#332218] via-[#402819] to-[#0a0a0a]" },
    { name: "Vector Clean", note: "SVG Style", gradient: "from-[#0f172a] via-[#1d2f3a] to-[#0a0a0a]" },
    { name: "Paper Cut-out", note: "Layered Craft", gradient: "from-[#2d2416] via-[#3a2c18] to-[#0a0a0a]" },
    { name: "Storybook", note: "Whimsical", gradient: "from-[#1f2937] via-[#1f3a37] to-[#0a0a0a]" },
  ];

  const formatRatios = [
    { label: "3:4", desc: "Portret clasic" },
    { label: "4:5", desc: "Instagram portrait" },
    { label: "9:16", desc: "Stories/Reels" },
    { label: "4:3", desc: "Landscape clasic" },
    { label: "1:1", desc: "Pătrat" },
    { label: "16:9", desc: "Cinematic" },
  ];

  const complexities = [
    { title: "Simplu", desc: "Pentru copii / conținut prietenos.", icon: SmileIcon },
    { title: "Mediu", desc: "Public larg, clar și coerent.", icon: UserIcon },
    { title: "Avansat", desc: "Profesioniști, detaliu ridicat.", icon: CapIcon },
  ];

  const densities = [
    { title: "Fără text", desc: "Doar vizual, zero etichete." },
    { title: "Minimal", desc: "Titluri scurte." },
    { title: "Echilibrat", desc: "Titlu + puncte cheie." },
    { title: "Detaliat", desc: "Infografic complet." },
  ];

  const researchLevels = [
    { title: "Rapid", desc: "Creativitate instantă." },
    { title: "Standard", desc: "Verifică fapte de bază." },
    { title: "Deep Research", desc: "Detalii complexe, surse multiple." },
  ];

  const comparisonShots = {
    inconsistent: ["Identitate schimbată", "Lumini diferite", "Stil inconsistent"],
    consistent: ["Personaj identic", "Lumini aliniate", "Stil blocat"],
  };

  const communityShots = [
    { title: "Storyboard pentru campanie socială", badge: "Beta", tone: "from-brand/20 via-transparent to-transparent" },
    { title: "Set educațional 15 scene", badge: "Acces timpuriu", tone: "from-brand/10 via-transparent to-transparent" },
    { title: "Demo stil anime + watercolor", badge: "Previzualizare", tone: "from-brand/15 via-transparent to-transparent" },
  ];

  return (
    <div className="noise-bg bg-neutral-bg min-h-screen text-text-primary font-sans overflow-x-hidden selection:bg-brand selection:text-white dark-scroll">
      
      {/* 0. SCROLL PROGRESS */}
      <div id="scroll-progress" className="fixed top-0 left-0 h-1 bg-brand z-[100] transition-all duration-100" style={{ width: '0%' }} />

      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-bg/80 backdrop-blur-xl border-b border-neutral-border/50 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center font-serif font-bold text-white shadow-neon animate-pulse-glow group-hover:scale-110 transition-transform">I</div>
                <div className="font-serif font-bold text-2xl tracking-tight text-white group-hover:text-brand-light transition-colors">
                    InfographAI
                </div>
            </div>
            
            {/* Nav Links */}
            <div className="hidden md:flex gap-10 text-sm font-medium text-text-secondary">
                <button onClick={onGoToHowItWorks} className="relative text-white font-bold transition-colors py-2 nav-link group">
                    Cum Funcționează
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand transition-all duration-300"></span>
                </button>
                <a href="#features" className="relative hover:text-white transition-colors py-2 nav-link group">
                    {text.nav.features}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#styles" className="relative hover:text-white transition-colors py-2 nav-link group">
                    {text.nav.styles}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full"></span>
                </a>
                 <a href="#pricing" className="relative hover:text-white transition-colors py-2 nav-link group">
                    {text.nav.pricing}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full"></span>
                </a>
            </div>

            <div className="flex items-center gap-4">
                {/* Language Switcher */}
                <div className="flex items-center bg-neutral-800 rounded-full p-1 border border-neutral-700">
                    {(['RO', 'EN', 'RU'] as const).map(lang => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${language === lang ? 'bg-brand text-white' : 'text-text-secondary hover:text-white'}`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={onEnterApp}
                    className="relative overflow-hidden bg-white text-neutral-bg px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] group"
                >
                    <span className="relative z-10">{text.nav.cta}</span>
                    <div className="absolute inset-0 bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0"></div>
                </button>
            </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Spotlight & Ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/20 blur-[150px] rounded-full pointer-events-none animate-spotlight" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand/10 blur-[120px] rounded-full animate-blob mix-blend-screen" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="animate-fade-in opacity-0" style={{ transform: `translate(${moveX * -0.5}px, ${moveY * -0.5}px)` }}>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brand/30 bg-brand/5 text-brand text-xs font-bold uppercase tracking-wider mb-8 hover:bg-brand/10 transition-colors cursor-default">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                    </span>
                    {text.hero.badge}
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-black leading-[0.95] mb-8 font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-500">
                    {headline}
                </h1>
                
                <p className="text-2xl text-text-secondary mb-12 leading-relaxed max-w-xl animate-slide-up opacity-0 font-light" style={{ animationDelay: '0.4s' }}>
                    {text.hero.subtitle}
                </p>
                
                <div className="flex flex-wrap gap-6 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
                    <button 
                        onClick={onEnterApp}
                        className="group relative px-10 py-5 bg-brand text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-crail"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-beam"></span>
                        <span className="relative z-10 flex items-center gap-2">{text.hero.cta_primary} <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                    </button>
                    <button 
                        onClick={onGoToExamples}
                        className="px-10 py-5 border border-neutral-border text-text-primary rounded-full font-bold text-lg hover:bg-neutral-surface transition-all hover:border-text-primary"
                    >
                        {text.hero.cta_secondary}
                    </button>
                </div>
            </div>

            {/* Visual Mockup with 3D Tilt */}
            <div 
                className="relative animate-slide-up opacity-0 perspective-1000" 
                style={{ 
                    animationDelay: '0.4s',
                    transform: `rotateY(${moveX * 0.5}deg) rotateX(${moveY * -0.5}deg)`
                }}
            >
                <GradientBorderCard>
                     {/* UI Mockup Content */}
                     <div className="relative aspect-[4/3] bg-[#0F0F0F] p-6 flex flex-col gap-4">
                        {/* Top Bar */}
                        <div className="flex justify-between items-center border-b border-neutral-border pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="text-[10px] font-mono text-brand animate-pulse">● LIVE SESSION</div>
                        </div>

                        <div className="flex gap-4 h-full">
                            {/* Anchor Sheet */}
                            <div className="w-1/3 h-full rounded-xl bg-neutral-bg border border-brand/50 relative overflow-hidden group">
                                <img src="https://storage.googleapis.com/aistudio-cms-assets/media/media_151e3670-3490-4886-8968-0775d40900f0/dae06385-231a-4d76-bc3d-713296068270.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" alt="Anchor" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 right-3">
                                    <div className="text-[10px] text-brand font-bold mb-1">ANCHOR (1.5)</div>
                                    <div className="h-1 w-full bg-neutral-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand w-full"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Grid Generation */}
                            <div className="w-2/3 grid grid-cols-2 gap-3">
                                {[1,2,3,4].map((i) => (
                                    <div key={i} className="bg-neutral-bg rounded-xl border border-neutral-border relative overflow-hidden group">
                                         <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors"></div>
                                         <div className="absolute inset-0 flex items-center justify-center">
                                            {i <= 2 ? (
                                                <div className="w-full h-full bg-neutral-800 animate-pulse"></div>
                                            ) : (
                                                <div className="text-brand font-mono text-xs">{text.hero.processing}</div>
                                            )}
                                         </div>
                                         <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                     </div>
                </GradientBorderCard>

                {/* Floating Stats Badge */}
                <div className="absolute -bottom-8 -right-8 glass-panel p-6 rounded-2xl animate-float">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="text-3xl">🎯</div>
                        <div>
                            <p className="text-xs text-text-muted uppercase font-bold tracking-wider">{text.hero.stats_label}</p>
                            <p className="text-4xl font-black text-brand font-mono tracking-tighter">100%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. SCROLL 2: CE FACE PLATFORMa */}
      <section id="features" className="py-32 relative bg-neutral-bg overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(193,95,60,0.2),transparent_40%)]" />
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                <span className="text-brand font-mono font-bold tracking-[0.3em] text-sm mb-6 inline-flex px-4 py-2 rounded-full border border-brand/30 uppercase">{text.features.badge}</span>
                <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white">{text.features.title}</h2>
                <p className="text-xl text-text-secondary max-w-3xl mx-auto">{text.features.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featureCards.map((item, i) => (
                    <div key={i} className="group relative p-7 rounded-3xl border border-white/10 bg-neutral-surface/70 backdrop-blur hover:border-brand/60 hover:-translate-y-2 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-brand/10 via-transparent to-transparent" />
                        <div className="relative flex items-center justify-between mb-6">
                            <IconShell><item.icon /></IconShell>
                            <span className="text-xs text-text-muted font-mono uppercase tracking-widest">Pas {i + 1}</span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
            
            <div className="mt-14 text-center">
                <button onClick={onEnterApp} className="group relative inline-flex items-center gap-3 bg-brand text-white px-9 py-4 rounded-full font-bold hover:shadow-[0_0_28px_rgba(193,95,60,0.5)] transition-transform hover:-translate-y-1 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10">Începe Acum — Gratuit</span>
                </button>
            </div>
         </div>
      </section>

      {/* 4. SCROLL 3: STILURI VIZUALE */}
      <section id="styles" className="py-32 relative bg-neutral-surface border-y border-neutral-border overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_80%_10%,rgba(193,95,60,0.18),transparent_45%)]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
                    <div>
                        <span className="text-brand font-mono font-bold tracking-[0.3em] text-sm mb-4 inline-flex px-4 py-2 rounded-full border border-brand/30 uppercase">{text.styles.badge}</span>
                        <h2 className="text-5xl font-serif font-bold text-white mb-4">{text.styles.title}</h2>
                        <p className="text-xl text-text-secondary max-w-3xl">{text.styles.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={onGoToStyles} className="px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-colors font-bold">Explorează Toate Stilurile →</button>
                      <button onClick={onEnterApp} className="px-6 py-3 bg-brand text-white rounded-full font-bold hover:shadow-[0_0_24px_rgba(193,95,60,0.45)] transition-all">Vezi Demo Live</button>
                    </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                   {styleGallery.map((style) => (
                       <button key={style.name} onClick={() => setSelectedStyle(style)} className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 hover:border-brand/60 transition-all duration-300 hover:-translate-y-1">
                           <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} group-hover:scale-105 transition-transform duration-700`} />
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.18),transparent_55%)] opacity-70" />
                           <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                               <p className="text-white font-bold text-lg font-serif">{style.name}</p>
                               <p className="text-xs text-text-muted uppercase tracking-[0.2em] mt-1">{style.note}</p>
                           </div>
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm">
                               <span className="text-xs font-bold text-white border border-white/40 rounded-full px-3 py-1">{text.styles.card_overlay}</span>
                           </div>
                       </button>
                   ))}
               </div>
          </div>

          {selectedStyle && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-6">
              <div className="bg-neutral-bg border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
                <div className={`h-72 bg-gradient-to-br ${selectedStyle.gradient} relative`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.2),transparent_60%)]" />
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-3xl font-serif font-bold text-white">{selectedStyle.name}</h3>
                  <p className="text-text-secondary">Perfect pentru povești care cer {selectedStyle.note.toLowerCase()} și consistență impecabilă.</p>
                  <div className="flex flex-wrap gap-2 text-xs text-text-muted">
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Detalii ridicate</span>
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Iluminare controlată</span>
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Personaj blocat</span>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setSelectedStyle(null)} className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors">Închide</button>
                    <button onClick={onEnterApp} className="px-4 py-2 rounded-full bg-brand text-white font-bold hover:shadow-[0_0_18px_rgba(193,95,60,0.4)] transition-all">Generează în acest stil</button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </section>

      {/* 5. SCROLL 4: WORKFLOW TIMELINE */}
      <section id="workflow" className="py-32 bg-neutral-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(193,95,60,0.16),transparent_45%)]" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
               <div className="text-center mb-16">
                   <span className="text-brand font-mono font-bold tracking-[0.3em] text-sm mb-6 inline-flex px-4 py-2 rounded-full border border-brand/30 uppercase">{text.workflow.badge}</span>
                   <h2 className="text-5xl font-serif font-bold text-white mb-6">{text.workflow.title}</h2>
                   <p className="text-xl text-text-secondary max-w-3xl mx-auto">{text.workflow.subtitle}</p>
               </div>

               <div className="grid md:grid-cols-3 gap-6">
                 {text.workflow.steps.map((step, i) => (
                   <div key={step.title} className="relative p-7 rounded-3xl border border-white/10 bg-neutral-surface/70 backdrop-blur hover:border-brand/60 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                         <div className="w-10 h-10 rounded-full bg-brand/15 border border-brand/40 text-brand font-bold grid place-items-center">{i + 1}</div>
                         <ClockIcon />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                      {i === 0 && <div className="mt-4 text-xs text-text-muted">Cursor animat + text reveal</div>}
                      {i === 1 && <div className="mt-4 text-xs text-text-muted">Dropdown + slider secvențial</div>}
                      {i === 2 && <div className="mt-4 text-xs text-text-muted">Progress bar sincronizat cu cele 15 scene</div>}
                   </div>
                 ))}
               </div>

               <div className="mt-12 flex justify-center gap-3 flex-wrap">
                   {['Zero Tolerance Protocol', 'Drift-Proof Delay 60s', 'Auto-Retry 3×', 'Character Sheet 1.5 Anchor'].map(badge => (
                       <span key={badge} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-brand uppercase tracking-wider">
                           {badge}
                       </span>
                   ))}
               </div>
               
               <div className="mt-10 text-center">
                   <button onClick={onEnterApp} className="px-8 py-4 bg-brand text-white rounded-full font-bold hover:shadow-[0_0_24px_rgba(193,95,60,0.45)] transition-all">Testează Workflow-ul</button>
               </div>
          </div>
      </section>

      {/* 6. SCROLL 5: FORMATE ȘI CONFIGURAȚII */}
      <section id="formats" className="py-32 bg-neutral-surface border-y border-neutral-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,120,90,0.12),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <span className="text-brand font-mono font-bold tracking-[0.3em] text-sm mb-4 inline-flex px-4 py-2 rounded-full border border-brand/30 uppercase">CONFIGURARE AVANSATĂ</span>
            <h2 className="text-5xl font-serif font-bold text-white mb-4">Personalizează Fiecare Detaliu</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">6 formate de imagine, 3 niveluri de complexitate, control complet al densității de text și al research-ului.</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-3xl border border-white/10 bg-neutral-bg">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Format Imagine</h3>
              <div className="grid grid-cols-3 gap-3">
                {formatRatios.map((ratio) => (
                  <div key={ratio.label} className="relative rounded-xl border border-white/10 bg-neutral-surface p-3 hover:border-brand/60 transition-all group">
                    <div className="w-full bg-neutral-800 rounded-lg mb-2 border border-white/10" style={{ aspectRatio: ratio.label.replace(':', '/') }} />
                    <p className="text-sm text-white font-semibold">{ratio.label}</p>
                    <p className="text-xs text-text-muted">{ratio.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-white/10 bg-neutral-bg">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Complexitate</h3>
              <div className="space-y-4">
                {complexities.map((item) => (
                  <div key={item.title} className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-neutral-surface hover:border-brand/60 transition-colors">
                    <IconShell><item.icon /></IconShell>
                    <div>
                      <p className="text-white font-semibold">{item.title}</p>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-white/10 bg-neutral-bg">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Densitate Text</h3>
              <div className="grid grid-cols-2 gap-3">
                {densities.map((item) => (
                  <div key={item.title} className="p-3 rounded-2xl border border-white/10 bg-neutral-surface hover:border-brand/60 transition-all">
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-white/10 bg-neutral-bg">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Nivel Research</h3>
              <div className="space-y-3">
                {researchLevels.map((item, idx) => (
                  <div key={item.title} className="p-3 rounded-2xl border border-white/10 bg-neutral-surface flex items-center justify-between hover:border-brand/60 transition-all">
                    <div>
                      <p className="text-white font-semibold">{item.title}</p>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                    <span className="text-xs text-brand font-mono">0{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button onClick={onEnterApp} className="px-8 py-4 bg-brand text-white rounded-full font-bold hover:shadow-[0_0_24px_rgba(193,95,60,0.45)] transition-all">Configurează Primul Tău Set</button>
          </div>
        </div>
      </section>

      {/* 7. SCROLL 6: COMPARAȚIE */}
      <section id="comparison" className="py-32 bg-neutral-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(193,95,60,0.12),transparent_40%)]" />
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
              <span className="text-brand font-mono font-bold tracking-[0.3em] text-sm mb-4 inline-flex px-4 py-2 rounded-full border border-brand/30 uppercase">{text.comparison.badge}</span>
              <h2 className="text-5xl font-serif font-bold text-white mb-6">{text.comparison.title}</h2>
              <p className="text-xl text-text-secondary mb-16 max-w-2xl mx-auto">{text.comparison.subtitle}</p>

              <div className="grid md:grid-cols-2 gap-10">
                   <div className="relative p-6 rounded-3xl border border-red-500/30 bg-neutral-surface/70">
                       <h3 className="text-red-400 font-bold mb-4 uppercase tracking-widest text-sm font-serif">{text.comparison.bad_label}</h3>
                       <div className="grid grid-cols-3 gap-3 opacity-70 grayscale hover:grayscale-0 transition-all">
                            {comparisonShots.inconsistent.map(item => (
                                <div key={item} className="aspect-square bg-neutral-900 rounded-xl border border-red-500/30 flex items-center justify-center text-[12px] text-red-200 text-center px-2">{item}</div>
                            ))}
                       </div>
                   </div>
                   <div className="relative p-6 rounded-3xl border border-brand/50 bg-neutral-surface/80 shadow-[0_0_30px_rgba(193,95,60,0.15)]">
                       <h3 className="text-brand font-bold mb-4 uppercase tracking-widest text-sm font-serif">{text.comparison.good_label}</h3>
                       <div className="grid grid-cols-3 gap-3">
                            {comparisonShots.consistent.map(item => (
                                <div key={item} className="aspect-square bg-neutral-900 rounded-xl border border-brand/50 flex items-center justify-center text-[12px] text-brand text-center px-2 shadow-[0_0_15px_rgba(193,95,60,0.18)]">{item}</div>
                            ))}
                       </div>
                   </div>
              </div>

              <div className="mt-14">
                  <button onClick={onGoToExamples} className="inline-flex items-center gap-2 text-white border border-brand rounded-full px-6 py-3 hover:bg-brand hover:text-white transition-colors">{text.comparison.cta}</button>
              </div>
          </div>
      </section>

      {/* 8. PRICING */}
      <PricingSection onEnterApp={onEnterApp} text={text.pricing} />

      {/* 9. COMUNITATE / EARLY ACCESS */}
      <section id="community" className="py-32 bg-neutral-surface border-y border-neutral-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(193,95,60,0.14),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <span className="text-brand font-mono font-bold tracking-[0.3em] text-sm mb-4 inline-flex px-4 py-2 rounded-full border border-brand/30 uppercase">COMUNITATEA NOASTRĂ</span>
            <h2 className="text-5xl font-serif font-bold text-white mb-4">Fii Printre Primii Creatori</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">Platforma este în early access. Vezi cum arată în acțiune și modelează viitorul generării de povești vizuale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {communityShots.map((shot) => (
              <div key={shot.title} className="relative rounded-3xl border border-white/10 bg-neutral-bg overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className={`h-48 bg-gradient-to-br ${shot.tone}`} />
                <div className="p-5 space-y-2">
                  <span className="text-xs text-brand font-mono uppercase tracking-widest">{shot.badge}</span>
                  <h3 className="text-lg font-serif font-bold text-white">{shot.title}</h3>
                  <p className="text-sm text-text-muted">Capturi reale din pipeline-ul de generare. Fără testimoniale inventate — doar proces transparent.</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={onEnterApp} className="px-8 py-4 bg-brand text-white rounded-full font-bold hover:shadow-[0_0_24px_rgba(193,95,60,0.45)] transition-all">Înscrie-te Acum</button>
            <button onClick={onEnterApp} className="px-8 py-4 border border-white/15 text-white rounded-full font-bold hover:bg-white hover:text-black transition-all">Primește notificare la lansare</button>
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER */}
      <NewsletterSection text={text.newsletter} />

      {/* 11. FOOTER */}
      <footer className="py-20 bg-neutral-bg border-t border-neutral-border">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-1">
                  <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 bg-brand rounded flex items-center justify-center font-serif font-bold text-white">I</div>
                      <span className="font-serif font-bold text-xl text-white">InfographAI</span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">Generează povești vizuale coerente cu puterea AI-ului. Fii printre primii care testează fluxul nostru.</p>
              </div>
              <div>
                  <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Platformă</h4>
                  <ul className="space-y-4 text-sm text-text-secondary">
                      <li><a href="#top" className="hover:text-brand transition-colors">Acasă</a></li>
                      <li><a href="#features" className="hover:text-brand transition-colors">Funcționalități</a></li>
                      <li><a href="#pricing" className="hover:text-brand transition-colors">Prețuri</a></li>
                      <li><a onClick={onGoToStyles} className="hover:text-brand transition-colors cursor-pointer">Galerie Stiluri</a></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Resurse</h4>
                  <ul className="space-y-4 text-sm text-text-secondary">
                      <li><a href="#workflow" className="hover:text-brand transition-colors">Tutorial Workflow</a></li>
                      <li><a href="#community" className="hover:text-brand transition-colors">Exemple Live</a></li>
                      <li><a href="#formats" className="hover:text-brand transition-colors">Ghid Configurații</a></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Legal</h4>
                  <ul className="space-y-4 text-sm text-text-secondary">
                      <li><a href="#" className="hover:text-brand transition-colors">Termeni</a></li>
                      <li><a href="#" className="hover:text-brand transition-colors">Politica de Confidențialitate</a></li>
                      <li><a href="mailto:hello@infographai.com" className="hover:text-brand transition-colors">Contact</a></li>
                  </ul>
              </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-neutral-border flex flex-col md:flex-row justify-between items-center text-xs text-text-muted">
              <p>© 2025 InfographAI. Toate drepturile rezervate.</p>
              <p className="mt-2 md:mt-0 font-mono">Creat cu pasiune în Moldova</p>
          </div>
      </footer>
    </div>
  );
};
