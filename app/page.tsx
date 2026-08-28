import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { TrustedBySection } from "@/components/trusted-by-section"
import { ProblemSection } from "@/components/problem-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { BlogSection } from "@/components/blog-section"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <TrustedBySection />
        <ProblemSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <BlogSection />
        <FaqSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  )
}
