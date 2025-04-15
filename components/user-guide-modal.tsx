"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle, X, FileText, Brain, CheckCircle, ArrowRight } from "lucide-react"

export default function UserGuideModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const toggleModal = () => {
    setIsOpen(!isOpen)
    setCurrentStep(1) // Reset to first step when opening
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsOpen(false)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      {/* Help Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 animate-pulse hover:animate-none"
        aria-label="Hilfe öffnen"
      >
        <HelpCircle className="h-6 w-6 text-white" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">KI-Matching Anleitung</h2>
              <button onClick={toggleModal} className="text-white/60 hover:text-white" aria-label="Schließen">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Schritt 1: Lebenslauf hochladen</h3>
                  </div>
                  <p className="text-white/70">
                    Laden Sie Ihren Lebenslauf im PDF-, Word- oder Textformat hoch. Unsere KI analysiert Ihre
                    Qualifikationen, Erfahrungen und Fähigkeiten, um ein umfassendes Profil zu erstellen.
                  </p>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-white/80 text-sm">
                      <strong className="text-cyan-400">Tipp:</strong> Stellen Sie sicher, dass Ihr Lebenslauf aktuell
                      ist und alle relevanten Informationen enthält, um die bestmögliche Analyse zu erhalten.
                    </p>
                  </div>
                  <div className="mt-4">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bildschirmfoto%202025-04-15%20um%2009.39.17-OAYL3ZEkmmZ5ydd73lEOcxMsWWLF53.png"
                      alt="Lebenslauf hochladen"
                      className="rounded-lg border border-white/10 w-full"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Schritt 2: Fragen beantworten</h3>
                  </div>
                  <p className="text-white/70">
                    Beantworten Sie einige Fragen zu Ihren beruflichen Präferenzen, Arbeitsweise und Karrierezielen.
                    Diese Informationen helfen uns, Ihre Persönlichkeit und Arbeitsweise besser zu verstehen.
                  </p>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-white/80 text-sm">
                      <strong className="text-cyan-400">Tipp:</strong> Je ausführlicher und ehrlicher Ihre Antworten
                      sind, desto präziser können wir passende Karrierewege und Stellenangebote für Sie identifizieren.
                    </p>
                  </div>
                  <div className="mt-4">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bildschirmfoto%202025-04-15%20um%2009.42.11-RmMIJ1HgQ9c7wP6yLLGyz7iB9ertys.png"
                      alt="Fragen beantworten"
                      className="rounded-lg border border-white/10 w-full"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Schritt 3: Ergebnisse erkunden</h3>
                  </div>
                  <p className="text-white/70">
                    Nach der Analyse erhalten Sie detaillierte Ergebnisse zu Ihrem Karriereprofil, Persönlichkeit,
                    Stärken und Empfehlungen. Nutzen Sie die Tabs, um zwischen den verschiedenen Bereichen zu
                    navigieren.
                  </p>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-white/80 text-sm">
                      <strong className="text-cyan-400">Wichtig:</strong> Klicken Sie auf die verschiedenen Tabs
                      (Karriere-Profil, Persönlichkeit, Stärken, Empfehlungen), um alle Aspekte Ihrer Analyse zu
                      entdecken.
                    </p>
                  </div>
                  <div className="mt-4">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bildschirmfoto%202025-04-15%20um%2009.43.03-R6Ow6KIBq2If4EPkOg9Ka5L6nyHupn.png"
                      alt="Ergebnisse erkunden"
                      className="rounded-lg border border-white/10 w-full"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Schritt 4: Nächste Schritte</h3>
                  </div>
                  <p className="text-white/70">
                    Basierend auf Ihrer Analyse können Sie passende Stellenangebote ansehen oder einen Beratungstermin
                    vereinbaren. Wir helfen Ihnen, den nächsten Schritt in Ihrer Karriere zu planen und umzusetzen.
                  </p>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-white/80 text-sm">
                      <strong className="text-cyan-400">Tipp:</strong> Nutzen Sie die Möglichkeit, einen persönlichen
                      Beratungstermin zu vereinbaren, um Ihre Ergebnisse mit einem Experten zu besprechen und
                      individuelle Karriereempfehlungen zu erhalten.
                    </p>
                  </div>
                  <div className="mt-4">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bildschirmfoto%202025-04-15%20um%2009.43.43-Jel1VHGIIPD9vRm2MEaVQRYaHGI6mJ.png"
                      alt="Nächste Schritte"
                      className="rounded-lg border border-white/10 w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between p-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-white/20 text-white/70 hover:bg-white/10"
              >
                Zurück
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-sm">{currentStep} von 4</span>
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
              >
                {currentStep < 4 ? "Weiter" : "Schließen"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
