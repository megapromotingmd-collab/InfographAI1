
import React, { useState } from 'react';
import { GenerationConfig, Language, VisualStyle, Complexity, AspectRatio, SearchDepth, TextDensity } from '../types';
import { LANGUAGES, STYLES, COMPLEXITIES, FORMATS, SEARCH_DEPTHS, TEXT_DENSITIES } from '../constants';
import { Button } from './Button';
import { Select } from './Select';
import { Card } from './Card';

interface SetSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  setName: string;
  currentConfig: GenerationConfig;
  onSave: (setName: string, newConfig: GenerationConfig) => void;
}

export const SetSettingsModal: React.FC<SetSettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  setName, 
  currentConfig, 
  onSave 
}) => {
  const [config, setConfig] = useState<GenerationConfig>(currentConfig);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(setName, config);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-dark/60 backdrop-blur-sm" onClick={onClose} />
      <Card elevated className="relative w-full max-w-lg z-10 animate-fadeIn bg-white">
        <h2 className="font-serif text-2xl font-semibold mb-1 text-slate-dark">Set Settings</h2>
        <p className="text-sm text-crail-600 font-bold mb-6 uppercase tracking-wide">{setName}</p>
        
        <div className="space-y-4 mb-8">
          <Select 
            label="Limbă"
            options={LANGUAGES}
            value={config.language}
            onChange={(e) => setConfig({...config, language: e.target.value as Language})}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select 
                label="Format"
                options={FORMATS}
                value={config.format}
                onChange={(e) => setConfig({...config, format: e.target.value as AspectRatio})}
            />
            <Select 
                label="Complexitate"
                options={COMPLEXITIES}
                value={config.complexity}
                onChange={(e) => setConfig({...config, complexity: e.target.value as Complexity})}
            />
          </div>
          <Select 
            label="Stil Vizual"
            options={STYLES}
            value={config.style}
            onChange={(e) => setConfig({...config, style: e.target.value as VisualStyle})}
          />
           <Select 
            label="Nivel de Căutare"
            options={SEARCH_DEPTHS}
            value={config.searchDepth}
            onChange={(e) => setConfig({...config, searchDepth: e.target.value as SearchDepth})}
          />
          <Select 
            label="Densitate Text (Text Density)"
            options={TEXT_DENSITIES}
            value={config.textDensity}
            onChange={(e) => setConfig({...config, textDensity: e.target.value as TextDensity})}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
};
