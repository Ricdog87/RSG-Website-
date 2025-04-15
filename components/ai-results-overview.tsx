"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronRight, BriefcaseBusiness, Brain, Award, BookOpen, Target } from "lucide-react"
import TabHint from "@/components/tab-hint"

interface ResultsOverviewProps {
  results: any
}

export default function ResultsOverview({ results }: ResultsOverviewProps) {
  const [tab, setTab] = useState("profile")

  if (!results) return null

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-sm opacity-20"></div>
        <Card className="relative bg-black/60 border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Ihr Karriereprofil</h3>
              <Badge variant="outline" className="bg-cyan-500/20 border-cyan-500/50 text-cyan-400">
                {results.careerPath || "Allgemein"}
              </Badge>
            </div>
            <p className="text-white/80 mb-6">
              Basierend auf Ihrem Lebenslauf und Ihren Antworten haben wir folgendes Karriereprofil für Sie erstellt:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3">
                  <Award className="h-6 w-6 text-cyan-400" />
                </div>
                <h4 className="font-medium text-white text-center">Stärken</h4>
                <p className="text-white/60 text-sm text-center">
                  {results.strengths?.length || 0} identifizierte Stärken
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3">
                  <Brain className="h-6 w-6 text-cyan-400" />
                </div>
                <h4 className="font-medium text-white text-center">Persönlichkeit</h4>
                <p className="text-white/60 text-sm text-center">
                  {Object.keys(results.personality || {}).length || 0} Merkmale analysiert
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3">
                  <Target className="h-6 w-6 text-cyan-400" />
                </div>
                <h4 className="font-medium text-white text-center">Karriereziele</h4>
                <p className="text-white/60 text-sm text-center">
                  {results.recommendations?.length || 0} passende Positionen
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Improved tabs with better visibility and icons */}
      <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
        <p className="text-white/70 text-sm mb-2">Wählen Sie einen Tab, um detaillierte Informationen zu sehen:</p>
      </div>

      <Tabs defaultValue="profile" value={tab} onValueChange={setTab} className="w-full">
        <div className="relative">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="profile" className="text-xs md:text-sm">
              Karriere-Profil
            </TabsTrigger>
            <TabsTrigger value="personality" className="text-xs md:text-sm">
              Persönlichkeit
            </TabsTrigger>
            <TabsTrigger value="strengths" className="text-xs md:text-sm">
              Stärken
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xs md:text-sm">
              Empfehlungen
            </TabsTrigger>
          </TabsList>
          <TabHint />
        </div>

        <TabsContent value="profile" className="pt-6">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-sm opacity-20"></div>
              <Card className="relative bg-black/60 border-white/10">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Ihre Top Karriere-Kategorien</h3>
                  <div className="space-y-6">
                    {results.topCategories?.map((category: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{category.name}</span>
                          <span className="font-medium text-cyan-400">{category.score}%</span>
                        </div>
                        <Progress
                          value={category.score}
                          className="h-2"
                          indicatorClassName={`bg-gradient-to-r from-cyan-500 to-blue-600`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Übereinstimmende Stellenangebote</h3>
              <div className="space-y-3">
                {results.matchingJobs?.map((job: string, index: number) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-sm opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                          <BriefcaseBusiness className="h-5 w-5 text-cyan-400" />
                        </div>
                        <span>{job}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/50 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="personality" className="pt-6">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-sm opacity-20"></div>
              <Card className="relative bg-black/60 border-white/10">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Ihr Persönlichkeitsprofil</h3>
                  <div className="space-y-6">
                    {Object.entries(results.personality || {}).map(([trait, score]: [string, any], index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{trait}</span>
                          <span className="font-medium text-cyan-400">{score}%</span>
                        </div>
                        <Progress
                          value={score}
                          className="h-2"
                          indicatorClassName={`bg-gradient-to-r from-cyan-500 to-purple-600`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Arbeitsstil & Entscheidungsfindung</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Bevorzugter Arbeitsstil</h4>
                  <div className="space-y-2">{getWorkStyleDescription(results)}</div>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Entscheidungsfindung</h4>
                  <div className="space-y-2">{getDecisionMakingDescription(results)}</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strengths" className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Ihre Stärken & Kompetenzen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.strengths?.map((strength: string, index: number) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{strength}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-sm opacity-20"></div>
              <Card className="relative bg-black/60 border-white/10">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Entwicklungsbereiche</h3>
                  <p className="text-white/80 mb-4">
                    Basierend auf Ihrer Analyse könnten diese Fähigkeiten Ihr Profil weiter stärken:
                  </p>
                  <ul className="space-y-3">
                    {results.developmentAreas?.map((area: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ChevronRight className="h-3 w-3 text-cyan-400" />
                        </div>
                        <span className="text-white/80">{area}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Empfohlene Karrierewege</h3>
              <div className="space-y-3">
                {results.recommendations?.map((job: string, index: number) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{job}</h4>
                      <p className="text-white/60 text-sm mt-1">
                        {index === 0
                          ? "Optimale Übereinstimmung mit Ihrem Profil"
                          : index === 1
                            ? "Hohe Übereinstimmung mit Ihren Stärken"
                            : "Gute Karriereoption basierend auf Ihren Fähigkeiten"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-sm opacity-20"></div>
              <Card className="relative bg-black/60 border-white/10">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Weiterbildungsempfehlungen</h3>
                  <p className="text-white/80 mb-4">
                    Diese Weiterbildungen könnten Ihre Karrierechancen weiter verbessern:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getEducationRecommendations(results).map((rec, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <BookOpen className="h-5 w-5 text-cyan-400 mr-2" />
                          <h4 className="font-medium text-white">{rec.title}</h4>
                        </div>
                        <p className="text-white/60 text-sm">{rec.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Hilfsfunktionen für die Darstellung
function getWorkStyleDescription(results: any) {
  const workStyle = results?.answers?.workStyle || ""

  switch (workStyle) {
    case "structured":
      return (
        <p className="text-white/70">
          Sie bevorzugen eine strukturierte Arbeitsweise mit klaren Prozessen und planbaren Abläufen. Diese Eigenschaft
          macht Sie besonders wertvoll in Umgebungen, die Präzision und Zuverlässigkeit erfordern.
        </p>
      )
    case "flexible":
      return (
        <p className="text-white/70">
          Sie arbeiten am besten in einem flexiblen Umfeld mit wechselnden Aufgaben. Ihre Anpassungsfähigkeit ist eine
          Stärke in dynamischen Arbeitsumgebungen und bei sich ändernden Anforderungen.
        </p>
      )
    case "autonomous":
      return (
        <p className="text-white/70">
          Sie schätzen Autonomie und die Freiheit, eigene Entscheidungen zu treffen. Diese Eigenständigkeit macht Sie
          besonders wertvoll für Positionen mit hoher Eigenverantwortung.
        </p>
      )
    case "collaborative":
      return (
        <p className="text-white/70">
          Sie arbeiten am liebsten im Team und schätzen den regelmäßigen Austausch. Ihre Teamfähigkeit ist eine wichtige
          Stärke in kollaborativen Arbeitsumgebungen.
        </p>
      )
    case "innovative":
      return (
        <p className="text-white/70">
          Sie suchen ständig nach neuen Wegen und innovativen Lösungsansätzen. Diese kreative Denkweise macht Sie
          besonders wertvoll in Umgebungen, die Innovation fördern.
        </p>
      )
    default:
      return (
        <p className="text-white/70">
          Basierend auf Ihrer Analyse zeigen Sie eine ausgewogene Arbeitsweise, die sich verschiedenen Umgebungen
          anpassen kann.
        </p>
      )
  }
}

function getDecisionMakingDescription(results: any) {
  const decisionMaking = results?.answers?.decisionMaking || ""

  switch (decisionMaking) {
    case "analytical":
      return (
        <p className="text-white/70">
          Sie analysieren alle verfügbaren Daten und treffen faktenbasierte Entscheidungen. Diese analytische
          Herangehensweise ist besonders wertvoll in komplexen Entscheidungssituationen.
        </p>
      )
    case "intuitive":
      return (
        <p className="text-white/70">
          Sie verlassen sich auf Ihr Bauchgefühl und Ihre Intuition, um Entscheidungen zu treffen. Diese intuitive
          Herangehensweise ist besonders wertvoll in Situationen mit unvollständigen Informationen.
        </p>
      )
    case "collaborative":
      return (
        <p className="text-white/70">
          Sie beziehen andere in den Entscheidungsprozess ein und suchen nach Konsens. Diese kollaborative
          Herangehensweise ist besonders wertvoll in Teamumgebungen.
        </p>
      )
    case "decisive":
      return (
        <p className="text-white/70">
          Sie treffen schnell und entschlossen Entscheidungen, auch unter Druck. Diese Entschlossenheit ist besonders
          wertvoll in Situationen, die schnelles Handeln erfordern.
        </p>
      )
    default:
      return (
        <p className="text-white/70">
          Basierend auf Ihrer Analyse zeigen Sie eine ausgewogene Herangehensweise an Entscheidungen, die sich an der
          jeweiligen Situation orientiert.
        </p>
      )
  }
}

function getEducationRecommendations(results: any) {
  const recommendations = []

  if (results?.developmentAreas?.includes("Vertiefung der technischen Expertise in Cloud-Technologien")) {
    recommendations.push({
      title: "Cloud Computing Zertifizierung",
      description: "Erwerben Sie eine Zertifizierung in AWS, Azure oder Google Cloud, um Ihre Expertise zu vertiefen.",
    })
  }

  if (results?.developmentAreas?.includes("Ausbau von Leadership-Fähigkeiten für Teamleitungspositionen")) {
    recommendations.push({
      title: "Leadership-Training",
      description:
        "Nehmen Sie an einem Leadership-Training teil, um Ihre Führungsqualitäten und Teammanagement-Fähigkeiten zu verbessern.",
    })
  }

  if (results?.developmentAreas?.includes("Weiterbildung im Bereich Datenanalyse und Business Intelligence")) {
    recommendations.push({
      title: "Data Science Kurs",
      description:
        "Besuchen Sie einen Kurs in Data Science oder Business Intelligence, um Ihre Kenntnisse in der Datenanalyse zu erweitern.",
    })
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: "Allgemeine Weiterbildung",
      description: "Investieren Sie in Ihre persönliche und berufliche Entwicklung durch Kurse und Seminare.",
    })
  }

  return recommendations
}
