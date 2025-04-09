import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ImpressumPage() {
  return (
    <main className="container mx-auto max-w-4xl py-32">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </Button>
        <h1 className="font-heading text-4xl font-bold">Impressum</h1>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">Angaben gemäß § 5 TMG</h2>
          <p className="font-heading">RSG Recruiting Solutions Group GmbH</p>
          <p className="font-heading">Am Heiligenhaus 9</p>
          <p className="font-heading">65207 Wiesbaden</p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">Vertreten durch</h2>
          <p className="font-heading">Geschäftsführer: Constance Renz und Ricardo Serrano</p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">Kontakt</h2>
          <p className="font-heading">Telefon: +49 (0) 123 456789</p>
          <p className="font-heading">E-Mail: info@recruiting-sg.de</p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">Registereintrag</h2>
          <p className="font-heading">Eintragung im Handelsregister</p>
          <p className="font-heading">Registergericht: Amtsgericht Wiesbaden</p>
          <p className="font-heading">Registernummer: HRB XXXXX</p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">Umsatzsteuer-ID</h2>
          <p className="font-heading">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
          <p className="font-heading">DE XXXXXXXXX</p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p className="font-heading">Ricardo Serrano</p>
          <p className="font-heading">Am Heiligenhaus 9</p>
          <p className="font-heading">65207 Wiesbaden</p>
        </section>
      </div>
    </main>
  )
}
