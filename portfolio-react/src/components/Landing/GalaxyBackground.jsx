import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ── Nebula cloud ─────────────────────────── */
function Nebula() {
  const meshRef = useRef();
  const shaderRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#1a0533') }, // deep purple
      uColor2: { value: new THREE.Color('#0d2137') }, // deep navy
      uColor3: { value: new THREE.Color('#06362e') }, // deep teal
    }),
    []
  );

  useFrame((_, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -30]}>
      <planeGeometry args={[120, 80, 32, 32]} />
      <shaderMaterial
        ref={shaderRef}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;

          // simplex-ish noise
          vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187,0.366025403784439,
                               -0.577350269189626,0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
            vec3 m = max(0.5 - vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
            m = m*m; m = m*m;
            vec3 x_ = 2.0*fract(p * C.www) - 1.0;
            vec3 h  = abs(x_) - 0.5;
            vec3 ox = floor(x_ + 0.5);
            vec3 a0 = x_ - ox;
            m *= 1.79284291400159 - 0.85373472095314*(a0*a0 + h*h);
            vec3 g;
            g.x = a0.x*x0.x + h.x*x0.y;
            g.yz = a0.yz*x12.xz + h.yz*x12.yw;
            return 130.0 * dot(m, g);
          }

          void main() {
            vec2 uv = vUv;
            float n1 = snoise(uv * 2.0 + uTime * 0.3);
            float n2 = snoise(uv * 3.5 - uTime * 0.2);
            float n3 = snoise(uv * 1.5 + vec2(uTime * 0.1, -uTime * 0.15));

            vec3 col = mix(uColor1, uColor2, smoothstep(-0.3, 0.5, n1));
            col = mix(col, uColor3, smoothstep(0.0, 0.7, n2) * 0.5);

            float aurora = smoothstep(0.2, 0.8, n3) * smoothstep(0.4, 0.6, uv.y);
            col += vec3(0.0, 0.8, 0.6) * aurora * 0.15;

            float alpha = 0.6 + 0.2 * n1;
            gl_FragColor = vec4(col, alpha);
          }
        `}
      />
    </mesh>
  );
}

/* ── Shooting stars ───────────────────────── */
function ShootingStars() {
  const count = 6;
  const meshRef = useRef();
  const data = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 40 + 10,
          -10 - Math.random() * 15
        ),
        speed: 15 + Math.random() * 25,
        delay: Math.random() * 12,
        length: 1.5 + Math.random() * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position;
    data.forEach((star, i) => {
      const progress = ((t - star.delay) % 8) / 2;
      if (progress > 0 && progress < 1) {
        const x = star.position.x - progress * star.speed;
        const y = star.position.y - progress * star.speed * 0.4;
        positions.setXYZ(i, x, y, star.position.z);
      } else {
        positions.setXYZ(i, 9999, 9999, -50);
      }
    });
    positions.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={2} color="#ffffff" transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

/* ── Main Galaxy Scene ────────────────────── */
export default function GalaxyBackground() {
  return (
    <>
      {/* Deep space colour */}
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 40, 100]} />

      {/* Ambient light so the nebula shader is visible */}
      <ambientLight intensity={0.3} />

      {/* Stars layers */}
      <Stars radius={80} depth={60} count={2500} factor={4} saturation={0.2} fade speed={0.6} />
      <Stars radius={40} depth={30} count={700} factor={6} saturation={0.6} fade speed={0.3} />

      {/* Sparkles for close-up fairy-dust feel */}
      <Sparkles count={50} scale={30} size={1.5} speed={0.3} color="#7eb8ff" />
      <Sparkles count={25} scale={20} size={2} speed={0.2} color="#c49dff" />

      {/* Nebula backdrop */}
      <Nebula />

      {/* Shooting stars */}
      <ShootingStars />
    </>
  );
}
