import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { StatsBar } from "@/components/landing/stats-bar"
import { FormSection } from "@/components/landing/form-section"
import { Offers } from "@/components/landing/offers"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Advantages } from "@/components/landing/advantages"
import { Reviews } from "@/components/landing/reviews"
import { Faq } from "@/components/landing/faq"
import { FinalCta } from "@/components/landing/final-cta"
import { SiteFooter } from "@/components/landing/site-footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <StatsBar />
        <FormSection />
        <Offers />
        <HowItWorks />
        <Advantages />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
