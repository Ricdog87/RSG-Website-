import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function DatenschutzPage() {
  return (
    <main className="container mx-auto max-w-4xl py-32">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </Button>
        <h1 className="font-heading text-4xl font-bold">Datenschutzerklärung</h1>
      </div>

      <div className="space-y-6">
        <p className="font-heading">
          Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher
          ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
        </p>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">Verantwortlich für die Datenverarbeitung</h2>
          <p className="font-heading">RSG Recruiting Solutions Group GmbH</p>
          <p className="font-heading">Am Heiligenhaus 9</p>
          <p className="font-heading">65207 Wiesbaden</p>
          <p className="font-heading">E-Mail: info@recruiting-sg.de</p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">Datenschutzbeauftragter</h2>
          <p className="font-heading">
            Bei Fragen zum Datenschutz wenden Sie sich bitte an unseren Datenschutzbeauftragten:
          </p>
          <p className="font-heading">Ricardo Serrano</p>
          <p className="font-heading">E-Mail: datenschutz@recruiting-sg.de</p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">
            Erhebung und Verarbeitung personenbezogener Daten
          </h2>
          <p className="font-heading">
            Wir erheben personenbezogene Daten, wenn Sie uns diese im Rahmen Ihrer Bestellung, bei einer Kontaktaufnahme
            mit uns oder bei Registrierung für unsere personalisierten Dienste freiwillig mitteilen. Welche Daten
            erhoben werden, ist aus den jeweiligen Eingabeformularen ersichtlich. Wir verwenden die von Ihnen
            mitgeteilten Daten zur Vertragsabwicklung und Bearbeitung Ihrer Anfragen.
          </p>
          <p className="font-heading mt-2">
            Nach vollständiger Abwicklung des Vertrages oder Löschung Ihres Kundenkontos werden Ihre Daten für die
            weitere Verwendung gesperrt und nach Ablauf der steuer- und handelsrechtlichen Aufbewahrungsfristen
            gelöscht, sofern Sie nicht ausdrücklich in eine weitere Nutzung Ihrer Daten eingewilligt haben oder wir uns
            eine darüber hinausgehende Datenverwendung vorbehalten, die gesetzlich erlaubt ist und über die wir Sie in
            dieser Erklärung informieren.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">Cookies</h2>
          <p className="font-heading">
            Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die im Internetbrowser des Besuchers
            gespeichert werden, um die Benutzererfahrung zu verbessern. In diesen Cookies werden keine personenbezogenen
            Daten gespeichert.
          </p>
          <p className="font-heading mt-2">
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies
            nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das
            automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies
            kann die Funktionalität dieser Website eingeschränkt sein.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">Ihre Rechte</h2>
          <p className="font-heading">
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten,
            deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder
            Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich
            jederzeit an uns wenden.
          </p>
          <p className="font-heading mt-2">
            Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
          </p>
        </section>
      </div>
    </main>
  )
}
