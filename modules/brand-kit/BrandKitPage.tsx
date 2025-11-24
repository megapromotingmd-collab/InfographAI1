import React, { useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { Input, TextArea } from '../../components/Input';
import { BrandKitFormState, BrandKitProject } from './types';
import { generateBrandAssetMock, generateBrandOverviewDraft } from '../../services/brandKitService';
import { ApiKeyPanel } from '../project-hub/ApiKeyPanel';
import { ImageViewer } from '../../components/ImageViewer/ImageViewer';

interface BrandKitPageProps {
  brandKits: BrandKitProject[];
  onSaveBrandKits: (kits: BrandKitProject[]) => void;
  onClose: () => void;
}

const defaultForm: BrandKitFormState = {
  name: '',
  category: 'companie',
  industry: '',
  audience: '',
  values: '',
  tone: '',
  visualGoals: '',
  colorMode: 'dark',
  boldness: 'safe',
  loudness: 'echilibrat',
  wants: { logo: true, palette: true, social: true, icons: false, covers: true, pitchTheme: false },
  uploads: { references: [], legacy: [] },
};

export const BrandKitPage: React.FC<BrandKitPageProps> = ({ brandKits, onSaveBrandKits, onClose }) => {
  const [form, setForm] = useState<BrandKitFormState>(defaultForm);
  const [activeId, setActiveId] = useState<string | null>(brandKits[0]?.id || null);
  const [viewer, setViewer] = useState<{ src: string; id: string } | null>(null);
  const active = useMemo(() => brandKits.find((b) => b.id === activeId) || null, [brandKits, activeId]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreateKit = async () => {
    if (!form.name.trim()) return;
    setIsGenerating(true);
    const overview = await generateBrandOverviewDraft(form);
    const newKit: BrandKitProject = {
      id: `brand-${Date.now()}`,
      name: form.name,
      category: form.category,
      industry: form.industry,
      audience: form.audience,
      values: form.values,
      tone: form.tone,
      visualGoals: form.visualGoals,
      colorMode: form.colorMode,
      boldness: form.boldness,
      loudness: form.loudness,
      wants: form.wants,
      uploads: form.uploads,
      overview,
      assets: [],
      createdAt: Date.now(),
      linkedProjectId: form.linkedProjectId,
    };
    onSaveBrandKits([newKit, ...brandKits]);
    setActiveId(newKit.id);
    setForm(defaultForm);
    setIsGenerating(false);
  };

  const handleGenerateAsset = async (kind: BrandKitProject['assets'][number]['kind'], title: string) => {
    if (!active) return;
    const url = await generateBrandAssetMock(kind, `${active.name} • ${title}`);
    const updated = brandKits.map((kit) =>
      kit.id === active.id
        ? { ...kit, assets: [{ id: `asset-${Date.now()}`, kind, title, url, createdAt: Date.now() }, ...kit.assets] }
        : kit
    );
    onSaveBrandKits(updated);
  };

  const updateFormUploads = (file: File, target: 'logo' | 'legacy' | 'references') => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      setForm((prev) => {
        if (target === 'logo') {
          return { ...prev, uploads: { ...prev.uploads, logo: data } };
        }
        if (target === 'legacy') {
          return { ...prev, uploads: { ...prev.uploads, legacy: [...(prev.uploads.legacy || []), data] } };
        }
        return { ...prev, uploads: { ...prev.uploads, references: [...(prev.uploads.references || []), data] } };
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-neutral-bg text-text-primary">
      <header className="sticky top-0 z-30 bg-neutral-bg/80 backdrop-blur border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Branding & Design Kit</p>
            <h1 className="text-3xl font-serif font-bold">Brief, Overview, Assets</h1>
          </div>
          <Button variant="secondary" className="border-white/30 text-white hover:bg-white hover:text-black" onClick={onClose}>Înapoi</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[360px_1fr] gap-8">
        <section className="bg-neutral-surface/70 border border-white/10 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-white">Brief nou</p>
            <Button size="sm" onClick={handleCreateKit} isLoading={isGenerating}>Salvează Brief</Button>
          </div>
          <Input label="Nume brand" className="bg-neutral-800 text-white border-white/10 placeholder:text-white/30" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Equinox Labs" />
          <Input label="Categorie" className="bg-neutral-800 text-white border-white/10 placeholder:text-white/30" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as any })} placeholder="companie / produs / eveniment" />
          <Input label="Industrie" className="bg-neutral-800 text-white border-white/10 placeholder:text-white/30" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
          <TextArea label="Public țintă" className="bg-neutral-800 text-white border-white/10 placeholder:text-white/30" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} />
          <TextArea label="Valori & Ton" className="bg-neutral-800 text-white border-white/10 placeholder:text-white/30" value={form.values} onChange={(e) => setForm({ ...form, values: e.target.value })} />
          <Input label="Ton (serios, jucăuș, lux...)" className="bg-neutral-800 text-white border-white/10 placeholder:text-white/30" value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} />
          <TextArea label="Ce vrei să transmită vizual" className="bg-neutral-800 text-white border-white/10 placeholder:text-white/30" value={form.visualGoals} onChange={(e) => setForm({ ...form, visualGoals: e.target.value })} />

          <div className="grid grid-cols-3 gap-2 text-xs">
            <label className="space-y-1">
              <span className="block text-text-muted">Culoare</span>
              <select value={form.colorMode} onChange={(e) => setForm({ ...form, colorMode: e.target.value as any })} className="w-full bg-neutral-bg border border-white/10 rounded-lg p-2">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="vibrant">Vibrant</option>
                <option value="pastel">Pastel</option>
                <option value="neutru">Neutru</option>
              </select>
            </label>
            <label className="space-y-1">
              <span className="block text-text-muted">Îndrăzneală</span>
              <select value={form.boldness} onChange={(e) => setForm({ ...form, boldness: e.target.value as any })} className="w-full bg-neutral-bg border border-white/10 rounded-lg p-2">
                <option value="safe">Safe</option>
                <option value="mediu">Mediu</option>
                <option value="experimental">Experimental</option>
              </select>
            </label>
            <label className="space-y-1">
              <span className="block text-text-muted">Loudness</span>
              <select value={form.loudness} onChange={(e) => setForm({ ...form, loudness: e.target.value as any })} className="w-full bg-neutral-bg border border-white/10 rounded-lg p-2">
                <option value="soft">Soft</option>
                <option value="echilibrat">Echilibrat</option>
                <option value="puternic">Puternic</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(form.wants).map(([key, val]) => (
              <label key={key} className="flex items-center gap-2 text-text-secondary bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <input type="checkbox" checked={val} onChange={(e) => setForm({ ...form, wants: { ...form.wants, [key]: e.target.checked } })} />
                {key}
              </label>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex gap-2 items-center">
              <span className="w-24 text-text-muted">Logo existent</span>
              <input type="file" onChange={(e) => e.target.files?.[0] && updateFormUploads(e.target.files[0], 'logo')} />
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-24 text-text-muted">Materiale vechi</span>
              <input type="file" multiple onChange={(e) => e.target.files && updateFormUploads(e.target.files[0], 'legacy')} />
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-24 text-text-muted">Referințe</span>
              <input type="file" multiple onChange={(e) => e.target.files && updateFormUploads(e.target.files[0], 'references')} />
            </div>
          </div>

          <ApiKeyPanel />
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Brand Kits</p>
              <h2 className="text-2xl font-serif font-bold text-white">Proiecte salvate</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="secondary" className="border-white/20 text-white hover:bg-white hover:text-black" onClick={() => active && handleGenerateAsset('logo', 'Logo Concepts')} disabled={!active}>Logo Sheet</Button>
              <Button variant="secondary" className="border-white/20 text-white hover:bg-white hover:text-black" onClick={() => active && handleGenerateAsset('palette', 'Paletă Culori')} disabled={!active}>Paletă</Button>
              <Button variant="secondary" className="border-white/20 text-white hover:bg-white hover:text-black" onClick={() => active && handleGenerateAsset('moodboard', 'Moodboard')} disabled={!active}>Moodboard</Button>
              <Button className="bg-brand text-white" onClick={() => active && handleGenerateAsset('application', 'Aplicare Mock')} disabled={!active}>Aplicare</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {brandKits.map((kit) => (
              <button key={kit.id} onClick={() => setActiveId(kit.id)} className={`text-left p-4 rounded-2xl border transition-all ${activeId === kit.id ? 'border-brand/60 bg-brand/10' : 'border-white/10 bg-white/5 hover:border-brand/40'}`}>
                <p className="text-sm text-text-muted">{kit.category}</p>
                <h3 className="text-xl font-serif font-bold text-white">{kit.name}</h3>
                <p className="text-sm text-text-secondary">{kit.industry}</p>
              </button>
            ))}
          </div>

          {active && (
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
              <div className="p-5 rounded-3xl border border-white/10 bg-white/5 space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Overview</p>
                <h3 className="text-2xl font-serif font-bold text-white">{active.name}</h3>
                <p className="text-sm text-text-secondary">Public: {active.audience}</p>
                <p className="text-sm text-text-secondary">Valori: {active.values}</p>
                <p className="text-sm text-text-secondary">Ton: {active.tone}</p>
                {active.overview && (
                  <div className="text-sm text-text-secondary space-y-1">
                    <p className="font-semibold text-white">Rezumat</p>
                    <p>{active.overview.summary}</p>
                    <p className="font-semibold text-white pt-2">Poziționare</p>
                    <p>{active.overview.positioning}</p>
                    <p className="font-semibold text-white pt-2">Promisiuni</p>
                    <ul className="list-disc list-inside text-text-secondary">
                      {active.overview.promises?.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                )}
              </div>
              <div className="p-5 rounded-3xl border border-white/10 bg-white/5 space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Assets</p>
                <div className="grid grid-cols-2 gap-3">
                  {active.assets.map((a) => (
                    <div key={a.id} className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-bg cursor-pointer" onClick={() => setViewer({ src: a.url, id: a.id })}>
                      <div className="aspect-[4/3]">
                        <img src={a.url} className="w-full h-full object-cover" alt={a.title} />
                      </div>
                      <div className="p-2 text-sm text-white">{a.title}</div>
                    </div>
                  ))}
                  {active.assets.length === 0 && <p className="text-text-muted text-sm col-span-2">Niciun asset generat încă.</p>}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <ImageViewer
        isOpen={!!viewer}
        imageSrc={viewer?.src || null}
        onClose={() => setViewer(null)}
        onSave={(newSrc) => {
          if (!viewer) return;
          const updated = brandKits.map((kit) => kit.id === activeId ? { ...kit, assets: kit.assets.map((a) => a.id === viewer.id ? { ...a, url: newSrc } : a) } : kit);
          onSaveBrandKits(updated);
          setViewer(null);
        }}
        styleContext="Brand Kit"
      />
    </div>
  );
};
