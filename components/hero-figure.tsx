"use client"

import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei"
import * as THREE from "three"

import { cn } from "@/lib/utils"

function OrbitingSatellite({
  radius,
  speed,
  offset,
  color,
}: {
  radius: number
  speed: number
  offset: number
  color: string
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    ref.current?.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.6) * radius * 0.35,
      Math.sin(t) * radius
    )
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.1} />
    </mesh>
  )
}

function AiCharacter({ accent }: { accent: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const shellRef = useRef<THREE.Mesh>(null)
  const coreMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(accent), [accent])

  useFrame(({ pointer }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.7,
        0.06
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.45,
        0.06
      )
    }
    if (shellRef.current) {
      shellRef.current.rotation.y += 0.0016
      shellRef.current.rotation.x += 0.0009
    }
    coreMaterialRef.current?.emissive.lerp(targetColor, 0.04)
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
        <mesh>
          <icosahedronGeometry args={[1.3, 12]} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <MeshDistortMaterial
            ref={coreMaterialRef as any}
            color="#1d4ed8"
            emissive="#1e3a8a"
            emissiveIntensity={0.5}
            distort={0.35}
            speed={1.8}
            roughness={0.15}
            metalness={0.75}
          />
        </mesh>
      </Float>

      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.95, 1]} />
        <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.25} />
      </mesh>

      <OrbitingSatellite radius={2.5} speed={0.55} offset={0} color="#38bdf8" />
      <OrbitingSatellite radius={2.8} speed={-0.4} offset={2.1} color="#2563eb" />
      <OrbitingSatellite radius={2.3} speed={0.48} offset={4.2} color="#0ea5e9" />
    </group>
  )
}

export function HeroFigure({
  className,
  eventSource,
  accent = "#1d4ed8",
}: {
  className?: string
  eventSource?: React.RefObject<HTMLElement | null>
  accent?: string
}) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        eventSource={eventSource as React.RefObject<HTMLElement> | undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 3, 4]} intensity={1.5} color="#60a5fa" />
        <pointLight position={[-4, -2, -3]} intensity={0.6} color="#38bdf8" />
        <Suspense fallback={null}>
          <AiCharacter accent={accent} />
          <Sparkles count={50} scale={5} size={2.2} speed={0.25} color="#93c5fd" />
        </Suspense>
      </Canvas>
    </div>
  )
}
