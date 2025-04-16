import type { Organization, WithContext, WebSite, JobPosting, BreadcrumbList } from "schema-dts"

export const organizationJsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RSG Recruiting Solutions Group GmbH",
  url: "https://www.rsg-recruiting.de",
  logo: "https://www.rsg-recruiting.de/images/rsg-logo.png",
  description: "Spezialisierte Personalvermittlung zum Fixpreis von 9.999€ netto für alle Positionen.",
  slogan: "Personalvermittlung zum Fixpreis statt teurer Provisionen",
  foundingDate: "2022",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Am heiligenhaus 9",
    addressLocality: "Wiesbaden",
    postalCode: "65207",
    addressCountry: "DE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+49-176-60772556",
    email: "info@rsg-recruiting.de",
    contactType: "customer service",
    availableLanguage: ["German", "English"],
  },
  sameAs: [
    "https://www.linkedin.com/company/105505351/",
    "https://www.instagram.com/recruiting_solutions_group/",
    "https://www.xing.com/companies/rsgrecruitingsolutionsgroup",
  ],
  areaServed: ["DE", "AT", "CH"],
  serviceType: ["Personalvermittlung", "Headhunting", "Recruiting", "KI-Talentmatching"],
}

export const websiteJsonLd: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RSG Recruiting Solutions Group",
  url: "https://www.rsg-recruiting.de/",
  description: "Personalvermittlung zum Fixpreis von 9.999€ netto für alle Positionen und Gehaltsstufen.",
  inLanguage: "de-DE",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.rsg-recruiting.de/stellenangebote?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

// Funktion zur Generierung von strukturierten Daten für Stellenangebote
export function generateJobPostingJsonLd(job: any): WithContext<JobPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.date,
    validThrough: new Date(new Date(job.date).setMonth(new Date(job.date).getMonth() + 3)).toISOString(),
    employmentType: job.type === "Vollzeit" ? "FULL_TIME" : job.type === "Teilzeit" ? "PART_TIME" : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "RSG Recruiting Solutions Group GmbH",
      sameAs: "https://www.rsg-recruiting.de",
      logo: "https://www.rsg-recruiting.de/images/rsg-logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "DE",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: {
        "@type": "QuantitativeValue",
        minValue: Number.parseInt(job.salary.split(" - ")[0].replace(/[^0-9]/g, "")),
        maxValue: Number.parseInt(job.salary.split(" - ")[1].replace(/[^0-9]/g, "")),
        unitText: "YEAR",
      },
    },
    skills: job.requirements.join(", "),
    industry: job.category,
    occupationalCategory: job.category,
  }
}

// Funktion zur Generierung von Breadcrumb-strukturierten Daten
export function generateBreadcrumbJsonLd(items: { name: string; item: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://www.rsg-recruiting.de${item.item}`,
    })),
  }
}
