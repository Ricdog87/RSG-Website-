import { type NextRequest, NextResponse } from "next/server"

// E-Mail-Konfiguration
const EMAIL_RECIPIENT = "r.serrano@recruiting-sg.de" // E-Mail-Adresse für Benachrichtigungen
const EMAIL_FROM = process.env.SMTP_USER || "info@recruiting-sg.de"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.subject || !data.content) {
      return NextResponse.json({ error: "Fehlende E-Mail-Daten" }, { status: 400 })
    }

    // Simuliere E-Mail-Versand für Entwicklungszwecke
    console.log("E-Mail-Versand wird simuliert:")
    console.log("An:", EMAIL_RECIPIENT)
    console.log("Von:", EMAIL_FROM)
    console.log("Betreff:", data.subject)
    console.log("Inhalt (gekürzt):", data.content.substring(0, 200) + "...")

    return NextResponse.json({
      success: true,
      message: "E-Mail-Versand simuliert",
      simulated: true,
    })
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Fehler beim Senden der E-Mail",
        details: error instanceof Error ? error.message : "Unbekannter Fehler",
      },
      { status: 500 },
    )
  }
}
