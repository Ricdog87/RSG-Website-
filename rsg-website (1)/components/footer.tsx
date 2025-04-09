import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/95">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">RSG Recruiting Solutions Group GmbH</h3>
            <p className="text-sm text-muted-foreground font-heading">
              Wir sind ein innovatives Beratungsunternehmen, das sich auf KI-Lösungen für Marketing, Vertrieb und
              Recruiting spezialisiert hat.
            </p>
            <div className="flex flex-col space-y-2 pt-2">
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-primary" />
                <a
                  href="tel:+4917660772445"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  +49 176 6077 2445
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-primary" />
                <a
                  href="mailto:info@recruiting-sg.de"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@recruiting-sg.de
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold font-heading">Unternehmen</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground transition-colors hover:text-foreground font-heading"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground transition-colors hover:text-foreground font-heading"
                >
                  Dienstleistungen
                </Link>
              </li>
              <li>
                <Link
                  href="/#connect-recruit"
                  className="text-muted-foreground transition-colors hover:text-foreground font-heading"
                >
                  Connect Recruit
                </Link>
              </li>
              <li>
                <Link
                  href="/#elumalab"
                  className="text-muted-foreground transition-colors hover:text-foreground font-heading"
                >
                  Elumalab
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground transition-colors hover:text-foreground font-heading"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-muted-foreground transition-colors hover:text-foreground font-heading"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold font-heading">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/impressum"
                  className="text-muted-foreground transition-colors hover:text-foreground font-heading"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-muted-foreground transition-colors hover:text-foreground font-heading"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="text-muted-foreground transition-colors hover:text-foreground font-heading"
                >
                  AGB
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold font-heading">Folgen Sie uns</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground font-heading">
            &copy; {new Date().getFullYear()} RSG Recruiting Solutions Group GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
