import {
  GraduationCap,
  LifeBuoy,
  MessageCircle,
  MonitorPlay,
} from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { support } from "@/content/landing";

const supportIcons = [
  LifeBuoy,
  GraduationCap,
  MessageCircle,
  MonitorPlay,
];

export function SupportSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
      <div className="grid gap-10 rounded-[28px] bg-foreground p-6 text-background md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] xl:p-14">
        <div className="space-y-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-background/60">
            {support.label}
          </p>
          <ScrollReveal>
              <h2 className="max-w-[15ch] font-serif text-[clamp(2.85rem,4.8vw,6.25rem)] leading-[0.94] tracking-[-0.055em]">
                Lo construís con <span className="text-voltage">respaldo real</span> en cada paso.
              </h2>
            </ScrollReveal>
          </div>

        <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">
          {support.items.map((item, index) => {
            const Icon = supportIcons[index];

            return (
              <ScrollReveal key={item} className="h-full" delay={index * 0.04}>
                <article className="signal-card signal-card--dark group flex h-full min-h-28 items-start gap-4 rounded-[18px] border border-background/20 p-4 transition duration-300 hover:-translate-y-1 hover:border-voltage/70 sm:min-h-36 sm:flex-col sm:p-5">
                  <span className="signal-card__icon shrink-0" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <p className="text-base leading-7 tracking-[-0.025em] text-background/85 sm:mt-5 sm:text-lg">
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
