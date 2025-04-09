"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Cpu, Lightbulb, Users, TrendingUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Cpu,
    title: "KI-Expertise",
    description: "Wir sind Spezialisten für künstliche Intelligenz und deren Integration in Geschäftsprozesse.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Lösungen",
    description: "Wir entwickeln maßgeschneiderte Lösungen, die Ihr Unternehmen auf die nächste Stufe heben.",
  },
  {
    icon: Users,
    title: "Erfahrenes Team",
    description: "Unser Team besteht aus erfahrenen Experten mit umfangreichem Know-how in verschiedenen Branchen.",
  },
  {
    icon: TrendingUp,
    title: "Messbare Ergebnisse",
    description: "Wir liefern messbare Ergebnisse, die Ihren ROI maximieren und Ihre Geschäftsziele unterstützen.",
  },
]

export function AboutUs() {
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
    <section id="about" ref={ref} className="relative w-full bg-gradient-to-b from-background to-background/95 py-24">
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
              Über uns
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground font-heading">
            RSG Recruiting Solutions Group GmbH ist ein innovatives Beratungsunternehmen, das sich auf KI-Lösungen für
            Marketing, Vertrieb und Recruiting spezialisiert hat. Wir helfen Unternehmen, die Kraft der künstlichen
            Intelligenz zu nutzen, um ihre Geschäftsprozesse zu optimieren und ihre Ziele zu erreichen.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants} className="group" custom={index}>
              <Card className="border-border/50 bg-background/50 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md group-hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold font-heading">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground font-heading">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-1 md:grid-cols-2 md:gap-16"
        >
          <div className="space-y-4">
            <h3 className="text-xl font-semibold md:text-2xl font-heading">Unsere Mission</h3>
            <p className="text-muted-foreground font-heading">
              Wir glauben, dass künstliche Intelligenz das Potenzial hat, Unternehmen zu transformieren. Unsere Mission
              ist es, diese Technologie zugänglich und nutzbar zu machen, indem wir maßgeschneiderte Lösungen
              entwickeln, die auf die spezifischen Bedürfnisse unserer Kunden zugeschnitten sind.
            </p>
            <p className="text-muted-foreground font-heading">
              Wir streben danach, die Lücke zwischen komplexer KI-Technologie und praktischen Geschäftsanwendungen zu
              schließen, um messbare Ergebnisse zu liefern.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl md:aspect-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-30" />
            <Image
              src="/images/team-meeting-actual.jpg"
              alt="RSG Team Meeting"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
