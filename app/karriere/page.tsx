import type { Metadata } from "next"
import KarriereClient from "./KarriereClient"

export const metadata: Metadata = {
  title: "Karriere bei RSG | Jobs im Recruiting und Personalwesen",
  description:
    "Entdecken Sie attraktive Karrieremöglichkeiten bei RSG Recruiting. Werden Sie Teil unseres Teams und gestalten Sie die Zukunft der Personalvermittlung zum Fixpreis mit.",
  keywords: "Karriere, Jobs, Recruiting, Personalvermittlung, Stellenangebote, Bewerbung, Arbeitgeber, Headhunting",
  openGraph: {
    title: "Karriere bei RSG | Jobs im Recruiting und Personalwesen",
    description:
      "Entdecken Sie attraktive Karrieremöglichkeiten bei RSG Recruiting. Werden Sie Teil unseres Teams und gestalten Sie die Zukunft der Personalvermittlung zum Fixpreis mit.",
    url: "https://www.rsg-recruiting.de/karriere",
    type: "website",
  },
}

export default function Karriere() {
  return <KarriereClient />
}
