import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Orb() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const { x, y } = state.pointer
    g.rotation.y += 0.0024
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, y * 0.3, 0.04)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -x * 0.2, 0.04)
  })

  return (
    <group ref={group} position={[1.1, 0.1, 0]}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.3}>
        <Icosahedron args={[1.4, 8]}>
          <MeshDistortMaterial
            color="#7c5cff"
            emissive="#3a1f8f"
            emissiveIntensity={0.45}
            roughness={0.12}
            metalness={0.65}
            distort={0.35}
            speed={1.7}
          />
        </Icosahedron>
        {/* Cyan wireframe shell */}
        <Icosahedron args={[1.68, 1]}>
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
        </Icosahedron>
      </Float>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2.4} color="#a78bfa" />
      <pointLight position={[-5, -3, 2]} intensity={1.8} color="#22d3ee" />
      <Orb />
      <Sparkles count={60} scale={[11, 8, 6]} size={2.4} speed={0.3} color="#a78bfa" opacity={0.6} />
    </Canvas>
  )
}
