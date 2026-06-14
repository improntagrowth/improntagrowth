import { CalendlyInlineWidget } from "@/components/calendly-inline-widget";
import { ScrollReveal } from "@/components/scroll-reveal";

const defaultAgendaUrl =
  "https://calendly.com/agustinbarberi/sesion-de-consultoria";

export function HomeAgendaSection() {
  const agendaEmbedUrl =
    process.env.NEXT_PUBLIC_AGENDA_EMBED_URL?.trim() || defaultAgendaUrl;

  return (
    <section id="agenda-preview" className="w-full px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
      <div className="grid gap-6 rounded-[28px] bg-foreground p-4 text-background shadow-[0_24px_90px_rgba(18,22,19,0.16)] sm:p-5 lg:grid-cols-[minmax(260px,0.42fr)_minmax(620px,1fr)] lg:gap-8 lg:p-6">
        <ScrollReveal className="space-y-4 p-2 lg:p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-background/55">
            Agenda tu llamada
          </p>
          <h2 className="max-w-[12ch] font-serif text-[clamp(2.4rem,4.6vw,5.4rem)] leading-[0.88] tracking-[-0.06em]">
            Si ya estás listo, no hace falta seguir scrolleando.
          </h2>
          <p className="max-w-md text-sm leading-6 text-background/70 md:text-base md:leading-7">
            Podés elegir un horario ahora. Revisamos tu caso, vemos dónde estás y definimos si tiene sentido avanzar.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="overflow-hidden rounded-[22px] bg-background p-3 text-foreground sm:p-4">
            <CalendlyInlineWidget
              url={agendaEmbedUrl}
              trackingLocation="home_agenda_inline"
              className="h-[760px] w-full overflow-hidden rounded-[18px] bg-background text-foreground sm:h-[820px] lg:h-[720px]"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
