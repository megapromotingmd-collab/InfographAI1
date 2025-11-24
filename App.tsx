import React, { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { Select } from './components/Select';
import { Card } from './components/Card';
import { TextArea } from './components/Input';
import { HelpModal } from './components/HelpModal';
import { SetSettingsModal } from './components/SetSettingsModal';
import { CompletedSetsGallery } from './components/CompletedSetsGallery';
import { Sidebar } from './components/Sidebar';
import { ChildrenBookWizard } from './components/ChildrenBookWizard';
import { PitchDeckWizard } from './components/PitchDeckWizard';
import { BrandingWizard } from './components/Branding/BrandingWizard';
import { BrandingWorkspace } from './components/Branding/BrandingWorkspace';
import { LandingPage } from './components/LandingPage';
import { VisualGenerationPage } from './components/VisualGenerationPage';
import { StylesGalleryPage } from './components/StylesGalleryPage';
import { ExamplesPage } from './components/ExamplesPage';
import { HowItWorksPage } from './components/HowItWorksPage'; // NEW IMPORT
import { ImageViewer } from './components/ImageViewer/ImageViewer';
import { SketchBuilder } from './components/PitchDeck/SketchBuilder';
import { ProjectHub } from './modules/project-hub/ProjectHub';
import { BrandKitPage } from './modules/brand-kit/BrandKitPage';
import { BrandKitProject } from './modules/brand-kit/types';
import { generateInfographic, generateCharacterSheet, checkApiKey, promptForKeySelection } from './services/geminiService';
import { sendTelegramMessage, sendTelegramDocument } from './services/telegramService';
import { parseRawInputToQueue } from './services/promptParser';
import { GenerationConfig, GenerationStatus, AspectRatio, QueueItem, Language, VisualStyle, Complexity, SearchDepth, SheetStatus, CompletedSet, TextDensity, Project, BookDetails, PitchDetails, BrandDetails } from './types';
import { DEFAULT_CONFIG, FORMATS, LANGUAGES, STYLES, COMPLEXITIES, SEARCH_DEPTHS, TEXT_DENSITIES } from './constants';

const STRICT_DELAY_MS = 15000; // Default buffer
const MAX_RETRIES = 5; // Increased for reliability

// Web Worker for Background-Safe Timer
const WORKER_CODE = `
self.onmessage = function(e) {
    const { ms } = e.data;
    const targetTime = Date.now() + ms;
    self.postMessage({ remaining: Math.ceil(ms / 1000) });
    const interval = setInterval(() => {
        const now = Date.now();
        const remainingMs = targetTime - now;
        const remainingSec = Math.ceil(remainingMs / 1000);
        if (remainingSec <= 0) {
            clearInterval(interval);
            self.postMessage({ done: true });
        } else {
            self.postMessage({ remaining: remainingSec });
        }
    }, 1000);
};
`;

// Log Interface
interface LogEntry {
    id: string;
    timestamp: Date;
    message: string;
    type: 'info' | 'success' | 'error' | 'telegram' | 'warning';
    projectId: string;
}

const App: React.FC = () => {
  // --- VIEW STATE ---
  const [view, setView] = useState<'landing' | 'workspace' | 'gallery' | 'examples' | 'how-it-works' | 'project-hub' | 'brand-kit'>('landing');
  const [landingLanguage, setLandingLanguage] = useState<'RO' | 'EN' | 'RU'>('RO');

  // --- PROJECT STATE ---
  const [projects, setProjects] = useState<Project[]>([
      { id: 'default', name: 'General Workspace', icon: '📂', createdAt: Date.now(), config: { ...DEFAULT_CONFIG, topic: '' } }
  ]);
  const [activeProjectId, setActiveProjectId] = useState<string>('default');
  
  // --- GLOBAL STATE (Filtered by Active Project ID in UI) ---
  const [config, setConfig] = useState<GenerationConfig>({ ...DEFAULT_CONFIG, topic: '' });
  const [setConfigs, setSetConfigs] = useState<Record<string, GenerationConfig>>({});
  const [batchInput, setBatchInput] = useState<string>('');
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [hasKey, setHasKey] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  // Project Inputs Map (to persist text between switches)
  const [projectInputs, setProjectInputs] = useState<Record<string, string>>({});
  const [brandKits, setBrandKits] = useState<BrandKitProject[]>([]);
  const [lastViewBeforeBrand, setLastViewBeforeBrand] = useState<'landing' | 'workspace' | 'gallery' | 'examples' | 'how-it-works' | 'project-hub'>('workspace');

  // Modals
  const [showHelp, setShowHelp] = useState(false);
  const [showBookWizard, setShowBookWizard] = useState(false);
  const [showPitchWizard, setShowPitchWizard] = useState(false);
  const [showBrandWizard, setShowBrandWizard] = useState(false);
  const [showSketchBuilder, setShowSketchBuilder] = useState(false);
  const [editingSet, setEditingSet] = useState<string | null>(null);
  const [viewingSet, setViewingSet] = useState<CompletedSet | null>(null);

  // --- NEW: IMAGE VIEWER STATE ---
  const [viewerImage, setViewerImage] = useState<{ src: string, id: string, context: string } | null>(null);

  // Logic State
  const [nextItemCountdown, setNextItemCountdown] = useState<number | null>(null);
  
  // 1.5 Sheet State
  const [sheetStatus, setSheetStatus] = useState<SheetStatus>({ status: 'pending', attempt: 0 });
  const [sheetRefinement, setSheetRefinement] = useState<string>("");
  
  // Completed Sets Data
  const [completedSets, setCompletedSets] = useState<CompletedSet[]>([]);
  
  // UI State for Collapsible Sets & Tabs
  const [collapsedSets, setCollapsedSets] = useState<Record<string, boolean>>({});
  const [pausedSets, setPausedSets] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'workspace' | 'assets'>('workspace');

  // Refs
  const isProcessingRef = useRef(false);
  const isPausedRef = useRef(false); // Global pause
  const pausedSetsRef = useRef<Set<string>>(new Set()); // Per-set pause
  const configRef = useRef<GenerationConfig>(config);
  const setConfigsRef = useRef<Record<string, GenerationConfig>>({});
  const workerRef = useRef<Worker | null>(null);
  const forceSheetRegenRef = useRef(false);
  const sheetRefinementRef = useRef("");
  const logsEndRef = useRef<HTMLDivElement>(null);
  const skipWaitRef = useRef<() => void>(() => {});
  
  // Track previous project to detect actual switches vs updates
  const prevProjectIdRef = useRef(activeProjectId);

  // Sync refs
  useEffect(() => { configRef.current = config; }, [config]);
  useEffect(() => { setConfigsRef.current = setConfigs; }, [setConfigs]);
  useEffect(() => { sheetRefinementRef.current = sheetRefinement; }, [sheetRefinement]);
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  // 1. Load Config & Input when Switching Projects
  useEffect(() => {
      if (activeProjectId !== prevProjectIdRef.current) {
          const activeProject = projects.find(p => p.id === activeProjectId);
          if (activeProject) {
              // Update UI Config
              setConfig(activeProject.config);
              // Update Input Text from Cache
              setBatchInput(projectInputs[activeProjectId] || '');
          }
          prevProjectIdRef.current = activeProjectId;
      }
  }, [activeProjectId, projects, projectInputs]);

  // 2. Save Config Changes to Project Store
  useEffect(() => {
      setProjects(prev => prev.map(p => p.id === activeProjectId ? { ...p, config } : p));
  }, [config, activeProjectId]); // Include activeProjectId to ensure we save to correct one

  // 3. Save Input Text to Project Cache
  useEffect(() => {
      setProjectInputs(prev => ({...prev, [activeProjectId]: batchInput}));
  }, [batchInput, activeProjectId]);

  useEffect(() => {
    const initKey = async () => {
        const valid = await checkApiKey();
        setHasKey(valid);
    };
    initKey();
    return () => { if (workerRef.current) workerRef.current.terminate(); };
  }, []);

  // Helper: Add Log
  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
      setLogs(prev => [...prev, {
          id: Math.random().toString(36).substr(2,9),
          timestamp: new Date(),
          message,
          type,
          projectId: activeProjectId
      }]);
  };

  // Helper: Parse Error & Calculate Backoff
  const getErrorDetails = (e: any) => {
      let msg = e.message || String(e);
      try {
          if (msg.trim().startsWith('{')) {
              const parsed = JSON.parse(msg);
              if (parsed.error) {
                  msg = `${parsed.error.code || ''} ${parsed.error.message || JSON.stringify(parsed.error)}`;
              }
          }
      } catch {}
      return msg;
  };

  const getBackoffDuration = (errorMsg: string, attempt: number) => {
      const isOverloaded = errorMsg.includes("503") || errorMsg.includes("overloaded") || errorMsg.includes("UNAVAILABLE");
      const isInternalError = errorMsg.includes("500") || errorMsg.includes("Internal Server Error");
      
      if (isOverloaded) return 30000 + (attempt * 20000);
      if (isInternalError) return 20000 + (attempt * 10000);
      return 10000 + (attempt * 5000);
  };

  // --- Project Handlers ---
  const handleAddProject = () => {
      const newProj: Project = {
          id: `proj-${Date.now()}`,
          name: `Project ${projects.length + 1}`,
          icon: '📁',
          createdAt: Date.now(),
          config: { ...DEFAULT_CONFIG, topic: '' },
          moduleType: 'infographic'
      };
      setProjects(prev => [...prev, newProj]);
      setActiveProjectId(newProj.id);
  };

  const handleCreateTypedProject = (payload: { name: string; icon: string; template: any; notes?: string }) => {
      const moduleMap: Record<string, Project['moduleType']> = {
        pitch: 'pitch',
        prezentare: 'pitch',
        poze: 'infographic',
        storybook: 'book',
        branding: 'branding',
        custom: 'infographic'
      };
      const moduleType = moduleMap[payload.template] || 'infographic';
      const newProj: Project = {
          id: `proj-${Date.now()}`,
          name: payload.name || `Project ${projects.length + 1}`,
          icon: payload.icon || '📁',
          createdAt: Date.now(),
          config: { ...DEFAULT_CONFIG, topic: payload.notes || '' },
          moduleType
      };
      setProjects(prev => [...prev, newProj]);
      setActiveProjectId(newProj.id);
      addLog(`Creat proiect ${payload.name} (${moduleType})`, 'info');
  };

  const handleRenameProject = (id: string, newName: string) => {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, name: newName } : p));
      addLog(`Project renamed to: ${newName}`, 'info');
  };

  const handleSelectProject = (id: string) => {
      setActiveProjectId(id);
  };

  // --- WIZARD HANDLERS ---
  const handleCreateBook = (details: BookDetails, config: GenerationConfig, refImage?: string) => {
      const newId = `book-${Date.now()}`;
      // STRICT ISOLATION: Config passed here is unique to this project
      const newProj: Project = {
          id: newId,
          name: `Book: ${details.childName}`,
          icon: '📚',
          createdAt: Date.now(),
          config: config, // This config contains the specific uploaded reference
          moduleType: 'book',
          bookDetails: details
      };
      setProjects(prev => [...prev, newProj]);
      setActiveProjectId(newId);
      addLog(`Created Book Project: ${details.childName}`, 'success');
  };

  const handleCreatePitch = (details: PitchDetails, config: GenerationConfig, logoImage?: string) => {
    const newId = `pitch-${Date.now()}`;
    const newProj: Project = {
        id: newId,
        name: `Pitch: ${details.companyName}`,
        icon: '📊',
        createdAt: Date.now(),
        config: config, 
        moduleType: 'pitch',
        pitchDetails: details
    };
    setProjects(prev => [...prev, newProj]);
    setActiveProjectId(newId);
    addLog(`Created Pitch Deck: ${details.companyName}`, 'success');
  };

  const handleCreateBrand = (details: BrandDetails) => {
      const newId = `brand-${Date.now()}`;
      const newProj: Project = {
          id: newId,
          name: `Brand: ${details.name}`,
          icon: '🎨',
          createdAt: Date.now(),
          config: { ...DEFAULT_CONFIG, topic: '' }, // Default config, branded stuff handled in BrandingWorkspace
          moduleType: 'branding',
          brandDetails: details
      };
      setProjects(prev => [...prev, newProj]);
      setActiveProjectId(newId);
      addLog(`Created Brand Kit: ${details.name}`, 'success');
  };

  const handleUpdateProject = (updated: Project) => {
      setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };


  // --- Handlers ---

  const handleSetSettingsSave = (setName: string, newConfig: GenerationConfig) => {
      setSetConfigs(prev => ({...prev, [setName]: newConfig}));
      addLog(`Settings updated for set: ${setName}`, 'info');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setConfig(prev => ({ ...prev, uploadedReference: base64 }));
        if (status === 'idle') {
            setSheetStatus({ status: 'pending', attempt: 0, url: undefined });
        }
        addLog("Reference image uploaded successfully", 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetKey = async () => {
    if (window.confirm("Change or select a new API Key?")) {
        try {
            await promptForKeySelection();
            setHasKey(true);
            addLog("API Key reset requested", 'info');
        } catch (e) {
            console.error("Key selection failed", e);
        }
    }
  };

  const handleStartBatch = async () => {
    if (!batchInput.trim()) return;
    
    const newQueue = parseRawInputToQueue(batchInput).map(item => ({
        ...item,
        projectId: activeProjectId
    })) as QueueItem[];

    if (newQueue.length === 0) {
        alert("Could not parse any scenes. Please check format.");
        return;
    }
    
    executeBatch(newQueue);
  };

  const handleSketchSubmit = (sketchItems: Omit<QueueItem, 'projectId'>[]) => {
      const newQueue = sketchItems.map(item => ({
          ...item,
          projectId: activeProjectId
      })) as QueueItem[];
      
      executeBatch(newQueue);
      addLog(`Added ${newQueue.length} sketches to production queue`, 'info');
  };

  const executeBatch = async (newQueue: QueueItem[]) => {
    if (!hasKey) {
        try { await promptForKeySelection(); setHasKey(true); } 
        catch (e) { alert("API Key selection failed."); return; }
    }

    // Append to existing queue logic
    setQueue(prev => [...prev, ...newQueue]);

    if (status !== 'batch_running') {
        setStatus('batch_running');
        setSheetStatus({ status: 'pending', attempt: 0, url: undefined });
        setSheetRefinement("");
        isProcessingRef.current = true;
        isPausedRef.current = false;
        forceSheetRegenRef.current = false;
        
        // Initialize collapsible state as open for new sets
        const newSets: Record<string, boolean> = {};
        newQueue.forEach(q => newSets[q.setName] = false); // False = Expanded (Open)
        setCollapsedSets(prev => ({...prev, ...newSets}));

        processQueue([...queue, ...newQueue]);
    }
    setBatchInput(''); 
    addLog(`Batch Started: ${newQueue.length} items`, 'info');
  }

  const handlePauseGlobal = () => {
    isPausedRef.current = true;
    setStatus('paused');
    addLog("Batch PAUSED by user", 'info');
  };

  const handleResumeGlobal = () => {
    isPausedRef.current = false;
    setStatus('batch_running');
    addLog("Batch RESUMED", 'info');
  };

  const handleToggleSetPause = (setName: string) => {
      const isPaused = pausedSets[setName];
      setPausedSets(prev => ({...prev, [setName]: !isPaused}));
      
      if (isPaused) {
          pausedSetsRef.current.delete(setName);
          addLog(`Resumed Set: ${setName}`, 'info');
      } else {
          pausedSetsRef.current.add(setName);
          addLog(`Paused Set: ${setName}`, 'info');
      }
  };

  const handleToggleCollapse = (setName: string) => {
      setCollapsedSets(prev => ({...prev, [setName]: !prev[setName]}));
  };

  const handleSkipWait = () => {
    if (skipWaitRef.current) {
        addLog("User skipped cooldown timer", 'info');
        skipWaitRef.current();
    }
  };

  const handleRegenerateSheet = () => {
    if (window.confirm("Regenerate Sheet 1.5 with current refinement?")) {
        setSheetStatus({ status: 'pending', attempt: 0, url: undefined });
        forceSheetRegenRef.current = true;
        addLog("Manual Sheet Regeneration Requested...", 'info');
    }
  };

  const checkPause = async () => {
    while (isPausedRef.current && isProcessingRef.current) {
        setNextItemCountdown(null);
        await new Promise(r => setTimeout(r, 500));
    }
  };

  // Check granular set pause
  const checkSetPause = async (setName: string) => {
      while (pausedSetsRef.current.has(setName) && isProcessingRef.current) {
          await new Promise(r => setTimeout(r, 1000));
      }
  };

  const waitWithCountdown = async (ms: number, message: string) => {
      addLog(`${message} (${Math.ceil(ms/1000)}s)`, 'info');
      return new Promise<void>((resolve, reject) => {
          if (!isProcessingRef.current) { reject(new Error("Stopped by user")); return; }
          
          const blob = new Blob([WORKER_CODE], { type: 'application/javascript' });
          const blobUrl = URL.createObjectURL(blob);
          const worker = new Worker(blobUrl);
          workerRef.current = worker;

          const cleanup = () => {
               worker.terminate();
               URL.revokeObjectURL(blobUrl);
          };

          // Skip handler
          skipWaitRef.current = () => {
              cleanup();
              setNextItemCountdown(null);
              resolve();
          };

          worker.onmessage = async (e) => {
              const { remaining, done } = e.data;
              if (!isProcessingRef.current) {
                  cleanup();
                  reject(new Error("Stopped by user")); return;
              }
              if (isPausedRef.current) return;
              
              if (done) {
                  setNextItemCountdown(null);
                  cleanup();
                  resolve();
              } else {
                  setNextItemCountdown(remaining);
              }
          };
          
          worker.postMessage({ ms });
      });
  };

  // --- CORE PROCESSING LOOP ---

  const processQueue = async (initialQueue: QueueItem[]) => {
    const pendingItems = initialQueue.filter(i => i.status === 'pending' || i.status === 'retry');
    
    let currentSet = "";
    let currentSheetUrl: string | undefined = undefined;
    let setFailed = false;
    let currentSetItems: QueueItem[] = [];
    
    let lastUploadedReference: string | undefined = undefined;
    let lastSheetUrl: string | undefined = undefined;
    let activeSetConfig: GenerationConfig | null = null;

    const finalizeSet = async (name: string, items: QueueItem[], sheet?: string, pId?: string) => {
        const setObj: CompletedSet = {
            id: `set-${Date.now()}`,
            projectId: pId || activeProjectId,
            name, sheetUrl: sheet, items: [...items], timestamp: Date.now()
        };
        setCompletedSets(prev => [setObj, ...prev]);
        
        // Auto-Collapse logic (Requested behavior)
        setCollapsedSets(prev => ({ ...prev, [name]: true }));
        
        addLog(`Set "${name}" finalized & saved`, 'success');
        await sendTelegramMessage(`📊 SET COMPLETED: ${name}`).catch(() => addLog("Telegram Set Confirm Failed", 'error'));
    };

    for (let i = 0; i < pendingItems.length; i++) {
      if (!isProcessingRef.current) break;
      await checkPause();
      
      const item = pendingItems[i];
      await checkSetPause(item.setName); // Granular Pause Check

      // --- NEW SET BOUNDARY ---
      if (item.setName !== currentSet) {
          if (currentSet) await finalizeSet(currentSet, currentSetItems, currentSheetUrl, item.projectId);

          currentSet = item.setName;
          currentSetItems = [];
          setFailed = false;
          setSheetRefinement("");

          // Contextual Config Lookup (Safe Project Switching)
          const proj = projects.find(p => p.id === item.projectId);
          if (!proj) {
              addLog(`Project data missing for item ${item.id}. Skipping.`, 'error');
              setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'error', error: 'Project not found' } : q));
              continue;
          }
          
          const baseConfig = proj.config; 

          const setOverride = setConfigsRef.current[currentSet];
          activeSetConfig = setOverride ? { ...setOverride } : { ...baseConfig };
          
          if (!activeSetConfig.uploadedReference && baseConfig.uploadedReference) {
              activeSetConfig.uploadedReference = baseConfig.uploadedReference;
          }

          // Determine Logic Mode (Character vs Brand)
          const isPitch = proj.moduleType === 'pitch';

          let reusedSheet = false;
          if (activeSetConfig.uploadedReference && activeSetConfig.uploadedReference === lastUploadedReference && lastSheetUrl) {
                currentSheetUrl = lastSheetUrl;
                reusedSheet = true;
                setSheetStatus({ status: 'success', attempt: 1, url: currentSheetUrl });
                addLog(`Reusing Cached DNA for Set: ${currentSet}`, 'success');
          } else {
                currentSheetUrl = undefined;
                setSheetStatus({ status: 'pending', attempt: 0, url: undefined });
          }

          await sendTelegramMessage(`🎬 STARTING SET: ${currentSet}`).catch(() => addLog("Telegram Start Msg Failed", 'telegram'));

          // --- UPLOAD PATH (PHASE 1.5) ---
          if (activeSetConfig.uploadedReference && !reusedSheet) {
              setSheetStatus({ status: 'generating', attempt: 1 });
              addLog(`Generating ${isPitch ? 'Brand' : 'Style'} DNA (1.5) from upload...`, 'info');
              
              let sheetSuccess = false;
              let attempts = 0;

              while (attempts < MAX_RETRIES && !sheetSuccess && isProcessingRef.current) {
                  attempts++;
                  setSheetStatus(prev => ({ ...prev, attempt: attempts, status: 'generating' }));
                  try {
                      if (!isProcessingRef.current) break; // Check immediately
                      await checkPause();
                      await checkSetPause(item.setName); // Re-check inside loop
                      
                      const sheet = await generateCharacterSheet(
                          activeSetConfig.uploadedReference!, 
                          activeSetConfig.style,
                          sheetRefinementRef.current,
                          isPitch ? 'brand' : 'character' // Pass mode safely
                      );
                      
                      currentSheetUrl = sheet;
                      sheetSuccess = true;
                      setSheetStatus({ status: 'success', attempt: attempts, url: sheet });
                      lastUploadedReference = activeSetConfig.uploadedReference;
                      lastSheetUrl = sheet;
                      
                      addLog(`DNA Sheet Generated Successfully`, 'success');
                      await sendTelegramDocument(sheet, `REF_SHEET.png`, `🔐 DNA LOCKED: ${currentSet}`).catch(() => addLog("Telegram Sheet Upload Failed", 'telegram'));
                      await waitWithCountdown(STRICT_DELAY_MS, "Cooldown after DNA Extraction");
                  } catch (e: any) {
                      if (!isProcessingRef.current) break; // IMMEDIATE EXIT IF STOPPED
                      const errMsg = getErrorDetails(e);
                      addLog(`Sheet Gen Failed (Attempt ${attempts}): ${errMsg}`, 'error');
                      
                      if (errMsg.includes("403") || errMsg.includes("Permission")) {
                           setHasKey(false); setFailed = true; break;
                      }
                      
                      const delay = getBackoffDuration(errMsg, attempts);
                      if (delay > 15000) addLog(`⚠️ High Load Detected. Backing off for ${delay/1000}s...`, 'warning');
                      await waitWithCountdown(delay, "Retry Delay");
                  }
              }
              if (!sheetSuccess) {
                  setFailed = true;
                  setSheetStatus({ status: 'error', attempt: attempts });
                  addLog(`CRITICAL: Sheet generation failed. Set Aborted.`, 'error');
              }
          }
      }

      const execConfig = activeSetConfig || configRef.current;
      
      // Inject Sketch Reference if present on item
      if (item.sketchReference) {
          execConfig.sketchReference = item.sketchReference;
      } else {
          execConfig.sketchReference = undefined;
      }
      
      currentSetItems.push(item);

      // Safe fallback project lookup inside loop
      const currentProj = projects.find(p => p.id === item.projectId);
      const isPitch = currentProj?.moduleType === 'pitch';

      if (setFailed) {
          setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'aborted', error: 'Set Aborted' } : q));
          continue;
      }

      if (forceSheetRegenRef.current) {
          currentSheetUrl = undefined;
          forceSheetRegenRef.current = false;
          addLog("Forced Sheet Regeneration triggered", 'info');
      }

      // --- SLIDE GENERATION ---
      let slideSuccess = false;
      let attempts = 0;
      const isFirstSlideOfSet = item.slideNumber === "1" || item.slideNumber === "Scene 1" || currentSetItems.length === 1;

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'processing' } : q));

      while (attempts < MAX_RETRIES && !slideSuccess && isProcessingRef.current && !setFailed) {
          attempts++;
          if (attempts > 1) setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'retry', attemptCount: attempts } : q));

          try {
             if (!isProcessingRef.current) break; // Check immediately
             await checkPause();
             await checkSetPause(item.setName);
             addLog(`Generating Slide ${item.slideNumber}: ${item.shortTopic}`, 'info');
             const tStart = Date.now();
             
             // Pass Config (which might contain sketchReference) AND the global sheet anchor
             const base64 = await generateInfographic(
                 { ...execConfig, topic: item.fullPrompt },
                 currentSheetUrl
             );
             
             slideSuccess = true;
             setQueue(prev => prev.map(q => q.id === item.id ? { 
                ...q, status: 'success', imageUrl: base64, referenceImageUsed: currentSheetUrl, durationMs: Date.now() - tStart
             } : q));

             const finalItemState = { ...item, status: 'success' as const, imageUrl: base64, referenceImageUsed: currentSheetUrl };
             currentSetItems = currentSetItems.map(it => it.id === item.id ? finalItemState : it);
             
             addLog(`Slide Generated. Sending to Telegram...`, 'info');
             await sendTelegramDocument(base64, `img.png`, `✅ ${item.setName} - ${item.shortTopic}`).catch(() => addLog("Telegram Slide Upload Failed", 'telegram'));

             // --- CREATIVE PATH: GENERATE 1.5 FROM SLIDE 1 ---
             // Only if we don't have a sketch, because a sketch usually implies a strict layout structure already.
             if (isFirstSlideOfSet && !currentSheetUrl && !execConfig.uploadedReference && !item.sketchReference) {
                 addLog("First slide created. Analyzing for DNA Extraction (Slide 1 -> 1.5)...", 'info');
                 await waitWithCountdown(5000, "Analyzing Slide 1"); 
                 
                 setSheetStatus({ status: 'generating', attempt: 1 });
                 let sheetAttempts = 0;
                 let sheetCreated = false;
                 
                 while (sheetAttempts < MAX_RETRIES && !sheetCreated && isProcessingRef.current) {
                     sheetAttempts++;
                     setSheetStatus(prev => ({...prev, attempt: sheetAttempts}));
                     try {
                        if (!isProcessingRef.current) break; // Check immediately
                        const sheet = await generateCharacterSheet(
                            base64, 
                            execConfig.style, 
                            sheetRefinementRef.current,
                            isPitch ? 'brand' : 'character' // Pass mode
                        );
                        currentSheetUrl = sheet;
                        sheetCreated = true;
                        setSheetStatus({ status: 'success', attempt: sheetAttempts, url: sheet });
                        
                        addLog(`${isPitch ? 'Brand' : 'Style'} DNA Extracted Successfully (1.5)`, 'success');
                        await sendTelegramDocument(sheet, `SHEET.png`, `📋 STYLE DNA EXTRACTED: ${currentSet}`).catch(() => addLog("Telegram Sheet Upload Failed", 'telegram'));
                        await waitWithCountdown(STRICT_DELAY_MS, "Cooldown after DNA Extraction");
                     } catch (e: any) {
                         if (!isProcessingRef.current) break; // IMMEDIATE EXIT IF STOPPED
                         const errMsg = getErrorDetails(e);
                         addLog(`DNA Extraction Failed (Attempt ${sheetAttempts}): ${errMsg}`, 'error');
                         const delay = getBackoffDuration(errMsg, sheetAttempts);
                         if (delay > 15000) addLog(`⚠️ High Load. Backing off for ${delay/1000}s`, 'warning');
                         await waitWithCountdown(delay, "Retry Delay");
                     }
                 }
                 if (!sheetCreated) {
                     setFailed = true;
                     setSheetStatus({ status: 'error', attempt: sheetAttempts });
                 }
             } else {
                 await waitWithCountdown(STRICT_DELAY_MS, "Cooldown between slides");
             }
          } catch (e: any) {
              if (!isProcessingRef.current) break; // IMMEDIATE EXIT IF STOPPED
              const errMsg = getErrorDetails(e);
              addLog(`Slide Generation Error: ${errMsg}`, 'error');
              
              if (errMsg.includes("Stopped by user")) break;
              
              const delay = getBackoffDuration(errMsg, attempts);
              if (delay > 15000) addLog(`⚠️ Model Overloaded/Error. Extended cooldown: ${delay/1000}s`, 'warning');
              
              await waitWithCountdown(delay, `Retry Delay (Attempt ${attempts})`);
              
              if (attempts >= MAX_RETRIES) {
                  setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'error', error: errMsg } : q));
                  setFailed = true;
              }
          }
      }
    }

    if (currentSet && isProcessingRef.current && !setFailed) await finalizeSet(currentSet, currentSetItems, currentSheetUrl, activeProjectId);

    if (isProcessingRef.current) {
        setStatus('batch_complete');
        isProcessingRef.current = false;
        isPausedRef.current = false;
        setNextItemCountdown(null);
        addLog("Batch Processing Complete.", 'success');
    }
  };

  const handleAbortAndClear = () => {
      if (window.confirm("Stop and Clear Queue?")) {
          // 1. HARD STOP FLAG
          isProcessingRef.current = false;
          
          // 2. KILL WORKER IMMEDIATELY
          if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
          }
          
          // 3. FORCE STATE UPDATES
          setStatus('idle'); 
          setNextItemCountdown(null);
          
          // 4. CLEAR QUEUE (ONLY ACTIVE PROJECT)
          setQueue(prev => prev.filter(q => q.projectId !== activeProjectId));
          setLogs(prev => prev.filter(l => l.projectId !== activeProjectId));
          setSheetStatus({ status: 'pending', attempt: 0 });
          
          addLog("⛔ STOPPED by User. Queue Cleared.", 'error');
      }
  };

  const handleClearQueue = () => {
    if (status === 'batch_running') return;
    setQueue(prev => prev.filter(q => q.projectId !== activeProjectId));
    setStatus('idle');
    setLogs(prev => prev.filter(l => l.projectId !== activeProjectId));
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a'); link.href = url; link.download = name;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  // --- NEW: HANDLE IMAGE EDIT SAVE ---
  const handleSaveEditedImage = (newImage: string) => {
      if (!viewerImage) return;

      // Update Queue State
      setQueue(prev => prev.map(q => q.id === viewerImage.id ? { ...q, imageUrl: newImage } : q));
      
      // Update Completed Sets if it exists there
      setCompletedSets(prev => prev.map(set => ({
          ...set,
          items: set.items.map(item => item.id === viewerImage.id ? { ...item, imageUrl: newImage } : item)
      })));

      addLog("Image updated successfully via Universal Editor.", 'success');
  };

  // Filter Data for View
  const projectQueue = queue.filter(q => q.projectId === activeProjectId);
  const projectCompletedSets = completedSets.filter(s => s.projectId === activeProjectId);
  const projectLogs = logs.filter(l => l.projectId === activeProjectId);

  // Group queue by set
  const queueBySet: Record<string, QueueItem[]> = {};
  projectQueue.forEach(item => { if (!queueBySet[item.setName]) queueBySet[item.setName] = []; queueBySet[item.setName].push(item); });

  // Assets Calculation
  const projectAssets = [
      ...(config.uploadedReference ? [{ type: 'User Reference', url: config.uploadedReference, date: Date.now() }] : []),
      ...projectCompletedSets.filter(s => s.sheetUrl).map(s => ({ type: `Sheet: ${s.name}`, url: s.sheetUrl!, date: s.timestamp }))
  ];

  const activeProject = projects.find(p => p.id === activeProjectId);

  // --- RENDER ---
  
  if (view === 'landing') {
      return (
        <LandingPage 
            language={landingLanguage}
            setLanguage={setLandingLanguage}
            onEnterApp={() => setView('workspace')} 
            onGoToStyles={() => setView('gallery')}
            onGoToExamples={() => setView('examples')}
            onGoToHowItWorks={() => setView('how-it-works')} // Pass new navigation
        />
      );
  }

  if (view === 'how-it-works') {
      return <HowItWorksPage onBack={() => setView('landing')} onEnterApp={() => setView('workspace')} />;
  }

  if (view === 'gallery') {
      return <StylesGalleryPage onBack={() => setView('landing')} />;
  }

  if (view === 'examples') {
      return <ExamplesPage onBack={() => setView('landing')} />;
  }

  if (view === 'project-hub') {
      return (
        <ProjectHub 
          projects={projects} 
          onClose={() => setView('workspace')} 
          onOpenBrandKit={() => { setLastViewBeforeBrand('project-hub'); setView('brand-kit'); }} 
          onSelectProject={(id) => { setActiveProjectId(id); setView('workspace'); }} 
          onCreateProject={handleCreateTypedProject}
        />
      );
  }

  if (view === 'brand-kit') {
      return (
        <BrandKitPage 
          brandKits={brandKits} 
          onSaveBrandKits={setBrandKits} 
          onClose={() => setView(lastViewBeforeBrand)} 
        />
      );
  }

  return (
    <div className="flex h-screen bg-pampas overflow-hidden">
        <div className="fixed top-6 right-6 z-40 flex gap-2">
            <Button variant="secondary" onClick={() => setView('project-hub')} className="shadow-lg">Project Hub</Button>
            <Button onClick={() => { setLastViewBeforeBrand(view === 'project-hub' ? 'project-hub' : 'workspace'); setView('brand-kit'); }} className="shadow-lg">Brand Kit</Button>
        </div>
        {/* SIDEBAR */}
        <Sidebar 
            projects={projects} 
            activeProjectId={activeProjectId} 
            onSelectProject={handleSelectProject} 
            onAddProject={handleAddProject} 
            onRenameProject={handleRenameProject}
            onOpenBookWizard={() => setShowBookWizard(true)}
            onOpenPitchWizard={() => setShowPitchWizard(true)}
            onOpenBrandWizard={() => setShowBrandWizard(true)}
        />

        {/* UNIVERSAL EDITOR COMPONENT */}
        <ImageViewer 
            isOpen={!!viewerImage}
            imageSrc={viewerImage?.src || null}
            onClose={() => setViewerImage(null)}
            onSave={handleSaveEditedImage}
            styleContext={viewerImage?.context}
        />

        {/* SKETCH BUILDER COMPONENT */}
        <SketchBuilder
            isOpen={showSketchBuilder}
            onClose={() => setShowSketchBuilder(false)}
            onSubmit={handleSketchSubmit}
        />

        {/* MAIN CONTENT WRAPPER */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto relative">
            <Layout onOpenHelp={() => setShowHelp(true)} onResetKey={handleResetKey}>
                <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
                <ChildrenBookWizard isOpen={showBookWizard} onClose={() => setShowBookWizard(false)} onSubmit={handleCreateBook} />
                <PitchDeckWizard isOpen={showPitchWizard} onClose={() => setShowPitchWizard(false)} onSubmit={handleCreatePitch} />
                <BrandingWizard isOpen={showBrandWizard} onClose={() => setShowBrandWizard(false)} onSubmit={handleCreateBrand} />
                
                {editingSet && (
                    <SetSettingsModal isOpen={true} onClose={() => setEditingSet(null)} setName={editingSet} currentConfig={setConfigs[editingSet] || config} onSave={handleSetSettingsSave} />
                )}
                <CompletedSetsGallery isOpen={!!viewingSet} onClose={() => setViewingSet(null)} set={viewingSet} />

                {/* BRANDING WORKSPACE OVERRIDE */}
                {activeProject?.moduleType === 'branding' ? (
                     <BrandingWorkspace project={activeProject} onUpdateProject={handleUpdateProject} />
                ) : (
                    // --- EXISTING WORKSPACE FOR STORYBOARD / BOOK / PITCH ---
                    <>
                        {/* TAB NAVIGATION FOR PROJECT */}
                        <div className="mb-6 border-b border-ivory-dark flex gap-6 items-center">
                            <button 
                                onClick={() => setActiveTab('workspace')} 
                                className={`pb-3 font-serif text-lg font-semibold transition-colors ${activeTab === 'workspace' ? 'text-crail-500 border-b-2 border-crail-500' : 'text-slate-400 hover:text-slate-dark'}`}
                            >
                                Workspace
                            </button>
                            <button 
                                onClick={() => setActiveTab('assets')} 
                                className={`pb-3 font-serif text-lg font-semibold transition-colors ${activeTab === 'assets' ? 'text-crail-500 border-b-2 border-crail-500' : 'text-slate-400 hover:text-slate-dark'}`}
                            >
                                Project Assets
                            </button>
                            
                            {/* Sketch Builder Toggle (Only for Pitch Deck) */}
                            {activeProject?.moduleType === 'pitch' && (
                                <button 
                                    onClick={() => setShowSketchBuilder(true)}
                                    className="ml-4 pb-3 font-serif text-sm font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-2 animate-fadeIn"
                                >
                                    <span className="text-lg">✏️</span> Open Sketch Builder
                                </button>
                            )}

                            <div className="ml-auto flex items-center gap-2 text-slate-500 text-xs">
                                <span className="uppercase tracking-wider font-bold">{activeProject?.name}</span>
                                {activeProject?.moduleType === 'book' && <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-[10px] font-bold">BOOK</span>}
                                {activeProject?.moduleType === 'pitch' && <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">PITCH</span>}
                            </div>
                        </div>

                        {activeTab === 'assets' ? (
                            <div className="grid grid-cols-4 gap-6 animate-fadeIn">
                                {projectAssets.length === 0 && <p className="text-slate-400 italic col-span-4">No assets in this project yet.</p>}
                                {projectAssets.map((asset, i) => (
                                    <Card key={i} className="p-3">
                                        <div className="aspect-square rounded bg-slate-100 mb-2 overflow-hidden cursor-pointer" onClick={() => setViewerImage({ src: asset.url, id: `asset-${i}`, context: config.style })}>
                                            <img src={asset.url} className="w-full h-full object-cover" alt="Asset" />
                                        </div>
                                        <p className="text-xs font-bold truncate">{asset.type}</p>
                                        <p className="text-[10px] text-slate-400">{new Date(asset.date).toLocaleString()}</p>
                                        <button onClick={() => handleDownload(asset.url, `asset_${i}.png`)} className="mt-2 text-xs text-crail-500 hover:underline w-full text-left">Download</button>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col lg:flex-row gap-8 w-full min-h-full">
                                
                                {/* LEFT COLUMN */}
                                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                                    <div>
                                        <h2 className="text-3xl font-serif font-semibold text-slate-dark">
                                            {activeProject?.moduleType === 'book' ? 'Storybook Editor' : activeProject?.moduleType === 'pitch' ? 'Pitch Deck Studio' : 'Consistent Storyboarder'}
                                        </h2>
                                        <p className="text-slate-medium text-sm">Zero Tolerance • High Consistency</p>
                                    </div>

                                    <Card elevated className="bg-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <h3 className="font-serif text-lg font-semibold">Project Settings</h3>
                                                <p className="text-xs text-slate-400">For: <span className="font-bold text-slate-600">{activeProject?.name}</span></p>
                                            </div>
                                            <span className="text-xs bg-crail-50 text-crail-600 px-2 py-1 rounded border border-crail-200 font-bold">MODEL: Nano Banana 2 Pro</span>
                                        </div>
                                        <div className="space-y-4">
                                            <Select label="Limbă" options={LANGUAGES} value={config.language} onChange={(e) => setConfig({...config, language: e.target.value as Language})} disabled={status !== 'idle'} />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Select label="Stil Vizual" options={STYLES} value={config.style} onChange={(e) => setConfig({...config, style: e.target.value as VisualStyle})} disabled={status !== 'idle'} />
                                                <Select label="Format" options={FORMATS} value={config.format} onChange={(e) => setConfig({...config, format: e.target.value as AspectRatio})} disabled={status !== 'idle'} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Select label="Complexitate" options={COMPLEXITIES} value={config.complexity} onChange={(e) => setConfig({...config, complexity: e.target.value as Complexity})} disabled={status !== 'idle'} />
                                                <Select label="Text Density" options={TEXT_DENSITIES} value={config.textDensity} onChange={(e) => setConfig({...config, textDensity: e.target.value as TextDensity})} disabled={status !== 'idle'} />
                                            </div>
                                            <Select label="Nivel Căutare (Research)" options={SEARCH_DEPTHS} value={config.searchDepth} onChange={(e) => setConfig({...config, searchDepth: e.target.value as SearchDepth})} disabled={status !== 'idle'} />
                                            
                                            <div className="border-t border-ivory-dark pt-4">
                                                <label className="block font-serif text-sm font-bold text-slate-dark mb-2">
                                                    {activeProject?.moduleType === 'pitch' ? 'Brand Logo Upload (DNA)' : 'Character Upload (Global DNA)'}
                                                </label>
                                                <input type="file" onChange={handleFileUpload} disabled={status !== 'idle'} className="block w-full text-sm text-slate-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-crail-50 file:text-crail-600 hover:file:bg-crail-100"/>
                                                {config.uploadedReference && (
                                                    <div className="mt-2 relative inline-block"><img src={config.uploadedReference} className="h-20 w-20 object-cover rounded-lg border border-crail-300" alt="Ref" /><button onClick={() => setConfig(p => ({...p, uploadedReference: undefined}))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button></div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Completed Sets (Collapsible Style) */}
                                    <div className="space-y-2">
                                        <h3 className="font-serif text-lg font-semibold text-slate-dark mb-2">Completed Sets</h3>
                                        {projectCompletedSets.length === 0 ? <p className="text-sm text-slate-400 italic">No sets yet.</p> : projectCompletedSets.map(set => (
                                            <div key={set.id} className="bg-white rounded-lg border border-ivory-dark overflow-hidden">
                                                <div className="flex justify-between items-center p-3 bg-pampas cursor-pointer hover:bg-ivory-medium" onClick={() => handleToggleCollapse(set.id)}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-slate-500 text-xs">{collapsedSets[set.id] ? '▶' : '▼'}</span>
                                                        <span className="text-sm font-bold">{set.name}</span>
                                                    </div>
                                                    <span className="text-[10px] text-slate-500">{new Date(set.timestamp).toLocaleTimeString()}</span>
                                                </div>
                                                {!collapsedSets[set.id] && (
                                                    <div className="p-3 bg-white border-t border-ivory-dark">
                                                        <div className="flex justify-end gap-2 mb-3">
                                                            <Button size="sm" variant="ghost" onClick={() => setViewingSet(set)} className="text-xs px-2 py-1 h-auto">Full Gallery</Button>
                                                        </div>
                                                        <div className="grid grid-cols-4 gap-2">
                                                            {set.items.slice(0, 8).map((item) => (
                                                                <div key={item.id} className="aspect-square bg-slate-100 rounded overflow-hidden relative group cursor-pointer" onClick={() => setViewerImage({ src: item.imageUrl!, id: item.id, context: config.style })}>
                                                                    <img src={item.imageUrl} className="w-full h-full object-cover" alt="thumb" />
                                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">✏️</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* RIGHT COLUMN */}
                                <div className="w-full lg:w-2/3 flex flex-col gap-4">
                                
                                    {/* STATUS & LOG PANEL (Visible when Running) */}
                                    {status !== 'idle' && (
                                        <div className="bg-white rounded-xl shadow-card border border-crail-100 overflow-hidden flex flex-col max-h-[400px]">
                                            <div className="p-4 bg-pampas border-b border-ivory-dark flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${status === 'paused' ? 'bg-warning animate-pulse' : 'bg-success animate-ping'}`}></div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-dark text-sm">{status === 'paused' ? 'PAUSED' : 'PROCESSING BATCH'}</h3>
                                                        <p className="text-xs text-slate-500">{projectQueue.filter(q => q.status === 'success').length} / {projectQueue.length} Completed</p>
                                                    </div>
                                                </div>
                                                {nextItemCountdown !== null && (
                                                    <div className="flex items-center gap-2">
                                                            <div className="bg-slate-dark text-white px-3 py-1 rounded font-mono text-sm font-bold">{nextItemCountdown}s</div>
                                                            <button onClick={handleSkipWait} className="text-xs text-crail-500 underline hover:text-crail-700">Skip</button>
                                                    </div>
                                                )}
                                                <div className="flex gap-2">
                                                    {status === 'batch_running' ? <Button variant="secondary" size="sm" onClick={handlePauseGlobal}>Pause All</Button> : <Button variant="primary" size="sm" onClick={handleResumeGlobal}>Resume All</Button>}
                                                    <Button variant="ghost" size="sm" onClick={handleAbortAndClear} className="text-error">Stop</Button>
                                                </div>
                                            </div>

                                            {/* ACTIVITY LOG */}
                                            <div className="flex-grow overflow-y-auto p-4 bg-slate-900 font-mono text-xs space-y-1 min-h-[150px]">
                                                {projectLogs.length === 0 && <span className="text-slate-600">Initializing...</span>}
                                                {projectLogs.map(log => (
                                                    <div key={log.id} className={`flex gap-2 ${log.type === 'error' ? 'text-red-400' : log.type === 'telegram' ? 'text-blue-300' : log.type === 'success' ? 'text-green-400' : log.type === 'warning' ? 'text-yellow-400' : 'text-slate-300'}`}>
                                                        <span className="text-slate-600 select-none flex-shrink-0">[{log.timestamp.toLocaleTimeString()}]</span>
                                                        <span>{log.message}</span>
                                                    </div>
                                                ))}
                                                <div ref={logsEndRef} />
                                            </div>
                                        </div>
                                    )}

                                    {/* DNA PANEL (ALWAYS VISIBLE IF ACTIVE) */}
                                    {(sheetStatus.status !== 'pending' || config.uploadedReference || status !== 'idle') && (
                                        <div className="bg-white p-4 rounded-xl shadow-card border border-ivory-dark flex gap-4">
                                            <div className="w-32 flex-shrink-0">
                                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">{activeProject?.moduleType === 'pitch' ? 'Brand DNA' : 'Visual DNA'}</p>
                                                    <div className="aspect-[4/3] bg-slate-100 rounded overflow-hidden border border-ivory-dark relative cursor-pointer" onClick={() => sheetStatus.url && setViewerImage({ src: sheetStatus.url, id: 'dna-sheet', context: config.style })}>
                                                        {sheetStatus.url ? (
                                                            <img src={sheetStatus.url} className="w-full h-full object-cover" alt="DNA" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 text-center p-1">
                                                                {sheetStatus.status === 'generating' ? 'Extracting DNA...' : 'No DNA Yet'}
                                                            </div>
                                                        )}
                                                    </div>
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-center mb-1">
                                                    <label className="text-xs font-bold text-slate-dark">Refinement Instructions (Affects Next Regen)</label>
                                                    <button onClick={handleRegenerateSheet} disabled={status === 'batch_running'} className="text-[10px] font-bold text-crail-500 hover:underline disabled:opacity-50">REGENERATE DNA</button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <input className="flex-grow px-3 py-2 text-sm border border-ivory-dark rounded focus:border-crail-500" placeholder="e.g. Make hair blonder, remove hat..." value={sheetRefinement} onChange={(e) => setSheetRefinement(e.target.value)} />
                                                </div>
                                                <p className="text-[10px] text-slate-400 mt-1">Tip: Pause the batch to modify this and regenerate the DNA sheet mid-set.</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* QUEUE / INPUT TOGGLE */}
                                    {status === 'idle' || status === 'batch_complete' ? (
                                        <Card className="flex-grow flex flex-col">
                                            <h3 className="font-serif text-lg font-semibold text-slate-dark mb-4">Input Script</h3>
                                            <TextArea placeholder={`SET 1: JUNGLE EXPEDITION\nContext: 1920s explorer...\n\nSCENE 1: Map room\nSCENE 2: Packing jeep`} value={batchInput} onChange={(e) => setBatchInput(e.target.value)} className="flex-grow font-mono text-sm min-h-[300px]" />
                                            <div className="mt-6 flex justify-end gap-3">
                                                {status === 'batch_complete' && <Button variant="ghost" onClick={handleClearQueue}>Clear & Reset</Button>}
                                                <Button onClick={handleStartBatch} disabled={!batchInput.trim()}>Start Batch</Button>
                                            </div>
                                        </Card>
                                    ) : (
                                        <div className="flex-grow bg-white rounded-xl shadow-card border border-ivory-dark relative">
                                            {Object.entries(queueBySet).map(([setName, items]) => {
                                                const isPaused = pausedSets[setName];
                                                const isCollapsed = collapsedSets[setName];
                                                return (
                                                    <div key={setName} className="border-b border-ivory-dark">
                                                        <div className="sticky top-0 bg-pampas z-10 px-4 py-2 flex justify-between items-center border-b border-ivory-dark shadow-sm">
                                                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleToggleCollapse(setName)}>
                                                                <span className="text-xs text-slate-500 font-mono">{isCollapsed ? '▶' : '▼'}</span>
                                                                <span className="font-bold text-xs text-slate-dark uppercase">{setName}</span>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <button onClick={() => handleToggleSetPause(setName)} className={`text-[10px] font-bold px-2 py-1 rounded border ${isPaused ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-white text-slate-500 border-slate-200'}`}>
                                                                    {isPaused ? 'RESUME SET' : 'PAUSE SET'}
                                                                </button>
                                                                <button onClick={() => setEditingSet(setName)} className="text-[10px] text-crail-500 hover:underline">Edit Settings</button>
                                                            </div>
                                                        </div>
                                                        
                                                        {!isCollapsed && (
                                                            <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                {items.map((item) => (
                                                                    <div key={item.id} className={`flex gap-3 p-3 rounded-lg border transition-all ${item.status === 'processing' ? 'bg-blue-50 border-blue-200 shadow-md scale-[1.02]' : item.status === 'success' ? 'bg-green-50 border-green-100' : item.status === 'error' ? 'bg-red-50 border-red-200' : 'bg-white border-ivory-medium'}`}>
                                                                        <div className="w-16 h-16 bg-white rounded border border-slate-100 flex-shrink-0 overflow-hidden cursor-pointer" onClick={() => item.status === 'success' && setViewerImage({ src: item.imageUrl!, id: item.id, context: config.style })}>
                                                                            {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover" alt="gen" />}
                                                                        </div>
                                                                        <div className="flex-grow min-w-0">
                                                                            <div className="flex justify-between">
                                                                                <p className="text-sm font-semibold truncate">{item.shortTopic}</p>
                                                                                <span className={`text-[10px] font-bold uppercase ${item.status === 'error' ? 'text-red-500' : ''}`}>{item.status}</span>
                                                                            </div>
                                                                            {item.status === 'error' ? (
                                                                                <p className="text-xs text-red-500 mt-1 truncate" title={item.error}>{item.error}</p>
                                                                            ) : (
                                                                                <p className="text-xs text-slate-500 truncate mt-1 font-mono">{item.fullPrompt.substring(0, 60)}...</p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Layout>
        </div>
    </div>
  );
};

export default App;
