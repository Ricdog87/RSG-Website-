"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function TabHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 10000) // Hide after 10 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-cyan-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/50 flex items-center space-x-2 animate-bounce">
      <ChevronDown className="h-4 w-4 text-cyan-400" />
      <span className="text-sm text-cyan-400">Klicken Sie auf die Tabs, um mehr zu entdecken</span>
    </div>
  )
}
