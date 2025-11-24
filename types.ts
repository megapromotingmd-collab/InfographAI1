

export enum Language {
  RO = 'Română',
  EN = 'English',
  FR = 'Français',
  ES = 'Español',
  DE = 'Deutsch',
  IT = 'Italiano',
  PT = 'Português',
  ZH = '中文',
  JA = '日本語',
  KO = '한국어',
  AR = 'العربية'
}

export enum VisualStyle {
  REALISTIC = 'Photorealistic (National Geographic Style)',
  ANIME = 'Anime (Sharp Cel-Shading)',
  RENDER_3D = '3D Character Render (Pixar/Disney Style)',
  CLAY = 'Claymation / Plasticine Texture',
  PAINTING = 'Digital Painting (ArtStation)',
  FLAT = 'Flat Illustration (Corporate Minimal)',
  COMIC = 'Comic Book / Graphic Novel Style',
  SKETCH = 'Hand-Drawn Sketch (Pencil/Charcoal)',
  WATERCOLOR = 'Watercolor Painting (Soft/Creative)',
  LOWPOLY = 'Low-poly 3D (Geometric)',
  MINIMAL = 'Hyper-Minimalistic (Abstract)',
  RETRO = 'Retro Futuristic (Synthwave/80s)',
  VECTOR = 'Vector Clean (SVG Style)',
  OIL = 'Oil Painting (Impressionist)',
  LEGO = 'Lego Style (Plastic Bricks)',
  PAPER = 'Paper Cut-out (Craft/Layered)',
  DOLL = 'BJD Doll Style (Ball Jointed)',
  VAPORWAVE = 'Vaporwave (Glitch/Statue/Neon)',
  STORYBOOK = 'Storybook Children\'s Style (Whimsical)',
  SOUTH_PARK = 'South Park (Cutout Paper)',
  WOOL = 'Wool / Knitted (Handmade)'
}

export enum Complexity {
  SIMPLE = 'Simplu (Beginner/Kids)',
  MEDIUM = 'Mediu (General Public)',
  ADVANCED = 'Avansat (Professional/Academic)'
}

export enum AspectRatio {
  PORTRAIT = '3:4',
  PORTRAIT_TALL = '4:5',
  PORTRAIT_MOBILE = '9:16',
  LANDSCAPE = '4:3',
  SQUARE = '1:1',
  WIDE = '16:9'
}

export enum SearchDepth {
  NONE = 'Nu căuta (Rapid / Doar Creativ)',
  STANDARD = 'Standard (Verifică fapte de bază)',
  DEEP = 'Deep Research (Caută detalii complexe)'
}

export enum TextDensity {
  NONE = 'Fără Text (Doar Vizual)',
  MINIMAL = 'Minimal (Titluri / Etichete Scurte)',
  BALANCED = 'Echilibrat (Titlu + Puncte Cheie)',
  DETAILED = 'Detaliat (Infografic Complet)'
}

export interface GenerationConfig {
  topic: string;
  language: Language;
  style: VisualStyle;
  complexity: Complexity;
  format: AspectRatio;
  searchDepth: SearchDepth;
  textDensity: TextDensity;
  uploadedReference?: string; // Base64 of user uploaded character/style ref
  sketchReference?: string; // NEW: Base64 of a sketch for layout guidance
}

export type QueueItemStatus = 'pending' | 'processing' | 'retry' | 'success' | 'error' | 'aborted';

export interface QueueItem {
  id: string;
  projectId: string; 
  setName: string; 
  slideNumber: string; 
  fullPrompt: string; 
  shortTopic: string; 
  status: QueueItemStatus;
  imageUrl?: string;
  error?: string;
  attemptCount?: number;
  referenceImageUsed?: string; 
  durationMs?: number; 
  sketchReference?: string; // NEW: Used if this specific slide was generated from a sketch
}

export type GenerationStatus = 'idle' | 'batch_running' | 'paused' | 'batch_complete';

export interface InfographicResult {
  imageUrl: string;
  topic: string;
  date: Date;
}

export interface SheetStatus {
  status: 'pending' | 'generating' | 'success' | 'error';
  url?: string;
  attempt: number;
}

export interface CompletedSet {
  id: string;
  projectId: string; 
  name: string;
  sheetUrl?: string;
  items: QueueItem[];
  timestamp: number;
}

export type ProjectModuleType = 'infographic' | 'book' | 'pitch' | 'branding';

export interface BookDetails {
  childName: string;
  age: number;
  gender: string;
  preferences: string;
  hobbies: string;
  favoriteAnimal: string;
  biggestFear: string;
  hero: string;
  favoriteColor: string;
  activities: string;
  friends: string;
  favoritePlace: string;
  storyTone: string;
  length: string;
  humorLevel: number;
  emotionLevel: number;
}

export interface PitchDetails {
  companyName: string;
  industry: string;
  problem: string;
  solution: string;
  traction: string;
  businessModel: string;
  revenue: string;
  team: string;
  competitors: string;
  usp: string; 
  financials: string;
  roadmap: string;
  askAmount: string;
  investors: string;
}

// --- BRANDING MODULE TYPES ---

export interface BrandDetails {
  name: string;
  type: string; // Company, Product, Personal
  industry: string;
  targetAudience: string;
  values: string;
  tone: string;
  visualPreferences: string; // "Minimalist", "Bold", etc.
  colors: string; // "Blue and Gold", "Dark Mode"
  uploadedLogo?: string; // Base64
  referenceImages?: string[]; // Array of Base64
}

export interface BrandAsset {
  id: string;
  type: 'logo' | 'moodboard' | 'palette' | 'font' | 'mockup' | 'social';
  title: string;
  imageUrl: string;
  timestamp: number;
}

export interface BrandOverview {
  missionStatement: string;
  positioning: string;
  toneVoice: string;
  visualDirection: string;
}

export interface Project {
  id: string;
  name: string;
  icon: string; 
  createdAt: number;
  config: GenerationConfig;
  moduleType?: ProjectModuleType;
  bookDetails?: BookDetails;
  pitchDetails?: PitchDetails;
  
  // Branding specific
  brandDetails?: BrandDetails;
  brandOverview?: BrandOverview; // AI Generated Text Overview
  brandAssets?: BrandAsset[]; // Generated Visuals
}