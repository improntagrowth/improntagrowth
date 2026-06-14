import { ShieldCheck } from "lucide-react";
import { GuaranteeMotion } from "@/components/landing/landing-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { guarantee } from "@/content/landing";

export function GuaranteeSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
      <div className="grid gap-8 border-t border-mist pt-8 lg:grid-cols-[minmax(180px,0.42fr)_minmax(0,1.58fr)] lg:pt-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
          {guarantee.label}
        </p>
        <ScrollReveal>
          <GuaranteeMotion className="max-w-5xl">
            <div className="relative overflow-hidden rounded-[24px] border border-mist p-6 md:p-10">
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                <div>
                  <h2 className="max-w-[18ch] font-serif text-[clamp(2.6rem,4.2vw,5.4rem)] leading-[0.94] tracking-[-0.055em]">
                    {guarantee.title}
                  </h2>
                  <span data-guarantee-line className="mt-5 block h-1 w-44 rounded-full bg-voltage" aria-hidden="true" />
                </div>

                <div data-guarantee-seal className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-voltage/40 bg-voltage/12 text-voltage shadow-[0_18px_60px_rgba(47,123,255,0.18)] md:h-28 md:w-28" aria-hidden="true">
                  <ShieldCheck size={34} strokeWidth={1.6} />
                </div>
              </div>

              <p className="mt-8 max-w-3xl text-base leading-7 text-bark md:text-xl md:leading-8">
                {guarantee.description}
              </p>
              <p className="mt-8 rounded-[14px] bg-voltage/15 px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
                {guarantee.note}
              </p>
            </div>
          </GuaranteeMotion>
        </ScrollReveal>
      </div>
    </section>
  );
}
