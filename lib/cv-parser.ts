/**
 * Parst den Inhalt eines Lebenslaufs mit fortschrittlicher Analyse
 */
export async function parseCV(file: File): Promise<any> {
  // In einer echten Implementierung würden wir hier eine CV-Parsing-Bibliothek verwenden
  // oder einen externen Dienst aufrufen, um den Lebenslauf zu analysieren

  // Für diese Demo simulieren wir das Parsing
  const text = await file.text()

  // Erweiterte Extraktion von Schlüsselwörtern und Kontext
  const skills = extractSkills(text)
  const education = extractEducation(text)
  const experience = extractExperience(text)

  // Neue Funktionen für besseres Matching
  const careerPath = identifyCareerPath(text, skills, experience)
  const industryExperience = extractIndustryExperience(text)
  const seniorityLevel = determineSeniorityLevel(experience)
  const functionalAreas = identifyFunctionalAreas(text, skills, experience)

  return {
    skills,
    education,
    experience,
    careerPath,
    industryExperience,
    seniorityLevel,
    functionalAreas,
    rawText: text.substring(0, 1000), // Begrenzen auf 1000 Zeichen für die Demo
  }
}

function extractSkills(text: string): string[] {
  // Erweiterte Skill-Extraktion mit Kategorisierung
  const hrSkills = [
    "Recruiting",
    "Personalentwicklung",
    "Personalmanagement",
    "Arbeitsrecht",
    "Onboarding",
    "Offboarding",
    "Employer Branding",
    "Talent Acquisition",
    "Compensation & Benefits",
    "Performance Management",
    "HR-Strategie",
    "Personalplanung",
    "Mitarbeiterbetreuung",
    "Gehaltsabrechnung",
    "Zeiterfassung",
    "Betriebsrat",
    "Tarifverträge",
    "Weiterbildung",
    "Personalcontrolling",
  ]

  const itSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "PHP",
    "SQL",
    "NoSQL",
    "MongoDB",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Git",
    "DevOps",
    "Frontend",
    "Backend",
    "Fullstack",
  ]

  const financeSkills = [
    "Controlling",
    "Buchhaltung",
    "Bilanzierung",
    "Finanzanalyse",
    "Reporting",
    "Budgetierung",
    "Forecasting",
    "SAP FI",
    "IFRS",
    "HGB",
    "Risikomanagement",
    "Treasury",
    "Cash Management",
    "Investitionsrechnung",
    "Kostenrechnung",
  ]

  const marketingSkills = [
    "Content Marketing",
    "SEO",
    "SEA",
    "Social Media",
    "Kampagnenmanagement",
    "Marktforschung",
    "Branding",
    "CRM",
    "E-Mail-Marketing",
    "Conversion Optimization",
    "Google Analytics",
    "Adobe Analytics",
    "Marketingstrategie",
    "Produktmarketing",
  ]

  const managementSkills = [
    "Führung",
    "Projektmanagement",
    "Change Management",
    "Strategieentwicklung",
    "Prozessoptimierung",
    "Teamleitung",
    "Mitarbeiterführung",
    "Budgetverantwortung",
    "Verhandlungsführung",
    "Stakeholder Management",
    "Leadership",
    "Agile",
    "Scrum",
  ]

  const softSkills = [
    "Kommunikation",
    "Teamarbeit",
    "Präsentation",
    "Verhandlung",
    "Konfliktmanagement",
    "Zeitmanagement",
    "Problemlösung",
    "Kreativität",
    "Analytisches Denken",
    "Entscheidungsfindung",
    "Belastbarkeit",
    "Flexibilität",
    "Kundenorientierung",
  ]

  // Alle Skills in einem Array zusammenfassen
  const allSkills = [...hrSkills, ...itSkills, ...financeSkills, ...marketingSkills, ...managementSkills, ...softSkills]

  // Gefundene Skills mit Kategorien
  const foundSkills = allSkills.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()))

  // Kategorisierte Skills zurückgeben
  return foundSkills
}

function extractEducation(text: string): any[] {
  // Verbesserte Bildungsextraktion mit Erkennung von Abschlüssen und Fachrichtungen
  const educationKeywords = [
    "universität",
    "hochschule",
    "fachhochschule",
    "bachelor",
    "master",
    "diplom",
    "promotion",
    "doktor",
    "phd",
    "studium",
    "ausbildung",
    "weiterbildung",
    "zertifizierung",
  ]

  const degrees = [
    "Bachelor of Arts",
    "Bachelor of Science",
    "Master of Arts",
    "Master of Science",
    "Diplom",
    "Diplom-Kaufmann",
    "Diplom-Kauffrau",
    "Diplom-Betriebswirt",
    "Diplom-Informatiker",
    "Diplom-Ingenieur",
    "MBA",
    "Dr.",
    "PhD",
  ]

  const fields = [
    "Betriebswirtschaft",
    "BWL",
    "Wirtschaftswissenschaften",
    "Personalmanagement",
    "Human Resources",
    "Informatik",
    "Wirtschaftsinformatik",
    "Psychologie",
    "Ingenieurwesen",
    "Rechtswissenschaften",
    "Kommunikation",
    "Marketing",
  ]

  // Prüfen, ob Bildungsinformationen im Text vorhanden sind
  if (educationKeywords.some((keyword) => text.toLowerCase().includes(keyword.toLowerCase()))) {
    // Hier würde in einer echten Implementierung eine komplexe Analyse stattfinden
    // Für die Demo geben wir ein simuliertes Ergebnis zurück

    // Erkennen des höchsten Abschlusses
    const detectedDegree = degrees.find((degree) => text.includes(degree)) || "Hochschulabschluss"

    // Erkennen der Fachrichtung
    const detectedField = fields.find((field) => text.includes(field)) || "Fachrichtung nicht eindeutig erkannt"

    return [
      {
        degree: detectedDegree,
        field: detectedField,
        institution: "Erkannte Institution",
        year: "Erkanntes Jahr",
      },
    ]
  }

  return []
}

function extractExperience(text: string): any[] {
  // Verbesserte Berufserfahrungsextraktion mit Positionslevels und Verantwortlichkeiten
  const experienceKeywords = [
    "erfahrung",
    "berufserfahrung",
    "tätigkeit",
    "position",
    "stelle",
    "job",
    "arbeit",
    "beschäftigung",
    "funktion",
    "verantwortlich",
    "leitung",
    "führung",
  ]

  const positionLevels = [
    { level: "C-Level", keywords: ["CEO", "CFO", "CTO", "COO", "Geschäftsführer", "Vorstand"] },
    { level: "Senior Management", keywords: ["Direktor", "Leiter", "Head of", "Senior Manager"] },
    { level: "Middle Management", keywords: ["Manager", "Teamleiter", "Abteilungsleiter", "Projektleiter"] },
    { level: "Professional", keywords: ["Referent", "Spezialist", "Berater", "Consultant"] },
    { level: "Junior", keywords: ["Junior", "Assistent", "Trainee", "Werkstudent"] },
  ]

  // Prüfen, ob Berufserfahrung im Text vorhanden ist
  if (experienceKeywords.some((keyword) => text.toLowerCase().includes(keyword.toLowerCase()))) {
    // Hier würde in einer echten Implementierung eine komplexe Analyse stattfinden
    // Für die Demo geben wir ein simuliertes Ergebnis zurück

    // Erkennen des Positionslevels
    let detectedLevel = "Professional"
    for (const levelInfo of positionLevels) {
      if (levelInfo.keywords.some((keyword) => text.includes(keyword))) {
        detectedLevel = levelInfo.level
        break
      }
    }

    return [
      {
        position: "Erkannte Position",
        level: detectedLevel,
        company: "Erkanntes Unternehmen",
        duration: "Erkannte Dauer",
        responsibilities: ["Verantwortlichkeit 1", "Verantwortlichkeit 2"],
      },
    ]
  }

  return []
}

// Neue Funktionen für besseres Matching

function identifyCareerPath(text: string, skills: string[], experience: any[]): string {
  // Identifiziert den Karrierepfad basierend auf Lebenslauf, Skills und Erfahrung

  // HR-bezogene Keywords
  const hrKeywords = [
    "HR",
    "Human Resources",
    "Personalwesen",
    "Personalmanagement",
    "Recruiting",
    "Talent Acquisition",
    "Personalentwicklung",
    "Personalreferent",
    "HR Business Partner",
    "Personalabteilung",
    "Personalleiter",
    "Personalberatung",
    "Personalvermittlung",
  ]

  // IT-bezogene Keywords
  const itKeywords = [
    "Entwickler",
    "Programmierer",
    "Software",
    "IT-Projekt",
    "Systemadministrator",
    "Datenbank",
    "Netzwerk",
    "DevOps",
    "Cloud",
    "Informatik",
    "Entwicklung",
    "Coding",
  ]

  // Finance-bezogene Keywords
  const financeKeywords = [
    "Finanzen",
    "Controlling",
    "Buchhaltung",
    "Rechnungswesen",
    "Bilanzierung",
    "Finanzanalyse",
    "Wirtschaftsprüfung",
    "Steuer",
    "Banking",
    "Versicherung",
  ]

  // Marketing-bezogene Keywords
  const marketingKeywords = [
    "Marketing",
    "Vertrieb",
    "Sales",
    "Kommunikation",
    "PR",
    "Öffentlichkeitsarbeit",
    "Werbung",
    "Brand",
    "Marke",
    "Kampagne",
    "Content",
    "Social Media",
  ]

  // Zählen der Übereinstimmungen für jeden Bereich
  let hrCount = 0
  let itCount = 0
  let financeCount = 0
  let marketingCount = 0

  // Text auf Keywords prüfen
  const lowerText = text.toLowerCase()
  hrKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword.toLowerCase())) hrCount++
  })

  itKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword.toLowerCase())) itCount++
  })

  financeKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword.toLowerCase())) financeCount++
  })

  marketingKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword.toLowerCase())) marketingCount++
  })

  // Skills auf Bereiche prüfen
  const hrSkills = ["Recruiting", "Personalentwicklung", "Arbeitsrecht", "Onboarding", "Employer Branding"]
  const itSkills = ["JavaScript", "Python", "Java", "SQL", "AWS", "Docker", "Frontend", "Backend"]
  const financeSkills = ["Controlling", "Buchhaltung", "Bilanzierung", "SAP FI", "IFRS"]
  const marketingSkills = ["Content Marketing", "SEO", "Social Media", "CRM", "Branding"]

  skills.forEach((skill) => {
    if (hrSkills.includes(skill)) hrCount += 2
    if (itSkills.includes(skill)) itCount += 2
    if (financeSkills.includes(skill)) financeCount += 2
    if (marketingSkills.includes(skill)) marketingCount += 2
  })

  // Bestimmen des wahrscheinlichsten Karrierepfads
  const maxCount = Math.max(hrCount, itCount, financeCount, marketingCount)

  if (maxCount === hrCount) return "Human Resources"
  if (maxCount === itCount) return "IT & Entwicklung"
  if (maxCount === financeCount) return "Finance & Controlling"
  if (maxCount === marketingCount) return "Marketing & Kommunikation"

  return "Allgemein"
}

function extractIndustryExperience(text: string): string[] {
  // Extrahiert Branchenerfahrung aus dem Lebenslauf

  const industries = [
    "Automobilindustrie",
    "Banken",
    "Beratung",
    "Chemie",
    "Dienstleistung",
    "E-Commerce",
    "Einzelhandel",
    "Elektronik",
    "Energie",
    "Finanzen",
    "Gesundheitswesen",
    "Handel",
    "Immobilien",
    "IT",
    "Konsumgüter",
    "Logistik",
    "Luftfahrt",
    "Maschinenbau",
    "Medien",
    "Öffentlicher Dienst",
    "Pharma",
    "Telekommunikation",
    "Tourismus",
    "Versicherung",
  ]

  return industries.filter((industry) => text.toLowerCase().includes(industry.toLowerCase()))
}

function determineSeniorityLevel(experience: any[]): string {
  // Bestimmt das Senioritätslevel basierend auf der Berufserfahrung

  if (experience.length === 0) return "Junior"

  // In einer echten Implementierung würde hier eine komplexe Analyse stattfinden
  // Für die Demo verwenden wir das erkannte Level aus der Erfahrung

  const levels = experience.map((exp) => exp.level)

  if (levels.includes("C-Level")) return "Executive"
  if (levels.includes("Senior Management")) return "Senior"
  if (levels.includes("Middle Management")) return "Mid-Level"
  if (levels.includes("Professional")) return "Professional"

  return "Junior"
}

function identifyFunctionalAreas(text: string, skills: string[], experience: any[]): string[] {
  // Identifiziert funktionale Bereiche basierend auf Lebenslauf, Skills und Erfahrung

  const functionalAreas = [
    {
      area: "Personalrekrutierung",
      keywords: ["Recruiting", "Talent Acquisition", "Personalgewinnung", "Stellenausschreibung", "Bewerbermanagement"],
    },
    {
      area: "Personalentwicklung",
      keywords: ["Weiterbildung", "Training", "Entwicklungsprogramm", "Karriereplanung", "Potenzialanalyse"],
    },
    { area: "Arbeitsrecht", keywords: ["Arbeitsrecht", "Arbeitsvertrag", "Betriebsrat", "Tarifvertrag", "Kündigung"] },
    { area: "Softwareentwicklung", keywords: ["Programmierung", "Entwicklung", "Coding", "Software", "Anwendung"] },
    { area: "Projektmanagement", keywords: ["Projektleitung", "Projektplanung", "Projektsteuerung", "Agile", "Scrum"] },
    { area: "Finanzen", keywords: ["Controlling", "Buchhaltung", "Bilanzierung", "Finanzplanung", "Reporting"] },
    { area: "Marketing", keywords: ["Marketingstrategie", "Kampagne", "Marktanalyse", "Werbung", "Markenführung"] },
    { area: "Vertrieb", keywords: ["Verkauf", "Kundenakquise", "Account Management", "Vertriebsstrategie", "CRM"] },
    {
      area: "Führung",
      keywords: ["Führungskraft", "Teamleitung", "Management", "Personalverantwortung", "Führungserfahrung"],
    },
  ]

  const identifiedAreas = []

  // Text auf Keywords prüfen
  const lowerText = text.toLowerCase()
  for (const areaInfo of functionalAreas) {
    if (areaInfo.keywords.some((keyword) => lowerText.includes(keyword.toLowerCase()))) {
      identifiedAreas.push(areaInfo.area)
    }
  }

  return identifiedAreas
}
