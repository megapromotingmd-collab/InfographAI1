
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Input, TextArea } from './Input';
import { Select } from './Select';
import { VisualStyle, PitchDetails, GenerationConfig, Language, Complexity, AspectRatio, SearchDepth, TextDensity } from '../types';
import { STYLES, LANGUAGES, COMPLEXITIES, FORMATS, SEARCH_DEPTHS, TEXT_DENSITIES } from '../constants';

interface PitchDeckWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: PitchDetails, config: GenerationConfig, logoImage?: string) => void;
}

export const PitchDeckWizard: React.FC<PitchDeckWizardProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<PitchDetails>({
    companyName: '',
    industry: '',
    problem: '',
    solution: '',
    traction: '',
    businessModel: '',
    revenue: '',
    team: '',
    competitors: '',
    usp: '',
    financials: '',
    roadmap: '',
    askAmount: '',
    investors: ''
  });

  // Configuration State with Defaults appropriate for Business/Pitch
  const [selectedStyle, setSelectedStyle] = useState<VisualStyle>(VisualStyle.FLAT);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.RO);
  const [selectedFormat, setSelectedFormat] = useState<AspectRatio>(AspectRatio.WIDE); // Default 16:9
  const [selectedComplexity, setSelectedComplexity] = useState<Complexity>(Complexity.ADVANCED); // Default Professional
  const [selectedSearchDepth, setSelectedSearchDepth] = useState<SearchDepth>(SearchDepth.STANDARD);
  const [selectedTextDensity, setSelectedTextDensity] = useState<TextDensity>(TextDensity.BALANCED);

  const [uploadedLogo, setUploadedLogo] = useState<string | undefined>(undefined);

  // RESET STATE ON OPEN
  useEffect(() => {
    if (isOpen) {
        setStep(1);
        setUploadedLogo(undefined);
        setDetails({
            companyName: '',
            industry: '',
            problem: '',
            solution: '',
            traction: '',
            businessModel: '',
            revenue: '',
            team: '',
            competitors: '',
            usp: '',
            financials: '',
            roadmap: '',
            askAmount: '',
            investors: ''
        });
        setSelectedStyle(VisualStyle.FLAT);
        setSelectedLanguage(Language.RO);
        setSelectedFormat(AspectRatio.WIDE);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    const config: GenerationConfig = {
        topic: '', // Will be generated
        language: selectedLanguage,
        style: selectedStyle,
        complexity: selectedComplexity,
        format: selectedFormat,
        searchDepth: selectedSearchDepth,
        textDensity: selectedTextDensity,
        uploadedReference: uploadedLogo
    };
    onSubmit(details, config, uploadedLogo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <Card elevated className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fadeIn">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-crail-500 transition-colors z-10 p-2"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
            <h2 className="font-serif text-3xl font-bold text-crail-600">Creator Pitch Deck</h2>
            <p className="text-slate-500">Construiește o prezentare profesională pentru investitori.</p>
        </div>

        {step === 1 && (
            <div className="space-y-4">
                <h3 className="font-bold text-lg text-slate-dark border-b pb-2">Pasul 1: Afacerea</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Nume Companie" value={details.companyName} onChange={e => setDetails({...details, companyName: e.target.value})} />
                    <Input label="Industrie" value={details.industry} onChange={e => setDetails({...details, industry: e.target.value})} />
                </div>
                <TextArea label="Problema (Pain Point)" value={details.problem} onChange={e => setDetails({...details, problem: e.target.value})} />
                <TextArea label="Soluția (Produsul)" value={details.solution} onChange={e => setDetails({...details, solution: e.target.value})} />
                
                <div className="bg-ivory-medium p-4 rounded-lg border border-ivory-dark mt-4">
                    <label className="block font-serif text-sm font-bold text-slate-dark mb-2">Încarcă Logo (Pentru Identitate Vizuală)</label>
                    <input type="file" onChange={handleFileUpload} className="block w-full text-sm text-slate-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-crail-50 file:text-crail-600 hover:file:bg-crail-100"/>
                    {uploadedLogo && <p className="text-xs text-green-600 mt-1">✓ Logo Încărcat</p>}
                </div>

                <div className="flex justify-end pt-4">
                    <Button onClick={() => setStep(2)}>Următorul: Tracțiune & Echipă &rarr;</Button>
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="space-y-4">
                <h3 className="font-bold text-lg text-slate-dark border-b pb-2">Pasul 2: Piață & Tracțiune</h3>
                <Input label="Tracțiune / Status Curent" value={details.traction} onChange={e => setDetails({...details, traction: e.target.value})} placeholder="MVP lansat, 1k utilizatori..." />
                <Input label="Model de Business" value={details.businessModel} onChange={e => setDetails({...details, businessModel: e.target.value})} placeholder="SaaS, Abonament..." />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Competitori" value={details.competitors} onChange={e => setDetails({...details, competitors: e.target.value})} />
                    <Input label="Avantaj Unic (USP)" value={details.usp} onChange={e => setDetails({...details, usp: e.target.value})} />
                </div>
                <Input label="Echipa (Fondatori)" value={details.team} onChange={e => setDetails({...details, team: e.target.value})} />

                <div className="flex justify-between pt-4">
                    <Button variant="secondary" onClick={() => setStep(1)}>&larr; Înapoi</Button>
                    <Button onClick={() => setStep(3)}>Următorul: Configurare Deck &rarr;</Button>
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="space-y-4">
                <h3 className="font-bold text-lg text-slate-dark border-b pb-2">Pasul 3: Configurare Deck</h3>
                <Input label="Suma Cerută (Investiție)" value={details.askAmount} onChange={e => setDetails({...details, askAmount: e.target.value})} placeholder="500k EUR Seed..." />
                <TextArea label="Utilizare Fonduri / Roadmap" value={details.roadmap} onChange={e => setDetails({...details, roadmap: e.target.value})} />
                
                <div className="border-t border-ivory-dark pt-4 mt-4">
                    <h4 className="font-bold text-sm text-slate-dark mb-3 uppercase tracking-wider">Setări Generare</h4>
                    
                    <Select 
                        label="Stil Vizual Deck" 
                        options={STYLES}
                        value={selectedStyle} 
                        onChange={(e) => setSelectedStyle(e.target.value as VisualStyle)} 
                        className="mb-4"
                    />

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Select 
                            label="Limbă" 
                            options={LANGUAGES} 
                            value={selectedLanguage} 
                            onChange={(e) => setSelectedLanguage(e.target.value as Language)} 
                        />
                        <Select 
                            label="Format" 
                            options={FORMATS} 
                            value={selectedFormat} 
                            onChange={(e) => setSelectedFormat(e.target.value as AspectRatio)} 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Select 
                            label="Complexitate" 
                            options={COMPLEXITIES} 
                            value={selectedComplexity} 
                            onChange={(e) => setSelectedComplexity(e.target.value as Complexity)} 
                        />
                        <Select 
                            label="Densitate Text" 
                            options={TEXT_DENSITIES} 
                            value={selectedTextDensity} 
                            onChange={(e) => setSelectedTextDensity(e.target.value as TextDensity)} 
                        />
                    </div>

                    <Select 
                        label="Nivel Căutare (Research)" 
                        options={SEARCH_DEPTHS} 
                        value={selectedSearchDepth} 
                        onChange={(e) => setSelectedSearchDepth(e.target.value as SearchDepth)} 
                    />
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-slate-700 mt-4">
                    <p className="font-bold mb-1">Logica Sistemului:</p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>Slide 1.5: <strong>Brand Identity Sheet</strong> va fi generat automat.</li>
                        <li>Deck-ul va fi generat în limba <strong>{selectedLanguage}</strong>.</li>
                    </ul>
                </div>

                <div className="flex justify-between pt-4">
                    <Button variant="secondary" onClick={() => setStep(2)}>&larr; Înapoi</Button>
                    <Button onClick={handleFinish}>🚀 Lansează Proiect</Button>
                </div>
            </div>
        )}

      </Card>
    </div>
  );
};
