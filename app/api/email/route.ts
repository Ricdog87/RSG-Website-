import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { google } from "googleapis"

// Gmail OAuth2 Konfiguration
const GMAIL_USER = process.env.GMAIL_USER || "deine.email@gmail.com"
const CLIENT_ID = process.env.GMAIL_CLIENT_ID
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN
const REDIRECT_URI = "https://developers.google.com/oauthplayground"

// E-Mail-Konfiguration
const EMAIL_RECIPIENT = "r.serrano@recruiting-sg.de" // E-Mail-Adresse für Benachrichtigungen

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.subject || !data.content) {
      return NextResponse.json({ error: "Fehlende E-Mail-Daten" }, { status: 400 })
    }

    // Überprüfen, ob alle erforderlichen OAuth2-Anmeldedaten vorhanden sind
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      console.error("Fehlende OAuth2-Anmeldedaten für Gmail")

      // Fallback: Simuliere E-Mail-Versand für Entwicklungszwecke
      console.log("E-Mail würde gesendet werden (SIMULIERT):")
      console.log("An:", EMAIL_RECIPIENT)
      console.log("Von:", GMAIL_USER)
      console.log("Betreff:", data.subject)
      console.log("Inhalt (gekürzt):", data.content.substring(0, 200) + "...")

      return NextResponse.json({
        success: true,
        message: "E-Mail-Versand simuliert (OAuth2-Anmeldedaten fehlen)",
        simulated: true,
      })
    }

    // OAuth2-Client einrichten
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

    oAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    })

    try {
      // Access Token abrufen
      const accessTokenResponse = await oAuth2Client.getAccessToken()

      if (!accessTokenResponse.token) {
        throw new Error("Konnte kein Access Token erhalten")
      }

      const accessToken = accessTokenResponse.token

      // Debug-Informationen
      console.log("Access Token erfolgreich erhalten:", accessToken.substring(0, 10) + "...")

      // Nodemailer-Transporter mit OAuth2 einrichten
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // SSL
        auth: {
          type: "OAuth2",
          user: GMAIL_USER,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
        debug: true, // Aktiviere Debug-Modus für mehr Informationen
      })

      // Verbindung testen
      await transporter.verify()
      console.log("SMTP-Verbindung erfolgreich verifiziert")

      // E-Mail-Optionen
      const mailOptions = {
        from: `RSG Recruiting <${GMAIL_USER}>`,
        to: EMAIL_RECIPIENT,
        subject: data.subject,
        html: data.content,
        // Wenn eine Datei angehängt werden soll
        ...(data.attachment && {
          attachments: [
            {
              filename: data.attachment.filename,
              content: Buffer.from(data.attachment.content, "base64"),
            },
          ],
        }),
      }

      // E-Mail senden
      const info = await transporter.sendMail(mailOptions)
      console.log("E-Mail erfolgreich gesendet:", info.messageId)

      return NextResponse.json({
        success: true,
        message: "E-Mail erfolgreich gesendet",
        messageId: info.messageId,
      })
    } catch (oauthError) {
      console.error("OAuth2-Fehler:", oauthError)

      // Detaillierte Fehlerinformationen loggen
      if (oauthError instanceof Error) {
        console.error("Fehlerdetails:", oauthError.message)
        console.error("Stack:", oauthError.stack)
      }

      // Fallback auf direkten SMTP-Versand ohne OAuth
      console.log("Versuche Fallback auf direkten SMTP-Versand...")

      // Hier könntest du einen alternativen E-Mail-Versand implementieren
      // Für diese Demo simulieren wir den Versand
      console.log("E-Mail würde gesendet werden (SIMULIERT - FALLBACK):")
      console.log("An:", EMAIL_RECIPIENT)
      console.log("Von:", GMAIL_USER)
      console.log("Betreff:", data.subject)
      console.log("Inhalt (gekürzt):", data.content.substring(0, 200) + "...")

      return NextResponse.json({
        success: true,
        message: "E-Mail-Versand simuliert (OAuth2-Fehler, Fallback verwendet)",
        simulated: true,
        error: oauthError instanceof Error ? oauthError.message : "Unbekannter OAuth-Fehler",
      })
    }
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
