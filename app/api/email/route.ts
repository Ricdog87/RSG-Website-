import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// E-Mail-Konfiguration
const EMAIL_RECIPIENT = "r.serrano@recruiting-sg.de" // E-Mail-Adresse für Benachrichtigungen
const EMAIL_FROM = process.env.SMTP_USER || "info@recruiting-sg.de"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.subject || !data.content) {
      return NextResponse.json({ error: "Fehlende E-Mail-Daten" }, { status: 400 })
    }

    // Prüfen, ob SMTP-Anmeldedaten vorhanden sind
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.log("SMTP-Anmeldedaten fehlen, E-Mail-Versand wird simuliert:")
      console.log("An:", EMAIL_RECIPIENT)
      console.log("Von:", EMAIL_FROM)
      console.log("Betreff:", data.subject)
      console.log("Inhalt (gekürzt):", data.content.substring(0, 200) + "...")

      return NextResponse.json({
        success: true,
        message: "E-Mail-Versand simuliert (SMTP-Anmeldedaten fehlen)",
        simulated: true,
      })
    }

    // SMTP-Transporter erstellen
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Oder ein anderer SMTP-Server
      port: 587,
      secure: false, // true für Port 465, false für andere Ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // E-Mail-Optionen
    const mailOptions = {
      from: `RSG Recruiting <${EMAIL_FROM}>`,
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
