import VakanzkostenRechnerClient from "./VakanzkostenRechnerClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vakanzkosten-Rechner | Kosten unbesetzter Stellen berechnen | RSG Recruiting",
  description:
    "Berechnen Sie die versteckten Kosten unbesetzter Stellen. Sparen Sie mit unserem Fixpreis-Recruiting bis zu 70% gegenüber traditionellen Personalvermittlern. Jetzt kalkulieren!",
  keywords:
    "Vakanzkosten, Recruiting-Kosten, Personalvermittlung Fixpreis, Headhunting, Stellenbesetzung, Personalberatung, Kosteneinsparung",
  openGraph: {
    title: "Vakanzkosten-Rechner | Kosten unbesetzter Stellen berechnen",
    description:
      "Berechnen Sie die versteckten Kosten unbesetzter Stellen. Sparen Sie mit unserem Fixpreis-Recruiting bis zu 70% gegenüber traditionellen Personalvermittlern. Jetzt kalkulieren!",
    url: "https://www.rsg-recruiting.de/vakanzkosten-rechner",
    type: "website",
  },
}

export default function VakanzkostenRechner() {
  return <VakanzkostenRechnerClient />
}
