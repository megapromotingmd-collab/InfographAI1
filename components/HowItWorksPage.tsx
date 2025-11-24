import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';

interface HowItWorksPageProps {
  onBack: () => void;
  onEnterApp: () => void;
}

// --- UTILS & HOOKS ---

const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 30, startDelay = 0, start: boolean) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.substring(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay, start]);

  return displayText;
};

// --- ICONS ---

const IconScript = () => (
  <svg className="w-6 h-6 text-crail-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconSettings = () => (
  <svg className="w-6 h-6 text-crail-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconUpload = () => (
  <svg className="w-6 h-6 text-crail-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const IconMagic = () => (
  <svg className="w-6 h-6 text-crail-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconFolder = () => (
  <svg className="w-6 h-6 text-crail-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// --- PAGE COMPONENT ---

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onBack, onEnterApp }) => {
  const [activeSection, setActiveSection] = useState(0);

  // Smooth Scroll Helper
  const scrollToSection = (id: string, index: number) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  // Update active dot on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'script', 'settings', 'upload', 'generate', 'results', 'cta'];
      sections.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -300 && rect.top < window.innerHeight / 2) {
            setActiveSection(idx);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#F5F5F0] font-sans selection:bg-crail-500 selection:text-white overflow-x-hidden">
      
      {/* HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#262625] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="w-10 h-10 bg-crail-500 rounded-xl flex items-center justify-center font-serif font-bold text-white shadow-neon">I</div>
            <span className="font-serif font-bold text-xl tracking-tight text-white">InfographAI</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-[#91918D]">
             <button onClick={onBack} className="hover:text-white transition-colors">Acasă</button>
             <button className="text-white font-bold border-b-2 border-crail-500">Cum Funcționează</button>
             <button onClick={onBack} className="hover:text-white transition-colors">Stiluri</button>
             <button onClick={onBack} className="hover:text-white transition-colors">Prețuri</button>
          </div>

          <button onClick={onEnterApp} className="bg-white text-[#0A0A0A] px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
            Accesează Platforma →
          </button>
        </div>
      </nav>

      {/* SIDE NAV DOTS */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {['hero', 'script', 'settings', 'upload', 'generate', 'results', 'cta'].map((id, i) => (
          <button 
            key={id}
            onClick={() => scrollToSection(id, i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === i ? 'bg-crail-500 scale-125' : 'bg-[#262625] hover:bg-[#666663]'}`}
            title={id.toUpperCase()}
          />
        ))}
      </div>

      {/* 1. HERO SECTION */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative pt-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-crail-500/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="text-center max-w-4xl z-10 animate-fade-in">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-crail-500 text-xs font-bold tracking-widest mb-6 uppercase">Ghid Complet</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#91918D]">
                Cum Creezi Povești<br/>Vizuale Perfecte
            </h1>
            <p className="text-xl text-[#91918D] max-w-2xl mx-auto mb-12 font-light">
                De la idee la 15 scene coerente în câteva minute. <br/>Urmărește procesul pas cu pas mai jos.
            </p>
        </div>

        {/* FLOW DIAGRAM */}
        <div className="w-full max-w-5xl mt-12 relative hidden md:block">
             <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#262625] -translate-y-1/2"></div>
             {/* Animated Line */}
             <div className="absolute top-1/2 left-0 h-0.5 bg-crail-500 -translate-y-1/2 animate-width-grow origin-left" style={{ animationDuration: '3s', animationFillMode: 'forwards' }}></div>
             
             <div className="flex justify-between relative z-10">
                 {[
                    { icon: IconScript, label: "Scenariu" }, 
                    { icon: IconSettings, label: "Setări" }, 
                    { icon: IconUpload, label: "Ref Personaj" }, 
                    { icon: IconMagic, label: "Generare" }, 
                    { icon: IconFolder, label: "Rezultat" }
                 ].map((item, i) => (
                     <div key={i} className="flex flex-col items-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: `${i * 0.5}s`, animationFillMode: 'forwards' }}>
                         <div className="w-16 h-16 bg-[#0A0A0A] border border-[#262625] rounded-full flex items-center justify-center shadow-xl z-10 text-white">
                            <item.icon />
                         </div>
                         <span className="text-sm font-bold text-[#91918D] uppercase tracking-wider">{item.label}</span>
                     </div>
                 ))}
             </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-crail-500">
            <Button onClick={() => scrollToSection('script', 1)} variant="ghost">Începe Să Înveți ↓</Button>
        </div>
      </section>

      {/* 2. SCRIPT SECTION */}
      <ScriptSection />

      {/* 3. SETTINGS SECTION */}
      <SettingsSection />

      {/* 4. UPLOAD SECTION */}
      <UploadSection />

      {/* 5. GENERATION SECTION */}
      <GenerationSection />

      {/* 6. RESULTS SECTION */}
      <ResultSection />

      {/* 7. CTA SECTION */}
      <section id="cta" className="min-h-[80vh] flex items-center justify-center bg-[#0A0A0A] relative overflow-hidden border-t border-[#262625]">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-crail-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="text-center z-10 px-6">
              <span className="text-crail-500 font-mono font-bold tracking-widest text-sm mb-6 block uppercase">Gata de Start?</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-white">Acum E Rândul Tău</h2>
              <p className="text-xl text-[#91918D] mb-12 max-w-2xl mx-auto">
                  Ai înțeles procesul. E timpul să creezi prima ta poveste vizuală cu consistență perfectă.
              </p>
              
              <button 
                onClick={onEnterApp}
                className="group relative px-12 py-6 bg-crail-500 text-white rounded-full font-bold text-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(193,95,60,0.4)]"
              >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-beam"></span>
                  <span className="relative z-10 flex items-center gap-3">
                    Începe Să Creezi — Gratuit <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
              </button>
              
              <p className="mt-6 text-sm text-[#666663]">
                  Nu e nevoie de card. Primele 5 seturi sunt gratuite.
              </p>
          </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#050505] border-t border-[#262625]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#91918D]">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                   <div className="w-6 h-6 bg-crail-500 rounded flex items-center justify-center font-serif font-bold text-white">I</div>
                   <span>© 2025 InfographAI</span>
              </div>
              <div className="flex gap-8">
                  <button onClick={onBack} className="hover:text-white">Acasă</button>
                  <button className="hover:text-white">Termeni</button>
                  <button className="hover:text-white">Confidențialitate</button>
              </div>
          </div>
      </footer>
      
      <style>{`
        .animate-width-grow { from { width: 0; } to { width: 100%; } }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .typewriter-cursor::after {
          content: '|';
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

// --- SUB SECTIONS ---

const ScriptSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const scriptText = `SET 1: AVENTURA ÎN JUNGLĂ\nContext Global: Stil explorator anii 1920,\nlumină caldă, atmosferă misterioasă.\n\nSCENA 1: Camera cu hărți. Un birou \nplin de hărți vechi și busole.\n\nSCENA 2: Pregătirea jeep-ului. \nEchipa încarcă proviziile.`;
    
    const displayText = useTypewriter(scriptText, 30, 500, isVisible);

    return (
        <section id="script" ref={ref} className="min-h-screen py-20 flex items-center px-6 border-t border-[#262625]">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-crail-500 font-bold tracking-widest text-xs mb-4 block">PASUL 1</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Scrie Scenariul Tău</h2>
                    <p className="text-lg text-[#91918D] leading-relaxed mb-8">
                        Structurează povestea în SET-uri și SCENE-uri. <br/>
                        Platforma înțelege formatul și extrage automat contextul global.
                    </p>
                    
                    <div className="p-6 bg-[#1A1A19] rounded-xl border border-[#262625] backdrop-blur-sm font-mono">
                         <div className="flex items-center gap-2 mb-4 border-b border-[#262625] pb-2">
                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                             <span className="text-xs text-[#666663] ml-2">script_editor.txt</span>
                         </div>
                         <div className="text-sm text-[#F5F5F0] whitespace-pre-wrap h-[220px] typewriter-cursor">
                             {displayText.split(/(SET|SCENA|Context)/g).map((part, i) => 
                                 ['SET', 'SCENA', 'Context'].some(k => part.includes(k)) 
                                 ? <span key={i} className="text-crail-400 font-bold">{part}</span> 
                                 : part
                             )}
                         </div>
                    </div>
                </div>

                <div className="relative h-[400px] border-l border-[#262625] pl-8 hidden lg:block">
                     <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                         <div className="mb-4 font-bold text-sm text-[#666663] uppercase tracking-widest animate-pulse">AI PARSING ACTIVE...</div>
                         
                         {displayText.includes("SET 1") && (
                             <div className="bg-[#1A1A19] border border-crail-500/50 p-4 rounded-lg mb-4 animate-fadeIn shadow-lg shadow-crail-500/10">
                                 <div className="flex justify-between">
                                     <div className="text-xs text-crail-500 font-bold mb-1">SET DETECTAT</div>
                                     <IconCheck />
                                 </div>
                                 <div className="font-bold text-white">Aventura în Junglă</div>
                                 <div className="text-xs text-[#91918D] mt-1">Context: Anii 1920, Misterios</div>
                             </div>
                         )}

                         <div className="space-y-3 pl-6 border-l-2 border-[#262625] ml-4">
                             {displayText.includes("SCENA 1") && (
                                 <div className="bg-[#1A1A19] border border-[#262625] p-3 rounded animate-slide-up relative">
                                     <div className="absolute left-[-31px] top-4 w-3 h-3 bg-crail-500 rounded-full border-2 border-[#0A0A0A]"></div>
                                     <div className="flex justify-between">
                                         <span className="font-bold text-sm text-white">SCENA 1</span>
                                         <span className="text-emerald-500 text-xs">Parsed</span>
                                     </div>
                                     <div className="text-xs text-[#91918D]">Camera cu hărți</div>
                                 </div>
                             )}
                             {displayText.includes("SCENA 2") && (
                                 <div className="bg-[#1A1A19] border border-[#262625] p-3 rounded animate-slide-up relative">
                                     <div className="absolute left-[-31px] top-4 w-3 h-3 bg-crail-500 rounded-full border-2 border-[#0A0A0A]"></div>
                                     <div className="flex justify-between">
                                         <span className="font-bold text-sm text-white">SCENA 2</span>
                                         <span className="text-emerald-500 text-xs">Parsed</span>
                                     </div>
                                     <div className="text-xs text-[#91918D]">Pregătirea jeep-ului</div>
                                 </div>
                             )}
                         </div>
                     </div>
                </div>
            </div>
        </section>
    );
};

const SettingsSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const [activeDropdown, setActiveDropdown] = useState(0);

    useEffect(() => {
        if (isVisible) {
            const timer = setInterval(() => {
                setActiveDropdown(prev => (prev < 3 ? prev + 1 : prev));
            }, 1200);
            return () => clearInterval(timer);
        }
    }, [isVisible]);

    return (
        <section id="settings" ref={ref} className="min-h-screen py-20 flex items-center px-6 border-t border-[#262625] bg-[#0D0D0D]">
             <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
                 <div className="order-2 lg:order-1">
                     {/* MOCKUP PANEL */}
                     <div className="bg-white rounded-xl p-8 shadow-2xl relative overflow-hidden text-slate-800">
                          <div className="absolute top-0 left-0 w-full h-1 bg-crail-500"></div>
                          <h3 className="font-serif text-xl font-bold mb-6 text-slate-900">Setări Generare</h3>
                          
                          <div className="space-y-6">
                              {/* Dropdown 1 */}
                              <div className="relative">
                                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Limbă</label>
                                  <div className={`border-2 rounded-lg p-3 flex justify-between items-center transition-colors ${activeDropdown === 1 ? 'border-crail-500 bg-orange-50' : 'border-slate-200'}`}>
                                      <span className="font-bold">Română</span>
                                      <span className="text-xs">▼</span>
                                  </div>
                                  {activeDropdown >= 1 && <div className="absolute right-[-20px] top-8 text-emerald-500 animate-fade-in"><IconCheck /></div>}
                              </div>

                              {/* Dropdown 2 */}
                              <div className="relative">
                                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Stil Vizual</label>
                                  <div className={`border-2 rounded-lg p-3 flex justify-between items-center transition-colors ${activeDropdown === 2 ? 'border-crail-500 bg-orange-50' : 'border-slate-200'}`}>
                                      <span className="font-bold">Watercolor Painting</span>
                                      <div className="w-6 h-6 bg-blue-200 rounded-full"></div>
                                  </div>
                                  {activeDropdown === 2 && (
                                      <div className="absolute z-10 top-full left-0 w-full bg-white shadow-xl border border-slate-200 rounded-lg mt-1 p-2 animate-slide-up">
                                          <div className="p-2 hover:bg-slate-100 rounded cursor-pointer text-sm">Photorealistic</div>
                                          <div className="p-2 hover:bg-slate-100 rounded cursor-pointer text-sm bg-orange-50 font-bold">Watercolor Painting</div>
                                          <div className="p-2 hover:bg-slate-100 rounded cursor-pointer text-sm">3D Render</div>
                                      </div>
                                  )}
                                  {activeDropdown >= 3 && <div className="absolute right-[-20px] top-8 text-emerald-500 animate-fade-in"><IconCheck /></div>}
                              </div>

                              {/* Dropdown 3 */}
                              <div className="relative">
                                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Format</label>
                                  <div className={`border-2 rounded-lg p-3 flex justify-between items-center transition-colors ${activeDropdown === 3 ? 'border-crail-500 bg-orange-50' : 'border-slate-200'}`}>
                                      <span className="font-bold">4:5 (Social Media)</span>
                                      <span className="text-xs border border-slate-400 w-4 h-5 block"></span>
                                  </div>
                                  {activeDropdown >= 3 && <div className="absolute right-[-20px] top-8 text-emerald-500 animate-fade-in"><IconCheck /></div>}
                              </div>
                          </div>

                          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                              <button className="bg-crail-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg">Salvează Configurația</button>
                          </div>
                     </div>
                 </div>

                 <div className="order-1 lg:order-2">
                    <span className="text-crail-500 font-bold tracking-widest text-xs mb-4 block">PASUL 2</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Configurează Experiența</h2>
                    <p className="text-lg text-[#91918D] leading-relaxed">
                        Alege limba, stilul, formatul și nivelul de detaliu. <br/>
                        Fiecare setare influențează rezultatul final, dar consistența rămâne neschimbată.
                    </p>
                    <div className="mt-8 flex gap-3 flex-wrap">
                        <span className="px-3 py-1 rounded-full border border-[#262625] text-xs text-[#91918D]">Română</span>
                        <span className="px-3 py-1 rounded-full border border-[#262625] text-xs text-[#91918D]">Watercolor</span>
                        <span className="px-3 py-1 rounded-full border border-[#262625] text-xs text-[#91918D]">4:5</span>
                        <span className="px-3 py-1 rounded-full border border-[#262625] text-xs text-[#91918D]">Mediu</span>
                    </div>
                 </div>
             </div>
        </section>
    );
};

const UploadSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section id="upload" ref={ref} className="min-h-screen py-20 flex items-center px-6 border-t border-[#262625]">
             <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
                 <div>
                    <span className="text-crail-500 font-bold tracking-widest text-xs mb-4 block">PASUL 3 (OPȚIONAL)</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Încarcă Referința</h2>
                    <p className="text-lg text-[#91918D] leading-relaxed mb-8">
                        Drag & drop o imagine cu personajul tău. <br/>
                        Platforma va menține consistența în toate scenele.
                    </p>
                    <div className="p-4 border border-crail-500/30 rounded-lg bg-[#1A1A19]">
                        <p className="text-sm text-crail-400 font-bold mb-2">💡 Sfat Pro</p>
                        <p className="text-sm text-[#91918D]">Imaginea de referință este analizată pentru a genera un "Character Sheet" (Imagine 1.5) care servește ca ancoră pentru întregul set.</p>
                    </div>
                 </div>

                 <div className="relative h-[400px] bg-[#1A1A19] border-2 border-dashed border-[#262625] rounded-2xl flex items-center justify-center group hover:border-crail-500 transition-colors overflow-hidden">
                     {/* Animated "Ghost" Image */}
                     <div className={`absolute w-32 h-32 bg-white rounded-lg shadow-2xl z-10 flex items-center justify-center transition-all duration-1000 ${isVisible ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100' : 'top-[-100px] left-[-100px] scale-50 opacity-0'}`}>
                         <span className="text-4xl">👤</span>
                     </div>
                     
                     <div className="text-center z-0">
                         <div className="w-16 h-16 bg-[#262625] rounded-full flex items-center justify-center mx-auto mb-4 text-crail-500 group-hover:scale-110 transition-transform">
                             <IconUpload />
                         </div>
                         <p className="font-bold text-white">Trage imaginea aici</p>
                         <p className="text-sm text-[#666663]">sau click pentru a selecta</p>
                     </div>

                     {isVisible && (
                         <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur rounded-lg p-4 animate-slide-up" style={{ animationDelay: '1s' }}>
                             <div className="flex justify-between items-center mb-2">
                                 <span className="text-xs font-bold text-white">ANALIZĂ AI</span>
                                 <span className="text-xs text-emerald-500">Complet</span>
                             </div>
                             <div className="space-y-1">
                                 <div className="h-1.5 w-full bg-neutral-700 rounded overflow-hidden"><div className="h-full w-full bg-crail-500"></div></div>
                                 <div className="flex justify-between text-[10px] text-[#91918D]">
                                     <span>Personaj Uman</span>
                                     <span>Stil: Digital</span>
                                 </div>
                             </div>
                         </div>
                     )}
                 </div>
             </div>
        </section>
    );
};

const GenerationSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setProgress(p => (p < 100 ? p + 1 : 100));
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isVisible]);

    return (
        <section id="generate" ref={ref} className="min-h-screen py-20 flex flex-col justify-center px-6 border-t border-[#262625] bg-[#0D0D0D]">
             <div className="max-w-7xl mx-auto w-full text-center mb-16">
                <span className="text-crail-500 font-bold tracking-widest text-xs mb-4 block">PASUL 4</span>
                <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white">Generare Automată</h2>
                <p className="text-xl text-[#91918D] max-w-2xl mx-auto">
                    Un click. 15 scene. Zero efort manual. <br/>
                    Sistemul Zero Tolerance garantează consistența.
                </p>
             </div>

             <div className="max-w-6xl mx-auto w-full">
                 {/* BUTTON */}
                 <div className="flex justify-center mb-12">
                     <button className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${progress < 100 ? 'bg-crail-500 text-white animate-pulse' : 'bg-emerald-500 text-white'}`}>
                         {progress < 100 ? 'GENERATING BATCH...' : 'BATCH COMPLETE ✓'}
                     </button>
                 </div>

                 {/* TIMELINE */}
                 <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-15 gap-2 overflow-x-auto pb-4">
                     {[...Array(15)].map((_, i) => (
                         <div key={i} className={`aspect-square rounded-lg border flex items-center justify-center relative overflow-hidden transition-all duration-500 ${i * 6 < progress ? 'border-crail-500 bg-[#1A1A19] opacity-100 scale-100' : 'border-[#262625] bg-[#0A0A0A] opacity-50 scale-95'}`}>
                             {i * 6 < progress ? (
                                 <span className="text-xs font-bold text-white">{i + 1}</span>
                             ) : (
                                 <div className="w-4 h-4 border-2 border-crail-500 border-t-transparent rounded-full animate-spin"></div>
                             )}
                             
                             {i === 0 && (
                                 <div className="absolute inset-0 border-2 border-emerald-500 rounded-lg z-10 animate-pulse-glow"></div>
                             )}
                         </div>
                     ))}
                 </div>

                 {/* PROGRESS BAR */}
                 <div className="mt-8 max-w-2xl mx-auto">
                     <div className="flex justify-between text-xs text-[#91918D] mb-2 font-mono">
                         <span>Progres Total</span>
                         <span>{progress}%</span>
                     </div>
                     <div className="h-2 w-full bg-[#262625] rounded-full overflow-hidden">
                         <div className="h-full bg-crail-500 transition-all duration-100" style={{ width: `${progress}%` }}></div>
                     </div>
                 </div>

                 <div className="mt-12 flex justify-center gap-8 flex-wrap">
                     <div className="flex items-center gap-2 text-sm text-white">
                         <span className="text-crail-500">🛡️</span> Zero Tolerance Protocol
                     </div>
                     <div className="flex items-center gap-2 text-sm text-white">
                         <span className="text-crail-500">⏱️</span> Drift-Proof Delay 60s
                     </div>
                     <div className="flex items-center gap-2 text-sm text-white">
                         <span className="text-crail-500">🔄</span> Auto-Retry 3×
                     </div>
                 </div>
             </div>
        </section>
    );
};

const ResultSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section id="results" ref={ref} className="min-h-screen py-20 flex items-center px-6 border-t border-[#262625]">
             <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16">
                 <div className="order-2 lg:order-1">
                      <div className="bg-white rounded-xl p-6 shadow-2xl text-slate-800 h-[500px] flex flex-col">
                          <div className="border-b border-slate-200 pb-4 mb-4 flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-sm font-bold text-slate-600 ml-2">InfographAI Exports</span>
                          </div>
                          
                          <div className="flex-grow overflow-y-auto font-mono text-sm space-y-2">
                              <div className="flex items-center gap-2 text-slate-700 font-bold">
                                  <span className="text-blue-500">📁</span> Aventura în Junglă (SET 1)
                              </div>
                              <div className={`pl-6 space-y-2 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                                  <div className="flex items-center gap-2 text-slate-600">
                                      <span className="text-blue-400">📁</span> Scenes
                                  </div>
                                  <div className="pl-6 space-y-1 text-slate-500">
                                      <div className="flex items-center gap-2"><span>🖼️</span> scene_01.png</div>
                                      <div className="flex items-center gap-2"><span>🖼️</span> scene_02.png</div>
                                      <div className="flex items-center gap-2"><span>🖼️</span> scene_03.png</div>
                                      <div className="text-xs text-slate-400 italic">... 12 more files</div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-slate-600 mt-4">
                                      <span className="text-blue-400">📁</span> References
                                  </div>
                                  <div className="pl-6 text-slate-500">
                                      <div className="flex items-center gap-2"><span>🖼️</span> character_sheet_1.5.png <span className="text-[10px] bg-green-100 text-green-600 px-1 rounded">ANCHOR</span></div>
                                  </div>

                                  <div className="flex items-center gap-2 text-slate-600 mt-4">
                                      <span>📄</span> script_original.txt
                                  </div>
                              </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                              <span className="text-xs text-slate-400">18 items • 45 MB</span>
                              <button className="bg-crail-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-crail-600 transition-colors">Descarcă ZIP</button>
                          </div>
                      </div>
                 </div>

                 <div className="order-1 lg:order-2 flex flex-col justify-center">
                    <span className="text-crail-500 font-bold tracking-widest text-xs mb-4 block">REZULTATUL</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Organizat Perfect</h2>
                    <p className="text-lg text-[#91918D] leading-relaxed mb-8">
                        15 scene coerente, gata de folosit. <br/>
                        Descarcă individual sau tot setul arhivat.
                    </p>
                    <ul className="space-y-4 text-[#F5F5F0]">
                        <li className="flex items-center gap-3">
                            <IconCheck /> <span>Folder structurat automat</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <IconCheck /> <span>Metadate incluse (prompt-uri originale)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <IconCheck /> <span>Character Sheet 1.5 inclus pentru referințe viitoare</span>
                        </li>
                    </ul>
                 </div>
             </div>
        </section>
    );
};
