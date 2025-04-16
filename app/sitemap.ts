import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.rsg-recruiting.de"
  const lastModified = new Date()

  // Main pages
  const routes = [
    "",
    "/vakanzkosten-rechner",
    "/karriere",
    "/stellenangebote",
    "/impressum",
    "/datenschutz",
    "/ai-matching",
    "/kontakt",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Bereich pages
  const bereicheRoutes = [
    "/bereiche/ai-jobs",
    "/bereiche/engineering",
    "/bereiche/finance",
    "/bereiche/it",
    "/bereiche/projektmanagement",
    "/bereiche/sales-marketing",
    "/bereiche/assistenz",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...bereicheRoutes]
}
