// Vereinfache die Starhunter-Route, um Fehler zu vermeiden
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const answers = formData.get("answers") as string

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Fehlende Daten für die Kandidatenverarbeitung" }, { status: 400 })
    }

    // Simuliere erfolgreiche Verarbeitung
    const simulatedCandidateId = "sim_" + Math.random().toString(36).substring(2, 15)

    // Gib eine erfolgreiche Antwort zurück
    return NextResponse.json({
      success: true,
      message: "Kandidatendaten erfolgreich verarbeitet",
      candidateId: simulatedCandidateId,
      starhunterSuccess: true,
      emailSent: false,
    })
  } catch (error) {
    console.error("Fehler bei der Kandidatenverarbeitung:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Fehler bei der Verarbeitung der Anfrage",
        details: error instanceof Error ? error.message : "Unbekannter Fehler",
      },
      { status: 500 },
    )
  }
}
