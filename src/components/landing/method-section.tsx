import { Megaphone, PackageCheck, UserCheck, Workflow } from "lucide-react";
import { MethodMotion } from "@/components/landing/landing-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { method } from "@/content/landing";

const methodIcons = [UserCheck, Megaphone, PackageCheck, Workflow];

export function MethodSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
      <div className="grid gap-10 border-t border-mist pt-8 lg:pt-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:items-end">
          <div className="space-y-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
              {method.label}
            </p>
            <ScrollReveal>
              <h2 className="max-w-[15ch] font-serif text-[clamp(2.85rem,4.8vw,6.25rem)] leading-[0.94] tracking-[-0.055em]">
                El Ecosistema <span className="text-voltage">Predecible</span>: cuatro piezas para ordenar tu crecimiento.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.08}>
            <p className="max-w-3xl text-base leading-7 text-bark md:text-xl md:leading-8">
              {method.description}
            </p>
          </ScrollReveal>
        </div>

        <MethodMotion>
          <div className="overflow-hidden rounded-[28px] border border-mist bg-foreground text-background shadow-[0_24px_90px_rgba(18,22,19,0.16)] lg:hidden">
            {method.steps.map((step, index) => {
              const Icon = methodIcons[index];

              return (
                <ScrollReveal key={step.title} delay={index * 0.06}>
                  <article data-method-card className="group relative grid gap-5 border-b border-background/12 p-5 last:border-b-0 sm:grid-cols-[72px_minmax(0,0.58fr)_minmax(260px,1fr)] sm:items-center md:p-7 lg:p-8">
                    <div className="relative flex items-center gap-4 sm:block">
                      <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border border-background/25 bg-background text-foreground shadow-[0_14px_42px_rgba(0,0,0,0.22)] transition group-hover:border-voltage group-hover:bg-voltage group-hover:text-background" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span className="font-serif text-4xl leading-none tracking-[-0.06em] text-background/20 sm:mt-5 sm:block">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-2xl leading-tight tracking-[-0.045em] md:text-3xl xl:text-4xl">
                      {step.title}
                    </h3>
                    <p className="text-base leading-7 text-background/72 md:text-lg md:leading-8">
                      {step.description}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="hidden rounded-[28px] border border-mist bg-foreground p-8 text-background shadow-[0_24px_90px_rgba(18,22,19,0.16)] lg:block xl:p-10">
            <div className="relative grid grid-cols-4 gap-5">
              {method.steps.map((step, index) => {
                const Icon = methodIcons[index];

                return (
                  <ScrollReveal key={step.title} className="h-full" delay={index * 0.06}>
                    <article data-method-card className="group relative flex h-full flex-col gap-7 overflow-hidden rounded-[22px] border border-background/12 bg-background/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-voltage/70 hover:bg-background/[0.07] xl:p-7">
                      <div className="relative z-10 flex items-center justify-between gap-4">
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-background/25 bg-background text-foreground shadow-[0_14px_42px_rgba(0,0,0,0.22)] transition group-hover:border-voltage group-hover:bg-voltage group-hover:text-background" aria-hidden="true">
                          <Icon size={18} strokeWidth={1.8} />
                        </span>
                        <span className="h-px flex-1 bg-background/14" aria-hidden="true" />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-3xl leading-[0.95] tracking-[-0.055em] xl:text-4xl">
                          {step.title}
                        </h3>
                        <p className="text-base leading-7 text-background/70">
                          {step.description}
                        </p>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </MethodMotion>
      </div>
    </section>
  );
}
