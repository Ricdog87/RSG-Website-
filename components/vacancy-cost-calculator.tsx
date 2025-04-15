"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

export default function VacancyCostCalculator() {
  const [salary, setSalary] = useState(80000)
  const [vacancyMonths, setVacancyMonths] = useState(3)
  const [overtimeCosts, setOvertimeCosts] = useState(0)
  const [provisionPercentage, setProvisionPercentage] = useState(25)
  const [isCalculating, setIsCalculating] = useState(false)
  const [results, setResults] = useState({
    productivityLoss: 0,
    totalVacancyCost: 0,
    traditionalRecruiterCost: 0,
    rsgCost: 9999,
    savings: 0,
    savingsPercentage: 0,
  })

  // Format number with thousand separators
  const formatNumber = (num: number) => {
    return num.toLocaleString("de-DE")
  }

  // Calculate all costs
  const calculateCosts = () => {
    setIsCalculating(true)

    // Simulate calculation delay for effect
    setTimeout(() => {
      try {
        // Calculate productivity loss (70% of monthly salary for each month vacant)
        const monthlySalary = salary / 12
        const productivityLoss = monthlySalary * 0.7 * vacancyMonths

        // Calculate total vacancy cost
        const totalVacancyCost = productivityLoss + overtimeCosts

        // Calculate traditional recruiter cost
        const traditionalRecruiterCost = (salary * provisionPercentage) / 100

        // RSG cost is fixed
        const rsgCost = 9999

        // Calculate savings
        const savings = traditionalRecruiterCost - rsgCost

        // Calculate savings percentage
        const savingsPercentage = (savings / traditionalRecruiterCost) * 100

        // Update results
        setResults({
          productivityLoss,
          totalVacancyCost,
          traditionalRecruiterCost,
          rsgCost,
          savings,
          savingsPercentage,
        })
      } catch (error) {
        console.error("Error calculating costs:", error)
      } finally {
        setIsCalculating(false)
      }
    }, 800)
  }

  // Calculate on initial load and when inputs change
  useEffect(() => {
    calculateCosts()
  }, [salary, vacancyMonths, overtimeCosts, provisionPercentage])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Inputs */}
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-sm opacity-20"></div>
            <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-cyan-400" />
                Kosten der unbesetzten Stelle
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="salary" className="text-white/80">
                      Durchschnittliches Jahresbruttogehalt (€)
                    </Label>
                    <span className="text-cyan-400 font-medium">{formatNumber(salary)} €</span>
                  </div>
                  <Slider
                    id="salary"
                    min={30000}
                    max={200000}
                    step={1000}
                    value={[salary]}
                    onValueChange={(value) => setSalary(value[0])}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="vacancyMonths" className="text-white/80">
                      Wie lange ist die Stelle unbesetzt? (Monate)
                    </Label>
                    <span className="text-cyan-400 font-medium">{vacancyMonths}</span>
                  </div>
                  <Slider
                    id="vacancyMonths"
                    min={1}
                    max={12}
                    step={1}
                    value={[vacancyMonths]}
                    onValueChange={(value) => setVacancyMonths(value[0])}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overtimeCosts" className="text-white/80">
                    Kosten durch Überstunden/Zeitarbeit (€, optional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="overtimeCosts"
                      type="number"
                      value={overtimeCosts}
                      onChange={(e) => setOvertimeCosts(Number(e.target.value) || 0)}
                      className="bg-white/5 border-white/10 text-white pr-8"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-sm opacity-20"></div>
            <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-cyan-400" />
                Vergleich mit herkömmlichen Personaldienstleistern
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="provisionPercentage" className="text-white/80">
                      Aktuelle Provision (% vom Jahresgehalt)
                    </Label>
                    <span className="text-cyan-400 font-medium">{provisionPercentage}%</span>
                  </div>
                  <Slider
                    id="provisionPercentage"
                    min={15}
                    max={35}
                    step={1}
                    value={[provisionPercentage]}
                    onValueChange={(value) => setProvisionPercentage(value[0])}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-white/60">Typische Provisionen liegen zwischen 25-35% des Jahresgehalts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Results */}
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-sm opacity-20"></div>
            <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                <Clock className="mr-2 h-5 w-5 text-cyan-400" />
                Kosten der Vakanz
              </h3>

              {isCalculating ? (
                <div className="h-[150px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white/80">Produktivitätsverlust (70% des Gehalts)</span>
                    <span className="font-medium text-white">
                      {formatNumber(Math.round(results.productivityLoss))} €
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white/80">Kosten durch Überstunden/Zeitarbeit</span>
                    <span className="font-medium text-white">{formatNumber(overtimeCosts)} €</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg border border-white/10">
                    <span className="font-medium text-white">Gesamtkosten der Vakanz</span>
                    <span className="text-xl font-bold text-cyan-400">
                      {formatNumber(Math.round(results.totalVacancyCost))} €
                    </span>
                  </div>

                  <p className="text-sm text-white/60 italic">
                    Jeden weiteren Monat verlieren Sie ca. {formatNumber(Math.round((salary / 12) * 0.7))} € durch die
                    unbesetzte Stelle!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-sm opacity-30"></div>
            <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-cyan-400" />
                Ihr Sparpotential mit RSG
              </h3>

              {isCalculating ? (
                <div className="h-[200px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white/80">Kosten bei {provisionPercentage}% Provision</span>
                    <span className="font-medium text-white">
                      {formatNumber(Math.round(results.traditionalRecruiterCost))} €
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white/80">RSG Fixpreis (inkl. 2.500€ Anzahlung)</span>
                    <span className="font-medium text-white">{formatNumber(results.rsgCost)} €</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-500/30">
                    <span className="font-medium text-white">Ihre Ersparnis</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-400">
                        {formatNumber(Math.round(results.savings))} €
                      </div>
                      <div className="text-sm text-emerald-400/80">
                        ({Math.round(results.savingsPercentage)}% günstiger)
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link href="/kontakt">
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-md py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                        Jetzt 30%+ sparen – Angebot anfordern
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-20"></div>
        <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
          <h3 className="text-xl font-semibold mb-4 text-white">Beispielrechnung</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Position mit 60.000€ Gehalt</h4>
              <p className="text-white/80 mb-1">
                Herkömmliche Provision (25%): <span className="text-white">15.000€</span>
              </p>
              <p className="text-white/80 mb-1">
                RSG Fixpreis: <span className="text-white">9.999€</span>
              </p>
              <p className="text-emerald-400 font-medium">Sie sparen: 5.001€ (33%)</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Position mit 90.000€ Gehalt</h4>
              <p className="text-white/80 mb-1">
                Herkömmliche Provision (25%): <span className="text-white">22.500€</span>
              </p>
              <p className="text-white/80 mb-1">
                RSG Fixpreis: <span className="text-white">9.999€</span>
              </p>
              <p className="text-emerald-400 font-medium">Sie sparen: 12.501€ (56%)</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Position mit 120.000€ Gehalt</h4>
              <p className="text-white/80 mb-1">
                Herkömmliche Provision (25%): <span className="text-white">30.000€</span>
              </p>
              <p className="text-white/80 mb-1">
                RSG Fixpreis: <span className="text-white">9.999€</span>
              </p>
              <p className="text-emerald-400 font-medium">Sie sparen: 20.001€ (67%)</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <p className="text-white/80 text-sm">
              <strong className="text-white">Warum Fixpreis?</strong> Weil Sie nur für Erfolg zahlen! Sie zahlen eine
              Anzahlung von 2.500€, die bei erfolgreicher Besetzung mit dem Gesamtpreis von 9.999€ verrechnet wird. Kein
              Erfolg? Keine weiteren Kosten!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
