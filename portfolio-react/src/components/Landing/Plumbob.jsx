import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Plumbob (The Sims diamond) — two octahedrons stacked,
 * floating in space with a soft green glow.
 */
export default function Plumbob({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();
  const glowRef = useRef();

  // Plumbob shape: two cones tip-to-tip
  const topGeo = useMemo(() => new THREE.ConeGeometry(0.7, 1.2, 4, 1), []);
  const bottomGeo = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.7, 0.9, 4, 1);
    geo.rotateX(Math.PI); // flip upside down
    return geo;
  }, []);

  // Glow sprite
  const glowTexture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(80, 255, 120, 0.6)');
    gradient.addColorStop(0.4, 'rgba(40, 200, 80, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 100, 40, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // gentle rotation
      groupRef.current.rotation.y = t * 0.5;
      // float up and down
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
    }
    if (glowRef.current) {
      // pulse
      const pulse = 1 + Math.sin(t * 1.5) * 0.15;
      glowRef.current.scale.set(pulse * 3, pulse * 3, 1);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Glow sprite behind */}
      <sprite ref={glowRef} position={[0, 0.15, -0.3]} scale={[3, 3, 1]}>
        <spriteMaterial map={glowTexture} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>

      {/* Top half */}
      <mesh geometry={topGeo} position={[0, 0.6, 0]} rotation={[0, Math.PI / 4, 0]}>
        <meshPhysicalMaterial
          color="#2dff6e"
          emissive="#1aff50"
          emissiveIntensity={0.6}
          transparent
          opacity={0.85}
          roughness={0.1}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottom half */}
      <mesh geometry={bottomGeo} position={[0, -0.3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <meshPhysicalMaterial
          color="#2dff6e"
          emissive="#1aff50"
          emissiveIntensity={0.6}
          transparent
          opacity={0.85}
          roughness={0.1}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point light inside plumbob */}
      <pointLight color="#2dff6e" intensity={2} distance={8} decay={2} />
    </group>
  );
}
