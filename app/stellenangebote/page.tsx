"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { ArrowLeft, Search, Calendar, Briefcase, MapPin, Filter, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import ParticleBackground from "@/components/particle-background"

// Stellenangebot Typ
interface JobOffer {
  id: string
  title: string
  company: string
  location: string
  type: string
  category: string
  salary: string
  description: string
  requirements: string[]
  date: string
  isExclusive: boolean
  applyLink?: string
}

export default function Stellenangebote() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [aiAnalysisUsed, setAiAnalysisUsed] = useState(false)

  // Prüfen, ob der User von der AI-Analyse kommt
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const fromAi = searchParams.get("fromAi")
    if (fromAi === "true") {
      setAiAnalysisUsed(true)
    }
  }, [])

  // Beispiel-Stellenangebote
  const jobOffers: JobOffer[] = [
    {
      id: "job-1",
      title: "ERP-Spezialist mit Business Central & Power BI Fokus",
      company: "Exklusiver Suchauftrag für ein führendes Unternehmen im Retail-Bereich",
      location: "Frankfurt am Main",
      type: "Vollzeit",
      category: "IT-Spezialisten",
      salary: "80.000€ - 110.000€",
      description:
        "Für unseren Kunden, ein international agierendes Handelsunternehmen, suchen wir einen erfahrenen ERP-Spezialisten mit Fokus auf Microsoft Business Central. Sie werden die Weiterentwicklung des ERP-Systems verantworten und als Schnittstelle zwischen IT und Fachabteilungen fungieren.",
      requirements: [
        "Mehrjährige Erfahrung mit Microsoft Dynamics 365 Business Central/NAV",
        "Fundierte SQL-Kenntnisse und Erfahrung mit Power BI",
        "Verständnis von Geschäftsprozessen im Handelsumfeld",
        "Ausgeprägte analytische Fähigkeiten und strukturierte Arbeitsweise",
      ],
      date: "2024-04-01",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-2",
      title: "Senior KI-Ingenieur",
      company: "Exklusiver Suchauftrag für einen führenden KI-Technologieanbieter",
      location: "Berlin",
      type: "Vollzeit",
      category: "KI-Talentmatching",
      salary: "90.000€ - 120.000€",
      description:
        "Im Auftrag eines führenden Technologieanbieters im Bereich künstliche Intelligenz suchen wir exklusiv einen erfahrenen KI-Ingenieur. Sie werden an der Entwicklung und Implementierung von KI-Modellen zur Optimierung von Geschäftsprozessen arbeiten und mit interdisziplinären Teams zusammenarbeiten.",
      requirements: [
        "Master oder Promotion in Informatik, Maschinellem Lernen oder verwandten Bereichen",
        "5+ Jahre Erfahrung in der Entwicklung von KI-Lösungen",
        "Expertise in Python, TensorFlow und PyTorch",
        "Erfahrung mit Cloud-Plattformen (AWS, Azure, GCP)",
      ],
      date: "2024-04-01",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-3",
      title: "Projektmanager Digitalisierung",
      company: "Direkter Suchauftrag eines namhaften Automobilherstellers",
      location: "München",
      type: "Vollzeit",
      category: "Projektmanagement",
      salary: "75.000€ - 95.000€",
      description:
        "Im exklusiven Auftrag eines renommierten Automobilherstellers suchen wir einen erfahrenen Projektmanager für Digitalisierungsprojekte. Sie werden komplexe Projekte von der Konzeption bis zur Implementierung leiten und interdisziplinäre Teams koordinieren.",
      requirements: [
        "Abgeschlossenes Studium in Wirtschaftsinformatik oder vergleichbarer Qualifikation",
        "3+ Jahre Erfahrung im Projektmanagement",
        "Zertifizierungen wie PMP, PRINCE2 oder Scrum Master",
        "Erfahrung mit agilen Methoden und Tools",
      ],
      date: "2024-04-05",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-4",
      title: "Senior Full-Stack Entwickler",
      company: "Exklusiver Search für ein innovatives E-Commerce Unternehmen",
      location: "Hamburg",
      type: "Remote",
      category: "IT-Spezialisten",
      salary: "80.000€ - 110.000€",
      description:
        "Für einen wachstumsstarken E-Commerce Anbieter wurden wir exklusiv mit der Suche nach einem Senior Full-Stack Entwickler beauftragt. Sie werden an der Entwicklung und Wartung skalierbarer Webanwendungen arbeiten und eng mit Product Ownern und Designern zusammenarbeiten.",
      requirements: [
        "Fundierte Kenntnisse in JavaScript/TypeScript, React und Node.js",
        "Erfahrung mit Datenbanken (SQL und NoSQL)",
        "Verständnis von CI/CD-Pipelines und DevOps-Praktiken",
        "Mindestens 5 Jahre Berufserfahrung in der Softwareentwicklung",
      ],
      date: "2024-04-08",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-5",
      title: "Finanzanalyst",
      company: "Exklusiver Suchauftrag eines internationalen Finanzdienstleisters",
      location: "Frankfurt",
      type: "Vollzeit",
      category: "Finanztalente",
      salary: "65.000€ - 85.000€",
      description:
        "Im direkten Auftrag eines renommierten internationalen Finanzdienstleisters suchen wir exklusiv einen erfahrenen Finanzanalysten. Sie werden Finanzdaten analysieren, Berichte für das Management erstellen und bei der Budgetplanung unterstützen.",
      requirements: [
        "Abgeschlossenes Studium in Finanzwesen, BWL oder Wirtschaftsmathematik",
        "Erfahrung mit Finanzmodellierung und Datenanalyse",
        "Kenntnisse in Excel, SQL und Visualisierungstools",
        "Analytisches Denken und Problemlösungsfähigkeiten",
      ],
      date: "2024-04-10",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-6",
      title: "Executive Assistant",
      company: "Exklusiver Search für ein innovatives Technologieunternehmen",
      location: "Düsseldorf",
      type: "Teilzeit",
      category: "Assistenz & Support",
      salary: "45.000€ - 55.000€",
      description:
        "Für die Geschäftsführung eines innovativen Technologieunternehmens wurden wir exklusiv beauftragt, eine erfahrene Executive Assistant zu finden. Sie werden die Geschäftsführung bei administrativen Aufgaben unterstützen, Termine koordinieren und Präsentationen vorbereiten.",
      requirements: [
        "Mehrjährige Erfahrung als Executive Assistant",
        "Ausgezeichnete Organisations- und Kommunikationsfähigkeiten",
        "Sehr gute Englischkenntnisse in Wort und Schrift",
        "Diskretion und Zuverlässigkeit",
      ],
      date: "2024-04-12",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-7",
      title: "Sales Manager B2B",
      company: "Exklusive Personalsuche für einen führenden SaaS-Anbieter",
      location: "Köln",
      type: "Vollzeit",
      category: "Sales & Marketing",
      salary: "70.000€ - 90.000€ + Bonus",
      description:
        "Im exklusiven Auftrag eines führenden SaaS-Anbieters suchen wir einen erfahrenen Sales Manager für den B2B-Bereich. Sie werden Neukunden akquirieren, bestehende Kundenbeziehungen pflegen und Vertriebsstrategien entwickeln.",
      requirements: [
        "Nachweisliche Erfolge im B2B-Vertrieb",
        "Verhandlungsgeschick und überzeugendes Auftreten",
        "Kenntnisse in CRM-Systemen",
        "Reisebereitschaft (ca. 30%)",
      ],
      date: "2024-04-15",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-8",
      title: "Maschinenbauingenieur",
      company: "Exklusiv mandatierte Suche für einen Hidden Champion im Maschinenbau",
      location: "Stuttgart",
      type: "Vollzeit",
      category: "Engineering",
      salary: "65.000€ - 85.000€",
      description:
        "Für einen mittelständischen Hidden Champion im Maschinenbau wurden wir exklusiv mit der Suche nach einem erfahrenen Maschinenbauingenieur beauftragt. Sie werden mechanische Komponenten und Systeme entwickeln und optimieren und in interdisziplinären Teams an Kundenprojekten arbeiten.",
      requirements: [
        "Abgeschlossenes Studium im Maschinenbau oder verwandten Ingenieurwissenschaften",
        "Erfahrung mit CAD-Software (vorzugsweise SolidWorks oder Siemens NX)",
        "Kenntnisse in der Fertigungstechnik",
        "Analytisches Denken und Problemlösungsfähigkeiten",
      ],
      date: "2024-04-18",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    // Neue Finance-Stellen
    {
      id: "job-9",
      title: "Senior Controller",
      company: "Exklusiver Suchauftrag für einen internationalen Industriekonzern",
      location: "München",
      type: "Vollzeit",
      category: "Finanztalente",
      salary: "85.000€ - 105.000€",
      description:
        "Für einen führenden Industriekonzern suchen wir exklusiv einen erfahrenen Senior Controller. In dieser Position verantworten Sie das operative und strategische Controlling und unterstützen die Geschäftsführung bei wichtigen unternehmerischen Entscheidungen durch fundierte Analysen und Reportings.",
      requirements: [
        "Abgeschlossenes wirtschaftswissenschaftliches Studium mit Schwerpunkt Controlling/Finance",
        "Mindestens 5 Jahre Berufserfahrung im Controlling eines internationalen Unternehmens",
        "Sehr gute Kenntnisse in SAP FI/CO und fortgeschrittene Excel-Kenntnisse",
        "Erfahrung in der Implementierung und Optimierung von Controlling-Prozessen",
        "Fließende Deutsch- und Englischkenntnisse in Wort und Schrift",
      ],
      date: "2024-04-20",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-10",
      title: "Finance Manager",
      company: "Exklusiver Suchauftrag für ein wachstumsstarkes Tech-Unternehmen",
      location: "Berlin",
      type: "Vollzeit",
      category: "Finanztalente",
      salary: "90.000€ - 120.000€",
      description:
        "Im Auftrag eines schnell wachsenden Tech-Unternehmens suchen wir einen erfahrenen Finance Manager. Sie werden die finanzielle Steuerung des Unternehmens verantworten, Finanzstrategien entwickeln und die Geschäftsführung in allen finanziellen Belangen beraten.",
      requirements: [
        "Abgeschlossenes Studium der Wirtschaftswissenschaften oder vergleichbare Qualifikation",
        "Mindestens 7 Jahre Berufserfahrung im Finanzbereich, davon 3+ Jahre in leitender Position",
        "Umfassende Kenntnisse in der Finanzplanung, Budgetierung und im Reporting",
        "Erfahrung mit Finanzierungsrunden und Investor Relations von Vorteil",
        "Ausgezeichnete Kommunikationsfähigkeiten und strategisches Denken",
      ],
      date: "2024-04-22",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-11",
      title: "Treasury Manager",
      company: "Exklusiver Suchauftrag für ein börsennotiertes Unternehmen",
      location: "Frankfurt am Main",
      type: "Vollzeit",
      category: "Finanztalente",
      salary: "80.000€ - 100.000€",
      description:
        "Für ein börsennotiertes Unternehmen suchen wir exklusiv einen erfahrenen Treasury Manager. In dieser Position verantworten Sie das Cash- und Liquiditätsmanagement, das Währungsrisikomanagement sowie die Optimierung der Finanzierungsstruktur des Unternehmens.",
      requirements: [
        "Abgeschlossenes Studium der Wirtschaftswissenschaften mit Schwerpunkt Finance",
        "Mindestens 5 Jahre Berufserfahrung im Treasury Management",
        "Fundierte Kenntnisse im Cash Management, Währungsmanagement und in der Finanzierung",
        "Erfahrung mit Treasury Management Systemen und SAP",
        "Sehr gute Englischkenntnisse in Wort und Schrift",
      ],
      date: "2024-04-23",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    // Neue Sales-Stellen
    {
      id: "job-12",
      title: "Key Account Manager Enterprise",
      company: "Exklusiver Suchauftrag für einen führenden Cloud-Anbieter",
      location: "Düsseldorf",
      type: "Vollzeit",
      category: "Sales & Marketing",
      salary: "85.000€ - 110.000€ + attraktive Provision",
      description:
        "Für einen führenden Cloud-Anbieter suchen wir exklusiv einen erfahrenen Key Account Manager für den Enterprise-Bereich. Sie werden strategische Kundenbeziehungen zu Großkunden aufbauen und pflegen, komplexe Verkaufsprozesse steuern und maßgeschneiderte Lösungen entwickeln.",
      requirements: [
        "Nachweisliche Erfolge im B2B-Vertrieb, idealerweise im Enterprise-Segment",
        "Mindestens 5 Jahre Erfahrung im Vertrieb von IT- oder Cloud-Lösungen",
        "Exzellente Verhandlungsfähigkeiten und strategisches Denken",
        "Erfahrung in der Betreuung von Großkunden und im Stakeholder-Management",
        "Sehr gute Deutsch- und Englischkenntnisse",
      ],
      date: "2024-04-24",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-13",
      title: "Sales Director DACH",
      company: "Exklusiver Suchauftrag für ein internationales Software-Unternehmen",
      location: "München",
      type: "Vollzeit",
      category: "Sales & Marketing",
      salary: "120.000€ - 150.000€ + Bonus",
      description:
        "Im Auftrag eines internationalen Software-Unternehmens suchen wir einen erfahrenen Sales Director für die DACH-Region. Sie werden die Vertriebsstrategie für Deutschland, Österreich und die Schweiz entwickeln und umsetzen, ein Vertriebsteam führen und die Umsatzziele der Region verantworten.",
      requirements: [
        "Nachweisliche Erfolge in der Vertriebsleitung, idealerweise im Software- oder SaaS-Bereich",
        "Mindestens 8 Jahre Vertriebserfahrung, davon 3+ Jahre in leitender Position",
        "Erfahrung im Aufbau und in der Führung von Vertriebsteams",
        "Strategisches Denken und ausgeprägte Führungsqualitäten",
        "Exzellente Kommunikationsfähigkeiten und Verhandlungsgeschick",
        "Fließende Deutsch- und Englischkenntnisse",
      ],
      date: "2024-04-25",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-14",
      title: "Business Development Manager Healthcare",
      company: "Exklusiver Suchauftrag für ein innovatives MedTech-Unternehmen",
      location: "Berlin",
      type: "Vollzeit",
      category: "Sales & Marketing",
      salary: "75.000€ - 95.000€ + Provision",
      description:
        "Für ein innovatives MedTech-Unternehmen suchen wir exklusiv einen Business Development Manager mit Fokus auf den Healthcare-Sektor. Sie werden neue Geschäftsmöglichkeiten identifizieren, strategische Partnerschaften aufbauen und die Marktdurchdringung im Gesundheitssektor vorantreiben.",
      requirements: [
        "Nachweisliche Erfolge im Business Development, idealerweise im Healthcare-Bereich",
        "Fundiertes Verständnis des deutschen Gesundheitsmarktes und seiner Stakeholder",
        "Erfahrung im Aufbau von Partnerschaften mit Kliniken, Ärzten und Gesundheitsorganisationen",
        "Ausgezeichnete Netzwerkfähigkeiten und strategisches Denken",
        "Idealerweise Hintergrund oder Erfahrung im medizinischen oder pharmazeutischen Bereich",
      ],
      date: "2024-04-26",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    // Neue Prompt Engineering Stellen
    {
      id: "job-15",
      title: "Senior Prompt Engineer",
      company: "Exklusiver Suchauftrag für ein führendes KI-Unternehmen",
      location: "Berlin",
      type: "Vollzeit",
      category: "KI-Talentmatching",
      salary: "90.000€ - 120.000€",
      description:
        "Für ein führendes KI-Unternehmen suchen wir exklusiv einen erfahrenen Senior Prompt Engineer. Sie werden komplexe Prompts für Large Language Models (LLMs) entwickeln und optimieren, um die Leistung und Genauigkeit der KI-Systeme zu verbessern und maßgeschneiderte KI-Lösungen für verschiedene Anwendungsfälle zu schaffen.",
      requirements: [
        "Nachweisliche Erfahrung in der Entwicklung und Optimierung von Prompts für LLMs wie GPT-4, Claude oder Llama",
        "Tiefes Verständnis der Funktionsweise von Large Language Models und deren Stärken und Schwächen",
        "Erfahrung mit Prompt Engineering Techniken wie Chain-of-Thought, Few-Shot Learning und Instruction Tuning",
        "Idealerweise Hintergrund in NLP, Computational Linguistics oder verwandten Bereichen",
        "Fähigkeit, komplexe Anforderungen in effektive Prompts zu übersetzen",
        "Erfahrung in der Zusammenarbeit mit Produktteams und Stakeholdern",
      ],
      date: "2024-04-27",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-16",
      title: "AI Content Specialist / Prompt Engineer",
      company: "Exklusiver Suchauftrag für ein innovatives Content-Marketing-Unternehmen",
      location: "Hamburg",
      type: "Remote",
      category: "KI-Talentmatching",
      salary: "70.000€ - 90.000€",
      description:
        "Für ein innovatives Content-Marketing-Unternehmen suchen wir exklusiv einen AI Content Specialist mit Fokus auf Prompt Engineering. Sie werden KI-gestützte Content-Strategien entwickeln, Prompts für die Content-Erstellung optimieren und die Integration von KI-Tools in den Content-Workflow vorantreiben.",
      requirements: [
        "Erfahrung in der Erstellung und Optimierung von Prompts für Content-Generierung mit LLMs",
        "Fundierte Kenntnisse im Content Marketing und in der Content-Strategie",
        "Verständnis von SEO-Prinzipien und deren Anwendung in KI-generiertem Content",
        "Kreativität und exzellente Schreibfähigkeiten",
        "Erfahrung mit KI-Tools wie ChatGPT, Claude, Midjourney oder DALL-E",
        "Idealerweise Hintergrund in Marketing, Journalismus oder Kommunikation",
      ],
      date: "2024-04-28",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
    {
      id: "job-17",
      title: "LLM Optimization Engineer",
      company: "Exklusiver Suchauftrag für ein KI-Forschungsunternehmen",
      location: "München",
      type: "Vollzeit",
      category: "KI-Talentmatching",
      salary: "95.000€ - 130.000€",
      description:
        "Für ein führendes KI-Forschungsunternehmen suchen wir exklusiv einen LLM Optimization Engineer mit Fokus auf Prompt Engineering und Modelloptimierung. Sie werden an der Verbesserung der Leistung von Large Language Models arbeiten, Prompt-Strategien entwickeln und die Integration von LLMs in verschiedene Anwendungsfälle optimieren.",
      requirements: [
        "Tiefgreifende Erfahrung mit Large Language Models und deren Optimierung",
        "Fundierte Kenntnisse in Prompt Engineering, Fine-Tuning und RLHF (Reinforcement Learning from Human Feedback)",
        "Erfahrung in der Entwicklung von Evaluierungsmetriken für LLM-Outputs",
        "Starke Programmierkenntnisse in Python und Erfahrung mit ML-Frameworks wie PyTorch oder TensorFlow",
        "Idealerweise Master oder PhD in Informatik, Maschinellem Lernen oder verwandten Bereichen",
        "Verständnis von ethischen Aspekten und Bias in KI-Systemen",
      ],
      date: "2024-04-29",
      isExclusive: true,
      applyLink:
        "https://lacar-associate-employee.starhunter.software/Headhunter/project/job-ad/hash/67fd48cb781e7/lang/55084dc43958d",
    },
  ]

  // Alle verfügbaren Kategorien, Typen und Standorte
  const categories = Array.from(new Set(jobOffers.map((job) => job.category)))
  const types = Array.from(new Set(jobOffers.map((job) => job.type)))
  const locations = Array.from(new Set(jobOffers.map((job) => job.location)))

  // Gefilterte Stellenangebote
  const filteredJobs = jobOffers.filter((job) => {
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.category)
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type)
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location)

    return matchesSearch && matchesCategory && matchesType && matchesLocation
  })

  // Kategorie-Filter umschalten
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Typ-Filter umschalten
  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Standort-Filter umschalten
  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]))
  }

  // Filter zurücksetzen
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedTypes([])
    setSelectedLocations([])
  }

  // Animation beim Laden
  useEffect(() => {
    if (titleRef.current && contentRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" },
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Particle Background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Link>

        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
        >
          Exklusive Stellenangebote unserer Kunden
        </h1>

        <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8 text-center">
          Als spezialisierte Personalvermittlung wurden wir von führenden Unternehmen exklusiv beauftragt, die besten
          Talente für diese Positionen zu finden. Entdecken Sie hier unsere aktuellen Suchaufträge.
        </p>

        {aiAnalysisUsed && (
          <div className="mb-8 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
            <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10 flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-4 flex-shrink-0">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">KI-Analyse erfolgreich abgeschlossen</h3>
                <p className="text-white/80">
                  Basierend auf Ihrer KI-Analyse haben wir diese Stellenangebote für Sie gefiltert. Unsere Suchaufträge
                  passen optimal zu Ihrem Profil!
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={contentRef} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-2/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                type="text"
                placeholder="Suche nach Stellenangeboten, Unternehmen oder Schlüsselwörtern..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="border border-white/10 bg-white/5 hover:bg-white/10 text-white"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter {isFilterOpen ? "ausblenden" : "anzeigen"}
              </Button>

              {(selectedCategories.length > 0 || selectedTypes.length > 0 || selectedLocations.length > 0) && (
                <Button variant="ghost" onClick={resetFilters} className="text-white/70 hover:text-white">
                  <X className="mr-2 h-4 w-4" />
                  Filter zurücksetzen
                </Button>
              )}
            </div>
          </div>

          {isFilterOpen && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <div>
                <h3 className="text-lg font-medium mb-3 text-white flex items-center">
                  <Briefcase className="mr-2 h-4 w-4 text-cyan-400" />
                  Kategorie
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm font-medium text-white/80 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-white flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-cyan-400" />
                  Anstellungsart
                </h3>
                <div className="space-y-2">
                  {types.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => toggleType(type)}
                        className="border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm font-medium text-white/80 cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-white flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-cyan-400" />
                  Standort
                </h3>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <div key={location} className="flex items-center">
                      <Checkbox
                        id={`location-${location}`}
                        checked={selectedLocations.includes(location)}
                        onCheckedChange={() => toggleLocation(location)}
                        className="border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                      <label
                        htmlFor={`location-${location}`}
                        className="ml-2 text-sm font-medium text-white/80 cursor-pointer"
                      >
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {job.title}
                        </h3>
                        <p className="text-white/70 mt-1">{job.company}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded-full">
                          {job.category}
                        </span>
                        <span className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full">{job.type}</span>
                        <span className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-white/80">{job.description}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-white font-medium mb-2">Anforderungen:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-white/70">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-3">
                          <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Gehaltsspanne</p>
                          <p className="font-medium text-white">{job.salary}</p>
                        </div>
                      </div>
                      {job.applyLink ? (
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                            Jetzt bewerben
                          </Button>
                        </a>
                      ) : (
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                          Jetzt bewerben
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <p className="text-xl font-medium text-white mb-2">Keine Stellenangebote gefunden</p>
                <p className="text-white/70 max-w-lg mx-auto mb-6">
                  Leider wurden keine Stellenangebote gefunden, die Ihren Filterkriterien entsprechen. Bitte passen Sie
                  Ihre Filter an oder versuchen Sie es mit anderen Suchbegriffen.
                </p>
                <Button variant="outline" onClick={resetFilters} className="border-cyan-500/50 text-white">
                  Filter zurücksetzen
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
