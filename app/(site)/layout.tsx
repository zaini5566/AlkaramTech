import { FooterSection } from "@/components/footer-section"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FooterSection />
    </>
  )
}
