// Updated from the owner’s CV/resumés and public GitHub records. See docs/content-sources.md.
import type {UniverseMeta,ProjectItem,AiLabExperiment,ResearchRecordItem,TopologyNode,CosmicMilestone,AboutDossier,BeyondData} from '../types/universe';
export const UNIVERSES_META: UniverseMeta[] = [
  {
    "id": "arrival",
    "indexStr": "00",
    "name": "Overview",
    "title": "Overview",
    "tagline": "Souradip Biswas · AI/ML developer, full stack engineer, and agency owner.",
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
      "PDF, DOCX, and text uploads with structured summaries, clause and risk analysis, and document Q&A.",
      "Answers connected to source citations and document highlighting; Gemini PDF analysis and Mammoth DOCX parsing."
    ],
    "keyFeatures": [],
    "stack": [
      "TypeScript",
      "Next.js",
      "Genkit",
      "Gemini",
      "Mammoth"
    ],
    "githubUrl": "https://github.com/sobiswriter/LegalLM",
    "liveUrl": "https://legal-lmx24-git-main-sobiswriters-projects.vercel.app/",
    "previewUnavailable": "This deployment does not allow embedded previews.",
    "featured": true,
    "status": "Featured Project",
    "executionEnvironment": "AI Application"
  },
  {
    "id": "project-aic",
    "title": "Niva / Project AIC",
    "tagline": "Proactive conversational AI assistant",
    "category": "Applied AI",
    "role": "AI Assistant",
    "problem": "A Telegram assistant with conversational context, long-term memory, and proactive follow-ups.",
    "architecture": [
      "FastAPI webhook handling with Gemini and Vertex AI integration.",
      "Short-term conversational context and summarized long-term memory stored in Firestore."
    ],
    "keyFeatures": [
      "Scheduled journaling and sentiment checks.",
      "Proactive follow-ups and summarized conversational memory."
    ],
    "stack": [
      "Python",
      "FastAPI",
      "Gemini",
      "Vertex AI",
      "Firestore",
      "Docker"
    ],
    "githubUrl": "https://github.com/sobiswriter/Project-AIC",
    "featured": false,
    "status": "Long-term Project",
    "executionEnvironment": "Telegram assistant"
  },
  {
    "id": "right-left",
    "title": "LaunchSILO Labs",
    "tagline": "My agency. Built to bring ambitious ideas to life.",
    "category": "Commercial & Web",
    "role": "Agency Owner & Developer",
    "problem": "An agency platform for e-commerce, SaaS, portfolios, video production, and mobile development services.",
    "architecture": [
      "Multi-step scope builder captures service requirements, budgets, timelines, and deliverables, with AI-assisted estimates and inquiry qualification.",
      "Administrative CMS and inquiry pipeline with status tracking, client notes, invoices, PDF export, and WhatsApp handoffs."
    ],
    "keyFeatures": [
      "Scope builder and AI-assisted estimates.",
      "CMS, client inquiry tracking, and invoice exports."
    ],
    "stack": [
      "React 19",
      "Firebase",
      "Firestore",
      "REST APIs",
      "Gemini"
    ],
    "liveUrl": "https://launchsilo.in/",
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Agency platform",
    "githubUrl": "https://github.com/sobiswriter/RLBiz",
    "sourceUnavailable": "Repository not publicly available."
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
    "liveUrl": "https://wassapyo.vercel.app/",
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
    "executionEnvironment": "Luxury E-commerce Website",
    "githubUrl": "https://github.com/sobiswriter/Guru-Kripa-Jwellers"
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
    "previewUnavailable": "This demo redirects to an HTTP site and opens separately.",
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
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Web Application",
    "githubUrl": "https://github.com/sobiswriter/Main_Inviter"
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
    "liveUrl": "https://cosmos-anomaly.vercel.app",
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
    "liveUrl": "https://time-line-twist-v2.vercel.app",
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
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Automation Tool Collection"
  },
  {
    "id": "bhudrishty",
    "title": "Bhudrishty",
    "category": "Applied AI",
    "role": "Mobile Developer · ML & Web Contributor",
    "problem": "A landslide early-warning system developed with Team Vortiq for SIH 2026.",
    "architecture": [
      "Independently developed the entire mobile application and contributed to the ML component and website.",
      "Multi-source risk assessment combines sensor readings, rainfall, terrain, and satellite data for localized warnings."
    ],
    "stack": [
      "Mobile Development",
      "Machine Learning",
      "Web Development"
    ],
    "tagline": "Mobile Developer · ML & Web Contributor",
    "keyFeatures": [
      "College nomination to present at SIH 2026 after competing among 900 teams."
    ],
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Mobile Developer · ML & Web Contributor"
  },
  {
    "id": "waterborne-prediction",
    "title": "Waterborne Disease Outbreak Prediction",
    "category": "Applied AI",
    "role": "Hybrid ML System",
    "problem": "Forecasts outbreaks and generates regional risk scores using water-quality, environmental, and demographic data.",
    "architecture": [
      "Hybrid LSTM–XGBoost model.",
      "Recognized among the Top 15 teams in the Smart India Hackathon pre-finale."
    ],
    "stack": [
      "Python",
      "TensorFlow",
      "Keras",
      "LSTM",
      "XGBoost",
      "FastAPI"
    ],
    "tagline": "Hybrid ML System",
    "keyFeatures": [],
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Hybrid ML System"
  },
  {
    "id": "client-retail",
    "title": "Retail Inventory Application",
    "category": "Commercial & Web",
    "role": "Freelance Client Application",
    "problem": "An offline-first inventory and operations application for a general retail shop.",
    "architecture": [
      "Stock valuation, sales analytics, receivables and payables, GST reports, data exports, and invoice generation."
    ],
    "stack": [
      "Inventory Management",
      "Offline-first Software"
    ],
    "tagline": "Freelance Client Application",
    "keyFeatures": [],
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Freelance Client Application"
  },
  {
    "id": "client-medical",
    "title": "Medical Shop Application",
    "category": "Commercial & Web",
    "role": "Freelance Client Application",
    "problem": "An application developed for a medical shop.",
    "architecture": [
      "Client application delivery for a medical retail business."
    ],
    "stack": [
      "Application Development"
    ],
    "tagline": "Freelance Client Application",
    "keyFeatures": [],
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Freelance Client Application"
  },
  {
    "id": "bisos-chamber",
    "title": "BisosChamber",
    "category": "Applied AI",
    "role": "Persona AI Playground",
    "problem": "A newer evolution of PersonaVerse for creating and interacting with AI personas.",
    "architecture": [
      "React and Gemini-based persona playground."
    ],
    "stack": [
      "TypeScript",
      "React",
      "Vite",
      "Gemini",
      "Tailwind CSS"
    ],
    "tagline": "Persona AI Playground",
    "keyFeatures": [],
    "featured": false,
    "status": "Portfolio Project",
    "executionEnvironment": "Persona AI Playground",
    "githubUrl": "https://github.com/sobiswriter/BisosChamber",
    "liveUrl": "https://bisos-chamber.vercel.app/"
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
    "how": "PDF, DOCX, and text uploads with structured summaries, clause and risk analysis, and document Q&A. Answers connected to source citations and document highlighting; Gemini PDF analysis and Mammoth DOCX parsing.",
    "whatWasExplored": "PDF, DOCX, and text uploads with structured summaries, clause and risk analysis, and document Q&A. Answers connected to source citations and document highlighting; Gemini PDF analysis and Mammoth DOCX parsing.",
    "whatWasLearned": "An AI platform for uploading, parsing, and analyzing legal documents.",
    "technologies": [
      "TypeScript",
      "Next.js",
      "Genkit",
      "Gemini",
      "Mammoth"
    ],
    "relatedProjects": [
      "legallm"
    ],
    "status": "Featured Project"
  },
  {
    "id": "project-aic",
    "title": "Niva / Project AIC",
    "tagline": "Proactive conversational AI assistant",
    "focusArea": "AI Assistant",
    "what": "A Telegram assistant with conversational context, long-term memory, and proactive follow-ups.",
    "why": "A Telegram assistant with conversational context, long-term memory, and proactive follow-ups.",
    "how": "FastAPI webhook handling with Gemini and Vertex AI integration. Short-term conversational context and summarized long-term memory stored in Firestore.",
    "whatWasExplored": "FastAPI webhook handling with Gemini and Vertex AI integration. Short-term conversational context and summarized long-term memory stored in Firestore.",
    "whatWasLearned": "A Telegram assistant with conversational context, long-term memory, and proactive follow-ups.",
    "technologies": [
      "Python",
      "FastAPI",
      "Gemini",
      "Vertex AI",
      "Firestore",
      "Docker"
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
  },
  {
    "id": "bhudrishty",
    "title": "Bhudrishty",
    "tagline": "Mobile Developer · ML & Web Contributor",
    "focusArea": "Mobile Developer · ML & Web Contributor",
    "what": "A landslide early-warning system developed with Team Vortiq for SIH 2026.",
    "why": "A landslide early-warning system developed with Team Vortiq for SIH 2026.",
    "how": "Independently developed the entire mobile application and contributed to the ML component and website. Multi-source risk assessment combines sensor readings, rainfall, terrain, and satellite data for localized warnings.",
    "whatWasExplored": "Independently developed the entire mobile application and contributed to the ML component and website. Multi-source risk assessment combines sensor readings, rainfall, terrain, and satellite data for localized warnings.",
    "whatWasLearned": "A landslide early-warning system developed with Team Vortiq for SIH 2026.",
    "technologies": [
      "Mobile Development",
      "Machine Learning",
      "Web Development"
    ],
    "relatedProjects": [
      "bhudrishty"
    ],
    "status": "Portfolio Project"
  },
  {
    "id": "waterborne-prediction",
    "title": "Waterborne Disease Outbreak Prediction",
    "tagline": "Hybrid ML System",
    "focusArea": "Hybrid ML System",
    "what": "Forecasts outbreaks and generates regional risk scores using water-quality, environmental, and demographic data.",
    "why": "Forecasts outbreaks and generates regional risk scores using water-quality, environmental, and demographic data.",
    "how": "Hybrid LSTM–XGBoost model. Recognized among the Top 15 teams in the Smart India Hackathon pre-finale.",
    "whatWasExplored": "Hybrid LSTM–XGBoost model. Recognized among the Top 15 teams in the Smart India Hackathon pre-finale.",
    "whatWasLearned": "Forecasts outbreaks and generates regional risk scores using water-quality, environmental, and demographic data.",
    "technologies": [
      "Python",
      "TensorFlow",
      "Keras",
      "LSTM",
      "XGBoost",
      "FastAPI"
    ],
    "relatedProjects": [
      "waterborne-prediction"
    ],
    "status": "Portfolio Project"
  },
  {
    "id": "bisos-chamber",
    "title": "BisosChamber",
    "tagline": "Persona AI Playground",
    "focusArea": "Persona AI Playground",
    "what": "A newer evolution of PersonaVerse for creating and interacting with AI personas.",
    "why": "A newer evolution of PersonaVerse for creating and interacting with AI personas.",
    "how": "React and Gemini-based persona playground.",
    "whatWasExplored": "React and Gemini-based persona playground.",
    "whatWasLearned": "A newer evolution of PersonaVerse for creating and interacting with AI personas.",
    "technologies": [
      "TypeScript",
      "React",
      "Vite",
      "Gemini",
      "Tailwind CSS"
    ],
    "relatedProjects": [
      "bisos-chamber"
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
    "title": "Hybrid Endomythosis Detection through AI & ML",
    "type": "PUBLICATION SIGNAL",
    "domain": "Applied research",
    "overview": "Patent publication · October 2025.",
    "investigationDetails": [
      "Published under the IPR framework. The CV provides the publication announcement."
    ],
    "keyOutcomes": [],
    "artifactsAndTools": [],
    "signalBadge": "Patent publication",
    "dateOrEra": "Oct 2025"
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
  },
  {
    "id": "react",
    "name": "React",
    "cluster": "APPLICATION DEVELOPMENT",
    "depth": "Applied",
    "description": "React is part of my technical toolkit.",
    "connectedNodes": [
      "electron",
      "tkinter",
      "node-next"
    ],
    "relatedProjects": [
      "right-left",
      "shri-guru-kirpa",
      "sonar-thali",
      "wat-ewrite",
      "gdc-diagnostic",
      "personaverse",
      "timeline-twist-v2",
      "bisos-chamber"
    ]
  },
  {
    "id": "next-js",
    "name": "Next.js",
    "cluster": "APPLICATION DEVELOPMENT",
    "depth": "Applied",
    "description": "Next.js is part of my technical toolkit.",
    "connectedNodes": [
      "electron",
      "tkinter",
      "node-next"
    ],
    "relatedProjects": [
      "legallm",
      "wassap",
      "equity-echo",
      "sonar-thali",
      "wat-ewrite",
      "devineclub",
      "the-shadow-diary",
      "inviter"
    ]
  },
  {
    "id": "tailwind-css",
    "name": "Tailwind CSS",
    "cluster": "APPLICATION DEVELOPMENT",
    "depth": "Applied",
    "description": "Tailwind CSS is part of my technical toolkit.",
    "connectedNodes": [
      "electron",
      "tkinter",
      "node-next"
    ],
    "relatedProjects": [
      "bisos-chamber"
    ]
  },
  {
    "id": "fastapi",
    "name": "FastAPI",
    "cluster": "APPLICATION DEVELOPMENT",
    "depth": "Applied",
    "description": "FastAPI is part of my technical toolkit.",
    "connectedNodes": [
      "electron",
      "tkinter",
      "node-next"
    ],
    "relatedProjects": [
      "project-aic",
      "waterborne-prediction"
    ]
  },
  {
    "id": "rest-apis",
    "name": "REST APIs",
    "cluster": "APPLICATION DEVELOPMENT",
    "depth": "Applied",
    "description": "REST APIs is part of my technical toolkit.",
    "connectedNodes": [
      "electron",
      "tkinter",
      "node-next"
    ],
    "relatedProjects": [
      "right-left"
    ]
  },
  {
    "id": "gemini",
    "name": "Gemini",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "Gemini is part of my technical toolkit.",
    "connectedNodes": [
      "nlp",
      "documents",
      "transformers"
    ],
    "relatedProjects": [
      "legallm",
      "project-aic",
      "right-left",
      "bisos-chamber"
    ]
  },
  {
    "id": "vertex-ai",
    "name": "Vertex AI",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "Vertex AI is part of my technical toolkit.",
    "connectedNodes": [
      "nlp",
      "documents",
      "transformers"
    ],
    "relatedProjects": [
      "project-aic"
    ]
  },
  {
    "id": "genkit",
    "name": "Genkit",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "Genkit is part of my technical toolkit.",
    "connectedNodes": [
      "nlp",
      "documents",
      "transformers"
    ],
    "relatedProjects": [
      "legallm"
    ]
  },
  {
    "id": "tensorflow-keras",
    "name": "TensorFlow / Keras",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "TensorFlow / Keras is part of my technical toolkit.",
    "connectedNodes": [
      "nlp",
      "documents",
      "transformers"
    ],
    "relatedProjects": [
      "waterborne-prediction"
    ]
  },
  {
    "id": "xgboost",
    "name": "XGBoost",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "XGBoost is part of my technical toolkit.",
    "connectedNodes": [
      "nlp",
      "documents",
      "transformers"
    ],
    "relatedProjects": [
      "waterborne-prediction"
    ]
  },
  {
    "id": "scikit-learn",
    "name": "scikit-learn",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "scikit-learn is part of my technical toolkit.",
    "connectedNodes": [
      "nlp",
      "documents",
      "transformers"
    ],
    "relatedProjects": []
  },
  {
    "id": "pandas",
    "name": "pandas",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "pandas is part of my technical toolkit.",
    "connectedNodes": [
      "nlp",
      "documents",
      "transformers"
    ],
    "relatedProjects": []
  },
  {
    "id": "numpy",
    "name": "NumPy",
    "cluster": "AI / ML",
    "depth": "Applied",
    "description": "NumPy is part of my technical toolkit.",
    "connectedNodes": [
      "nlp",
      "documents",
      "transformers"
    ],
    "relatedProjects": []
  },
  {
    "id": "google-cloud",
    "name": "Google Cloud",
    "cluster": "SYSTEMS & TOOLING",
    "depth": "Applied",
    "description": "Google Cloud is part of my technical toolkit.",
    "connectedNodes": [
      "modular",
      "automation",
      "cli"
    ],
    "relatedProjects": []
  },
  {
    "id": "cloud-run",
    "name": "Cloud Run",
    "cluster": "SYSTEMS & TOOLING",
    "depth": "Applied",
    "description": "Cloud Run is part of my technical toolkit.",
    "connectedNodes": [
      "modular",
      "automation",
      "cli"
    ],
    "relatedProjects": []
  },
  {
    "id": "firebase-firestore",
    "name": "Firebase / Firestore",
    "cluster": "SYSTEMS & TOOLING",
    "depth": "Applied",
    "description": "Firebase / Firestore is part of my technical toolkit.",
    "connectedNodes": [
      "modular",
      "automation",
      "cli"
    ],
    "relatedProjects": [
      "project-aic",
      "right-left"
    ]
  },
  {
    "id": "supabase",
    "name": "Supabase",
    "cluster": "SYSTEMS & TOOLING",
    "depth": "Applied",
    "description": "Supabase is part of my technical toolkit.",
    "connectedNodes": [
      "modular",
      "automation",
      "cli"
    ],
    "relatedProjects": []
  },
  {
    "id": "vercel",
    "name": "Vercel",
    "cluster": "SYSTEMS & TOOLING",
    "depth": "Applied",
    "description": "Vercel is part of my technical toolkit.",
    "connectedNodes": [
      "modular",
      "automation",
      "cli"
    ],
    "relatedProjects": [
      "wat-ewrite"
    ]
  },
  {
    "id": "docker",
    "name": "Docker",
    "cluster": "SYSTEMS & TOOLING",
    "depth": "Applied",
    "description": "Docker is part of my technical toolkit.",
    "connectedNodes": [
      "modular",
      "automation",
      "cli"
    ],
    "relatedProjects": [
      "project-aic"
    ]
  }
];

export const COSMIC_MILESTONES: CosmicMilestone[] = [
  {
    "id": "sih-bhudrishty",
    "title": "SIH 2026 · Bhudrishty",
    "year": "2026",
    "category": "Hackathon",
    "epoch": "Hackathon",
    "context": "Team Vortiq",
    "summary": "College nomination to present at SIH 2026 after competing among 900 teams.",
    "significance": "",
    "verifiedDetails": [
      "College nomination to present at SIH 2026 after competing among 900 teams."
    ],
    "celestialCoordinates": {
      "sector": "Team Vortiq",
      "magnitude": "Hackathon",
      "anchorIndex": 0
    }
  },
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
      "anchorIndex": 1
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
      "anchorIndex": 2
    }
  },
  {
    "id": "patent-publication",
    "title": "Hybrid Endomythosis Detection through AI & ML",
    "epoch": "Patent",
    "category": "Patent",
    "context": "Applied AI & ML research",
    "summary": "Patent publication for Hybrid Endomythosis Detection through AI & ML.",
    "significance": "",
    "verifiedDetails": [
      "Patent publication · October 2025"
    ],
    "celestialCoordinates": {
      "sector": "Applied research",
      "magnitude": "Patent",
      "anchorIndex": 3
    },
    "year": "Oct 2025"
  },
  {
    "id": "techfest-iit-ropar",
    "title": "Advitiya 2026 · IIT Ropar",
    "epoch": "Award & Recognition",
    "category": "Award & Recognition",
    "context": "IIT Ropar",
    "summary": "First and second place in two technical events.",
    "significance": "",
    "verifiedDetails": [
      "First place in one technical event.",
      "Second place in another technical event."
    ],
    "celestialCoordinates": {
      "sector": "IIT Ropar",
      "magnitude": "Award & Recognition",
      "anchorIndex": 4
    },
    "year": "2026"
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
      "anchorIndex": 5
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
      "anchorIndex": 6
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
      "anchorIndex": 7
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
      "anchorIndex": 8
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
      "anchorIndex": 9
    }
  },
  {
    "id": "waterborne-sih",
    "title": "SIH Pre-finale · Top 15",
    "year": "Oct 2025",
    "category": "Hackathon",
    "epoch": "Hackathon",
    "context": "Waterborne Disease Outbreak Prediction",
    "summary": "Recognized among the Top 15 teams in the Smart India Hackathon pre-finale.",
    "significance": "",
    "verifiedDetails": [
      "Recognized among the Top 15 teams in the Smart India Hackathon pre-finale."
    ],
    "celestialCoordinates": {
      "sector": "Waterborne Disease Outbreak Prediction",
      "magnitude": "Hackathon",
      "anchorIndex": 10
    }
  },
  {
    "id": "web-e-thon",
    "title": "Web-E-Thon 2025",
    "year": "Mar 2025",
    "category": "Hackathon",
    "epoch": "Hackathon",
    "context": "Web development",
    "summary": "First runner-up.",
    "significance": "",
    "verifiedDetails": [
      "First runner-up."
    ],
    "celestialCoordinates": {
      "sector": "Web development",
      "magnitude": "Hackathon",
      "anchorIndex": 11
    }
  },
  {
    "id": "college-ideathon",
    "title": "College Tech Fest Ideathon",
    "category": "Hackathon",
    "epoch": "Hackathon",
    "context": "College Tech Fest",
    "summary": "Ideathon winner.",
    "significance": "",
    "verifiedDetails": [
      "Ideathon winner."
    ],
    "celestialCoordinates": {
      "sector": "College Tech Fest",
      "magnitude": "Hackathon",
      "anchorIndex": 12
    }
  }
];

export const ABOUT_DOSSIER: AboutDossier = {
  "name": "Souradip (Sobi) Biswas",
  "handle": "@sobiswriter",
  "role": "AI & ML Developer · Full Stack Engineer",
  "location": "India",
  "timezone": "IST (UTC+05:30)",
  "coordinates": "",
  "status": "B.Tech CSE student · LaunchSILO Labs agency owner",
  "positioning": [
    "Applied AI",
    "Full Stack Engineering",
    "Mobile Software",
    "Client Delivery"
  ],
  "manifestoStatement": "AI as a system, not a demo.",
  "narrativeParagraphs": [
    "I’m an AI and ML developer, full stack engineer, and the owner of LaunchSILO Labs. I build applications, AI workflows, and mobile software, with hands-on client delivery and technical competition experience.",
    "My work ranges from document intelligence and conversational AI to landslide early warnings and offline-first business applications. I like turning a promising idea into something people can actually use.",
    "I’m pursuing a B.Tech in Computer Science and Engineering at Lovely Professional University in Punjab, where I started in August 2023. I also train, build with teams, and keep exploring the space between intelligence and the interface."
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
    "Applied AI and document intelligence",
    "Conversational systems with long-term memory",
    "Mobile software and disaster early-warning systems",
    "Full stack products and client delivery"
  ],
  "offlinePursuits": [
    "Foundational Spanish coursework · Espanola Grade B*"
  ]
};

export const BEYOND_DATA: BeyondData = {
  "transmissionHeader": "Contact & Résumé",
  "terminalStatus": "Open to collaboration",
  "email": "souradip073@gmail.com",
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
    },
    {
      "name": "Phone",
      "handle": "+91 8787822581",
      "url": "tel:+918787822581",
      "protocol": "Call",
      "note": "Professional enquiries."
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
    "resumeDownloadAvailable": true
  }
};
