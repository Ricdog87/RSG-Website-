"use client"

import { Button } from "@/components/ui/button"
import { Lock, CheckCircle } from "lucide-react"

interface PrivacyConsentProps {
  onAccept: (accepted: boolean) => void
  isAccepted: boolean
}

export default function PrivacyConsent({ onAccept, isAccepted }: PrivacyConsentProps) {
  return (
    <div className="space-y-6">
      <div className="relative bg-white/5 border border-white/10 rounded-lg p-6 max-h-[400px] overflow-y-auto">
        <div className="space-y-4 text-white/80 text-sm">
          <h3 className="text-lg font-semibold text-white">
            Datenschutzerklärung für das RSG AI Talent Matching System
          </h3>

          <p>
            Die RSG Recruiting Solutions Group GmbH (im Folgenden "RSG" oder "wir") nimmt den Schutz Ihrer persönlichen
            Daten sehr ernst. Diese Datenschutzerklärung informiert Sie darüber, wie wir mit Ihren persönlichen Daten
            umgehen, wenn Sie unser AI Talent Matching System nutzen.
          </p>

          <h4 className="font-medium text-white mt-4">1. Datenerhebung und -verarbeitung</h4>
          <p>Bei der Nutzung unseres AI Talent Matching Systems erheben und verarbeiten wir folgende Daten:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ihre Lebenslaufdaten (Ausbildung, Berufserfahrung, Fähigkeiten)</li>
            <li>Ihre Antworten auf die psychologischen Fragen</li>
            <li>Metadaten des Uploads (Zeitpunkt, Dateityp)</li>
          </ul>

          <h4 className="font-medium text-white mt-4">2. Zweck der Datenverarbeitung</h4>
          <p>Wir verarbeiten Ihre Daten zu folgenden Zwecken:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Durchführung der KI-gestützten Analyse Ihrer beruflichen Qualifikationen</li>
            <li>Erstellung eines Kompetenzprofils</li>
            <li>Empfehlung passender Karrierewege und offener Stellen</li>
            <li>Integration mit unserem CRM/ERP-System "StarHunter" zur Speicherung Ihres Profils</li>
            <li>Kontaktaufnahme zu passenden Stellenangeboten (nur mit Ihrer ausdrücklichen Zustimmung)</li>
          </ul>

          <h4 className="font-medium text-white mt-4">3. Rechtsgrundlage</h4>
          <p>
            Die Verarbeitung Ihrer Daten erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie
            können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
          </p>

          <h4 className="font-medium text-white mt-4">4. Datenspeicherung</h4>
          <p>
            Ihre Daten werden in unserem CRM/ERP-System "StarHunter" gespeichert und nach den geltenden
            Datenschutzgesetzen verarbeitet. Die Speicherdauer beträgt maximal 24 Monate, sofern Sie nicht vorher eine
            Löschung beantragen.
          </p>

          <h4 className="font-medium text-white mt-4">5. Datensicherheit</h4>
          <p>
            Wir setzen technische und organisatorische Maßnahmen ein, um Ihre personenbezogenen Daten gegen zufällige
            oder vorsätzliche Manipulationen, Verlust, Zerstörung oder gegen den Zugriff unberechtigter Personen zu
            schützen.
          </p>

          <h4 className="font-medium text-white mt-4">6. Ihre Rechte</h4>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit und Widerspruch bezüglich Ihrer personenbezogenen Daten. Für die Ausübung dieser Rechte
            kontaktieren Sie bitte datenschutz@rsg-recruiting.de.
          </p>

          <h4 className="font-medium text-white mt-4">7. KI-Analyse und Entscheidungslogik</h4>
          <p>
            Unser AI Talent Matching System nutzt Algorithmen der künstlichen Intelligenz, um Ihre Qualifikationen und
            Persönlichkeitsmerkmale zu analysieren und mit beruflichen Anforderungen abzugleichen. Die Analyse basiert
            auf folgenden Faktoren:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fachliche Qualifikationen und Erfahrungen aus Ihrem Lebenslauf</li>
            <li>Identifizierte Soft Skills und Persönlichkeitsmerkmale</li>
            <li>Ihre Antworten auf die psychologischen Fragen</li>
            <li>Vergleich mit erfolgreichen Karrierewegen ähnlicher Profile</li>
          </ul>
          <p>
            Sie haben das Recht, nicht einer ausschließlich auf automatisierter Verarbeitung beruhenden Entscheidung
            unterworfen zu werden. Unsere Empfehlungen dienen lediglich als Orientierungshilfe.
          </p>

          <h4 className="font-medium text-white mt-4">8. Kontakt</h4>
          <p>Bei Fragen zum Datenschutz erreichen Sie uns unter:</p>
          <p>
            RSG Recruiting Solutions Group GmbH
            <br />
            Datenschutzbeauftragter
            <br />
            Am Heiligenhaus 9
            <br />
            65207 Wiesbaden
            <br />
            E-Mail: datenschutz@recruiting-sg.de
            <br />
            Telefon: +49 176 60772556
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        {isAccepted ? (
          <Button
            className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
            onClick={() => onAccept(false)}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Datenschutzerklärung akzeptiert
          </Button>
        ) : (
          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            onClick={() => onAccept(true)}
          >
            <Lock className="h-4 w-4 mr-2" />
            Datenschutzerklärung akzeptieren
          </Button>
        )}
      </div>
    </div>
  )
}
