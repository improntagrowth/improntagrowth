import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { TrackPageEvent } from "@/components/analytics";
import { BrandMark } from "@/components/brand-mark";
import { CalendlyInlineWidget } from "@/components/calendly-inline-widget";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { agenda } from "@/content/landing";

const defaultAgendaUrl =
  "https://calendly.com/agustinbarberi/sesion-de-consultoria";

export const metadata: Metadata = {
  title: "Agenda | Impronta Growth",
  description:
    "Agendá una llamada de claridad para revisar si Impronta Growth puede ayudarte a construir un sistema de crecimiento más predecible.",
};

export default function AgendaPage() {
  const agendaEmbedUrl =
    process.env.NEXT_PUBLIC_AGENDA_EMBED_URL?.trim() || defaultAgendaUrl;

  return (
    <main id="top" className="landing-shell min-h-screen overflow-clip bg-background text-foreground">
      <TrackPageEvent
        eventName="agenda_view"
        properties={{ agenda_provider: "calendly", has_calendar_embed: true }}
      />
      <SiteHeader ctaHref="#agenda-calendar" />

      <section className="grid w-full gap-6 px-5 pb-20 pt-6 sm:px-8 lg:grid-cols-[minmax(300px,0.52fr)_minmax(720px,1.1fr)] lg:items-start lg:gap-x-8 lg:gap-y-5 lg:px-12 lg:pb-24 lg:pt-6 2xl:grid-cols-[minmax(340px,0.48fr)_minmax(820px,1.18fr)] 2xl:px-16">
        <div className="space-y-5 lg:col-start-1 lg:row-start-1 lg:pt-2">
          <ScrollReveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sage transition hover:text-foreground"
            >
              <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
              Volver a la landing
            </Link>
          </ScrollReveal>

          <div className="space-y-4">
            <ScrollReveal delay={0.04}>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
                {agenda.label}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h1 className="max-w-[11ch] font-serif text-[clamp(2.75rem,4.7vw,5.9rem)] leading-[0.86] tracking-[-0.07em]">
                {agenda.title}
              </h1>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal className="lg:col-start-2 lg:row-span-2 lg:row-start-1" delay={0.18}>
          <div
            id="agenda-calendar"
            className="rounded-[24px] bg-foreground p-4 text-background shadow-[0_24px_90px_rgba(18,22,19,0.16)] sm:p-5 lg:p-5"
          >
            <div className="mb-3 hidden items-start justify-between gap-5 sm:flex">
              <div>
                <p className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-background/55">
                  Próximo paso
                </p>
                <h2 className="text-2xl leading-none tracking-[-0.055em] md:text-3xl">
                  {agenda.calendarTitle}
                </h2>
              </div>
              <BrandMark animated className="hidden h-16 w-auto text-background/80 sm:block" />
            </div>

            <CalendlyInlineWidget
              url={agendaEmbedUrl}
              loadStrategy="afterInteractive"
              className="h-[760px] w-full overflow-auto rounded-[18px] border border-background/10 bg-background text-foreground sm:h-[820px] lg:h-[calc(100svh-245px)] lg:min-h-[600px] lg:overflow-hidden xl:h-[calc(100svh-230px)]"
            />
          </div>
        </ScrollReveal>

        <div className="space-y-5 lg:col-start-1 lg:row-start-2">
          <ScrollReveal delay={0.12}>
            <p className="max-w-2xl text-base leading-7 text-bark md:text-lg md:leading-8 lg:max-w-xl lg:text-base lg:leading-7">
              {agenda.description}
            </p>
          </ScrollReveal>
          <ScrollReveal className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" delay={0.16}>
            {agenda.bullets.map((bullet) => (
              <article
                key={bullet}
                className="signal-card group rounded-[18px] border border-mist/80 p-4 transition duration-300 hover:-translate-y-1 hover:border-voltage/70"
              >
                <span className="signal-card__icon mb-5" aria-hidden="true">
                  <CheckCircle2 size={18} strokeWidth={1.8} />
                </span>
                <p className="text-sm leading-6 text-bark">
                  {bullet}
                </p>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
