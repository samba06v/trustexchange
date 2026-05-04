import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GlobeCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.y * 0.15,
      0.05
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.8, 64, 64]} />
      <MeshDistortMaterial
        color="#4c1d95"
        attach="material"
        distort={0.25}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
        emissive="#7c3aed"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function GlobeLattice() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const r = Math.cos((lat * Math.PI) / 180) * 1.82;
      const y = Math.sin((lat * Math.PI) / 180) * 1.82;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        positions.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
        if (i > 0 && i < 64) {
          positions.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
        }
      }
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 20) {
      const angle = (lon * Math.PI) / 180;
      for (let i = 0; i <= 32; i++) {
        const lat = ((i / 32) * 180 - 90) * (Math.PI / 180);
        const r = Math.cos(lat) * 1.82;
        const y = Math.sin(lat) * 1.82;
        positions.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
        if (i > 0 && i < 32) {
          positions.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
        }
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.003;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
    </lineSegments>
  );
}

function OrbitNode({ angle, radius, color, label }: { angle: number; radius: number; color: string; label: string }) {
  const ref = useRef<THREE.Group>(null);
  const speed = 0.2 + Math.random() * 0.3;
  const baseAngle = angle;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + baseAngle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 0.5) * 0.4;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({ radius, color, tiltX, tiltZ }: { radius: number; color: string; tiltX: number; tiltZ: number }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>
    </group>
  );
}

function Particles() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#a78bfa" size={0.02} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#8b5cf6" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#ec4899" />
      <pointLight position={[0, 5, -5]} intensity={1.5} color="#06b6d4" />
      <spotLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" angle={0.3} />

      <GlobeCore />
      <GlobeLattice />

      {/* Orbit rings */}
      <OrbitRing radius={2.8} color="#8b5cf6" tiltX={1.1} tiltZ={0.3} />
      <OrbitRing radius={3.4} color="#ec4899" tiltX={0.6} tiltZ={0.8} />
      <OrbitRing radius={4.0} color="#06b6d4" tiltX={0.2} tiltZ={1.2} />

      {/* Orbit nodes */}
      <OrbitNode angle={0} radius={2.8} color="#a78bfa" label="USDT" />
      <OrbitNode angle={1.2} radius={3.4} color="#f472b6" label="ETH" />
      <OrbitNode angle={2.4} radius={4.0} color="#22d3ee" label="P2P" />
      <OrbitNode angle={3.6} radius={2.8} color="#34d399" label="EVM" />
      <OrbitNode angle={4.8} radius={3.4} color="#fbbf24" label="DeFi" />

      <Particles />
    </>
  );
}

export default function ThreeGlobe() {
  return (
    <div className="w-full h-full" style={{ minHeight: '420px' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
