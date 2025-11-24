import React from 'react';
import { Project } from '../types';

interface SidebarProps {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  onAddProject: () => void;
  onRenameProject: (id: string, newName: string) => void;
  onOpenBookWizard: () => void;
  onOpenPitchWizard: () => void;
  onOpenBrandWizard: () => void; // NEW
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  projects, 
  activeProjectId, 
  onSelectProject, 
  onAddProject,
  onRenameProject,
  onOpenBookWizard,
  onOpenPitchWizard,
  onOpenBrandWizard
}) => {
  
  const handleContextMenu = (e: React.MouseEvent, projectId: string, currentName: string) => {
      e.preventDefault();
      const newName = prompt("Rename Project:", currentName);
      if (newName && newName.trim() !== "") {
          onRenameProject(projectId, newName.trim());
      }
  };

  return (
    <div className="w-20 flex-shrink-0 bg-slate-900 flex flex-col items-center py-6 gap-4 border-r border-slate-800 h-screen sticky top-0 z-40 shadow-xl">
      {/* Logo / Brand */}
      <div className="mb-2">
        <div className="w-11 h-11 bg-gradient-to-br from-crail-500 to-crail-600 rounded-2xl flex items-center justify-center text-white shadow-crail transform hover:scale-105 transition-transform duration-300 cursor-default">
           <span className="font-serif font-bold text-2xl">I</span>
        </div>
      </div>

      {/* --- CREATIVE TOOLS --- */}
      <div className="flex flex-col gap-3 w-full px-2 border-b border-slate-700 pb-4 mb-2">
          <button onClick={onOpenBookWizard} className="w-full aspect-square rounded-xl bg-indigo-900/50 text-indigo-300 hover:bg-indigo-500 hover:text-white flex flex-col items-center justify-center gap-1 transition-all group relative" title="Children's Book Creator">
              <span className="text-lg">📚</span>
             <div className="absolute left-16 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-xl border border-slate-700">
               Book Creator
             </div>
          </button>
          
          <button onClick={onOpenPitchWizard} className="w-full aspect-square rounded-xl bg-emerald-900/50 text-emerald-300 hover:bg-emerald-500 hover:text-white flex flex-col items-center justify-center gap-1 transition-all group relative" title="Pitch Deck Creator">
              <span className="text-lg">📊</span>
             <div className="absolute left-16 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-xl border border-slate-700">
               Pitch Deck
             </div>
          </button>

          {/* NEW BRANDING BUTTON */}
          <button onClick={onOpenBrandWizard} className="w-full aspect-square rounded-xl bg-purple-900/50 text-purple-300 hover:bg-purple-500 hover:text-white flex flex-col items-center justify-center gap-1 transition-all group relative" title="Brand Identity Kit">
              <span className="text-lg">🎨</span>
             <div className="absolute left-16 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-xl border border-slate-700">
               Brand Kit
             </div>
          </button>
      </div>

      {/* --- PROJECTS LIST --- */}
      <div className="flex-1 w-full px-2 overflow-y-auto space-y-2 no-scrollbar">
          {projects.map((proj) => (
              <button 
                  key={proj.id}
                  onClick={() => onSelectProject(proj.id)}
                  onContextMenu={(e) => handleContextMenu(e, proj.id, proj.name)}
                  className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all relative group ${activeProjectId === proj.id ? 'bg-crail-500 text-white shadow-lg shadow-crail/40' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  title={proj.name}
              >
                  <span className="text-xl">{proj.icon}</span>
                  {/* Tooltip */}
                  <div className="absolute left-16 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-xl border border-slate-700">
                    {proj.name}
                  </div>
              </button>
          ))}
      </div>

      {/* Add Project */}
      <button onClick={onAddProject} className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 hover:bg-crail-500 hover:text-white flex items-center justify-center transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
      </button>

    </div>
  );
};