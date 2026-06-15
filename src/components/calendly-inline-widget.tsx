"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/components/analytics";

type CalendlyInlineWidgetProps = {
  className?: string;
  loadStrategy?: "afterInteractive" | "lazyOnload";
  trackingLocation?: string;
  url: string;
};

type CalendlyApi = {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
  }) => void;
};

type CalendlyMessage = {
  event?: string;
  payload?: Record<string, unknown>;
};

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

function isCalendlyMessage(data: unknown): data is CalendlyMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    "event" in data &&
    typeof (data as CalendlyMessage).event === "string" &&
    (data as CalendlyMessage).event?.startsWith("calendly.") === true
  );
}

export function CalendlyInlineWidget({
  className = "h-[840px] w-full overflow-hidden rounded-[18px] border border-background/10 bg-background text-foreground sm:h-[900px] lg:h-[calc(100svh-245px)] lg:min-h-[600px] xl:h-[calc(100svh-230px)]",
  loadStrategy = "lazyOnload",
  trackingLocation = "agenda_calendly",
  url,
}: CalendlyInlineWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = globalThis.setTimeout(() => setShouldLoad(true), 0);

      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!scriptReady || !widgetRef.current || !window.Calendly) {
      return;
    }

    if (widgetRef.current.dataset.calendlyInitialized === "true") {
      return;
    }

    widgetRef.current.dataset.calendlyInitialized = "true";
    window.Calendly.initInlineWidget({
      url,
      parentElement: widgetRef.current,
    });
    setInitialized(true);
  }, [scriptReady, url]);

  useEffect(() => {
    function handleCalendlyMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com" || !isCalendlyMessage(event.data)) {
        return;
      }

      if (event.data.event === "calendly.event_type_viewed") {
        trackEvent("agenda_event_type_viewed", {
          location: trackingLocation,
          provider: "calendly",
        });
      }

      if (event.data.event === "calendly.date_and_time_selected") {
        trackEvent("agenda_date_selected", {
          location: trackingLocation,
          provider: "calendly",
        });
        trackEvent("lead_intent", {
          label: "Calendly date selected",
          location: trackingLocation,
          provider: "calendly",
        });
      }

      if (event.data.event === "calendly.event_scheduled") {
        trackEvent("agenda_scheduled", {
          location: trackingLocation,
          provider: "calendly",
        });
      }
    }

    window.addEventListener("message", handleCalendlyMessage);

    return () => {
      window.removeEventListener("message", handleCalendlyMessage);
    };
  }, [trackingLocation]);

  return (
    <div ref={rootRef} className={className}>
      {shouldLoad ? (
        <>
          <link
            href="https://assets.calendly.com/assets/external/widget.css"
            rel="stylesheet"
          />
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy={loadStrategy}
            onReady={() => setScriptReady(true)}
          />
        </>
      ) : null}
      {!initialized ? (
        <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-4 rounded-[18px] border border-mist/70 bg-background p-6 text-center text-foreground">
          <span className="h-10 w-10 rounded-full border-2 border-mist border-t-voltage motion-safe:animate-spin" aria-hidden="true" />
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.14em]">
              Cargando agenda
            </p>
            <p className="max-w-sm text-sm leading-6 text-sage">
              Estamos preparando los horarios disponibles para que puedas elegir el momento que mejor te quede.
            </p>
          </div>
        </div>
      ) : null}
      <div
        ref={widgetRef}
        className="h-full w-full"
      />
    </div>
  );
}
