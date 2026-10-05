"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExtrudeGeometry, Shape, type Group } from "three";
import { STAR_HEIGHT, STAR_POLYGON } from "@/generated/star";

// Matches --color-gold. Tone mapping is off (the Canvas is `flat`) so the face-on colour
// stays the brand gold instead of drifting warmer or paler.
const GOLD = "#ECAF42";

function useStarGeometry() {
  return useMemo(() => {
    const shape = new Shape();
    STAR_POLYGON.forEach(([x, y], index) => {
      if (index === 0) shape.moveTo(x, -y);
      else shape.lineTo(x, -y);
    });
    shape.closePath();
    // The bevel is offset inwards by its own size, so the silhouette is exactly the traced star.
    const geometry = new ExtrudeGeometry(shape, {
      depth: 7,
      bevelEnabled: true,
      bevelThickness: 2.4,
      bevelSize: 1.1,
      bevelOffset: -1.1,
      bevelSegments: 6,
      curveSegments: 1,
    });
    geometry.center();
    return geometry;
  }, []);
}

// Resting pose (radians): turned slightly so the star reads as an object, not a flat shape.
const REST = { x: 0.08, y: -0.3 };
// Where it starts, so it turns into place once when it first appears.
const ENTRANCE_Y = -1.25;

function StarMesh() {
  const group = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const geometry = useStarGeometry();

  useEffect(() => () => geometry.dispose(), [geometry]);

  // The star only moves in answer to the pointer. The canvas renders on demand, so a still
  // pointer costs nothing and nothing loops by itself.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
      invalidate();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [invalidate]);

  useFrame((state, delta) => {
    const star = group.current;
    if (!star) return;
    const ease = Math.min(1, Math.min(delta, 1 / 30) * 2.4);
    const dy = REST.y + pointer.current.x * 0.5 - star.rotation.y;
    const dx = REST.x + pointer.current.y * 0.22 - star.rotation.x;
    star.rotation.y += dy * ease;
    star.rotation.x += dx * ease;
    if (Math.abs(dx) + Math.abs(dy) > 0.0008) state.invalidate();
  });

  return (
    <group ref={group} rotation={[REST.x, ENTRANCE_Y, 0]} scale={size.height / STAR_HEIGHT}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={GOLD} roughness={0.62} metalness={0} />
      </mesh>
    </group>
  );
}

/**
 * The hero star in WebGL: the traced outline, extruded. It turns into place once, then follows
 * the pointer. It fills its parent exactly as the static star does, so swapping one for the
 * other does not move anything. Rendering is on demand and stops while it is off screen.
 */
export default function Star3D({ onReady }: { onReady: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(Boolean(entry?.isIntersecting)),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className="absolute inset-0">
      <Canvas
        orthographic
        flat
        dpr={dpr}
        frameloop={visible ? "demand" : "never"}
        camera={{ position: [0, 0, 1000], near: 1, far: 3000, zoom: 1 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        events={() => ({ enabled: false, priority: 0 })}
        onCreated={onReady}
        aria-hidden="true"
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <ambientLight intensity={2.1} />
        <directionalLight position={[-0.5, 0.9, 1]} intensity={1.25} />
        <StarMesh />
      </Canvas>
    </div>
  );
}
