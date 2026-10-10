export const galaxyVertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aRandomPhase;
  attribute float aHasSpike;
  attribute float aBaseAlpha;
  attribute float aProgress; // t in [0, 1] along accretion stream

  uniform float uTime;
  uniform vec3 uHoveredTarget;
  uniform float uHoverStrength;
  uniform float uTravelProgress;
  uniform vec3 uCameraPos;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandomPhase;
  varying float vHasSpike;
  varying float vHoverBoost;

  void main() {
    vRandomPhase = aRandomPhase;
    vHasSpike = aHasSpike;
    vec3 currentPos = position;

    // Hovered Destination Landmark Reaction: localized starlight boost
    float hoverBoost = 0.0;
    if (uHoverStrength > 0.01) {
      float distToHover = length(currentPos - uHoveredTarget);
      if (distToHover < 3.5) {
        float hf = (1.0 - smoothstep(0.0, 3.5, distToHover)) * uHoverStrength;
        hoverBoost = hf;
      }
    }
    vHoverBoost = hoverBoost;

    // Cinematic Travel Warp: slight streak towards destination
    if (uTravelProgress > 0.001) {
      vec3 toCam = uCameraPos - currentPos;
      float dCam = length(toCam);
      float warpFactor = (1.0 - smoothstep(0.0, 28.0, dCam)) * uTravelProgress;
      currentPos -= normalize(toCam + 0.001) * (warpFactor * 1.2);
    }

    // Color: luminous starlight with hover intensification
    vec3 outColor = aColor;
    if (hoverBoost > 0.01) {
      outColor = mix(outColor, vec3(1.0, 1.0, 1.0), hoverBoost * 0.65);
    }
    vColor = outColor;

    // Edge fade calculation:
    // Stars smoothly fade out as they reach the central core (t < 0.08)
    // and smoothly fade in at the outer edge (t > 0.92)
    float edgeFade = 1.0;
    if (aProgress >= 0.0 && aProgress <= 1.0) {
      edgeFade = smoothstep(0.01, 0.09, aProgress) * (1.0 - smoothstep(0.91, 0.99, aProgress));
    }

    float alpha = aBaseAlpha * edgeFade + hoverBoost * 0.35;
    vAlpha = clamp(alpha, 0.0, 1.0);

    // View Projection
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Optical Point Size Attenuation:
    float distToCam = -mvPosition.z;
    float baseSize = aSize; // Particle size remains needle-sharp and constant
    if (aHasSpike > 0.5) {
      baseSize *= 2.0;
    }

    // Perspective point size calculation
    float pSize = baseSize * (42.0 / max(distToCam, 0.1)) * uPixelRatio;
    
    // Clamped between 1.5px and 22.0px so stars remain needle-sharp sparkling points
    gl_PointSize = clamp(pSize, 0.8, 16.0 * uPixelRatio);
  }
`;

export const galaxyFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandomPhase;
  varying float vHasSpike;
  varying float vHoverBoost;

  void main() {
    vec2 p = gl_PointCoord - vec2(0.5);
    float d = length(p);

    if (d > 0.5) {
      discard;
    }

    // 1. Razor-sharp solid starlight nucleus
    float core = pow(clamp(1.0 - d * 2.2, 0.0, 1.0), 3.5);
    
    // 2. Optical starlight fringe
    float halo = exp(-d * 9.0) * 0.45;
    
    float intensity = core * 1.8 + halo;

    // 3. Needle-thin 4-Point Diffraction Spike
    if (vHasSpike > 0.5) {
      float spikeX = exp(-abs(p.y) * 75.0) * exp(-abs(p.x) * 3.0);
      float spikeY = exp(-abs(p.x) * 75.0) * exp(-abs(p.y) * 3.0);
      intensity += (spikeX + spikeY) * 1.1;
    }

    // 4. Subtle starlight twinkle
    float twinkle = 0.93 + 0.07 * sin(uTime * 2.5 + vRandomPhase * 6.28);

    vec3 finalColor = vColor * intensity * twinkle;
    if (vHoverBoost > 0.0) {
      finalColor += vec3(0.18, 0.22, 0.3) * vHoverBoost;
    }

    float finalAlpha = clamp(intensity * vAlpha * twinkle, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

export const backgroundStarsVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aRandomPhase;
  uniform float uTime;
  uniform float uPixelRatio;

  varying float vRandomPhase;

  void main() {
    vRandomPhase = aRandomPhase;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * (150.0 / -mvPosition.z) * uPixelRatio;
    gl_PointSize = clamp(gl_PointSize, 1.8 * uPixelRatio, 4.0 * uPixelRatio);
  }
`;

export const backgroundStarsFragmentShader = /* glsl */ `
  uniform float uTime;
  varying float vRandomPhase;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float core = pow(clamp(1.0 - d * 2.2, 0.0, 1.0), 2.5);
    float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + vRandomPhase * 6.28);
    vec3 starColor = mix(vec3(0.78, 0.87, 1.0), vec3(1.0, 0.91, 0.79), step(0.76, vRandomPhase));
    gl_FragColor = vec4(starColor, core * 0.78 * twinkle);
  }
`;

