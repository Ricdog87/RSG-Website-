"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Zap, RefreshCw, Users, Database } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Automatisierte Workflows",
    description: "Verbinden Sie Ihre Recruiting-Tools und automatisieren Sie komplexe Prozesse ohne Programmierung.",
  },
  {
    icon: RefreshCw,
    title: "Nahtlose Integration",
    description: "Integrieren Sie alle Ihre bestehenden HR-Tools und -Plattformen in einem zentralen System.",
  },
  {
    icon: Users,
    title: "Kandidaten-Engagement",
    description: "Personalisierte Kommunikation und Follow-ups mit Kandidaten zu jedem Zeitpunkt des Prozesses.",
  },
  {
    icon: Database,
    title: "Datengesteuerte Entscheidungen",
    description: "Umfassende Analysen und Berichte für bessere Recruiting-Entscheidungen.",
  },
]

export function ConnectRecruit() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section
      id="connect-recruit"
      ref={ref}
      className="relative w-full bg-gradient-to-b from-background/95 to-background py-24"
    >
      <div className="absolute inset-0 bg-grid-small-white/[0.05] bg-[size:30px_30px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  Connect Recruit AI Flow
                </span>
              </h2>
              <p className="mt-4 text-xl text-muted-foreground font-heading">
                Automatisierte Recruiting-Workflows für Ihr Unternehmen
              </p>
            </div>

            <p className="text-muted-foreground font-heading">
              Connect Recruit AI Flow ist unsere leistungsstarke No-Code-Plattform, die es Ihnen ermöglicht, komplexe
              Recruiting-Workflows zu automatisieren und alle Ihre HR-Tools nahtlos zu integrieren. Sparen Sie wertvolle
              Zeit, eliminieren Sie manuelle Aufgaben und optimieren Sie Ihren gesamten Recruiting-Prozess mit
              intelligenten, KI-gesteuerten Workflows.
            </p>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border/50 bg-background/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold font-heading">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-heading">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild className="bg-primary text-primary-foreground font-heading">
                <Link href="https://meetings.hubspot.com/r-serrano?fbclid=PAZXh0bgNhZW0CMTEAAacAOPTJDVLlkGfZn7n56wzwYRLLQrzGIhvbqd-Mdz9x9oGykWK8Wdl87pKn0A_aem_xvZOqx4KCtD0hKmtyl33RQ&uuid=f86f149b-96d2-4afe-a5d1-fd955cb14ca5">
                  Demo anfragen
                </Link>
              </Button>
              <Button asChild variant="outline" className="font-heading">
                <Link href="#">
                  Mehr über Connect Recruit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Image added below the buttons */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border/50 shadow-xl mt-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bildschirmfoto%202025-04-08%20um%2018.45.44-1lSWLdfTSnuily4UWKUvmwHPDttzc2.png"
                alt="Connect Recruit AI Flow Dashboard mit Kandidaten-Pipeline und Projektübersicht"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            {/* This div is intentionally left empty as requested */}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
