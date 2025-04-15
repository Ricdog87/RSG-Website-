"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calculator } from "lucide-react"

export default function VacancyCalculator() {
  const [positions, setPositions] = useState(1)
  const [salary, setSalary] = useState(60000)
  const [vacancyDuration, setVacancyDuration] = useState(3)
  const [productivityLoss, setProductivityLoss] = useState(30)
  const [result, setResult] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  // Calculate the cost of vacancy
  const calculateVacancy = () => {
    setIsCalculating(true)

    // Simulate calculation delay for effect
    setTimeout(() => {
      // Formula: positions * (salary / 12) * vacancyDuration * (1 + productivityLoss/100)
      const monthlySalary = salary / 12
      const productivityFactor = 1 + productivityLoss / 100
      const cost = positions * monthlySalary * vacancyDuration * productivityFactor
      setResult(Math.round(cost))
      setIsCalculating(false)
    }, 1000)
  }

  // Format number with thousand separators
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  useEffect(() => {
    // Calculate initial result
    calculateVacancy()
  }, [])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="positions" className="text-white/80">
                Anzahl der offenen Stellen
              </Label>
              <span className="text-cyan-400 font-medium">{positions}</span>
            </div>
            <Slider
              id="positions"
              min={1}
              max={20}
              step={1}
              value={[positions]}
              onValueChange={(value) => setPositions(value[0])}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="salary" className="text-white/80">
                Durchschnittliches Jahresgehalt (€)
              </Label>
              <span className="text-cyan-400 font-medium">{formatNumber(salary)}</span>
            </div>
            <Slider
              id="salary"
              min={30000}
              max={150000}
              step={1000}
              value={[salary]}
              onValueChange={(value) => setSalary(value[0])}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="vacancyDuration" className="text-white/80">
                Vakanz-Dauer (Monate)
              </Label>
              <span className="text-cyan-400 font-medium">{vacancyDuration}</span>
            </div>
            <Slider
              id="vacancyDuration"
              min={1}
              max={12}
              step={1}
              value={[vacancyDuration]}
              onValueChange={(value) => setVacancyDuration(value[0])}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="productivityLoss" className="text-white/80">
                Produktivitätsverlust (%)
              </Label>
              <span className="text-cyan-400 font-medium">{productivityLoss}%</span>
            </div>
            <Slider
              id="productivityLoss"
              min={10}
              max={100}
              step={5}
              value={[productivityLoss]}
              onValueChange={(value) => setProductivityLoss(value[0])}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={calculateVacancy}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-md px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-2"
          disabled={isCalculating}
        >
          <Calculator className="h-5 w-5" />
          Berechnen
        </Button>
      </div>

      <div className="mt-8 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
        <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center">
          <h3 className="text-xl font-medium mb-2 text-white">Kosten der offenen Stellen</h3>
          <div className="flex items-center justify-center">
            {isCalculating ? (
              <div className="h-16 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
              </div>
            ) : (
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {formatNumber(result)} €
              </p>
            )}
          </div>
          <p className="text-white/60 text-sm mt-2">
            Geschätzte Kosten basierend auf Gehalt, Dauer und Produktivitätsverlust
          </p>
        </div>
      </div>
    </div>
  )
}
