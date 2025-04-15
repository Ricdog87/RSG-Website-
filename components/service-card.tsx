"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Brain, Users, Network, Settings, LineChart, Kanban, Code, UserCheck, TrendingUp } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  delay?: number
}

export default function ServiceCard({ title, description, icon, delay = 0 }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    try {
      // Initial animation
      gsap.fromTo(
        cardRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: delay || 0,
          ease: "power3.out",
        },
      )
    } catch (error) {
      console.error("Error in ServiceCard animation:", error)
    }
  }, [delay])

  // Update the hover effect to be more touch-friendly
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef || !cardRef.current || window.innerWidth < 768) return // Skip effect on mobile

    try {
      const card = cardRef.current
      const rect = card.getBoundingClientRect()

      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: "power2.out",
      })
    } catch (error) {
      console.error("Error in ServiceCard mouse move:", error)
    }
  }

  const handleMouseLeave = () => {
    if (!cardRef || !cardRef.current) return

    try {
      gsap.to(cardRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    } catch (error) {
      console.error("Error in ServiceCard mouse leave:", error)
    }
  }

  const IconComponent = () => {
    switch (icon) {
      case "Brain":
        return <Brain className="h-10 w-10 text-cyan-400" />
      case "Users":
        return <Users className="h-10 w-10 text-cyan-400" />
      case "Network":
        return <Network className="h-10 w-10 text-cyan-400" />
      case "Settings":
        return <Settings className="h-10 w-10 text-cyan-400" />
      case "LineChart":
        return <LineChart className="h-10 w-10 text-cyan-400" />
      case "Kanban":
        return <Kanban className="h-10 w-10 text-cyan-400" />
      case "Code":
        return <Code className="h-10 w-10 text-cyan-400" />
      case "UserCheck":
        return <UserCheck className="h-10 w-10 text-cyan-400" />
      case "TrendingUp":
        return <TrendingUp className="h-10 w-10 text-cyan-400" />
      default:
        return <Brain className="h-10 w-10 text-cyan-400" />
    }
  }

  // Improve the card layout for better mobile display
  return (
    <div ref={cardRef} className="relative group h-full" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
      <div className="relative bg-black/60 backdrop-blur-sm p-5 sm:p-6 md:p-7 rounded-xl border border-white/10 h-full transform-gpu preserve-3d transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        <div className="mb-4">
          <IconComponent />
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-white/70 font-light">{description}</p>
        <div className="absolute bottom-5 sm:bottom-7 right-5 sm:right-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 6H11M11 6L6 1M11 6L6 11"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
