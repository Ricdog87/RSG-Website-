import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KI-Talent-Matching | RSG Recruiting Solutions Group",
  description:
    "Entdecken Sie mit unserem KI-gestützten Talent-Matching-System Ihre idealen Karrierewege. Laden Sie Ihren Lebenslauf hoch und erhalten Sie eine detaillierte Analyse Ihrer Stärken und passende Jobempfehlungen.",
  keywords:
    "KI-Talent-Matching, Karriereanalyse, Lebenslauf-Analyse, Berufliche Stärken, Karriereempfehlungen, Personalvermittlung, Recruiting, Jobsuche",
  openGraph: {
    title: "KI-Talent-Matching | RSG Recruiting Solutions Group",
    description:
      "Entdecken Sie mit unserem KI-gestützten Talent-Matching-System Ihre idealen Karrierewege. Laden Sie Ihren Lebenslauf hoch und erhalten Sie eine detaillierte Analyse Ihrer Stärken und passende Jobempfehlungen.",
    url: "https://www.rsg-recruiting.de/ai-matching",
  },
}

export default function AIMatchingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
