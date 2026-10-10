import { DestinationConfig } from './types';

export const GALAXY_DESTINATIONS: DestinationConfig[] = [
  {
    id: 'work',
    name: 'WORK',
    subtitle: 'Production Systems & Flagship Products',
    sectorCode: '01 / WORK',
    route: '/work',
    // Station 1: Arm A (Inner Coil - exactly on dense starlight filament)
    armIndex: 0,
    progress: 0.20,
    position: [-0.89, 0.05, 1.94],
    color: '#bae6fd', // Ice blue starlight jewel
    accentColor: '#0284c7',
    clusterRadius: 0.7,
    clusterParticleCount: 30,
    description: 'Selected commercial products, scalable web applications, and architectural leadership across production platforms.',
    stats: [
      { label: 'Featured Systems', value: '08' },
      { label: 'Active Users', value: '2.4M+' },
      { label: 'Stack Mastery', value: 'Full-Stack / WebGL' },
    ],
    tags: ['Architecture', 'Frontend', 'Three.js', 'Distributed Systems'],
    children: [
      { id: 'work-sys-1', name: 'Nexus Cloud Engine', type: 'system', route: '/work/nexus', previewTag: 'Architecture' },
      { id: 'work-sys-2', name: 'Aether Spatial Studio', type: 'system', route: '/work/aether', previewTag: 'WebGL / WebGPU' },
      { id: 'work-sys-3', name: 'Chronos Realtime DB', type: 'system', route: '/work/chronos', previewTag: 'Backend' },
    ],
  },
  {
    id: 'experiments',
    name: 'EXPERIMENTS',
    subtitle: 'Creative Code & Kinetic Prototypes',
    sectorCode: '02 / EXP',
    route: '/experiments',
    // Station 2: Arm A (Mid Coil - exactly on glowing spiral curve)
    armIndex: 0,
    progress: 0.48,
    position: [-3.49, 0.05, -3.25],
    color: '#fed7aa', // Warm amber jewel
    accentColor: '#ea580c',
    clusterRadius: 0.7,
    clusterParticleCount: 30,
    description: 'Generative algorithms, GLSL shader studies, fluid dynamics, and procedural simulations pushing visual boundaries.',
    stats: [
      { label: 'Shader Studies', value: '24' },
      { label: 'Simulation Types', value: 'GPU Particles' },
      { label: 'Render Pipeline', value: 'Custom Shaders' },
    ],
    tags: ['GLSL', 'Shaders', 'Physics', 'Audio-Reactive'],
    children: [
      { id: 'exp-sys-1', name: 'Hypercube Slices', type: 'system', route: '/experiments/hypercube', previewTag: 'Math / Geometry' },
      { id: 'exp-sys-2', name: 'Fluid Particle Swarm', type: 'system', route: '/experiments/fluid-swarm', previewTag: 'GPU Compute' },
    ],
  },
  {
    id: 'lab',
    name: 'LAB',
    subtitle: 'Research, AI Engines & Open Source',
    sectorCode: '03 / LAB',
    route: '/lab',
    // Station 3: Arm A (Outer Sweep - exactly on flowing outer arm cluster)
    armIndex: 0,
    progress: 0.76,
    position: [5.50, 0.05, -5.26],
    color: '#7dd3fc', // Diamond cyan star
    accentColor: '#0369a1',
    clusterRadius: 0.8,
    clusterParticleCount: 30,
    description: 'Deep technical research into agentic AI interfaces, custom compiler frontends, WebAssembly engines, and open libraries.',
    stats: [
      { label: 'Research Papers', value: '04' },
      { label: 'OSS Repositories', value: '18+' },
      { label: 'Total Stars', value: '4.8k' },
    ],
    tags: ['AI Agents', 'Wasm', 'Algorithms', 'Open Source'],
    children: [
      { id: 'lab-sys-1', name: 'Neural Canvas Runtime', type: 'system', route: '/lab/neural-canvas', previewTag: 'ML Model' },
      { id: 'lab-sys-2', name: 'Vector Field Solvers', type: 'system', route: '/lab/vector-fields', previewTag: 'Wasm Engine' },
    ],
  },
  {
    id: 'about',
    name: 'ABOUT',
    subtitle: 'Philosophy, Journey & Core Principles',
    sectorCode: '04 / ABOUT',
    route: '/about',
    // Station 4: Arm B (Inner Coil - symmetrical inner starlight filament)
    armIndex: 1,
    progress: 0.20,
    position: [0.89, 0.05, -1.94],
    color: '#ffffff', // Pure white starlight nucleus
    accentColor: '#94a3b8',
    clusterRadius: 0.7,
    clusterParticleCount: 30,
    description: 'The ethos behind crafting digital universes: bridging computational engineering with fine visual sensibility and design rigor.',
    stats: [
      { label: 'Experience', value: '7+ Years' },
      { label: 'Design Disciplines', value: 'Interaction & Code' },
      { label: 'Base Location', value: 'Digital Nomad' },
    ],
    tags: ['Biography', 'Design Philosophy', 'Values', 'Toolkit'],
    children: [
      { id: 'about-sys-1', name: 'Creative Philosophy', type: 'system', route: '/about/philosophy', previewTag: 'Manifesto' },
      { id: 'about-sys-2', name: 'Technical Journey', type: 'system', route: '/about/journey', previewTag: 'Milestones' },
    ],
  },
  {
    id: 'playground',
    name: 'PLAYGROUND',
    subtitle: 'Interactive Toys, Audio & Micro-apps',
    sectorCode: '05 / PLAY',
    route: '/playground',
    // Station 5: Arm B (Mid Coil - symmetrical glowing spiral curve)
    armIndex: 1,
    progress: 0.48,
    position: [3.49, 0.05, 3.25],
    color: '#fde047', // Solar golden jewel
    accentColor: '#ca8a04',
    clusterRadius: 0.7,
    clusterParticleCount: 30,
    description: 'Tactile sound synthesis, mini game prototypes, physics sandbox doodles, and joyful interactive explorations.',
    stats: [
      { label: 'Micro-Toys', value: '16' },
      { label: 'Audio Synthesizers', value: 'Web Audio API' },
      { label: 'Input Modes', value: 'Mouse / Touch / MIDI' },
    ],
    tags: ['Web Audio', 'Sandbox', 'Play', 'Micro-Interactions'],
    children: [
      { id: 'play-sys-1', name: 'Orbital Synthesizer', type: 'system', route: '/playground/orbital-synth', previewTag: 'FM Audio' },
      { id: 'play-sys-2', name: 'Gravity Marbles', type: 'system', route: '/playground/gravity-marbles', previewTag: 'Rigid Body' },
    ],
  },
  {
    id: 'contact',
    name: 'CONTACT',
    subtitle: 'Sub-space Transmission & Inquiries',
    sectorCode: '06 / CONTACT',
    route: '/contact',
    // Station 6: Arm B (Outer Sweep - symmetrical flowing outer arm cluster)
    armIndex: 1,
    progress: 0.76,
    position: [-5.50, 0.05, 5.26],
    color: '#fca5a5', // Soft peach jewel
    accentColor: '#e11d48',
    clusterRadius: 0.8,
    clusterParticleCount: 30,
    description: 'Open for strategic engineering collaborations, high-impact design engineering roles, and exploratory commissions.',
    stats: [
      { label: 'Response Time', value: '< 24 Hours' },
      { label: 'Availability', value: 'Selective' },
      { label: 'Direct Channel', value: 'Encrypted PGP' },
    ],
    tags: ['Collaboration', 'Speaking', 'Consulting', 'Transmission'],
    children: [
      { id: 'contact-sys-1', name: 'Direct Message Terminal', type: 'system', route: '/contact/form', previewTag: 'Inquiry' },
      { id: 'contact-sys-2', name: 'Public PGP Key', type: 'system', route: '/contact/pgp', previewTag: 'Security' },
    ],
  },
];
