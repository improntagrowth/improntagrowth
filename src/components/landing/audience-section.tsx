import {
  BadgeCheck,
  CircleDollarSign,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { audience } from "@/content/landing";

const audienceIcons = [
  UserCheck,
  BadgeCheck,
  CircleDollarSign,
  TrendingUp,
];

export function AudienceSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
      <div className="grid gap-10 border-t border-mist pt-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:pt-10">
        <div className="space-y-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
            {audience.label}
          </p>
          <ScrollReveal>
            <h2 className="max-w-[15ch] font-serif text-[clamp(2.85rem,4.8vw,6.25rem)] leading-[0.94] tracking-[-0.055em]">
              {audience.title}
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">
          {audience.items.map((item, index) => {
            const Icon = audienceIcons[index];

            return (
              <ScrollReveal key={item} className="h-full" delay={index * 0.04}>
                <article className="signal-card group flex h-full min-h-28 items-start gap-4 rounded-[18px] border border-mist/80 p-4 transition duration-300 hover:-translate-y-1 hover:border-voltage/70 sm:min-h-36 sm:flex-col sm:justify-between sm:p-5">
                  <span className="signal-card__icon shrink-0" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <p className="text-base leading-7 tracking-[-0.025em] text-bark sm:mt-5 sm:text-lg">
                    {item}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
