"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import type React from "react"

import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { X, Menu } from "lucide-react"

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Über uns",
    href: "/#about",
  },
  {
    title: "Dienstleistungen",
    href: "/#services",
    children: [
      {
        title: "KI-Agenten-Entwicklung",
        href: "/#services",
        description: "Maßgeschneiderte KI-Agenten für Marketing, Vertrieb und Recruiting",
      },
      {
        title: "Automatisierte Workflows",
        href: "/#services",
        description: "Optimierung von Geschäftsprozessen mit n8n, Zapier und mehr",
      },
      {
        title: "KI-Implementierung & Beratung",
        href: "/#services",
        description: "Strategische Beratung für die Integration von KI in Ihr Unternehmen",
      },
      {
        title: "Digitale Prozessautomatisierung",
        href: "/#services",
        description: "Automatisierung wiederkehrender Aufgaben für mehr Effizienz",
      },
      {
        title: "Chatbot-Lösungen",
        href: "/#services",
        description: "Intelligente Chatbots für verbesserten Kundenservice",
      },
      {
        title: "App-Integration & AI-Dashboards",
        href: "/#services",
        description: "Nahtlose Integration von KI in bestehende Systeme",
      },
    ],
  },
  {
    title: "Connect Recruit",
    href: "/#connect-recruit",
  },
  {
    title: "Elumalab",
    href: "/#elumalab",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Kontakt",
    href: "/#contact",
  },
]

export function Header() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"])
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(8px)"])

  // State für das mobile Menü
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Schließe das mobile Menü, wenn die Fenstergröße ändert
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Funktion zum Scrollen zu einem Abschnitt
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Wenn es sich um einen Anker-Link handelt
    if (href.startsWith("/#")) {
      e.preventDefault()

      // Extrahiere die ID aus dem Anker-Link
      const id = href.substring(2)
      const element = document.getElementById(id)

      if (element) {
        // Scrolle zum Element mit einer sanften Animation
        element.scrollIntoView({ behavior: "smooth" })
        // Schließe das mobile Menü nach der Navigation
        setMobileMenuOpen(false)
      }
    }
    // Wenn wir auf der Startseite sind und zu einem Anker navigieren wollen
    else if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault()

      // Extrahiere die ID aus dem Anker-Link
      const id = href.substring(1)
      const element = document.getElementById(id)

      if (element) {
        // Scrolle zum Element mit einer sanften Animation
        element.scrollIntoView({ behavior: "smooth" })
        // Schließe das mobile Menü nach der Navigation
        setMobileMenuOpen(false)
      }
    } else {
      // Schließe das mobile Menü bei Navigation zu anderen Seiten
      setMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      className="fixed top-0 z-50 w-full border-b border-transparent"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        borderColor: useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]),
      }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) =>
                  item.children ? (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuTrigger className="font-heading">
                        <Link href={item.href} onClick={(e) => scrollToSection(e, item.href)} className="font-heading">
                          {item.title}
                        </Link>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  onClick={(e) => scrollToSection(e, child.href)}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none font-heading">{child.title}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {child.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.title}>
                      <Link
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === item.href && "bg-accent text-accent-foreground",
                          "font-heading",
                        )}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button asChild variant="default" className="bg-primary text-primary-foreground font-heading">
              <Link href="https://meetings.hubspot.com/r-serrano?fbclid=PAZXh0bgNhZW0CMTEAAacAOPTJDVLlkGfZn7n56wzwYRLLQrzGIhvbqd-Mdz9x9oGykWK8Wdl87pKn0A_aem_xvZOqx4KCtD0hKmtyl33RQ&uuid=f86f149b-96d2-4afe-a5d1-fd955cb14ca5">
                Beratung buchen
              </Link>
            </Button>
          </div>
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50 animate-in slide-in-from-top-5">
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="block py-2 font-heading text-lg hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>

                  {item.children && (
                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-border/50">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          onClick={(e) => scrollToSection(e, child.href)}
                          className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2">
                <Button asChild className="w-full bg-primary text-primary-foreground font-heading">
                  <Link href="https://meetings.hubspot.com/r-serrano?fbclid=PAZXh0bgNhZW0CMTEAAacAOPTJDVLlkGfZn7n56wzwYRLLQrzGIhvbqd-Mdz9x9oGykWK8Wdl87pKn0A_aem_xvZOqx4KCtD0hKmtyl33RQ&uuid=f86f149b-96d2-4afe-a5d1-fd955cb14ca5">
                    Beratung buchen
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </motion.header>
  )
}
