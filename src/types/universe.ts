export type UniverseId =
  | 'arrival'
  | 'builder'
  | 'ai-lab'
  | 'research'
  | 'arsenal'
  | 'journey'
  | 'about'
  | 'beyond';

export interface UniverseMeta {
  id: UniverseId;
  indexStr: string;
  name: string;
  title: string;
  tagline: string;
  concept: string;
  hash: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Applied AI' | 'Document Intelligence' | 'Commercial & Web' | 'Creative Tooling' | 'Systems & Utilities';
  role: string;
  problem: string;
  architecture: string[];
  keyFeatures: string[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'Production' | 'Active Build' | 'Open Source' | 'Exploratory';
  executionEnvironment?: string;
}

export interface AiLabExperiment {
  id: string;
  title: string;
  tagline: string;
  focusArea: string;
  what: string;
  why: string;
  how: string;
  whatWasExplored: string;
  whatWasLearned: string;
  technologies: string[];
  relatedProjects: string[];
  status: string;
  interactiveProbe?: {
    title: string;
    description: string;
    parameters: {
      id: string;
      label: string;
      options: string[];
      defaultVal: string;
    }[];
    evaluations: Record<string, string>;
  };
}

export interface ResearchRecordItem {
  id: string;
  title: string;
  type: 'RESEARCH THREAD' | 'TECHNICAL INVESTIGATION' | 'PUBLICATION SIGNAL' | 'CONFERENCE SIGNAL' | 'SYSTEM EXPLORATION';
  domain: string;
  overview: string;
  investigationDetails: string[];
  keyOutcomes: string[];
  artifactsAndTools: string[];
  signalBadge?: string;
  dateOrEra?: string;
}

export interface TopologyNode {
  id: string;
  name: string;
  cluster: 'LANGUAGES' | 'AI / ML' | 'APPLICATION DEVELOPMENT' | 'SYSTEMS & TOOLING';
  description: string;
  depth: 'Core Mastery' | 'Applied Production' | 'System Architecture';
  connectedNodes: string[];
  relatedProjects: string[];
}

export interface CosmicMilestone {
  id: string;
  title: string;
  year?: string;
  epoch: string;
  category: 'Cohort' | 'Award & Recognition' | 'Patent' | 'Conference' | 'Academic' | 'Hackathon';
  context: string;
  summary: string;
  significance: string;
  verifiedDetails: string[];
  celestialCoordinates: {
    sector: string;
    magnitude: string;
    anchorIndex: number;
  };
}

export interface AboutDossier {
  name: string;
  handle: string;
  role: string;
  location: string;
  timezone: string;
  coordinates: string;
  status: string;
  positioning: string[];
  manifestoStatement: string;
  narrativeParagraphs: string[];
  engineeringAxioms: {
    number: string;
    title: string;
    thesis: string;
    context: string;
  }[];
  currentExplorations: string[];
  offlinePursuits: string[];
}

export interface BeyondData {
  transmissionHeader: string;
  terminalStatus: string;
  email: string;
  channels: {
    name: string;
    handle: string;
    url: string;
    protocol: string;
    note: string;
  }[];
  curriculumVitae: {
    summary: string;
    coreCompetencies: string[];
    verifiedSignals: string[];
    resumeDownloadAvailable: boolean;
  };
}
