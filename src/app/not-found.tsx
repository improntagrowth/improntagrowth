import { BrandMark } from "@/components/brand-mark";
import { TrackedLink } from "@/components/analytics";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export default function NotFound() {
  return (
    <main className="landing-shell min-h-screen overflow-clip bg-background text-foreground">
      <SiteHeader logoHref="/" />

      <section className="grid min-h-[calc(100svh-76px)] w-full place-items-center px-5 py-20 sm:px-8 lg:min-h-[calc(100svh-80px)] lg:px-12 2xl:px-16">
        <div className="grid w-full gap-10 rounded-[28px] border border-mist bg-background/80 p-7 shadow-[0_18px_70px_rgba(18,22,19,0.055)] md:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.38fr)] lg:items-end">
          <div className="space-y-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
              Página no encontrada
            </p>
            <div className="space-y-6">
              <h1 className="max-w-[12ch] font-serif text-[clamp(5rem,15vw,14rem)] leading-[0.78] tracking-[-0.09em]">
                404
              </h1>
              <p className="max-w-2xl text-balance text-4xl leading-[0.95] tracking-[-0.055em] md:text-6xl lg:text-7xl">
                Esta ruta no dejó una impronta clara.
              </p>
            </div>
            <p className="max-w-xl text-base leading-7 text-bark md:text-lg md:leading-8">
              El enlace puede haber cambiado o estar mal escrito. Volvé a la landing
              o agendá una llamada para seguir por el camino correcto.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/"
                trackingLabel="Volver a la landing"
                trackingLocation="not_found"
                className="inline-flex justify-center rounded-[10px] bg-foreground px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-background shadow-[1px_8px_20px_rgba(18,22,19,0.16)] transition hover:translate-y-[-1px]"
              >
                Volver a la landing
              </TrackedLink>
              <TrackedLink
                href="/agenda"
                leadIntent
                trackingLabel="Agendar llamada"
                trackingLocation="not_found"
                className="cta-primary inline-flex justify-center rounded-[10px] px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] transition hover:translate-y-[-1px]"
              >
                Agendar llamada
              </TrackedLink>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <BrandMark
              animated
              className="h-48 w-auto text-foreground/80 sm:h-64 lg:h-[clamp(18rem,28vw,34rem)]"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
