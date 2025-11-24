import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onOpenHelp: () => void;
  onResetKey?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onOpenHelp, onResetKey }) => {
  return (
    <div className="min-h-screen flex flex-col bg-pampas">
      {/* Header */}
      <header className="bg-white border-b border-ivory-medium sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-crail-500 rounded-lg flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="font-serif font-semibold text-xl text-slate-dark tracking-tight">InfographAI</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {onResetKey && (
               <button 
                onClick={onResetKey}
                className="p-2 text-cloud-dark hover:text-crail-500 hover:bg-crail-50 rounded-full transition-colors"
                aria-label="Reset API Key"
                title="Reset/Change API Key"
              >
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.542 16.314a4 4 0 01-1.414 1.414l-2.829 2.829a1 1 0 00-.293.707V21a1 1 0 01-2 2h-1a1 1 0 01-1-1v-3l-2.536-2.536a16.001 16.001 0 01-1.672-2.979C3.822 11.17 6.572 8 10 8c1.523 0 2.942.404 4.166 1.126l3.55-3.55A2 2 0 0119.414 5H20a2 2 0 012 2v1z" />
                </svg>
              </button>
            )}
            <button 
              onClick={onOpenHelp}
              className="p-2 text-cloud-dark hover:text-crail-500 hover:bg-crail-50 rounded-full transition-colors"
              aria-label="Help"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-ivory-dark py-8 mt-auto bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-sans text-sm text-cloud-dark">
            Powered by Gemini Nano Banana Pro. © {new Date().getFullYear()} InfographAI.
          </p>
        </div>
      </footer>
    </div>
  );
};