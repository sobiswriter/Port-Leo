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
  category: 'Systems' | 'AI & Agents' | 'Distributed' | 'DevTools' | 'Interface';
  year: string;
  role: string;
  problem: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'Production' | 'Active R&D' | 'Open Source';
}

export interface AiExperimentItem {
  id: string;
  title: string;
  type: 'Autonomous Agent' | 'KV Cache Optimization' | 'Latent Space' | 'Speculative Decoding' | 'Mixture-of-Experts';
  hypothesis: string;
  architecture: string;
  evalMetrics: { name: string; value: string; baseline: string }[];
  status: 'Active Prototype' | 'Benchmarked' | 'Research Paper';
  demoPromptOptions?: string[];
  defaultTemperature?: number;
  sampleOutputs?: Record<string, string>;
}

export interface ResearchPaperItem {
  id: string;
  title: string;
  venue: string;
  year: string;
  abstract: string;
  contributions: string[];
  citations: number;
  readTime: string;
  arxivId: string;
  bibtex: string;
  tags: string[];
}

export interface CapabilityItem {
  name: string;
  depth: 'Core Mastery' | 'Deep Architecture' | 'Applied Production';
  description: string;
  primaryTools: string[];
}

export interface ArsenalRing {
  id: string;
  title: string;
  subtitle: string;
  capabilities: CapabilityItem[];
}

export interface MilestoneItem {
  id: string;
  year: string;
  dateStr: string;
  title: string;
  category: 'Hackathon' | 'Career' | 'Academic' | 'Milestone' | 'Open Source';
  context: string;
  description: string;
  outcome: string;
  takeaway: string;
}

export interface BookRecommendation {
  title: string;
  author: string;
  category: string;
  impact: string;
}

export interface AboutDossier {
  name: string;
  handle: string;
  role: string;
  location: string;
  timezone: string;
  coordinates: string;
  status: string;
  bioParagraphs: string[];
  axioms: { number: string; statement: string; explanation: string }[];
  readingList: BookRecommendation[];
  workspaceSpecs: { category: string; item: string }[];
  offlinePursuits: string[];
}

export interface BeyondData {
  transmissionNote: string;
  email: string;
  pgpKeyId: string;
  pgpKeyFingerprint: string;
  socials: { label: string; username: string; url: string; note: string }[];
  resumeSummary: {
    summaryText: string;
    focusAreas: string[];
    education: string;
    experienceHighlights: string[];
  };
}
