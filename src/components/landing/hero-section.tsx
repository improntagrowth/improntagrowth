import { TrackedLink } from '@/components/analytics'
import { ScrollReveal } from '@/components/scroll-reveal'
import { hero } from '@/content/landing'
import { CtaLabel } from '@/components/landing/cta-label'
import { VslVideo } from '@/components/landing/vsl-video'

const titleHighlight = 'US$10.000-30.000'

export function HeroSection() {
  const [titleStart, titleEnd = ''] = hero.title.split(titleHighlight)

  return (
    <section className='grid w-full min-w-0 gap-5 overflow-hidden px-5 pb-16 pt-6 sm:px-8 md:min-h-[calc(100svh-76px)] lg:grid-cols-[minmax(0,0.94fr)_minmax(500px,1fr)] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-2 lg:px-12 lg:pb-6 lg:pt-6 2xl:px-16'>
      <div className='min-w-0 space-y-5 lg:space-y-4'>
        <ScrollReveal>
          <div className='hero-marquee' aria-label={hero.eyebrow}>
            <div className='hero-marquee__track' aria-hidden='true'>
              <span>{hero.eyebrow}</span>
              <span>{hero.eyebrow}</span>
              <span>{hero.eyebrow}</span>
              <span>{hero.eyebrow}</span>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h1 className='max-w-[15ch] font-serif text-[clamp(2.75rem,4.75vw,5.55rem)] leading-[0.88] tracking-[-0.065em]'>
            {titleStart}
            <span className='hero-title-highlight'>{titleHighlight}</span>
            {titleEnd}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <TrackedLink
            href='/agenda'
            leadIntent
            trackingLabel={hero.cta}
            trackingLocation='hero_desktop'
            className='cta-primary hidden max-w-full items-center justify-between gap-4 rounded-[10px] px-8 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em] transition hover:translate-y-[-1px] lg:inline-flex'
          >
            <CtaLabel>{hero.cta}</CtaLabel>
          </TrackedLink>
        </ScrollReveal>
      </div>

      <ScrollReveal className='lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-[820px] lg:self-center' delay={0.12}>
        <VslVideo />
      </ScrollReveal>

      <div className='grid min-w-0 gap-5 border-t border-mist pt-5 md:grid-cols-[minmax(180px,0.75fr)_minmax(320px,1fr)] md:items-end lg:col-start-1 lg:row-start-2 lg:max-w-3xl lg:grid-cols-1 lg:items-start lg:gap-3 lg:pt-3'>
        <p className='rounded-full border border-mist bg-background/80 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-sage shadow-[0_12px_36px_rgba(18,22,19,0.055)] sm:text-sm lg:hidden'>
          {hero.proof}
        </p>
        <ScrollReveal className='min-w-0 space-y-5 lg:space-y-4' delay={0.12}>
          <p className='max-w-2xl text-base leading-7 text-bark md:text-lg lg:text-base lg:leading-7 xl:text-lg xl:leading-8'>
            {hero.description}
          </p>
          <TrackedLink
            href='/agenda'
            leadIntent
            trackingLabel={hero.cta}
            trackingLocation='hero_mobile'
            className='cta-primary inline-flex w-full max-w-full items-center justify-between gap-4 rounded-[10px] px-6 py-5 text-left text-sm font-semibold uppercase tracking-[0.08em] transition hover:translate-y-[-1px] sm:w-auto sm:px-8 lg:hidden'
          >
            <CtaLabel>{hero.cta}</CtaLabel>
          </TrackedLink>
        </ScrollReveal>
      </div>

      <ScrollReveal
        className='hidden min-w-0 border-t border-mist pt-3 text-center lg:col-start-2 lg:row-start-2 lg:mx-auto lg:block lg:w-full lg:max-w-[820px]'
        delay={0.2}
      >
        <p className='mx-auto inline-flex rounded-full border border-mist bg-background/80 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-sage shadow-[0_12px_36px_rgba(18,22,19,0.055)]'>
          {hero.proof}
        </p>
        <div className='mt-3 grid grid-cols-3 gap-3'>
          {hero.pillars.map((pillar) => (
            <div
              key={pillar}
              className='rounded-[14px] border border-mist/70 px-4 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-bark'
            >
              {pillar}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
