import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Input, TextArea } from '../Input';
import { BrandDetails } from '../../types';

interface BrandingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: BrandDetails) => void;
}

export const BrandingWizard: React.FC<BrandingWizardProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<BrandDetails>({
    name: '',
    type: '',
    industry: '',
    targetAudience: '',
    values: '',
    tone: '',
    visualPreferences: '',
    colors: '',
    referenceImages: []
  });

  if (!isOpen) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => setDetails(prev => ({ ...prev, uploadedLogo: reader.result as string }));
        reader.readAsDataURL(file);
    }
  };

  const handleRefUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
              const res = reader.result as string;
              if (details.referenceImages && details.referenceImages.length < 3) {
                  setDetails(prev => ({ ...prev, referenceImages: [...(prev.referenceImages || []), res] }));
              }
          };
          reader.readAsDataURL(file);
      }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-fadeIn">
      <Card elevated className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-ivory-dark pb-4">
            <div>
                <h2 className="font-serif text-3xl font-bold text-slate-dark">Brand Identity Kit</h2>
                <p className="text-slate-500 text-sm">Create a complete design system for your project.</p>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-crail-500">✕</button>
        </div>

        {/* Step 1: Core Identity */}
        {step === 1 && (
            <div className="space-y-4 animate-slide-up">
                <h3 className="font-bold text-lg text-crail-600">Step 1: The Basics</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Brand Name" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} placeholder="e.g. Apex Dynamics" />
                    <Input label="Type" value={details.type} onChange={e => setDetails({...details, type: e.target.value})} placeholder="e.g. Tech Startup, Coffee Shop" />
                </div>
                <Input label="Industry / Niche" value={details.industry} onChange={e => setDetails({...details, industry: e.target.value})} placeholder="e.g. SaaS, Organic Food" />
                <TextArea label="Target Audience" value={details.targetAudience} onChange={e => setDetails({...details, targetAudience: e.target.value})} placeholder="Who are we talking to?" />
                
                <div className="flex justify-end pt-6">
                    <Button onClick={() => setStep(2)} disabled={!details.name}>Next: Strategy →</Button>
                </div>
            </div>
        )}

        {/* Step 2: Strategy */}
        {step === 2 && (
            <div className="space-y-4 animate-slide-up">
                <h3 className="font-bold text-lg text-crail-600">Step 2: Strategy & Voice</h3>
                <TextArea label="Core Values" value={details.values} onChange={e => setDetails({...details, values: e.target.value})} placeholder="e.g. Innovation, Transparency, Speed" />
                <Input label="Brand Tone" value={details.tone} onChange={e => setDetails({...details, tone: e.target.value})} placeholder="e.g. Playful, Corporate, Luxurious" />
                
                <div className="flex justify-between pt-6">
                    <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
                    <Button onClick={() => setStep(3)}>Next: Visuals →</Button>
                </div>
            </div>
        )}

        {/* Step 3: Visual Direction */}
        {step === 3 && (
            <div className="space-y-4 animate-slide-up">
                <h3 className="font-bold text-lg text-crail-600">Step 3: Visual Direction</h3>
                <TextArea label="Visual Preferences" value={details.visualPreferences} onChange={e => setDetails({...details, visualPreferences: e.target.value})} placeholder="e.g. Minimalist, geometric shapes, lots of white space." />
                <Input label="Color Palette Idea" value={details.colors} onChange={e => setDetails({...details, colors: e.target.value})} placeholder="e.g. Navy Blue & Gold, or Neon Cyberpunk" />
                
                <div className="bg-ivory-medium p-4 rounded-lg border border-ivory-dark space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Existing Logo (Optional)</label>
                        <input type="file" onChange={handleLogoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white file:text-crail-600 hover:file:bg-slate-100"/>
                        {details.uploadedLogo && <div className="mt-2 text-xs text-green-600 font-bold">✓ Logo Uploaded</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Inspiration / Reference Images (Max 3)</label>
                        <input type="file" onChange={handleRefUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white file:text-crail-600 hover:file:bg-slate-100" disabled={details.referenceImages && details.referenceImages.length >= 3}/>
                        <div className="flex gap-2 mt-2">
                            {details.referenceImages?.map((img, i) => (
                                <img key={i} src={img} className="w-12 h-12 object-cover rounded border border-slate-300" alt={`Ref ${i}`} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between pt-6">
                    <Button variant="secondary" onClick={() => setStep(2)}>← Back</Button>
                    <Button onClick={() => { onSubmit(details); onClose(); }}>🚀 Create Brand Kit</Button>
                </div>
            </div>
        )}

      </Card>
    </div>
  );
};