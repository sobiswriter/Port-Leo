export type CosmicHierarchyLevel = 'galaxy' | 'region' | 'system' | 'planet' | 'project';

export interface CosmicStat {
  label: string;
  value: string;
}

export interface CosmicSubNode {
  id: string;
  name: string;
  type: CosmicHierarchyLevel;
  route: string;
  description?: string;
  previewTag?: string;
}

export interface DestinationConfig {
  id: string;
  name: string;
  subtitle: string;
  sectorCode: string;
  route: string;
  /**
   * 3D spatial position in galaxy coordinates [X, Y, Z]
   */
  position: [number, number, number];
  /**
   * Spiral arm index (0, 1 = primary arms; 2, 3 = secondary arms)
   */
  armIndex?: number;
  /**
   * Progress along spiral arm filament [0.0 to 1.0]
   */
  progress?: number;
  /**
   * Primary aesthetic theme color for landmark beacon & local stellar cluster
   */
  color: string;
  /**
   * Secondary ambient glow color
   */
  accentColor: string;
  /**
   * Radius of local stellar concentration around this landmark
   */
  clusterRadius: number;
  /**
   * Number of dense cluster particles around this beacon
   */
  clusterParticleCount: number;
  /**
   * High-level description of what this sector represents
   */
  description: string;
  /**
   * Metrics or counters displayed on hover / inspection
   */
  stats: CosmicStat[];
  /**
   * Keywords or tags
   */
  tags: string[];
  /**
   * Sub-nodes for hierarchical expansion (Region -> Star System -> Planet -> Project)
   */
  children?: CosmicSubNode[];
}

export interface ProjectedDestination {
  id: string;
  x: number;
  y: number;
  scale: number;
  visible: boolean;
  distanceToCamera: number;
}

export interface GalaxyInteractionState {
  hoveredDestinationId: string | null;
  selectedDestinationId: string | null;
  activeRoute: string;
  isTraveling: boolean;
  travelProgress: number;
  isMuted: boolean;
}

export interface GalaxyProps {
  destinations?: DestinationConfig[];
  onDestinationSelect?: (destination: DestinationConfig) => void;
  onReturnHome?: () => void;
  className?: string;
  initialMuted?: boolean;
  /** Called after the camera arrives. Use to open an existing page. */
  onDestinationEnter?: (destination: DestinationConfig) => void;
  /** Let the host app own routes instead of writing sample hash routes. */
  manageHistory?: boolean;
  reducedMotion?: boolean;
  enabled?: boolean;
  journey?: { from: string | null; to: string | null; sequence: number };
  onHomeEnter?: () => void;
  onReady?: () => void;
  onDestinationIntent?: (destination: DestinationConfig) => void;
}
