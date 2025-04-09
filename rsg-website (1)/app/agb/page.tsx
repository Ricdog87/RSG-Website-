import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AGBPage() {
  return (
    <main className="container mx-auto max-w-4xl py-32">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </Button>
        <h1 className="font-heading text-4xl font-bold">Allgemeine Geschäftsbedingungen</h1>
      </div>

      <div className="space-y-6">
        <p className="font-heading">
          Die nachfolgenden Geschäftsbedingungen gelten für alle zwischen der RSG Recruiting Solutions Group GmbH und
          dem Kunden abgeschlossenen Verträge.
        </p>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">1. Geltungsbereich</h2>
          <p className="font-heading">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der RSG Recruiting Solutions
            Group GmbH (nachfolgend "RSG" genannt) und ihren Kunden über die Erbringung von Dienstleistungen im Bereich
            KI-Lösungen, Beratung und Software.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">2. Vertragsschluss</h2>
          <p className="font-heading">
            Der Vertrag kommt durch die Annahme des Angebots der RSG durch den Kunden zustande. Die Annahme kann
            schriftlich, per E-Mail oder durch konkludentes Handeln erfolgen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">3. Leistungsumfang</h2>
          <p className="font-heading">
            Der Umfang der Leistungen ergibt sich aus der Leistungsbeschreibung des Angebots, den Angaben auf der
            Website und den ergänzenden Angaben in der Auftragsbestätigung. Änderungen und Ergänzungen bedürfen der
            Schriftform.
          </p>
          <p className="font-heading mt-2">
            RSG ist berechtigt, die vereinbarten Leistungen zu ändern, zu reduzieren oder zu ergänzen, sofern dies für
            den Kunden zumutbar ist.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">4. Pflichten des Kunden</h2>
          <p className="font-heading">
            Der Kunde ist verpflichtet, RSG alle für die Erbringung der vereinbarten Leistungen erforderlichen
            Informationen und Unterlagen rechtzeitig zur Verfügung zu stellen. Der Kunde sichert zu, dass die von ihm
            zur Verfügung gestellten Informationen und Unterlagen vollständig und richtig sind.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">5. Vergütung und Zahlungsbedingungen</h2>
          <p className="font-heading">
            Die Vergütung für die Leistungen von RSG ergibt sich aus dem Angebot oder der Auftragsbestätigung. Alle
            Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer.
          </p>
          <p className="font-heading mt-2">
            Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig. Bei
            Zahlungsverzug ist RSG berechtigt, Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz zu
            berechnen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">6. Haftung</h2>
          <p className="font-heading">
            RSG haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die auf
            einer vorsätzlichen oder fahrlässigen Pflichtverletzung von RSG, ihren gesetzlichen Vertretern oder
            Erfüllungsgehilfen beruhen.
          </p>
          <p className="font-heading mt-2">
            Für sonstige Schäden haftet RSG nur, wenn sie auf einer vorsätzlichen oder grob fahrlässigen
            Pflichtverletzung von RSG, ihren gesetzlichen Vertretern oder Erfüllungsgehilfen beruhen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-2xl font-semibold">7. Schlussbestimmungen</h2>
          <p className="font-heading">
            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
          </p>
          <p className="font-heading mt-2">
            Erfüllungsort und ausschließlicher Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem
            Vertrag ist Wiesbaden, sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder
            öffentlich-rechtliches Sondervermögen ist.
          </p>
          <p className="font-heading mt-2">
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so wird dadurch die Wirksamkeit der
            übrigen Bestimmungen nicht berührt.
          </p>
        </section>
      </div>
    </main>
  )
}
