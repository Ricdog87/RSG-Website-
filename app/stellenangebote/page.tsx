import type { Metadata } from "next"
import StellenangeboteClient from "./StellenangeboteClient"

export const metadata: Metadata = {
  title: "Aktuelle Stellenangebote | RSG Recruiting Solutions Group",
  description:
    "Entdecken Sie exklusive Stellenangebote in IT, KI, Finance und Engineering. Profitieren Sie von unserer Personalvermittlung zum Fixpreis und finden Sie Ihre nächste Karrierechance.",
  keywords:
    "Stellenangebote, Jobs, Karriere, IT Jobs, KI Jobs, Finance Jobs, Engineering, Projektmanagement, Recruiting, Fixpreis",
  openGraph: {
    title: "Aktuelle Stellenangebote | RSG Recruiting Solutions Group",
    description:
      "Entdecken Sie exklusive Stellenangebote in IT, KI, Finance und Engineering. Profitieren Sie von unserer Personalvermittlung zum Fixpreis und finden Sie Ihre nächste Karrierechance.",
    url: "https://www.rsg-recruiting.de/stellenangebote",
    type: "website",
  },
}

export default function Stellenangebote() {
  return <StellenangeboteClient />
}
