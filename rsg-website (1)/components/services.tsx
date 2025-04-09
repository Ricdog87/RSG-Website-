"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Bot, Workflow, Lightbulb, Cog, MessageSquare, LayoutDashboard, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Bot,
    title: "KI-Agenten-Entwicklung",
    description:
      "Wir entwickeln maßgeschneiderte KI-Agenten für Marketing, Vertrieb und Recruiting, die Ihre Prozesse automatisieren und optimieren.",
    tools: ["ChatGPT", "Claude", "Anthropic", "LangChain"],
    image: "/images/ai-agent-service.jpg",
  },
  {
    icon: Workflow,
    title: "Automatisierte Workflows",
    description:
      "Wir erstellen automatisierte Workflows, die Ihre Geschäftsprozesse optimieren und Ihnen Zeit und Ressourcen sparen.",
    tools: ["n8n", "Zapier", "Make", "Integromat"],
    image: "/images/workflow-service.jpg",
  },
  {
    icon: Lightbulb,
    title: "KI-Implementierung & Beratung",
    description:
      "Wir beraten Sie bei der Integration von KI in Ihr Unternehmen und entwickeln maßgeschneiderte Strategien für Ihren Erfolg.",
    tools: ["Strategieberatung", "Prozessoptimierung", "Change Management"],
    image: "/images/consulting-service.jpg",
  },
  {
    icon: Cog,
    title: "Digitale Prozessautomatisierung",
    description:
      "Wir automatisieren wiederkehrende Aufgaben und Prozesse, um Ihre Effizienz zu steigern und Fehler zu reduzieren.",
    tools: ["RPA", "Prozessanalyse", "Workflow-Optimierung"],
    image: "/images/automation-service.jpg",
  },
  {
    icon: MessageSquare,
    title: "Chatbot-Lösungen",
    description:
      "Wir entwickeln intelligente Chatbots, die Ihren Kundenservice verbessern und Ihre Mitarbeiter entlasten.",
    tools: ["HubSpot", "ChatGPT", "Dialogflow", "Rasa"],
    image: "/images/chatbot-solution.png",
  },
  {
    icon: LayoutDashboard,
    title: "App-Integration & AI-Dashboards",
    description:
      "Wir integrieren KI-Lösungen in Ihre bestehenden Systeme und entwickeln Dashboards für eine bessere Datenvisualisierung.",
    tools: ["API-Integration", "Datenvisualisierung", "Custom Dashboards"],
    image: "/images/ai-dashboard-integration.png",
  },
]

export function Services() {
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
      id="services"
      ref={ref}
      className="relative w-full bg-gradient-to-b from-background/95 to-background py-24"
    >
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
              Unsere Dienstleistungen
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground font-heading">
            Wir bieten eine breite Palette an KI-gestützten Dienstleistungen, die Ihnen helfen, Ihre Geschäftsprozesse
            zu optimieren und Ihre Ziele zu erreichen.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div key={service.title} variants={itemVariants} custom={index} className="group">
              <Card className="h-full border-border/50 bg-background/50 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md group-hover:shadow-primary/5">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-heading">{service.title}</CardTitle>
                  <CardDescription className="font-heading">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium font-heading">Tools & Technologien:</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {service.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary font-heading"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group/button font-heading"
                    onClick={() => {
                      // Scroll zum Kontaktformular
                      const contactSection = document.getElementById("contact")
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
