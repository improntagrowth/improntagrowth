"use client";

import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
  useEffect,
} from "react";

export type AnalyticsProperties = Record<
  string,
  boolean | number | string | null | undefined
>;

type AnalyticsEventName =
  | "agenda_date_selected"
  | "agenda_event_type_viewed"
  | "agenda_scheduled"
  | "agenda_view"
  | "cta_click"
  | "lead_intent"
  | "results_view"
  | "scroll_50"
  | "scroll_75"
  | "testimonial_click"
  | "vsl_fullscreen"
  | "vsl_play"
  | "vsl_unmute"
  | "vsl_view";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const analyticsDebug = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

export function trackEvent(
  eventName: AnalyticsEventName,
  properties: AnalyticsProperties = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = {
    event: eventName,
    page_path: window.location.pathname,
    page_url: window.location.href,
    ...properties,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);

  if (analyticsDebug) {
    console.info("[analytics]", eventPayload);
  }
}

type TrackedLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  eventName?: AnalyticsEventName;
  leadIntent?: boolean;
  trackingLabel: string;
  trackingLocation: string;
  trackingProperties?: AnalyticsProperties;
  children: ReactNode;
};

export function TrackedLink({
  children,
  eventName = "cta_click",
  href,
  leadIntent = false,
  onClick,
  trackingLabel,
  trackingLocation,
  trackingProperties,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const eventProperties = {
      href,
      label: trackingLabel,
      location: trackingLocation,
      ...trackingProperties,
    };

    trackEvent(eventName, eventProperties);

    if (leadIntent) {
      trackEvent("lead_intent", eventProperties);
    }
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

type TrackPageEventProps = {
  eventName: Extract<AnalyticsEventName, "agenda_view" | "results_view">;
  properties?: AnalyticsProperties;
};

export function TrackPageEvent({ eventName, properties }: TrackPageEventProps) {
  useEffect(() => {
    trackEvent(eventName, properties);
  }, [eventName, properties]);

  return null;
}

export function ScrollDepthTracker() {
  useEffect(() => {
    const trackedDepths = new Set<number>();
    const thresholds = [50, 75];
    let ticking = false;

    function trackScrollDepth() {
      ticking = false;

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const scrollDepth = Math.round(
        (window.scrollY / scrollableHeight) * 100,
      );

      for (const threshold of thresholds) {
        if (scrollDepth >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          trackEvent(threshold === 50 ? "scroll_50" : "scroll_75", {
            threshold,
          });
        }
      }
    }

    function scheduleScrollDepthCheck() {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(trackScrollDepth);
    }

    trackScrollDepth();
    window.addEventListener("scroll", scheduleScrollDepthCheck, {
      passive: true,
    });
    window.addEventListener("resize", scheduleScrollDepthCheck);

    return () => {
      window.removeEventListener("scroll", scheduleScrollDepthCheck);
      window.removeEventListener("resize", scheduleScrollDepthCheck);
    };
  }, []);

  return null;
}
