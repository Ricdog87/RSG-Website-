"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ElumalabFeatures } from "@/components/elumalab-features"

// Aktualisierte Features-Liste basierend auf den neuen Informationen
const features = [
  "Einheitlicher Posteingang für WhatsApp, Instagram, Facebook und mehr",
  "Team-Kollaboration mit Konversationszuweisung und internen Notizen",
  "Detaillierte Analysen und Statistiken für bessere Kommunikationsstrategien",
  "KI-gestützte Automatisierungen und Chatbots",
  "Multi-Kanal-Support mit nahtloser Integration",
  "Mobile App für iOS und Android",
]

export function Elumalab() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
      id="elumalab"
      ref={ref}
      className="relative w-full bg-gradient-to-b from-background to-background/95 py-24"
    >
      <div className="absolute inset-0 bg-grid-small-white/[0.05] bg-[size:30px_30px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative"
      >
        <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  Elumalab
                </span>
              </h2>
              <p className="mt-4 text-xl text-muted-foreground font-heading">Die All-in-One Kommunikationsplattform</p>
            </div>

            <p className="text-muted-foreground font-heading">
              Elumalab ist eine innovative Kommunikationsplattform, die alle deine Kundennachrichten an einem Ort
              vereint. Verwalte Nachrichten von WhatsApp, Instagram, Facebook und mehr in einem einheitlichen
              Posteingang. Mit intelligenten Automatisierungen, Team-Kollaborationsfunktionen und umfassenden Analysen
              optimierst du deine Kundenkommunikation und steigerst die Effizienz deines Teams.
            </p>

            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="font-heading">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold font-heading">Alle Features im Detail</h3>
              <ElumalabFeatures />
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild className="bg-primary text-primary-foreground font-heading w-full sm:w-auto">
                <Link href="https://meetings.hubspot.com/r-serrano?fbclid=PAZXh0bgNhZW0CMTEAAacAOPTJDVLlkGfZn7n56wzwYRLLQrzGIhvbqd-Mdz9x9oGykWK8Wdl87pKn0A_aem_xvZOqx4KCtD0hKmtyl33RQ&uuid=f86f149b-96d2-4afe-a5d1-fd955cb14ca5">
                  Demo anfragen
                </Link>
              </Button>
              <Button asChild variant="outline" className="font-heading w-full sm:w-auto">
                <Link href="https://app.elumalab.com/" target="_blank">
                  Mehr über Elumalab
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border/50 shadow-xl">
              <Image src="/images/elumalab-dashboard.png" alt="Elumalab Dashboard" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
