"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Calendar } from "lucide-react"

export default function EnhancedVacancyCalculator() {
  // Eingabefelder
  const [position, setPosition] = useState("specialist")
  const [salary, setSalary] = useState<string | number>("80000")
  const [workingDays, setWorkingDays] = useState<string | number>("220")
  const [vacancyDuration, setVacancyDuration] = useState<string | number>("90")
  const [recruitmentCosts, setRecruitmentCosts] = useState<string | number>("25")
  const [rsgVacancyDuration, setRsgVacancyDuration] = useState<string | number>("30") // Durchschnittliche Besetzungsdauer mit RSG

  // Ergebnisse
  const [isCalculating, setIsCalculating] = useState(false)
  const [traditionalVacancyCost, setTraditionalVacancyCost] = useState(0)
  const [rsgVacancyCost, setRsgVacancyCost] = useState(0)
  const [traditionalRecruitingCost, setTraditionalRecruitingCost] = useState(0)
  const [totalTraditionalCost, setTotalTraditionalCost] = useState(0)
  const [totalRsgCost, setTotalRsgCost] = useState(0)
  const [savingPotential, setSavingPotential] = useState(0)
  const [roi, setRoi] = useState(0)

  // Formatiere Zahl mit Tausendertrennzeichen
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Berechnung der Vakanzkosten
  const calculateVacancy = () => {
    setIsCalculating(true)

    // Simuliere Berechnungsverzögerung für Effekt
    setTimeout(() => {
      try {
        // Parse input values
        const validSalary = Number.parseFloat(String(salary)) || 80000
        const validWorkingDays = Number.parseFloat(String(workingDays)) || 220
        const validVacancyDuration = Number.parseFloat(String(vacancyDuration)) || 90
        const validRsgVacancyDuration = Number.parseFloat(String(rsgVacancyDuration)) || 30
        const validRecruitmentCosts = Number.parseFloat(String(recruitmentCosts)) || 25

        // Adjust vacancy cost based on position
        let positionFactor = 1.0
        if (position === "executive") {
          // Higher impact for executive positions
          positionFactor = 1.5
        } else if (position === "specialist") {
          // Medium-high impact for specialists
          positionFactor = 1.2
        } else if (position === "clerk") {
          // Medium impact for clerks
          positionFactor = 0.8
        }

        // Täglicher Gehaltswert
        const dailySalary = validSalary / validWorkingDays

        // 1. Kosten der unbesetzten Stelle bei traditioneller Rekrutierung (Vakanzzeit)
        const traditionalVacancyCost = Math.round(dailySalary * validVacancyDuration * positionFactor)

        // 1b. Kosten der unbesetzten Stelle bei RSG (kürzere Vakanzzeit)
        const rsgVacancyCost = Math.round(dailySalary * validRsgVacancyDuration * positionFactor)

        // 2. Traditionelle Rekrutierungskosten (% vom Jahresgehalt)
        const traditionalRecruitingFee = Math.round((validSalary * validRecruitmentCosts) / 100)

        // 3. Gesamtkosten mit traditioneller Personalvermittlung
        const totalTraditionalCost = traditionalVacancyCost + traditionalRecruitingFee

        // 4. Gesamtkosten mit RSG
        const rsgFixedPrice = 9999
        const totalRsgCost = rsgVacancyCost + rsgFixedPrice

        // 5. Einsparungspotenzial (Traditionelle Gesamtkosten - RSG Gesamtkosten)
        const saving = totalTraditionalCost - totalRsgCost

        // 6. ROI berechnen (Einsparung / RSG Fixpreis * 100)
        const returnOnInvestment = (saving / rsgFixedPrice) * 100

        // Update state with results
        setTraditionalVacancyCost(traditionalVacancyCost)
        setRsgVacancyCost(rsgVacancyCost)
        setTraditionalRecruitingCost(traditionalRecruitingFee)
        setTotalTraditionalCost(totalTraditionalCost)
        setTotalRsgCost(totalRsgCost)
        setSavingPotential(saving)
        setRoi(Math.round(returnOnInvestment))
      } catch (error) {
        console.error("Error calculating vacancy costs:", error)
        // Set fallback values in case of error
        setTraditionalVacancyCost(30000)
        setRsgVacancyCost(10000)
        setTraditionalRecruitingCost(20000)
        setTotalTraditionalCost(50000)
        setTotalRsgCost(20000)
        setSavingPotential(30000)
        setRoi(300)
      } finally {
        setIsCalculating(false)
      }
    }, 800)
  }

  // Berechne initiale Ergebnisse
  useEffect(() => {
    calculateVacancy()
  }, [])

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string | number>>,
  ) => {
    setter(e.target.value === "" ? "" : e.target.value)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="position" className="text-white/80">
              Position
            </Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger id="position" className="bg-white/5 border-white/10 text-white min-h-[44px]">
                <SelectValue placeholder="Position auswählen" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/10 text-white">
                <SelectItem value="executive">Führungskraft</SelectItem>
                <SelectItem value="specialist">Fachkraft</SelectItem>
                <SelectItem value="clerk">Sachbearbeiter</SelectItem>
                <SelectItem value="other">Andere Position</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary" className="text-white/80">
              Jahresgehalt (brutto)
            </Label>
            <div className="relative">
              <Input
                id="salary"
                type="text"
                inputMode="numeric"
                value={salary}
                onChange={(e) => handleInputChange(e, setSalary)}
                className="bg-white/5 border-white/10 text-white pr-8 min-h-[44px]"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">€</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workingDays" className="text-white/80">
              Arbeitstage pro Jahr
            </Label>
            <Input
              id="workingDays"
              type="text"
              inputMode="numeric"
              value={workingDays}
              onChange={(e) => handleInputChange(e, setWorkingDays)}
              className="bg-white/5 border-white/10 text-white min-h-[44px]"
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="vacancyDuration" className="text-white/80">
              Durchschnittliche Vakanzdauer (Tage)
            </Label>
            <Input
              id="vacancyDuration"
              type="text"
              inputMode="numeric"
              value={vacancyDuration}
              onChange={(e) => handleInputChange(e, setVacancyDuration)}
              className="bg-white/5 border-white/10 text-white min-h-[44px]"
            />
            <p className="text-xs text-white/60">Bei traditioneller Personalvermittlung</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rsgVacancyDuration" className="text-white/80">
              Vakanzdauer mit RSG (Tage)
            </Label>
            <Input
              id="rsgVacancyDuration"
              type="text"
              inputMode="numeric"
              value={rsgVacancyDuration}
              onChange={(e) => handleInputChange(e, setRsgVacancyDuration)}
              className="bg-white/5 border-white/10 text-white min-h-[44px]"
            />
            <p className="text-xs text-white/60">Durchschnittliche Besetzungsdauer mit RSG</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recruitmentCosts" className="text-white/80">
              Rekrutierungskosten (% vom Jahresgehalt)
            </Label>
            <div className="relative">
              <Input
                id="recruitmentCosts"
                type="text"
                inputMode="numeric"
                value={recruitmentCosts}
                onChange={(e) => handleInputChange(e, setRecruitmentCosts)}
                className="bg-white/5 border-white/10 text-white pr-8 min-h-[44px]"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">%</span>
            </div>
            <p className="text-xs text-white/60">Bei traditioneller Personalvermittlung</p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={calculateVacancy}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-md py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
              Berechne...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-5 w-5" />
              Kosten berechnen
            </>
          )}
        </Button>
      </div>

      <div className="mt-8 space-y-6">
        {/* Vergleich der Gesamtkosten */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
          <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-medium mb-6 text-white text-center">
              Kostenvergleich: Traditionelle Personalvermittlung vs. RSG
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditionelle Personalvermittlung */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Traditionelle Personalvermittlung</h4>

                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Vakanzkosten ({vacancyDuration} Tage)</span>
                    <span className="font-medium text-white">{formatNumber(traditionalVacancyCost)} €</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Rekrutierungskosten ({recruitmentCosts}%)</span>
                    <span className="font-medium text-white">{formatNumber(traditionalRecruitingCost)} €</span>
                  </div>
                  <div className="border-t border-white/10 mt-3 pt-3 flex justify-between items-center">
                    <span className="font-medium text-white">Gesamtkosten</span>
                    <span className="text-xl font-bold text-pink-400">{formatNumber(totalTraditionalCost)} €</span>
                  </div>
                </div>
              </div>

              {/* RSG Fixpreis-Modell */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">RSG Fixpreis-Modell</h4>

                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Vakanzkosten ({rsgVacancyDuration} Tage)</span>
                    <span className="font-medium text-white">{formatNumber(rsgVacancyCost)} €</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">RSG Fixpreis</span>
                    <span className="font-medium text-white">9.999 €</span>
                  </div>
                  <div className="border-t border-white/10 mt-3 pt-3 flex justify-between items-center">
                    <span className="font-medium text-white">Gesamtkosten</span>
                    <span className="text-xl font-bold text-emerald-400">{formatNumber(totalRsgCost)} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Einsparung und ROI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg blur-lg opacity-30"></div>
            <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-medium mb-2 text-white">Ihre Ersparnis mit RSG</h3>
                <div className="flex items-center justify-center my-4">
                  {isCalculating ? (
                    <div className="h-16 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                    </div>
                  ) : (
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">
                      {formatNumber(savingPotential)} €
                    </p>
                  )}
                </div>
              </div>
              <p className="text-white/60 text-sm">Gesamtersparnis durch kürzere Vakanzdauer und Fixpreis-Modell</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur-lg opacity-30"></div>
            <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-medium mb-2 text-white">Return on Investment</h3>
                <div className="flex items-center justify-center my-4">
                  {isCalculating ? (
                    <div className="h-16 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                  ) : (
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
                      {roi}%
                    </p>
                  )}
                </div>
              </div>
              <p className="text-white/60 text-sm">Rendite Ihrer Investition in unseren Recruiting-Service</p>
            </div>
          </div>
        </div>

        <div className="relative mt-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-40"></div>
          <div className="relative bg-black/70 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Unser Fixpreis-Angebot: 9.999 € netto pro Position
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Sparen Sie tausende Euro im Vergleich zu traditionellen Personalberatern, die 25-35% des Jahresgehalts
              verlangen. Bei uns zahlen Sie nur eine Anzahlung von 2.500€ und den Rest erst bei erfolgreicher Besetzung.
            </p>
            <Link href="https://meetings.hubspot.com/r-serrano" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <Calendar className="mr-2 h-5 w-5" />
                Jetzt Termin vereinbaren
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
