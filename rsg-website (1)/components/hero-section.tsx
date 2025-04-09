"use client"

import type React from "react"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { AnimatedGradient } from "@/components/animated-gradient"
import { AnimatedLion } from "@/components/animated-lion"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Funktion zum Scrollen zu einem Abschnitt
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div ref={ref} className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Background Lion Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatedLion />
        <AnimatedGradient />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 flex flex-col items-center justify-center space-y-10 text-center px-4 sm:px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          <span className="block">KI-Lösungen für die</span>
          <span className="relative mt-2 block">
            <span className="relative inline-block">
              <span className="relative z-10">Zukunft Ihres Unternehmens</span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary/70 to-primary-foreground/70 blur-2xl" />
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl lg:text-2xl"
        >
          Wir entwickeln maßgeschneiderte KI-Lösungen für Marketing, Vertrieb und Recruiting, die Ihr Unternehmen auf
          die nächste Stufe heben.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Button asChild size="lg" className="bg-primary text-primary-foreground">
            <Link href="https://meetings.hubspot.com/r-serrano?fbclid=PAZXh0bgNhZW0CMTEAAacAOPTJDVLlkGfZn7n56wzwYRLLQrzGIhvbqd-Mdz9x9oGykWK8Wdl87pKn0A_aem_xvZOqx4KCtD0hKmtyl33RQ&uuid=f86f149b-96d2-4afe-a5d1-fd955cb14ca5">
              Beratung anfragen
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" onClick={(e) => scrollToSection(e, "services")}>
            <Link href="#services">Unsere Leistungen</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-muted-foreground"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </div>
  )
}
