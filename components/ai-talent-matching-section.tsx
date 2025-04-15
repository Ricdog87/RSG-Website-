"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Calendar, Network, Upload, FileText, FileSearch, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Brain } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function AITalentMatchingSection() {
  const router = useRouter()
  const { toast } = useToast()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    try {
      setIsMounted(true)

      if (titleRef && titleRef.current) {
        gsap.fromTo(titleRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      }

      if (contentRef && contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" },
        )
      }

      // Add null check for statsRef.current and its children
      if (statsRef && statsRef.current && statsRef.current.children && statsRef.current.children.length > 0) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.5,
            ease: "back.out(1.7)",
          },
        )
      }
    } catch (error) {
      console.error("Error in AITalentMatchingSection animation:", error)
    }
  }, [])

  const handleUploadClick = () => {
    router.push("/ai-matching")
    toast({
      title: "KI-Analyse starten",
      description: "Sie werden zur Lebenslauf-Upload-Seite weitergeleitet.",
    })
  }

  return (
    <div className="relative py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
            >
              KI-gestützte Personalvermittlung
            </h2>

            <div ref={contentRef} className="space-y-6 text-white/80">
              <p className="text-lg">
                Unsere innovative KI-Plattform analysiert Kandidatenprofile und erstellt umfassende Kompetenzprofile,
                die individuelle Stärken und Schwerpunkte hervorheben. Erfahren Sie mehr über unsere KI-gestützte
                Personalvermittlung.
              </p>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
                <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <div className="flex items-start gap-4">
                    <Brain className="h-8 w-8 text-cyan-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Individuelles Karriere-Matching</h3>
                      <p>
                        Unser KI-System analysiert nicht nur technische Fähigkeiten, sondern auch Soft Skills,
                        Karriereziele und persönliche Präferenzen, um ein umfassendes Bild der beruflichen Stärken und
                        Entwicklungsmöglichkeiten zu erstellen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <Network className="h-6 w-6 text-cyan-400" />
                    <span className="text-2xl font-bold text-cyan-400">95%</span>
                  </div>
                  <h4 className="text-lg font-medium text-white mt-2">Zufriedenheitsrate</h4>
                  <p className="text-white/70 text-sm mt-1">
                    Kandidaten bestätigen die Genauigkeit ihrer Kompetenzanalyse
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <Network className="h-6 w-6 text-cyan-400" />
                    <span className="text-2xl font-bold text-cyan-400">82%</span>
                  </div>
                  <h4 className="text-lg font-medium text-white mt-2">Karriere-Entwicklung</h4>
                  <p className="text-white/70 text-sm mt-1">Unserer Kandidaten finden eine besser passende Position</p>
                </div>
              </div>

              <div className="pt-4">
                <Link href="https://meetings.hubspot.com/r-serrano" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-md px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    <Calendar className="mr-2 h-5 w-5" />
                    Beratungstermin vereinbaren
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-20"></div>
            <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">KI-Lebenslauf-Analyse starten</h3>
                <p className="text-white/70 mb-4">
                  Laden Sie Ihren Lebenslauf hoch und erhalten Sie eine KI-gestützte Analyse Ihrer Fähigkeiten und
                  passende Karriereempfehlungen.
                </p>

                <div
                  onClick={handleUploadClick}
                  className="border-2 border-dashed border-white/30 rounded-lg p-8 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer bg-white/5 mb-6 relative group"
                  role="button"
                  tabIndex={0}
                  aria-label="Lebenslauf hochladen"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2 group-hover:bg-cyan-500/20 transition-all duration-300">
                      <Upload className="h-8 w-8 text-cyan-400" />
                    </div>
                    <p className="text-white font-medium">Lebenslauf hier ablegen oder klicken</p>
                    <p className="text-white/60 text-sm">PDF, Word oder Text-Dateien bis 10 MB</p>
                  </div>

                  {/* Added visual indicator that this is clickable */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-cyan-500/20 rounded-full p-2">
                      <ArrowRight className="h-4 w-4 text-cyan-400" />
                    </div>
                  </div>
                </div>

                <Link href="/ai-matching">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-md px-8 py-4 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    <FileText className="mr-2 h-5 w-5" />
                    KI-Analyse starten
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                    <FileSearch className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h4 className="text-white font-medium mb-1">CV-Analyse</h4>
                  <p className="text-white/60 text-sm">KI-gestützte Analyse Ihrer Fähigkeiten und Erfahrungen</p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                    <Brain className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h4 className="text-white font-medium mb-1">Persönlichkeitstest</h4>
                  <p className="text-white/60 text-sm">Gezielte Fragen zur Analyse Ihrer Stärken</p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h4 className="text-white font-medium mb-1">Job-Matching</h4>
                  <p className="text-white/60 text-sm">Passende Stellenangebote basierend auf Ihrem Profil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
