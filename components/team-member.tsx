"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Linkedin, Mail } from "lucide-react"
import OptimizedImage from "./optimized-image"

interface TeamMemberProps {
  name: string
  role: string
  avatar: string
  linkedinUrl?: string
  email?: string
  delay?: number
  isAI?: boolean
}

export default function TeamMember({
  name,
  role,
  avatar,
  linkedinUrl,
  email,
  delay = 0,
  isAI = false,
}: TeamMemberProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return

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

      // Holographic effect animation
      gsap.to(imageRef.current, {
        boxShadow: "0 0 20px rgba(6, 182, 212, 0.7)",
        duration: 2,
        repeat: -1,
        yoyo: true,
      })
    } catch (error) {
      console.error("Error in TeamMember animation:", error)
    }
  }, [delay])

  return (
    <div ref={cardRef} className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
      <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center">
        <div
          ref={imageRef}
          className={`relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-2 ${
            isAI
              ? "border-purple-500/50 group-hover:border-purple-400"
              : "border-cyan-500/50 group-hover:border-cyan-400"
          } transition-colors duration-300`}
        >
          <OptimizedImage
            src={avatar || "/placeholder.svg"}
            alt={`Porträt von ${name}, ${role} bei RSG Recruiting Solutions Group`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 128px, 160px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {isAI && (
            <div className="absolute bottom-0 left-0 right-0 bg-purple-500/80 text-white text-xs py-1 font-medium">
              AI Agent
            </div>
          )}
        </div>
        <h3
          className={`text-xl font-bold mb-1 ${isAI ? "text-purple-400" : "text-white"} group-hover:text-cyan-400 transition-colors duration-300`}
        >
          {name}
        </h3>
        <p className="text-white/70 font-light">{role}</p>
        <div className="mt-4 flex justify-center space-x-3">
          <div className="flex space-x-4 mt-4">
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-cyan-500/20 flex items-center justify-center text-white/80 hover:text-cyan-400 transition-colors duration-300"
                aria-label={`LinkedIn von ${name}`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-cyan-500/20 flex items-center justify-center text-white/80 hover:text-cyan-400 transition-colors duration-300"
                aria-label={`E-Mail an ${name}`}
                rel="noopener"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
