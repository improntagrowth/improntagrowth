import { AudienceSection } from "@/components/landing/audience-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { FloatingCta } from "@/components/landing/floating-cta";
import { GuaranteeSection } from "@/components/landing/guarantee-section";
import { HeroSection } from "@/components/landing/hero-section";
import { MethodSection } from "@/components/landing/method-section";
import { PerspectiveSection } from "@/components/landing/perspective-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { ProofSection } from "@/components/landing/proof-section";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { SupportSection } from "@/components/landing/support-section";

export default function Home() {
  return (
    <main id="top" className="landing-shell min-h-screen overflow-clip bg-background text-foreground">
      <SiteHeader />
      <HeroSection />
      <ProblemSection />
      <PerspectiveSection />
      <AudienceSection />
      <ProofSection />
      <MethodSection />
      <SupportSection />
      <GuaranteeSection />
      <FinalCtaSection />
      <FaqSection />
      <SiteFooter />
      <FloatingCta />
    </main>
  );
}
