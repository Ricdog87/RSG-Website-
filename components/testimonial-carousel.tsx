"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSwipeable } from "react-swipeable"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  quote: string
  author: string
  company: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoplaySpeed?: number
}

export default function TestimonialCarousel({ testimonials, autoplaySpeed = 5000 }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPaused && testimonials.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length)
      }, autoplaySpeed)

      return () => clearInterval(interval)
    }
  }, [isPaused, testimonials.length, autoplaySpeed])

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  // Add swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    trackTouch: true,
    delta: 10, // Minimum distance in pixels before a swipe is recognized
    swipeDuration: 500, // Maximum time in milliseconds for a swipe
  })

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={carouselRef}
      {...swipeHandlers}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
      <div className="relative bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-white/10 min-h-[220px] flex flex-col justify-between">
        <div className="absolute top-6 left-8 text-4xl text-cyan-400 opacity-50">
          <Quote />
        </div>

        <div className="pt-8 min-h-[150px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-white/80 italic text-lg md:text-xl mb-6"
            >
              {testimonials[activeIndex].quote}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="font-bold text-white">{testimonials[activeIndex].author}</p>
            <p className="text-white/60 text-sm">{testimonials[activeIndex].company}</p>
          </div>

          {testimonials.length > 1 && (
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-white/20 bg-black/50 hover:bg-white/10"
                onClick={goToPrevious}
                aria-label="Vorheriges Testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "bg-cyan-400 scale-110" : "bg-white/30"
                    }`}
                    aria-label={`Gehe zu Testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-white/20 bg-black/50 hover:bg-white/10"
                onClick={goToNext}
                aria-label="Nächstes Testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
