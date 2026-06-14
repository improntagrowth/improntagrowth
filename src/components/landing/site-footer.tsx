import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="w-full px-5 py-10 sm:px-8 lg:px-12 2xl:px-16">
      <div className="grid gap-8 border-t border-mist pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="space-y-5">
          {/* Local SVG logo: a plain image avoids Next Image runtime sizing warnings. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/impronta-growth-logo.svg"
            alt="Impronta Growth"
            className="brand-logo h-12 w-auto"
          />
          <p className="max-w-xl text-sm leading-6 text-sage">
            Un sistema para ordenar tu oferta, atraer mejores clientes y escalar con tu propia impronta.
          </p>
        </div>

        <div className="flex items-end justify-between gap-6 md:justify-end">
          <p className="text-xs uppercase tracking-[0.18em] text-sage">
            Impronta Growth<br />2026
          </p>
          <BrandMark animated className="h-20 w-14 opacity-80" />
        </div>
      </div>
    </footer>
  );
}
