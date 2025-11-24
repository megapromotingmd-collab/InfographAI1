import React from 'react';
import { Button } from './Button';
import { Card } from './Card';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-dark/40 backdrop-blur-sm" onClick={onClose} />
      <Card elevated className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto z-10 animate-fadeIn">
        <h2 className="font-serif text-2xl font-semibold mb-6">How to use InfographAI</h2>
        
        <div className="space-y-6 font-sans text-slate-medium">
          <div>
            <h3 className="font-semibold text-lg text-slate-dark mb-2">1. Enter a Topic</h3>
            <p>Describe what you want to learn about. Be specific! <br/> Example: <em className="text-cloud-dark">"The lifecycle of a butterfly"</em> or <em className="text-cloud-dark">"History of the Roman Empire in 5 key events"</em>.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-slate-dark mb-2">2. Configure</h3>
            <p>Select the language, visual style, complexity level, and format that suits your needs.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-slate-dark mb-2">3. Generate</h3>
            <p>Click "Generate" and wait a few moments. We use advanced AI to research the topic and design the image.</p>
          </div>
          
          <div className="p-4 bg-ivory-medium rounded-lg border border-ivory-dark text-sm">
             <strong>Note:</strong> This app uses the <code>gemini-3-pro-image-preview</code> model. You may be prompted to select a paid API key via Google AI Studio if one is not detected.
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </Card>
    </div>
  );
};