"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Aktualisiere die Bildpfade im blogPosts-Array
const blogPosts = [
  {
    title: "Die Zukunft der KI im Recruiting",
    description:
      "Wie künstliche Intelligenz den Rekrutierungsprozess revolutioniert und welche Vorteile sich daraus ergeben.",
    date: "15. März 2023",
    image: "/images/blog-ai-trends.png",
    url: "/blog/ki-im-recruiting",
  },
  {
    title: "Effektive Kundenkommunikation mit Elumalab",
    description: "Wie Sie mit einer zentralen Kommunikationsplattform Ihre Kundenbeziehungen verbessern können.",
    date: "22. April 2023",
    image: "/images/blog-communication.png",
    url: "/blog/kundenkommunikation",
  },
  {
    title: "Automatisierte Workflows für mehr Effizienz",
    description: "Wie Sie mit automatisierten Workflows Zeit sparen und Ihre Produktivität steigern können.",
    date: "10. Mai 2023",
    image: "/images/blog-automation.png",
    url: "/blog/automatisierte-workflows",
  },
]

export function BlogPreview() {
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
    <section id="blog" ref={ref} className="relative w-full bg-gradient-to-b from-background/95 to-background py-24">
      <div className="absolute inset-0 bg-grid-small-white/[0.05] bg-[size:30px_30px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative space-y-16"
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
              Blog & Insights
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground font-heading">
            Erfahren Sie mehr über die neuesten Trends und Entwicklungen im Bereich KI und Geschäftsprozessoptimierung.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div key={post.title} variants={itemVariants} custom={index} className="group">
              <Card className="h-full border-border/50 bg-background/50 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md group-hover:shadow-primary/5">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {post.date}
                  </div>
                  <CardTitle className="line-clamp-2 font-heading">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3 font-heading">{post.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="group/button font-heading">
                    <Link href={post.url}>
                      Weiterlesen
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <Button asChild variant="outline" size="lg" className="font-heading">
            <Link href="/blog">
              Alle Beiträge anzeigen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
