import type React from "react"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { organizationJsonLd, websiteJsonLd } from "./structured-data"
import "./globals.css"

export const metadata: Metadata = {
  title: "RSG Recruiting Solutions Group | Personalvermittlung zum Fixpreis",
  description:
    "Spezialisierte Personalvermittlung zum Fixpreis von 9.999€ netto für alle Positionen. KI-gestütztes Talent-Matching und Recruiting.",
  generator: "Next.js",
  applicationName: "RSG Recruiting Solutions Group",
  keywords: [
    "Personalvermittlung",
    "Recruiting",
    "Fixpreis",
    "Headhunting",
    "KI-Matching",
    "Talent",
    "Jobs",
    "Stellenangebote",
    "Personalberatung",
    "Vakanzkosten",
    "Personalsuche",
  ],
  authors: [{ name: "RSG Recruiting Solutions Group GmbH" }],
  creator: "RSG Recruiting Solutions Group GmbH",
  publisher: "RSG Recruiting Solutions Group GmbH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.rsg-recruiting.de"),
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/de",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "RSG Recruiting Solutions Group | Personalvermittlung zum Fixpreis",
    description: "Spezialisierte Personalvermittlung zum Fixpreis von 9.999€ netto für alle Positionen.",
    url: "https://www.rsg-recruiting.de",
    siteName: "RSG Recruiting Solutions Group",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://www.rsg-recruiting.de/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RSG Recruiting Solutions Group - Personalvermittlung zum Fixpreis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RSG Recruiting Solutions Group | Personalvermittlung zum Fixpreis",
    description: "Spezialisierte Personalvermittlung zum Fixpreis von 9.999€ netto für alle Positionen.",
    images: ["https://www.rsg-recruiting.de/images/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code", // Ersetzen Sie dies mit Ihrem tatsächlichen Verifizierungscode
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.rsg-recruiting.de/" />

        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QM2TD5Q3KH" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QM2TD5Q3KH');
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'