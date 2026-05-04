import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1800;
const MAX_CONNECTIONS = 80;
const CONNECTION_DISTANCE = 3.5;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = 0;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const linePositions = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), []);
  const lineColors = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), []);

  const particleColors = useMemo(() => {
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const palette = [
      [0.545, 0.361, 0.965], // purple #8b5cf6
      [0.925, 0.282, 0.6],   // pink #ec4899
      [0.024, 0.714, 0.831], // cyan #06b6d4
      [0.965, 0.620, 0.043], // gold #f59e0b
    ];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }
    return colors;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !linesRef.current) return;

    const t = clock.elapsedTime;
    const mouseX = mouse.x * viewport.width * 0.5;
    const mouseY = mouse.y * viewport.height * 0.5;

    // Update particle positions
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;

      // Drift
      posArray[ix] += velocities[ix];
      posArray[iy] += velocities[iy];

      // Mouse repulsion
      const dx = posArray[ix] - mouseX;
      const dy = posArray[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        posArray[ix] += (dx / dist) * 0.03;
        posArray[iy] += (dy / dist) * 0.03;
      }

      // Gentle wave
      posArray[iz] = Math.sin(t * 0.3 + i * 0.1) * 0.5;

      // Wrap
      if (posArray[ix] > 20) posArray[ix] = -20;
      if (posArray[ix] < -20) posArray[ix] = 20;
      if (posArray[iy] > 12.5) posArray[iy] = -12.5;
      if (posArray[iy] < -12.5) posArray[iy] = 12.5;
    }
    posAttr.needsUpdate = true;

    // Build connections
    let lineIdx = 0;
    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineColAttr = linesRef.current.geometry.attributes.color as THREE.BufferAttribute;
    const linePosArray = linePosAttr.array as Float32Array;
    const lineColArray = lineColAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT && lineIdx < MAX_CONNECTIONS; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < MAX_CONNECTIONS; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < CONNECTION_DISTANCE) {
          const alpha = 1 - d / CONNECTION_DISTANCE;
          linePosArray[lineIdx * 6] = posArray[i * 3];
          linePosArray[lineIdx * 6 + 1] = posArray[i * 3 + 1];
          linePosArray[lineIdx * 6 + 2] = posArray[i * 3 + 2];
          linePosArray[lineIdx * 6 + 3] = posArray[j * 3];
          linePosArray[lineIdx * 6 + 4] = posArray[j * 3 + 1];
          linePosArray[lineIdx * 6 + 5] = posArray[j * 3 + 2];
          // Connection color - purple to cyan
          lineColArray[lineIdx * 6] = 0.545 * alpha;
          lineColArray[lineIdx * 6 + 1] = 0.361 * alpha;
          lineColArray[lineIdx * 6 + 2] = 0.965 * alpha;
          lineColArray[lineIdx * 6 + 3] = 0.024 * alpha;
          lineColArray[lineIdx * 6 + 4] = 0.714 * alpha;
          lineColArray[lineIdx * 6 + 5] = 0.831 * alpha;
          lineIdx++;
        }
      }
    }

    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={particleColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={MAX_CONNECTIONS * 2} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={MAX_CONNECTIONS * 2} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.4} />
      </lineSegments>
    </>
  );
}

export default function NetworkBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <Particles />
      </Canvas>
    </div>
  );
}
