"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

export default function RSGLogo() {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!logoRef || !logoRef.current) return

    try {
      // Animate logo on load
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
      )
    } catch (error) {
      console.error("Error animating logo:", error)

      // Fallback animation if GSAP fails
      if (logoRef.current) {
        logoRef.current.style.opacity = "1"
      }
    }
  }, [])

  return (
    <div ref={logoRef} className="relative w-full h-full flex items-center">
      <Image
        src="/images/rsg-logo.png"
        alt="RSG Recruiting Solutions Group Logo"
        width={180}
        height={60}
        className="object-contain"
        priority
      />
    </div>
  )
}
