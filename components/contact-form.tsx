"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function ContactForm() {
  const { toast } = useToast()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validierung
      if (!formState.name || !formState.email || !formState.message) {
        toast({
          title: "Fehler",
          description: "Bitte füllen Sie alle Felder aus.",
          variant: "destructive",
        })
        return
      }

      if (!formState.email.includes("@") || !formState.email.includes(".")) {
        toast({
          title: "Fehler",
          description: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
          variant: "destructive",
        })
        return
      }

      setIsSubmitting(true)

      // Hier würde normalerweise der API-Aufruf stattfinden
      // Für Demo-Zwecke simulieren wir eine Verzögerung
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Erfolgreiche Übermittlung
      toast({
        title: "Nachricht gesendet",
        description: "Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.",
      })

      // Formular zurücksetzen
      setFormState({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Fehler",
        description: "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
      <form
        onSubmit={handleSubmit}
        className="relative bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-white/10"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                Name *
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-cyan-500 focus:ring-cyan-500"
                placeholder="Ihr Name"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                E-Mail *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-cyan-500 focus:ring-cyan-500"
                placeholder="ihre.email@beispiel.de"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
              Nachricht *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-cyan-500 focus:ring-cyan-500 min-h-[120px]"
              placeholder="Wie können wir Ihnen helfen?"
              disabled={isSubmitting}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-md py-5 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wird gesendet...
              </>
            ) : (
              "Nachricht senden"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
