import React, { useState } from 'react';
import { BrandAsset, BrandDetails, BrandOverview, Project } from '../../types';
import { generateBrandAsset, generateBrandOverview } from '../../services/brandingService';
import { Card } from '../Card';
import { Button } from '../Button';
import { ImageViewer } from '../ImageViewer/ImageViewer';

interface BrandingWorkspaceProps {
  project: Project;
  onUpdateProject: (updatedProject: Project) => void;
}

export const BrandingWorkspace: React.FC<BrandingWorkspaceProps> = ({ project, onUpdateProject }) => {
  const [activeTab, setActiveTab] = useState<'brief' | 'visuals' | 'applications'>('brief');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewerImage, setViewerImage] = useState<{src: string, id: string} | null>(null);

  const details = project.brandDetails;
  const overview = project.brandOverview;
  const assets = project.brandAssets || [];

  if (!details) return <div>No Brand Details Found.</div>;

  // --- ACTIONS ---

  const handleGenerateOverview = async () => {
      setIsGenerating(true);
      try {
          const newOverview = await generateBrandOverview(details);
          onUpdateProject({ ...project, brandOverview: newOverview });
      } catch (e) {
          alert("Failed to generate overview");
      } finally {
          setIsGenerating(false);
      }
  };

  const handleGenerateAsset = async (type: BrandAsset['type'], title: string) => {
      if (!overview) {
          alert("Please generate the Brand Strategy Overview first.");
          return;
      }
      setIsGenerating(true);
      try {
          const imgUrl = await generateBrandAsset(type, details, overview);
          const newAsset: BrandAsset = {
              id: `asset-${Date.now()}`,
              type,
              title,
              imageUrl: imgUrl,
              timestamp: Date.now()
          };
          onUpdateProject({ 
              ...project, 
              brandAssets: [newAsset, ...assets] 
          });
      } catch (e) {
          alert("Failed to generate asset");
      } finally {
          setIsGenerating(false);
      }
  };

  const handleSaveEditedImage = (newSrc: string) => {
      if (!viewerImage) return;
      const updatedAssets = assets.map(a => a.id === viewerImage.id ? { ...a, imageUrl: newSrc } : a);
      onUpdateProject({ ...project, brandAssets: updatedAssets });
  };

  // --- RENDER ---

  return (
    <div className="h-full flex flex-col relative w-full">
        {/* Editor Modal */}
        <ImageViewer 
            isOpen={!!viewerImage}
            imageSrc={viewerImage?.src || null}
            onClose={() => setViewerImage(null)}
            onSave={handleSaveEditedImage}
            styleContext="Brand Design"
        />

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="font-serif text-3xl font-bold text-slate-dark">{details.name}</h1>
                <p className="text-slate-500 text-sm">{details.type} • {details.industry}</p>
            </div>
            <div className="flex gap-2">
                 <Button variant="ghost" onClick={() => setActiveTab('brief')} className={activeTab === 'brief' ? 'bg-crail-50 text-crail-600' : ''}>Strategy</Button>
                 <Button variant="ghost" onClick={() => setActiveTab('visuals')} className={activeTab === 'visuals' ? 'bg-crail-50 text-crail-600' : ''}>Visual Concepts</Button>
                 <Button variant="ghost" onClick={() => setActiveTab('applications')} className={activeTab === 'applications' ? 'bg-crail-50 text-crail-600' : ''}>Applications</Button>
            </div>
        </div>

        {/* CONTENT */}
        <div className="flex-grow overflow-y-auto pb-20">
            
            {/* TAB: STRATEGY */}
            {activeTab === 'brief' && (
                <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
                    <Card>
                        <h3 className="font-bold text-lg mb-4 text-slate-dark">Input Brief</h3>
                        <div className="space-y-4 text-sm">
                            <div><span className="font-bold block text-slate-500 text-xs uppercase">Values</span>{details.values}</div>
                            <div><span className="font-bold block text-slate-500 text-xs uppercase">Target Audience</span>{details.targetAudience}</div>
                            <div><span className="font-bold block text-slate-500 text-xs uppercase">Tone</span>{details.tone}</div>
                            <div><span className="font-bold block text-slate-500 text-xs uppercase">Visual Prefs</span>{details.visualPreferences}</div>
                        </div>
                    </Card>

                    <Card className="bg-slate-900 text-white border-none shadow-elevated relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-crail-500 rounded-full blur-[60px] opacity-20"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-serif text-xl font-bold text-crail-400">AI Brand Strategy</h3>
                                {!overview && (
                                    <Button size="sm" onClick={handleGenerateOverview} isLoading={isGenerating}>Generate Strategy</Button>
                                )}
                            </div>
                            
                            {overview ? (
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-xs font-bold text-crail-500 uppercase tracking-widest mb-1">Mission Statement</div>
                                        <p className="text-lg leading-relaxed font-serif italic">"{overview.missionStatement}"</p>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Positioning</div>
                                        <p className="text-sm text-slate-300">{overview.positioning}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Voice</div>
                                            <p className="text-sm text-slate-300">{overview.toneVoice}</p>
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Visual Direction</div>
                                            <p className="text-sm text-slate-300">{overview.visualDirection}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-white/10 flex justify-end">
                                         <button onClick={handleGenerateOverview} className="text-xs text-slate-500 hover:text-white transition-colors">Regenerate</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-40 flex items-center justify-center text-slate-500 text-sm italic">
                                    Click generate to analyze your brief...
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            )}

            {/* TAB: VISUALS */}
            {activeTab === 'visuals' && (
                <div className="space-y-8 animate-fadeIn">
                     {/* Toolbar */}
                     <div className="flex gap-4 mb-4">
                        <Button onClick={() => handleGenerateAsset('logo', 'Logo Concepts')} isLoading={isGenerating} disabled={!overview}>+ Generate Logo Sheet</Button>
                        <Button variant="secondary" onClick={() => handleGenerateAsset('palette', 'Brand Guidelines')} isLoading={isGenerating} disabled={!overview}>+ Generate Palette & Fonts</Button>
                        <Button variant="secondary" onClick={() => handleGenerateAsset('moodboard', 'Visual Moodboard')} isLoading={isGenerating} disabled={!overview}>+ Generate Moodboard</Button>
                     </div>

                     {!overview && <div className="p-4 bg-yellow-50 text-yellow-800 rounded border border-yellow-200 text-sm">Please generate the Strategy in the 'Strategy' tab first.</div>}

                     {/* Assets Grid */}
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {assets.filter(a => ['logo', 'palette', 'moodboard'].includes(a.type)).map(asset => (
                            <div key={asset.id} className="group bg-white rounded-xl shadow-card overflow-hidden border border-ivory-dark hover:shadow-elevated transition-shadow">
                                <div className="aspect-square relative cursor-pointer" onClick={() => setViewerImage({ src: asset.imageUrl, id: asset.id })}>
                                    <img src={asset.imageUrl} className="w-full h-full object-cover" alt={asset.title} />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-bold gap-2">
                                        <span>✏️ Edit / Refine</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-white">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase text-crail-500">{asset.type}</span>
                                        <span className="text-[10px] text-slate-400">{new Date(asset.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-dark">{asset.title}</h4>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            )}

             {/* TAB: APPLICATIONS */}
             {activeTab === 'applications' && (
                <div className="space-y-8 animate-fadeIn">
                     <div className="flex gap-4 mb-4">
                        <Button onClick={() => handleGenerateAsset('mockup', 'Real World Mockup')} isLoading={isGenerating} disabled={!overview}>+ Generate Mockup</Button>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {assets.filter(a => ['mockup', 'social'].includes(a.type)).map(asset => (
                            <div key={asset.id} className="group bg-white rounded-xl shadow-card overflow-hidden border border-ivory-dark">
                                <div className="aspect-video relative cursor-pointer" onClick={() => setViewerImage({ src: asset.imageUrl, id: asset.id })}>
                                    <img src={asset.imageUrl} className="w-full h-full object-cover" alt={asset.title} />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-bold">
                                        <span>✏️ Edit</span>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h4 className="font-bold text-sm text-slate-dark">{asset.title}</h4>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
             )}
        </div>
    </div>
  );
};