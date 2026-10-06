import {
  UniverseMeta,
  ProjectItem,
  AiLabExperiment,
  ResearchRecordItem,
  TopologyNode,
  CosmicMilestone,
  AboutDossier,
  BeyondData,
} from '../types/universe';

export const UNIVERSES_META: UniverseMeta[] = [
  {
    id: 'arrival',
    indexStr: '00',
    name: 'Arrival',
    title: 'The Monolith & Dimensional Coordinates',
    tagline: 'Dimensional entry chamber, spatial field & architectural introduction.',
    concept: 'Entry Chamber',
    hash: 'arrival',
  },
  {
    id: 'builder',
    indexStr: '01',
    name: 'Builder',
    title: 'Engineering Workbench & Production Catalog',
    tagline: 'Personal engineering console inspecting applied AI platforms and deployed systems.',
    concept: 'Engineering Workbench',
    hash: 'builder',
  },
  {
    id: 'ai-lab',
    indexStr: '02',
    name: 'AI Lab',
    title: 'Experiment Console & Model Observatory',
    tagline: 'Cognitive systems, persona memory architectures, OCR overlays, and behavioral logic.',
    concept: 'Experiment Console',
    hash: 'ai-lab',
  },
  {
    id: 'research',
    indexStr: '03',
    name: 'Research',
    title: 'Investigation Archive & Signal Dossier',
    tagline: 'Document intelligence, behavior-aware interfaces, patent publication, and conference signals.',
    concept: 'Investigation Archive',
    hash: 'research',
  },
  {
    id: 'arsenal',
    indexStr: '04',
    name: 'Arsenal',
    title: 'System Topology & Capability Map',
    tagline: 'Interactive graph of programming languages, AI/ML pipelines, app runtimes, and systems.',
    concept: 'Capability Topology',
    hash: 'arsenal',
  },
  {
    id: 'journey',
    indexStr: '05',
    name: 'Journey',
    title: 'Cosmic Timeline & Constellation Map',
    tagline: 'Celestial milestones across OpenXAI, HacktoSkill, IIT Ropar honors, patents, and hackathons.',
    concept: 'Cosmic Map',
    hash: 'journey',
  },
  {
    id: 'about',
    indexStr: '06',
    name: 'About',
    title: 'Living Dossier & Human Narrative',
    tagline: 'Intellectual monograph on building applied AI systems, usability, and deterministic outcomes.',
    concept: 'Living Dossier',
    hash: 'about',
  },
  {
    id: 'beyond',
    indexStr: '07',
    name: 'Beyond',
    title: 'Transmission Terminal & Egress Console',
    tagline: 'Direct dispatch interface, verified communication channels, and curriculum vitae.',
    concept: 'Transmission Terminal',
    hash: 'beyond',
  },
];

// ============================================================================
// REAL 19 PROJECTS CATALOG (Source: sobi.codes)
// ============================================================================
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'legallm',
    title: 'LegalLM',
    tagline: 'Intelligent legal document parsing, clause risk extraction, and contract summarization platform.',
    category: 'Document Intelligence',
    role: 'Creator & Lead Architect',
    featured: true,
    status: 'Production',
    executionEnvironment: 'Full-Stack Web / Node.js & React',
    problem:
      'Legal contracts are dense, repetitive, and vulnerable to human oversight during manual reviews, especially around liability caps, termination clauses, and non-standard indemnities.',
    architecture: [
      'Multi-stage PDF ingestion pipeline splitting contracts by structural clause boundaries rather than arbitrary token counts.',
      'Targeted NLP extraction extracting key obligations, jurisdiction flags, and risk severity ratings.',
      'Interactive contract inspector providing side-by-side clause navigation with synthesized plain-language summaries.',
      'Exportable audit reports highlighting non-standard deviation against standard commercial baselines.',
    ],
    keyFeatures: [
      'Clause-level semantic segmentation and risk tagging',
      'Plain-language obligation summarization',
      'High-confidence entity and party identification',
      'Audit-ready legal export generation',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'NLP / GenAI', 'Document Intelligence', 'Tailwind CSS'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'project-aic',
    title: 'Project AIC',
    tagline: 'Behavior-aware artificial intelligence engine with long-term memory and adaptive persona logic.',
    category: 'Applied AI',
    role: 'Lead AI Engineer',
    featured: true,
    status: 'Active Build',
    executionEnvironment: 'Python Runtime & State Machine',
    problem:
      'Standard language models operate statelessly, forgetting user nuances between sessions and relying on rigid system prompts that quickly collapse during extended interactive workflows.',
    architecture: [
      'Dual-tier memory architecture separating working conversational context from persistent episodic values.',
      'Heuristic personality constraint vector guiding decision logic and interaction temperament.',
      'Episodic memory reinforcement updating relevance scores on key user interactions while pruning transient chatter.',
      'Modular execution loop enforcing state validation before output dispatch.',
    ],
    keyFeatures: [
      'Long-term episodic and semantic memory persistence',
      'Controllable temperament and behavioral boundary enforcement',
      'Dynamic state graph tracking ongoing goal progression',
      'Deterministic output validation against persona rules',
    ],
    stack: ['Python', 'NLP Pipelines', 'Behavior Modeling', 'Memory Architectures', 'LLM Tooling'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'right-left',
    title: 'RIGHT.LEFT',
    tagline: 'Editorial intelligence and creative agency platform powered by React, Express, and Gemini.',
    category: 'Applied AI',
    role: 'Full-Stack Developer',
    featured: true,
    status: 'Production',
    executionEnvironment: 'React + Express Cloud Service',
    problem:
      'Creative agencies struggle to coordinate high-speed editorial ideation, content refinement, and client-facing branding without disjointed tools and manual revision loops.',
    architecture: [
      'Clean Express backend exposing streaming Gemini endpoints for fast editorial ideation and copy synthesis.',
      'Type-safe React client with responsive draft canvas and real-time revision tracking.',
      'Modular prompt pipelines tailored for tone shifts, brand consistency checks, and multi-format outputs.',
      'Integrated content management schema supporting rapid draft publishing and review workflows.',
    ],
    keyFeatures: [
      'Integrated Gemini-powered editorial ideation',
      'Real-time tone transformation and copy reframing',
      'Streamlined agency draft review pipeline',
      'Fluid modern interface with zero-latency preview',
    ],
    stack: ['React', 'Express', 'Gemini API', 'Node.js', 'Tailwind CSS', 'TypeScript'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'wassap',
    title: 'Wassap',
    tagline: 'Lightweight, ultra-responsive real-time communication and messaging web platform.',
    category: 'Commercial & Web',
    role: 'Full-Stack Engineer',
    featured: true,
    status: 'Production',
    executionEnvironment: 'Client-Server Messaging Architecture',
    problem:
      'Contemporary messaging interfaces are frequently bloated with heavy telemetry, sluggish load times, and cluttered desktop viewports.',
    architecture: [
      'Low-overhead event-driven message dispatch protocol ensuring instant message rendering.',
      'Optimistic UI state updates providing zero-latency typing and send confirmation.',
      'Responsive multi-pane layout adapting seamlessly across mobile viewports and desktop wide screens.',
      'Clean session management with local client persistence for offline chat inspection.',
    ],
    keyFeatures: [
      'Instantaneous bi-directional message synchronization',
      'Adaptive conversation pane navigation',
      'Minimalist distraction-free communication layout',
      'Rich text and link preview hydration',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'WebSocket Transport', 'Tailwind CSS'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'equity-echo',
    title: 'EquityEcho',
    tagline: 'Financial document processing, earnings sentiment analysis, and market disclosure intelligence.',
    category: 'Document Intelligence',
    role: 'Systems & ML Developer',
    featured: true,
    status: 'Production',
    executionEnvironment: 'Python Extraction & Web Dashboard',
    problem:
      'Retail investors and analysts face overwhelming volumes of quarterly disclosures, regulatory filings, and earnings transcripts filled with obfuscated narrative sentiment.',
    architecture: [
      'Targeted financial text parser extracting forward-looking guidance and management commentary.',
      'Lexicon-aware sentiment pipeline scoring executive optimism versus cautionary risk warnings.',
      'Automated entity recognition mapping sentiment shifts directly to specific business lines and geographies.',
      'Clean comparative dashboard displaying historical sentiment trajectories alongside filings.',
    ],
    keyFeatures: [
      'Automated management guidance extraction',
      'Domain-adapted financial sentiment classification',
      'Executive tone shift tracking across reporting quarters',
      'Distilled key takeaways from dense regulatory documents',
    ],
    stack: ['TypeScript', 'Python', 'NLP', 'Document Processing', 'Financial Lexicons', 'React'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'shri-guru-kirpa',
    title: 'Shri Guru Kirpa Gold Platters And Jewellers',
    tagline: 'Commercial digital catalog, jewelry showcase, and digital commerce interface for luxury retail.',
    category: 'Commercial & Web',
    role: 'Lead Frontend Architect',
    featured: true,
    status: 'Production',
    executionEnvironment: 'Production Web Application',
    problem:
      'Traditional jewelry retailers struggle to transition intricate physical craftsmanship into digital showcases that retain tactile elegance, trust, and clear specification breakdowns.',
    architecture: [
      'High-performance image showcase with smooth zoom, gold purity badges, and granular weight metadata.',
      'Optimized asset delivery pipeline ensuring fast asset hydration on mobile networks.',
      'Granular product categorization across bridal sets, daily wear, and custom bullion orders.',
      'Direct customer enquiry routing with automated item reference tagging.',
    ],
    keyFeatures: [
      'Luxury aesthetic with gold-accented typography and dark surfaces',
      'Detailed karat, weight, and purity specification cards',
      'Mobile-optimized interactive product catalog',
      'Instant enquiry dispatch with pre-filled item references',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Modern UI/UX', 'Web Performance'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'sonar-thali',
    title: 'Sonar Thali Food Commerce App',
    tagline: 'Full-featured food commerce and culinary ordering platform with dynamic menu workflows.',
    category: 'Commercial & Web',
    role: 'Full-Stack Developer',
    featured: true,
    status: 'Production',
    executionEnvironment: 'Mobile-Responsive Web App',
    problem:
      'Multi-course traditional culinary menus require flexible customization, thali combination builders, and friction-free mobile checkout flows.',
    architecture: [
      'Componentized menu state engine handling item additions, thali customization, and dietary filters.',
      'Real-time cart calculation managing dynamic pricing, taxes, and order notes.',
      'Mobile-first touch-friendly interface designed for rapid ordering on handheld devices.',
      'Lightweight backend order handling with webhook notifications for kitchen staff.',
    ],
    keyFeatures: [
      'Interactive thali component selection engine',
      'Dynamic real-time cart and order total calculation',
      'Mobile-first responsive culinary navigation',
      'Direct order dispatch and status confirmation',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'State Management', 'Tailwind CSS'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'wat-ewrite',
    title: 'Wat-EWrite',
    tagline: 'AI-assisted writing companion and context-aware paragraph rewriting pipeline.',
    category: 'Creative Tooling',
    role: 'Creator',
    featured: false,
    status: 'Production',
    executionEnvironment: 'Web Client / AI Service',
    problem:
      'Writers often get stuck with awkward sentence phrasing or repetitive vocabulary without needing an AI that completely takes over their voice.',
    architecture: [
      'Context-sensitive text transformation pipeline offering multiple tone variations (concise, formal, vivid, persuasive).',
      'Diff highlight visualization allowing writers to inspect changes before accepting suggestions.',
      'Client-side state history supporting infinite undo/redo and branching drafts.',
    ],
    keyFeatures: [
      'Multi-tone semantic rewriting variations',
      'Visual word-level insertion and deletion diffs',
      'Focus-mode distraction-free writing interface',
    ],
    stack: ['TypeScript', 'React', 'NLP Pipelines', 'Transformers', 'Tailwind CSS'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'gdc-diagnostic',
    title: 'GDC Diagnostic Center',
    tagline: 'Healthcare diagnostic laboratory management, test catalog, and patient report workflow application.',
    category: 'Commercial & Web',
    role: 'Systems Developer',
    featured: false,
    status: 'Production',
    executionEnvironment: 'Web Information System',
    problem:
      'Diagnostic medical labs require clear test preparation instructions, transparent pricing, and structured access to patient report retrieval without friction.',
    architecture: [
      'Searchable test directory categorized by pathology, radiology, and specialized health panels.',
      'Secure report lookup gateway using patient reference numbers and verification codes.',
      'Accessible appointment scheduling module with pre-test fasting and preparation guidelines.',
    ],
    keyFeatures: [
      'Granular medical test directory with prep guidelines',
      'Patient report lookup interface',
      'Home collection booking workflow',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'devineclub',
    title: 'DevineClub',
    tagline: 'Curated digital community hub and members portal for collaborative spaces.',
    category: 'Commercial & Web',
    role: 'Frontend Architect',
    featured: false,
    status: 'Production',
    executionEnvironment: 'Community Web Portal',
    problem:
      'Niche communities need dedicated digital homes that reflect their identity with member directories, event announcements, and exclusive resources.',
    architecture: [
      'Role-gated membership portal with tiered access permissions.',
      'Event calendar with RSVP registration and reminder notifications.',
      'Interactive community feed supporting discussions and curated announcements.',
    ],
    keyFeatures: [
      'Member directory with personal profile cards',
      'Curated community events schedule',
      'Exclusive member resources repository',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'cosmic-canvas',
    title: 'CosmicCanvas',
    tagline: 'Generative digital canvas and creative algorithmic drawing sandbox.',
    category: 'Creative Tooling',
    role: 'Creative Coder',
    featured: false,
    status: 'Production',
    executionEnvironment: 'HTML5 Canvas & WebGL',
    problem:
      'Exploring generative art mathematics is often confined to static scripts rather than accessible, tactile browser canvases.',
    architecture: [
      'GPU-accelerated procedural brush strokes using HTML5 Canvas 2D and WebGL render buffers.',
      'Mathematical parameter controls for particle turbulence, gravity wells, and color velocity.',
      'High-resolution canvas raster export for digital prints and wallpaper generation.',
    ],
    keyFeatures: [
      'Real-time procedural particle brush systems',
      'Dynamic physics parameter controls',
      'Lossless 4K PNG canvas export',
    ],
    stack: ['JavaScript', 'Canvas API', 'WebGL', 'Mathematical Algorithms'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'the-shadow-diary',
    title: 'The Shadow Diary',
    tagline: 'AI reflective journaling application with Socratic probing and cognitive reframing.',
    category: 'Applied AI',
    role: 'Sole Developer',
    featured: false,
    status: 'Active Build',
    executionEnvironment: 'Desktop & Web Hybrid',
    problem:
      'Traditional journaling records events but rarely helps the author challenge unhelpful assumptions or explore underlying cognitive patterns.',
    architecture: [
      'Affective sentiment parsing detecting cognitive distortions (black-and-white thinking, catastrophizing).',
      'Socratic dialogue engine generating gentle, open-ended counter-perspective questions.',
      'Encrypted local storage keeping personal reflections confidential on user hardware.',
    ],
    keyFeatures: [
      'Cognitive distortion pattern detection',
      'Socratic questioning prompts tailored to entry sentiment',
      'Confidential local-first entry encryption',
    ],
    stack: ['Python', 'NLP Pipelines', 'Behavior Modeling', 'Local Storage Encryption'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'personaverse',
    title: 'PersonaVerse',
    tagline: 'Desktop playground for AI-driven personas with profile customization and strict behavioral boundaries.',
    category: 'Applied AI',
    role: 'Lead Architect',
    featured: false,
    status: 'Active Build',
    executionEnvironment: 'Electron / Python Desktop',
    problem:
      'Simulating multiple conversational agents with distinct worldviews requires strict behavioral boundary enforcement to avoid uniform homogenization.',
    architecture: [
      'Desktop sandbox allowing user creation of custom agent personas with tone parameters and belief matrices.',
      'System prompt boundary compiler translating high-level characteristics into strict guardrails.',
      'Multi-agent conversation stage where two distinct personas can converse on a shared prompt.',
    ],
    keyFeatures: [
      'Custom persona profile builder with trait sliders',
      'Cross-persona dialogue simulation environment',
      'Real-time constraint adherence monitoring',
    ],
    stack: ['Electron', 'Python', 'Tkinter / Modern UI', 'LLM APIs', 'Behavioral Guardrails'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'ai-overlay',
    title: 'AI Overlay',
    tagline: 'Context-aware desktop overlay utility using local OCR for instant screen text synthesis.',
    category: 'Systems & Utilities',
    role: 'Systems Developer',
    featured: false,
    status: 'Production',
    executionEnvironment: 'Desktop Background Daemon',
    problem:
      'Information locked inside desktop images, PDFs, video streams, or code editors requires cumbersome manual transcription before analysis.',
    architecture: [
      'Global keyboard shortcut daemon capturing rectangular screen bounding boxes on demand.',
      'High-speed local OCR pipeline extracting text and tabular layout without cloud upload.',
      'Immediate floating HUD displaying extracted text with quick-action AI summarization and copy triggers.',
    ],
    keyFeatures: [
      'Zero-latency rectangular screen capture hook',
      'Local OCR engine running offline',
      'Instant floating HUD with copy and explain actions',
    ],
    stack: ['Python', 'OCR Engines', 'Desktop OS Hooks', 'Tkinter / PySide', 'CLI Tooling'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'inviter',
    title: 'Inviter',
    tagline: 'Event invitation generator and digital guest pass distribution platform.',
    category: 'Commercial & Web',
    role: 'Frontend Developer',
    featured: false,
    status: 'Production',
    executionEnvironment: 'Web Application',
    problem:
      'Organizers need a rapid way to generate personalized, visually distinctive digital invitation cards with RSVP tracking.',
    architecture: [
      'Template-based card customization engine with dynamic typography and palette selection.',
      'Unique attendee pass generation with dynamic QR code verification tokens.',
      'Mobile-optimized RSVP response form with instantaneous host notifications.',
    ],
    keyFeatures: [
      'Custom typography and visual styling card editor',
      'Dynamic QR code pass generation',
      'Real-time RSVP tracking dashboard',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'QR Generation'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'business-venture-app',
    title: 'Business Venture App',
    tagline: 'Enterprise venture planning, financial projection, and strategic business case modeling tool.',
    category: 'Commercial & Web',
    role: 'Full-Stack Developer',
    featured: false,
    status: 'Production',
    executionEnvironment: 'Web App',
    problem:
      'Early-stage founders lack an intuitive workspace to test assumptions, calculate unit economics, and generate coherent pitch models.',
    architecture: [
      'Reactive spreadsheet-like computation engine modeling recurring revenue, churn, and gross margins.',
      'Scenario comparison matrix contrasting conservative, base, and optimistic growth projections.',
      'Exportable executive summary generator formatting numbers into structured decks.',
    ],
    keyFeatures: [
      'Dynamic unit economics and runway calculator',
      'Multi-scenario growth forecasting',
      'Executive summary markdown export',
    ],
    stack: ['TypeScript', 'React', 'Financial Analytics', 'Tailwind CSS'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'cosmos-anomaly',
    title: 'Cosmos Anomaly',
    tagline: 'Interactive astronomical anomaly visualization and WebGL celestial field simulator.',
    category: 'Creative Tooling',
    role: 'Creative Developer',
    featured: false,
    status: 'Exploratory',
    executionEnvironment: 'WebGL 3D Canvas',
    problem:
      'Visualizing exotic gravitational lens anomalies and astronomical data requires performant GPU particle rendering in the browser.',
    architecture: [
      'Custom GLSL fragment shader distorting light rays around high-density gravitational singularities.',
      'Thousands of instanced celestial bodies orbiting procedural accretion disks.',
      'Interactive 3D camera controls with focal length and depth-of-field manipulation.',
    ],
    keyFeatures: [
      'Real-time gravitational lensing shader effect',
      'Orbital mechanics particle simulation',
      'Interactive 3D orbit controls and focal presets',
    ],
    stack: ['WebGL', 'JavaScript', 'Three.js / GLSL', 'Creative Coding'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'timeline-twist-v2',
    title: 'Timeline Twist (V2)',
    tagline: 'Interactive non-linear chronology and branching narrative visualizer.',
    category: 'Creative Tooling',
    role: 'Frontend Architect',
    featured: false,
    status: 'Production',
    executionEnvironment: 'Web Canvas App',
    problem:
      'Complex historical narratives and creative story plots break down when forced into linear vertical lists.',
    architecture: [
      'Graph-based node layout rendering parallel historical timelines and divergence points.',
      'Interactive zooming viewport supporting multi-century macro views and granular event inspection.',
      'Tag-based filtering highlighting causality chains between distant historical events.',
    ],
    keyFeatures: [
      'Multi-branch parallel timeline canvas',
      'Causal relationship connector lines',
      'Granular event modal with media embeds',
    ],
    stack: ['React', 'TypeScript', 'Interactive Canvas', 'Tailwind CSS'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
  {
    id: 'ps-utility-suite',
    title: 'PS Utility Suite',
    tagline: 'PowerShell & Python administrative automation, batch system routines, and developer productivity tools.',
    category: 'Systems & Utilities',
    role: 'Systems Engineer',
    featured: false,
    status: 'Production',
    executionEnvironment: 'PowerShell 7 & Python CLI',
    problem:
      'Repetitive OS administration, developer environment orchestration, and bulk file transformations waste valuable engineering time.',
    architecture: [
      'Modular PowerShell script library automating development environment setup, path management, and process triage.',
      'High-throughput Python file processing scripts for bulk metadata extraction and renaming.',
      'Standardized logging and exit code validation for reliable scheduled task execution.',
    ],
    keyFeatures: [
      'One-command developer environment bootstrap',
      'High-speed batch file processing and renaming engine',
      'System health and process diagnostics scripts',
    ],
    stack: ['PowerShell', 'Python', 'Windows Administration', 'CLI Scripting', 'Automation'],
    liveUrl: 'https://sobi.codes',
    githubUrl: 'https://github.com/sobiswriter',
  },
];

// ============================================================================
// REAL AI LAB EXPERIMENTS (Focusing on WHAT, WHY, HOW, EXPLORED, LEARNED)
// ============================================================================
export const AI_LAB_EXPERIMENTS: AiLabExperiment[] = [
  {
    id: 'project-aic',
    title: 'Project AIC: Persona Dynamics & Persistent Memory',
    tagline: 'Cognitive state engine coupling episodic memory retention with explicit behavioral constraints.',
    focusArea: 'Behavior-Aware Interfaces & Memory Architectures',
    status: 'Active Prototype',
    what:
      'A behavioral intelligence runtime that endows language models with persistent identity, long-term memory across disjoint sessions, and adaptive decision logic.',
    why:
      'Standard LLM chat sessions are ephemeral and amnesiac. Building true collaborative digital agents requires continuous knowledge accumulation without unbounded context window explosion.',
    how:
      'Engineered a two-tiered memory fabric: a transient working buffer for conversational coherence, and an indexed episodic store that saves high-significance facts and updates behavioral vectors.',
    whatWasExplored:
      'Explored memory reinforcement thresholds, memory decay mechanisms for stale details, and structured personality constraint prompts that prevent behavioral collapse over long horizons.',
    whatWasLearned:
      'Structured categorization of memories (core values vs situational facts) drastically outperforms raw conversational chunking, maintaining consistent persona adherence even under adversarial prompt changes.',
    technologies: ['Python', 'NLP Pipelines', 'Episodic Memory', 'Behavioral Vectors', 'LLM Runtimes'],
    relatedProjects: ['Project AIC', 'The Shadow Diary', 'PersonaVerse'],
    interactiveProbe: {
      title: 'Memory Context & Persona Adherence Probe',
      description: 'Simulate how different memory retrieval layers influence agent response temperament and coherence.',
      parameters: [
        {
          id: 'memoryLayer',
          label: 'Memory Retention Depth',
          options: ['Working Context Only', 'Episodic Store (10 turns)', 'Full Semantic Memory'],
          defaultVal: 'Full Semantic Memory',
        },
        {
          id: 'personaConstraint',
          label: 'Constraint Adherence Rigidity',
          options: ['Permissive', 'Balanced', 'Strict Invariant'],
          defaultVal: 'Strict Invariant',
        },
      ],
      evaluations: {
        'Working Context Only_Permissive':
          '[AIC Engine · Latency: 12ms]\nAgent responds generically. Lacks personal context from prior sessions; susceptible to drift if user steers topic.',
        'Working Context Only_Strict Invariant':
          '[AIC Engine · Latency: 16ms]\nPersona rules hold steady, but lack of historical context forces repetitive introductory clarification.',
        'Episodic Store (10 turns)_Balanced':
          '[AIC Engine · Latency: 24ms]\nRecognizes recent user preferences and active goals. Coherent voice maintained across mid-horizon discussion.',
        'Full Semantic Memory_Strict Invariant':
          '[AIC Engine · Latency: 32ms]\nOptimal state: Recalls foundational user facts from initial onboarding, references relevant past outcomes, and rigidly respects persona temperament boundaries.',
      },
    },
  },
  {
    id: 'personaverse',
    title: 'PersonaVerse: Multi-Agent Constraint Sandbox',
    tagline: 'Desktop experimentation environment testing conflict resolution across contrasting persona definitions.',
    focusArea: 'Multi-Agent Simulation & Guardrails',
    status: 'Experimental Framework',
    what:
      'A modular desktop playground designed to configure, simulate, and observe interactions between distinct AI personas operating under strict behavioral profiles.',
    why:
      'Understanding how multiple agents with differing goals interact without human intervention is essential for multi-agent workflows, creative writing simulations, and boundary testing.',
    how:
      'Built a persona definition compiler with configurable parameters for curiosity, skepticism, formality, and directness, paired with a dual-agent dialogue orchestration engine.',
    whatWasExplored:
      'Explored prompt boundary enforcement techniques, detecting when an agent begins mirroring the other persona rather than maintaining its own designated perspective.',
    whatWasLearned:
      'Single system prompts inevitably leak style across agents in prolonged debate. Rigid persona consistency requires periodic multi-pass self-reflection or separate validation prompts.',
    technologies: ['Electron', 'Python', 'System Prompt Compilers', 'Multi-Agent Loops'],
    relatedProjects: ['PersonaVerse', 'Project AIC'],
    interactiveProbe: {
      title: 'Persona Interaction Tension Probe',
      description: 'Observe debate convergence dynamics between an Analytical Auditor and an Intuitive Creator.',
      parameters: [
        {
          id: 'debateRounds',
          label: 'Debate Iterations',
          options: ['1 Round Exchange', '3 Round Synthesis', '5 Round Stress Test'],
          defaultVal: '3 Round Synthesis',
        },
        {
          id: 'guardrailStrictness',
          label: 'Persona Guardrails',
          options: ['Standard Prompting', 'Validated Self-Correction'],
          defaultVal: 'Validated Self-Correction',
        },
      ],
      evaluations: {
        '1 Round Exchange_Standard Prompting':
          '[Persona Sandbox: Analytical vs Intuitive]\nRound 1: Analytical raises structural risk objection. Intuitive counters with velocity argument. No synthesis reached.',
        '3 Round Synthesis_Validated Self-Correction':
          '[Persona Sandbox: Analytical vs Intuitive]\nRound 3: Analytical accepts prototype sandbox proposal while Intuitive concedes on telemetry requirements. Distinct voices fully maintained.',
        '5 Round Stress Test_Validated Self-Correction':
          '[Persona Sandbox: Analytical vs Intuitive]\nRound 5: High-tension stress test successfully avoids homogenization. Both personas reach a formal compromise document without voice bleed.',
      },
    },
  },
  {
    id: 'shadow-diary',
    title: 'The Shadow Diary: Socratic Cognitive Reframing',
    tagline: 'Empathetic affective computing pipeline detecting cognitive distortions and generating reflective questions.',
    focusArea: 'NLP & Affective Computing',
    status: 'Active Prototype',
    what:
      'An AI-assisted journaling system that analyzes user prose for emotional valence and cognitive distortions, providing Socratic reflective inquiries rather than prescriptive advice.',
    why:
      'Direct unsolicited AI advice often induces defensive resistance. In contrast, gentle Socratic inquiry encourages genuine self-reflection and therapeutic clarity.',
    how:
      'Combined sentiment analysis with pattern heuristic rules identifying common distortions (all-or-nothing thinking, overgeneralization) to dynamically generate targeted clarifying questions.',
    whatWasExplored:
      'Explored the delicate boundary between helpful psychological self-inquiry and medical overreach, testing prompts that maintain complete humility while fostering insight.',
    whatWasLearned:
      'Framing responses as curious questions ("What evidence might challenge that conclusion?") resulted in substantially longer, more thoughtful follow-up entries than analytical summaries.',
    technologies: ['Python', 'Sentiment Analysis', 'Cognitive Distortion Heuristics', 'Socratic Questioning'],
    relatedProjects: ['The Shadow Diary', 'Wat-EWrite'],
  },
  {
    id: 'ai-overlay',
    title: 'AI Overlay: Ambient Screen OCR & Context Extraction',
    tagline: 'Sub-second optical text recognition pipeline extracting on-screen text for rapid context synthesis.',
    focusArea: 'Desktop Automation & Vision OCR',
    status: 'Production Utility',
    what:
      'A low-friction desktop overlay daemon that captures screen bounding boxes via global hotkey, extracts text locally, and feeds it into instant explanation actions.',
    why:
      'Engineers and researchers constantly encounter uncopyable text inside video lectures, graphical dashboards, remote terminal windows, and non-selectable PDFs.',
    how:
      'Built a native keyboard hook daemon hooked into an optimized local OCR engine, followed by a lightweight overlay HUD displaying the clean text with instant copy and synthesis triggers.',
    whatWasExplored:
      'Investigated bounding box selection latency vs full-screen OCR overhead, pre-processing filters for code font readability, and multi-monitor coordinate normalization on Windows.',
    whatWasLearned:
      'Restricting OCR inference to the selected bounding box reduced total latency from 1.4 seconds to under 180 milliseconds, turning a sluggish workflow into an instant reflex.',
    technologies: ['Python', 'Tesseract / EasyOCR', 'Windows API Hooks', 'Tkinter / GUI Overlay'],
    relatedProjects: ['AI Overlay', 'PS Utility Suite'],
  },
  {
    id: 'legallm-intelligence',
    title: 'LegalLM: Document Clause Segmentation & Risk Extraction',
    tagline: 'Structural contract parsing pipeline identifying high-liability clauses and plain-language obligations.',
    focusArea: 'Document Intelligence & Applied NLP',
    status: 'Benchmarked System',
    what:
      'A specialized legal document intelligence platform that parses complex commercial contracts, extracts core obligations, and flags high-risk clauses for legal teams.',
    why:
      'Standard LLMs lose structural context when legal documents are fed as arbitrary token chunks, frequently hallucinating cross-clause references and misattributing terms.',
    how:
      'Developed a section-aware parser that recognizes legal headings, numbered subparagraphs, and schedules before sending focused clauses to specialized extraction models.',
    whatWasExplored:
      'Explored contract section hierarchy recovery from messy PDF scans, automated extraction of termination notice periods, and side-by-side risk visualization.',
    whatWasLearned:
      'Preserving document structural hierarchy is more impactful for extraction accuracy than simply increasing model parameter count or prompt length.',
    technologies: ['TypeScript', 'Node.js', 'React', 'PDF Extraction', 'Legal NLP'],
    relatedProjects: ['LegalLM', 'EquityEcho'],
  },
  {
    id: 'equity-echo-sentiment',
    title: 'EquityEcho: Earnings Tone & Sentiment Extraction',
    tagline: 'Financial disclosure parsing pipeline mapping executive commentary to quantified sentiment vectors.',
    focusArea: 'Financial NLP & Data Processing',
    status: 'Production System',
    what:
      'A text analysis engine that processes corporate earnings statements, investor transcripts, and financial disclosures to detect qualitative sentiment shifts.',
    why:
      'Executive communication often cloaks negative business trends in elaborate positive vocabulary; domain-specific extraction reveals underlying cautious sentiment.',
    how:
      'Utilized financial domain lexicons and targeted sentence parsing to identify forward-looking statements and weigh cautionary disclosures against standard optimistic remarks.',
    whatWasExplored:
      'Explored noise filtering across mandatory regulatory disclaimers and entity-level sentiment attribution for specific geographic or business segments.',
    whatWasLearned:
      'Filtering boilerplate boilerplate disclosures before scoring sentiment increases the predictive clarity of quarterly trend comparisons by over 40%.',
    technologies: ['Python', 'TypeScript', 'Financial Lexicons', 'Data Processing', 'React'],
    relatedProjects: ['EquityEcho', 'LegalLM'],
  },
];

// ============================================================================
// REAL RESEARCH DOSSIER RECORDS & RECOGNITION SIGNALS (Source: sobi.codes)
// ============================================================================
export const RESEARCH_RECORDS: ResearchRecordItem[] = [
  {
    id: 'res-doc-intelligence',
    title: 'Document Intelligence & Structural Clause Extraction',
    type: 'RESEARCH THREAD',
    domain: 'Document Intelligence / NLP',
    overview:
      'Investigation into preserving hierarchical section semantics and extracting high-stakes contractual liabilities from unstructured multi-page legal and commercial documents.',
    investigationDetails: [
      'Analysis of chunking failure modes: why fixed-window token slicing destroys cross-clause legal definitions.',
      'Implementation of structural boundary recognition that extracts clauses as coherent atomic units.',
      'Extraction methodologies for liability caps, indemnity triggers, and termination notice covenants.',
    ],
    keyOutcomes: [
      'Eliminated cross-clause hallucination in legal contract review pipelines.',
      'Demonstrated that document layout preservation is the primary driver of extraction precision.',
      'Formed the foundational architectural core of LegalLM.',
    ],
    artifactsAndTools: ['LegalLM Engine', 'Custom PDF AST Parsers', 'Entity Extraction Models'],
    signalBadge: 'Active Core Focus',
    dateOrEra: '2025',
  },
  {
    id: 'res-behavior-aware',
    title: 'Behavior-Aware Interfaces & Adaptive Persona Modeling',
    type: 'RESEARCH THREAD',
    domain: 'Behavioral AI / HCI',
    overview:
      'Exploring how computational agents can sustain coherent personality invariants and episodic memory over multi-session user relationships without persona drift.',
    investigationDetails: [
      'Separation of transient working context from persistent semantic and episodic memory records.',
      'Formulation of behavioral constraint vectors that regulate emotional tone, skepticism, and curiosity.',
      'Investigation into multi-agent dialogue degradation when two contrasting personas converse continuously.',
    ],
    keyOutcomes: [
      'Created persistent episodic memory schemas tested in Project AIC and PersonaVerse.',
      'Proved that multi-pass constraint validation prevents voice homogenization in multi-agent debriefs.',
      'Demonstrated non-intrusive reflective probing in The Shadow Diary.',
    ],
    artifactsAndTools: ['Project AIC', 'PersonaVerse', 'Vector Memory Store', 'State Machine Runtimes'],
    signalBadge: 'Cognitive Architecture',
  },
  {
    id: 'res-patent-publication',
    title: 'Patent Publication: System & Computational Innovations',
    type: 'PUBLICATION SIGNAL',
    domain: 'Intellectual Property / Systems',
    overview:
      'Official publication of patent intellectual property documenting technical methodologies and systems innovations designed by Sobi.',
    investigationDetails: [
      'Formal patent documentation specifying computational system architecture, algorithmic pipelines, and execution flows.',
      'Published in official patent journal verifying independent technical inventorship and novel industrial utility.',
    ],
    keyOutcomes: [
      'Verified intellectual property publication on record.',
      'Demonstrated formal engineering rigor and structural system design capabilities.',
    ],
    artifactsAndTools: ['Official Patent Gazette', 'Technical Claims Specification'],
    signalBadge: 'Verified Patent Signal',
  },
  {
    id: 'res-iit-ropar-honors',
    title: 'Technical Honors & AIFusion Recognition @ IIT Ropar',
    type: 'CONFERENCE SIGNAL',
    domain: 'Academic / Technical Competitions',
    overview:
      'Recognition and honors received at Indian Institute of Technology (IIT) Ropar across Tech Fest and the AIFusion initiative for applied AI engineering.',
    investigationDetails: [
      'Demonstrated applied AI prototypes and algorithmic implementations before academic faculties and technical evaluation panels.',
      'Evaluated on system architecture, practical feasibility, execution speed, and interface usability.',
    ],
    keyOutcomes: [
      'Recognition at IIT Ropar Tech Fest and AIFusion.',
      'Validation of applied AI methodologies within a premier engineering institution environment.',
    ],
    artifactsAndTools: ['IIT Ropar Evaluation Committee', 'AIFusion Showcase'],
    signalBadge: 'Academic Recognition',
  },
  {
    id: 'res-openxai-hacktoskill',
    title: 'OpenXAI Cohort (India Accelerator) & HacktoSkill 2025',
    type: 'TECHNICAL INVESTIGATION',
    domain: 'Accelerators & Competitive Engineering',
    overview:
      'Selected participant in the India Accelerator OpenXAI cohort and winner/finalist in the HacktoSkill 2025 competition for legal tech intelligence execution.',
    investigationDetails: [
      'Intensive engineering sprints validating LegalLM and applied AI architectures under rapid execution constraints.',
      'Iterative refinement of business utility, low-latency client interfaces, and real-world compliance workflows.',
    ],
    keyOutcomes: [
      'Inducted into India Accelerator OpenXAI Cohort (2025).',
      'Awarded recognition in HacktoSkill 2025 for legal document intelligence innovations.',
    ],
    artifactsAndTools: ['India Accelerator', 'OpenXAI Cohort', 'HacktoSkill 2025'],
    signalBadge: '2025 Cohort & Award',
    dateOrEra: '2025',
  },
  {
    id: 'res-applied-genai',
    title: 'Applied Generative AI Pipelines & Structured Verification',
    type: 'SYSTEM EXPLORATION',
    domain: 'Applied AI / Production Architecture',
    overview:
      'System design principles for transitioning probabilistic foundation models into deterministic, verified production software workflows.',
    investigationDetails: [
      'Enforcing strict output schemas to prevent runtime parsing crashes in client applications.',
      'Streaming token processing architectures coupled with immediate optimistic UI updates.',
      'Integration patterns bridging foundation model APIs (Gemini, open weights) with production web backends (Express, Node.js).',
    ],
    keyOutcomes: [
      'Deployed production architectures across RIGHT.LEFT, Wat-EWrite, and LegalLM.',
      'Demonstrated that interface ergonomics and reliable execution matter more than theoretical model scale.',
    ],
    artifactsAndTools: ['Express Backend', 'React 19 Client', 'Gemini API', 'Validation Schemas'],
    signalBadge: 'Engineering Principles',
  },
  {
    id: 'res-oddo-imc',
    title: 'Industry Conferences: ODDO Meet & IMC Conference',
    type: 'CONFERENCE SIGNAL',
    domain: 'Industry Dialogue / Telecommunications',
    overview:
      'Active participation in high-level technology assemblies including the ODDO Meet and the India Mobile Congress (IMC) Conference.',
    investigationDetails: [
      'Engaged with telecommunications leaders, enterprise technologists, and mobile ecosystem developers on emerging digital architectures.',
      'Explored intersections of edge mobile interfaces, cloud distribution, and national digital infrastructure.',
    ],
    keyOutcomes: [
      'Direct exposure to telecom scale and industrial deployment constraints.',
      'Cross-disciplinary insights informing low-bandwidth mobile UX in Sonar Thali and Wassap.',
    ],
    artifactsAndTools: ['ODDO Meet Assembly', 'India Mobile Congress (IMC)'],
    signalBadge: 'Industry Assembly',
  },
];

// ============================================================================
// REAL ARSENAL CAPABILITY TOPOLOGY (Interactive Nodes & Real Connections)
// ============================================================================
export const TOPOLOGY_NODES: TopologyNode[] = [
  // LANGUAGES
  {
    id: 'lang-python',
    name: 'Python',
    cluster: 'LANGUAGES',
    description: 'Core runtime for applied AI pipelines, OCR screen daemons, memory state engines, and data processing.',
    depth: 'Core Mastery',
    connectedNodes: ['ai-nlp', 'ai-behavior', 'sys-automation', 'app-desktop'],
    relatedProjects: ['Project AIC', 'AI Overlay', 'The Shadow Diary', 'EquityEcho', 'PS Utility Suite'],
  },
  {
    id: 'lang-typescript',
    name: 'TypeScript',
    cluster: 'LANGUAGES',
    description: 'Primary language for type-safe production web applications, reactive client interfaces, and Node.js backends.',
    depth: 'Core Mastery',
    connectedNodes: ['app-react', 'app-node', 'ai-nlp', 'app-next'],
    relatedProjects: ['LegalLM', 'RIGHT.LEFT', 'Wassap', 'EquityEcho', 'Sonar Thali', 'Wat-EWrite'],
  },
  {
    id: 'lang-javascript',
    name: 'JavaScript',
    cluster: 'LANGUAGES',
    description: 'DOM interaction, dynamic canvas manipulations, creative scripting, and rapid prototyping.',
    depth: 'Core Mastery',
    connectedNodes: ['app-react', 'sys-canvas', 'app-node'],
    relatedProjects: ['CosmicCanvas', 'Cosmos Anomaly', 'DevineClub'],
  },
  {
    id: 'lang-powershell',
    name: 'PowerShell',
    cluster: 'LANGUAGES',
    description: 'Operating system automation, batch developer tooling, environment bootstrapping, and script pipelines.',
    depth: 'Applied Production',
    connectedNodes: ['sys-automation', 'sys-cli'],
    relatedProjects: ['PS Utility Suite'],
  },
  {
    id: 'lang-java',
    name: 'Java',
    cluster: 'LANGUAGES',
    description: 'Object-oriented fundamentals, structured data architectures, and algorithmic systems engineering.',
    depth: 'Applied Production',
    connectedNodes: ['lang-python', 'sys-cli'],
    relatedProjects: ['Systems explorations'],
  },

  // AI / ML
  {
    id: 'ai-nlp',
    name: 'NLP & Document Analysis',
    cluster: 'AI / ML',
    description: 'Section-aware document parsing, entity recognition, risk extraction, and plain-language summarization.',
    depth: 'Core Mastery',
    connectedNodes: ['lang-python', 'lang-typescript', 'ai-genai', 'ai-behavior'],
    relatedProjects: ['LegalLM', 'EquityEcho', 'Wat-EWrite'],
  },
  {
    id: 'ai-genai',
    name: 'Generative AI Pipelines',
    cluster: 'AI / ML',
    description: 'Engineering multi-step foundation model pipelines with strict JSON schemas, streaming, and tool integrations.',
    depth: 'Core Mastery',
    connectedNodes: ['ai-nlp', 'app-react', 'app-node', 'lang-typescript'],
    relatedProjects: ['RIGHT.LEFT', 'LegalLM', 'Wat-EWrite'],
  },
  {
    id: 'ai-behavior',
    name: 'Behavior & Persona Modeling',
    cluster: 'AI / ML',
    description: 'State machine architectures enforcing personality constraints, persistent episodic memory, and tone boundaries.',
    depth: 'System Architecture',
    connectedNodes: ['lang-python', 'ai-nlp', 'app-desktop'],
    relatedProjects: ['Project AIC', 'PersonaVerse', 'The Shadow Diary'],
  },
  {
    id: 'ai-ocr',
    name: 'Computer Vision & Screen OCR',
    cluster: 'AI / ML',
    description: 'Bounding box screen capture hooks, localized OCR processing, and instantaneous context synthesis.',
    depth: 'Applied Production',
    connectedNodes: ['lang-python', 'sys-automation', 'app-desktop'],
    relatedProjects: ['AI Overlay'],
  },

  // APPLICATION DEVELOPMENT
  {
    id: 'app-react',
    name: 'React 19 & Modern Web',
    cluster: 'APPLICATION DEVELOPMENT',
    description: 'Fluid, accessible single-page web applications, custom state machines, responsive typography, and micro-interactions.',
    depth: 'Core Mastery',
    connectedNodes: ['lang-typescript', 'app-next', 'ai-genai', 'sys-tailwind'],
    relatedProjects: ['LegalLM', 'RIGHT.LEFT', 'Wassap', 'Shri Guru Kirpa', 'Sonar Thali', 'Inviter'],
  },
  {
    id: 'app-node',
    name: 'Node.js & Express',
    cluster: 'APPLICATION DEVELOPMENT',
    description: 'Lightweight REST APIs, streaming endpoints, authentication pipelines, and webhook handlers.',
    depth: 'Core Mastery',
    connectedNodes: ['lang-typescript', 'lang-javascript', 'app-react'],
    relatedProjects: ['RIGHT.LEFT', 'Wassap', 'LegalLM', 'GDC Diagnostic'],
  },
  {
    id: 'app-desktop',
    name: 'Electron & Desktop UIs',
    cluster: 'APPLICATION DEVELOPMENT',
    description: 'Cross-platform desktop tools combining web frontends with local system scripts and OS hooks.',
    depth: 'Applied Production',
    connectedNodes: ['lang-python', 'lang-javascript', 'sys-automation'],
    relatedProjects: ['PersonaVerse', 'AI Overlay'],
  },
  {
    id: 'sys-tailwind',
    name: 'Tailwind CSS & Design Systems',
    cluster: 'APPLICATION DEVELOPMENT',
    description: 'Tailored typography scales, custom responsive layouts, dark mode palettes, and design token architectures.',
    depth: 'Core Mastery',
    connectedNodes: ['app-react', 'lang-typescript'],
    relatedProjects: ['All web systems', 'Shri Guru Kirpa', 'RIGHT.LEFT'],
  },

  // SYSTEMS & TOOLING
  {
    id: 'sys-automation',
    name: 'Automation & CLI Pipelines',
    cluster: 'SYSTEMS & TOOLING',
    description: 'Deterministic scripts orchestrating batch tasks, developer environment bootstrapping, and desktop triggers.',
    depth: 'Core Mastery',
    connectedNodes: ['lang-powershell', 'lang-python', 'sys-cli'],
    relatedProjects: ['PS Utility Suite', 'AI Overlay'],
  },
  {
    id: 'sys-canvas',
    name: 'Canvas API & WebGL',
    cluster: 'SYSTEMS & TOOLING',
    description: 'Procedural particle rendering, dynamic shaders, mathematical graph layouts, and creative code canvases.',
    depth: 'Applied Production',
    connectedNodes: ['lang-javascript', 'app-react'],
    relatedProjects: ['CosmicCanvas', 'Cosmos Anomaly', 'Timeline Twist (V2)'],
  },
  {
    id: 'sys-cli',
    name: 'Modular System Architecture',
    cluster: 'SYSTEMS & TOOLING',
    description: 'Decoupled component contracts, clear separation of concerns, and reliable execution over fragile demos.',
    depth: 'System Architecture',
    connectedNodes: ['lang-python', 'lang-typescript', 'ai-behavior'],
    relatedProjects: ['Project AIC', 'LegalLM', 'PS Utility Suite'],
  },
];

// ============================================================================
// REAL JOURNEY COSMIC TIMELINE (Source: sobi.codes - honest dates & milestones)
// ============================================================================
export const COSMIC_MILESTONES: CosmicMilestone[] = [
  {
    id: 'openxai-2025',
    title: 'India Accelerator / OpenXAI Cohort',
    year: '2025',
    epoch: 'Current Horizon',
    category: 'Cohort',
    context: 'National AI Acceleration Initiative',
    summary:
      'Selected into the prestigious OpenXAI cohort by India Accelerator, engaging in focused AI product engineering and ecosystem mentorship.',
    significance:
      'Validation of applied AI systems capability and dedication to building scalable, market-ready AI platforms.',
    verifiedDetails: [
      'Official cohort selection in OpenXAI 2025 program',
      'Focused on applied AI productization and execution reliability',
      'Direct engagement with enterprise founders and tech mentors',
    ],
    celestialCoordinates: { sector: 'Alpha Sector · IA-2025', magnitude: 'Primary Star', anchorIndex: 0 },
  },
  {
    id: 'hacktoskill-2025',
    title: 'LegalLM / HacktoSkill Innovation Award',
    year: '2025',
    epoch: '2025 Inflection',
    category: 'Award & Recognition',
    context: 'National Competitive Hackathon',
    summary:
      'Recognized for LegalLM at HacktoSkill 2025, demonstrating real-world document intelligence that parses contracts and highlights liability risks.',
    significance:
      'Proved that targeted, structural legal document parsing creates immediate practical value for professional legal teams.',
    verifiedDetails: [
      'Awarded recognition for LegalLM implementation',
      'Showcased live contract clause extraction and plain-language summarization',
      'Praised for architectural clarity and high-speed user experience',
    ],
    celestialCoordinates: { sector: 'Vega Arc · HTS-2025', magnitude: 'High Luminescence', anchorIndex: 1 },
  },
  {
    id: 'patent-publication',
    title: 'Patent Publication: Computational Innovations',
    epoch: 'Foundational Landmark',
    category: 'Patent',
    context: 'Intellectual Property Journal',
    summary:
      'Official publication of a patent relating to novel technical systems and computational execution workflows designed by Sobi.',
    significance:
      'Establishes formal inventorship and rigorous technical design methodology beyond typical web application development.',
    verifiedDetails: [
      'Official patent journal publication on record',
      'Rigorous claims defining system architecture and computational logic',
      'Demonstrated commitment to foundational engineering research',
    ],
    celestialCoordinates: { sector: 'Sirius Horizon · IP-SYS', magnitude: 'Guiding Light', anchorIndex: 2 },
  },
  {
    id: 'aifusion-iit-ropar',
    title: 'AIFusion Honors @ IIT Ropar',
    epoch: 'Academic Crucible',
    category: 'Academic',
    context: 'Indian Institute of Technology (IIT) Ropar',
    summary:
      'Honored at IIT Ropar during the AIFusion initiative for applied machine learning prototypes and algorithmic problem-solving.',
    significance:
      'Demonstrated applied AI competence in front of premier institutional faculties and competitive collegiate peers.',
    verifiedDetails: [
      'Showcased applied machine learning systems to university evaluation panels',
      'Recognized for practical utility and clean algorithmic structure',
      'Strengthened ties to academic research rigor',
    ],
    celestialCoordinates: { sector: 'Pleiades Cluster · IIT-R', magnitude: 'Cluster Anchor', anchorIndex: 3 },
  },
  {
    id: 'techfest-iit-ropar',
    title: 'Tech Fest IIT Ropar Recognition',
    epoch: 'Competitive Benchmark',
    category: 'Award & Recognition',
    context: 'IIT Ropar Annual Technology Assembly',
    summary:
      'Achieved distinction and competitive recognition at IIT Ropar Tech Fest across software engineering and technical design tracks.',
    significance:
      'Showcased rapid problem-solving, clean code architecture, and high-pressure execution among top engineering students.',
    verifiedDetails: [
      'Podium recognition at IIT Ropar annual Tech Fest',
      'Evaluated on architectural resilience and software craft',
      'Built and demonstrated solutions under intense competitive timelines',
    ],
    celestialCoordinates: { sector: 'Orion Belt · TF-IIT', magnitude: 'Binary Star', anchorIndex: 4 },
  },
  {
    id: 'hackathons-ideathons',
    title: 'Competitive Hackathons & Ideathons',
    epoch: 'Continuous Arena',
    category: 'Hackathon',
    context: 'National & Collegiate Technical Sprints',
    summary:
      'Consistently competed and earned accolades across multiple regional and national hackathons and ideathons.',
    significance:
      'Iterative crucible that developed rapid-prototyping mastery, full-stack stamina, and complete end-to-end execution skills.',
    verifiedDetails: [
      'Multiple podium and finalist positions across diverse technical sprints',
      'Authored prototypes spanning web apps, desktop utilities, and AI pipelines',
      'Refined instinct for eliminating unnecessary fluff in favor of core working loops',
    ],
    celestialCoordinates: { sector: 'Cygnus Stream · HACK-ID', magnitude: 'Diffuse Nebula', anchorIndex: 5 },
  },
  {
    id: 'oddo-meet',
    title: 'ODDO Meet Industry Participation',
    epoch: 'Industry Dialogue',
    category: 'Conference',
    context: 'Selected Developer Gathering',
    summary:
      'Invited participant in the ODDO Meet, exchanging technical strategies with industry developers and technology creators.',
    significance:
      'Expanded understanding of real-world enterprise requirements, deployment constraints, and software sustainability.',
    verifiedDetails: [
      'Participated in focused developer panels and collaborative roundtables',
      'Discussed modern AI integration patterns and developer workflows',
      'Formed lasting peer connections across technical disciplines',
    ],
    celestialCoordinates: { sector: 'Cassiopeia Rift · ODDO', magnitude: 'Pulsar Node', anchorIndex: 6 },
  },
  {
    id: 'imc-conference',
    title: 'India Mobile Congress (IMC) Participation',
    epoch: 'Macro Telecommunications',
    category: 'Conference',
    context: 'India Mobile Congress Assembly',
    summary:
      'Participated in India Mobile Congress (IMC), exploring telecommunication backbones, digital public infrastructure, and edge mobile technology.',
    significance:
      'Gained deep perspective on how software must perform across varying network qualities and diverse mobile hardware tiers.',
    verifiedDetails: [
      'Explored national-scale digital infrastructure and mobile telecommunications',
      'Witnessed cutting-edge edge compute, 5G deployments, and hardware prototypes',
      'Directly informed the low-latency lightweight philosophy behind Wassap and Sonar Thali',
    ],
    celestialCoordinates: { sector: 'Polaris Gateway · IMC-CONF', magnitude: 'Beacon Star', anchorIndex: 7 },
  },
];

// ============================================================================
// REAL ABOUT LIVING DOSSIER (Human Prose, Authentic Positioning, Real Themes)
// ============================================================================
export const ABOUT_DOSSIER: AboutDossier = {
  name: 'Sobi',
  handle: '@sobiswriter',
  role: 'AI / ML Developer & Researcher',
  location: 'India',
  timezone: 'IST (UTC+05:30)',
  coordinates: '28.6139° N, 77.2090° E',
  status: 'Building applied AI systems & creative tooling',
  positioning: [
    'AI / ML Systems',
    'Applied AI Platforms',
    'Document Intelligence',
    'Behavior-Aware Interfaces',
    'Creative & Systems Tooling',
  ],
  manifestoStatement:
    'Building applied AI systems and complete usable products rather than merely demos.',
  narrativeParagraphs: [
    'I am an AI/ML developer and researcher focused on bridging foundational intelligence with usable, reliable software. Most discussions around modern artificial intelligence focus exclusively on model scale and benchmark scores. In practice, the real bottleneck is system architecture: how models ingest unstructured human context, how they maintain behavioral consistency, and whether the interface respects the person sitting on the other side of the screen.',
    'My work centers on three interconnected disciplines: Document Intelligence, where dense legal and commercial documents are parsed into actionable structural insights; Behavior-Aware Interfaces, where AI personas sustain episodic memory and explicit temperament guardrails rather than amnesiac conversational turns; and Applied Tooling, creating ultra-responsive web applications, desktop automation daemons, and developer utilities that solve concrete human problems.',
    'I believe that craftsmanship lives in the details. A legal analysis engine that hallucinates one indemnity clause is useless; an AI desktop overlay that takes two seconds to appear is abandoned. By designing complete, robust systems—from custom backend parsers to fluid, distraction-free typography—I aim to build software that feels inevitable, dependable, and quietly powerful.',
  ],
  engineeringAxioms: [
    {
      number: '01',
      title: 'Systems Over Demos',
      thesis: 'A working prototype that fails under edge cases is a toy; an applied system handles messy reality.',
      context:
        'It is trivial to build a 20-line demo that works on cherry-picked inputs. Real engineering begins when documents have malformed tables, user connections drop, or models attempt to hallucinate beyond their bounded jurisdiction.',
    },
    {
      number: '02',
      title: 'Structure Precedes Intelligence',
      thesis: 'Preserving document and conversational structure yields greater gains than blind model scale.',
      context:
        'In LegalLM and EquityEcho, understanding document section hierarchy and sentence grammar reduced extraction errors far more effectively than throwing larger foundation models at flat text dumps.',
    },
    {
      number: '03',
      title: 'Behavior Demands Invariants',
      thesis: 'Autonomous agents must operate under explicit constraints rather than hopeful prompting.',
      context:
        'In Project AIC and PersonaVerse, long-horizon conversational fidelity is achieved through structured memory separation and rigorous state validation, not through massive, fragile single system prompts.',
    },
    {
      number: '04',
      title: 'Friction Is The Ultimate Enemy',
      thesis: 'If an engineering tool is not instantaneous, it will not be adopted into daily reflex.',
      context:
        'Tools like AI Overlay and PS Utility Suite are built with sub-second response times and minimal keystroke requirements so they become subconscious extensions of thought rather than deliberate interruptions.',
    },
  ],
  currentExplorations: [
    'Document Intelligence architectures parsing hierarchical contract subclauses',
    'Episodic memory decay algorithms for long-running conversational assistants',
    'Localized OCR pipelines running entirely offline on modest hardware',
    'High-performance typography and fluid WebGL rendering on the modern web',
  ],
  offlinePursuits: [
    'Reading foundational systems and cognitive papers',
    'Exploring algorithmic generative geometry and creative coding',
    'Refining personal desktop automation workflows and script libraries',
  ],
};

// ============================================================================
// REAL BEYOND TRANSMISSION & EGRESS DATA (Verified Channels: sobi.codes)
// ============================================================================
export const BEYOND_DATA: BeyondData = {
  transmissionHeader: 'TRANSMISSION PROTOCOL · DIMENSIONAL EGRESS TERMINAL',
  terminalStatus: 'TRANSMISSION READY · ALL CHANNELS ACTIVE',
  email: 'sobi@sobi.codes',
  channels: [
    {
      name: 'GitHub',
      handle: 'sobiswriter',
      url: 'https://github.com/sobiswriter',
      protocol: 'GIT / PUBLIC CODE REPOSITORIES',
      note: 'Open-source code repositories, utilities, and public build branches.',
    },
    {
      name: 'LinkedIn',
      handle: 'Sobi',
      url: 'https://www.linkedin.com/in/sobi',
      protocol: 'HTTPS / PROFESSIONAL NETWORK',
      note: 'Professional trajectory, technical updates, and collaborative inquiries.',
    },
    {
      name: 'Portfolio Portal',
      handle: 'sobi.codes',
      url: 'https://sobi.codes',
      protocol: 'WEB / CANONICAL IDENTITY PORTAL',
      note: 'Canonical home domain hosting verified projects and technical dossier.',
    },
    {
      name: 'Direct Transmission',
      handle: 'sobi@sobi.codes',
      url: 'mailto:sobi@sobi.codes',
      protocol: 'SMTP / DIRECT EMAIL DISPATCH',
      note: 'Direct professional communication for collaborative projects and technical roles.',
    },
  ],
  curriculumVitae: {
    summary:
      'AI/ML-focused developer and researcher specializing in Applied AI Systems, Document Intelligence, Behavior-Aware Interfaces, and Complete Usable Software.',
    coreCompetencies: [
      'Document Intelligence & Contract Clause Extraction (LegalLM)',
      'Behavior Modeling, Memory Architectures & Persona Logic (Project AIC, PersonaVerse)',
      'Full-Stack Applied AI & Web Architecture (React 19, TypeScript, Node.js, Express, Gemini API)',
      'Desktop Utilities, Local OCR & Automation (Python, PowerShell, OS Hooks)',
      'Generative Writing & Editorial Tooling (RIGHT.LEFT, Wat-EWrite)',
    ],
    verifiedSignals: [
      'India Accelerator / OpenXAI Cohort 2025',
      'LegalLM / HacktoSkill 2025 Innovation Award',
      'Patent Publication (Computational & Systems Innovation)',
      'Technical Honors @ IIT Ropar (AIFusion & Tech Fest)',
      'Industry Dialogue: ODDO Meet & India Mobile Congress (IMC)',
    ],
    resumeDownloadAvailable: true,
  },
};
