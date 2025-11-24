import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input, TextArea } from '../../components/Input';

export type ProjectTemplate = 'pitch' | 'prezentare' | 'poze' | 'storybook' | 'branding' | 'custom';

interface NewProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: {
    name: string;
    icon: string;
    template: ProjectTemplate;
    notes?: string;
  }) => void;
}

const templates: Array<{ key: ProjectTemplate; title: string; desc: string; icon: string }> = [
  { key: 'pitch', title: 'Pitch Deck', desc: 'Structură pentru prezentări investitori', icon: '📊' },
  { key: 'prezentare', title: 'Prezentare', desc: 'Slide-uri rapide / workshop', icon: '🗂️' },
  { key: 'poze', title: 'Set de Poze', desc: 'Batch de imagini consistente', icon: '🖼️' },
  { key: 'storybook', title: 'Story Book', desc: 'Povești pentru copii sau narative', icon: '📚' },
  { key: 'branding', title: 'Brand Kit', desc: 'Identitate vizuală & logo', icon: '🎨' },
  { key: 'custom', title: 'Altceva', desc: 'Proiect liber, definire manuală', icon: '✨' },
];

export const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ isOpen, onClose, onCreate }) => {
  const [selected, setSelected] = useState<ProjectTemplate>('pitch');
  const [name, setName] = useState('Proiect Nou');
  const [icon, setIcon] = useState('📁');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-neutral-900 text-white w-full max-w-3xl rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-crail-300">Proiect nou</p>
            <h3 className="text-2xl font-serif font-bold">Alege tipul proiectului</h3>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-white">✕</button>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-6">
          {templates.map((tpl) => (
            <button
              key={tpl.key}
              onClick={() => setSelected(tpl.key)}
              className={`text-left p-4 rounded-2xl border transition-all ${selected === tpl.key ? 'border-crail-500 bg-crail-500/10 shadow-[0_0_20px_rgba(193,95,60,0.2)]' : 'border-white/10 bg-white/5 hover:border-crail-500/60'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{tpl.icon}</span>
                <div>
                  <p className="font-semibold">{tpl.title}</p>
                  <p className="text-xs text-text-secondary">{tpl.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input label="Nume proiect" className="bg-neutral-800 text-white border-white/10 placeholder:text-white/30" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Brand Equinox" />
          <Input label="Icon" className="bg-neutral-800 text-white border-white/10 placeholder:text-white/30" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Emoji sau text" />
        </div>
        <TextArea label="Notițe / context" className="bg-neutral-800 text-white border-white/10 placeholder:text-white/30" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Brief rapid, scopul proiectului" />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={onClose}>Renunță</Button>
          <Button onClick={() => { onCreate({ name, icon, template: selected, notes }); onClose(); }}>Creează proiect</Button>
        </div>
      </div>
    </div>
  );
};
