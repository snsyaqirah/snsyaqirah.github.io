import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import GalaxyBackground from './GalaxyBackground';

export default function GalaxyCanvas({ frameloop }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
      frameloop={frameloop}
    >
      <Suspense fallback={null}><GalaxyBackground /></Suspense>
    </Canvas>
  );
}
