"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { ArrowLeft, Calendar, Users, Rocket, Heart, Zap, Globe, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"
import Head from "next/head"
import OptimizedImage from "@/components/optimized-image"

export default function Karriere() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (titleRef.current && contentRef.current && benefitsRef.current && processRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" },
      )

      gsap.fromTo(
        benefitsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        processRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  const benefits = [
    {
      icon: <Rocket className="h-8 w-8 text-cyan-400" />,
      title: "Innovative Arbeitsumgebung",
      description:
        "Arbeiten Sie mit modernsten Technologien und gestalten Sie die Zukunft der Personalvermittlung aktiv mit.",
    },
    {
      icon: <Users className="h-8 w-8 text-cyan-400" />,
      title: "Starkes Team",
      description:
        "Werden Sie Teil eines dynamischen Teams aus Experten, die gemeinsam Großes erreichen und voneinander lernen.",
    },
    {
      icon: <Globe className="h-8 w-8 text-cyan-400" />,
      title: "Flexible Arbeitsmodelle",
      description:
        "Profitieren Sie von flexiblen Arbeitszeiten, Remote-Optionen und einer ausgewogenen Work-Life-Balance.",
    },
    {
      icon: <Zap className="h-8 w-8 text-cyan-400" />,
      title: "Persönliche Entwicklung",
      description:
        "Kontinuierliche Weiterbildungsmöglichkeiten und individuelle Karrierepfade für Ihre berufliche Entwicklung.",
    },
    {
      icon: <Heart className="h-8 w-8 text-cyan-400" />,
      title: "Attraktive Benefits",
      description: "Genießen Sie Vorteile wie Gesundheitsprogramme, Teamevents, Firmenfitness und moderne Büroräume.",
    },
    {
      icon: <Award className="h-8 w-8 text-cyan-400" />,
      title: "Wertschätzungskultur",
      description: "Eine Unternehmenskultur, die auf gegenseitigem Respekt, Anerkennung und Wertschätzung basiert.",
    },
  ]

  const openPositions = [
    {
      title: "Recruiting Consultant",
      department: "Recruiting",
      location: "Berlin",
    },
    {
      title: "Business Development Manager",
      department: "Vertrieb",
      location: "München",
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO Meta Tags */}
      <Head>
        <title>Karriere bei RSG | Jobs im Recruiting und Personalwesen</title>
        <meta
          name="description"
          content="Entdecken Sie spannende Karrieremöglichkeiten bei der RSG Recruiting Solutions Group. Werden Sie Teil unseres innovativen Teams und gestalten Sie die Zukunft der Personalvermittlung mit."
        />
        <meta
          name="keywords"
          content="Karriere, Jobs, Recruiting, Personalvermittlung, Stellenangebote, Bewerbung, Arbeitgeber, Headhunting"
        />
      </Head>

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
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
        >
          Karriere bei RSG Recruiting Solutions Group
        </h1>

        <div ref={contentRef} className="space-y-16">
          {/* Intro Section - Optimierter Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Gestalten Sie mit uns die Zukunft der Personalvermittlung und des Recruitings
              </h2>
              <p className="text-white/80 text-lg">
                Bei der RSG Recruiting Solutions Group GmbH bieten wir mehr als nur einen Job. Wir bieten die
                Möglichkeit, Teil einer Revolution in der Personalvermittlung zu sein. Mit innovativen KI-Technologien
                und einem zukunftsorientierten Fixpreis-Modell verbinden wir Talente mit Unternehmen auf eine völlig
                neue Art und Weise.
              </p>
              <p className="text-white/80 text-lg">
                Wenn Sie nach einer Karriere im Recruiting und Personalwesen suchen, die herausfordernd, erfüllend und
                zukunftssicher ist, dann sind Sie bei uns genau richtig. Entdecken Sie die Möglichkeiten, die RSG Ihnen
                bietet.
              </p>
              <div className="pt-4">
                <Link href="#open-positions">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-md px-8 py-4 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Offene Stellen entdecken
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
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

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
              <div className="relative h-[300px] sm:h-[400px] w-full rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/workspace.webp"
                  alt="RSG Recruiting Solutions Group Arbeitsumgebung - Modernes Büro für Personalvermittlung"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <p className="text-lg sm:text-xl font-bold text-white">Werden Sie Teil unseres Teams</p>
                  <p className="text-sm sm:text-base text-white/80">
                    Gemeinsam gestalten wir die Zukunft der Personalvermittlung
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Warum Sie bei uns arbeiten sollten
            </h2>
            <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                  <div className="relative bg-black/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 h-full">
                    <div className="mb-3 sm:mb-4">{benefit.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Unser Bewerbungsprozess</h2>
            <div ref={processRef} className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Bewerbung einreichen",
                  description:
                    "Senden Sie uns Ihre Bewerbungsunterlagen mit Lebenslauf und Anschreiben. Wir prüfen Ihre Qualifikationen und melden uns innerhalb weniger Tage bei Ihnen.",
                },
                {
                  step: "2",
                  title: "Erstes Kennenlernen",
                  description:
                    "In einem ersten Gespräch (telefonisch oder per Video) lernen wir uns gegenseitig kennen und besprechen Ihre Erfahrungen und Erwartungen.",
                },
                {
                  step: "3",
                  title: "Fachliches Interview",
                  description:
                    "Im nächsten Schritt führen wir ein tiefergehendes Gespräch zu Ihren fachlichen Qualifikationen und stellen Ihnen unser Team vor.",
                },
                {
                  step: "4",
                  title: "Abschlussgespräch",
                  description:
                    "Im finalen Gespräch besprechen wir Details wie Vergütung, Arbeitszeiten und Ihren möglichen Starttermin.",
                },
                {
                  step: "5",
                  title: "Willkommen im Team",
                  description:
                    "Nach erfolgreicher Einigung heißen wir Sie herzlich in unserem Team willkommen und starten gemeinsam durch!",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
                  <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10 flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div id="open-positions">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Aktuelle Stellenangebote bei RSG
            </h2>
            {openPositions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {openPositions.map((position, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                    <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full flex flex-col">
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {position.title}
                      </h3>
                      <p className="text-white/70 mb-1">Abteilung: {position.department}</p>
                      <p className="text-white/70 mb-4">Standort: {position.location}</p>
                      <div className="mt-auto pt-4">
                        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                          Details & Bewerbung
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <p className="text-xl font-medium text-white mb-2">Aktuell keine offenen Stellen</p>
                <p className="text-white/70 max-w-lg mx-auto mb-6">
                  Derzeit haben wir keine offenen Positionen. Senden Sie uns gerne eine Initiativbewerbung, wenn Sie
                  Teil unseres Teams werden möchten.
                </p>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                  Initiativbewerbung senden
                </Button>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
              <div className="relative bg-black/60 backdrop-blur-sm p-8 md:p-12 rounded-lg border border-white/10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Bereit, Ihre Karriere auf die nächste Stufe zu heben?
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Vereinbaren Sie ein unverbindliches Gespräch mit unserem Recruiting-Team und erfahren Sie mehr über
                  die Karrieremöglichkeiten bei RSG.
                </p>
                <Link href="https://meetings.hubspot.com/r-serrano" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Calendar className="mr-2 h-5 w-5" />
                    Gesprächstermin vereinbaren
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
