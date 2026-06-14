"use client";

import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/analytics";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const [blockedByFinalCta, setBlockedByFinalCta] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 560);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const finalCta = document.querySelector("#clarity-call");

    if (!finalCta) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setBlockedByFinalCta(entry.isIntersecting),
      { threshold: 0.18 }
    );

    observer.observe(finalCta);

    return () => observer.disconnect();
  }, []);

  if (!visible || blockedByFinalCta) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6">
      <TrackedLink
        href="/agenda"
        leadIntent
        trackingLabel="Agendar llamada flotante"
        trackingLocation="floating_cta"
        className="cta-primary inline-flex items-center gap-3 rounded-full px-5 py-4 text-sm font-semibold uppercase tracking-[0.08em] transition hover:-translate-y-0.5"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-voltage shadow-[0_0_18px_rgba(47,123,255,0.55)]" />
        Agendar llamada
      </TrackedLink>
    </div>
  );
}
