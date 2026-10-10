import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import './Galaxy.css';

export interface GalaxyProps {
  focal?: [number, number];
  rotation?: [number, number];
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  disableAnimation?: boolean;
  speed?: number;
  mouseInteraction?: boolean;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
  lightMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
uniform float uLightMode;

varying vec2 vUv;

// Optimized from 4 to 3 depth layers for a 25% performance boost
#define NUM_LAYER 3.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  if (d > 0.65) return 0.0;
  float m = (0.05 * uGlowIntensity) / max(d, 0.001);
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(0.65, 0.15, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + offset;
      float seed = Hash21(si);
      
      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
      vec2 delta = gv - offset - pad;
      float distSq = dot(delta, delta);

      // Early distance cull: skip ~75% of candidate stars that are outside the visible radius
      if (distSq > 0.42) continue;

      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      float star = Star(delta, flareSize);
      if (star < 0.001) continue;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * base;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uLightMode > 0.5) {
    float energy = max(max(col.r, col.g), col.b);
    float coverage = clamp(smoothstep(0.0, 0.42, energy) * 0.92, 0.0, 0.92);
    vec3 ink = clamp(col * 0.48, 0.0, 0.82);
    gl_FragColor = vec4(mix(vec3(1.0), ink, coverage), 1.0);
  } else if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

export const Galaxy: React.FC<GalaxyProps> = (props) => {
  const {
    transparent = true,
    lightMode = false,
    className = '',
    style,
    mouseInteraction = true,
  } = props;

  const ctnDom = useRef<HTMLDivElement>(null);
  const targetMousePos = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef<number>(0.0);
  const smoothMouseActive = useRef<number>(0.0);
  const lastPointerDown = useRef<number>(-Infinity);

  // Store latest props in ref to update WebGL uniforms every frame without tearing down context
  const propsRef = useRef<GalaxyProps>(props);
  propsRef.current = props;

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;

    const renderer = new Renderer({
      alpha: transparent,
      premultipliedAlpha: false,
      antialias: false,
    });
    const gl = renderer.gl;

    if (lightMode) {
      gl.clearColor(1, 1, 1, 1);
    } else if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    let program: any;

    function resize() {
      const rawW = ctn.offsetWidth || window.innerWidth || 1;
      const rawH = ctn.offsetHeight || window.innerHeight || 1;

      // Cap maximum internal resolution to 1280x720 to prevent GPU fillrate choking on 4K/Retina displays
      // Full bleed appearance is handled with zero-cost GPU hardware bilinear scaling via CSS
      const maxDim = 1280;
      let w = rawW;
      let h = rawH;
      const aspect = rawW / rawH;

      if (w > maxDim) {
        w = maxDim;
        h = Math.round(maxDim / aspect);
      }
      if (h > 720) {
        h = 720;
        w = Math.round(720 * aspect);
      }

      renderer.setSize(Math.max(320, Math.floor(w)), Math.max(240, Math.floor(h)));

      if (gl.canvas) {
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';
        gl.canvas.style.position = 'absolute';
        gl.canvas.style.top = '0';
        gl.canvas.style.left = '0';
      }

      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }

    window.addEventListener('resize', resize, { passive: true });
    const ro = new ResizeObserver(resize);
    ro.observe(ctn);

    const initialP = propsRef.current;
    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(gl.canvas.width || 1, gl.canvas.height || 1, 1),
        },
        uFocal: { value: new Float32Array(initialP.focal || [0.5, 0.5]) },
        uRotation: { value: new Float32Array(initialP.rotation || [1.0, 0.0]) },
        uStarSpeed: { value: initialP.starSpeed ?? 0.5 },
        uDensity: { value: initialP.density ?? 1.0 },
        uHueShift: { value: initialP.hueShift ?? 140 },
        uSpeed: { value: initialP.speed ?? 1.0 },
        uMouse: {
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y]),
        },
        uGlowIntensity: { value: initialP.glowIntensity ?? 0.3 },
        uSaturation: { value: initialP.saturation ?? 0.0 },
        uMouseRepulsion: { value: initialP.mouseRepulsion ?? true },
        uTwinkleIntensity: { value: initialP.twinkleIntensity ?? 0.3 },
        uRotationSpeed: { value: initialP.rotationSpeed ?? 0.08 },
        uRepulsionStrength: { value: initialP.repulsionStrength ?? 2.0 },
        uMouseActiveFactor: { value: 0.0 },
        uAutoCenterRepulsion: { value: initialP.autoCenterRepulsion ?? 0 },
        uTransparent: { value: transparent },
        uLightMode: { value: lightMode ? 1 : 0 },
      },
    });

    resize();

    const mesh = new Mesh(gl, { geometry, program });
    let animateId: number;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      const p = propsRef.current;

      if (!p.disableAnimation) {
        program.uniforms.uTime.value = t * 0.001;
        program.uniforms.uStarSpeed.value = (t * 0.001 * (p.starSpeed ?? 0.5)) / 10.0;
      }

      // Smoothly sync uniforms without recompiling shader
      program.uniforms.uHueShift.value = p.hueShift ?? 140;
      program.uniforms.uDensity.value = p.density ?? 1.0;
      program.uniforms.uSpeed.value = p.speed ?? 1.0;
      program.uniforms.uGlowIntensity.value = p.glowIntensity ?? 0.3;
      program.uniforms.uSaturation.value = p.saturation ?? 0.0;
      program.uniforms.uMouseRepulsion.value = p.mouseRepulsion ?? true;
      const pulse = p.disableAnimation ? 0 : Math.exp(-(t - lastPointerDown.current) / 500);
      program.uniforms.uRepulsionStrength.value = (p.repulsionStrength ?? 2.0) + pulse * 0.9;
      program.uniforms.uTwinkleIntensity.value = p.twinkleIntensity ?? 0.3;
      program.uniforms.uRotationSpeed.value = p.rotationSpeed ?? 0.08;

      if (p.focal) {
        program.uniforms.uFocal.value[0] = p.focal[0];
        program.uniforms.uFocal.value[1] = p.focal[1];
      }
      if (p.rotation) {
        program.uniforms.uRotation.value[0] = p.rotation[0];
        program.uniforms.uRotation.value[1] = p.rotation[1];
      }

      const lerpFactor = 0.08;
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;
      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;

      renderer.render({ scene: mesh });
    }

    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const width = rect.width || window.innerWidth || 1;
      const height = rect.height || window.innerHeight || 1;
      const x = (e.clientX - rect.left) / width;
      const y = 1.0 - (e.clientY - rect.top) / height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1.0;
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0.0;
    }
    function handlePointerDown(e: MouseEvent) {
      handleMouseMove(e);
      lastPointerDown.current = performance.now();
    }

    if (mouseInteraction) {
      window.addEventListener('pointermove', handleMouseMove, { passive: true });
      window.addEventListener('pointerdown', handlePointerDown, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      window.addEventListener('blur', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      if (mouseInteraction) {
        window.removeEventListener('pointermove', handleMouseMove);
        window.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('blur', handleMouseLeave);
      }
      if (gl.canvas.parentElement === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [transparent, lightMode, mouseInteraction]);

  return <div ref={ctnDom} className={`galaxy-container ${className}`.trim()} style={style} />;
};

export default Galaxy;
