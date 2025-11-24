import React from 'react';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface PricingSectionProps {
  onEnterApp: () => void;
  text: any;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onEnterApp, text }) => {
  return (
    <section id="pricing" className="py-32 bg-neutral-bg relative font-sans border-t border-neutral-border overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(193,95,60,0.16),transparent_45%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-crail-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 inline-flex px-4 py-2 rounded-full border border-crail-500/30">{text.badge}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">{text.title}</h2>
            <p className="text-text-secondary mt-4">{text.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Starter */}
              <div className="p-8 rounded-3xl border border-white/10 bg-neutral-surface hover:border-crail-500/50 transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
                  <h3 className="text-sm font-bold mb-2 font-serif uppercase tracking-[0.2em] text-text-muted">{text.starter.name}</h3>
                  <div className="text-4xl font-black mb-6 text-white font-serif">{text.starter.price}</div>
                  <p className="text-sm text-text-secondary mb-8 pb-6 border-b border-white/10">{text.starter.desc}</p>
                  <ul className="space-y-3 mb-8 text-sm font-medium text-text-secondary">
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.sets5}</li>
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.allStyles}</li>
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.exportPng}</li>
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.support}</li>
                  </ul>
                  <button onClick={onEnterApp} className="w-full py-3.5 rounded-full border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-colors">{text.starter.btn}</button>
              </div>

              {/* PRO */}
              <div className="p-8 rounded-3xl border-2 border-crail-500 bg-neutral-surface relative shadow-[0_20px_60px_rgba(193,95,60,0.25)] transform md:-translate-y-4 z-10">
                  <div className="absolute top-0 right-0 bg-crail-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wide">{text.pro.badge}</div>
                  <h3 className="text-sm font-bold mb-2 font-serif uppercase tracking-[0.2em] text-crail-200">{text.pro.name}</h3>
                  <div className="text-4xl font-black mb-6 text-white font-serif">{text.pro.price}<span className="text-lg font-normal text-text-muted">{text.pro.period}</span></div>
                  <p className="text-sm text-text-secondary mb-8 pb-6 border-b border-white/10">{text.pro.desc}</p>
                  <ul className="space-y-3 mb-8 text-sm font-medium text-text-secondary">
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.unlimited}</li>
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.exportHd}</li>
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.refUpload}</li>
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.priority}</li>
                  </ul>
                  <button onClick={onEnterApp} className="w-full py-3.5 rounded-full bg-crail-500 text-white font-bold hover:shadow-[0_0_24px_rgba(193,95,60,0.45)] transition-all relative overflow-hidden group">
                      <span className="relative z-10">{text.pro.btn}</span>
                      <div className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-500"></div>
                  </button>
              </div>

              {/* Enterprise */}
              <div className="p-8 rounded-3xl border border-white/10 bg-neutral-surface hover:border-crail-500/50 transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
                  <h3 className="text-sm font-bold mb-2 font-serif uppercase tracking-[0.2em] text-text-muted">{text.enterprise.name}</h3>
                  <div className="text-4xl font-black mb-6 text-white font-serif">{text.enterprise.price}</div>
                  <p className="text-sm text-text-secondary mb-8 pb-6 border-b border-white/10">{text.enterprise.desc}</p>
                  <ul className="space-y-3 mb-8 text-sm font-medium text-text-secondary">
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.highVol}</li>
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.apiAccess}</li>
                      <li className="flex gap-3 items-center"><span className="text-crail-500"><CheckIcon /></span> {text.features.whiteLabel}</li>
                  </ul>
                  <button className="w-full py-3.5 rounded-full border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-colors">{text.enterprise.btn}</button>
              </div>
          </div>
      </div>
    </section>
  );
};
