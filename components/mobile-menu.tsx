"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [customerSubmenuOpen, setCustomerSubmenuOpen] = useState(false)
  const [applicantSubmenuOpen, setApplicantSubmenuOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest('[data-mobile-menu="true"]')) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  }

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            data-mobile-menu="true"
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-black/95 backdrop-blur-md z-50 border-l border-cyan-500/20 overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-6 space-y-8">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <nav className="space-y-6">
                {/* Für unsere Kunden */}
                <div>
                  <button
                    onClick={() => setCustomerSubmenuOpen(!customerSubmenuOpen)}
                    className="flex items-center justify-between w-full text-white font-medium py-2 border-b border-white/10"
                  >
                    <span>Für unsere Kunden</span>
                    {customerSubmenuOpen ? (
                      <ChevronDown className="h-5 w-5 text-cyan-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-cyan-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {customerSubmenuOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pt-2 pb-1 space-y-3">
                          <Link
                            href="#calculator"
                            className="block py-2 text-white/70 hover:text-cyan-400 transition-colors"
                            onClick={handleLinkClick}
                          >
                            Vakanzkosten-Rechner
                          </Link>
                          <Link
                            href="#fixedprice"
                            className="block py-2 text-white/70 hover:text-cyan-400 transition-colors"
                            onClick={handleLinkClick}
                          >
                            Fixpreis
                          </Link>
                          <Link
                            href="#services"
                            className="block py-2 text-white/70 hover:text-cyan-400 transition-colors"
                            onClick={handleLinkClick}
                          >
                            Leistungen
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Für unsere Bewerber */}
                <div>
                  <button
                    onClick={() => setApplicantSubmenuOpen(!applicantSubmenuOpen)}
                    className="flex items-center justify-between w-full text-white font-medium py-2 border-b border-white/10"
                  >
                    <span>Für unsere Bewerber</span>
                    {applicantSubmenuOpen ? (
                      <ChevronDown className="h-5 w-5 text-cyan-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-cyan-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {applicantSubmenuOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pt-2 pb-1 space-y-3">
                          <Link
                            href="#ai-matching"
                            className="block py-2 text-white/70 hover:text-cyan-400 transition-colors"
                            onClick={handleLinkClick}
                          >
                            KI-Matching
                          </Link>
                          <Link
                            href="/stellenangebote"
                            className="block py-2 text-white/70 hover:text-cyan-400 transition-colors"
                            onClick={handleLinkClick}
                          >
                            Stellenangebote
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other menu items */}
                <Link
                  href="#vision"
                  className="block text-white font-medium py-2 border-b border-white/10"
                  onClick={handleLinkClick}
                >
                  Vision
                </Link>
                <Link
                  href="#team"
                  className="block text-white font-medium py-2 border-b border-white/10"
                  onClick={handleLinkClick}
                >
                  Team
                </Link>
                <Link
                  href="#contact"
                  className="block text-white font-medium py-2 border-b border-white/10"
                  onClick={handleLinkClick}
                >
                  Kontakt
                </Link>
              </nav>

              <div className="pt-4">
                <Link
                  href="https://meetings.hubspot.com/r-serrano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-md py-3 font-medium transition-all duration-300">
                    Termin vereinbaren
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
