"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { ArrowLeft, Calculator, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ParticleBackground from "@/components/particle-background"
import VacancyCostCalculator from "@/components/vacancy-cost-calculator"

export default function VakanzkostenRechnerClient() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
  const fixedPriceRef = useRef<HTMLDivElement>(null)

  // Animationen
  useEffect(() => {
    if (titleRef.current && contentRef.current && calculatorRef.current && fixedPriceRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" },
      )

      gsap.fromTo(
        calculatorRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" },
      )

      gsap.fromTo(
        fixedPriceRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.8, ease: "elastic.out(1, 0.5)" },
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO Meta Tags */}

      {/* Particle Background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Link>

        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
        >
          Vakanzkosten-Rechner: Personalvermittlung zum Fixpreis statt teurer Provisionen
        </h1>

        <div ref={contentRef} className="text-center mb-12">
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Professionelles Headhunting und Recruiting zum garantierten Festpreis von 9.999 € netto pro Position. Keine
            versteckten Kosten, keine prozentualen Provisionen – sparen Sie bis zu 70% gegenüber traditionellen
            Personalberatern.
          </p>
        </div>

        <div ref={calculatorRef} className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
            <div className="relative bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Calculator className="mr-2 h-6 w-6 text-cyan-400" />
                  Vakanzkosten-Rechner
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full border-cyan-500/50 bg-transparent">
                        <Info className="h-4 w-4 text-cyan-400" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/80 border border-cyan-500/30 text-white p-4 max-w-xs">
                      <p>
                        Berechnen Sie die versteckten Kosten offener Stellen in Ihrem Unternehmen und entdecken Sie das
                        Einsparungspotenzial durch unseren Fixpreis-Service.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Neuer Vakanzkosten-Rechner */}
              <VacancyCostCalculator />
            </div>
          </div>
        </div>

        <div ref={fixedPriceRef} className="relative mt-16 max-w-4xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-40"></div>
          <div className="relative bg-black/70 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Unser Fixpreis-Angebot: 9.999 € netto pro Position
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Sparen Sie tausende Euro im Vergleich zu traditionellen Personalberatern, die 25-35% des Jahresgehalts
              verlangen. Bei uns zahlen Sie nur eine Anzahlung von 2.500€ und den Rest erst bei erfolgreicher Besetzung.
            </p>
            <Link href="https://meetings.hubspot.com/r-serrano" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                Jetzt Termin vereinbaren
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
