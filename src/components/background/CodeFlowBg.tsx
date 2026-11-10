"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// ============================================================
// CONSTANTES DE CONFIGURAÇÃO (Fácil Edição)
// ============================================================

/**
 * VELOCIDADE DA SCROLLAGEM
 * Duração do ciclo completo em segundos. Valores maiores deixam o scroll mais lento e suave.
 */
const LOOP_DURATION_SECONDS = 70;

/**
 * PALETA DE CORES DO CÓDIGO (Neon Vibrante inspirado no tema Andromeda/Cosmic)
 */
const EDITOR_COLORS = {
  canvasBackground: "#050014", // Fundo profundo combinando com o Cosmic Void
  lineNumber: "#6366f1", // Numeração das linhas elegante
  keyword: "#e879f9", // Palavras-chave (magenta/rosa supernova)
  interface: "#7dd3fc", // Tipos e Interfaces (azul estelar)
  property: "#a78bfa", // Propriedades (violeta nebulosa)
  hook: "#34d399", // Hooks e funções (verde esmeralda)
  tag: "#38bdf8", // Tags JSX e elementos HTML
  string: "#fde047", // Textos e strings (amarelo dourado)
  defaultText: "#eef2ff", // Texto padrão (branco neve azulado)
} as const;

/**
 * VÉU DE ESCURECIMENTO (READABILITY OVERLAY DIVIDIDO EM 3 PARTES)
 * Mantém intacta a tonalidade violeta do seu portfólio, garantindo
 * legibilidade perfeita sobre os textos e cards.
 */
const READABILITY_OVERLAY = {
  baseBackground: "#050014",
  baseGradient:
    "radial-gradient(ellipse at 50% 35%, rgba(30, 11, 74, 0.45) 0%, rgba(5, 0, 20, 0.85) 75%)",

  /**
   * Gradiente dividido em 3 partes verticais (Top -> Center -> Bottom):
   * Permite controlar a opacidade e o sombreamento de cada faixa da tela.
   */
  veilGradient: `
    linear-gradient(
      to bottom,
      rgba(5, 0, 20, 0.52) 0%,   /* Parte Superior */
      rgba(5, 0, 20, 0.88) 35%,  /* Transição superior para o centro */
      rgba(5, 0, 20, 0.92) 50%,  /* Parte Central (Ideal para leitura dos cards/textos) */
      rgba(5, 0, 20, 0.85) 75%,  /* Transição para a base */
      rgba(5, 0, 20, 0.68) 100%  /* Parte Inferior */
    )
  `,
} as const;

const TWO_PI = Math.PI * 2;
const SURFACE_WIDTH = 52;
const SURFACE_HEIGHT_PLANE = 104;
const SURFACE_CENTER_Z = -18;
const SURFACE_Y_OFFSET = -2.2;

interface CameraProfile {
  readonly pixelRatioLimit: number;
  readonly targetFps: number;
  readonly fieldOfView: number;
  readonly cameraX: number;
  readonly cameraY: number;
  readonly cameraZ: number;
  readonly targetY: number;
  readonly targetZ: number;
  readonly driftX: number;
  readonly driftY: number;
  readonly driftZ: number;
  readonly roll: number;
}

interface AnimationHandle {
  pause(): void;
  resume(): void;
  kill(): void;
}

interface AnimationContextHandle {
  revert(): void;
}

// ============================================================
// SHADERS COM NEON INTENSIFICADO
// ============================================================

const CODE_VERTEX_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying float vViewDepth;

  void main() {
    vUv = uv;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDepth = -viewPosition.z;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const CODE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D uCodeTexture;
  uniform float uPhase;
  uniform vec2 uResolution;

  varying vec2 vUv;
  varying float vViewDepth;

  void main() {
    vec2 scrolledUv = vUv;
    scrolledUv.y = fract(scrolledUv.y + uPhase);

    vec4 texColor = texture2D(uCodeTexture, scrolledUv);

    vec3 baseColor = vec3(0.02, 0.0, 0.08);
    vec3 neonBoost = texColor.rgb * 1.5;
    vec3 finalColor = mix(baseColor, neonBoost, texColor.a);

    float distanceFade = smoothstep(14.0, 65.0, vViewDepth);
    finalColor *= (1.0 - distanceFade * 0.4);

    vec2 screenUv = gl_FragCoord.xy / max(uResolution, vec2(1.0));
    vec2 centeredUv = (screenUv - 0.5) * vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    float vignette = smoothstep(0.25, 0.9, length(centeredUv));
    finalColor *= (1.0 - vignette * 0.35);

    gl_FragColor = vec4(finalColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

// ============================================================
// GERADOR DE TEXTURA TSX COM A IDENTIDADE DO SEU PORTFÓLIO
// ============================================================

function createCodeTexture(
  THREE: typeof import("three"),
): import("three").CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) {
    throw new Error("Não foi possível criar o contexto 2D para a textura.");
  }

  ctx.fillStyle = EDITOR_COLORS.canvasBackground;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '500 20px "Geist Mono", "Fira Code", monospace';
  ctx.textBaseline = "top";

  const lines = [
    { text: 'import { useState, useEffect } from "react";', type: "keyword" },
    { text: 'import { motion } from "motion/react";', type: "keyword" },
    { text: "", type: "normal" },
    { text: "interface ProjectCardProps {", type: "interface" },
    { text: "  readonly title: string;", type: "property" },
    { text: "  readonly category: string;", type: "property" },
    { text: "  readonly isCompleted: boolean;", type: "property" },
    { text: "}", type: "interface" },
    { text: "", type: "normal" },
    {
      text: "export function CardProject({ project }: ProjectCardProps) {",
      type: "keyword",
    },
    {
      text: "  const [isHovered, setIsHovered] = useState(false);",
      type: "hook",
    },
    { text: "", type: "normal" },
    { text: "  useEffect(() => {", type: "hook" },
    {
      text: '    console.log("Loading cosmic components...");',
      type: "string",
    },
    { text: "  }, []);", type: "normal" },
    { text: "", type: "normal" },
    { text: "  return (", type: "tag" },
    {
      text: '    <article className="glass-panel group relative flex flex-col rounded-2xl p-6">',
      type: "tag",
    },
    { text: '      <div className="flex items-center gap-4">', type: "tag" },
    {
      text: '        <span className="text-primary font-mono text-xs">~/projects</span>',
      type: "string",
    },
    { text: "      </div>", type: "tag" },
    {
      text: '      <h3 className="text-foreground text-lg font-bold">{project.title}</h3>',
      type: "tag",
    },
    { text: "    </article>", type: "tag" },
    { text: "  );", type: "normal" },
    { text: "}", type: "keyword" },
    { text: "", type: "normal" },
    { text: "// Next.js 16 + React 19 App Router Stack", type: "comment" },
    {
      text: 'const STACK = ["Next.js", "React", "TypeScript", "Tailwind v4"];',
      type: "keyword",
    },
  ];

  const totalRowsToDraw = 130;
  const lineHeight = 32;

  for (let i = 0; i < totalRowsToDraw; i++) {
    const item = lines[i % lines.length];
    const y = i * lineHeight + 20;

    ctx.fillStyle = EDITOR_COLORS.lineNumber;
    ctx.fillText(String((i % lines.length) + 1).padStart(3, "0"), 20, y);

    let color: string = EDITOR_COLORS.defaultText;
    if (item.type === "keyword") color = EDITOR_COLORS.keyword;
    else if (item.type === "interface") color = EDITOR_COLORS.interface;
    else if (item.type === "property") color = EDITOR_COLORS.property;
    else if (item.type === "hook") color = EDITOR_COLORS.hook;
    else if (item.type === "tag") color = EDITOR_COLORS.tag;
    else if (item.type === "string") color = EDITOR_COLORS.string;
    else if (item.type === "comment") color = "#6d7594";

    ctx.fillStyle = color;
    ctx.fillText(item.text, 80, y);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  return texture;
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function CodeFlowBg() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rootElement = root;

    let isDisposed = false;
    let renderer: import("three").WebGLRenderer | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let scene: import("three").Scene | null = null;
    let surfaceGeometry: import("three").PlaneGeometry | null = null;
    let surfaceMaterial: import("three").ShaderMaterial | null = null;
    let codeTexture: import("three").CanvasTexture | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let animation: AnimationHandle | null = null;
    let animationContext: AnimationContextHandle | null = null;
    let frameInterval = 1000 / 30;
    let lastRenderedAt = 0;
    let currentProfile: CameraProfile | null = null;
    let cameraTarget: import("three").Vector3 | null = null;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const prefersReducedMotion = motionPreference.matches;

    const loopState = { phase: 0 };

    function renderAtPhase(phase: number, force = false): void {
      if (
        !renderer ||
        !camera ||
        !scene ||
        !surfaceMaterial ||
        !cameraTarget ||
        !currentProfile
      ) {
        return;
      }

      const now = performance.now();
      if (!force && now - lastRenderedAt < frameInterval) {
        return;
      }
      lastRenderedAt = now;

      const angle = phase * TWO_PI;
      const profile = currentProfile;

      camera.position.set(
        profile.cameraX + Math.sin(angle) * profile.driftX,
        profile.cameraY + Math.sin(angle * 2.0 + 0.3) * profile.driftY,
        profile.cameraZ + Math.cos(angle * 1.5) * profile.driftZ,
      );

      cameraTarget.set(
        Math.sin(angle * 0.8) * 0.4,
        profile.targetY + Math.cos(angle * 2.0) * 0.2,
        profile.targetZ,
      );

      camera.lookAt(cameraTarget);
      camera.rotateZ(Math.sin(angle + 0.4) * profile.roll);

      surfaceMaterial.uniforms.uPhase.value = phase;
      renderer.render(scene, camera);
    }

    function resizeScene(): void {
      if (!renderer || !camera || !surfaceMaterial) return;

      const width = Math.max(1, rootElement.clientWidth);
      const height = Math.max(1, rootElement.clientHeight);
      const aspect = width / height;
      const isMobile = width < 768 || Math.min(width, height) < 520;

      currentProfile = isMobile
        ? {
            pixelRatioLimit: 1.1,
            targetFps: 24,
            fieldOfView: 48,
            cameraX: 0.5,
            cameraY: 6.2,
            cameraZ: 14.5,
            targetY: SURFACE_Y_OFFSET,
            targetZ: -14,
            driftX: 0.18,
            driftY: 0.08,
            driftZ: 0.12,
            roll: 0.0007,
          }
        : {
            pixelRatioLimit: 1.35,
            targetFps: 30,
            fieldOfView: 38,
            cameraX: 1.0,
            cameraY: 7.2,
            cameraZ: 16.5,
            targetY: SURFACE_Y_OFFSET,
            targetZ: -16,
            driftX: 0.32,
            driftY: 0.12,
            driftZ: 0.2,
            roll: 0.0016,
          };

      camera.fov = currentProfile.fieldOfView + (aspect > 2.0 ? 2.5 : 0);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        currentProfile.pixelRatioLimit,
      );
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);

      surfaceMaterial.uniforms.uResolution.value.set(
        width * pixelRatio,
        height * pixelRatio,
      );
      frameInterval = 1000 / currentProfile.targetFps;

      renderAtPhase(loopState.phase, true);
    }

    function handleVisibilityChange(): void {
      if (document.hidden) {
        animation?.pause();
      } else if (!prefersReducedMotion) {
        animation?.resume();
      }
    }

    async function initialize(): Promise<void> {
      try {
        const [THREE, gsapModule] = await Promise.all([
          import("three"),
          import("gsap"),
        ]);

        if (isDisposed) return;

        const { gsap } = gsapModule;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        cameraTarget = new THREE.Vector3();

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: "low-power",
          precision: "mediump",
        });

        renderer.setClearColor(0x050014, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.inset = "0";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";
        renderer.domElement.style.pointerEvents = "none";

        codeTexture = createCodeTexture(THREE);
        codeTexture.anisotropy = Math.min(
          4,
          renderer.capabilities.getMaxAnisotropy(),
        );

        surfaceGeometry = new THREE.PlaneGeometry(
          SURFACE_WIDTH,
          SURFACE_HEIGHT_PLANE,
          1,
          1,
        );
        surfaceMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uCodeTexture: { value: codeTexture },
            uPhase: { value: 0 },
            uResolution: { value: new THREE.Vector2(1, 1) },
          },
          vertexShader: CODE_VERTEX_SHADER,
          fragmentShader: CODE_FRAGMENT_SHADER,
          side: THREE.FrontSide,
          depthTest: false,
          depthWrite: false,
          transparent: false,
          toneMapped: false,
        });

        const codeMesh = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
        codeMesh.rotation.x = -Math.PI / 2.55;
        codeMesh.position.set(0, SURFACE_Y_OFFSET, SURFACE_CENTER_Z);
        scene.add(codeMesh);

        rootElement.appendChild(renderer.domElement);

        resizeObserver = new ResizeObserver(resizeScene);
        resizeObserver.observe(rootElement);
        window.addEventListener("resize", resizeScene, { passive: true });
        document.addEventListener("visibilitychange", handleVisibilityChange);

        resizeScene();

        animationContext = gsap.context(() => {
          animation = gsap.to(loopState, {
            phase: 1,
            duration: LOOP_DURATION_SECONDS,
            ease: "none",
            repeat: -1,
            paused: true,
            onUpdate: () => renderAtPhase(loopState.phase),
          });
        }, rootElement);

        renderAtPhase(0, true);

        if (!prefersReducedMotion && !document.hidden) {
          animation?.resume();
        }
      } catch (error) {
        console.warn("[CodeFlowBg] Erro ao iniciar WebGL:", error);
      }
    }

    void initialize();

    return () => {
      isDisposed = true;
      animation?.kill();
      animationContext?.revert();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resizeScene);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      codeTexture?.dispose();
      surfaceGeometry?.dispose();
      surfaceMaterial?.dispose();

      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }

      renderer = null;
      scene = null;
      camera = null;
      cameraTarget = null;
      codeTexture = null;
      surfaceGeometry = null;
      surfaceMaterial = null;
      animation = null;
      animationContext = null;
    };
  }, []);

  const rootStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: -10,
    overflow: "hidden",
    pointerEvents: "none",
    backgroundColor: READABILITY_OVERLAY.baseBackground,
    backgroundImage: READABILITY_OVERLAY.baseGradient,
  };

  const readabilityStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
    background: READABILITY_OVERLAY.veilGradient,
  };

  return (
    <div ref={rootRef} aria-hidden="true" style={rootStyle}>
      <div style={readabilityStyle} />
    </div>
  );
}
