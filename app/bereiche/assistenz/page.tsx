"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { ArrowLeft, Calendar, UserCheck, ClipboardList, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ParticleBackground from "@/components/particle-background"

export default function Assistenz() {
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

  const assistenzRoles = [
    "Executive Assistant",
    "Management Assistant",
    "Team Assistant",
    "Office Manager",
    "Direktionsassistenz",
    "Vorstandsassistenz",
    "Projektassistenz",
    "Vertriebsassistenz",
    "Empfangsmitarbeiter",
    "Büroorganisation",
  ]

  const assistenzServices = [
    {
      icon: <UserCheck className="h-8 w-8 text-cyan-400" />,
      title: "Executive Assistant Vermittlung",
      description:
        "Maßgeschneiderte Vermittlung von hochqualifizierten Assistenzkräften für Führungskräfte und Management.",
    },
    {
      icon: <ClipboardList className="h-8 w-8 text-cyan-400" />,
      title: "Office Management",
      description: "Vermittlung von erfahrenen Office Managern für die effiziente Organisation Ihres Bürobetriebs.",
    },
    {
      icon: <Clock className="h-8 w-8 text-cyan-400" />,
      title: "Temporäre Unterstützung",
      description: "Flexible Vermittlung von Assistenzkräften für zeitlich begrenzte Projekte oder Vertretungen.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-cyan-400" />,
      title: "Mehrsprachige Assistenz",
      description:
        "Vermittlung von mehrsprachigen Assistenzkräften für internationale Unternehmen und globale Kommunikation.",
    },
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
              Assistenz & Support
            </h1>

            <div ref={contentRef} className="space-y-6 text-white/80">
              <p className="text-lg">
                Exzellente Assistenz ist das Rückgrat erfolgreicher Unternehmen. Wir verbinden Organisationen mit den
                besten Assistenzkräften, die durch ihre Kompetenz und Effizienz zum Unternehmenserfolg beitragen.
              </p>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
                <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <div className="flex items-start gap-4">
                    <UserCheck className="h-8 w-8 text-cyan-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Unser Assistenz-Matching</h3>
                      <p>
                        Wir analysieren nicht nur fachliche Qualifikationen, sondern auch Soft Skills,
                        Persönlichkeitsmerkmale und kulturelle Passung, um die ideale Übereinstimmung zwischen
                        Assistenzkräften und Unternehmensanforderungen zu gewährleisten.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {assistenzServices.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 hover:border-cyan-500/50 transition-colors duration-300"
                  >
                    <div className="mb-3">{service.icon}</div>
                    <h3 className="text-lg font-semibold mb-2 text-white">{service.title}</h3>
                    <p className="text-white/70 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Spezialisierte Vermittlung für:</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {assistenzRoles.map((role, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-cyan-500/50 transition-colors duration-300"
                  >
                    <p className="font-medium text-white">{role}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="https://meetings.hubspot.com/r-serrano" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-md px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    <Calendar className="mr-2 h-5 w-5" />
                    Beratungstermin vereinbaren
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="h-[500px] w-full relative">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <mesh>
                  <tetrahedronGeometry args={[2, 0]} />
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
