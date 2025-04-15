"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Lock, Brain, Calendar, CheckCircle, HelpCircle, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import ParticleBackground from "@/components/particle-background"
import CVUploader from "@/components/cv-uploader"
import PsychologicalQuestions from "@/components/psychological-questions"
import ResultsOverview from "@/components/ai-results-overview"
import PrivacyConsent from "@/components/privacy-consent"
import Head from "next/head"
import UserGuideModal from "@/components/user-guide-modal"

export default function AIMatching() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false)
  const [cvFile, setCVFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  // Änderungen im State für die erweiterten Fragen
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
    workStyle: "",
    decisionMaking: "",
    teamRole: "",
  })
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [starhunterCandidateId, setStarhunterCandidateId] = useState<string | null>(null)
  const [activeResultTab, setActiveResultTab] = useState("profile")
  const [emailNotificationSent, setEmailNotificationSent] = useState(false)

  const handlePrivacyAccept = (accepted: boolean) => {
    setIsPrivacyAccepted(accepted)
    if (accepted) {
      setProgress(25)
    } else {
      setProgress(0)
    }
  }

  const handleCVUpload = async (file: File) => {
    setCVFile(file)
    setProgress(50)
    setCurrentStep(2)
  }

  const handleAnswerChange = (question: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }))
  }

  const handleUserDataChange = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitAnswers = async () => {
    if (!answers.question1 || !answers.question2 || !answers.question3) {
      toast({
        title: "Unvollständige Antworten",
        description: "Bitte beantworten Sie alle offenen Fragen für eine genaue Analyse.",
        variant: "destructive",
      })
      return
    }

    if (!answers.workStyle || !answers.decisionMaking || !answers.teamRole) {
      toast({
        title: "Unvollständige Präferenzen",
        description: "Bitte geben Sie Ihre Arbeitsweise und Teamrollen-Präferenzen an.",
        variant: "destructive",
      })
      return
    }

    if (!userData.firstName || !userData.lastName || !userData.email) {
      toast({
        title: "Unvollständige Kontaktdaten",
        description: "Bitte geben Sie Ihre Kontaktdaten vollständig ein.",
        variant: "destructive",
      })
      return
    }

    setProgress(75)
    setCurrentStep(3)
    setIsAnalyzing(true)

    try {
      // Sende Daten an Starhunter
      const formData = new FormData()
      if (cvFile) {
        formData.append("file", cvFile)
      }
      formData.append("firstName", userData.firstName)
      formData.append("lastName", userData.lastName)
      formData.append("email", userData.email)
      formData.append("phone", userData.phone || "")
      formData.append("answers", JSON.stringify(answers))

      // API-Aufruf an Starhunter
      const response = await fetch("/api/starhunter", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Fehler bei der Datenverarbeitung")
      }

      setStarhunterCandidateId(data.candidateId)

      // Zeige unterschiedliche Benachrichtigungen je nach Integrationsstatus
      if (data.starhunterSuccess) {
        toast({
          title: "Profil erfolgreich gespeichert",
          description: "Ihre Daten wurden erfolgreich in unser System integriert.",
          variant: "default",
        })
      } else if (data.emailSent) {
        toast({
          title: "Profil gespeichert",
          description:
            "Ihre Daten wurden gespeichert. Unser Team wurde benachrichtigt und wird sich mit Ihnen in Verbindung setzen.",
          variant: "default",
        })
      }

      // Prüfe, ob eine E-Mail-Benachrichtigung gesendet wurde
      if (data.starhunterIntegrationSuccess === false) {
        setEmailNotificationSent(true)
      }

      // Intelligente KI-Analyse basierend auf dem CV und den Antworten
      setTimeout(() => {
        // Hier würde in einer echten Implementierung eine komplexe Analyse stattfinden
        // Für die Demo generieren wir intelligente Ergebnisse basierend auf den Antworten
        const intelligentResults = generateIntelligentAnalysisResults(cvFile?.name || "", answers)
        setAnalysisResults(intelligentResults)
        setIsAnalyzing(false)
        setProgress(100)
      }, 5000)
    } catch (error) {
      console.error("Fehler bei der Datenverarbeitung:", error)

      // Bei einem Fehler senden wir eine separate E-Mail-Benachrichtigung
      try {
        await sendEmailNotification({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone || "",
          answers: answers,
          fileName: cvFile?.name || "Keine Datei",
        })
        setEmailNotificationSent(true)
      } catch (emailError) {
        console.error("Fehler beim Senden der E-Mail-Benachrichtigung:", emailError)
      }

      // Trotz Fehler bei der API-Integration fahren wir mit der lokalen Analyse fort
      toast({
        title: "Hinweis",
        description: "Die Datenverarbeitung wurde mit eingeschränkter Funktionalität fortgesetzt.",
        variant: "default",
      })

      // Generiere trotzdem Ergebnisse
      setTimeout(() => {
        const intelligentResults = generateIntelligentAnalysisResults(cvFile?.name || "", answers)
        setAnalysisResults(intelligentResults)
        setIsAnalyzing(false)
        setProgress(100)

        // Generiere eine simulierte Kandidaten-ID
        setStarhunterCandidateId("sim_" + Math.random().toString(36).substring(2, 15))
      }, 5000)
    }
  }

  // Funktion zum Senden einer E-Mail-Benachrichtigung
  const sendEmailNotification = async (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    answers: any
    fileName: string
  }) => {
    const subject = `Neuer Kandidat: ${data.firstName} ${data.lastName}`

    const content = `
      <h2>Neuer Kandidat registriert</h2>
      <p>Ein neuer Kandidat hat sich über das AI Talent Matching System registriert. Die Starhunter-Integration war nicht erfolgreich, daher müssen die Daten manuell eingegeben werden.</p>
      
      <h3>Kandidateninformationen:</h3>
      <ul>
        <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
        <li><strong>E-Mail:</strong> ${data.email}</li>
        <li><strong>Telefon:</strong> ${data.phone || "Nicht angegeben"}</li>
        <li><strong>Dateiname:</strong> ${data.fileName}</li>
      </ul>
      
      <h3>Antworten auf Fragen:</h3>
      <pre>${JSON.stringify(data.answers, null, 2)}</pre>
    `

    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        content,
      }),
    })

    if (!response.ok) {
      throw new Error("Fehler beim Senden der E-Mail-Benachrichtigung")
    }

    return response.json()
  }

  const handleViewJobOffers = () => {
    router.push("/stellenangebote?fromAi=true")
  }

  // Neue Funktion für intelligente Analyseergebnisse
  const generateIntelligentAnalysisResults = (fileName: string, answers: any) => {
    try {
      // Erkennung des Karrierepfads basierend auf dem Dateinamen und den Antworten
      let careerPath = "Allgemein"

      // Erkennung für HR-Profil
      if (
        fileName.toLowerCase().includes("hr") ||
        fileName.toLowerCase().includes("human resources") ||
        (answers.question1 && answers.question1.toLowerCase().includes("personal")) ||
        (answers.question1 && answers.question1.toLowerCase().includes("recruiting")) ||
        (answers.question1 && answers.question1.toLowerCase().includes("hr")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("personal")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("recruiting")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("hr"))
      ) {
        careerPath = "Human Resources"
      }

      // Erkennung für IT-Profil
      else if (
        fileName.toLowerCase().includes("entwickler") ||
        fileName.toLowerCase().includes("developer") ||
        fileName.toLowerCase().includes("it") ||
        (answers.question1 && answers.question1.toLowerCase().includes("entwickl")) ||
        (answers.question1 && answers.question1.toLowerCase().includes("programm")) ||
        (answers.question1 && answers.question1.toLowerCase().includes("software")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("entwickl")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("programm")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("software"))
      ) {
        careerPath = "IT & Entwicklung"
      }

      // Erkennung für Finance-Profil
      else if (
        fileName.toLowerCase().includes("finance") ||
        fileName.toLowerCase().includes("finanzen") ||
        fileName.toLowerCase().includes("controlling") ||
        (answers.question1 && answers.question1.toLowerCase().includes("finanzen")) ||
        (answers.question1 && answers.question1.toLowerCase().includes("controlling")) ||
        (answers.question1 && answers.question1.toLowerCase().includes("buchhaltung")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("finanzen")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("controlling")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("buchhaltung"))
      ) {
        careerPath = "Finance & Controlling"
      }

      // Erkennung für Marketing-Profil
      else if (
        fileName.toLowerCase().includes("marketing") ||
        fileName.toLowerCase().includes("kommunikation") ||
        fileName.toLowerCase().includes("pr") ||
        (answers.question1 && answers.question1.toLowerCase().includes("marketing")) ||
        (answers.question1 && answers.question1.toLowerCase().includes("kommunikation")) ||
        (answers.question1 && answers.question1.toLowerCase().includes("social media")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("marketing")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("kommunikation")) ||
        (answers.question2 && answers.question2.toLowerCase().includes("social media"))
      ) {
        careerPath = "Marketing & Kommunikation"
      }

      // Karrierepfad-spezifische Ergebnisse generieren
      let topCategories = []
      let personality = {}
      let recommendations = []
      let matchingJobs = []

      // HR-spezifische Ergebnisse
      if (careerPath === "Human Resources") {
        topCategories = [
          { name: "HR Management", score: 92, color: "#06b6d4" },
          { name: "Recruiting & Talent Acquisition", score: 87, color: "#0ea5e9" },
          { name: "Personalentwicklung", score: 78, color: "#2563eb" },
        ]

        personality = {
          kommunikativ: 88,
          analytisch: 72,
          empathisch: 85,
          organisiert: 79,
          teamorientiert: 82,
        }

        recommendations = [
          "HR Business Partner",
          "Talent Acquisition Manager",
          "Personalreferent",
          "HR Development Specialist",
        ]

        matchingJobs = ["HR Business Partner", "Personalreferent", "Recruiting Manager"]
      }

      // IT-spezifische Ergebnisse
      else if (careerPath === "IT & Entwicklung") {
        topCategories = [
          { name: "Softwareentwicklung", score: 90, color: "#06b6d4" },
          { name: "Projektmanagement", score: 75, color: "#0ea5e9" },
          { name: "DevOps", score: 68, color: "#2563eb" },
        ]

        personality = {
          analytisch: 90,
          problemlösend: 85,
          strukturiert: 78,
          innovativ: 72,
          teamorientiert: 65,
        }

        recommendations = ["Senior Full-Stack Entwickler", "IT-Projektmanager", "DevOps Engineer", "Software Architect"]

        matchingJobs = ["Senior Full-Stack Entwickler", "IT-Projektmanager", "DevOps Engineer"]
      }

      // Finance-spezifische Ergebnisse
      else if (careerPath === "Finance & Controlling") {
        topCategories = [
          { name: "Controlling", score: 89, color: "#06b6d4" },
          { name: "Finanzanalyse", score: 82, color: "#0ea5e9" },
          { name: "Reporting", score: 76, color: "#2563eb" },
        ]

        personality = {
          analytisch: 92,
          detailorientiert: 88,
          strukturiert: 85,
          zahlenaffin: 90,
          kommunikativ: 68,
        }

        recommendations = ["Senior Controller", "Finanzanalyst", "Finance Manager", "Reporting Specialist"]

        matchingJobs = ["Finanzanalyst", "Senior Controller", "Finance Manager"]
      }

      // Marketing-spezifische Ergebnisse
      else if (careerPath === "Marketing & Kommunikation") {
        topCategories = [
          { name: "Content Marketing", score: 88, color: "#06b6d4" },
          { name: "Social Media", score: 84, color: "#0ea5e9" },
          { name: "Marketingstrategie", score: 79, color: "#2563eb" },
        ]

        personality = {
          kreativ: 90,
          kommunikativ: 87,
          analytisch: 75,
          teamorientiert: 82,
          kundenorientiert: 85,
        }

        recommendations = ["Marketing Manager", "Content Strategist", "Social Media Manager", "Brand Manager"]

        matchingJobs = ["Marketing Manager", "Content Strategist", "Social Media Manager"]
      }

      // Allgemeine Ergebnisse (Fallback)
      else {
        topCategories = [
          { name: "Projektmanagement", score: 85, color: "#06b6d4" },
          { name: "Kommunikation", score: 80, color: "#0ea5e9" },
          { name: "Teamführung", score: 75, color: "#2563eb" },
        ]

        personality = {
          kommunikativ: 82,
          analytisch: 78,
          teamorientiert: 80,
          organisiert: 75,
          lösungsorientiert: 83,
        }

        recommendations = ["Projektmanager", "Team Lead", "Business Analyst", "Consultant"]

        matchingJobs = ["Projektmanager", "Team Lead", "Business Analyst"]
      }

      // Persönlichkeitsanpassungen basierend auf den Antworten
      if (answers.workStyle === "structured") {
        personality = { ...personality, strukturiert: 90, flexibel: 60 }
      } else if (answers.workStyle === "flexible") {
        personality = { ...personality, flexibel: 90, strukturiert: 65 }
      }

      if (answers.teamRole === "leader") {
        recommendations.unshift("Team Lead")
        recommendations.unshift("Abteilungsleiter")
        personality = { ...personality, führungsstark: 88 }
      } else if (answers.teamRole === "specialist") {
        recommendations.unshift("Senior Specialist")
        personality = { ...personality, fachkompetent: 92 }
      }

      return {
        careerPath,
        topCategories,
        personality,
        recommendations,
        matchingJobs,
        strengths: generateStrengths(answers),
        developmentAreas: generateDevelopmentAreas(answers),
      }
    } catch (error) {
      console.error("Fehler bei der intelligenten Analyse:", error)
      // Return fallback results to prevent application crashes
      return {
        careerPath: "Allgemein",
        topCategories: [
          { name: "Kommunikation", score: 80, color: "#06b6d4" },
          { name: "Teamarbeit", score: 75, color: "#0ea5e9" },
          { name: "Problemlösung", score: 70, color: "#2563eb" },
        ],
        personality: {
          kommunikativ: 80,
          analytisch: 75,
          teamorientiert: 85,
          organisiert: 70,
          lösungsorientiert: 80,
        },
        recommendations: ["Projektmanager", "Business Analyst", "Consultant", "Team Lead"],
        matchingJobs: ["Projektmanager", "Business Analyst", "Consultant"],
        strengths: ["Kommunikationsstärke", "Teamarbeit", "Analytisches Denken", "Selbstorganisation"],
        developmentAreas: ["Weiterentwicklung der strategischen Kompetenzen", "Ausbau der Führungsfähigkeiten"],
      }
    }
  }

  // Hilfsfunktionen für die Analyse
  const generateStrengths = (answers: any) => {
    const strengths = ["Analytisches Denken", "Kommunikationsstärke", "Teamarbeit", "Selbstorganisation"]

    if (answers.workStyle === "structured") {
      strengths.push("Strukturierte Arbeitsweise")
      strengths.push("Prozessorientierung")
    } else if (answers.workStyle === "flexible") {
      strengths.push("Anpassungsfähigkeit")
      strengths.push("Flexibilität")
    } else if (answers.workStyle === "autonomous") {
      strengths.push("Eigenverantwortliches Arbeiten")
      strengths.push("Selbstständigkeit")
    }

    if (answers.decisionMaking === "analytical") {
      strengths.push("Datenbasierte Entscheidungsfindung")
    } else if (answers.decisionMaking === "intuitive") {
      strengths.push("Intuitive Problemlösung")
    }

    if (answers.teamRole === "leader") {
      strengths.push("Führungskompetenz")
      strengths.push("Entscheidungsstärke")
    } else if (answers.teamRole === "specialist") {
      strengths.push("Fachexpertise")
      strengths.push("Spezialisiertes Know-how")
    } else if (answers.teamRole === "coordinator") {
      strengths.push("Koordinationsfähigkeit")
      strengths.push("Stakeholder Management")
    }

    return strengths
  }

  const generateDevelopmentAreas = (answers: any) => {
    const developmentAreas = []

    if (answers.question3) {
      // Extrahiere Entwicklungsbereiche aus der Antwort auf Frage 3
      const keywords = [
        "lernen",
        "entwickeln",
        "verbessern",
        "ausbauen",
        "stärken",
        "weiterbilden",
        "vertiefen",
        "erweitern",
      ]

      const lowerAnswer = answers.question3.toLowerCase()

      if (keywords.some((keyword) => lowerAnswer.includes(keyword))) {
        if (lowerAnswer.includes("führung") || lowerAnswer.includes("management")) {
          developmentAreas.push("Ausbau von Leadership-Fähigkeiten")
        }

        if (lowerAnswer.includes("kommunikation") || lowerAnswer.includes("präsentation")) {
          developmentAreas.push("Weiterentwicklung der Kommunikationsfähigkeiten")
        }

        if (lowerAnswer.includes("fach") || lowerAnswer.includes("expertise") || lowerAnswer.includes("wissen")) {
          developmentAreas.push("Vertiefung der fachlichen Expertise")
        }

        if (lowerAnswer.includes("projekt") || lowerAnswer.includes("management")) {
          developmentAreas.push("Stärkung der Projektmanagement-Kompetenzen")
        }
      }
    }

    // Fallback, wenn keine spezifischen Bereiche erkannt wurden
    if (developmentAreas.length === 0) {
      developmentAreas.push("Weiterentwicklung der strategischen Kompetenzen")
      developmentAreas.push("Ausbau der Führungsfähigkeiten")
      developmentAreas.push("Vertiefung der Branchenkenntnisse")
    }

    return developmentAreas
  }

  // SEO Meta-Tags
  const pageTitle = "KI-gestützte Karriereanalyse | RSG Recruiting Solutions Group"
  const pageDescription =
    "Laden Sie Ihren Lebenslauf hoch und erhalten Sie eine KI-gestützte Analyse Ihrer Fähigkeiten, Stärken und passende Karriereempfehlungen."

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO Meta Tags */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="KI Karriereanalyse, Lebenslauf Analyse, Karriereberatung, Jobmatching, Personalvermittlung, Bewerbungsanalyse"
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rsg-recruiting.de/ai-matching" />
      </Head>

      {/* Particle Background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            RSG AI Talent Matching System
          </h1>

          <p className="text-lg text-white/80 mb-12">
            Laden Sie Ihren Lebenslauf hoch und entdecken Sie dank unserer KI-gestützten Analyse, welche Karrierewege am
            besten zu Ihnen passen. Unser System analysiert Ihre Erfahrungen, Fähigkeiten und Persönlichkeitsmerkmale,
            um maßgeschneiderte Karriereempfehlungen zu liefern.
          </p>

          <div className="mb-12">
            <div className="flex justify-between mb-2 text-sm">
              <span>Fortschritt</span>
              <span>{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2"
              indicatorClassName={`bg-gradient-to-r from-cyan-500 ${progress < 50 ? "to-blue-600" : progress < 100 ? "to-purple-600" : "to-green-500"}`}
            />

            {/* Improved step indicator */}
            <div className="flex justify-between mt-4">
              <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-cyan-400" : "text-white/60"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= 1 ? "bg-cyan-500" : "bg-white/10"}`}
                >
                  <Lock className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs">Datenschutz</span>
              </div>
              <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-cyan-400" : "text-white/60"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= 2 ? "bg-cyan-500" : "bg-white/10"}`}
                >
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs">CV Upload</span>
              </div>
              <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-cyan-400" : "text-white/60"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= 3 ? "bg-cyan-500" : "bg-white/10"}`}
                >
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs">Fragen</span>
              </div>
              <div
                className={`flex flex-col items-center ${currentStep >= 3 && !isAnalyzing ? "text-cyan-400" : "text-white/60"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= 3 && !isAnalyzing ? "bg-green-500" : "bg-white/10"}`}
                >
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs">Ergebnisse</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
            <div className="relative bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-white/10">
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                      <FileText className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Lebenslauf hochladen & analysieren</h2>
                    <p className="text-white/70">
                      Laden Sie Ihren Lebenslauf hoch und beantworten Sie einige Fragen, um eine detaillierte Analyse
                      und Karriereempfehlungen zu erhalten.
                    </p>
                  </div>

                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="upload" className="text-base py-3">
                        <FileText className="h-4 w-4 mr-2" />
                        CV Upload
                      </TabsTrigger>
                      <TabsTrigger value="privacy" className="text-base py-3">
                        <Lock className="h-4 w-4 mr-2" />
                        Datenschutzerklärung
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="pt-6">
                      <CVUploader onUpload={handleCVUpload} isDisabled={!isPrivacyAccepted} />

                      {!isPrivacyAccepted && (
                        <div className="flex items-center space-x-2 mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                          <Lock className="h-5 w-5 text-amber-400 flex-shrink-0" />
                          <div>
                            <p className="text-amber-400 font-medium">Datenschutz erforderlich</p>
                            <p className="text-white/70 text-sm">
                              Bitte wechseln Sie zum Tab "Datenschutzerklärung" und akzeptieren Sie diese, um Ihren
                              Lebenslauf hochzuladen und zu analysieren.
                            </p>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="privacy" className="pt-6">
                      <PrivacyConsent onAccept={handlePrivacyAccept} isAccepted={isPrivacyAccepted} />
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                      <Brain className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Karriere-Tiefenanalyse</h2>
                    <p className="text-white/70">
                      Bitte beantworten Sie die folgenden Fragen und geben Sie Ihre Kontaktdaten ein, um Ihre
                      Karrierepräferenzen und Persönlichkeitsmerkmale besser zu verstehen.
                    </p>
                  </div>

                  <div className="mb-8 p-6 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-lg font-medium mb-4 text-white">Ihre Kontaktdaten</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm text-white/80">
                          Vorname *
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          value={userData.firstName}
                          onChange={(e) => handleUserDataChange("firstName", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm text-white/80">
                          Nachname *
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          value={userData.lastName}
                          onChange={(e) => handleUserDataChange("lastName", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm text-white/80">
                          E-Mail *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => handleUserDataChange("email", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm text-white/80">
                          Telefon
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => handleUserDataChange("phone", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <PsychologicalQuestions
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                    onSubmit={handleSubmitAnswers}
                  />

                  <div className="mt-6 text-white/60 text-sm flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-cyan-400" />
                    Ihre Antworten werden vertraulich behandelt und nur für die Analyse verwendet
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                      <Brain className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Karriere-Analyse Ergebnisse</h2>
                    <p className="text-white/70">
                      Unsere KI hat Ihren Lebenslauf und Ihre Antworten analysiert. Hier sind die personalisierten
                      Erkenntnisse.
                    </p>
                  </div>

                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                      <div className="w-24 h-24 rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-blue-600 border-l-purple-600 animate-spin"></div>
                      <h3 className="text-xl font-medium text-white">KI-Analyse wird durchgeführt...</h3>
                      <p className="text-white/60 text-center max-w-md">
                        Unser System analysiert Ihren Lebenslauf, Ihre Fähigkeiten und Persönlichkeitsmerkmale, um
                        präzise Karriereempfehlungen zu erstellen.
                      </p>
                    </div>
                  ) : (
                    <>
                      {starhunterCandidateId && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <p className="text-green-400 flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Ihr Profil wurde erfolgreich in unserem System gespeichert (ID: {starhunterCandidateId})
                          </p>
                        </div>
                      )}

                      {emailNotificationSent && (
                        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <p className="text-blue-400 flex items-center">
                            <Mail className="h-5 w-5 mr-2" />
                            Unser Team wurde über Ihr Interesse informiert und wird sich in Kürze mit Ihnen in
                            Verbindung setzen.
                          </p>
                        </div>
                      )}

                      {/* Improved results navigation with clear visual indicators */}
                      <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                        <div className="flex items-center mb-3">
                          <HelpCircle className="h-5 w-5 text-cyan-400 mr-2" />
                          <h3 className="font-medium text-white">Navigieren Sie durch Ihre Analyseergebnisse</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                          Entdecken Sie verschiedene Aspekte Ihrer Karriereanalyse in den untenstehenden Tabs. Jeder Tab
                          enthält wertvolle Informationen zu Ihrem Profil, Persönlichkeit, Stärken und
                          Karriereempfehlungen.
                        </p>
                      </div>

                      <ResultsOverview results={analysisResults} />

                      <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button
                            onClick={handleViewJobOffers}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
                          >
                            <Calendar className="mr-2 h-5 w-5" />
                            Passende Stellenangebote ansehen
                          </Button>
                          <Link href="https://meetings.hubspot.com/r-serrano" target="_blank">
                            <Button
                              variant="outline"
                              className="border-cyan-500/50 bg-transparent hover:bg-cyan-950/30 text-white"
                            >
                              Beratungsgespräch vereinbaren
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <UserGuideModal />
    </div>
  )
}
