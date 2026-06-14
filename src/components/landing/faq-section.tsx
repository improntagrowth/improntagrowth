import { ScrollReveal } from "@/components/scroll-reveal";
import { faq } from "@/content/landing";

export function FaqSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
      <div className="grid gap-10 border-t border-mist pt-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)] lg:pt-10">
        <div className="space-y-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
            {faq.label}
          </p>
          <ScrollReveal>
            <h2 className="max-w-[13ch] font-serif text-[clamp(2.85rem,4.8vw,6.25rem)] leading-[0.94] tracking-[-0.055em]">
              {faq.title}
            </h2>
          </ScrollReveal>
        </div>

        <div className="divide-y divide-mist border-y border-mist">
          {faq.items.map((item, index) => (
            <ScrollReveal key={item.question} delay={index * 0.035}>
              <details className="group py-5">
                <summary className="flex list-none items-start justify-between gap-5 text-xl leading-7 tracking-[-0.035em] text-foreground marker:hidden md:text-2xl">
                  <span>{item.question}</span>
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mist text-sm text-sage transition group-open:rotate-45 group-open:border-voltage group-open:text-foreground">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-base leading-7 text-bark md:text-lg md:leading-8">
                  {item.answer}
                </p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
