import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Impressum() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Link>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
          <div className="relative bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-white/10">
            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Impressum
            </h1>

            <div className="space-y-6 text-white/80">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Angaben gemäß § 5 TMG</h2>
                <p>RSG Recruiting Solutions Group GmbH</p>
                <p>Am Heiligenhaus 9</p>
                <p>65207 Wiesbaden</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Vertreten durch</h2>
                <p>Constance Renz, Geschäftsführerin</p>
                <p>Ricardo Serrano, Geschäftsführer</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Kontakt</h2>
                <p>Telefon: +49 176 60772556</p>
                <p>E-Mail: info@recruiting-sg.de</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Registereintrag</h2>
                <p>Eintragung im Handelsregister</p>
                <p>Registergericht: Amtsgericht Berlin-Charlottenburg</p>
                <p>Registernummer: HRB 123456</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Umsatzsteuer-ID</h2>
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                <p>DE123456789</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <p>Constance Renz</p>
                <p>Ricardo Serrano</p>
                <p>Am Heiligenhaus 9</p>
                <p>65207 Wiesbaden</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
