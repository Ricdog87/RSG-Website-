"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Environment } from "@react-three/drei"
import * as THREE from "three"
import React from "react"

// Add this ErrorBoundary component at the top of the file:

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in 3D visualization:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

// Neural node component
const NeuralNode = ({ position, color, pulsing = false, size = 0.15, label = "" }) => {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [pulsePhase] = useState(Math.random() * Math.PI * 2)

  useFrame((state) => {
    if (!meshRef.current) return

    try {
      if (pulsing) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + pulsePhase) * 0.1)
      }

      if (hovered && meshRef.current.material) {
        meshRef.current.material.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 5) * 0.5
      }
    } catch (error) {
      console.error("Error in NeuralNode animation:", error)
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
      {label && (
        <Text
          position={[0, size + 0.1, 0]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.005}
          outlineColor="#000000"
        >
          {label}
        </Text>
      )}
    </group>
  )
}

// Neural connection component
const NeuralConnection = ({ start, end, color, width = 0.02, pulse = false }) => {
  const ref = useRef(null)

  // Create a custom geometry for the connection
  const geometry = useMemo(() => {
    if (!start || !end) return new THREE.CylinderGeometry(width, width, 0.1, 8, 1)

    // Direction vector
    const direction = new THREE.Vector3().subVectors(end, start)
    const length = direction.length()

    // Create a cylinder geometry
    const geometry = new THREE.CylinderGeometry(width, width, length, 8, 1)

    // Rotate and position the geometry
    geometry.translate(0, length / 2, 0)
    geometry.rotateX(Math.PI / 2)

    return geometry
  }, [start, end, width])

  // Point the cylinder from start to end
  const quaternion = useMemo(() => {
    if (!start || !end) return new THREE.Quaternion()

    const direction = new THREE.Vector3().subVectors(end, start).normalize()
    const quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction)
    return quaternion
  }, [start, end])

  useFrame((state) => {
    if (!ref.current || !pulse) return

    try {
      const phase = (state.clock.elapsedTime * 0.5) % 1
      if (ref.current.material) {
        ref.current.material.opacity = phase < 0.5 ? phase * 2 : (1 - phase) * 2
      }
    } catch (error) {
      console.error("Error in NeuralConnection animation:", error)
    }
  })

  if (!start || !end) return null

  return (
    <mesh ref={ref} position={start} geometry={geometry} quaternion={quaternion}>
      <meshStandardMaterial color={color} transparent={true} opacity={0.6} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  )
}

// Main neural network component
const NeuralNetwork = () => {
  // Create nodes for input layer (skills), hidden layer, and output layer (positions)
  const skills = useMemo(() => ["KI Kenntnisse", "Leadership", "Frontend", "Backend", "DevOps", "Kommunikation"], [])
  const positions = useMemo(() => ["CTO", "Developer", "AI Engineer", "Project Manager"], [])

  const inputNodes = useMemo(
    () =>
      skills.map((skill, i) => ({
        position: new THREE.Vector3(-3, (i - skills.length / 2 + 0.5) * 0.8, 0),
        color: new THREE.Color(0x06b6d4), // cyan
        label: skill,
      })),
    [skills],
  )

  const hiddenNodes = useMemo(
    () =>
      Array(8)
        .fill(0)
        .map((_, i) => ({
          position: new THREE.Vector3(0, (i - 4 + 0.5) * 0.8, 0),
          color: new THREE.Color(0x7c3aed), // purple
          pulsing: true,
        })),
    [],
  )

  const outputNodes = useMemo(
    () =>
      positions.map((position, i) => ({
        position: new THREE.Vector3(3, (i - positions.length / 2 + 0.5) * 0.8, 0),
        color: new THREE.Color(0xa855f7), // pink
        label: position,
      })),
    [positions],
  )

  // Create connections between layers
  const connections = useMemo(() => {
    try {
      const conns = []

      // Connect input to hidden
      inputNodes.forEach((input) => {
        if (input && input.position) {
          hiddenNodes.forEach((hidden, i) => {
            if (hidden && hidden.position && i % 2 === 0) {
              // Reduce number of connections for better performance
              conns.push({
                start: input.position,
                end: hidden.position,
                color: new THREE.Color(0x06b6d4),
              })
            }
          })
        }
      })

      // Connect hidden to output
      hiddenNodes.forEach((hidden) => {
        if (hidden && hidden.position) {
          outputNodes.forEach((output, i) => {
            if (output && output.position && i % 2 === 0) {
              // Reduce number of connections for better performance
              conns.push({
                start: hidden.position,
                end: output.position,
                color: new THREE.Color(0x7c3aed),
              })
            }
          })
        }
      })

      return conns
    } catch (error) {
      console.error("Error creating neural connections:", error)
      return []
    }
  }, [inputNodes, hiddenNodes, outputNodes])

  return (
    <>
      {/* Render all nodes with error handling */}
      {inputNodes && inputNodes.map((node, i) => node && <NeuralNode key={`input-${i}`} {...node} />)}
      {hiddenNodes && hiddenNodes.map((node, i) => node && <NeuralNode key={`hidden-${i}`} {...node} />)}
      {outputNodes && outputNodes.map((node, i) => node && <NeuralNode key={`output-${i}`} {...node} />)}

      {/* Render all connections with error handling */}
      {connections && connections.map((conn, i) => conn && <NeuralConnection key={`conn-${i}`} {...conn} />)}
    </>
  )
}

// Information panel overlay
const InfoPanel = () => {
  const [infoVisible, setInfoVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setInfoVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`absolute top-4 left-4 right-4 bg-black/70 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30 transition-opacity duration-500 ${infoVisible ? "opacity-100" : "opacity-0"}`}
    >
      <h3 className="text-cyan-400 text-lg font-medium mb-1">KI-gestützte Talentanalyse</h3>
      <p className="text-white/90 text-sm">
        Unser neuronales Netzwerk analysiert Kandidatenfähigkeiten und verbindet sie mit passenden Positionen.
      </p>
    </div>
  )
}

// Main export component with client-side rendering safeguards
export default function NeuralNetworkVisualization() {
  const [isMounted, setIsMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    try {
      setIsMounted(true)
    } catch (error) {
      console.error("Error mounting NeuralNetworkVisualization:", error)
      setHasError(true)
    }
  }, [])

  if (hasError) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-black/50 rounded-lg">
        <div className="text-red-400">Fehler beim Laden der Visualisierung</div>
      </div>
    )
  }

  if (!isMounted) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-black/50 rounded-lg">
        <div className="text-cyan-400">Lade KI-Visualisierung...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-[600px] relative">
      <ErrorBoundary
        fallback={
          <div className="w-full h-[600px] flex items-center justify-center bg-black/50 rounded-lg">
            <div className="text-red-400">Fehler in der 3D-Visualisierung</div>
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <NeuralNetwork />
          <OrbitControls
            enableZoom={true}
            minDistance={4}
            maxDistance={10}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
          <Environment preset="city" />
        </Canvas>
      </ErrorBoundary>

      <InfoPanel />

      {/* Control legend */}
      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/30">
        <p className="text-white/80 text-xs">Drehen: Klicken + Ziehen</p>
        <p className="text-white/80 text-xs">Zoomen: Scrollrad</p>
      </div>

      {/* Title */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-purple-600 p-[1px] rounded-lg">
        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold">
            RSG AI Matching System
          </p>
        </div>
      </div>
    </div>
  )
}
