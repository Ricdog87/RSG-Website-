"use client"

import { useRef } from "react"
import { useThree, Canvas } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"
import { useFrame } from "@react-three/fiber"

function ParticleField() {
  const { size, viewport } = useThree()
  const ref = useRef<THREE.Points>(null!)

  // Generate random particles
  const count = 2000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10

    // Colors: cyan to purple gradient
    const t = Math.random()
    colors[i3] = 0.06 + t * 0.3 // R: 0.06-0.36 (cyan to purple)
    colors[i3 + 1] = 0.7 - t * 0.4 // G: 0.7-0.3 (cyan to purple)
    colors[i3 + 2] = 0.8 + t * 0.2 // B: 0.8-1.0 (cyan to purple)
  }

  useFrame((state) => {
    if (!ref || !ref.current) return

    try {
      const time = state.clock.getElapsedTime() * 0.1

      // Check if geometry and attributes exist
      if (ref.current.geometry && ref.current.geometry.attributes && ref.current.geometry.attributes.position) {
        const positionArray = ref.current.geometry.attributes.position.array

        // Ensure array exists and has expected length
        if (positionArray && positionArray.length >= count * 3) {
          // Subtle movement of particles
          for (let i = 0; i < count; i++) {
            const i3 = i * 3
            if (i3 + 2 < positionArray.length) {
              const x = positions[i3]
              const y = positions[i3 + 1]
              const z = positions[i3 + 2]

              // Apply sine wave movement
              positionArray[i3] = x + Math.sin(time + x) * 0.01
              positionArray[i3 + 1] = y + Math.cos(time + y) * 0.01
              positionArray[i3 + 2] = z + Math.sin(time + z) * 0.01
            }
          }

          ref.current.geometry.attributes.position.needsUpdate = true
        }
      }
    } catch (error) {
      console.error("Error in particle animation:", error)
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial vertexColors size={0.05} sizeAttenuation={true} transparent depthWrite={false} />
    </Points>
  )
}

export default function ParticleBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ParticleField />
    </Canvas>
  )
}
