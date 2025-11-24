export interface BrandKitProject {
  id: string;
  name: string;
  category: 'companie' | 'produs' | 'eveniment' | 'personal';
  industry: string;
  audience: string;
  values: string;
  tone: string;
  visualGoals: string;
  colorMode: 'dark' | 'light' | 'vibrant' | 'pastel' | 'neutru';
  boldness: 'safe' | 'mediu' | 'experimental';
  loudness: 'soft' | 'echilibrat' | 'puternic';
  wants: {
    logo: boolean;
    palette: boolean;
    social: boolean;
    icons: boolean;
    covers: boolean;
    pitchTheme: boolean;
  };
  uploads: {
    logo?: string;
    legacy?: string[];
    references?: string[];
  };
  overview?: {
    summary: string;
    positioning: string;
    tone: string;
    promises: string[];
  };
  assets: Array<{
    id: string;
    kind: 'logo' | 'palette' | 'moodboard' | 'application';
    title: string;
    url: string;
    createdAt: number;
  }>;
  createdAt: number;
  linkedProjectId?: string;
}

export interface BrandKitFormState {
  name: string;
  category: 'companie' | 'produs' | 'eveniment' | 'personal';
  industry: string;
  audience: string;
  values: string;
  tone: string;
  visualGoals: string;
  colorMode: 'dark' | 'light' | 'vibrant' | 'pastel' | 'neutru';
  boldness: 'safe' | 'mediu' | 'experimental';
  loudness: 'soft' | 'echilibrat' | 'puternic';
  wants: BrandKitProject['wants'];
  uploads: BrandKitProject['uploads'];
  linkedProjectId?: string;
}
