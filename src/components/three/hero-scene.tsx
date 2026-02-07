"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Float, Environment, Preload } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/use-animations";

/**
 * Hook to get responsive text size and camera distance based on viewport
 */
function useResponsiveConfig() {
    const [config, setConfig] = useState({ size: 1.5, cameraZ: 8 });

    useEffect(() => {
        const updateConfig = () => {
            const width = window.innerWidth;
            if (width < 400) {
                setConfig({ size: 0.3, cameraZ: 6.5 });  // Small mobile
            } else if (width < 520) {
                setConfig({ size: 0.4, cameraZ: 7 });    // Mobile
            } else if (width < 768) {
                setConfig({ size: 0.6, cameraZ: 8 });    // Large mobile
            } else if (width < 1024) {
                setConfig({ size: 1.0, cameraZ: 8 });    // Tablet
            } else {
                setConfig({ size: 1.5, cameraZ: 8 });    // Desktop
            }
        };

        updateConfig();
        window.addEventListener('resize', updateConfig);
        return () => window.removeEventListener('resize', updateConfig);
    }, []);

    return config;
}

/**
 * 3D animated text component for the hero
 */
function BeetrusText() {
    const textRef = useRef<THREE.Mesh>(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const { size: textSize } = useResponsiveConfig();

    // Create gradient material
    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color("#ff3333") }, // Red
                uColor2: { value: new THREE.Color("#00f0ff") }, // Cyan
                uColor3: { value: new THREE.Color("#ff6622") }, // Orange
            },
            vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          // Subtle wave effect
          vec3 pos = position;
          pos.y += sin(position.x * 0.5 + uTime * 0.5) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Animated gradient
          float t = vUv.x + sin(uTime * 0.3) * 0.2;
          
          vec3 color;
          if (t < 0.5) {
            color = mix(uColor1, uColor2, t * 2.0);
          } else {
            color = mix(uColor2, uColor3, (t - 0.5) * 2.0);
          }
          
          // Add glow
          float glow = 0.5 + 0.5 * sin(uTime * 2.0);
          color += glow * 0.1;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
        });
    }, []);

    // Animate the shader
    useFrame((state) => {
        if (prefersReducedMotion) return;
        material.uniforms.uTime.value = state.clock.elapsedTime;

        if (textRef.current) {
            textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <Float
            speed={prefersReducedMotion ? 0 : 2}
            rotationIntensity={prefersReducedMotion ? 0 : 0.2}
            floatIntensity={prefersReducedMotion ? 0 : 0.5}
        >
            <Center key={textSize}>
                <Text3D
                    ref={textRef}
                    font="/fonts/inter-bold.json"
                    size={textSize}
                    height={textSize * 0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    material={material}
                >
                    BEETRUS
                </Text3D>
            </Center>
        </Float>
    );
}

/**
 * Floating particles background
 */
function Particles({ count = 200 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

            // Random colors between cyan and purple
            const t = Math.random();
            colors[i * 3] = t * 0 + (1 - t) * 0.75; // R
            colors[i * 3 + 1] = t * 0.94 + (1 - t) * 0; // G
            colors[i * 3 + 2] = t * 1 + (1 - t) * 1; // B
        }

        return { positions, colors };
    }, [count]);

    useFrame((state) => {
        if (mesh.current && !prefersReducedMotion) {
            mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[particles.colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

/**
 * Camera controller for subtle movement
 */
function CameraController() {
    const { camera } = useThree();
    const prefersReducedMotion = usePrefersReducedMotion();

    useFrame((state) => {
        if (prefersReducedMotion) return;

        // Subtle camera movement based on time
        camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
        camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.3;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

/**
 * Loading fallback for 3D scene
 */
function CanvasFallback() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
        </div>
    );
}

/**
 * Main 3D Hero Scene
 */
export function Hero3DScene() {
    const { cameraZ } = useResponsiveConfig();

    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, cameraZ], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bf00ff" />

                    <BeetrusText />
                    <Particles count={150} />
                    <CameraController />

                    <Environment preset="night" />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}

/**
 * Simple fallback hero for when 3D is not available
 * (mobile, reduced motion, older browsers, etc.)
 */
export function HeroFallback() {
    return (
        <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
            {/* Glow effect behind text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-[80%] bg-neon-red/20 blur-[100px] rounded-full" />
            </div>
            {/* Main text - responsive sizing */}
            <h1 className="font-display text-[18vw] md:text-[15vw] font-black gradient-text text-center leading-none tracking-tight">
                BEETRUS
            </h1>
        </div>
    );
}
