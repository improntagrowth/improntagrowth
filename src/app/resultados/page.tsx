import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileCheck2 } from 'lucide-react'
import { TrackPageEvent, TrackedLink } from '@/components/analytics'
import { BrandMark } from '@/components/brand-mark'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteHeader } from '@/components/landing/site-header'
import { proof } from '@/content/landing'

function getYouTubeEmbedUrl(url: string) {
  const id =
    url.match(/[?&]v=([^&]+)/)?.[1] ?? url.match(/youtu\.be\/([^?]+)/)?.[1]

  return id ? `https://www.youtube.com/embed/${id}` : url
}

export const metadata: Metadata = {
  title: 'Resultados | Impronta Growth',
  description:
    'Casos documentados de clientes de Impronta Growth con testimonios, contexto y evidencia del proceso.',
}

export default function ResultadosPage() {
  return (
    <main
      id='top'
      className='landing-shell min-h-screen overflow-clip bg-background text-foreground'
    >
      <TrackPageEvent eventName='results_view' />
      <SiteHeader ctaHref='/agenda' />

      <section className='w-full px-5 pb-16 pt-10 sm:px-8 lg:px-12 lg:pb-24 lg:pt-14 2xl:px-16'>
        <div className='grid gap-10 border-t border-mist pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:items-end lg:pt-10'>
          <div className='space-y-8'>
            <ScrollReveal>
              <Link
                href='/'
                className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sage transition hover:text-foreground'
              >
                <ArrowLeft size={15} strokeWidth={1.8} aria-hidden='true' />
                Volver a la landing
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <p className='text-xs font-medium uppercase tracking-[0.18em] text-sage'>
                Resultados documentados
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className='max-w-[12ch] font-serif text-[clamp(3.2rem,7vw,8rem)] leading-[0.88] tracking-[-0.07em]'>
                Casos reales, con contexto y evidencia.
              </h1>
            </ScrollReveal>
          </div>

          <ScrollReveal className='space-y-6' delay={0.16}>
            <p className='max-w-2xl text-base leading-7 text-bark md:text-xl md:leading-8'>
              Esta página reúne los casos principales que respaldan la propuesta
              de Impronta. La idea no es mostrar números sueltos, sino explicar
              de dónde partía cada cliente, qué se trabajó y qué evidencia
              existe.
            </p>
            <p className='border-l border-voltage pl-5 text-base leading-7 text-sage md:text-lg md:leading-8'>
              Los videos están embebidos en esta página para que puedas ver cada
              testimonio sin salir de la web. Los documentos/capturas quedan
              como base de evidencia interna para seguir ampliando esta página
              cuando el cliente apruebe el material final.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className='w-full px-5 py-12 sm:px-8 lg:px-12 lg:py-20 2xl:px-16'>
        <div className='grid gap-5'>
          {proof.cases.map((item, index) => (
            <ScrollReveal key={item.name} delay={index * 0.06}>
              <article className='grid gap-0 overflow-hidden rounded-[28px] border border-mist bg-background shadow-[0_18px_70px_rgba(18,22,19,0.055)] lg:grid-cols-[minmax(320px,0.55fr)_minmax(0,1fr)]'>
                <div className='relative min-h-72 overflow-hidden bg-foreground lg:min-h-full'>
                  <iframe
                    src={getYouTubeEmbedUrl(item.videoUrl)}
                    title={`Testimonio de ${item.name}`}
                    className='h-full min-h-72 w-full lg:absolute lg:inset-0 lg:min-h-full'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                  />
                </div>

                <div className='grid gap-10 p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)]'>
                  <div className='space-y-7'>
                    <div className='space-y-2'>
                      <p className='text-xs uppercase tracking-[0.16em] text-sage'>
                        {item.niche}
                      </p>
                      <h2 className='text-4xl leading-none tracking-[-0.06em] md:text-6xl'>
                        {item.name}
                      </h2>
                    </div>

                    <p className='max-w-3xl font-serif text-[clamp(2.35rem,4vw,5rem)] leading-[0.92] tracking-[-0.065em]'>
                      {item.result}
                    </p>

                    <blockquote className='max-w-2xl border-l border-voltage pl-5 text-xl leading-8 text-sage md:text-2xl md:leading-9'>
                      “{item.quote}”
                    </blockquote>

                    <p className='max-w-3xl text-base leading-7 text-bark md:text-lg md:leading-8'>
                      {item.context}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className='w-full px-5 py-12 sm:px-8 lg:px-12 lg:py-20 2xl:px-16'>
        <div className='grid gap-8 rounded-[28px] bg-foreground p-8 text-background md:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center'>
          <div className='space-y-5'>
            <p className='text-xs uppercase tracking-[0.18em] text-background/55'>
              Próximo paso
            </p>
            <h2 className='max-w-3xl font-serif text-[clamp(2.8rem,5vw,6rem)] leading-[0.9] tracking-[-0.06em]'>
              Si querés saber si tu caso puede seguir este camino, agendemos una
              llamada.
            </h2>
          </div>
          <div className='flex flex-col items-start gap-8 lg:items-center'>
            <BrandMark animated className='h-32 w-auto text-background' />
            <TrackedLink
              href='/agenda'
              leadIntent
              trackingLabel='Quiero agendar mi llamada'
              trackingLocation='results_final_cta'
              className='cta-primary inline-flex rounded-[10px] px-8 py-5 text-sm font-semibold uppercase tracking-[0.08em]'
            >
              Quiero agendar mi llamada →
            </TrackedLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
