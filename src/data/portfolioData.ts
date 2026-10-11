// Content reconciled against sobi.codes and sobiswriter/Me-Protfolio. See docs/content-sources.md.
import type {UniverseMeta, ProjectItem, AiLabExperiment, ResearchRecordItem, TopologyNode, CosmicMilestone, AboutDossier, BeyondData} from '../types/universe';

export const UNIVERSES_META: UniverseMeta[] = [
  {
    "id": "arrival",
    "indexStr": "00",
    "name": "Overview",
    "title": "Overview",
    "tagline": "Souradip Biswas · AI/ML developer and independent builder.",
    "concept": "The threshold",
    "hash": "arrival"
  },
  {
    "id": "builder",
    "indexStr": "01",
    "name": "Projects",
    "title": "Projects",
    "tagline": "Applied AI, web applications, desktop software, and creative tools.",
    "concept": "The workshop",
    "hash": "builder"
  },
  {
    "id": "ai-lab",
    "indexStr": "02",
    "name": "AI & Experiments",
    "title": "AI & Experiments",
    "tagline": "Document intelligence, generative AI, and behavior-aware interfaces.",
    "concept": "The observatory",
    "hash": "ai-lab"
  },
  {
    "id": "research",
    "indexStr": "03",
    "name": "Research & Publications",
    "title": "Research & Publications",
    "tagline": "Research interests, patent publication, and conference participation.",
    "concept": "The archive",
    "hash": "research"
  },
  {
    "id": "arsenal",
    "indexStr": "04",
    "name": "Technical Skills",
    "title": "Technical Skills",
    "tagline": "Languages, AI tools, application development, and automation.",
    "concept": "The tool room",
    "hash": "arsenal"
  },
  {
    "id": "journey",
    "indexStr": "05",
    "name": "Experience & Recognition",
    "title": "Experience & Recognition",
    "tagline": "Collaborations, programs, achievements, and learning milestones.",
    "concept": "The long way here",
    "hash": "journey"
  },
  {
    "id": "about",
    "indexStr": "06",
    "name": "About Me",
    "title": "About Me",
    "tagline": "The person, interests, and approach behind the work.",
    "concept": "The quiet room",
    "hash": "about"
  },
  {
    "id": "beyond",
    "indexStr": "07",
    "name": "Contact & Résumé",
    "title": "Contact & Résumé",
    "tagline": "Get in touch, find professional profiles, and access the résumé.",
    "concept": "The open road",
    "hash": "beyond"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    "id": "legallm",
    "title": "LegalLM",
    "tagline": "Featured Flagship Project",
    "category": "Document Intelligence",
    "role": "AI Application",
    "problem": "An AI platform for uploading, parsing, and analyzing legal documents.",
    "architecture": [
      "Uses LLM workflows to surface key clauses, risks, and concise summaries for faster legal review."
    ],
    "keyFeatures": [],
    "stack": [
      "TypeScript",
      "AI/NLP Stack",
      "Next.js"
    ],
    "githubUrl": "https://github.com/sobiswriter/LegalLM",
    "liveUrl": "https://legal-lmx24-git-main-sobiswriters-projects.vercel.app/",
    "featured": true,
    "status": "Featured Project",
    "executionEnvironment": "AI Application"
  },
  {
    "id": "project-aic",
    "title": "Project AIC",
    "tagline": "Core Long-term Personal Project",
    "category": "Applied AI",
    "role": "AI Bot / System",
    "problem": "A Python-based intelligent bot system exploring behavior and decision logic.",
    "architecture": [
      "Investigates long-term memory, adaptive responses, and personality-oriented interaction design."
    ],
    "keyFeatures": [],
    "stack": [
      "Python",
      "PyTorch",
      "Transformers"
    ],
    "githubUrl": "https://github.com/sobiswriter/Project-AIC",
    "featured": false,
    "status": "Long-term Project",
    "executionEnvironment": "AI Bot / System"
  },
  {
    "id": "right-left",
    "title": "RIGHT.LEFT Digital & Video Production Agency",
    "tagline": "Elite digital engineering and motion creative platform.",
    "category": "Applied AI",
    "role": "Digital Agency Platform",
    "problem": "A production-grade agency platform with an editorial visual system and React 19 architecture.",
    "architecture": [
      "Includes an Express API layer and Gemini-powered server intelligence for fast RFP scoping and lead qualification."
    ],
    "keyFeatures": [],
    "stack": [
      "React 19",
      "Express",
      "Gemini AI",
      "Headless E-commerce",
      "SaaS"
    ],
    "liveUrl": "https://rightleft.ai.studio/",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Digital Agency Platform"
  },
  {
    "id": "wassap",
    "title": "Wassap",
    "tagline": "WhatsApp Clone with AI Integration",
    "category": "Commercial & Web",
    "role": "Real-time Communication",
    "problem": "A real-time messaging app inspired by WhatsApp with built-in AI assistance.",
    "architecture": [
      "Includes live chat, responsive UI patterns, and integrated assistant workflows for faster communication."
    ],
    "keyFeatures": [],
    "stack": [
      "TypeScript",
      "Next.js",
      "AI Integration",
      "WebSocket"
    ],
    "githubUrl": "https://github.com/sobiswriter/Wassap",
    "liveUrl": "https://wassap-rho.vercel.app/",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Real-time Communication"
  },
  {
    "id": "equity-echo",
    "title": "EquityEcho",
    "tagline": "Stock Market Prediction Platform",
    "category": "Document Intelligence",
    "role": "FinTech / AI Application",
    "problem": "An AI-assisted platform for stock analysis, trend tracking, and market prediction.",
    "architecture": [
      "Combines ML-based forecasting with interactive financial views to support better trading and portfolio decisions."
    ],
    "keyFeatures": [],
    "stack": [
      "TypeScript",
      "Next.js",
      "ML Models",
      "Financial APIs"
    ],
    "githubUrl": "https://github.com/sobiswriter/EquityEcho-Stocks-Predictor",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "FinTech / AI Application"
  },
  {
    "id": "shri-guru-kirpa",
    "title": "Shri Guru Kirpa Gold Platters And Jewellers",
    "tagline": "Modern jewellery catalog and customer experience for Shri Guru Kirpa Gold Platters And Jewellers in Phagwara, Punjab.",
    "category": "Commercial & Web",
    "role": "Luxury E-commerce Website",
    "problem": "A premium jewellery storefront with catalog browsing, virtual try-on, and appointment booking.",
    "architecture": [
      "Balances high-end visual design with practical discovery flows, store information, and concierge-style guidance."
    ],
    "keyFeatures": [],
    "stack": [
      "React",
      "Vite",
      "E-commerce",
      "AI Concierge"
    ],
    "liveUrl": "https://guru-kripa-jwellers.vercel.app/",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Luxury E-commerce Website"
  },
  {
    "id": "sonar-thali",
    "title": "Sonar Thali Food Commerce App",
    "tagline": "Food commerce app for showcasing products and serving customers.",
    "category": "Commercial & Web",
    "role": "Food Commerce Application",
    "problem": "A customer-facing storefront for discovering menu offerings and placing orders.",
    "architecture": [
      "Designed around clear product discovery and smooth purchase flows for food-focused commerce experiences."
    ],
    "keyFeatures": [],
    "stack": [
      "TypeScript",
      "Next.js",
      "React",
      "E-commerce"
    ],
    "githubUrl": "https://github.com/sobiswriter/Sonar-Thali-Food-Commerce-App",
    "liveUrl": "https://sonar-thali.vercel.app",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Food Commerce Application"
  },
  {
    "id": "wat-ewrite",
    "title": "Wat-EWrite",
    "tagline": "Blogging site example and personal blogging platform.",
    "category": "Creative Tooling",
    "role": "Blogging Platform",
    "problem": "A clean platform for publishing, reading, and showcasing long-form writing.",
    "architecture": [
      "Built as both a personal blog and a reference implementation focused on readable layouts and smooth content publishing."
    ],
    "keyFeatures": [],
    "stack": [
      "TypeScript",
      "Next.js",
      "React",
      "Vercel"
    ],
    "githubUrl": "https://github.com/sobiswriter/Wat-EWrite",
    "liveUrl": "https://wat-e-write.vercel.app",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Blogging Platform"
  },
  {
    "id": "gdc-diagnostic",
    "title": "GDC Diagnostic Center",
    "tagline": "Official diagnostic and pathology web portal for GDC Diagnostic Center, Benad Road, Jaipur, Rajasthan.",
    "category": "Commercial & Web",
    "role": "Healthcare Web Application",
    "problem": "A 24×7 diagnostic center web portal for services, center information, and patient-facing workflows.",
    "architecture": [
      "Built to present pathology offerings clearly while supporting day-to-day operational and management needs."
    ],
    "keyFeatures": [],
    "stack": [
      "React",
      "Vite",
      "Healthcare",
      "Management System"
    ],
    "liveUrl": "https://gdc-site.vercel.app/",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Healthcare Web Application"
  },
  {
    "id": "devineclub",
    "title": "DevineClub",
    "tagline": "AIFusion IIT Ropar Hackathon",
    "category": "Commercial & Web",
    "role": "Competition Project",
    "problem": "An AI application built for AIFusion at IIT Ropar under hackathon constraints.",
    "architecture": [
      "Focused on practical architecture, fast iteration, and real-world problem solving in a competition setting."
    ],
    "keyFeatures": [],
    "stack": [
      "TypeScript",
      "Next.js",
      "AI/ML Stack",
      "Competition-Ready"
    ],
    "githubUrl": "https://github.com/sobiswriter/DevineClub",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Competition Project"
  },
  {
    "id": "cosmic-canvas",
    "title": "CosmicCanvas",
    "tagline": "Generative Art & Color Playground",
    "category": "Creative Tooling",
    "role": "Experimental UI",
    "problem": "An interactive canvas for experimenting with generative color and motion.",
    "architecture": [
      "Explores WebGL rendering, procedural strokes, and responsive visual interaction patterns."
    ],
    "keyFeatures": [],
    "stack": [
      "JavaScript",
      "WebGL",
      "Canvas API"
    ],
    "githubUrl": "https://github.com/sobiswriter/CosmicCanvas",
    "liveUrl": "https://sobiswriter.github.io/CosmicCanvas/",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Experimental UI"
  },
  {
    "id": "the-shadow-diary",
    "title": "The Shadow Diary",
    "tagline": "Psychological AI Tool",
    "category": "Applied AI",
    "role": "AI Journaling",
    "problem": "An AI-assisted journal that rewrites and reframes entries using psychological themes.",
    "architecture": [
      "Turns raw notes into structured reflections with guided interpretation and a focused writing interface."
    ],
    "keyFeatures": [
      "Inspired by psychological and Jungian themes."
    ],
    "stack": [
      "TypeScript",
      "Next.js",
      "OpenAI API"
    ],
    "githubUrl": "https://github.com/sobiswriter/The-Shadow-Diary",
    "liveUrl": "https://the-shadow-diary.vercel.app/",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "AI Journaling"
  },
  {
    "id": "personaverse",
    "title": "PersonaVerse",
    "tagline": "Interactive Playground",
    "category": "Applied AI",
    "role": "Desktop AI App",
    "problem": "A desktop playground for creating and chatting with AI-driven personas.",
    "architecture": [
      "Supports character profiles, behavior constraints, and real-time conversational simulation."
    ],
    "keyFeatures": [],
    "stack": [
      "Node.js",
      "Electron",
      "React"
    ],
    "githubUrl": "https://github.com/sobiswriter/PersonaVerse",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Desktop AI App"
  },
  {
    "id": "ai-overlay",
    "title": "AI Overlay",
    "tagline": "Productivity Tool",
    "category": "Systems & Utilities",
    "role": "Desktop Utility",
    "problem": "A lightweight desktop overlay for quick, context-aware AI assistance.",
    "architecture": [
      "Runs as a smart on-screen layer to help with fast lookups and productivity tasks."
    ],
    "keyFeatures": [],
    "stack": [
      "Python",
      "Tkinter",
      "OCR"
    ],
    "githubUrl": "https://github.com/sobiswriter/AI-Overlay",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Desktop Utility"
  },
  {
    "id": "inviter",
    "title": "Inviter",
    "tagline": "Event Management",
    "category": "Commercial & Web",
    "role": "Web Application",
    "problem": "An invitation management app with automated SMS and email workflows.",
    "architecture": [
      "Streamlines RSVPs through reminders, follow-ups, and real-time guest tracking dashboards."
    ],
    "keyFeatures": [],
    "stack": [
      "Node.js",
      "Next.js",
      "Twilio",
      "SMTP"
    ],
    "githubUrl": "https://github.com/sobiswriter/Inviter",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Web Application"
  },
  {
    "id": "business-venture-app",
    "title": "Business Venture App",
    "tagline": "Enterprise Solution",
    "category": "Commercial & Web",
    "role": "Desktop Application",
    "problem": "A business desktop app for financial tracking, reporting, and internal operations.",
    "architecture": [
      "Includes account management, invoice PDF generation, and cash-flow visibility tools."
    ],
    "keyFeatures": [],
    "stack": [
      "Node.js",
      "Electron",
      "SQLite"
    ],
    "githubUrl": "https://github.com/sobiswriter/Business-Venture-App",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Desktop Application"
  },
  {
    "id": "cosmos-anomaly",
    "title": "Cosmos Anomaly",
    "tagline": "Narrative Engine",
    "category": "Creative Tooling",
    "role": "Experimental System",
    "problem": "A narrative-driven system exploring timeline manipulation and anomaly logic.",
    "architecture": [
      "Users influence branching timelines, with graph-based state management driving ripple effects."
    ],
    "keyFeatures": [],
    "stack": [
      "TypeScript",
      "WebGL",
      "State Machines"
    ],
    "githubUrl": "https://github.com/sobiswriter/Cosmos-Anomaly",
    "liveUrl": "https://cosmos-anomaly.vercel.app/",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Experimental System"
  },
  {
    "id": "timeline-twist-v2",
    "title": "Timeline Twist (V2)",
    "tagline": "System Refactor",
    "category": "Creative Tooling",
    "role": "Iterative System",
    "problem": "The second iteration of a timeline system with a cleaner architecture.",
    "architecture": [
      "Refactors the core engine for better performance and support for deep branching paths."
    ],
    "keyFeatures": [],
    "stack": [
      "TypeScript",
      "React",
      "Redux"
    ],
    "githubUrl": "https://github.com/sobiswriter/TimeLine-Twist-V2",
    "liveUrl": "https://time-line-twist-v2.vercel.app/",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Iterative System"
  },
  {
    "id": "ps-utility-suite",
    "title": "PS Utility Suite",
    "tagline": "DevOps / Scripting",
    "category": "Systems & Utilities",
    "role": "Automation Tool Collection",
    "problem": "A PowerShell toolkit for scripting, scheduling, scraping, and routine automation.",
    "architecture": [
      "Designed for Windows power users to automate repetitive operations and system-level tasks."
    ],
    "keyFeatures": [
      "Web scraping and scheduling modules.",
      "Stopwatch utilities and image editing tools."
    ],
    "stack": [
      "PowerShell",
      ".NET"
    ],
    "githubUrl": "https://github.com/sobiswriter/PowerShell-Utility-Suite",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Automation Tool Collection"
  }
];

export const AI_LAB_EXPERIMENTS: AiLabExperiment[] = [
  {
    "id": "legallm",
    "title": "LegalLM",
    "tagline": "Featured Flagship Project",
    "focusArea": "AI Application",
    "what": "An AI platform for uploading, parsing, and analyzing legal documents.",
    "why": "An AI platform for uploading, parsing, and analyzing legal documents.",
    "how": "Uses LLM workflows to surface key clauses, risks, and concise summaries for faster legal review.",
    "whatWasExplored": "Uses LLM workflows to surface key clauses, risks, and concise summaries for faster legal review.",
    "whatWasLearned": "An AI platform for uploading, parsing, and analyzing legal documents.",
    "technologies": [
      "TypeScript",
      "AI/NLP Stack",
      "Next.js"
    ],
    "relatedProjects": [
      "legallm"
    ],
    "status": "Featured Project"
  },
  {
    "id": "project-aic",
    "title": "Project AIC",
    "tagline": "Core Long-term Personal Project",
    "focusArea": "AI Bot / System",
    "what": "A Python-based intelligent bot system exploring behavior and decision logic.",
    "why": "A Python-based intelligent bot system exploring behavior and decision logic.",
    "how": "Investigates long-term memory, adaptive responses, and personality-oriented interaction design.",
    "whatWasExplored": "Investigates long-term memory, adaptive responses, and personality-oriented interaction design.",
    "whatWasLearned": "A Python-based intelligent bot system exploring behavior and decision logic.",
    "technologies": [
      "Python",
      "PyTorch",
      "Transformers"
    ],
    "relatedProjects": [
      "project-aic"
    ],
    "status": "Long-term Project"
  },
  {
    "id": "equity-echo",
    "title": "EquityEcho",
    "tagline": "Stock Market Prediction Platform",
    "focusArea": "FinTech / AI Application",
    "what": "An AI-assisted platform for stock analysis, trend tracking, and market prediction.",
    "why": "An AI-assisted platform for stock analysis, trend tracking, and market prediction.",
    "how": "Combines ML-based forecasting with interactive financial views to support better trading and portfolio decisions.",
    "whatWasExplored": "Combines ML-based forecasting with interactive financial views to support better trading and portfolio decisions.",
    "whatWasLearned": "An AI-assisted platform for stock analysis, trend tracking, and market prediction.",
    "technologies": [
      "TypeScript",
      "Next.js",
      "ML Models",
      "Financial APIs"
    ],
    "relatedProjects": [
      "equity-echo"
    ],
    "status": "Portfolio Project"
  },
  {
    "id": "the-shadow-diary",
    "title": "The Shadow Diary",
    "tagline": "Psychological AI Tool",
    "focusArea": "AI Journaling",
    "what": "An AI-assisted journal that rewrites and reframes entries using psychological themes.",
    "why": "An AI-assisted journal that rewrites and reframes entries using psychological themes.",
    "how": "Turns raw notes into structured reflections with guided interpretation and a focused writing interface.",
    "whatWasExplored": "Turns raw notes into structured reflections with guided interpretation and a focused writing interface.",
    "whatWasLearned": "An AI-assisted journal that rewrites and reframes entries using psychological themes.",
    "technologies": [
      "TypeScript",
      "Next.js",
      "OpenAI API"
    ],
    "relatedProjects": [
      "the-shadow-diary"
    ],
    "status": "Portfolio Project"
  },
  {
    "id": "personaverse",
    "title": "PersonaVerse",
    "tagline": "Interactive Playground",
    "focusArea": "Desktop AI App",
    "what": "A desktop playground for creating and chatting with AI-driven personas.",
    "why": "A desktop playground for creating and chatting with AI-driven personas.",
    "how": "Supports character profiles, behavior constraints, and real-time conversational simulation.",
    "whatWasExplored": "Supports character profiles, behavior constraints, and real-time conversational simulation.",
    "whatWasLearned": "A desktop playground for creating and chatting with AI-driven personas.",
    "technologies": [
      "Node.js",
      "Electron",
      "React"
    ],
    "relatedProjects": [
      "personaverse"
    ],
    "status": "Portfolio Project"
  },
  {
    "id": "ai-overlay",
    "title": "AI Overlay",
    "tagline": "Productivity Tool",
    "focusArea": "Desktop Utility",
    "what": "A lightweight desktop overlay for quick, context-aware AI assistance.",
    "why": "A lightweight desktop overlay for quick, context-aware AI assistance.",
    "how": "Runs as a smart on-screen layer to help with fast lookups and productivity tasks.",
    "whatWasExplored": "Runs as a smart on-screen layer to help with fast lookups and productivity tasks.",
    "whatWasLearned": "A lightweight desktop overlay for quick, context-aware AI assistance.",
    "technologies": [
      "Python",
      "Tkinter",
      "OCR"
    ],
    "relatedProjects": [
      "ai-overlay"
    ],
    "status": "Portfolio Project"
  }
];

export const RESEARCH_RECORDS: ResearchRecordItem[] = [
  {
    "id": "document-intelligence",
    "title": "Document Intelligence",
    "type": "SYSTEM EXPLORATION",
    "domain": "Document analysis & NLP",
    "overview": "An AI platform for uploading, parsing, and analyzing legal documents.",
    "investigationDetails": [
      "Uses LLM workflows to surface key clauses, risks, and concise summaries for faster legal review."
    ],
    "keyOutcomes": [],
    "artifactsAndTools": [
      "TypeScript",
      "AI/NLP Stack",
      "Next.js"
    ]
  },
  {
    "id": "behavior-persona",
    "title": "Persona, Identity & Behavior Modeling",
    "type": "SYSTEM EXPLORATION",
    "domain": "Behavior-aware interfaces",
    "overview": "A Python-based intelligent bot system exploring behavior and decision logic. A desktop playground for creating and chatting with AI-driven personas.",
    "investigationDetails": [
      "Investigates long-term memory, adaptive responses, and personality-oriented interaction design.",
      "Supports character profiles, behavior constraints, and real-time conversational simulation."
    ],
    "keyOutcomes": [],
    "artifactsAndTools": [
      "Python",
      "PyTorch",
      "Transformers",
      "Node.js",
      "Electron",
      "React"
    ]
  },
  {
    "id": "generative-writing",
    "title": "Generative AI & Writing",
    "type": "SYSTEM EXPLORATION",
    "domain": "AI-assisted rewriting",
    "overview": "An AI-assisted journal that rewrites and reframes entries using psychological themes.",
    "investigationDetails": [
      "Turns raw notes into structured reflections with guided interpretation and a focused writing interface."
    ],
    "keyOutcomes": [],
    "artifactsAndTools": [
      "TypeScript",
      "Next.js",
      "OpenAI API"
    ]
  },
  {
    "id": "creative-tooling",
    "title": "Creative & Systems Tooling",
    "type": "SYSTEM EXPLORATION",
    "domain": "Interfaces and automation",
    "overview": "An interactive canvas for experimenting with generative color and motion. A lightweight desktop overlay for quick, context-aware AI assistance. A PowerShell toolkit for scripting, scheduling, scraping, and routine automation.",
    "investigationDetails": [
      "Explores WebGL rendering, procedural strokes, and responsive visual interaction patterns.",
      "Runs as a smart on-screen layer to help with fast lookups and productivity tasks.",
      "Designed for Windows power users to automate repetitive operations and system-level tasks."
    ],
    "keyOutcomes": [],
    "artifactsAndTools": [
      "JavaScript",
      "WebGL",
      "Canvas API",
      "Python",
      "Tkinter",
      "OCR",
      "PowerShell",
      ".NET"
    ]
  },
  {
    "id": "patent",
    "title": "Patent Publication (IPR)",
    "type": "PUBLICATION SIGNAL",
    "domain": "Applied research",
    "overview": "Published a patent demonstrating original technical innovation and applied research.",
    "investigationDetails": [
      "Patent publication is listed in the previous portfolio."
    ],
    "keyOutcomes": [],
    "artifactsAndTools": [],
    "signalBadge": "Patent publication"
  },
  {
    "id": "conferences",
    "title": "Conference Participation",
    "type": "CONFERENCE SIGNAL",
    "domain": "Industry events",
    "overview": "Attended ODDO Meet in Gandhinagar and IMC Conference in Delhi.",
    "investigationDetails": [
      "ODDO Meet · Gandhinagar",
      "IMC Conference · Delhi"
    ],
    "keyOutcomes": [],
    "artifactsAndTools": []
  }
];

export const TOPOLOGY_NODES: TopologyNode[] = [
  {
    "id": "python",
    "name": "Python",
    "cluster": "LANGUAGES",
    "depth": "Applied",
    "description": "Python is part of my languages toolkit.",
    "connectedNodes": [
      "typescript",
      "javascript",
      "powershell"
    ],
    "relatedProjects": [
      "project-aic",
      "ai-overlay"
    ]
  },
  {
    "id": "typescript",
    "name": "TypeScript",
    "cluster": "LANGUAGES",
    "depth": "Applied",
    "description": "TypeScript is part of my languages toolkit.",
    "connectedNodes": [
      "python",
      "javascript",
      "powershell"
    ],
    "relatedProjects": [
      "legallm",
      "wassap",
      "equity-echo",
      "sonar-thali",
      "wat-ewrite",
      "devineclub",
      "the-shadow-diary",
      "cosmos-anomaly",
      "timeline-twist-v2"
    ]
  },
  {
    "id": "javascript",
    "name": "JavaScript",
    "cluster": "LANGUAGES",
    "depth": "Applied",
    "description": "JavaScript is part of my languages toolkit.",
    "connectedNodes": [
      "python",
      "typescript",
      "powershell"
    ],
    "relatedProjects": [
      "shri-guru-kirpa",
      "sonar-thali",
      "wat-ewrite",
      "gdc-diagnostic",
      "cosmic-canvas",
      "personaverse",
      "timeline-twist-v2"
    ]
  },
  {
    "id": "powershell",
    "name": "PowerShell",
    "cluster": "LANGUAGES",
    "depth": "Applied",
    "description": "PowerShell is part of my languages toolkit.",
    "connectedNodes": [
      "python",
      "typescript",
      "javascript"
    ],
    "relatedProjects": [
      "ps-utility-suite"
    ]
  },
  {
    "id": "java",
    "name": "Java",
    "cluster": "LANGUAGES",
    "depth": "Familiarity",
    "description": "Working familiarity with Java.",
    "connectedNodes": [
      "python",
      "typescript",
      "javascript"
    ],
    "relatedProjects": []
  },
  {
    "id": "nlp",
    "name": "NLP & Generative AI",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "NLP & Generative AI is part of my AI / ML toolkit.",
    "connectedNodes": [
      "documents",
      "transformers",
      "rewriting"
    ],
    "relatedProjects": [
      "legallm",
      "right-left",
      "the-shadow-diary"
    ]
  },
  {
    "id": "documents",
    "name": "Document Analysis",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "Document Analysis is part of my AI / ML toolkit.",
    "connectedNodes": [
      "nlp",
      "transformers",
      "rewriting"
    ],
    "relatedProjects": [
      "legallm"
    ]
  },
  {
    "id": "transformers",
    "name": "Transformers",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "Transformers is part of my AI / ML toolkit.",
    "connectedNodes": [
      "nlp",
      "documents",
      "rewriting"
    ],
    "relatedProjects": [
      "project-aic"
    ]
  },
  {
    "id": "rewriting",
    "name": "AI Rewriting Pipelines",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "AI Rewriting Pipelines is part of my AI / ML toolkit.",
    "connectedNodes": [
      "nlp",
      "documents",
      "transformers"
    ],
    "relatedProjects": [
      "the-shadow-diary"
    ]
  },
  {
    "id": "electron",
    "name": "Electron",
    "cluster": "APPLICATION DEVELOPMENT",
    "depth": "Applied",
    "description": "Electron is part of my application development toolkit.",
    "connectedNodes": [
      "tkinter",
      "node-next",
      "ai-interface"
    ],
    "relatedProjects": [
      "personaverse",
      "business-venture-app"
    ]
  },
  {
    "id": "tkinter",
    "name": "Tkinter",
    "cluster": "APPLICATION DEVELOPMENT",
    "depth": "Applied",
    "description": "Tkinter is part of my application development toolkit.",
    "connectedNodes": [
      "electron",
      "node-next",
      "ai-interface"
    ],
    "relatedProjects": [
      "ai-overlay"
    ]
  },
  {
    "id": "node-next",
    "name": "Node.js & Next.js",
    "cluster": "APPLICATION DEVELOPMENT",
    "depth": "Applied",
    "description": "Node.js & Next.js is part of my application development toolkit.",
    "connectedNodes": [
      "electron",
      "tkinter",
      "ai-interface"
    ],
    "relatedProjects": [
      "legallm",
      "wassap",
      "equity-echo",
      "sonar-thali",
      "wat-ewrite",
      "devineclub",
      "the-shadow-diary",
      "personaverse",
      "inviter",
      "business-venture-app"
    ]
  },
  {
    "id": "ai-interface",
    "name": "UI/UX for AI",
    "cluster": "APPLICATION DEVELOPMENT",
    "depth": "Applied",
    "description": "UI/UX for AI is part of my application development toolkit.",
    "connectedNodes": [
      "electron",
      "tkinter",
      "node-next"
    ],
    "relatedProjects": [
      "wassap",
      "shri-guru-kirpa",
      "sonar-thali",
      "wat-ewrite",
      "gdc-diagnostic",
      "personaverse",
      "timeline-twist-v2"
    ]
  },
  {
    "id": "api",
    "name": "API Architectures",
    "cluster": "APPLICATION DEVELOPMENT",
    "depth": "Applied",
    "description": "API Architectures is part of my application development toolkit.",
    "connectedNodes": [
      "electron",
      "tkinter",
      "node-next"
    ],
    "relatedProjects": [
      "right-left",
      "equity-echo",
      "inviter"
    ]
  },
  {
    "id": "modular",
    "name": "Modular AI Design",
    "cluster": "SYSTEMS & TOOLING",
    "depth": "Applied",
    "description": "Modular AI Design is part of my systems & tooling toolkit.",
    "connectedNodes": [
      "automation",
      "cli",
      "integrations"
    ],
    "relatedProjects": [
      "project-aic"
    ]
  },
  {
    "id": "automation",
    "name": "Automation Pipelines",
    "cluster": "SYSTEMS & TOOLING",
    "depth": "Applied",
    "description": "Automation Pipelines is part of my systems & tooling toolkit.",
    "connectedNodes": [
      "modular",
      "cli",
      "integrations"
    ],
    "relatedProjects": [
      "inviter",
      "ps-utility-suite"
    ]
  },
  {
    "id": "cli",
    "name": "CLI & PowerShell Utilities",
    "cluster": "SYSTEMS & TOOLING",
    "depth": "Applied",
    "description": "CLI & PowerShell Utilities is part of my systems & tooling toolkit.",
    "connectedNodes": [
      "modular",
      "automation",
      "integrations"
    ],
    "relatedProjects": [
      "ps-utility-suite"
    ]
  },
  {
    "id": "integrations",
    "name": "Third-party Integrations",
    "cluster": "SYSTEMS & TOOLING",
    "depth": "Applied",
    "description": "Third-party Integrations is part of my systems & tooling toolkit.",
    "connectedNodes": [
      "modular",
      "automation",
      "cli"
    ],
    "relatedProjects": [
      "right-left",
      "the-shadow-diary",
      "inviter"
    ]
  }
];

export const COSMIC_MILESTONES: CosmicMilestone[] = [
  {
    "id": "openxai-2025",
    "title": "India Accelerator – OpenXAI",
    "year": "2025",
    "epoch": "Cohort",
    "category": "Cohort",
    "context": "Blockseblock Labs",
    "summary": "Collaborative project under Blockseblock Labs, in an accelerator-style development environment focused on scalable AI systems.",
    "significance": "",
    "verifiedDetails": [
      "Collaborative project under Blockseblock Labs, in an accelerator-style development environment focused on scalable AI systems."
    ],
    "celestialCoordinates": {
      "sector": "Blockseblock Labs",
      "magnitude": "Cohort",
      "anchorIndex": 0
    }
  },
  {
    "id": "hacktoskill-2025",
    "title": "LegalLM – HacktoSkill",
    "year": "2025",
    "epoch": "Cohort",
    "category": "Cohort",
    "context": "Google’s HacktoSkill program",
    "summary": "Collaborative project focused on scalable AI legal systems.",
    "significance": "",
    "verifiedDetails": [
      "Collaborative project focused on scalable AI legal systems."
    ],
    "celestialCoordinates": {
      "sector": "Google’s HacktoSkill program",
      "magnitude": "Cohort",
      "anchorIndex": 1
    }
  },
  {
    "id": "patent-publication",
    "title": "Patent Publication (IPR)",
    "epoch": "Patent",
    "category": "Patent",
    "context": "Applied research",
    "summary": "Published a patent demonstrating original technical innovation and applied research.",
    "significance": "",
    "verifiedDetails": [
      "Published a patent demonstrating original technical innovation and applied research."
    ],
    "celestialCoordinates": {
      "sector": "Applied research",
      "magnitude": "Patent",
      "anchorIndex": 2
    }
  },
  {
    "id": "techfest-iit-ropar",
    "title": "Tech Fest – IIT Ropar",
    "epoch": "Award & Recognition",
    "category": "Award & Recognition",
    "context": "IIT Ropar",
    "summary": "Recognition for technical performance and innovation.",
    "significance": "",
    "verifiedDetails": [
      "Recognition for technical performance and innovation."
    ],
    "celestialCoordinates": {
      "sector": "IIT Ropar",
      "magnitude": "Award & Recognition",
      "anchorIndex": 3
    }
  },
  {
    "id": "hackathons-ideathons",
    "title": "Hackathons & Ideathons",
    "epoch": "Hackathon",
    "category": "Hackathon",
    "context": "Rapid prototyping",
    "summary": "Winner and participant in multiple events involving problem-solving and solution presentation.",
    "significance": "",
    "verifiedDetails": [
      "Winner and participant in multiple events involving problem-solving and solution presentation."
    ],
    "celestialCoordinates": {
      "sector": "Rapid prototyping",
      "magnitude": "Hackathon",
      "anchorIndex": 4
    }
  },
  {
    "id": "oddo-meet",
    "title": "ODDO Meet",
    "epoch": "Conference",
    "category": "Conference",
    "context": "Gandhinagar",
    "summary": "Attended ODDO Meet in Gandhinagar.",
    "significance": "",
    "verifiedDetails": [
      "Attended ODDO Meet in Gandhinagar."
    ],
    "celestialCoordinates": {
      "sector": "Gandhinagar",
      "magnitude": "Conference",
      "anchorIndex": 5
    }
  },
  {
    "id": "imc-conference",
    "title": "IMC Conference",
    "epoch": "Conference",
    "category": "Conference",
    "context": "Delhi",
    "summary": "Attended IMC Conference in Delhi.",
    "significance": "",
    "verifiedDetails": [
      "Attended IMC Conference in Delhi."
    ],
    "celestialCoordinates": {
      "sector": "Delhi",
      "magnitude": "Conference",
      "anchorIndex": 6
    }
  },
  {
    "id": "hackerrank",
    "title": "HackerRank",
    "epoch": "Award & Recognition",
    "category": "Award & Recognition",
    "context": "Programming",
    "summary": "5★ in Problem Solving and 5★ in Python.",
    "significance": "",
    "verifiedDetails": [
      "5★ in Problem Solving and 5★ in Python."
    ],
    "celestialCoordinates": {
      "sector": "Programming",
      "magnitude": "Award & Recognition",
      "anchorIndex": 7
    }
  },
  {
    "id": "espanola",
    "title": "Espanola – Grade B*",
    "epoch": "Academic",
    "category": "Academic",
    "context": "Language coursework",
    "summary": "Completed foundational Spanish coursework with consistent performance.",
    "significance": "",
    "verifiedDetails": [
      "Completed foundational Spanish coursework with consistent performance."
    ],
    "celestialCoordinates": {
      "sector": "Language coursework",
      "magnitude": "Academic",
      "anchorIndex": 8
    }
  }
];

export const ABOUT_DOSSIER: AboutDossier = {
  "name": "Souradip (Sobi) Biswas",
  "handle": "@sobiswriter",
  "role": "AI / ML Developer & Researcher",
  "location": "India",
  "timezone": "IST (UTC+05:30)",
  "coordinates": "",
  "status": "College student · independent developer · research-oriented builder",
  "positioning": [
    "AI / ML Systems",
    "Applied AI",
    "Creative Tooling"
  ],
  "manifestoStatement": "AI as a system, not a demo.",
  "narrativeParagraphs": [
    "I build applied AI systems with a focus on usability, clarity, and reliable execution. My core interests include document intelligence, generative AI, NLP, and behavior-aware interfaces.",
    "I combine AI, interface design, and tooling into complete products, with an iterative workflow centered on shipping useful outcomes. I am a college student and independent developer with a research-driven product mindset.",
    "I share projects on GitHub and technical posts on LinkedIn about AI systems, interfaces, and development practices. Building, sharing, and refining real systems is a consistent thread through my work."
  ],
  "engineeringAxioms": [
    {
      "number": "01",
      "title": "Applied Systems",
      "thesis": "Build usable systems around AI.",
      "context": "Focus on usability, clarity, and reliable execution."
    },
    {
      "number": "02",
      "title": "AI + Interfaces + Tooling",
      "thesis": "Bring intelligence and the interface together.",
      "context": "Combine AI, interface design, and tooling into complete products."
    },
    {
      "number": "03",
      "title": "Experiment & Iterate",
      "thesis": "Keep building, sharing, and improving.",
      "context": "An iterative workflow centered on useful outcomes."
    }
  ],
  "currentExplorations": [
    "Document intelligence and NLP",
    "Generative AI and rewriting pipelines",
    "Persona, identity, and behavior modeling",
    "Creative and systems tooling"
  ],
  "offlinePursuits": [
    "Foundational Spanish coursework · Espanola Grade B*"
  ]
};

export const BEYOND_DATA: BeyondData = {
  "transmissionHeader": "Contact & Résumé",
  "terminalStatus": "Open to collaboration",
  "email": "souradip.biswas23@lpu.in",
  "channels": [
    {
      "name": "GitHub",
      "handle": "@sobiswriter",
      "url": "https://github.com/sobiswriter",
      "protocol": "Code",
      "note": "Projects and source repositories."
    },
    {
      "name": "LinkedIn",
      "handle": "Souradip Biswas",
      "url": "https://www.linkedin.com/in/sobiswriter/",
      "protocol": "Professional profile",
      "note": "Professional updates and connections."
    },
    {
      "name": "Previous Portfolio",
      "handle": "sobi.codes",
      "url": "https://sobi.codes/",
      "protocol": "Portfolio",
      "note": "The original portfolio."
    }
  ],
  "curriculumVitae": {
    "summary": "A résumé covering applied AI, software projects, research, and professional background.",
    "coreCompetencies": [
      "AI / ML Systems",
      "Applied AI",
      "Creative Tooling"
    ],
    "verifiedSignals": [
      "India Accelerator – OpenXAI",
      "LegalLM – HacktoSkill",
      "Patent Publication (IPR)",
      "Tech Fest – IIT Ropar",
      "Hackathons & Ideathons",
      "ODDO Meet",
      "IMC Conference",
      "HackerRank",
      "Espanola – Grade B*"
    ],
    "resumeDownloadAvailable": false
  }
};
