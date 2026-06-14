import { BrandMark } from "@/components/brand-mark";
import { TrackedLink } from "@/components/analytics";
import { finalCta } from "@/content/landing";

export function FinalCtaSection() {
  return (
    <section
      id="clarity-call"
      className="w-full px-5 py-16 sm:px-8 lg:px-12 lg:py-24 2xl:px-16"
    >
      <div className="rounded-[28px] bg-foreground p-6 text-background md:p-10 xl:p-14">
        <p className="mb-6 text-xs uppercase tracking-[0.18em] text-background/60">
          {finalCta.label}
        </p>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)] lg:items-end">
          <div>
            <h2 className="max-w-[19ch] font-serif text-[clamp(2.65rem,4.4vw,5.8rem)] leading-[0.92] tracking-[-0.055em]">
              {finalCta.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-background/75 md:text-lg md:leading-8">
              {finalCta.description}
            </p>
          </div>

          <div className="flex flex-col items-center gap-7">
            <BrandMark
              animated
              className="h-32 w-auto text-background sm:h-44 lg:h-[clamp(12rem,18vw,20rem)]"
            />
            <TrackedLink
              href="/agenda"
              leadIntent
              trackingLabel={finalCta.cta}
              trackingLocation="final_cta"
              className="cta-primary inline-flex rounded-[10px] px-8 py-5 text-sm font-semibold uppercase tracking-[0.08em]"
            >
              {finalCta.cta}
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
