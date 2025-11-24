import React, { useMemo, useState } from 'react';
import { Project } from '../../types';
import { Button } from '../../components/Button';
import { NewProjectDialog, ProjectTemplate } from './NewProjectDialog';
import { ApiKeyPanel } from './ApiKeyPanel';

interface ProjectHubProps {
  projects: Project[];
  onClose: () => void;
  onOpenBrandKit: () => void;
  onSelectProject: (id: string) => void;
  onCreateProject: (payload: { name: string; icon: string; template: ProjectTemplate; notes?: string }) => void;
}

const typeLabels: Record<string, string> = {
  pitch: 'Pitch Deck',
  prezentare: 'Prezentare',
  poze: 'Set de Poze',
  storybook: 'Story Book',
  branding: 'Brand Kit',
  custom: 'Custom',
};

export const ProjectHub: React.FC<ProjectHubProps> = ({ projects, onClose, onOpenBrandKit, onSelectProject, onCreateProject }) => {
  const [openNew, setOpenNew] = useState(false);
  const grouped = useMemo(() => {
    const buckets: Record<string, Project[]> = {};
    projects.forEach((p) => {
      const key = p.moduleType || 'general';
      if (!buckets[key]) buckets[key] = [];
      buckets[key].push(p);
    });
    return buckets;
  }, [projects]);

  return (
    <div className="min-h-screen bg-neutral-bg text-text-primary font-sans">
      <header className="sticky top-0 z-30 bg-neutral-bg/80 backdrop-blur border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Hub Proiecte</p>
            <h1 className="text-3xl font-serif font-bold">Organizare centralizată</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="border-white/30 text-white hover:bg-white hover:text-black" onClick={onClose}>Înapoi</Button>
            <Button onClick={() => setOpenNew(true)}>Proiect Nou</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="space-y-4 bg-neutral-surface/70 border border-white/10 rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Spații</p>
            <Button size="sm" variant="ghost" onClick={() => setOpenNew(true)}>+ Adaugă</Button>
          </div>
          <div className="space-y-2 text-sm">
            {Object.entries(grouped).map(([key, list]) => (
              <div key={key} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <span className="capitalize text-text-secondary">{key}</span>
                <span className="text-xs text-text-muted">{list.length}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10">
            <Button variant="secondary" className="w-full" onClick={onOpenBrandKit}>Branding & Design Kit</Button>
          </div>
          <ApiKeyPanel compact />
        </aside>

        <section className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <button key={p.id} onClick={() => onSelectProject(p.id)} className="text-left p-5 rounded-2xl border border-white/10 bg-neutral-surface/70 hover:border-brand/60 hover:-translate-y-1 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-lg">{p.icon}</div>
                  <div>
                    <p className="font-semibold text-white leading-tight">{p.name}</p>
                    <p className="text-xs text-text-muted">{p.moduleType || 'General'}</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">Creat {new Date(p.createdAt).toLocaleDateString()} · {p.config.style}</p>
              </button>
            ))}
          </div>
        </section>
      </main>

      <NewProjectDialog
        isOpen={openNew}
        onClose={() => setOpenNew(false)}
        onCreate={(payload) => onCreateProject(payload)}
      />
    </div>
  );
};
