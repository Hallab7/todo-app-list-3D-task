"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type CubeProgressProps = {
  percentage: number; // 0..100
  size?: number; // outer cube size (default 1.8)
};

function LiquidBox({ percentage = 100, size = 5.8 }: CubeProgressProps) {
  const margin = 0.12;
  const innerSize = size - margin;
  const W = innerSize;
  const H = innerSize;
  const D = innerSize;

  const liquidRef = useRef<THREE.Mesh>(null!);
  const surfaceRef = useRef<THREE.Mesh>(null!);
  const currentRef = useRef(0);

  // shader material for wavy top
  const topMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color("#60a5fa") },
        amplitude: { value: 0.03 },
        frequency: { value: 6.0 },
        opacity: { value: 0.95 },
      },
      vertexShader: `
        uniform float time;
        uniform float amplitude;
        uniform float frequency;
        varying float vWave;
        void main() {
          float w1 = sin((uv.x * frequency) + time * 1.2) * cos((uv.y * frequency * 0.7) + time * 0.9);
          float w2 = sin((uv.x * (frequency*0.6)) + time * 1.6) * 0.5;
          float wave = (w1 + w2) * amplitude;
          vec3 displaced = position + normal * wave;
          vWave = wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying float vWave;
        void main() {
          vec3 c = color + vec3(0.02, 0.03, 0.06) * vWave;
          gl_FragColor = vec4(c, opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    const target = THREE.MathUtils.clamp(percentage / 100, 0, 1);
    currentRef.current = THREE.MathUtils.lerp(currentRef.current, target, 0.08);

    // liquid height update
    if (liquidRef.current) {
      liquidRef.current.scale.y = currentRef.current;
      liquidRef.current.position.y = -H / 2 + (currentRef.current * H) / 2;
    }

    if (surfaceRef.current) {
      const topY = -H / 2 + currentRef.current * H;
      surfaceRef.current.position.y = topY + 0.001;
      (surfaceRef.current.material as THREE.ShaderMaterial).uniforms.time.value =
        state.clock.elapsedTime;
    }

    // update colors based on percentage
    let colorHex = "#2563EB";
    if (percentage <= 40) colorHex = "#FF7979";
    else if (percentage <= 90) colorHex = "#F97316";
    else colorHex = "#22C55E";

    if (liquidRef.current) {
      (liquidRef.current.material as THREE.MeshStandardMaterial).color.set(colorHex);
      (liquidRef.current.material as THREE.MeshStandardMaterial).emissive.set(colorHex);
    }

    if (surfaceRef.current) {
      (surfaceRef.current.material as THREE.ShaderMaterial).uniforms.color.value.set(
        new THREE.Color(colorHex)
      );
    }
  });

  return (
    <group>
      {/* liquid internal box */}
      <mesh ref={liquidRef} position={[0, -H / 2, 0]}>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial
          color={"#2563EB"}
          transparent
          opacity={0.72}
          roughness={0.25}
          metalness={0.4}
          emissive={"#18307a"}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* top surface */}
      <mesh
        ref={surfaceRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -H / 2, 0]}
      >
        <planeGeometry args={[W - 0.02, D - 0.02, 128, 128]} />
        <primitive object={topMaterial} />
      </mesh>
    </group>
  );
}

export default function CubeProgress({ percentage = 50, size = 1.8 }: CubeProgressProps) {
  return (
    <div style={{ width: 150, height: 150 }}>
      <Canvas camera={{ position: [3, 2.5, 3.5], fov: 40 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />
        <group rotation={[Math.PI / 12, -Math.PI / 8, 0]}>
          {/* outer cube */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
            <lineBasicMaterial color="#60a5fa" linewidth={2} />
          </lineSegments>

          <LiquidBox percentage={percentage} size={size - 0.02} />
        </group>
      </Canvas>
    </div>
  );
}
