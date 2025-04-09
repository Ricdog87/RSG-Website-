import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const blogPosts = [
  {
    title: "Die Zukunft der KI im Recruiting",
    description:
      "Wie künstliche Intelligenz den Rekrutierungsprozess revolutioniert und welche Vorteile sich daraus ergeben.",
    date: "15. März 2023",
    image: "/images/blog-ai-trends.png",
    url: "/blog/ki-im-recruiting",
  },
  {
    title: "Effektive Kundenkommunikation mit Elumalab",
    description: "Wie Sie mit einer zentralen Kommunikationsplattform Ihre Kundenbeziehungen verbessern können.",
    date: "22. April 2023",
    image: "/images/blog-communication.png",
    url: "/blog/kundenkommunikation",
  },
  {
    title: "Automatisierte Workflows für mehr Effizienz",
    description: "Wie Sie mit automatisierten Workflows Zeit sparen und Ihre Produktivität steigern können.",
    date: "10. Mai 2023",
    image: "/images/blog-automation.png",
    url: "/blog/automatisierte-workflows",
  },
  {
    title: "KI-Implementierung: Best Practices",
    description: "Tipps und Tricks für eine erfolgreiche Integration von KI in Ihr Unternehmen.",
    date: "5. Juni 2023",
    image: "/images/blog-ai-trends.png",
    url: "/blog/ki-implementierung",
  },
  {
    title: "Die Rolle von Chatbots im modernen Kundenservice",
    description: "Wie Chatbots den Kundenservice revolutionieren und die Kundenzufriedenheit steigern können.",
    date: "18. Juli 2023",
    image: "/images/chatbot-solution.png",
    url: "/blog/chatbots-kundenservice",
  },
  {
    title: "Datengesteuerte Entscheidungen im Recruiting",
    description: "Wie Sie mit Datenanalyse bessere Recruiting-Entscheidungen treffen können.",
    date: "3. August 2023",
    image: "/images/connect-recruit-dashboard.png",
    url: "/blog/datengesteuerte-entscheidungen",
  },
]

export default function BlogPage() {
  return (
    <main className="container mx-auto py-32">
      <div className="mb-12">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </Button>
        <h1 className="font-heading text-4xl font-bold">Blog & Insights</h1>
        <p className="mt-4 text-xl text-muted-foreground font-heading">
          Erfahren Sie mehr über die neuesten Trends und Entwicklungen im Bereich KI und Geschäftsprozessoptimierung.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card
            key={post.title}
            className="h-full border-border/50 bg-background/50 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{post.date}</span>
              </div>
              <CardTitle className="line-clamp-2 font-heading">{post.title}</CardTitle>
              <CardDescription className="line-clamp-3 font-heading">{post.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="group font-heading">
                <Link href={post.url}>
                  Weiterlesen
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
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
