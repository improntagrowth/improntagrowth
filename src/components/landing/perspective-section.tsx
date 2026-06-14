import { ScrollReveal } from "@/components/scroll-reveal";
import { information, perspective } from "@/content/landing";

export function PerspectiveSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
      <div className="grid gap-5 rounded-[28px] border border-mist bg-background/80 p-5 shadow-[0_18px_70px_rgba(18,22,19,0.055)] backdrop-blur md:p-8 lg:grid-cols-2 lg:p-10">
        <ScrollReveal>
          <article className="h-full rounded-[24px] bg-foreground p-6 text-background md:p-8 lg:p-10">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-background/55">
              {perspective.label}
            </p>

            <h2 className="max-w-[14ch] font-serif text-[clamp(2.5rem,4vw,5.2rem)] leading-[0.92] tracking-[-0.055em]">
              No necesitás copiar una <span className="text-voltage">fórmula</span>. Necesitás construir tu propio sistema.
            </h2>

            <div className="mt-8 space-y-5">
              <p className="text-base leading-7 text-background/72 md:text-lg md:leading-8">
              {perspective.description}
            </p>
              <p className="border-l border-voltage pl-5 text-lg leading-8 text-background/86 md:text-xl md:leading-8">
              {perspective.closing}
            </p>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <article className="signal-card h-full rounded-[24px] border border-mist p-6 md:p-8 lg:p-10">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-sage">
              {information.label}
            </p>

            <h3 className="max-w-[15ch] text-4xl leading-[0.95] tracking-[-0.055em] md:text-5xl lg:text-6xl">
              {information.title}
            </h3>

            <div className="mt-8 space-y-5">
              <p className="text-base leading-7 text-bark md:text-lg md:leading-8">
                {information.description}
              </p>
              <p className="text-base leading-7 text-bark md:text-lg md:leading-8">
                {information.closing}
              </p>
              <p className="inline-flex rounded-full bg-voltage/15 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
                {information.note}
              </p>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
