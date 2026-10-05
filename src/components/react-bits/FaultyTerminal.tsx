import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import './FaultyTerminal.css';

export interface FaultyTerminalProps {
  scale?: number;
  gridMul?: [number, number];
  digitSize?: number;
  timeScale?: number;
  pause?: boolean;
  scanlineIntensity?: number;
  glitchAmount?: number;
  flickerAmount?: number;
  noiseAmp?: number;
  chromaticAberration?: number;
  dither?: number | boolean;
  curvature?: number;
  tint?: string;
  mouseReact?: boolean;
  mouseStrength?: number;
  dpr?: number;
  pageLoadAnimation?: boolean;
  brightness?: number;
  lightMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;

uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;
uniform float uLightMode;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p)
{
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; 
}

mat2 rotate(float angle)
{
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p)
{
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;
  
  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);
  
  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);
  
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;
    
    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;
        
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }
    
    if(uUsePageLoadAnimation > 0.5){
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
        float cellDelay = cellRandom * 0.8;
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);
        
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
        intensity *= fadeAlpha;
    }
    
    p = fract(p);
    p *= uDigitSize;
    
    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);
    
    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float n = i * i + j * j;
    float f = n * 0.0625;
    
    float isOn = step(0.1, intensity - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);
    
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c)
{
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look)
{
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;
    
    float displacement = displace(p);
    p.x += displacement;

    if (uGlitchAmount != 1.0) {
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }

    float middle = digit(p);
    
    const float off = 0.002;
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));
    
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    return baseColor;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
    time = iTime * 0.333333;
    vec2 uv = vUv;

    if(uCurvature != 0.0){
      uv = barrel(uv);
    }
    
    vec2 p = uv * uScale;
    vec3 col = getColor(p);

    if(uChromaticAberration != 0.0){
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
      col.r = getColor(p + ca).r;
      col.b = getColor(p - ca).b;
    }

    col *= uTint;
    col *= uBrightness;

    if(uDither > 0.0){
      float rnd = hash21(gl_FragCoord.xy);
      col += (rnd - 0.5) * (uDither * 0.003922);
    }

    if (uLightMode > 0.5) {
      float energy = max(max(col.r, col.g), col.b);
      float coverage = clamp(smoothstep(0.0, 0.72, energy) * 0.9, 0.0, 0.9);
      vec3 ink = clamp(col * 0.42, 0.0, 0.76);
      col = mix(vec3(1.0), ink, coverage);
    }

    gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '').trim();
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const num = parseInt(h.slice(0, 6), 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

export const FaultyTerminal: React.FC<FaultyTerminalProps> = (props) => {
  const {
    scale = 1,
    gridMul = [2, 1],
    digitSize = 1.5,
    timeScale = 0.3,
    pause = false,
    scanlineIntensity = 0.3,
    glitchAmount = 1,
    flickerAmount = 1,
    noiseAmp = 1,
    chromaticAberration = 0,
    dither = 0,
    curvature = 0.2,
    tint = '#ffffff',
    mouseReact = true,
    mouseStrength = 0.2,
    pageLoadAnimation = true,
    brightness = 1,
    lightMode = false,
    className = '',
    style = {},
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const frozenTimeRef = useRef(0);
  const rafRef = useRef(0);
  const loadAnimationStartRef = useRef(0);
  const timeOffsetRef = useRef(Math.random() * 100);

  // Sync props via ref to update uniforms without tearing down WebGL
  const propsRef = useRef<FaultyTerminalProps>(props);
  propsRef.current = props;

  const tintVec = useMemo(() => hexToRgb(tint), [tint]);
  const ditherValue = useMemo(
    () => (typeof dither === 'boolean' ? (dither ? 1 : 0) : dither),
    [dither]
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const ctn = containerRef.current;
    if (!ctn) return;
    const rect = ctn.getBoundingClientRect();
    const width = rect.width || window.innerWidth || 1;
    const height = rect.height || window.innerHeight || 1;
    const x = (e.clientX - rect.left) / width;
    const y = 1 - (e.clientY - rect.top) / height;
    mouseRef.current = { x, y };
  }, []);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    gl.clearColor(lightMode ? 1 : 0, lightMode ? 1 : 0, lightMode ? 1 : 0, 1);

    const geometry = new Triangle(gl);

    const initialP = propsRef.current;
    const initTint = hexToRgb(initialP.tint || '#ffffff');
    const initDither = typeof initialP.dither === 'boolean' ? (initialP.dither ? 1 : 0) : (initialP.dither ?? 0);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(gl.canvas.width || 1, gl.canvas.height || 1, 1),
        },
        uScale: { value: initialP.scale ?? 1 },
        uGridMul: { value: new Float32Array(initialP.gridMul || [2, 1]) },
        uDigitSize: { value: initialP.digitSize ?? 1.5 },
        uScanlineIntensity: { value: initialP.scanlineIntensity ?? 0.3 },
        uGlitchAmount: { value: initialP.glitchAmount ?? 1 },
        uFlickerAmount: { value: initialP.flickerAmount ?? 1 },
        uNoiseAmp: { value: initialP.noiseAmp ?? 1 },
        uChromaticAberration: { value: initialP.chromaticAberration ?? 0 },
        uDither: { value: initDither },
        uCurvature: { value: initialP.curvature ?? 0.2 },
        uTint: { value: new Color(initTint[0], initTint[1], initTint[2]) },
        uMouse: {
          value: new Float32Array([smoothMouseRef.current.x, smoothMouseRef.current.y]),
        },
        uMouseStrength: { value: initialP.mouseStrength ?? 0.2 },
        uUseMouse: { value: initialP.mouseReact !== false ? 1 : 0 },
        uPageLoadProgress: { value: initialP.pageLoadAnimation !== false ? 0 : 1 },
        uUsePageLoadAnimation: { value: initialP.pageLoadAnimation !== false ? 1 : 0 },
        uBrightness: { value: initialP.brightness ?? 1 },
        uLightMode: { value: lightMode ? 1 : 0 },
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!ctn || !renderer) return;
      const rawW = ctn.offsetWidth || window.innerWidth || 1;
      const rawH = ctn.offsetHeight || window.innerHeight || 1;

      // Cap internal drawing buffer resolution to 1280x720 for rock solid 60fps on Retina displays
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

      if (programRef.current) {
        programRef.current.uniforms.iResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(ctn);
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const update = (t: number) => {
      rafRef.current = requestAnimationFrame(update);
      const pr = programRef.current;
      if (!pr) return;

      const p = propsRef.current;

      if (p.pageLoadAnimation && loadAnimationStartRef.current === 0) {
        loadAnimationStartRef.current = t;
      }

      const tScale = p.timeScale ?? 0.3;
      if (!p.pause) {
        const elapsed = (t * 0.001 + timeOffsetRef.current) * tScale;
        pr.uniforms.iTime.value = elapsed;
        frozenTimeRef.current = elapsed;
      } else {
        pr.uniforms.iTime.value = frozenTimeRef.current;
      }

      if (p.pageLoadAnimation && loadAnimationStartRef.current > 0) {
        const animationDuration = 1800;
        const animationElapsed = t - loadAnimationStartRef.current;
        const progress = Math.min(animationElapsed / animationDuration, 1);
        pr.uniforms.uPageLoadProgress.value = progress;
      }

      // Live update uniforms from props
      pr.uniforms.uScale.value = p.scale ?? 1;
      pr.uniforms.uDigitSize.value = p.digitSize ?? 1.5;
      pr.uniforms.uScanlineIntensity.value = p.scanlineIntensity ?? 0.3;
      pr.uniforms.uGlitchAmount.value = p.glitchAmount ?? 1;
      pr.uniforms.uFlickerAmount.value = p.flickerAmount ?? 1;
      pr.uniforms.uNoiseAmp.value = p.noiseAmp ?? 1;
      pr.uniforms.uChromaticAberration.value = p.chromaticAberration ?? 0;
      pr.uniforms.uDither.value = typeof p.dither === 'boolean' ? (p.dither ? 1 : 0) : (p.dither ?? 0);
      pr.uniforms.uCurvature.value = p.curvature ?? 0.2;
      pr.uniforms.uBrightness.value = p.brightness ?? 1;
      pr.uniforms.uMouseStrength.value = p.mouseStrength ?? 0.2;
      pr.uniforms.uUseMouse.value = p.mouseReact !== false ? 1 : 0;

      if (p.gridMul) {
        pr.uniforms.uGridMul.value[0] = p.gridMul[0];
        pr.uniforms.uGridMul.value[1] = p.gridMul[1];
      }

      if (p.tint) {
        const currentRgb = hexToRgb(p.tint);
        pr.uniforms.uTint.value = new Color(currentRgb[0], currentRgb[1], currentRgb[2]);
      }

      if (p.mouseReact !== false) {
        const dampingFactor = 0.08;
        const smoothMouse = smoothMouseRef.current;
        const mouse = mouseRef.current;
        smoothMouse.x += (mouse.x - smoothMouse.x) * dampingFactor;
        smoothMouse.y += (mouse.y - smoothMouse.y) * dampingFactor;

        const mouseUniform = pr.uniforms.uMouse.value;
        mouseUniform[0] = smoothMouse.x;
        mouseUniform[1] = smoothMouse.y;
      }

      renderer.render({ scene: mesh });
    };

    rafRef.current = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    if (mouseReact) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      if (mouseReact) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      loadAnimationStartRef.current = 0;
      timeOffsetRef.current = Math.random() * 100;
    };
  }, [lightMode, mouseReact, handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className={`faulty-terminal-container ${className}`.trim()}
      style={style}
    />
  );
};

export default FaultyTerminal;
