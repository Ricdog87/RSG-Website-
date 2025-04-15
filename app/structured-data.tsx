import type { Organization, WithContext } from "schema-dts"

export const organizationJsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RSG Recruiting Solutions Group GmbH",
  url: "https://www.rsg-recruiting.de",
  logo: "https://www.rsg-recruiting.de/images/rsg-logo.png",
  description: "Spezialisierte Personalvermittlung zum Fixpreis von 9.999€ netto für alle Positionen.",
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
  },
  sameAs: ["https://www.linkedin.com/company/105505351/", "https://www.instagram.com/recruiting_solutions_group/"],
}
