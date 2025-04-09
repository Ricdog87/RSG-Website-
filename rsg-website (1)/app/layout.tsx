import type React from "react"
import type { Metadata } from "next/metadata"
import { Mona_Sans as FontSans } from "next/font/google"
import localFont from "next/font/local"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { siteConfig } from "@/config/site"

import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI Consulting",
    "Recruiting Solutions",
    "AI Agents",
    "Workflow Automation",
    "Business AI",
    "Elumalab",
    "KI-Beratung",
    "Digitale Prozessautomatisierung",
  ],
  authors: [
    {
      name: "RSG GmbH",
      url: "https://recruiting-sg.de",
    },
  ],
  creator: "RSG GmbH",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@rsg_gmbh",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  viewport: "width=device-width, initial-scale=1.0",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'