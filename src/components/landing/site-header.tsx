import { TrackedLink } from '@/components/analytics'

type SiteHeaderProps = {
  ctaHref?: string
  logoHref?: string
}

export function SiteHeader({
  ctaHref = '/agenda',
  logoHref = '/',
}: SiteHeaderProps) {
  return (
    <>
      <header
        data-site-header
        className='site-header fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-transparent px-5 py-4 sm:px-8 lg:px-12 2xl:px-16'
      >
        <a
          href={logoHref}
          aria-label='Volver al inicio'
          className='transition hover:opacity-75'
        >
          {/* Local SVG logo: a plain image avoids Next Image runtime sizing warnings. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/brand/impronta-growth-logo.svg'
            alt='Impronta Growth'
            className='brand-logo h-11 w-auto sm:h-12'
          />
        </a>
        <div className='flex items-center gap-2 sm:gap-3'>
          <TrackedLink
            href={ctaHref}
            leadIntent={ctaHref.includes('agenda')}
            trackingLabel='Agendar llamada'
            trackingLocation='site_header'
            className='cta-primary rounded-full px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition hover:translate-y-[-1px] sm:px-5 sm:text-xs'
          >
            Agendar llamada
          </TrackedLink>
        </div>
      </header>
      <div aria-hidden='true' className='h-[76px] sm:h-20' />
    </>
  )
}
