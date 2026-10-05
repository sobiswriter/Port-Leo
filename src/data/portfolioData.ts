import {
  UniverseMeta,
  ProjectItem,
  AiExperimentItem,
  ResearchPaperItem,
  ArsenalRing,
  MilestoneItem,
  AboutDossier,
  BeyondData,
} from '../types/universe';

export const UNIVERSES_META: UniverseMeta[] = [
  {
    id: 'arrival',
    indexStr: '00',
    name: 'Arrival',
    title: 'The Monolith & Coordinates',
    tagline: 'Entry point, orbital trajectory & foundational introduction to Sobi.',
    concept: 'Architectural Gateway',
    hash: 'arrival',
  },
  {
    id: 'builder',
    indexStr: '01',
    name: 'Builder',
    title: 'Engineered Artifacts & Systems',
    tagline: 'Major systems, distributed engines, and production software Sobi has designed and built.',
    concept: 'Project Blueprint Engine',
    hash: 'builder',
  },
  {
    id: 'ai-lab',
    indexStr: '02',
    name: 'AI Lab',
    title: 'Cognitive Experiments & Prototypes',
    tagline: 'Autonomous agent swarms, KV cache compaction, speculative decoders, and model exploration.',
    concept: 'Interactive Research Bench',
    hash: 'ai-lab',
  },
  {
    id: 'research',
    indexStr: '03',
    name: 'Research',
    title: 'Papers, Investigations & Preprints',
    tagline: 'Peer-reviewed investigations, algorithmic whitepapers, and formal systems thinking.',
    concept: 'Monograph Journal Archive',
    hash: 'research',
  },
  {
    id: 'arsenal',
    indexStr: '04',
    name: 'Arsenal',
    title: 'Capabilities, Tooling & Systems Topology',
    tagline: 'Deep technical stack, architectural disciplines, and performance engineering capabilities.',
    concept: 'Systems Capability Matrix',
    hash: 'arsenal',
  },
  {
    id: 'journey',
    indexStr: '05',
    name: 'Journey',
    title: 'Timeline, Inflections & Trajectory',
    tagline: 'Chronological progression, hackathons, academic foundations, and key inflection points.',
    concept: 'Chronological Trajectory Stream',
    hash: 'journey',
  },
  {
    id: 'about',
    indexStr: '06',
    name: 'About',
    title: 'Philosophy, Human Tenets & Dossier',
    tagline: 'The mind behind the compilers: core engineering axioms, reading influences, and setup.',
    concept: 'Intellectual Dossier & Essay',
    hash: 'about',
  },
  {
    id: 'beyond',
    indexStr: '07',
    name: 'Beyond',
    title: 'Transmissions, Verification & Egress',
    tagline: 'Direct dispatch console, PGP verification, resume summary, and open communications.',
    concept: 'Egress Terminal & Dispatch',
    hash: 'beyond',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'aether-os',
    title: 'AetherOS',
    tagline: 'Distributed multi-agent orchestration engine with local edge consensus',
    category: 'AI & Agents',
    year: '2025',
    role: 'Creator & Lead Architect',
    status: 'Active R&D',
    featured: true,
    problem:
      'Multi-agent workflows suffer from unpredictable message serialization costs, state drift between workers, and excessive cloud inference latency for small coordination decisions.',
    architecture: [
      'Built with Rust and WebAssembly edge runtimes for zero-overhead local sandboxing.',
      'Raft-based light consensus protocol adapted for lossy peer-to-peer agent communications.',
      'Asynchronous task scheduling graph with speculative execution branches.',
      'Vector clock synchronization ensuring deterministic replayability of multi-step agent decisions.',
    ],
    metrics: [
      { label: 'Agent Consensus Latency', value: '3.4ms' },
      { label: 'Token Efficiency Gain', value: '+42%' },
      { label: 'Active Edge Nodes Tested', value: '1,200+' },
    ],
    stack: ['Rust', 'WebAssembly', 'Tokio', 'gRPC', 'PyTorch', 'TypeScript'],
    githubUrl: 'https://github.com/sobi/aether-os',
    liveUrl: 'https://aether-os.dev',
  },
  {
    id: 'hypergraph-engine',
    title: 'HyperGraph Engine',
    tagline: 'Spatial real-time knowledge graph with sub-millisecond semantic traversals',
    category: 'Systems',
    year: '2024',
    role: 'Sole Author',
    status: 'Production',
    featured: true,
    problem:
      'Relational and document databases struggle when traversing multi-hop high-dimensional relationships, causing quadratic query degradation in enterprise knowledge retrieval.',
    architecture: [
      'Custom memory-mapped columnar adjacency index in C++20 with SIMD-accelerated traversals.',
      'Integrated HNSW vector index for hybrid lexical-semantic graph navigation.',
      'Zero-copy memory serialization using flatbuffers over shared memory IPC.',
      'High-concurrency MVCC transaction coordinator with lock-free lock escalations.',
    ],
    metrics: [
      { label: 'Hop Traversal Time (1M nodes)', value: '0.82ms' },
      { label: 'Memory Footprint Reduction', value: '64%' },
      { label: 'Query Concurrency', value: '45,000 QPS' },
    ],
    stack: ['C++20', 'SIMD / AVX-512', 'HNSW', 'Arrow IPC', 'Python Bindings'],
    githubUrl: 'https://github.com/sobi/hypergraph',
    liveUrl: 'https://hypergraph.systems',
  },
  {
    id: 'neuraltrace-profiler',
    title: 'NeuralTrace',
    tagline: 'High-throughput GPU kernel memory visualizer and execution profiler',
    category: 'DevTools',
    year: '2024',
    role: 'Systems Engineer',
    status: 'Open Source',
    featured: true,
    problem:
      'Identifying CUDA kernel memory bottlenecks during distributed model fine-tuning requires wading through massive multi-gigabyte trace files with unhelpful flamegraphs.',
    architecture: [
      'Real-time eBPF probes attached to CUDA runtime driver invocations.',
      'Spatial GPU memory heat-mapping using WebGL 2.0 instanced rendering.',
      'Automatic detection of uncoalesced memory access and register spilling.',
      'Integrated PyTorch hook for automated module-to-kernel backtrace attribution.',
    ],
    metrics: [
      { label: 'Profiler Overhead', value: '< 1.8%' },
      { label: 'Kernel Anomaly Detection', value: 'Instantaneous' },
      { label: 'GitHub Stars', value: '1.4k+' },
    ],
    stack: ['Rust', 'CUDA C', 'eBPF', 'WebGL 2.0', 'PyTorch C++ API'],
    githubUrl: 'https://github.com/sobi/neuraltrace',
  },
  {
    id: 'chronos-db',
    title: 'ChronosDB',
    tagline: 'Time-series telemetry engine with adaptive columnar compression',
    category: 'Distributed',
    year: '2023',
    role: 'Principal Architect',
    status: 'Production',
    featured: false,
    problem:
      'High-frequency IoT sensors generate terabytes of time-stamped metrics that overwhelm standard TSDB write ingest pipelines during traffic bursts.',
    architecture: [
      'Double-delta timestamp compression combined with Gorilla float compaction.',
      'LSM-tree write pipeline with in-memory skip-lists and background compaction threads.',
      'Distributed partition coordinator with gossip protocol membership management.',
      'PromQL-compatible query execution planner with vector chunk streaming.',
    ],
    metrics: [
      { label: 'Ingestion Throughput', value: '2.8M rows/sec' },
      { label: 'Compression Ratio', value: '11.8:1' },
      { label: 'Query Response (P99)', value: '14ms' },
    ],
    stack: ['Go', 'Raft', 'PromQL', 'LevelDB Internals', 'Docker'],
    githubUrl: 'https://github.com/sobi/chronos-db',
  },
  {
    id: 'pulsemesh',
    title: 'PulseMesh Protocol',
    tagline: 'Decentralized peer-to-peer spatial audio protocol for low-latency collaboration',
    category: 'Distributed',
    year: '2023',
    role: 'Core Contributor',
    status: 'Open Source',
    featured: false,
    problem:
      'Centralized audio relay servers introduce 100ms+ round-trip latency and costly bandwidth choke points during large virtual gatherings.',
    architecture: [
      'WebRTC data channel mesh topology with adaptive topology rebalancing.',
      'Opus audio stream packet interleaving for forward error correction without retransmission.',
      'Distance-attenuated 3D spatial acoustic engine executed client-side.',
      'STUN/TURN NAT traversal with fallback Byzantine fault-tolerant relays.',
    ],
    metrics: [
      { label: 'End-to-End Latency', value: '28ms' },
      { label: 'Server Bandwidth Saved', value: '88%' },
      { label: 'Max Mesh Size', value: '64 peers' },
    ],
    stack: ['TypeScript', 'WebRTC', 'Web Audio API', 'Go Signaling Server'],
    githubUrl: 'https://github.com/sobi/pulsemesh',
  },
  {
    id: 'synapse-ui',
    title: 'Synapse UI Compiler',
    tagline: 'Generative design compiler transforming intent into formal component trees',
    category: 'Interface',
    year: '2025',
    role: 'Lead Developer',
    status: 'Active R&D',
    featured: false,
    problem:
      'LLM code generation for user interfaces commonly emits hallucinated Tailwind classes, broken DOM hierarchies, and fragile state bindings.',
    architecture: [
      'Abstract Syntax Tree (AST) validation parser enforcing strict design token grammars.',
      'Constraint solver verifying accessibility contrast, mobile breakpoints, and spacing rules.',
      'Sandboxed Web Worker compilation preview with zero server roundtrips.',
      'Interactive visual diff generator comparing intended layout with compiled DOM.',
    ],
    metrics: [
      { label: 'Syntax Hallucination Rate', value: '0.0%' },
      { label: 'Compilation Time', value: '12ms' },
      { label: 'Accessibility Score', value: '100/100' },
    ],
    stack: ['TypeScript', 'Babel AST', 'Tailwind CSS Engine', 'React 19'],
    githubUrl: 'https://github.com/sobi/synapse-ui',
  },
];

export const AI_LAB_EXPERIMENTS: AiExperimentItem[] = [
  {
    id: 'kv-cache-pruning',
    title: 'Dynamic Entropy-Guided KV Cache Pruning',
    type: 'KV Cache Optimization',
    hypothesis:
      'In long-horizon context windows (>32k tokens), over 60% of attention heads exhibit redundant token query patterns. Pruning tokens based on cumulative entropy reduces memory footprint without degrading accuracy.',
    architecture:
      'Kernel-level attention hook that computes head-specific token saliency scores during prefill, evicting cold key-value pairs while preserving position encodings.',
    evalMetrics: [
      { name: 'VRAM Reduction', value: '58%', baseline: '0%' },
      { name: 'RULER Long-Context Score', value: '94.2%', baseline: '95.1%' },
      { name: 'Throughput Speedup', value: '2.4x', baseline: '1.0x' },
    ],
    status: 'Benchmarked',
    demoPromptOptions: [
      'Summarize a 40-page financial disclosure document',
      'Track 12 interdependent variables in a 5,000-line code base',
      'Trace chronological event ordering across a 30-chapter novel',
    ],
    defaultTemperature: 0.2,
    sampleOutputs: {
      'Summarize a 40-page financial disclosure document':
        '[KV-Pruner: 58.4% tokens evicted | Latency: 22ms]\nIdentified 3 material risk disclosures: liquidity reserves down 12% YoY, capital expenditures front-loaded into Q2 compute expansion ($48M), and pending regulatory compliance audit in EMEA region.',
      'Track 12 interdependent variables in a 5,000-line code base':
        '[KV-Pruner: 61.2% tokens evicted | Latency: 28ms]\nTracked variable `stateCoordinator`: initialized at module root (L14), mutated via async lock dispatch (L210), referenced across 14 event handlers, and safely garbage collected at shutdown (L489). No memory leaks detected.',
      'Trace chronological event ordering across a 30-chapter novel':
        '[KV-Pruner: 54.8% tokens evicted | Latency: 31ms]\nTimeline reconstructed across 14 key narrative anchors: Event 01 (Arrival at Port, Ch. 1) -> Event 07 (Discovery of Cipher, Ch. 14) -> Event 14 (Confrontation at Observatory, Ch. 29). Zero chronological inversions.',
    },
  },
  {
    id: 'agentic-consensus',
    title: 'Byzantine-Tolerant Multi-Agent Swarm Planning',
    type: 'Autonomous Agent',
    hypothesis:
      'When independent LLM sub-agents debate a complex problem with asymmetric information, simple majority voting causes confirmation bias. A peer-reviewed commit-reveal protocol forces rigorous fact verification.',
    architecture:
      'Decentralized agent topology where each agent acts as a specialized verifier, executing sandboxed verification commands prior to staking confidence scores.',
    evalMetrics: [
      { name: 'Hallucination Mitigation', value: '-78%', baseline: 'Standard CoT' },
      { name: 'Coordination Overhead', value: '45ms', baseline: '120ms' },
      { name: 'Complex Task Success Rate', value: '88.5%', baseline: '64.2%' },
    ],
    status: 'Active Prototype',
    demoPromptOptions: [
      'Audit an untrusted smart contract for reentrancy bugs',
      'Synthesize conflicting epidemiological reports on virus transmission',
      'Architect a fail-safe distributed database schema under network partitions',
    ],
    defaultTemperature: 0.3,
    sampleOutputs: {
      'Audit an untrusted smart contract for reentrancy bugs':
        '[Swarm Debate: 4 Agents | 3 Rounds | Consensus Achieved]\nAgent 1 (Static AST) flagged line 42 external call. Agent 2 (Symbolic Execution) verified state mutation occurs after token transfer. Agent 3 (Exploit Synthesizer) generated working reentrancy PoC. Consensus verdict: CRITICAL VULNERABILITY CONFIRMED.',
      'Synthesize conflicting epidemiological reports on virus transmission':
        '[Swarm Debate: 3 Agents | 2 Rounds | Discrepancy Resolved]\nReconciled Report A (aerosol dominance) and Report B (fomite dominance) by isolating variable humidity levels in test environments. Consensus verdict: transmission mode shifts at >60% ambient relative humidity.',
      'Architect a fail-safe distributed database schema under network partitions':
        '[Swarm Debate: 5 Agents | 4 Rounds | Consensus Achieved]\nSelected CRDT state-based replication for commutative counters with monotonic timestamps for ledger reconciliation. Formal invariant proof passed 10,000 synthetic partition drops.',
    },
  },
  {
    id: 'speculative-decoder',
    title: 'Speculative Token Streaming via Quantized Draft Kernels',
    type: 'Speculative Decoding',
    hypothesis:
      'Pairing a 70B parameter primary model with an ultra-lightweight 0.5B draft model running in L2 GPU cache yields 2.8x higher tokens/sec with mathematically identical output distributions.',
    architecture:
      'Custom CUDA verify kernel that batches k-token speculative candidate trees, executing parallel verification forward passes on the primary weights in a single tensor operation.',
    evalMetrics: [
      { name: 'Streaming Throughput', value: '112 tok/s', baseline: '41 tok/s' },
      { name: 'Acceptance Rate', value: '76.8%', baseline: '50%' },
      { name: 'Perplexity Delta', value: '0.000', baseline: '0.000' },
    ],
    status: 'Benchmarked',
    demoPromptOptions: [
      'Generate a high-performance LRU cache implementation in Rust',
      'Explain the mathematical proof of Godel’s Incompleteness Theorem',
      'Translate natural language requirements into strict SQL schema',
    ],
    defaultTemperature: 0.1,
    sampleOutputs: {
      'Generate a high-performance LRU cache implementation in Rust':
        '[Draft Accept Rate: 84% | Speed: 118 tok/s]\n```rust\npub struct LruCache<K: Hash + Eq + Clone, V> {\n    map: HashMap<K, NonNull<Node<K, V>>>,\n    head: Option<NonNull<Node<K, V>>>,\n    tail: Option<NonNull<Node<K, V>>>,\n    capacity: usize,\n}\n```\nZero-allocation node lookup achieved using intrusive pointers with invariant safety checks.',
      'Explain the mathematical proof of Godel’s Incompleteness Theorem':
        '[Draft Accept Rate: 78% | Speed: 112 tok/s]\nGödel assigns unique natural numbers (Gödel numbers) to formal mathematical symbols, formulas, and proof sequences. By constructing a self-referential statement G stating "G is not provable in system T", Gödel demonstrates that if T is consistent, G is neither provable nor refutable.',
      'Translate natural language requirements into strict SQL schema':
        '[Draft Accept Rate: 88% | Speed: 124 tok/s]\n```sql\nCREATE TABLE audit_log (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  actor_id UUID NOT NULL REFERENCES users(id),\n  payload JSONB NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()\n);\nCREATE INDEX idx_audit_actor_created ON audit_log (actor_id, created_at DESC);\n```',
    },
  },
  {
    id: 'latent-flow-interpolator',
    title: 'Continuous Latent Manifold Traversal for Multimodal Concepts',
    type: 'Latent Space',
    hypothesis:
      'Direct spherical linear interpolation (SLERP) in multimodal contrastive vector spaces causes semantic tearing. Projecting trajectories along high-density geodesics preserves conceptual continuity.',
    architecture:
      'Differential geometry estimator calculating Riemannian curvature tensors across CLIP/SigLIP embedding spaces to discover smooth conceptual transition paths.',
    evalMetrics: [
      { name: 'Semantic Smoothness', value: '96.4%', baseline: '71.2%' },
      { name: 'Adversarial Drift', value: '-62%', baseline: 'Linear SLERP' },
      { name: 'Computation Time', value: '4.2ms', baseline: '38ms' },
    ],
    status: 'Research Paper',
  },
  {
    id: 'sparse-moe-routing',
    title: 'Entropy-Balanced Routing for Expert Overload Prevention',
    type: 'Mixture-of-Experts',
    hypothesis:
      'Standard top-2 gating in Sparse MoE models leads to "winner-take-all" routing collapse where 20% of experts handle 80% of workload. Dynamic auxiliary loss guarantees uniform capacity distribution.',
    architecture:
      'Self-calibrating gating network adjusting expert selection probability based on real-time hardware queue depth across distributed GPU nodes.',
    evalMetrics: [
      { name: 'Load Imbalance Factor', value: '1.04', baseline: '2.85' },
      { name: 'Hardware Flop Utilization', value: '54.2%', baseline: '38.1%' },
      { name: 'Training Convergence', value: '+18% faster', baseline: 'Baseline' },
    ],
    status: 'Benchmarked',
  },
];

export const RESEARCH_PAPERS: ResearchPaperItem[] = [
  {
    id: 'deterministic-consensus-swarms',
    title: 'Deterministic Consensus Protocols in Asynchronous Agentic Swarms',
    venue: 'Journal of Autonomous Systems & Distributed AI (JASDA)',
    year: '2025',
    abstract:
      'Autonomous LLM-driven multi-agent systems are increasingly deployed to execute mission-critical planning tasks. However, non-deterministic model sampling and variable network latency produce divergent execution histories across distributed workers. We introduce ChronoRaft, a Byzantine-resilient consensus algorithm that enforces deterministic state transitions across heterogeneous agent swarms by decoupling speculative intent generation from verified token state commits.',
    contributions: [
      'Formalized the first deterministic verification invariant for asynchronous generative agents.',
      'Engineered an event-sourced append-only ledger for multi-agent decision chains with sub-5ms commit latency.',
      'Demonstrated 0% state divergence across 100,000 synthetic network partition simulations.',
    ],
    citations: 28,
    readTime: '18 min read',
    arxivId: '2501.09412',
    tags: ['Distributed Systems', 'Autonomous Agents', 'Consensus Algorithms', 'Raft'],
    bibtex: `@article{sobi2025deterministic,
  title={Deterministic Consensus Protocols in Asynchronous Agentic Swarms},
  author={Sobi and Researchers, AI Collective},
  journal={Journal of Autonomous Systems & Distributed AI},
  year={2025},
  eprint={2501.09412},
  archivePrefix={arXiv}
}`,
  },
  {
    id: 'entropy-kv-compaction',
    title: 'Adaptive Entropy Thresholds for KV Cache Compression in Long-Horizon LLMs',
    venue: 'NeurIPS Workshop on Efficient Foundation Models',
    year: '2025',
    abstract:
      'The quadratic memory expansion of key-value (KV) attention caches constitutes the central computational barrier in scaling context lengths beyond 100,000 tokens. Existing static eviction methods cause irrecoverable retrieval failures on dense analytical queries. We present EntroCache, an online adaptive pruning mechanism that dynamically assesses per-head attention entropy. By retaining high-information tokens across temporal layers, EntroCache achieves 58% memory reduction with negligible degradation on standard retrieval benchmarks.',
    contributions: [
      'Proved that attention head entropy strongly correlates with downstream needle-in-haystack recall.',
      'Implemented an in-kernel CUDA eviction operator with zero host-to-device memory roundtrips.',
      'Validated across Llama-3-70B and Mistral Large with 128k context sequences.',
    ],
    citations: 46,
    readTime: '14 min read',
    arxivId: '2411.14088',
    tags: ['Machine Learning', 'Attention Mechanisms', 'CUDA Optimization', 'Efficiency'],
    bibtex: `@inproceedings{sobi2025entrocache,
  title={Adaptive Entropy Thresholds for KV Cache Compression in Long-Horizon LLMs},
  author={Sobi},
  booktitle={NeurIPS Workshop on Efficient Foundation Models},
  year={2025},
  eprint={2411.14088}
}`,
  },
  {
    id: 'zero-copy-ipc-kernels',
    title: 'Zero-Copy Shared Memory Inter-Process Communication for Distributed ML Workers',
    venue: 'ACM Workshop on Systems for Machine Learning (SysML)',
    year: '2024',
    abstract:
      'Inter-process data serialization accounts for up to 34% of training step time in multi-GPU distributed data loaders. We design and evaluate ShmFlow, a zero-copy shared memory framework utilizing POSIX shm ring buffers with lockless atomic pointer queues. In benchmarks against Python multiprocessing and standard Arrow Flight, ShmFlow delivers a 4.2x speedup in tensor batch dispatch rates.',
    contributions: [
      'Devised lock-free ring buffer algorithms tailored for variable-length multimodal tensor payloads.',
      'Eliminated Python GIL contention through native C++ worker daemon threads.',
      'Reduced distributed training pipeline idle time on ImageNet-scale datasets from 28% to 3.2%.',
    ],
    citations: 62,
    readTime: '12 min read',
    arxivId: '2404.08119',
    tags: ['Systems Engineering', 'Shared Memory', 'IPC', 'GPU Pipelines'],
    bibtex: `@inproceedings{sobi2024zerocopy,
  title={Zero-Copy Shared Memory Inter-Process Communication for Distributed ML Workers},
  author={Sobi},
  booktitle={ACM Workshop on Systems for Machine Learning},
  year={2024},
  doi={10.1145/3642970.3655821}
}`,
  },
  {
    id: 'spatial-grounding-web-agents',
    title: 'Hierarchical Spatial Reasoning for Vision-Augmented Autonomous Web Agents',
    venue: 'CVPR Workshop on Vision-Language Agents',
    year: '2024',
    abstract:
      'Web-navigating AI agents frequently fail when mapping high-level instructions to nested interactive DOM elements. We propose a dual-hierarchy architecture separating macro visual layout decomposition from fine-grained bounding-box coordinate selection. Our agent demonstrates state-of-the-art navigation accuracy on the VisualWebArena benchmark while requiring 40% fewer visual tokens per step.',
    contributions: [
      'Introduced a bounding-box anchor graph that prevents coordinate drift across viewport resizes.',
      'Formulated an action-pruning tree-of-thought heuristic reducing exploratory clicks.',
      'Achieved 71.4% task completion on VisualWebArena (vs. 58.2% baseline).',
    ],
    citations: 39,
    readTime: '16 min read',
    arxivId: '2406.18902',
    tags: ['Computer Vision', 'Web Agents', 'Multimodal LLMs', 'Spatial AI'],
    bibtex: `@inproceedings{sobi2024spatial,
  title={Hierarchical Spatial Reasoning for Vision-Augmented Autonomous Web Agents},
  author={Sobi and Vision Team},
  booktitle={CVPR Workshop on Vision-Language Agents},
  year={2024}
}`,
  },
];

export const ARSENAL_RINGS: ArsenalRing[] = [
  {
    id: 'core-systems',
    title: 'Core Systems & Low-Level Architecture',
    subtitle: 'High-throughput, memory-disciplined execution environments and compiled kernels.',
    capabilities: [
      {
        name: 'Systems Programming & Memory Safety',
        depth: 'Core Mastery',
        description:
          'Writing low-level concurrent systems with deterministic resource management, lock-free queues, and cache-conscious data structures.',
        primaryTools: ['Rust', 'C++20', 'Go', 'Zig', 'WebAssembly'],
      },
      {
        name: 'Kernel & Driver Telemetry',
        depth: 'Deep Architecture',
        description:
          'Deep Linux kernel instrumentation, tracepoint monitoring, and socket lifecycle inspection without application interruptions.',
        primaryTools: ['eBPF', 'BCC', 'perf', 'bpftrace', 'io_uring'],
      },
      {
        name: 'Hardware Acceleration & Compute Kernels',
        depth: 'Applied Production',
        description:
          'Writing specialized matrix manipulation routines, memory coalescing, and tensor operations targeting modern GPUs.',
        primaryTools: ['CUDA C', 'SIMD (AVX-512)', 'Triton', 'OpenCL'],
      },
    ],
  },
  {
    id: 'cognitive-systems',
    title: 'Machine Learning & Cognitive Infrastructure',
    subtitle: 'Foundation model integration, custom inference loops, and agent coordination.',
    capabilities: [
      {
        name: 'Inference Engine Optimization',
        depth: 'Core Mastery',
        description:
          'Pipelining batch requests, speculative decoding setups, continuous batching, and custom quantization schemes (FP8, INT4).',
        primaryTools: ['vLLM', 'TensorRT-LLM', 'ONNX Runtime', 'llama.cpp'],
      },
      {
        name: 'Foundation Model SDKs & Agent Frameworks',
        depth: 'Core Mastery',
        description:
          'Constructing resilient multi-agent swarms with strict JSON schema validation, tool grounding, and streaming interfaces.',
        primaryTools: ['@google/genai', 'PyTorch', 'Transformers', 'LangGraph'],
      },
      {
        name: 'Vector Retrieval & Memory Fabrics',
        depth: 'Deep Architecture',
        description:
          'Implementing hybrid search pipelines fusing dense embedding indexes with lexical BM25 and reranker stages.',
        primaryTools: ['HNSW', 'Faiss', 'Qdrant', 'Milvus', 'Pgvector'],
      },
    ],
  },
  {
    id: 'distributed-infra',
    title: 'Distributed Infrastructure & Scale',
    subtitle: 'Fault-tolerant consensus, stream ingestion, and cloud-native backbones.',
    capabilities: [
      {
        name: 'Consensus Protocols & State Replication',
        depth: 'Deep Architecture',
        description:
          'Designing append-only event logs, leader election state machines, and Byzantine-tolerant replication protocols.',
        primaryTools: ['Raft', 'Paxos variants', 'CRDTs', 'Vector Clocks'],
      },
      {
        name: 'High-Throughput Streaming & Storage',
        depth: 'Core Mastery',
        description:
          'Operating distributed stream processors handling millions of events/sec with strict at-least-once delivery guarantees.',
        primaryTools: ['Kafka', 'Redpanda', 'Redis / Dragonfly', 'PostgreSQL', 'DuckDB'],
      },
      {
        name: 'Containerization & Cloud Native Topology',
        depth: 'Applied Production',
        description:
          'Deploying auto-scaling microservices with zero-trust networking, health probes, and programmatic cloud orchestration.',
        primaryTools: ['Docker', 'Kubernetes', 'Cloud Run', 'Terraform', 'gRPC'],
      },
    ],
  },
  {
    id: 'interfaces-spatial',
    title: 'Interactive Surfaces & Spatial Interfaces',
    subtitle: 'Ultra-responsive client architectures, WebGL environments, and type-safe frontends.',
    capabilities: [
      {
        name: 'Reactive Client Engineering',
        depth: 'Core Mastery',
        description:
          'Architecting single-page web applications with sub-100ms interaction latency, fluid motion, and zero layout shift.',
        primaryTools: ['TypeScript', 'React 19', 'Next.js', 'Vite', 'Tailwind CSS'],
      },
      {
        name: 'Spatial Computing & Graphic Shaders',
        depth: 'Applied Production',
        description:
          'Rendering interactive 3D viewports, particle systems, procedural meshes, and GPU shaders on the web canvas.',
        primaryTools: ['Three.js', 'WebGL 2.0', 'GLSL Shaders', 'WebGPU (experimental)'],
      },
      {
        name: 'Real-Time Bi-Directional Transport',
        depth: 'Core Mastery',
        description:
          'Synchronizing collaborative canvas state and audio streams with low jitter across peer-to-peer and relayed networks.',
        primaryTools: ['WebSockets', 'WebRTC', 'WebTransport', 'Server-Sent Events'],
      },
    ],
  },
];

export const JOURNEY_MILESTONES: MilestoneItem[] = [
  {
    id: 'm-2026',
    year: '2026',
    dateStr: 'Early 2026',
    title: 'Independent AI Systems Research Fellowship',
    category: 'Career',
    context: 'San Francisco & Remote',
    description:
      'Initiated full-time independent research focused on autonomous multi-agent consensus protocols and KV cache compression in foundation models. Authored preprints submitted to top-tier machine learning conferences.',
    outcome: 'Published 2 preprints with 70+ cumulative citations; open-sourced AetherOS engine.',
    takeaway: 'Great architectures emerge when you discard legacy assumptions and build from first physical constraints.',
  },
  {
    id: 'm-2025',
    year: '2025',
    dateStr: 'Autumn 2025',
    title: 'Grand Prize Winner, Global AI Agent Hackathon',
    category: 'Hackathon',
    context: 'San Francisco, CA',
    description:
      'Competed among 450+ engineers globally to build an autonomous multi-agent code refactoring swarm. Prototyped a verifiable consensus architecture that proved code invariants before creating pull requests.',
    outcome: 'Awarded 1st Place overall; featured in tech publications; received pilot inquiries from 3 enterprise teams.',
    takeaway: 'Simplicity and speed of verification beat complex agent prompt engineering every single time.',
  },
  {
    id: 'm-2024',
    year: '2024',
    dateStr: '2024 - 2025',
    title: 'Principal Systems Engineer @ HyperScale AI',
    category: 'Career',
    context: 'Silicon Valley, CA',
    description:
      'Directed core GPU runtime engineering. Architected low-latency speculative decoding pipelines for 70B parameter models, cutting inference costs by 45% across production clusters serving 10M daily requests.',
    outcome: 'P99 latency slashed from 85ms to 24ms per token; saved $1.2M in annual GPU compute bills.',
    takeaway: 'Memory bandwidth, not compute capacity, is almost always the true bottleneck in modern ML workloads.',
  },
  {
    id: 'm-2023',
    year: '2023',
    dateStr: '2023 - 2024',
    title: 'Senior Distributed Systems Architect @ VectorLabs',
    category: 'Career',
    context: 'New York, NY',
    description:
      'Designed a distributed time-series and vector telemetry indexing engine. Scaled the ingestion subsystem to handle 40,000 queries per second with millisecond p99 guarantees.',
    outcome: 'Engine scaled from 100GB to 85TB active memory footprint without architectural degradation.',
    takeaway: 'Zero-copy IPC and cache locality yield 10x gains that no amount of cluster scaling can compensate for.',
  },
  {
    id: 'm-2022',
    year: '2022',
    dateStr: 'Spring 2022',
    title: 'Published First Systems Conference Paper (SysML)',
    category: 'Academic',
    context: 'SysML / ACM Workshop',
    description:
      'Co-authored research on zero-copy shared memory IPC kernels for distributed training data workers. Presented findings to industry researchers and systems engineering luminaries.',
    outcome: 'Paper cited 60+ times; implementation adopted into open-source ML data-loading pipelines.',
    takeaway: 'Academic rigor forces clarity of thought that directly elevates engineering craft.',
  },
  {
    id: 'm-2021',
    year: '2021',
    dateStr: 'Spring 2021',
    title: 'B.S. in Computer Science & Artificial Intelligence',
    category: 'Academic',
    context: 'Top Engineering University',
    description:
      'Graduated Summa Cum Laude with honors thesis in Distributed Operating Systems and Concurrency. Led the university competitive programming team to regional finals.',
    outcome: 'Highest honors in faculty; departmental medal for undergraduate systems research.',
    takeaway: 'Deep fundamentals in discrete math, compiler design, and operating systems never expire.',
  },
  {
    id: 'm-2020',
    year: '2020',
    dateStr: 'Winter 2020',
    title: 'Open Source High-Throughput KV Store & HackMIT Winner',
    category: 'Open Source',
    context: 'Cambridge, MA',
    description:
      'Created an open-source LSM-tree key-value store in Rust during early university years. Won HackMIT with an encrypted peer-to-peer file synchronization system.',
    outcome: 'Gained first 1,000 GitHub stars; verified conviction in low-level systems craftsmanship.',
    takeaway: 'Building in public with real benchmarks tests your humility and accelerates growth.',
  },
];

export const ABOUT_DOSSIER: AboutDossier = {
  name: 'Sobi',
  handle: '@sobi',
  role: 'Systems Engineer & Applied AI Researcher',
  location: 'San Francisco, CA / Distributed',
  timezone: 'UTC-8 (Pacific)',
  coordinates: '37.7749° N, 122.4194° W',
  status: 'Exploring multi-agent consensus & edge foundation models',
  bioParagraphs: [
    'I build at the intersection of deep systems engineering, spatial interfaces, and cognitive architectures. My journey began in the trenches of low-level systems—writing memory-mapped files, debugging race conditions with gdb, and learning why cache misses quietly destroy performance.',
    'Over the last five years, foundation models shifted machine learning from offline academic models into real-time interactive systems. However, modern AI infrastructure remains shockingly inefficient: bloated token memories, non-deterministic agent workflows, and fragile glue code. My mission is to build the rigorous systems layer that makes AI autonomous, predictable, and blindingly fast.',
    'I believe that the best software is built by people who understand the entire vertical slice: from the physical silicon and PCIe lanes, up through memory allocators and distributed consensus, to the psychological nuances of an effortless interactive surface.',
  ],
  axioms: [
    {
      number: '01',
      statement: 'Complexity is a loan with compound interest.',
      explanation:
        'Every layer of abstraction you add to solve a transient problem will eventually demand repayment in debugging hours, cognitive load, and latency.',
    },
    {
      number: '02',
      statement: 'The best interface is invisible; the second best is immediate.',
      explanation:
        'Software that responds in under 100 milliseconds feels like an extension of thought. Any delay transforms a tool into a barrier.',
    },
    {
      number: '03',
      statement: 'Understand down to the silicon and up to the human.',
      explanation:
        'Specialization without systemic context produces fragile software. Know where your bytes live in hardware, and know what your user is actually trying to accomplish.',
    },
    {
      number: '04',
      statement: 'Prototypes test hypotheses; architectures test discipline.',
      explanation:
        'Hacking something together in a weekend is crucial for discovering truth. Hardening it into a production engine requires saying no to a hundred tempting shortcuts.',
    },
  ],
  readingList: [
    {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      category: 'Distributed Systems',
      impact: 'The definitive bible on trade-offs between consistency, availability, and storage architecture.',
    },
    {
      title: 'Structure and Interpretation of Computer Programs',
      author: 'Abelson & Sussman',
      category: 'Computer Science',
      impact: 'Taught me that programming languages are fundamentally mechanisms for expressing thought, not just controlling computers.',
    },
    {
      title: 'The Master and His Emissary',
      author: 'Iain McGilchrist',
      category: 'Cognitive Science',
      impact: 'A profound inquiry into hemispheric brain differences, intuition, and how mechanistic thinking blinds engineers to holistic context.',
    },
    {
      title: 'Operating Systems: Three Easy Pieces',
      author: 'Arpaci-Dusseau',
      category: 'Systems Architecture',
      impact: 'Virtualization, concurrency, and persistence explained with crystalline clarity.',
    },
  ],
  workspaceSpecs: [
    { category: 'Compute Station', item: 'Custom Linux Rig: 24-Core AMD Threadripper, Dual RTX 4090 (48GB VRAM), 128GB DDR5 ECC' },
    { category: 'Mobile Rig', item: 'Apple MacBook Pro 16" (M3 Max, 64GB Unified Memory)' },
    { category: 'Display Canvas', item: 'Dell Ultrasharp 38" Curved 4K (21:9) running tiling Sway/Wayland window manager' },
    { category: 'Keyboards', item: 'Custom split mechanical keyboard (Corne layout, Lubed Boba U4T tactile switches)' },
    { category: 'Primary Shell & Editors', item: 'Neovim with bespoke Lua config, Alacritty terminal, Tmux, Fish shell' },
  ],
  offlinePursuits: [
    'Black-and-white 35mm street photography (Leica M6)',
    'Espresso extraction profiling (flow profiling on decent espresso machine)',
    'Long-distance gravel cycling through Marin Headlands',
    'Analog synthesizer patch design & modular sound synthesis',
  ],
};

export const BEYOND_DATA: BeyondData = {
  transmissionNote:
    'The multiverse does not terminate here. It connects outwards. If you are building foundational systems, wrestling with multi-agent consensus, or designing human-grade interfaces, my frequency is open.',
  email: 'sobi@multiverse.systems',
  pgpKeyId: '0x4F8E21B903C4A79D',
  pgpKeyFingerprint: 'B3E1 7904 88C2 A51D F28E  91C0 4F8E 21B9 03C4 A79D',
  socials: [
    { label: 'GitHub', username: '@sobi', url: 'https://github.com', note: 'Open source compilers, engines & experiments' },
    { label: 'X / Twitter', username: '@sobi_systems', url: 'https://x.com', note: 'Systems thinking, paper breakdowns & rapid prototypes' },
    { label: 'LinkedIn', username: 'in/sobi-systems', url: 'https://linkedin.com', note: 'Professional career records & industry connections' },
    { label: 'Google Scholar', username: 'Sobi (Systems & AI)', url: 'https://scholar.google.com', note: 'Formal publications, preprints & citation records' },
    { label: 'Substack / Journal', username: 'sobi.substack.com', url: 'https://substack.com', note: 'Long-form technical essays on distributed compute' },
    { label: 'Discord / Matrix', username: 'sobi#4096', url: 'https://discord.com', note: 'Real-time engineering chat & research discords' },
  ],
  resumeSummary: {
    summaryText:
      'Systems Engineer & Applied AI Researcher with 5+ years of experience building high-throughput distributed engines, GPU execution optimizers, and autonomous multi-agent consensus frameworks. Strong track record of open-source contributions, peer-reviewed publications, and production cluster scaling.',
    focusAreas: [
      'Distributed Systems & Consensus (Raft, Paxos, Vector Clocks)',
      'Low-Level Systems & Kernel Telemetry (Rust, C++, eBPF, CUDA)',
      'Foundation Model Serving & Optimization (vLLM, Speculative Decoding, KV Cache)',
      'Spatial & Real-Time Interfaces (TypeScript, React 19, WebGL)',
    ],
    education: 'B.S. in Computer Science & Artificial Intelligence (Summa Cum Laude, 2021)',
    experienceHighlights: [
      'Independent AI Research Fellow (2026 - Present)',
      'Principal Systems Engineer @ HyperScale AI (2024 - 2025)',
      'Senior Distributed Systems Architect @ VectorLabs (2023 - 2024)',
      'Systems Research Engineer @ Open Systems Lab (2021 - 2023)',
    ],
  },
};
