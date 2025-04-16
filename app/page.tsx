"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ChevronDown,
  Menu,
  X,
  Calendar,
  Check,
  ArrowRight,
  Brain,
  LineChart,
  Users,
  Sparkles,
  Linkedin,
  Mail,
  Instagram,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"
import RSGLogo from "@/components/rsg-logo"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import EnhancedVacancyCalculator from "@/components/enhanced-vacancy-calculator"
import AITalentMatchingSection from "@/components/ai-talent-matching-section"
import ServiceCard from "@/components/service-card"
import TeamMember from "@/components/team-member"
import ContactForm from "@/components/contact-form"
import TestimonialCarousel from "@/components/testimonial-carousel"
// Add the import for MobileMenu
import MobileMenu from "@/components/mobile-menu"

export default function Home() {
  // Update the mobile menu state and toggle function
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { toast } = useToast()

  const heroRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
  const fixedPriceRef = useRef<HTMLDivElement>(null)
  const aiMatchingRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Check if ScrollTrigger is available
        if (!gsap.plugins || !gsap.plugins.ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger)
        }

        // Animate sections on scroll with null checks
        const sections = [calculatorRef, fixedPriceRef, aiMatchingRef, servicesRef, visionRef, teamRef, contactRef]

        sections.forEach((section) => {
          if (section && section.current) {
            try {
              gsap.fromTo(
                section.current,
                { opacity: 0, y: 100 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section.current,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1,
                  },
                },
              )
            } catch (sectionError) {
              console.error("Error animating section:", sectionError)
            }
          }
        })

        // Parallax effect for hero section with null check
        if (heroRef && heroRef.current) {
          try {
            gsap.to(heroRef.current, {
              backgroundPositionY: "30%",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            })
          } catch (heroError) {
            console.error("Error animating hero section:", heroError)
          }
        }
      } catch (error) {
        console.error("GSAP animation error:", error)
      }
    }
  }, [])

  // Testimony data
  const testimonials = [
    {
      quote:
        "Mit RSG haben wir innerhalb von nur 4 Wochen die perfekte Person für unsere schwer zu besetzende CTO-Position gefunden. Der Fixpreis war ein echter Gamechanger für unser Budget.",
      author: "Markus Wendt",
      company: "TechVision GmbH",
    },
    {
      quote:
        "Die KI-basierte Matching-Technologie von RSG hat Kandidaten identifiziert, die wir bei traditionellen Suchen übersehen hätten. Die kulturelle Passung war beeindruckend.",
      author: "Sarah Müller",
      company: "InnovateTech AG",
    },
    {
      quote:
        "Als Startup war Recruiting immer eine finanzielle Herausforderung. Das Fixpreis-Modell von RSG hat uns ermöglicht, hochqualifizierte Talente zu rekrutieren, ohne unser Budget zu sprengen.",
      author: "Thomas Berg",
      company: "NeuStart Solutions",
    },
  ]

  // Services data
  const services = [
    {
      title: "KI-Talentmatching",
      description:
        "Quantengestützter Algorithmus, der Kandidaten mit 99,8% Kompatibilität zu Positionen zuordnet - nicht nur nach Skills, sondern auch nach kultureller Passung.",
      icon: "Brain",
      link: "/bereiche/ai-jobs",
    },
    {
      title: "Engineering Experten",
      description:
        "Spezialisierte Vermittlung von Fachkräften im Ingenieurwesen und technischen Bereichen mit tiefem Branchenverständnis und technischem Know-how.",
      icon: "Settings",
      link: "/bereiche/engineering",
    },
    {
      title: "Finanztalente",
      description:
        "Präzise Vermittlung von Spezialisten im Finanz- und Bankensektor mit umfassender Erfahrung und branchenspezifischen Qualifikationen.",
      icon: "LineChart",
      link: "/bereiche/finance",
    },
    {
      title: "Projektmanagement",
      description:
        "Erfahrene Projektleiter und Manager für Ihre komplexen Vorhaben, die Projekte zielorientiert und effizient zum Erfolg führen.",
      icon: "Kanban",
      link: "/bereiche/projektmanagement",
    },
    {
      title: "IT-Spezialisten",
      description:
        "Hochqualifizierte Entwickler, Administratoren und IT-Architekten mit den neuesten Technologiekenntnissen und bewährten Praxiserfahrungen.",
      icon: "Code",
      link: "/bereiche/it",
    },
    {
      title: "Sales & Marketing",
      description:
        "Vertriebsexperten und Marketingprofis für Ihren Geschäftserfolg, die neue Märkte erschließen und Ihre Umsätze nachhaltig steigern.",
      icon: "TrendingUp",
      link: "/bereiche/sales-marketing",
    },
  ]

  // Values data
  const values = [
    {
      title: "Transparenz",
      description:
        "Klare Kommunikation, verständliche Prozesse und offenes Feedback bilden das Fundament unserer Arbeit und Kundenbeziehungen.",
      icon: <Sparkles className="h-10 w-10 text-cyan-400" />,
    },
    {
      title: "Innovation",
      description:
        "Durch den Einsatz neuester Technologien und KI revolutionieren wir die Personalvermittlung für bessere und schnellere Ergebnisse.",
      icon: <Brain className="h-10 w-10 text-cyan-400" />,
    },
    {
      title: "Fairness",
      description:
        "Unser Fixpreis-Modell garantiert faire Konditionen für alle - unabhängig von Position und Gehaltsniveau der Kandidaten.",
      icon: <LineChart className="h-10 w-10 text-cyan-400" />,
    },
    {
      title: "Menschlichkeit",
      description:
        "Trotz modernster Technologie steht bei uns stets der Mensch im Mittelpunkt - sowohl Kunden als auch Kandidaten.",
      icon: <Users className="h-10 w-10 text-cyan-400" />,
    },
  ]

  // Team data
  const team = [
    {
      name: "Constance Renz",
      role: "Geschäftsführerin",
      avatar: "/images/constance-renz.png",
      linkedinUrl: "https://www.linkedin.com/in/constance-renz-66626718b/",
      email: "c.renz@recruiting-sg.de",
    },
    {
      name: "Ricardo Serrano",
      role: "Geschäftsführer",
      avatar: "/images/ricardo-serrano.png",
      linkedinUrl: "https://www.linkedin.com/in/ricardo-jr-serrano-65388364/",
      email: "r.serrano@recruiting-sg.de",
    },
    {
      name: "Sarah",
      role: "Assistenz",
      avatar: "/images/sarah-ai.jpeg",
      isAI: true,
    },
    {
      name: "Julian",
      role: "Marketing SEO Analyst",
      avatar: "/images/julian-ai.png",
      isAI: true,
    },
    {
      name: "Julia",
      role: "Buchhaltung & Controlling",
      avatar: "/images/julia-ai.jpeg",
      isAI: true,
    },
    {
      name: "Marshall",
      role: "Sales & Business Development",
      avatar: "/images/marshall-ai.jpeg",
      isAI: true,
    },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Particle Background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="w-48 h-12 relative" aria-label="RSG Recruiting Solutions Group GmbH - Startseite">
            <RSGLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-8">
              {/* Dropdown for Customers */}
              <div className="relative group">
                <button className="text-white/80 hover:text-cyan-400 transition-colors duration-300 text-sm uppercase tracking-wider font-light flex items-center">
                  Für unsere Kunden
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2 bg-black/90 backdrop-blur-md border border-cyan-500/20 rounded-lg shadow-xl">
                    <a
                      href="#calculator"
                      className="block px-4 py-2 text-sm text-white/80 hover:text-cyan-400 hover:bg-white/5"
                    >
                      Vakanzkosten-Rechner
                    </a>
                    <a
                      href="#fixedprice"
                      className="block px-4 py-2 text-sm text-white/80 hover:text-cyan-400 hover:bg-white/5"
                    >
                      Fixpreis
                    </a>
                    <a
                      href="#services"
                      className="block px-4 py-2 text-sm text-white/80 hover:text-cyan-400 hover:bg-white/5"
                    >
                      Leistungen
                    </a>
                  </div>
                </div>
              </div>

              {/* Dropdown for Applicants */}
              <div className="relative group">
                <button className="text-white/80 hover:text-cyan-400 transition-colors duration-300 text-sm uppercase tracking-wider font-light flex items-center">
                  Für unsere Bewerber
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2 bg-black/90 backdrop-blur-md border border-cyan-500/20 rounded-lg shadow-xl">
                    <a
                      href="#ai-matching"
                      className="block px-4 py-2 text-sm text-white/80 hover:text-cyan-400 hover:bg-white/5"
                    >
                      KI-Matching
                    </a>
                    <Link
                      href="/stellenangebote"
                      className="block px-4 py-2 text-sm text-white/80 hover:text-cyan-400 hover:bg-white/5"
                    >
                      Stellenangebote
                    </Link>
                  </div>
                </div>
              </div>

              {/* Other main menu items */}
              <a
                href="#vision"
                className="text-white/80 hover:text-cyan-400 transition-colors duration-300 text-sm uppercase tracking-wider font-light relative group"
              >
                Vision
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#team"
                className="text-white/80 hover:text-cyan-400 transition-colors duration-300 text-sm uppercase tracking-wider font-light relative group"
              >
                Team
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-white/80 hover:text-cyan-400 transition-colors duration-300 text-sm uppercase tracking-wider font-light relative group"
              >
                Kontakt
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            {/* Add Termin Button to Header */}
            <Link href="https://meetings.hubspot.com/r-serrano" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <Calendar className="mr-2 h-4 w-4" />
                Termin vereinbaren
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link
              href="https://meetings.hubspot.com/r-serrano"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium">
                <Calendar className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border border-cyan-500/50 bg-transparent hover:bg-cyan-950/30 transition-all duration-300"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 text-white/80" /> : <Menu className="h-4 w-4 text-white/80" />}
            </Button>
          </div>
        </div>
      </header>
      {/* Add the MobileMenu component right after the header */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-70"></div>
        </div>

        {/* Update the hero section for better mobile responsiveness */}
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-text-shimmer px-2">
            Personalvermittlung zum Fixpreis | Headhunting & Recruiting
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12 font-light px-4">
            Professionelles Recruiting und Headhunting zum garantierten Festpreis von 9.999 € netto. Keine prozentualen
            Honorare mehr. Gleicher Preis für alle Positionen und Gehaltsstufen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <a href="#calculator" className="w-full sm:w-auto">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] w-full sm:w-auto">
                Sparpotential berechnen
              </Button>
            </a>
            <Link
              href="https://meetings.hubspot.com/r-serrano"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] w-full">
                <Calendar className="mr-2 h-5 w-5" />
                Jetzt Termin vereinbaren
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#calculator">
            <ChevronDown className="h-8 w-8 text-cyan-400/70" />
          </a>
        </div>
      </section>

      {/* Testimonials Section - Added right after hero */}
      <section className="relative py-16 bg-black/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Erfolgreiche Personalvermittlung: Das sagen unsere Kunden
          </h2>

          {/* Desktop view - 3 boxes side by side */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full flex flex-col">
                  <div className="mb-4 text-4xl text-cyan-400">"</div>
                  <p className="text-white/80 italic mb-6 flex-grow">{testimonial.quote}</p>
                  <div>
                    <p className="font-bold text-white">{testimonial.author}</p>
                    <p className="text-white/60 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile view - carousel */}
          <div className="md:hidden">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* Vacancy Calculator Section */}
      <section id="calculator" ref={calculatorRef} className="relative py-24 flex items-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Vakanzkosten berechnen: Was kosten unbesetzte Stellen Ihr Unternehmen?
          </h2>

          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-12 text-center">
            Berechnen Sie hier, wie viel Ihr Unternehmen durch offene Stellen verliert und wie viel Sie mit unserem
            Fixpreis-Recruiting-Modell sparen können. Die versteckten Kosten sind oft deutlich höher als die
            Personalvermittlungskosten.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
              <div className="relative bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-white/10">
                <EnhancedVacancyCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Price Section */}
      <section id="fixedprice" ref={fixedPriceRef} className="relative py-24 flex items-center bg-black/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Personalvermittlung zum Fixpreis statt 30% Gehalt für Recruiting
              </h2>

              <div className="space-y-6 text-white/80">
                <p className="text-xl">
                  Traditionelle Personalberater verlangen 25-35% des Jahresgehalts als Provision. Eine unnötig hohe
                  Belastung für Ihr Unternehmen.
                </p>

                <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-white">Beispielrechnung:</h4>
                    <span className="font-bold text-cyan-400">Sie sparen:</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Position mit 60.000€ Jahresgehalt</span>
                      <span className="font-bold text-green-400">8.000€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Position mit 90.000€ Jahresgehalt</span>
                      <span className="font-bold text-green-400">17.000€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Position mit 120.000€ Jahresgehalt</span>
                      <span className="font-bold text-green-400">26.000€</span>
                    </div>
                  </div>
                </div>

                {/* Improve the fixed price section button for better mobile display */}
                <div className="relative mt-8">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-40"></div>
                  <div className="relative bg-black/70 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                    <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                      Unser Angebot: 9.999 € netto. Punkt.
                    </h3>
                    <p className="mb-6">
                      Gleicher Preis für alle Positionen. Gleiche Premium-Qualität. Zahlen Sie nur für erfolgreiche
                      Vermittlungen.
                    </p>
                    <div className="flex justify-center w-full">
                      <Link
                        href="https://meetings.hubspot.com/r-serrano"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                      >
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-md px-6 py-4 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] w-full">
                          <Calendar className="mr-2 h-5 w-5" />
                          Unverbindlich beraten lassen
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white">Fixpreis-Garantie: Unsere Leistungen</h3>

              <div className="space-y-4">
                {[
                  "Umfassende Marktanalyse und Kandidatenidentifikation",
                  "Persönliche Vorauswahl durch erfahrene Recruiter",
                  "KI-gestützte Kompatibilitätsanalyse",
                  "Ausführliche Bewerberdossiers mit Kompetenzprofilen",
                  "Interview-Koordination und Begleitung",
                  "Vertragsverhandlungsunterstützung",
                  "6 Monate Nachbetreuung und Garantie",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <Check className="h-5 w-5 text-cyan-400" />
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg blur-lg opacity-30"></div>
                <div className="relative bg-black/70 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center">
                  <p className="text-lg font-medium text-white mb-2">Keine versteckten Kosten</p>
                  <p className="text-white/70 mb-4">2.500€ Anzahlung + 7.499€ bei erfolgreicher Vermittlung</p>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    = 9.999€ netto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Talent Matching Section */}
      <section id="ai-matching" ref={aiMatchingRef} className="relative py-24">
        <AITalentMatchingSection />
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="relative py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Spezialisierte Personalvermittlung für alle Branchen und Positionen
          </h2>

          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-16 text-center">
            Unsere Recruiting- und Headhunting-Lösungen decken alle Schlüsselbereiche moderner Unternehmen ab.
            Profitieren Sie von unserem tiefen Branchenverständnis und einem Netzwerk hochqualifizierter Fachkräfte.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Link href={service.link} key={index} className="h-full">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  delay={index * 0.1}
                />
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/stellenangebote">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center">
                Aktuelle Stellenangebote ansehen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section id="vision" ref={visionRef} className="relative py-24 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Unsere Vision: Recruiting und Headhunting neu definieren
              </h2>

              <div className="space-y-6 text-white/80">
                <p className="text-xl">
                  Wir glauben an ein Recruiting-Modell, das transparent, fair und zukunftsorientiert ist. Unsere Mission
                  ist es, die Personalvermittlung zu revolutionieren.
                </p>

                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
                  <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 text-white">Unsere Philosophie</h3>
                    <div className="space-y-4">
                      <p>
                        In einer Welt, in der Talent der entscheidende Wettbewerbsvorteil ist, muss der Zugang zu diesem
                        Talent fair, erschwinglich und effizient sein.
                      </p>
                      <p>
                        Durch die Kombination von menschlicher Expertise und fortschrittlicher KI-Technologie schaffen
                        wir eine Recruiting-Lösung, die perfekte Matches für beide Seiten ermöglicht - ohne überhöhte
                        Provisionen und versteckte Kosten.
                      </p>
                      <p>
                        Wir sind davon überzeugt, dass die Zukunft des Recruitings in transparenten, festen Preisen und
                        KI-gestützten Matchingprozessen liegt.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                  <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-white/70">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" ref={teamRef} className="relative py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Die Köpfe hinter RSG
          </h2>

          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-16 text-center">
            Lernen Sie das Team kennen, das die Vision der RSG Recruiting Solutions Group GmbH in die Tat umsetzt.
            Erfahrene Experten mit einem klaren Ziel: Recruiting für alle Beteiligten besser zu machen.
          </p>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  avatar={member.avatar}
                  linkedinUrl={member.linkedinUrl}
                  email={member.email}
                  delay={index * 0.2}
                  isAI={member.isAI}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="relative py-24 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Lassen Sie uns gemeinsam Ihre Recruiting-Herausforderungen lösen
              </h2>

              <div className="space-y-6 text-white/80">
                <p className="text-xl">
                  Ob Sie offene Stellen schnell besetzen möchten oder Fragen zu unserem Fixpreis-Modell haben – wir sind
                  für Sie da.
                </p>

                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
                  <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 text-white">Direkte Terminvereinbarung</h3>
                    <p className="mb-6">
                      Vereinbaren Sie einen unverbindlichen Beratungstermin. Wir nehmen uns Zeit für Ihre spezifischen
                      Anforderungen und zeigen Ihnen, wie wir Ihnen helfen können.
                    </p>
                    <Link href="https://meetings.hubspot.com/r-serrano" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-md px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] w-full">
                        <Calendar className="mr-2 h-5 w-5" />
                        Termin vereinbaren
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300">
                    <h4 className="text-lg font-medium text-white mb-2">Adresse</h4>
                    <p className="text-white/70">
                      RSG Recruiting Solutions Group GmbH
                      <br />
                      Am Heiligenhaus 9
                      <br />
                      65207 Wiesbaden
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-5 rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300">
                    <h4 className="text-lg font-medium text-white mb-2">Kontakt</h4>
                    <p className="text-white/70">
                      info@recruiting-sg.de
                      <br />
                      Tel: +49 176 60772556
                      <br />
                      Mo-Fr: 9:00 - 18:00 Uhr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="w-36 sm:w-48 h-12 mb-4">
                <RSGLogo />
              </div>
              <p className="text-white/60 text-sm">
                RSG Recruiting Solutions Group GmbH - Die Personalagentur der Zukunft.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Bereiche</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/bereiche/ai-jobs" className="text-white/60 hover:text-cyan-400 transition-colors">
                    KI-Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/bereiche/engineering" className="text-white/60 hover:text-cyan-400 transition-colors">
                    Engineering
                  </Link>
                </li>
                <li>
                  <Link href="/bereiche/finance" className="text-white/60 hover:text-cyan-400 transition-colors">
                    Finance
                  </Link>
                </li>
                <li>
                  <Link href="/bereiche/it" className="text-white/60 hover:text-cyan-400 transition-colors">
                    IT
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/stellenangebote" className="text-white/60 hover:text-cyan-400 transition-colors">
                    Stellenangebote
                  </Link>
                </li>
                <li>
                  <Link href="/karriere" className="text-white/60 hover:text-cyan-400 transition-colors">
                    Interne Karriere
                  </Link>
                </li>
                <li>
                  <Link href="/vakanzkosten-rechner" className="text-white/60 hover:text-cyan-400 transition-colors">
                    Vakanzkosten-Rechner
                  </Link>
                </li>
                <li>
                  <Link href="/ai-matching" className="text-white/60 hover:text-cyan-400 transition-colors">
                    KI-Matching
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/impressum" className="text-white/60 hover:text-cyan-400 transition-colors">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz" className="text-white/60 hover:text-cyan-400 transition-colors">
                    Datenschutz
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Unsere Marken</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.elumalab.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-cyan-400 transition-colors"
                  >
                    Elumalab
                  </a>
                </li>
                <li>
                  <span className="text-white/60">RSG AI Consulting</span>
                </li>
                <li>
                  <span className="text-white/60">Lacar eLearning</span>
                </li>
                <li>
                  <span className="text-white/60">RSG CONNECT</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 text-sm mb-4 md:mb-0 text-center md:text-left">
              © {new Date().getFullYear()} RSG Recruiting Solutions Group GmbH. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/105505351/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-cyan-400 transition-colors"
                aria-label="RSG auf LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/recruiting_solutions_group/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-cyan-400 transition-colors"
                aria-label="RSG auf Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@recruiting-sg.de"
                className="text-white/40 hover:text-cyan-400 transition-colors"
                aria-label="E-Mail an RSG"
                rel="noopener"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
