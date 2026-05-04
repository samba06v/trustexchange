import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, MeshDistortMaterial, GradientTexture, Sphere, Torus, Ring } from '@react-three/drei'
import * as THREE from 'three'

function FloatingCrystal({ position, color, scale = 1, speed = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 * speed
  })
  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe={false}
          metalness={0.8}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const count = 800
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8b5cf6" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function GlowRing({ position, color, rotation }: any) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.4
      ref.current.rotation.x = state.clock.elapsedTime * 0.2
    }
  })
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[2, 0.03, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.6} />
    </mesh>
  )
}

function CentralOrb() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={[3, 0, -2]}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial
          color="#1a0a4a"
          emissive="#6d28d9"
          emissiveIntensity={0.4}
          distort={0.4}
          speed={2}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

function NetworkLines() {
  const nodes = useMemo(() => [
    [-4, 2, -3], [4, -1, -4], [-3, -3, -5], [5, 3, -2], [0, 4, -6], [-6, 0, -3]
  ] as [number, number, number][], [])

  const linePairs = useMemo(() => {
    const pairs: [number, number][] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.4) pairs.push([i, j])
      }
    }
    return pairs
  }, [nodes])

  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.5} />
        </mesh>
      ))}
      {linePairs.map(([a, b], i) => {
        const start = new THREE.Vector3(...nodes[a])
        const end = new THREE.Vector3(...nodes[b])
        const dir = new THREE.Vector3().subVectors(end, start)
        const length = dir.length()
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
        const arrow = new THREE.ArrowHelper(dir.normalize(), start, length, 0)
        return (
          <mesh key={i} position={[mid.x, mid.y, mid.z]} quaternion={arrow.quaternion}>
            <cylinderGeometry args={[0.01, 0.01, length, 4]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} transparent opacity={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function ThreeScene() {
  return (
    <div className="canvas-wrapper">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#ec4899" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
        <ParticleField />
        <CentralOrb />
        <NetworkLines />
        <FloatingCrystal position={[-6, 3, -1]} color="#8b5cf6" scale={0.6} speed={0.8} />
        <FloatingCrystal position={[6, -2, -2]} color="#06b6d4" scale={0.5} speed={1.2} />
        <FloatingCrystal position={[-4, -3, 0]} color="#ec4899" scale={0.4} speed={1.5} />
        <FloatingCrystal position={[5, 4, -3]} color="#f59e0b" scale={0.35} speed={0.6} />
        <GlowRing position={[3, 0, -2]} color="#8b5cf6" rotation={[Math.PI / 4, 0, 0]} />
        <GlowRing position={[3, 0, -2]} color="#06b6d4" rotation={[0, Math.PI / 3, Math.PI / 4]} />
      </Canvas>
    </div>
  )
}
