import type React from "react"
import type { Metadata } from "next"

// Aktualisiere die Metadata für die AI-Matching-Seite
export const metadata: Metadata = {
  title: "KI-Talent-Matching & Karriereanalyse | RSG Recruiting Solutions Group",
  description:
    "Nutzen Sie unser KI-gestütztes Talent-Matching für Ihre Karriere. Laden Sie Ihren Lebenslauf hoch und erhalten Sie eine präzise Analyse Ihrer Stärken und passende Jobempfehlungen.",
  keywords:
    "KI-Talent-Matching, Karriereanalyse, Lebenslauf-Analyse, Berufliche Stärken, Karriereempfehlungen, Personalvermittlung, Recruiting, Jobsuche",
  openGraph: {
    title: "KI-Talent-Matching & Karriereanalyse | RSG Recruiting Solutions Group",
    description:
      "Nutzen Sie unser KI-gestütztes Talent-Matching für Ihre Karriere. Laden Sie Ihren Lebenslauf hoch und erhalten Sie eine präzise Analyse Ihrer Stärken und passende Jobempfehlungen.",
    url: "https://www.rsg-recruiting.de/ai-matching",
    type: "website",
    images: [
      {
        url: "https://www.rsg-recruiting.de/images/ai-matching-preview.jpg",
        width: 1200,
        height: 630,
        alt: "KI-Talent-Matching System der RSG Recruiting Solutions Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KI-Talent-Matching & Karriereanalyse | RSG Recruiting Solutions Group",
    description: "Nutzen Sie unser KI-gestütztes Talent-Matching für Ihre Karriere.",
    images: ["https://www.rsg-recruiting.de/images/ai-matching-preview.jpg"],
  },
}

export default function AIMatchingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
