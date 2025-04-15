"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Logo() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll("path")
    if (!paths || paths.length === 0) return

    gsap.set(paths, {
      opacity: 0,
      scale: 0.8,
      transformOrigin: "center",
    })

    gsap.to(paths, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.1,
    })

    // Subtle continuous animation
    paths.forEach((path) => {
      gsap.to(path, {
        filter: "drop-shadow(0 0 3px #06b6d4)",
        repeat: -1,
        yoyo: true,
        duration: 2 + Math.random() * 2,
        delay: Math.random(),
      })
    })
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M10 20L20 10L30 20L20 30L10 20Z" fill="#06b6d4" />
      <path d="M30 20L40 10L50 20L40 30L30 20Z" fill="#0ea5e9" />
      <path d="M50 20L60 10L70 20L60 30L50 20Z" fill="#2563eb" />
      <path d="M70 20L80 10L90 20L80 30L70 20Z" fill="#7c3aed" />
      <path d="M90 20L100 10L110 20L100 30L90 20Z" fill="#a855f7" />
      <path d="M20 10L30 20L20 30L10 20L20 10Z" fillOpacity="0.3" fill="#06b6d4" />
      <path d="M40 10L50 20L40 30L30 20L40 10Z" fillOpacity="0.3" fill="#0ea5e9" />
      <path d="M60 10L70 20L60 30L50 20L60 10Z" fillOpacity="0.3" fill="#2563eb" />
      <path d="M80 10L90 20L80 30L70 20L80 10Z" fillOpacity="0.3" fill="#7c3aed" />
      <path d="M100 10L110 20L100 30L90 20L100 10Z" fillOpacity="0.3" fill="#a855f7" />
    </svg>
  )
}
