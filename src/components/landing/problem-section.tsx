import { CalendarClock, Gauge, MessageCircle, PauseCircle } from "lucide-react";
import { problem } from "@/content/landing";
import { ScrollReveal } from "@/components/scroll-reveal";

const symptomIcons = [CalendarClock, MessageCircle, PauseCircle, Gauge];

export function ProblemSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
      <div className="grid gap-10 border-t border-mist pt-8 md:grid-cols-[minmax(180px,0.42fr)_minmax(0,1.58fr)] lg:gap-14 lg:pt-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
          {problem.label}
        </p>

        <div className="space-y-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] xl:items-start">
            <ScrollReveal>
              <h2 className="max-w-[17ch] font-serif text-[clamp(2.85rem,4.8vw,6.25rem)] leading-[0.94] tracking-[-0.055em]">
                {problem.title}
              </h2>
            </ScrollReveal>

            <ScrollReveal className="space-y-5 pt-1" delay={0.08}>
              <p className="text-base leading-7 text-bark md:text-xl md:leading-8 xl:text-2xl xl:leading-9">
                {problem.description}
              </p>
              <p className="border-l border-voltage pl-5 text-base leading-7 text-sage md:text-lg md:leading-8">
                {problem.perspective}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {problem.symptoms.map((symptom, index) => {
              const Icon = symptomIcons[index];

              return (
                <ScrollReveal
                  key={symptom.title}
                  className="h-full"
                  delay={index * 0.06}
                >
                  <article className="signal-card group h-full rounded-[18px] border border-mist/80 p-4 text-bark transition duration-300 hover:-translate-y-1 hover:border-voltage/70 sm:p-5">
                    <div className="mb-6 flex items-start justify-between gap-4 sm:mb-10">
                      <p className="text-xs uppercase tracking-[0.18em] text-sage transition-colors group-hover:text-foreground">
                        0{index + 1}
                      </p>
                      <span className="signal-card__icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl leading-7 tracking-[-0.035em] text-foreground">
                        {symptom.title}
                      </h3>
                      <p className="text-sm leading-6 text-sage md:text-base md:leading-7">
                        {symptom.description}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
