"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function RotatingBox({ t }: { t: number }) {
  const ref = useRef<THREE.Mesh | null>(null);
  const matRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.5 * delta;
    ref.current.rotation.x += 0.15 * delta;

    const r = 1 - t;
    const g = t;
    if (matRef.current) {
      matRef.current.color.lerp(new THREE.Color(r, g, 0.15), 0.08);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial ref={matRef} roughness={0.3} metalness={0.3} color={new THREE.Color(1, 0.2, 0.2)} />
    </mesh>
  );
}

export default function ThreeWidget({ percent = 0 }: { percent?: number }) {
  const t = Math.max(0, Math.min(1, percent));

  return (
    <Canvas style={{ height: "100%" }} camera={{ position: [2.2, 1.6, 2.2], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <RotatingBox t={t} />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}
