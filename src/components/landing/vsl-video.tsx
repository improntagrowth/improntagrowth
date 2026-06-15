import Script from "next/script";
import { Maximize2 } from "lucide-react";

export function VslVideo() {
  const wistiaMediaId = process.env.NEXT_PUBLIC_WISTIA_MEDIA_ID?.trim().replace(
    /[^a-zA-Z0-9]/g,
    "",
  );

  return (
    <div
      data-vsl-wrapper
      className="relative aspect-video min-w-0 max-w-full overflow-hidden rounded-[24px] border border-background/15 bg-foreground p-3 text-background sm:p-4 lg:col-start-2 lg:row-start-1 lg:self-start"
    >
      <div data-vsl-player className="vsl-player">
        {wistiaMediaId ? (
          <>
            <Script
              src="https://fast.wistia.net/assets/external/E-v1.js"
              strategy="afterInteractive"
            />
            <div
              data-vsl-wistia
              data-wistia-id={wistiaMediaId}
              className={`wistia_embed wistia_async_${wistiaMediaId} autoPlay=true muted=true silentAutoPlay=allow playsinline=true playSuspendedOffScreen=false videoFoam=true playerColor=2f7bff controlsVisibleOnLoad=true`}
            />
          </>
        ) : (
          <div className="grid h-full min-h-64 place-items-center rounded-[18px] border border-background/15 bg-background/10 p-8 text-center">
            <p className="max-w-sm text-sm font-semibold uppercase tracking-[0.12em] text-background/80">
              El video se está preparando. Si no carga en unos segundos, actualizá la página.
            </p>
          </div>
        )}

        {wistiaMediaId ? (
          <>
            <button
              type="button"
              data-vsl-unmute
              className="absolute left-1/2 top-4 z-20 max-w-[calc(100%-1.5rem)] -translate-x-1/2 rounded-full bg-foreground/70 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-background shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur transition hover:bg-foreground"
            >
              Activar sonido
            </button>
            <button
              type="button"
              data-vsl-fullscreen
              className="absolute right-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full bg-foreground/70 text-background shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur transition hover:bg-foreground"
              aria-label="Ver video en pantalla completa"
            >
              <Maximize2 size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
