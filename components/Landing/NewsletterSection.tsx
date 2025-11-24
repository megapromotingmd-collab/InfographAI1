import React from 'react';

interface NewsletterSectionProps {
    text: any;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ text }) => {
  return (
    <section className="py-24 bg-neutral-900 border-t border-neutral-800 font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-crail-500 via-transparent to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <span className="text-crail-500 font-bold uppercase tracking-widest text-xs mb-3 block">{text.badge}</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">{text.title}</h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
          {text.subtitle}
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder={text.placeholder} 
            className="flex-grow px-5 py-3 rounded-lg border border-neutral-700 bg-neutral-800 focus:outline-none focus:border-crail-500 focus:ring-1 focus:ring-crail-500 transition-all text-white placeholder:text-neutral-500"
            required
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-crail-500 text-white font-bold rounded-lg hover:bg-crail-600 transition-all shadow-lg shadow-crail/20 hover:scale-105"
          >
            {text.btn}
          </button>
        </form>
        
        <div className="mt-4 flex flex-col items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                <input type="checkbox" className="rounded bg-neutral-800 border-neutral-700 text-crail-500 focus:ring-0" />
                {text.agreement}
            </label>
            <p className="text-[10px] text-slate-600">
              {text.spam_notice}
            </p>
        </div>
      </div>
    </section>
  );
};