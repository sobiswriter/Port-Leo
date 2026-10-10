import * as THREE from 'three';
import { DestinationConfig, ProjectedDestination } from './types';
import {
  galaxyVertexShader,
  galaxyFragmentShader,
  backgroundStarsVertexShader,
  backgroundStarsFragmentShader,
} from './shaders';

export interface GalaxyEngineOptions {
  canvas: HTMLCanvasElement;
  destinations: DestinationConfig[];
  onProjectedPositionsUpdate: (positions: ProjectedDestination[]) => void;
  onTravelComplete: (destinationId: string) => void;
  onReturnHomeComplete: () => void;
  reducedMotion?: boolean;
  onDistanceChange?: (distance: number) => void;
}

interface StarMetaData {
  armIndex: number; // 0, 1: primary arms, 2, 3: secondary spurs, -1: central bulge, -2: ambient disc haze, -3: physical landmark jewel star
  baseRadiusFactor: number;
  thetaOffset: number;
  dPerp: number;
  heightOffset: number;
  inwardSpeed: number;
}

interface LandmarkPhysics {
  id: string;
  config: DestinationConfig;
  basePos: THREE.Vector3;
  currentPos: THREE.Vector3;
  velocity: THREE.Vector3;
  starIndex: number;
}

export class GalaxyEngine {
  private canvas: HTMLCanvasElement;
  private destinations: DestinationConfig[];
  private onProjectedPositionsUpdate: (positions: ProjectedDestination[]) => void;
  private onTravelComplete: (destinationId: string) => void;
  private onReturnHomeComplete: () => void;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  // Scene Objects
  private galaxyPoints!: THREE.Points;
  private galaxyMaterial!: THREE.ShaderMaterial;
  private backgroundStars!: THREE.Points;
  private coreGlowMesh!: THREE.Sprite;
  private dustPoints!: THREE.Points;
  private reducedMotion = false;
  private resizeObserver!: ResizeObserver;
  private enabled = true;
  private onDistanceChange?: (distance: number) => void;
  private smoothedDistance = 29;
  private reportedDistance = 0;
  private pinchDistance = 0;
  private environments = new THREE.Group();
  private starSystems = new THREE.Group();
  private journeyArc = new THREE.Vector3();
  private isCrossing = false;
  private inspectedDestinationId: string | null = null;

  // Real Physical Particle Simulation Arrays
  private totalStars = 7800;
  private basePositions!: Float32Array;
  private currentPositions!: Float32Array;
  private velocities!: Float32Array;
  private progressValues!: Float32Array;
  private metaData: StarMetaData[] = [];

  // Physical Landmark Particles (Sticking along spiral arms with snappy return)
  private landmarkParticles: Map<string, LandmarkPhysics> = new Map();

  // Galactic Rotation & Dynamic Revolution Control
  private patternAngle = 0;
  private currentPatternSpeed = 0;
  private targetPatternSpeed = 0;

  // Animation & Clock
  private lastFrameTime = performance.now();
  private elapsedTime = 0;
  private animationFrameId: number | null = null;
  private isDestroyed = false;

  // Mouse, Raycasting & Enhanced 3D Cursor Physics
  private isMouseOver = false;
  private mouseNorm = new THREE.Vector2(0, 0);
  private raycaster = new THREE.Raycaster();
  private galaxyPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private mouseWorldPos = new THREE.Vector3(9999, 9999, 9999);

  // 3D Orbit Drag Controls
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private userRotation = new THREE.Vector2(0, 0); // yaw, pitch
  private targetUserRotation = new THREE.Vector2(0, 0);
  private rotationVelocity = new THREE.Vector2(0, 0);

  // Steady, Centered Camera
  private homeCamDistance = 22.0;
  private homeCamElevation = 0.65;
  private homeCamPos = new THREE.Vector3(0, 13.8, 17.2);
  private homeCamLookAt = new THREE.Vector3(0, 0, 0);
  private currentCamLookAt = new THREE.Vector3(0, 0, 0);
  private targetCamLookAt = new THREE.Vector3(0, 0, 0);

  // Cinematic Travel States
  private isTraveling = false;
  private isReturning = false;
  private travelStartTime = 0;
  private travelDuration = 2.2;
  private travelStartPos = new THREE.Vector3();
  private travelEndPos = new THREE.Vector3();
  private travelStartLookAt = new THREE.Vector3();
  private travelEndLookAt = new THREE.Vector3();
  private activeDestinationId: string | null = null;
  private hoveredDestinationId: string | null = null;
  private hoverStrength = 0;

  private tempVec = new THREE.Vector3();
  private starAnchor = new THREE.Vector3();

  constructor(options: GalaxyEngineOptions) {
    this.canvas = options.canvas;
    this.destinations = options.destinations;
    this.onProjectedPositionsUpdate = options.onProjectedPositionsUpdate;
    this.onTravelComplete = options.onTravelComplete;
    this.onReturnHomeComplete = options.onReturnHomeComplete;
    this.reducedMotion = options.reducedMotion ?? false;
    this.onDistanceChange = options.onDistanceChange;
    if (this.reducedMotion) this.travelDuration = 0.01;

    try { this.init(); } catch (error) { this.destroy(); throw error; }
  }

  private init(): void {
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    const width = this.canvas.parentElement?.clientWidth || window.innerWidth;
    const height = this.canvas.parentElement?.clientHeight || window.innerHeight;

    // 1. Deep Space Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020306);

    // 2. Camera Setup
    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 1000);
    this.homeCamDistance = Math.max(29, 27 / (width / height));
    this.smoothedDistance = this.homeCamDistance;
    this.homeCamPos.set(0, Math.sin(this.homeCamElevation) * this.homeCamDistance, Math.cos(this.homeCamElevation) * this.homeCamDistance);
    if (width > 1000) this.camera.setViewOffset(width, height, width * 0.08, 0, width, height);
    this.camera.position.copy(this.homeCamPos);
    this.currentCamLookAt.copy(this.homeCamLookAt);
    this.targetCamLookAt.copy(this.homeCamLookAt);
    this.camera.lookAt(this.currentCamLookAt);

    // 3. WebGL Renderer with capped DPR
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(dpr);

    // 4. Construct Cosmos
    this.createRichDeepSkyStars();
    this.createComprehensiveMilkyWay();
    this.createCoreGlow();
    this.createUniverseDepth();
    this.createStarSystems();
    this.renderer.compile(this.scene, this.camera);

    // 5. Interaction Listeners
    window.addEventListener('resize', this.onResize);
    this.resizeObserver = new ResizeObserver(this.onResize);
    this.resizeObserver.observe(this.canvas.parentElement!);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('blur', this.onMouseUp);
    this.canvas.addEventListener('mouseenter', this.onMouseEnter);
    this.canvas.addEventListener('mouseleave', this.onMouseLeave);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('touchstart', this.onTouchStart, { passive: false });
    this.canvas.addEventListener('touchmove', this.onTouchMove, { passive: false });
    window.addEventListener('touchend', this.onTouchEnd);
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    // 6. Start Physics & Render Loop
    this.animate();
  }

  private createRichDeepSkyStars(): void {
    const count = 6800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randomPhases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const radius = i < 800 ? 18 + Math.random() * 55 : 80 + Math.random() * 180;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = Math.random() < 0.08 ? 1.8 + Math.random() : 0.55 + Math.random() * 1.1;
      randomPhases[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aRandomPhase', new THREE.BufferAttribute(randomPhases, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: backgroundStarsVertexShader,
      fragmentShader: backgroundStarsFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.backgroundStars = new THREE.Points(geometry, material);
    this.scene.add(this.backgroundStars);
  }

  /**
   * Constructs the comprehensive Milky Way galaxy:
   * 1. Vast, dense, smooth spherical/barred central bulge (zero voids)
   * 2. Uneven inter-arm star density (no dead space)
   * 3. Rigid pattern rotation with continuous inward accretion
   */
  private createComprehensiveMilkyWay(): void {
    const primaryArmStars = 3800;
    const secondaryArmStars = 1900;
    const centralBulgeStars = 1000; // 1600 dense stars forming vast central bulge
    const unevenDiscStars = 1600;   // 1600 uneven disc stars filling all voids
    const landmarkStars = this.destinations.length; // physical landmark jewel stars
    this.totalStars = primaryArmStars * 2 + secondaryArmStars * 2 + centralBulgeStars + unevenDiscStars + landmarkStars;

    this.basePositions = new Float32Array(this.totalStars * 3);
    this.currentPositions = new Float32Array(this.totalStars * 3);
    this.velocities = new Float32Array(this.totalStars * 3);
    this.progressValues = new Float32Array(this.totalStars);
    this.metaData = [];

    const sizes = new Float32Array(this.totalStars);
    const colors = new Float32Array(this.totalStars * 3);
    const randomPhases = new Float32Array(this.totalStars);
    const hasSpikes = new Float32Array(this.totalStars);
    const baseAlphas = new Float32Array(this.totalStars);

    // Starlight Colors
    const colPureWhite = new THREE.Color('#ffffff');
    const colIceBlue = new THREE.Color('#bae6fd');
    const colDiamondBlue = new THREE.Color('#7dd3fc');
    const colWarmAmber = new THREE.Color('#fed7aa');
    const colWarmPeach = new THREE.Color('#c1accf');
    const colSolarGold = new THREE.Color('#e4c8a0');
    const colIvoryCore = new THREE.Color('#fef3c7');

    const gaussianRandom = (): number => {
      let u = 0;
      let v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    let idx = 0;

    const setupStar = (
      meta: StarMetaData,
      progress: number,
      size: number,
      color: THREE.Color,
      spike: boolean,
      alpha: number
    ) => {
      this.metaData.push(meta);
      this.progressValues[idx] = progress;

      const pos = this.evaluateStarBasePosition(meta, progress, 0);

      const i3 = idx * 3;
      this.basePositions[i3] = pos.x;
      this.basePositions[i3 + 1] = pos.y;
      this.basePositions[i3 + 2] = pos.z;

      this.currentPositions[i3] = pos.x;
      this.currentPositions[i3 + 1] = pos.y;
      this.currentPositions[i3 + 2] = pos.z;

      this.velocities[i3] = 0;
      this.velocities[i3 + 1] = 0;
      this.velocities[i3 + 2] = 0;

      sizes[idx] = size;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      randomPhases[idx] = Math.random();
      hasSpikes[idx] = spike ? 1.0 : 0.0;
      baseAlphas[idx] = alpha;

      idx++;
    };

    // --- 1. Primary Spiral Arms (Arm 0: 0, Arm 1: PI) ---
    const primaryBases = [0, Math.PI];
    primaryBases.forEach((baseAngle, armNum) => {
      for (let i = 0; i < primaryArmStars; i++) {
        const progress = i / primaryArmStars;
        const sigma = 0.25 + 1.05 * Math.pow(progress, 1.25);
        const gOffset = gaussianRandom();
        const dPerp = gOffset * sigma;
        const yOffset = gaussianRandom() * (0.07 + 0.16 * progress);
        const distRatio = Math.abs(gOffset);

        let size: number;
        let hasSpike = false;
        let alpha = 0.95;

        if (distRatio < 0.65 && Math.random() < 0.09) {
          size = 3.0 + Math.random() * 0.9;
          hasSpike = true;
          alpha = 1.0;
        } else if (distRatio < 1.3 && Math.random() < 0.3) {
          size = 1.8 + Math.random() * 0.7;
          alpha = 0.88;
        } else {
          size = 0.7 + Math.random() * 0.6;
          alpha = Math.max(0.2, 0.75 - distRatio * 0.16);
        }

        const col = new THREE.Color();
        const rCol = Math.random();
        if (rCol < 0.44) col.copy(colPureWhite).lerp(colIceBlue, Math.random() * 0.5);
        else if (rCol < 0.72) col.copy(Math.random() < 0.5 ? colWarmAmber : colWarmPeach);
        else if (rCol < 0.88) col.copy(colDiamondBlue);
        else col.copy(colSolarGold);

        const inwardSpeed = 0.002 + Math.random() * 0.001;

        setupStar(
          {
            armIndex: armNum,
            baseRadiusFactor: 9.6,
            thetaOffset: baseAngle + gaussianRandom() * 0.05,
            dPerp,
            heightOffset: yOffset,
            inwardSpeed,
          },
          progress,
          size,
          col,
          hasSpike,
          alpha
        );
      }
    });

    // --- 2. Secondary Spiral Spurs (Arm 2: PI/2, Arm 3: 3PI/2) ---
    const secondaryBases = [Math.PI * 0.5, Math.PI * 1.5];
    secondaryBases.forEach((baseAngle, spurNum) => {
      for (let i = 0; i < secondaryArmStars; i++) {
        const progress = i / secondaryArmStars;
        const sigma = 0.32 + 1.05 * Math.pow(progress, 1.2);
        const gOffset = gaussianRandom();
        const dPerp = gOffset * sigma;
        const yOffset = gaussianRandom() * (0.04 + 0.06 * progress);

        const hasSpike = Math.random() < 0.045;
        const size = hasSpike ? 2.2 + Math.random() : 0.8 + Math.random() * 1.1;
        const alpha = hasSpike ? 0.95 : Math.max(0.32, 0.82 - Math.abs(gOffset) * 0.12);

        const col = new THREE.Color();
        if (Math.random() < 0.6) col.copy(colIceBlue).lerp(colPureWhite, Math.random() * 0.4);
        else col.copy(colWarmAmber);

        const inwardSpeed = 0.002 + Math.random() * 0.001;

        setupStar(
          {
            armIndex: spurNum + 2,
            baseRadiusFactor: 8.8,
            thetaOffset: baseAngle + gaussianRandom() * 0.05,
            dPerp,
            heightOffset: yOffset,
            inwardSpeed,
          },
          progress,
          size,
          col,
          hasSpike,
          alpha
        );
      }
    });

    // --- 3. Vast, High-Density Spherical/Barred Central Bulge (Zero voids around core!) ---
    for (let i = 0; i < centralBulgeStars; i++) {
      // Exponential radial density falloff from center outward to r ≈ 2.2
      const rRatio = Math.pow(Math.random(), 1.6);
      const r = 0.04 + rRatio * 2.16;

      // Elongated barred bulge angle with slight bar elongation
      const barTheta = (Math.random() < 0.65)
        ? (Math.random() < 0.5 ? 0 : Math.PI) + (Math.random() - 0.5) * 0.9
        : Math.random() * 2.0 * Math.PI;

      // Smooth 3D Gaussian height
      const y = gaussianRandom() * 0.28 * Math.exp(-r / 1.1);

      // Core star sizing
      const isNucleus = r < 0.5;
      const isBright = Math.random() < 0.18;
      const size = isNucleus
        ? (isBright ? 2.4 + Math.random() * 0.8 : 1.2 + Math.random() * 0.6)
        : (isBright ? 1.8 + Math.random() * 0.7 : 0.8 + Math.random() * 0.5);
      const hasSpike = isNucleus && isBright && Math.random() < 0.35;

      const col = new THREE.Color(colPureWhite);
      if (r > 0.4) {
        col.lerp(Math.random() < 0.5 ? colWarmAmber : colIvoryCore, 0.45);
      }

      setupStar(
        {
          armIndex: -1,
          baseRadiusFactor: r,
          thetaOffset: barTheta,
          dPerp: 0,
          heightOffset: y,
          inwardSpeed: 0, // central bulge rotates rigidly with pattern
        },
        0.5,
        size,
        col,
        hasSpike,
        Math.min(1.0, 0.55 + Math.exp(-r / 0.8) * 0.45)
      );
    }

    // --- 4. Uneven Ambient Disc & Starbirth Areas (Eliminating all empty sections!) ---
    for (let i = 0; i < unevenDiscStars; i++) {
      const r = 0.9 + Math.pow(Math.random(), 1.25) * 9.8;
      
      // Multi-frequency density clumping: simulates starbirth knots and nebular spurs
      const baseAngle = Math.random() * 2.0 * Math.PI;
      const densityMod = 0.35 * Math.cos(2.0 * baseAngle - 1.2 * r) + 0.25 * Math.sin(4.0 * baseAngle - 2.5 * r);
      const angle = baseAngle + densityMod * 0.25;

      const y = gaussianRandom() * (0.05 + 0.04 * r);
      const size = 0.6 + Math.random() * 0.8;
      const alpha = Math.max(0.14, Math.min(0.42, 0.25 + densityMod * 0.15));

      const col = new THREE.Color();
      if (Math.random() < 0.65) col.copy(colIceBlue).lerp(colPureWhite, Math.random() * 0.5);
      else col.copy(colWarmAmber);

      setupStar(
        {
          armIndex: -2,
          baseRadiusFactor: r,
          thetaOffset: angle,
          dPerp: 0,
          heightOffset: y,
          inwardSpeed: 0.008 + Math.random() * 0.004,
        },
        Math.random(),
        size,
        col,
        false,
        alpha
      );
    }

    // --- 5. Physical Spatial Landmark Stars (Mathematically locked to galaxy spiral arms!) ---
    this.landmarkParticles.clear();
    this.destinations.forEach((dest) => {
      const starIndex = idx;
      const initialPos = this.getDestinationCurrentWorldPos(dest);
      const basePos = initialPos.clone();
      const currentPos = initialPos.clone();
      const velocity = new THREE.Vector3(0, 0, 0);

      this.landmarkParticles.set(dest.id, {
        id: dest.id,
        config: dest,
        basePos,
        currentPos,
        velocity,
        starIndex,
      });

      const col = new THREE.Color(dest.color);
      const arm = dest.armIndex ?? 0;
      const armBaseAngle = [0, Math.PI, Math.PI * 0.5, Math.PI * 1.5][arm] ?? 0;

      setupStar(
        {
          armIndex: -3,
          baseRadiusFactor: arm < 2 ? 9.6 : 8.8,
          thetaOffset: armBaseAngle,
          dPerp: 0,
          heightOffset: 0.05,
          inwardSpeed: 0,
        },
        dest.progress ?? 0.5,
        2.4, // distinct jewel star
        col,
        true, // needle-sharp 4-point diffraction spike
        1.0
      );
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this.currentPositions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aRandomPhase', new THREE.BufferAttribute(randomPhases, 1));
    geometry.setAttribute('aHasSpike', new THREE.BufferAttribute(hasSpikes, 1));
    geometry.setAttribute('aBaseAlpha', new THREE.BufferAttribute(baseAlphas, 1));
    geometry.setAttribute('aProgress', new THREE.BufferAttribute(this.progressValues, 1));

    this.galaxyMaterial = new THREE.ShaderMaterial({
      vertexShader: galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uHoveredTarget: { value: new THREE.Vector3(0, 0, 0) },
        uHoverStrength: { value: 0 },
        uTravelProgress: { value: 0 },
        uCameraPos: { value: this.camera.position.clone() },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.galaxyPoints = new THREE.Points(geometry, this.galaxyMaterial);
    this.scene.add(this.galaxyPoints);
    // A second optical layer shares particle positions: dust follows the spiral
    // without another simulation or a large postprocessing framebuffer.
    const dustMaterial = new THREE.ShaderMaterial({
      uniforms: this.galaxyMaterial.uniforms,
      vertexShader: `
        attribute vec3 aColor;
        attribute float aBaseAlpha;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor;
          vAlpha = aBaseAlpha * smoothstep(0.3, 1.5, length(position));
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(850.0 / max(-mv.z, 0.1), 4.0, 90.0) * uPixelRatio;
        }`,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float haze = exp(-d * d * 24.0) * (1.0 - smoothstep(0.3, 0.5, d));
          vec3 tint = mix(vec3(0.22, 0.30, 0.56), vColor, 0.45);
          gl_FragColor = vec4(tint, haze * vAlpha * 0.028);
        }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    this.dustPoints = new THREE.Points(geometry, dustMaterial);
    this.scene.add(this.dustPoints);
  }

  private evaluateStarBasePosition(meta: StarMetaData, t: number, rot: number): THREE.Vector3 {
    if (meta.armIndex === -3) {
      // Physical Landmark Jewel Star: exact match to spiral arm spine!
      const rSpine = 0.55 + meta.baseRadiusFactor * Math.pow(t, 1.12);
      const thetaSpine = meta.thetaOffset + 4.8 * Math.pow(t, 0.76) + rot;
      const x = rSpine * Math.cos(thetaSpine);
      const z = rSpine * Math.sin(thetaSpine);
      return this.starAnchor.set(x, meta.heightOffset, z);
    }

    if (meta.armIndex === -1) {
      // Vast Central Bulge: Rotates with rigid pattern
      const angle = meta.thetaOffset + rot;
      const x = meta.baseRadiusFactor * Math.cos(angle);
      const z = meta.baseRadiusFactor * Math.sin(angle);
      return this.starAnchor.set(x, meta.heightOffset, z);
    }

    if (meta.armIndex === -2) {
      // Uneven Ambient Disc Scatter
      const angle = meta.thetaOffset + rot;
      const r = meta.baseRadiusFactor * (0.35 + 0.65 * t);
      return this.starAnchor.set(r * Math.cos(angle), meta.heightOffset, r * Math.sin(angle));
    }

    // Spiral Arms (Primary 0, 1 and Secondary Spurs 2, 3)
    const rSpine = 0.55 + meta.baseRadiusFactor * Math.pow(t, 1.12);
    const thetaSpine = meta.thetaOffset + 4.8 * Math.pow(t, 0.76) + rot;

    const nx = -Math.sin(thetaSpine);
    const nz = Math.cos(thetaSpine);

    const x = rSpine * Math.cos(thetaSpine) + nx * meta.dPerp;
    const z = rSpine * Math.sin(thetaSpine) + nz * meta.dPerp;
    return this.starAnchor.set(x, meta.heightOffset, z);
  }

  private createCoreGlow(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.25, 'rgba(254, 243, 199, 0.45)');
      grad.addColorStop(0.55, 'rgba(186, 230, 253, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(4.5, 4.5, 1.0);
    this.coreGlowMesh = sprite;
    this.scene.add(this.coreGlowMesh);
  }

  private createUniverseDepth(): void {
    // Procedural gas clouds and satellite galaxies occupy actual 3D space.
    const gasCanvas = document.createElement('canvas');
    gasCanvas.width = gasCanvas.height = 256;
    const gasContext = gasCanvas.getContext('2d');
    const gasJitter = () => Math.sqrt(-2 * Math.log(Math.max(1e-6, Math.random()))) * Math.cos(Math.random() * Math.PI * 2);
    if (gasContext) for (let i = 0; i < 38; i++) {
      const x = 128 + gasJitter() * 40;
      const y = 128 + gasJitter() * 28;
      const radius = 30 + Math.random() * 65;
      const mist = gasContext.createRadialGradient(x, y, 0, x, y, radius);
      mist.addColorStop(0, 'rgba(255,255,255,0.065)');
      mist.addColorStop(0.45, 'rgba(220,230,255,0.025)');
      mist.addColorStop(1, 'rgba(200,220,255,0)');
      gasContext.fillStyle = mist;
      gasContext.fillRect(0, 0, 256, 256);
    }
    const texture = new THREE.CanvasTexture(gasCanvas);
    for (const [x, y, z, color, size] of [
      [-26, -12, -32, '#414c86', 55], [35, 8, -45, '#654777', 65],
      [-15, 16, -70, '#29545e', 80], [5, -18, 20, '#443669', 45],
      [35, 24, 65, '#4c527d', 85], [-60, 15, 50, '#644d76', 95],
      [10, 42, -15, '#345b6d', 65], [-12, -40, 65, '#51416c', 80],
    ] as const) {
      const cloud = new THREE.Sprite(new THREE.SpriteMaterial({map: texture, color, opacity: 0.24, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending}));
      cloud.position.set(x, y, z); cloud.scale.set(size, size * 0.6, 1);
      this.environments.add(cloud);
    }
    // Neighbours surround the home galaxy in 3D, including behind the initial camera.
    const seeds: number[][] = [];
    for (let i = 0; i < 24; i++) {
      const azimuth = i * Math.PI * (3 - Math.sqrt(5));
      const elevation = Math.asin(1 - 2 * (i + 0.5) / 24);
      const distance = 68 + (i % 4) * 17;
      seeds.push([Math.cos(azimuth) * Math.cos(elevation) * distance,
        Math.sin(elevation) * distance, Math.sin(azimuth) * Math.cos(elevation) * distance,
        [3.5, 5, 7, 4, 8, 5.5][i % 6]]);
    }
    seeds.forEach((position, index) => {
      const positions = new Float32Array(1100 * 3);
      for (let i = 0; i < 1100; i++) {
        const radius = Math.pow(Math.random(), 0.7) * position[3];
        const angle = radius * 0.8 + (i % 2) * Math.PI + (Math.random() - 0.5) * 0.6;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      // Small Gaussian halos soften distant structure without a full-screen blur pass.
      const galaxy = new THREE.Points(geometry, new THREE.ShaderMaterial({
        uniforms: {uTint: {value: new THREE.Color(['#929ecb', '#c7a4bc', '#8baebf'][index % 3])}, uPixelRatio: {value: Math.min(window.devicePixelRatio || 1, 2)}},
        vertexShader: `uniform float uPixelRatio; varying float vFade;
          void main(){vec4 p=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*p;
          gl_PointSize=clamp(240.0/max(-p.z,1.0),1.8,4.0)*uPixelRatio;
          vFade=1.0-smoothstep(90.0,300.0,-p.z)*0.55;}`,
        fragmentShader: `uniform vec3 uTint; varying float vFade;
          void main(){float d=length(gl_PointCoord-0.5);float halo=exp(-d*d*18.0)*(1.0-smoothstep(0.38,0.5,d));
          gl_FragColor=vec4(uTint,halo*0.28*vFade);}`,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      }));
      galaxy.position.fromArray(position); galaxy.rotation.set(0.35 + index * 0.3, index, 0.2);
      this.environments.add(galaxy);
    });
    this.scene.add(this.environments);
  }

  private createStarSystems(): void {
    const planetGeometry = new THREE.SphereGeometry(0.049, 24, 16);
    this.destinations.forEach(destination => {
      const system = new THREE.Group(); system.name = destination.id;
      for (let orbit = 0; orbit < 3; orbit++) {
        const radius = 0.27 + orbit * 0.19;
        const points = Array.from({length: 65}, (_, i) => new THREE.Vector3(Math.cos(i / 64 * Math.PI * 2) * radius, 0, Math.sin(i / 64 * Math.PI * 2) * radius));
        const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({color: destination.color, transparent: true, opacity: 0.13}));
        const planet = new THREE.Mesh(planetGeometry, new THREE.ShaderMaterial({
          uniforms: {uColor: {value: new THREE.Color(destination.color)}},
          vertexShader: `varying vec3 vNormal; varying vec3 vPosition;
            void main(){vNormal=normalize(normalMatrix*normal);vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
          fragmentShader: `uniform vec3 uColor; varying vec3 vNormal; varying vec3 vPosition;
            void main(){vec3 n=normalize(vNormal);float light=max(dot(n,normalize(vec3(-0.6,0.7,1.0))),0.0);float rim=pow(1.0-max(n.z,0.0),3.0);float bands=0.88+0.12*sin(vPosition.y*300.0+sin(vPosition.x*150.0));gl_FragColor=vec4(uColor*(0.12+0.8*light)*bands+uColor*rim*0.4,1.0);}`,
        }));
        planet.userData = {orbit, radius};
        system.add(ring, planet);
      }
      this.starSystems.add(system);
    });
    this.scene.add(this.starSystems);
  }

  // --- Real Physical Particle Simulation Engine ---

  private updateParticlePhysics(delta: number): void {
    // The galaxy turns independently of the camera, whose orientation changes only on drag.
    this.targetPatternSpeed = this.reducedMotion ? 0 : (this.activeDestinationId !== null || this.isTraveling ? 0.0075 : 0.038);
    this.currentPatternSpeed += (this.targetPatternSpeed - this.currentPatternSpeed) * delta * 2.5;

    this.patternAngle += delta * this.currentPatternSpeed;

    const mx = this.mouseWorldPos.x;
    const my = this.mouseWorldPos.y;
    const mz = this.mouseWorldPos.z;
    const hasMouse = this.isMouseOver && !this.isTraveling;

    // Small, subtle, intimate traction radius (reduced per user request)
    const tractionRadius = 1.15;
    const tractionRadiusSq = tractionRadius * tractionRadius;

    const springK = 0.08;
    const damping = 0.90;

    // --- Update Physical Landmark Particles (Firmly locked to galaxy spiral arms) ---
    for (const [_id, lm] of this.landmarkParticles) {
      const worldPos = this.getDestinationCurrentWorldPos(lm.config);
      lm.basePos.copy(worldPos);
      lm.currentPos.copy(worldPos);
      lm.velocity.set(0, 0, 0);

      // Sync landmark jewel star position into galaxy points buffer
      const i3 = lm.starIndex * 3;
      this.currentPositions[i3] = worldPos.x;
      this.currentPositions[i3 + 1] = worldPos.y;
      this.currentPositions[i3 + 2] = worldPos.z;
    }

    let progressNeedsUpdate = false;

    // Normal galactic starfield simulation
    const normalStarCount = this.totalStars - this.destinations.length;
    for (let i = 0; i < normalStarCount; i++) {
      const meta = this.metaData[i];
      const i3 = i * 3;

      // Continuous Inward Accretion Flow
      if (meta.inwardSpeed > 0 && this.currentPatternSpeed > 0.003) {
        this.progressValues[i] -= delta * meta.inwardSpeed;
        if (this.progressValues[i] < 0.0) {
          this.progressValues[i] += 1.0;
        }
        progressNeedsUpdate = true;
      }

      // Compute anchor position along rotating spiral pattern
      const basePos = this.evaluateStarBasePosition(meta, this.progressValues[i], this.patternAngle);
      this.basePositions[i3] = basePos.x;
      this.basePositions[i3 + 1] = basePos.y;
      this.basePositions[i3 + 2] = basePos.z;

      const px = this.currentPositions[i3];
      const py = this.currentPositions[i3 + 1];
      const pz = this.currentPositions[i3 + 2];

      // Subtle, gentle, slow cursor motion (small area, never fast or violent)
      if (hasMouse) {
        const dx = px - mx;
        const dy = py - my;
        const dz = pz - mz;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < tractionRadiusSq) {
          const dist = Math.sqrt(distSq);
          const normDist = dist / tractionRadius;
          // Calmer, softer force falloff
          const force = Math.pow(1.0 - normDist, 1.5) * 0.28;
          const invDist = 1.0 / (dist + 0.001);

          // Tangential unit vector around cursor (slow, delicate orbital swirl)
          const tx = -dz * invDist;
          const tz = dx * invDist;

          // Radial unit vector
          const rx = dx * invDist;
          const rz = dz * invDist;

          // Gentle swirl torque (subtle and slow!)
          this.velocities[i3] += tx * force * 0.42;
          this.velocities[i3 + 2] += tz * force * 0.42;

          // Slight centripetal balance
          this.velocities[i3] -= rx * force * 0.12;
          this.velocities[i3 + 2] -= rz * force * 0.12;

          // Subtle 3D lift
          this.velocities[i3 + 1] += Math.sin(dist * 4.0) * force * 0.08;
        }
      }

      // Spring Restitution to Base Orbit Anchor
      const dispX = basePos.x - px;
      const dispY = basePos.y - py;
      const dispZ = basePos.z - pz;

      this.velocities[i3] += dispX * springK;
      this.velocities[i3 + 1] += dispY * springK;
      this.velocities[i3 + 2] += dispZ * springK;

      // Momentum Damping
      this.velocities[i3] *= damping;
      this.velocities[i3 + 1] *= damping;
      this.velocities[i3 + 2] *= damping;

      // Integrate Position
      this.currentPositions[i3] += this.velocities[i3];
      this.currentPositions[i3 + 1] += this.velocities[i3 + 1];
      this.currentPositions[i3 + 2] += this.velocities[i3 + 2];
    }

    if (this.galaxyPoints) {
      this.galaxyPoints.geometry.attributes.position.needsUpdate = true;
      if (progressNeedsUpdate) {
        this.galaxyPoints.geometry.attributes.aProgress.needsUpdate = true;
      }
    }
  }

  // --- Interaction & Clean 3D Orbit Controls ---

  private onResize = (): void => {
    if (this.isDestroyed) return;
    const width = this.canvas.parentElement?.clientWidth || window.innerWidth;
    const height = this.canvas.parentElement?.clientHeight || window.innerHeight;

    if (Math.abs(this.camera.aspect - width / height) > 0.01) {
      this.homeCamDistance = Math.max(29, 27 / (width / height));
    }
    this.camera.aspect = width / height;
    if (width > 1000) this.camera.setViewOffset(width, height, width * 0.08, 0, width, height);
    else this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(dpr);

    if (this.galaxyMaterial) {
      this.galaxyMaterial.uniforms.uPixelRatio.value = dpr;
    }
    (this.backgroundStars.material as THREE.ShaderMaterial).uniforms.uPixelRatio.value = dpr;
  };

  private onMouseEnter = (): void => {
    this.isMouseOver = true;
  };

  private onMouseLeave = (event: MouseEvent): void => {
    this.isMouseOver = false;
    if (!(event.buttons & 1)) this.onMouseUp();
    this.mouseWorldPos.set(9999, 9999, 9999);
  };

  private onMouseDown = (e: MouseEvent): void => {
    if (e.button === 0 && !this.activeDestinationId && !this.isTraveling && !this.isReturning) {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  };

  private onMouseUp = (): void => {
    this.isDragging = false;
    this.targetUserRotation.copy(this.userRotation);
  };

  private onWindowMouseMove = (event: MouseEvent): void => {
    if (this.isDragging && event.target !== this.canvas) this.onMouseMove(event);
  };

  private onMouseMove = (e: MouseEvent): void => {
    if (!(e.buttons & 1)) this.isDragging = false;
    this.isMouseOver = true;
    const rect = this.canvas.getBoundingClientRect();
    this.mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouseNorm.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (this.isDragging && !this.activeDestinationId) {
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.rotationVelocity.x = deltaX * 0.005;
      this.rotationVelocity.y = deltaY * 0.004;

      this.targetUserRotation.x += this.rotationVelocity.x;
      this.targetUserRotation.y = Math.max(
        -0.5,
        Math.min(0.85, this.targetUserRotation.y + this.rotationVelocity.y)
      );

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    }

    this.raycaster.setFromCamera(this.mouseNorm, this.camera);
    const intersect = this.raycaster.ray.intersectPlane(this.galaxyPlane, this.tempVec);
    if (intersect) {
      this.mouseWorldPos.copy(intersect);
    }
  };

  private onTouchStart = (e: TouchEvent): void => {
    if (this.isTraveling || this.isReturning) return;
    this.isMouseOver = true;
    if (e.touches.length === 2) {
      this.isDragging = false;
      this.pinchDistance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }
    if (e.touches.length === 1 && !this.activeDestinationId) {
      this.isDragging = true;
      this.previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  private onTouchMove = (e: TouchEvent): void => {
    e.preventDefault();
    if (this.isTraveling || this.isReturning) return;
    if (e.touches.length === 2 && !this.activeDestinationId) {
      const distance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      if (this.pinchDistance) this.homeCamDistance = THREE.MathUtils.clamp(this.homeCamDistance * this.pinchDistance / Math.max(distance, 1), this.inspectedDestinationId ? 2 : 9, 180);
      if (this.homeCamDistance > 18) this.inspectedDestinationId = null;
      this.pinchDistance = distance;
    }
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      this.mouseNorm.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouseNorm.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

      if (this.isDragging && !this.activeDestinationId) {
        const deltaX = touch.clientX - this.previousMousePosition.x;
        const deltaY = touch.clientY - this.previousMousePosition.y;

        this.rotationVelocity.x = deltaX * 0.006;
        this.rotationVelocity.y = deltaY * 0.005;

        this.targetUserRotation.x += this.rotationVelocity.x;
        this.targetUserRotation.y = Math.max(
          -0.5,
          Math.min(0.85, this.targetUserRotation.y + this.rotationVelocity.y)
        );

        this.previousMousePosition = { x: touch.clientX, y: touch.clientY };
      }

      this.raycaster.setFromCamera(this.mouseNorm, this.camera);
      const intersect = this.raycaster.ray.intersectPlane(this.galaxyPlane, this.tempVec);
      if (intersect) {
        this.mouseWorldPos.copy(intersect);
      }
    }
  };

  private onTouchEnd = (): void => {
    this.isDragging = false;
    this.targetUserRotation.copy(this.userRotation);
    this.pinchDistance = 0;
    this.mouseWorldPos.set(9999, 9999, 9999);
  };

  private onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    if (this.activeDestinationId || this.isTraveling || this.isReturning) return;
    const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
    this.homeCamDistance = THREE.MathUtils.clamp(this.homeCamDistance * Math.exp(THREE.MathUtils.clamp(pixels, -180, 180) * 0.0015), this.inspectedDestinationId ? 2 : 9, 180);
    if (this.homeCamDistance > 18) this.inspectedDestinationId = null;
  };

  public zoom(action: 'in' | 'out' | 'reset' | 'focus', target?: string): void {
    if (this.isTraveling || this.isReturning) return;
    if (action === 'focus' && target) {
      this.inspectedDestinationId = target;
      this.homeCamDistance = 4.5;
      this.targetUserRotation.set(0.2, 0.15);
    } else {
      this.homeCamDistance = action === 'reset' ? Math.max(29, 27 / this.camera.aspect) : THREE.MathUtils.clamp(this.homeCamDistance * (action === 'in' ? 0.7 : 1.45), this.inspectedDestinationId ? 2 : 12, 180);
      if (action === 'reset' || this.homeCamDistance > 18) this.inspectedDestinationId = null;
      if (action === 'reset') this.targetUserRotation.set(0, 0);
    }
    this.activeDestinationId = null;
  }

  public setReducedMotion(value: boolean): void {
    this.reducedMotion = value;
    this.travelDuration = value ? 0.01 : 2.2;
  }

  public setEnabled(value: boolean): void {
    this.enabled = value;
    if (value && this.animationFrameId === null) { this.lastFrameTime = performance.now(); this.animate(); }
    if (!value && this.animationFrameId !== null) { cancelAnimationFrame(this.animationFrameId); this.animationFrameId = null; }
  }

  private onVisibilityChange = (): void => {
    if (document.hidden && this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId); this.animationFrameId = null;
    } else if (!document.hidden && this.enabled && this.animationFrameId === null) {
      this.lastFrameTime = performance.now(); this.animate();
    }
  };

  public startJourney(from: string | null, to: string | null): void {
    if (this.inspectedDestinationId) {
      this.homeCamDistance = Math.max(29, 27 / this.camera.aspect);
      this.smoothedDistance = this.homeCamDistance;
    }
    this.inspectedDestinationId = null;
    this.homeCamLookAt.set(0, 0, 0);
    this.isCrossing = Boolean(from && to);
    if (from) {
      const source = this.destinations.find(d => d.id === from);
      if (source) {
        const position = this.getDestinationCurrentWorldPos(source);
        this.camera.position.copy(position).add(position.clone().normalize().multiplyScalar(2)).add(new THREE.Vector3(0, 0.6, 1.2));
        this.currentCamLookAt.copy(position);
        this.activeDestinationId = from;
      }
    }
    this.journeyArc.copy(this.camera.position).multiplyScalar(0.4).add(new THREE.Vector3(0, 14, 10));
    if (to) this.travelToDestination(to);
    else if (this.activeDestinationId) this.returnToHome();
    else this.onReturnHomeComplete();
  }

  /**
   * Calculates the current physical 3D world position of a destination,
   * guaranteeing that landmarks stick mathematically and physically to the galaxy spiral arms!
   */
  private getDestinationCurrentWorldPos(dest: DestinationConfig): THREE.Vector3 {
    if (typeof dest.armIndex === 'number' && typeof dest.progress === 'number') {
      const baseAngle = [0, Math.PI, Math.PI * 0.5, Math.PI * 1.5][dest.armIndex] ?? 0;
      const rSpine = 0.55 + (dest.armIndex < 2 ? 9.6 : 8.8) * Math.pow(dest.progress, 1.12);
      const thetaSpine = baseAngle + 4.8 * Math.pow(dest.progress, 0.76) + this.patternAngle;
      const x = rSpine * Math.cos(thetaSpine);
      const z = rSpine * Math.sin(thetaSpine);
      return new THREE.Vector3(x, 0.05, z);
    }

    const lx = dest.position[0];
    const ly = dest.position[1];
    const lz = dest.position[2];

    const cosA = Math.cos(this.patternAngle);
    const sinA = Math.sin(this.patternAngle);

    const wx = lx * cosA - lz * sinA;
    const wz = lx * sinA + lz * cosA;

    return new THREE.Vector3(wx, ly, wz);
  }

  public setHoveredDestination(id: string | null): void {
    this.hoveredDestinationId = id;
    if (id) {
      const lm = this.landmarkParticles.get(id);
      const dest = this.destinations.find((d) => d.id === id);
      const worldPos = lm ? lm.currentPos : (dest ? this.getDestinationCurrentWorldPos(dest) : null);
      if (worldPos && this.galaxyMaterial) {
        this.galaxyMaterial.uniforms.uHoveredTarget.value.copy(worldPos);
      }
    }
  }

  public travelToDestination(id: string): void {
    const dest = this.destinations.find((d) => d.id === id);
    if (!dest) return;

    this.activeDestinationId = id;
    this.isTraveling = true;
    this.isReturning = false;
    this.travelStartTime = this.elapsedTime;

    this.travelStartPos.copy(this.camera.position);
    this.travelStartLookAt.copy(this.currentCamLookAt);

    // Calculate current rotated/physical world position
    const lm = this.landmarkParticles.get(id);
    const destWorldPos = lm ? lm.currentPos.clone() : this.getDestinationCurrentWorldPos(dest);
    const outward = destWorldPos.clone().normalize();

    // Cinematic focused vantage point looking directly at the station
    this.travelEndPos.copy(destWorldPos).add(outward.multiplyScalar(2.0)).add(new THREE.Vector3(0, 0.6, 1.2));
    this.travelEndLookAt.copy(destWorldPos);
  }

  public returnToHome(): void {
    if (!this.activeDestinationId && !this.isTraveling) return;

    this.isTraveling = false;
    this.isReturning = true;
    this.travelStartTime = this.elapsedTime;

    this.travelStartPos.copy(this.camera.position);
    this.travelStartLookAt.copy(this.currentCamLookAt);

    const elevation = this.homeCamElevation + this.userRotation.y;
    this.travelEndPos.set(Math.sin(this.userRotation.x) * Math.cos(elevation) * this.homeCamDistance, Math.sin(elevation) * this.homeCamDistance, Math.cos(this.userRotation.x) * Math.cos(elevation) * this.homeCamDistance);
    this.travelEndLookAt.copy(this.homeCamLookAt);
  }

  private easeInOutQuint(t: number): number {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
  }

  private updateCamera(delta: number, elapsed: number): void {
    // 1. User 3D rotation interpolation
    this.userRotation.lerp(this.targetUserRotation, Math.min(1, delta * 12));

    // 2. Hover strength interpolation
    const targetHover = this.hoveredDestinationId ? 1.0 : 0.0;
    this.hoverStrength += (targetHover - this.hoverStrength) * delta * 5.0;
    if (this.galaxyMaterial) {
      this.galaxyMaterial.uniforms.uHoverStrength.value = this.hoverStrength;
    }

    // 3. Cinematic Travel / Home Interpolation
    if (this.isTraveling) {
      const progress = Math.min(1.0, (elapsed - this.travelStartTime) / this.travelDuration);
      const ease = this.easeInOutQuint(progress);

      // Dynamically update travel end target as station slowly drifts
      if (this.activeDestinationId) {
        const lm = this.landmarkParticles.get(this.activeDestinationId);
        if (lm) {
          const destWorldPos = lm.currentPos;
          const outward = destWorldPos.clone().normalize();
          this.travelEndPos.copy(destWorldPos).add(outward.multiplyScalar(2.0)).add(new THREE.Vector3(0, 0.6, 1.2));
          this.travelEndLookAt.copy(destWorldPos);
        }
      }

      this.camera.position.lerpVectors(this.travelStartPos, this.travelEndPos, ease);
      this.currentCamLookAt.lerpVectors(this.travelStartLookAt, this.travelEndLookAt, ease);
      if (this.isCrossing) {
        this.camera.position.copy(this.travelStartPos).multiplyScalar((1 - ease) * (1 - ease)).addScaledVector(this.journeyArc, 2 * (1 - ease) * ease).addScaledVector(this.travelEndPos, ease * ease);
        this.currentCamLookAt.multiplyScalar(1 - Math.sin(progress * Math.PI) * 0.7);
      }
      this.camera.lookAt(this.currentCamLookAt);

      if (this.galaxyMaterial) {
        this.galaxyMaterial.uniforms.uTravelProgress.value = ease;
      }

      if (progress >= 1.0) {
        this.isTraveling = false;
        if (this.activeDestinationId) {
          this.onTravelComplete(this.activeDestinationId);
        }
      }
    } else if (this.isReturning) {
      const progress = Math.min(1.0, (elapsed - this.travelStartTime) / (this.travelDuration * 0.9));
      const ease = this.easeInOutQuint(progress);

      this.camera.position.lerpVectors(this.travelStartPos, this.travelEndPos, ease);
      this.currentCamLookAt.lerpVectors(this.travelStartLookAt, this.travelEndLookAt, ease);
      this.camera.lookAt(this.currentCamLookAt);

      if (this.galaxyMaterial) {
        this.galaxyMaterial.uniforms.uTravelProgress.value = 1.0 - ease;
      }

      if (progress >= 1.0) {
        this.isReturning = false;
        this.activeDestinationId = null;
        this.onReturnHomeComplete();
      }
    } else if (this.activeDestinationId) {
      // Visited section view: dynamic slow drift tracking the active station
      const lm = this.landmarkParticles.get(this.activeDestinationId);
      const dest = this.destinations.find((d) => d.id === this.activeDestinationId);
      const destWorldPos = lm ? lm.currentPos : (dest ? this.getDestinationCurrentWorldPos(dest) : null);
      if (destWorldPos) {
        const outward = destWorldPos.clone().normalize();
        const targetCam = destWorldPos.clone().add(outward.multiplyScalar(2.0)).add(new THREE.Vector3(0, 0.6, 1.2));
        this.camera.position.lerp(targetCam, delta * 3.0);
        this.camera.lookAt(destWorldPos);
      }
    } else {
      // Steady Home Vantage Point
      const baseElev = this.homeCamElevation + this.userRotation.y;
      const baseAzim = this.userRotation.x;

      this.smoothedDistance = THREE.MathUtils.damp(this.smoothedDistance, this.homeCamDistance, 4, delta);
      const camX = this.smoothedDistance * Math.sin(baseAzim) * Math.cos(baseElev);
      const camY = this.smoothedDistance * Math.sin(baseElev);
      const camZ = this.smoothedDistance * Math.cos(baseAzim) * Math.cos(baseElev);

      const targetPos = new THREE.Vector3(camX, camY, camZ);
      if (this.inspectedDestinationId) {
        const destination = this.destinations.find(d => d.id === this.inspectedDestinationId);
        if (destination) {
          const center = this.getDestinationCurrentWorldPos(destination);
          this.homeCamLookAt.lerp(center, Math.min(1, delta * 5));
        }
      } else this.homeCamLookAt.lerp(this.tempVec.set(0, 0, 0), Math.min(1, delta * 5));
      targetPos.add(this.homeCamLookAt);

      this.targetCamLookAt.copy(this.homeCamLookAt);

      this.camera.position.copy(targetPos);
      this.currentCamLookAt.copy(this.targetCamLookAt);
      this.camera.lookAt(this.currentCamLookAt);
    }
  }

  /**
   * Projects each destination's current rotated world position to screen coordinates,
   * guaranteeing that landmarks stick physically to their location on the galaxy!
   */
  private updateProjectedPositions(): void {
    const width = this.canvas.parentElement?.clientWidth || window.innerWidth;
    const height = this.canvas.parentElement?.clientHeight || window.innerHeight;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const projectedList: ProjectedDestination[] = [];

    this.destinations.forEach((dest) => {
      // Calculate dynamic rotating world position
      const worldPos = this.getDestinationCurrentWorldPos(dest);
      this.tempVec.copy(worldPos);

      const distanceToCamera = this.camera.position.distanceTo(this.tempVec);
      this.tempVec.project(this.camera);

      const isBehind = this.tempVec.z > 1.0;
      const screenX = this.tempVec.x * halfWidth + halfWidth;
      const screenY = -(this.tempVec.y * halfHeight) + halfHeight;

      const isVisible =
        !isBehind &&
        screenX >= -80 &&
        screenX <= width + 80 &&
        screenY >= -80 &&
        screenY <= height + 80;

      const scale = Math.max(0.7, Math.min(1.2, 24.0 / distanceToCamera));

      projectedList.push({
        id: dest.id,
        x: screenX,
        y: screenY,
        scale,
        visible: isVisible,
        distanceToCamera,
      });
    });

    this.onProjectedPositionsUpdate(projectedList);
  }

  private animate = (): void => {
    if (this.isDestroyed || !this.enabled) return;

    this.animationFrameId = requestAnimationFrame(this.animate);

    const now = performance.now();
    const wallDelta = Math.max(0, (now - this.lastFrameTime) / 1000);
    const delta = Math.min(wallDelta, 0.05);
    this.lastFrameTime = now;
    this.elapsedTime += wallDelta;
    const elapsed = this.elapsedTime;

    // 1. Physical Particle Simulation & Inward Accretion Flow
    if (!this.reducedMotion) this.updateParticlePhysics(delta);

    // 2. Update Shader Uniforms
    if (this.galaxyMaterial) {
      this.galaxyMaterial.uniforms.uTime.value = this.reducedMotion ? 0 : elapsed;
      this.galaxyMaterial.uniforms.uCameraPos.value.copy(this.camera.position);
    }

    if (this.backgroundStars) {
      (this.backgroundStars.material as THREE.ShaderMaterial).uniforms.uTime.value = this.reducedMotion ? 0 : elapsed;
      this.backgroundStars.rotation.y = this.reducedMotion ? 0 : elapsed * 0.0012;
    }

    if (this.coreGlowMesh) {
      const pulse = 4.5 + (this.reducedMotion ? 0 : Math.sin(elapsed * 0.3) * 0.12);
      this.coreGlowMesh.scale.set(pulse, pulse, 1.0);
    }

    // 3. Camera Kinematics
    this.updateCamera(delta, elapsed);
    this.starSystems.children.forEach(system => {
      const destination = this.destinations.find(d => d.id === system.name)!;
      system.position.copy(this.getDestinationCurrentWorldPos(destination));
      system.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          const {orbit, radius} = child.userData;
          const angle = (this.reducedMotion ? 0 : elapsed) * (0.25 + orbit * 0.12) + orbit * 2;
          child.position.set(Math.cos(angle) * radius, 0.08, Math.sin(angle) * radius);
        }
      });
    });
    if (Math.abs(this.reportedDistance - this.smoothedDistance) > 0.5) {
      this.reportedDistance = this.smoothedDistance;
      this.onDistanceChange?.(this.smoothedDistance);
    }

    // 4. Synchronized Projected Landmark Coordinates (Sticking to galaxy)
    this.updateProjectedPositions();

    // 5. Render Scene
    this.renderer.render(this.scene, this.camera);
  };

  public destroy(): void {
    this.isDestroyed = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener('resize', this.onResize);
    this.resizeObserver?.disconnect();
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('blur', this.onMouseUp);
    this.canvas.removeEventListener('mouseenter', this.onMouseEnter);
    this.canvas.removeEventListener('mouseleave', this.onMouseLeave);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.canvas.removeEventListener('touchstart', this.onTouchStart);
    this.canvas.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
    this.canvas.removeEventListener('wheel', this.onWheel);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.galaxyPoints) {
      this.galaxyPoints.geometry.dispose();
      this.galaxyMaterial.dispose();
    }

    if (this.backgroundStars) {
      this.backgroundStars.geometry.dispose();
      (this.backgroundStars.material as THREE.Material).dispose();
    }

    (this.dustPoints?.material as THREE.Material)?.dispose();
    this.coreGlowMesh?.material.map?.dispose();
    this.coreGlowMesh?.material.dispose();
    const geometries = new Set<THREE.BufferGeometry>();
    const environmentTextures = new Set<THREE.Texture>();
    this.environments.traverse(object => {
      if (object instanceof THREE.Points) { geometries.add(object.geometry); (object.material as THREE.Material).dispose(); }
      if (object instanceof THREE.Sprite) { if (object.material.map) environmentTextures.add(object.material.map); object.material.dispose(); }
    });
    this.starSystems.traverse(object => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Line) { geometries.add(object.geometry); (object.material as THREE.Material).dispose(); }
    });
    geometries.forEach(geometry => geometry.dispose());
    environmentTextures.forEach(texture => texture.dispose());
    this.renderer?.dispose();
  }
}



