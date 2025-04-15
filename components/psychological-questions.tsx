"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"

interface PsychologicalQuestionsProps {
  answers: {
    question1: string
    question2: string
    question3: string
    workStyle: string
    decisionMaking: string
    teamRole: string
  }
  onAnswerChange: (question: string, answer: string) => void
  onSubmit: () => void
}

export default function PsychologicalQuestions({ answers, onAnswerChange, onSubmit }: PsychologicalQuestionsProps) {
  const [currentSection, setCurrentSection] = useState(1)

  const openEndedQuestions = [
    {
      id: "question1",
      question:
        "Beschreiben Sie Ihre ideale berufliche Rolle und die Aufgaben, die Ihnen am meisten Freude bereiten. Was macht diese Tätigkeiten für Sie besonders erfüllend?",
      placeholder: "Beschreiben Sie konkrete Aufgaben und warum diese zu Ihnen passen...",
    },
    {
      id: "question2",
      question:
        "Welche beruflichen Erfolge oder Projekte haben Ihnen besonders viel Zufriedenheit gebracht und warum? Was war Ihr spezifischer Beitrag?",
      placeholder: "Beschreiben Sie konkrete Erfolge und Ihre Rolle dabei...",
    },
    {
      id: "question3",
      question:
        "Welche Fähigkeiten oder Kompetenzen möchten Sie in Ihrer nächsten Position weiterentwickeln und warum sind diese für Ihre Karriereziele wichtig?",
      placeholder: "Beschreiben Sie Ihre Entwicklungsziele und deren Bedeutung für Ihre Karriere...",
    },
  ]

  const workStyleOptions = [
    { value: "structured", label: "Ich bevorzuge klare Strukturen, Prozesse und planbare Abläufe." },
    { value: "flexible", label: "Ich arbeite am besten in einem flexiblen Umfeld mit wechselnden Aufgaben." },
    { value: "autonomous", label: "Ich schätze Autonomie und die Freiheit, eigene Entscheidungen zu treffen." },
    { value: "collaborative", label: "Ich arbeite am liebsten im Team und schätze den regelmäßigen Austausch." },
    { value: "innovative", label: "Ich suche ständig nach neuen Wegen und innovativen Lösungsansätzen." },
  ]

  const decisionMakingOptions = [
    { value: "analytical", label: "Ich analysiere alle verfügbaren Daten und treffe faktenbasierte Entscheidungen." },
    { value: "intuitive", label: "Ich verlasse mich oft auf meine Intuition und Erfahrung." },
    { value: "collaborative", label: "Ich beziehe gerne verschiedene Perspektiven ein und entscheide im Konsens." },
    { value: "decisive", label: "Ich treffe schnelle Entscheidungen und passe bei Bedarf später an." },
    { value: "cautious", label: "Ich wäge alle Optionen sorgfältig ab und minimiere Risiken." },
  ]

  const teamRoleOptions = [
    { value: "leader", label: "Ich übernehme gerne Führungsverantwortung und leite Teams." },
    { value: "specialist", label: "Ich bin Experte in meinem Fachgebiet und liefere spezialisierte Beiträge." },
    { value: "coordinator", label: "Ich koordiniere gerne zwischen verschiedenen Stakeholdern und Teams." },
    { value: "innovator", label: "Ich bringe neue Ideen ein und treibe Innovationen voran." },
    { value: "supporter", label: "Ich unterstütze andere und sorge für ein harmonisches Teamklima." },
  ]

  const nextSection = () => {
    if (currentSection < 2) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
    }
  }

  return (
    <div className="space-y-8">
      {currentSection === 1 && (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">Teil 1: Berufliche Präferenzen und Erfahrungen</h3>
            <p className="text-white/70">
              Ihre Antworten helfen uns, Ihre beruflichen Stärken und Präferenzen besser zu verstehen.
            </p>
          </div>

          {openEndedQuestions.map((q, index) => (
            <div key={q.id} className="space-y-3">
              <div className="flex items-start">
                <span className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mr-3">
                  {index + 1}
                </span>
                <Label htmlFor={q.id} className="text-white text-lg font-medium">
                  {q.question}
                </Label>
              </div>
              <div className="pl-11">
                <Textarea
                  id={q.id}
                  placeholder={q.placeholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-[120px]"
                  value={answers[q.id as keyof typeof answers] as string}
                  onChange={(e) => onAnswerChange(q.id, e.target.value)}
                />
                <p className="text-white/50 text-xs mt-1">
                  Eine ausführliche Antwort ermöglicht eine präzisere Analyse (mindestens 100 Zeichen empfohlen)
                </p>
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-end">
            <Button
              onClick={nextSection}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              Weiter zu Arbeitsweise & Teamrollen
            </Button>
          </div>
        </>
      )}

      {currentSection === 2 && (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">Teil 2: Arbeitsweise und Teamrollen</h3>
            <p className="text-white/70">
              Diese Fragen helfen uns, Ihre bevorzugte Arbeitsweise und Rolle im Team zu verstehen.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <Label className="text-white text-lg font-medium">Welcher Arbeitsstil beschreibt Sie am besten?</Label>
              <RadioGroup
                value={answers.workStyle}
                onValueChange={(value) => onAnswerChange("workStyle", value)}
                className="space-y-3"
              >
                {workStyleOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-colors"
                  >
                    <RadioGroupItem value={option.value} id={`workStyle-${option.value}`} />
                    <Label htmlFor={`workStyle-${option.value}`} className="cursor-pointer w-full">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-white text-lg font-medium">
                Wie treffen Sie typischerweise berufliche Entscheidungen?
              </Label>
              <RadioGroup
                value={answers.decisionMaking}
                onValueChange={(value) => onAnswerChange("decisionMaking", value)}
                className="space-y-3"
              >
                {decisionMakingOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-colors"
                  >
                    <RadioGroupItem value={option.value} id={`decisionMaking-${option.value}`} />
                    <Label htmlFor={`decisionMaking-${option.value}`} className="cursor-pointer w-full">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-white text-lg font-medium">
                Welche Rolle übernehmen Sie bevorzugt in einem Team?
              </Label>
              <RadioGroup
                value={answers.teamRole}
                onValueChange={(value) => onAnswerChange("teamRole", value)}
                className="space-y-3"
              >
                {teamRoleOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-colors"
                  >
                    <RadioGroupItem value={option.value} id={`teamRole-${option.value}`} />
                    <Label htmlFor={`teamRole-${option.value}`} className="cursor-pointer w-full">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button
              onClick={prevSection}
              variant="outline"
              className="border-cyan-500/50 bg-transparent hover:bg-cyan-950/30 text-white"
            >
              Zurück
            </Button>

            <Button
              onClick={onSubmit}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              Antworten senden & Analyse starten
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
