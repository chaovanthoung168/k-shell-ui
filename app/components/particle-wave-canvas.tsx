"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { AdditiveBlending, NormalBlending, Color, ShaderMaterial, Vector2 } from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDpr;
  uniform vec2 uPointer;
  uniform float uProgress;
  attribute float aSize;
  attribute vec3 aColor;
  attribute vec2 aTarget;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float t = uTime;
    p.y = sin(p.x * 0.63 + t) * 0.95
        + sin(p.z * 0.88 + p.x * 0.22 - t * 0.72) * 0.62
        + cos(p.x * 0.32 - p.z * 0.5 + t * 0.48) * 0.38;
    float influence = exp(-dot(p.xz - uPointer, p.xz - uPointer) * 0.22);
    p.y += influence * (0.18 + sin(t * 1.4 + p.x) * 0.12);
    p.x += sin(p.z * 0.4 + t * 0.35) * 0.22;
    float tilt = smoothstep(0.0, 0.58, uProgress) * -1.25;
    p.yz = mat2(cos(tilt), -sin(tilt), sin(tilt), cos(tilt)) * p.yz;
    float turn = sin(uProgress * 3.14159265) * 0.32;
    p.xy = mat2(cos(turn), -sin(turn), sin(turn), cos(turn)) * p.xy;
    vec4 view = modelViewMatrix * vec4(p, 1.0);
    vec4 waveClip = projectionMatrix * view;
    waveClip /= waveClip.w;
    float gather = smoothstep(0.24, 0.88, uProgress);
    gl_Position = mix(waveClip, vec4(aTarget, 0.0, 1.0), gather);
    gl_PointSize = mix(clamp(aSize * uDpr * (12.0 / -view.z), 1.5, 9.0), (2.2 + aSize * 0.25) * uDpr, gather);
    float edge = (1.0 - smoothstep(5.3, 7.0, abs(position.x))) * (1.0 - smoothstep(3.1, 4.4, abs(position.z)));
    vAlpha = mix(edge * mix(0.38, 0.95, smoothstep(-4.0, 4.0, position.z)), 0.8, gather);
    vColor = aColor * (0.85 + smoothstep(-1.8, 1.8, p.y) * 0.25);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float radius = length(gl_PointCoord - vec2(0.5));
    if (radius > 0.5) discard;
    float core = 1.0 - smoothstep(0.13, 0.28, radius);
    float halo = exp(-radius * radius * 19.0) * 0.19;
    float alpha = (core * 0.84 + halo) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

type WaveProps = {
  active: boolean;
  compact: boolean;
  light: boolean;
  pointer: RefObject<{ x: number; y: number }>;
  progress: RefObject<number>;
  onReady: () => void;
  onFailure: () => void;
};

// The final silhouette is generated once, not reconstructed in the frame loop.
function createTerminalTargets(count: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 560;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const textPoints: [number, number][] = [];
  if (context) {
    context.font = "30px Consolas, monospace";
    context.textBaseline = "top";
    context.fillStyle = "white";
    ["› help", "  cd   ls   cat   mkdir", "  history   theme", "", "› echo hello, Windows", "  hello, Windows", "", "›"].forEach((line, row) => context.fillText(line, 0, row * 56));
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let y = 0; y < canvas.height; y += 2) {
      for (let x = 0; x < canvas.width; x += 2) {
        if (pixels[(y * canvas.width + x) * 4 + 3] > 128) textPoints.push([-0.86 + x / 1280 * 1.72, 0.53 - y / 560 * 1.34]);
      }
    }
  }
  const targets = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const f = i / count;
    let x = 0, y = 0;
    if (f < 0.22) {
      const edge = f / 0.22 * 4;
      const t = edge % 1;
      if (edge < 1) { x = -0.97 + t * 1.94; y = 0.96; }
      else if (edge < 2) { x = 0.97; y = 0.96 - t * 1.92; }
      else if (edge < 3) { x = 0.97 - t * 1.94; y = -0.96; }
      else { x = -0.97; y = -0.96 + t * 1.92; }
    } else if (f < 0.3) { x = -0.97 + (f - 0.22) / 0.08 * 1.94; y = 0.74; }
    else if (f < 0.34) {
      const t = (f - 0.3) / 0.04 * 3;
      const angle = (t % 1) * Math.PI * 2;
      x = -0.88 + Math.floor(t) * 0.065 + Math.cos(angle) * 0.014;
      y = 0.85 + Math.sin(angle) * 0.027;
    } else {
      const point = textPoints[(i * 17) % Math.max(1, textPoints.length)];
      x = point?.[0] ?? (-0.85 + (i % 90) / 90 * 1.2);
      y = point?.[1] ?? (0.5 - (Math.floor(i / 90) % 6) * 0.2);
    }
    targets[i * 2] = x;
    targets[i * 2 + 1] = y;
  }
  return targets;
}

function WavePoints({ active, compact, light, pointer, progress }: Pick<WaveProps, "active" | "compact" | "light" | "pointer" | "progress">) {
  const material = useRef<ShaderMaterial>(null);
  const { gl } = useThree();
  const data = useMemo(() => {
    const columns = compact ? 100 : 160;
    const rows = compact ? 52 : 88;
    const positions = new Float32Array(columns * rows * 3);
    const colors = new Float32Array(columns * rows * 3);
    const sizes = new Float32Array(columns * rows);
    // White/additive highlights wash out on pale surfaces. Use deeper warm
    // colors and slate highlights with normal alpha blending in light mode.
    const palette = (light ? ["#c75a1e", "#c44248", "#53627a"] : ["#ff9a45", "#ff6b62", "#f9fafc"]).map(color => new Color(color));
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const i = row * columns + col;
        // Stable attributes: only uniforms change each frame.
        const random = Math.abs((Math.sin(i * 127.1 + 311.7) * 43758.5453) % 1);
        positions[i * 3] = (col / (columns - 1) - 0.5) * 14;
        positions[i * 3 + 2] = (row / (rows - 1) - 0.5) * 8.8;
        palette[random > 0.86 ? 2 : random > 0.5 ? 1 : 0].toArray(colors, i * 3);
        sizes[i] = 2.0 + random * 1.8;
      }
    }
    return { positions, colors, sizes, targets: createTerminalTargets(columns * rows) };
  }, [compact, light]);
  const uniforms = useMemo(() => ({ uTime: { value: 2.4 }, uDpr: { value: 1 }, uPointer: { value: new Vector2() }, uProgress: { value: 0 } }), []);

  useFrame((_, delta) => {
    const shader = material.current;
    if (!shader) return;
    shader.uniforms.uDpr.value = gl.getPixelRatio();
    shader.uniforms.uProgress.value = progress.current;
    if (!active) return;
    // Clamp after tab/offscreen pauses to avoid a sudden jump.
    const step = Math.min(delta, 0.05);
    shader.uniforms.uTime.value += step * 0.32;
    const cursor = shader.uniforms.uPointer.value as Vector2;
    const smoothing = 1 - Math.exp(-step * 2.4);
    cursor.x += (pointer.current.x * 6 - cursor.x) * smoothing;
    cursor.y += (pointer.current.y * 3.5 - cursor.y) * smoothing;
  });

  return <points rotation={[0, -0.12, -0.16]} position={[0, 0.15, 0]} frustumCulled={false}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
      <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
      <bufferAttribute attach="attributes-aTarget" args={[data.targets, 2]} />
    </bufferGeometry>
    <shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} blending={light ? NormalBlending : AdditiveBlending} />
  </points>;
}

function ContextHealth({ onFailure }: Pick<WaveProps, "onFailure">) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}

export default function WaveCanvas({ active, compact, light, pointer, progress, onReady, onFailure }: WaveProps) {
  return <Canvas
    camera={{ position: [0, 4.6, 11.5], fov: 46, near: 0.1, far: 50 }}
    dpr={compact ? [1, 1.25] : [1, 1.5]}
    frameloop={active ? "always" : "demand"}
    gl={{ alpha: true, antialias: false, powerPreference: "low-power", failIfMajorPerformanceCaveat: true }}
    fallback={null}
    onCreated={({ camera, gl }) => {
      camera.lookAt(0, 0, 0);
      gl.debug.onShaderError = () => onFailure();
      onReady();
    }}
  >
    <WavePoints active={active} compact={compact} light={light} pointer={pointer} progress={progress} />
    <ContextHealth onFailure={onFailure} />
  </Canvas>;
}
