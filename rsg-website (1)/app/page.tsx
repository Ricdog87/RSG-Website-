import { HeroSection } from "@/components/hero-section"
import { AboutUs } from "@/components/about-us"
import { Services } from "@/components/services"
import { ConnectRecruit } from "@/components/connect-recruit"
import { Elumalab } from "@/components/elumalab"
import { ContactSection } from "@/components/contact-section"
import { BlogPreview } from "@/components/blog-preview"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      <HeroSection />
      <AboutUs />
      <Services />
      <ConnectRecruit />
      <Elumalab />
      <BlogPreview />
      <ContactSection />
    </main>
  )
}
