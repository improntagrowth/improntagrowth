import { TrackedLink } from "@/components/analytics";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CtaLabel } from "@/components/landing/cta-label";
import { proof } from "@/content/landing";

function getYouTubeEmbedUrl(url: string) {
  const id = url.match(/[?&]v=([^&]+)/)?.[1] ?? url.match(/youtu\.be\/([^?]+)/)?.[1];

  return id ? `https://www.youtube.com/embed/${id}` : url;
}

export function ProofSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
      <div className="grid gap-10 rounded-[28px] bg-foreground p-5 text-background shadow-[0_24px_90px_rgba(18,22,19,0.16)] sm:p-8 lg:p-10 xl:p-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] md:items-end">
          <ScrollReveal>
            <h2 className="max-w-[15ch] font-serif text-[clamp(3rem,5vw,6.5rem)] leading-[0.92] tracking-[-0.06em]">
              {proof.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <p className="max-w-2xl text-base leading-7 text-background/72 md:text-xl md:leading-8">
              {proof.description}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid auto-rows-fr gap-4 lg:grid-cols-3">
          {proof.cases.map((item, index) => (
            <ScrollReveal key={item.name} className="h-full" delay={index * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-background/15 bg-background text-foreground shadow-[0_18px_70px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-voltage/70">
                <div className="relative aspect-video overflow-hidden bg-foreground">
                  <iframe
                    src={getYouTubeEmbedUrl(item.videoUrl)}
                    title={`Testimonio de ${item.name}`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-6 p-5 md:p-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.16em] text-sage">
                        {item.niche}
                      </p>
                      <h3 className="text-2xl leading-tight tracking-[-0.045em] text-foreground md:text-3xl">
                        {item.name}
                      </h3>
                    </div>

                  <p className="font-serif text-[clamp(2rem,3vw,3.3rem)] leading-[0.94] tracking-[-0.06em] text-foreground">
                    {item.result}
                  </p>

                  <blockquote className="border-l border-voltage pl-4 text-base leading-7 text-sage">
                    “{item.quote}”
                  </blockquote>

                  <p className="text-sm leading-6 text-bark md:text-base md:leading-7">
                    {item.context}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid gap-6 rounded-[24px] border border-background/15 bg-background/5 p-5 md:grid-cols-[minmax(220px,0.34fr)_minmax(0,1fr)] md:p-7">
          <ScrollReveal>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-background/55">
                Más evidencia
              </p>
              <p className="max-w-sm text-2xl leading-tight tracking-[-0.045em] text-background md:text-3xl">
                Otros resultados que completan el contexto.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-3 md:grid-cols-3">
            {proof.quickResults.map((item, index) => (
              <ScrollReveal key={item} delay={index * 0.04}>
                <p className="h-full rounded-[18px] border border-background/15 bg-background/10 p-4 text-sm leading-6 text-background/80 md:text-base md:leading-7">
                  {item}
                </p>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-background/55 md:col-start-2">
            {proof.note}
          </p>
          <div className="md:col-start-2">
            <TrackedLink
              href="/resultados"
              eventName="cta_click"
              trackingLabel={proof.moreCta}
              trackingLocation="home_proof_more_results"
              className="cta-primary inline-flex w-full items-center justify-between gap-4 rounded-[10px] px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em] transition hover:translate-y-[-1px] sm:w-auto sm:justify-center"
            >
              <CtaLabel>{proof.moreCta}</CtaLabel>
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
