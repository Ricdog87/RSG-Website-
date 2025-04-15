"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Settings, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ParticleBackground from "@/components/particle-background"

export default function Engineering() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (titleRef.current && contentRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" },
      )
    }
  }, [])

  const engineeringRoles = [
    "Maschinenbauingenieur",
    "Elektroingenieur",
    "Verfahrenstechniker",
    "Bauingenieur",
    "Automatisierungstechniker",
    "Qualitätsingenieur",
    "Entwicklungsingenieur",
    "Projektingenieur",
    "Technischer Leiter",
    "Konstrukteur",
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Particle Background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
            >
              Engineering & Technische Berufe
            </h1>

            <div ref={contentRef} className="space-y-6 text-white/80">
              <p className="text-lg">
                Technische Innovation braucht die richtigen Köpfe. Wir verbinden führende Unternehmen mit den besten
                Ingenieuren und technischen Experten in allen Fachbereichen.
              </p>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
                <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <div className="flex items-start gap-4">
                    <Settings className="h-8 w-8 text-cyan-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Unsere Engineering-Expertise</h3>
                      <p>
                        Mit unserem tiefgreifenden Verständnis technischer Anforderungen und Branchenspezifika finden
                        wir die perfekte Übereinstimmung zwischen Ingenieuren und Unternehmen für langfristigen Erfolg.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Spezialisierte Vermittlung für:</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {engineeringRoles.map((role, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-cyan-500/50 transition-colors duration-300"
                  >
                    <p className="font-medium text-white">{role}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-md px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  Kontaktieren Sie uns
                </Button>
              </div>
            </div>
          </div>

          <div className="h-[500px] w-full relative">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <mesh>
                  <torusGeometry args={[2, 0.5, 16, 100]} />
                  <meshStandardMaterial color="#06b6d4" wireframe={true} emissive="#06b6d4" emissiveIntensity={0.5} />
                </mesh>
              </Float>
              <Environment preset="city" />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  )
}
