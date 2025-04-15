import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Datenschutz() {
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
              Datenschutzerklärung
            </h1>

            <div className="space-y-6 text-white/80">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">1. Datenschutz auf einen Blick</h2>
                <h3 className="text-lg font-medium mt-4 mb-2 text-white/90">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                  passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                  persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  2. Allgemeine Hinweise und Pflichtinformationen
                </h2>
                <h3 className="text-lg font-medium mt-4 mb-2 text-white/90">Datenschutz</h3>
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                  personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie
                  dieser Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">3. Datenerfassung auf unserer Website</h2>
                <h3 className="text-lg font-medium mt-4 mb-2 text-white/90">Cookies</h3>
                <p>
                  Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen
                  Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher,
                  effektiver und sicherer zu machen.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">4. Kontaktformular</h2>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
                  inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
                  von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">5. Verantwortliche Stelle</h2>
                <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <p className="mt-2">
                  RSG Recruiting Solutions Group GmbH
                  <br />
                  Constance Renz & Ricardo Serrano
                  <br />
                  Am Heiligenhaus 9
                  <br />
                  65207 Wiesbaden
                </p>
                <p className="mt-2">
                  Telefon: +49 176 60772556
                  <br />
                  E-Mail: datenschutz@recruiting-sg.de
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
