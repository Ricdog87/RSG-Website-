"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Calendar, Mail, MessageSquare, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactSection() {
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
    <section id="contact" ref={ref} className="relative w-full bg-gradient-to-b from-background to-background/95 py-24">
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
                  Kontakt
                </span>
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Lassen Sie uns gemeinsam Ihre KI-Strategie entwickeln
              </p>
            </div>

            <p className="text-muted-foreground">
              Wir freuen uns darauf, von Ihnen zu hören und Ihnen zu zeigen, wie unsere KI-Lösungen Ihr Unternehmen auf
              die nächste Stufe heben können. Kontaktieren Sie uns für eine unverbindliche Beratung oder buchen Sie
              direkt einen Termin für eine Demo.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-Mail</p>
                  <p className="font-medium">info@recruiting-sg.de</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <a href="tel:+4917660772445" className="font-medium hover:text-primary transition-colors">
                    +49 176 6077 2445
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chat</p>
                  <p className="font-medium">Live-Chat auf unserer Website</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground w-full sm:w-auto">
                <Link href="https://meetings.hubspot.com/r-serrano?fbclid=PAZXh0bgNhZW0CMTEAAacAOPTJDVLlkGfZn7n56wzwYRLLQrzGIhvbqd-Mdz9x9oGykWK8Wdl87pKn0A_aem_xvZOqx4KCtD0hKmtyl33RQ&uuid=f86f149b-96d2-4afe-a5d1-fd955cb14ca5">
                  <Calendar className="mr-2 h-5 w-5" />
                  Demo buchen
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-border/50 bg-background/50">
              <CardHeader>
                <CardTitle>Kontaktformular</CardTitle>
                <CardDescription>
                  Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Ihr Name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        E-Mail
                      </label>
                      <Input id="email" type="email" placeholder="ihre.email@beispiel.de" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Unternehmen
                    </label>
                    <Input id="company" placeholder="Ihr Unternehmen" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Betreff
                    </label>
                    <Input id="subject" placeholder="Worum geht es?" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Nachricht
                    </label>
                    <Textarea id="message" placeholder="Wie können wir Ihnen helfen?" rows={4} />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground">
                    Nachricht senden
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
