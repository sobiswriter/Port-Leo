"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import ThemeToggle from "./components/ThemeToggle";
import LiquidEther from "./components/LiquidEther";
import NavDock from "./components/NavDock";
import Shuffle from "./components/Shuffle";
import TextType from "./components/TextType";

const ProjectCard = ({ project }) => {
    const cardRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        // Strength of the magnetic pull
        const strength = 0.15;

        setPosition({
            x: dx * strength,
            y: dy * strength
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            className="card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                transition: position.x === 0 ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.1s ease-out'
            }}
        >
            <div className="card-content">
                <div className="card-header">
                    <h3>{project.title}</h3>
                    <span className="type-badge">{project.type}</span>
                </div>
                <p className="text-sm text-slate-400 mb-2">{project.desc}</p>
                <p className="text-slate-300 text-sm">
                    {project.summary}
                </p>
                <div className="card-reveal">
                    <p>{project.details}</p>
                    <div className="card-actions">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="action-btn github">
                                GitHub
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="action-btn demo">
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <div className="tech-stack">
                {project.stack.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                ))}
            </div>
        </div>
    );
};

export default function Home() {
    return (
        <>
            {/* Liquid Ether Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -10,
                opacity: 0.25,
                pointerEvents: 'none'
            }}>
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={35}
                    cursorSize={75}
                    isViscous={true}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={20}
                    resolution={0.3}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.55}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            <main className="min-h-screen">
                <ThemeToggle />

                {/* Hero Section */}
                <section id="hero" className="hero">
                    <div className="hero-content">
                        <div className="hero-text">
                            <TextType
                                as="h1"
                                text={["Souradip Biswas", "sobiswriter", "Souradip (Sobi) Biswas"]}
                                typingSpeed={80}
                                pauseDuration={4000}
                                showCursor
                                cursorCharacter=" |"
                                loop={true}
                            />
                            <Shuffle
                                text="AI / ML Systems • Applied AI • Creative Tooling"
                                className="tagline"
                                shuffleDirection="right"
                                duration={1}
                                animationMode="evenodd"
                                shuffleTimes={4}
                                ease="power3.out"
                                stagger={0.09}
                                threshold={0.1}
                                triggerOnce={true}
                                triggerOnHover
                                respectReducedMotion={true}
                                loop={false}
                                loopDelay={0}
                            />
                            <div className="hero-sub">
                                <p>
                                    AI-focused developer and researcher building <strong>applied systems</strong>, not just demos.
                                    <br />
                                    Independent builder with a research-driven product mindset.
                                </p>
                            </div>
                            <div className="social-links">
                                <a href="https://github.com/sobiswriter" target="_blank" rel="noopener noreferrer" className="btn">
                                    <span>GitHub →</span>
                                </a>
                                <a href="https://www.linkedin.com/in/sobiswriter/" target="_blank" rel="noopener noreferrer" className="btn">
                                    <span>LinkedIn →</span>
                                </a>
                            </div>
                        </div>
                        <div className="hero-image-wrapper">
                            <div className="hero-image-glow" />
                            <Image
                                src="/my-image.png"
                                alt="Souradip Biswas"
                                width={320}
                                height={320}
                                className="hero-image"
                                priority
                            />
                        </div>
                    </div>
                </section>

                {/* Professional Overview */}
                <section id="about">
                    <h2>Professional Overview</h2>
                    <div className="space-y-4 text-slate-300 text-lg">
                        <p>
                            I build <span className="text-gradient font-semibold">applied AI systems</span> with a focus on usability, clarity, and reliable execution.
                            My core interests include <span className="text-gradient font-semibold">document intelligence, generative AI, NLP, and behavior-aware interfaces</span>.
                        </p>
                        <p>
                            I combine <span className="text-gradient font-semibold">AI + interface design + tooling</span> into complete products, with an iterative workflow centered on shipping useful outcomes.
                        </p>
                    </div>
                </section>

                {/* Technical Skills */}
                <section id="skills">
                    <h2>Technical Skills</h2>

                    <div className="grid">
                        <div className="skill-category">
                            <h3>Programming Languages</h3>
                            <div className="skill-list">
                                <span className="skill-item">Python</span>
                                <span className="skill-item">TypeScript</span>
                                <span className="skill-item">JavaScript</span>
                                <span className="skill-item">PowerShell</span>
                                <span className="skill-item">Java (Familiarity)</span>
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3>AI / Machine Learning</h3>
                            <div className="skill-list">
                                <span className="skill-item">NLP & GenAI</span>
                                <span className="skill-item">Document Analysis</span>
                                <span className="skill-item">Transformers (Applied)</span>
                                <span className="skill-item">AI Rewriting Pipelines</span>
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3>Application Development</h3>
                            <div className="skill-list">
                                <span className="skill-item">Electron (Desktop)</span>
                                <span className="skill-item">Tkinter</span>
                                <span className="skill-item">Node.js & Next.js</span>
                                <span className="skill-item">UI/UX Logic for AI</span>
                                <span className="skill-item">API Architectures</span>
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3>Systems & Tooling</h3>
                            <div className="skill-list">
                                <span className="skill-item">Modular AI Design</span>
                                <span className="skill-item">Automation Pipelines</span>
                                <span className="skill-item">CLI & PowerShell Utils</span>
                                <span className="skill-item">3rd Party Integrations</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Major Projects */}
                <section id="projects">
                    <h2>Major Projects</h2>
                    <div className="bento-grid">
                        {
                            [
                                {
                                    title: "Wat-EWrite",
                                    type: "Blogging Platform",
                                    desc: "Blogging site example and personal blogging platform.",
                                    summary: "A clean platform for publishing, reading, and showcasing long-form writing.",
                                    details: "Built as both a personal blog and a reference implementation focused on readable layouts and smooth content publishing.",
                                    stack: ["TypeScript", "Next.js", "React", "Vercel"],
                                    github: "https://github.com/sobiswriter/Wat-EWrite",
                                    demo: "https://wat-e-write.vercel.app"
                                },
                                {
                                    title: "Sonar Thali Food Commerce App",
                                    type: "Food Commerce Application",
                                    desc: "Food commerce app for showcasing products and serving customers.",
                                    summary: "A customer-facing storefront for discovering menu offerings and placing orders.",
                                    details: "Designed around clear product discovery and smooth purchase flows for food-focused commerce experiences.",
                                    stack: ["TypeScript", "Next.js", "React", "E-commerce"],
                                    github: "https://github.com/sobiswriter/Sonar-Thali-Food-Commerce-App",
                                    demo: "https://sonar-thali.vercel.app"
                                },
                                {
                                    title: "RIGHT.LEFT Digital & Video Production Agency",
                                    type: "Digital Agency Platform",
                                    desc: "Elite digital engineering and motion creative platform.",
                                    summary: "A production-grade agency platform with an editorial visual system and React 19 architecture.",
                                    details: "Includes an Express API layer and Gemini-powered server intelligence for fast RFP scoping and lead qualification.",
                                    stack: ["React 19", "Express", "Gemini AI", "Headless E-commerce", "SaaS"],
                                    demo: "https://rightleft.ai.studio/"
                                },
                                {
                                    title: "Shri Guru Kirpa Gold Platters And Jewellers",
                                    type: "Luxury E-commerce Website",
                                    desc: "Modern jewellery catalog and customer experience for Shri Guru Kirpa Gold Platters And Jewellers in Phagwara, Punjab.",
                                    summary: "A premium jewellery storefront with catalog browsing, virtual try-on, and appointment booking.",
                                    details: "Balances high-end visual design with practical discovery flows, store information, and concierge-style guidance.",
                                    stack: ["React", "Vite", "E-commerce", "AI Concierge"],
                                    demo: "https://guru-kripa-jwellers.vercel.app/"
                                },
                                {
                                    title: "GDC Diagnostic Center",
                                    type: "Healthcare Web Application",
                                    desc: "Official diagnostic and pathology web portal for GDC Diagnostic Center, Benad Road, Jaipur, Rajasthan.",
                                    summary: "A 24×7 diagnostic center web portal for services, center information, and patient-facing workflows.",
                                    details: "Built to present pathology offerings clearly while supporting day-to-day operational and management needs.",
                                    stack: ["React", "Vite", "Healthcare", "Management System"],
                                    demo: "https://gdc-site.vercel.app/"
                                },
                                {
                                    title: "Wassap",
                                    type: "Real-time Communication",
                                    desc: "WhatsApp Clone with AI Integration",
                                    summary: "A real-time messaging app inspired by WhatsApp with built-in AI assistance.",
                                    details: "Includes live chat, responsive UI patterns, and integrated assistant workflows for faster communication.",
                                    stack: ["TypeScript", "Next.js", "AI Integration", "WebSocket"],
                                    github: "https://github.com/sobiswriter/Wassap",
                                    demo: "https://wassap-rho.vercel.app/"
                                },
                                {
                                    title: "EquityEcho",
                                    type: "FinTech / AI Application",
                                    desc: "Stock Market Prediction Platform",
                                    summary: "An AI-assisted platform for stock analysis, trend tracking, and market prediction.",
                                    details: "Combines ML-based forecasting with interactive financial views to support better trading and portfolio decisions.",
                                    stack: ["TypeScript", "Next.js", "ML Models", "Financial APIs"],
                                    github: "https://github.com/sobiswriter/EquityEcho-Stocks-Predictor"
                                },
                                {
                                    title: "DevineClub",
                                    type: "Competition Project",
                                    desc: "AIFusion IIT Ropar Hackathon",
                                    summary: "An AI application built for AIFusion at IIT Ropar under hackathon constraints.",
                                    details: "Focused on practical architecture, fast iteration, and real-world problem solving in a competition setting.",
                                    stack: ["TypeScript", "Next.js", "AI/ML Stack", "Competition-Ready"],
                                    github: "https://github.com/sobiswriter/DevineClub"
                                },
                                {
                                    title: "CosmicCanvas",
                                    type: "Experimental UI",
                                    desc: "Generative Art & Color Playground",
                                    summary: "An interactive canvas for experimenting with generative color and motion.",
                                    details: "Explores WebGL rendering, procedural strokes, and responsive visual interaction patterns.",
                                    stack: ["JavaScript", "WebGL", "Canvas API"],
                                    github: "https://github.com/sobiswriter/CosmicCanvas",
                                    demo: "https://sobiswriter.github.io/CosmicCanvas/"
                                },
                                {
                                    title: "LegalLM",
                                    type: "AI Application",
                                    desc: "Featured Flagship Project",
                                    summary: "An AI platform for uploading, parsing, and analyzing legal documents.",
                                    details: "Uses LLM workflows to surface key clauses, risks, and concise summaries for faster legal review.",
                                    stack: ["TypeScript", "AI/NLP Stack", "Next.js"],
                                    github: "https://github.com/sobiswriter/LegalLM",
                                    demo: "https://legal-lmx24-git-main-sobiswriters-projects.vercel.app/"
                                },
                                {
                                    title: "Project AIC",
                                    type: "AI Bot / System",
                                    desc: "Core Long-term Personal Project",
                                    summary: "A Python-based intelligent bot system exploring behavior and decision logic.",
                                    details: "Investigates long-term memory, adaptive responses, and personality-oriented interaction design.",
                                    stack: ["Python", "PyTorch", "Transformers"],
                                    github: "https://github.com/sobiswriter/Project-AIC"
                                },
                                {
                                    title: "The Shadow Diary",
                                    type: "AI Journaling",
                                    desc: "Psychological AI Tool",
                                    summary: "An AI-assisted journal that rewrites and reframes entries using psychological themes.",
                                    details: "Turns raw notes into structured reflections with guided interpretation and a focused writing interface.",
                                    stack: ["TypeScript", "Next.js", "OpenAI API"],
                                    github: "https://github.com/sobiswriter/The-Shadow-Diary",
                                    demo: "https://the-shadow-diary.vercel.app/"
                                },
                                {
                                    title: "PersonaVerse",
                                    type: "Desktop AI App",
                                    desc: "Interactive Playground",
                                    summary: "A desktop playground for creating and chatting with AI-driven personas.",
                                    details: "Supports character profiles, behavior constraints, and real-time conversational simulation.",
                                    stack: ["Node.js", "Electron", "React"],
                                    github: "https://github.com/sobiswriter/PersonaVerse"
                                },
                                {
                                    title: "AI Overlay",
                                    type: "Desktop Utility",
                                    desc: "Productivity Tool",
                                    summary: "A lightweight desktop overlay for quick, context-aware AI assistance.",
                                    details: "Runs as a smart on-screen layer to help with fast lookups and productivity tasks.",
                                    stack: ["Python", "Tkinter", "OCR"],
                                    github: "https://github.com/sobiswriter/AI-Overlay"
                                },
                                {
                                    title: "Inviter",
                                    type: "Web Application",
                                    desc: "Event Management",
                                    summary: "An invitation management app with automated SMS and email workflows.",
                                    details: "Streamlines RSVPs through reminders, follow-ups, and real-time guest tracking dashboards.",
                                    stack: ["Node.js", "Next.js", "Twilio", "SMTP"],
                                    github: "https://github.com/sobiswriter/Inviter"
                                },
                                {
                                    title: "Business Venture App",
                                    type: "Desktop Application",
                                    desc: "Enterprise Solution",
                                    summary: "A business desktop app for financial tracking, reporting, and internal operations.",
                                    details: "Includes account management, invoice PDF generation, and cash-flow visibility tools.",
                                    stack: ["Node.js", "Electron", "SQLite"],
                                    github: "https://github.com/sobiswriter/Business-Venture-App"
                                },
                                {
                                    title: "Cosmos Anomaly",
                                    type: "Experimental System",
                                    desc: "Narrative Engine",
                                    summary: "A narrative-driven system exploring timeline manipulation and anomaly logic.",
                                    details: "Users influence branching timelines, with graph-based state management driving ripple effects.",
                                    stack: ["TypeScript", "WebGL", "State Machines"],
                                    github: "https://github.com/sobiswriter/Cosmos-Anomaly",
                                    demo: "https://cosmos-anomaly.vercel.app/"
                                },
                                {
                                    title: "Timeline Twist (V2)",
                                    type: "Iterative System",
                                    desc: "System Refactor",
                                    summary: "The second iteration of a timeline system with a cleaner architecture.",
                                    details: "Refactors the core engine for better performance and support for deep branching paths.",
                                    stack: ["TypeScript", "React", "Redux"],
                                    github: "https://github.com/sobiswriter/TimeLine-Twist-V2",
                                    demo: "https://time-line-twist-v2.vercel.app/"
                                },
                                {
                                    title: "PS Utility Suite",
                                    type: "Automation Tool Collection",
                                    desc: "DevOps / Scripting",
                                    summary: "A PowerShell toolkit for scripting, scheduling, scraping, and routine automation.",
                                    details: "Designed for Windows power users to automate repetitive operations and system-level tasks.",
                                    stack: ["PowerShell", ".NET"],
                                    github: "https://github.com/sobiswriter/PowerShell-Utility-Suite"
                                }
                            ].map((project, index) => (
                                <ProjectCard key={index} project={project} />
                            ))
                        }

                    </div>
                </section>

                {/* Experience & Achievements */}
                <section id="achievements">
                    <h2>Experience & Recognition</h2>

                    <div className="card mb-8">
                        <div className="card-header px-0 pt-0">
                            <h3 className="text-gradient">Collaborations & Programs</h3>
                        </div>
                        <ul className="list-disc list-inside text-slate-300 space-y-2">
                            <li>
                                <strong className="text-white">India Accelerator – OpenXAI 2025</strong>
                                <br />
                                <span className="text-sm ml-5 block text-slate-400">
                                    Collaborative project under Blockseblock Labs. Participation in accelerator-style development environment. Focus on scalable AI system development.
                                </span>
                            </li>
                            <li>
                                <strong className="text-white">LegalLm – HacktoSkill 2025</strong>
                                <br />
                                <span className="text-sm ml-5 block text-slate-400">
                                    A collaborative project under Google's HacktoSkill program. Participation in accelerator-style development environment. Focus on scalable AI Legal Systems.
                                </span>
                            </li>
                            <li>
                                <strong className="text-white">Espanola – Grade B*</strong>
                                <br />
                                <span className="text-sm ml-5 block text-slate-400">
                                    Completed foundational Spanish coursework with consistent performance.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="grid">
                        <div className="card">
                            <h3>Achievements</h3>
                            <ul className="list-disc pl-4 mt-4 space-y-2 text-sm text-slate-300">
                                <li><strong className="text-white">Patent Publication (IPR)</strong>: Published a patent demonstrating original technical innovation and applied research.</li>
                                <li><strong className="text-white">Tech Fest – IIT Ropar</strong>: Recognition for technical performance and innovation.</li>
                                <li><strong className="text-white">Hackathons & Ideathons</strong>: Winner/participant in multiple events involving rapid prototyping and problem-solving.</li>
                            </ul>
                        </div>
                        <div className="card">
                            <h3>Public Presence & Signals</h3>
                            <ul className="list-disc pl-4 mt-4 space-y-2 text-sm text-slate-300">
                                <li><strong className="text-white">HackerRank</strong>: 5★ in Problem Solving, 5★ in Python.</li>
                                <li><strong className="text-white">Conference Participation</strong>: Attended ODDO Meet (Gandhinagar) and IMC Conference (Delhi).</li>
                                <li><strong className="text-white">GitHub & LinkedIn</strong>: Active profile with multiple featured projects, stars, and technical posts on AI systems/interfaces.</li>
                                <li><strong className="text-white">Core Themes</strong>: "AI as a system, not a demo" & "Persona, identity, and behavior modeling".</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Resume Section */}
                <section id="resume">
                    <h2>Resume / CV</h2>
                    <div className="card">
                        <div className="card-content">
                            <div className="card-header">
                                <h3 className="text-gradient">Curriculum Vitae</h3>
                                <span className="type-badge">Professional PDF</span>
                            </div>
                            <p className="text-slate-300">
                                My resume provides a comprehensive overview of my technical expertise in AI systems, research projects, patent publications, and professional background.
                            </p>

                            {/* Resume Preview */}
                            <div className="resume-preview-container">
                                <iframe
                                    src="/resume.pdf#toolbar=0"
                                    className="resume-iframe"
                                    title="Resume Preview"
                                />
                            </div>

                            <div className="mt-8 flex gap-4">
                                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn flex-1 text-center">
                                    <span>View Resume →</span>
                                </a>
                                <a href="/resume.pdf" download="Souradip_Biswas_Resume.pdf" className="btn flex-1 text-center border-accent hover:border-accent">
                                    <span>Download CV ↓</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get in Touch Section */}
                <section id="contact">
                    <h2>Get in Touch</h2>
                    <div className="card">
                        <div className="card-content">
                            <div className="card-header">
                                <h3 className="text-gradient">Let's Connect</h3>
                                <span className="type-badge">Available</span>
                            </div>
                            <p className="text-slate-300 mb-6">
                                I’m open to collaborating on AI products, creative engineering work, and high-quality digital experiences.
                                If you have a project in mind, feel free to reach out.
                            </p>
                            
                            <div className="grid">
                                <div className="skill-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                    <strong className="text-white block mb-1">Email</strong>
                                    <a href="mailto:souradip.biswas23@lpu.in" className="text-sm text-slate-400 hover:text-primary transition-colors">
                                        souradip.biswas23@lpu.in
                                    </a>
                                </div>
                                
                                <div className="skill-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                                    </svg>
                                    <strong className="text-white block mb-1">GitHub</strong>
                                    <a href="https://github.com/sobiswriter" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-primary transition-colors">
                                        @sobiswriter
                                    </a>
                                </div>
                                
                                <div className="skill-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                        <rect x="2" y="9" width="4" height="12"/>
                                        <circle cx="4" cy="4" r="2"/>
                                    </svg>
                                    <strong className="text-white block mb-1">LinkedIn</strong>
                                    <a href="https://www.linkedin.com/in/sobiswriter/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-primary transition-colors">
                                        /in/sobiswriter
                                    </a>
                                </div>
                            </div>
                            
                            <div className="mt-8 flex gap-4 justify-center">
                                <a href="mailto:souradip.biswas23@lpu.in" className="btn flex-1 text-center">
                                    <span>Send Email →</span>
                                </a>
                                <a href="https://www.linkedin.com/in/sobiswriter/" target="_blank" rel="noopener noreferrer" className="btn flex-1 text-center border-accent hover:border-accent">
                                    <span>Connect on LinkedIn →</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <p>&copy; {new Date().getFullYear()} Souradip Biswas. Built with Next.js & passion.</p>
                    <div className="mt-4">
                        <a href="https://github.com/sobiswriter" className="mx-3 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://www.linkedin.com/in/sobiswriter/" className="mx-3 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </footer>
            </main>
            <NavDock />
        </>
    );
}
