"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";

const minimumVisibleMs = 700;
const maximumVisibleMs = 1600;

export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let hideTimer: number | undefined;
    let hasStartedLeaving = false;

    function hide() {
      if (hasStartedLeaving) {
        return;
      }

      hasStartedLeaving = true;
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minimumVisibleMs - elapsed);

      hideTimer = window.setTimeout(() => {
        setLeaving(true);
        window.setTimeout(() => setVisible(false), 420);
      }, remaining);
    }

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    const maxTimer = window.setTimeout(hide, maximumVisibleMs);

    return () => {
      window.removeEventListener("load", hide);

      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }

      window.clearTimeout(maxTimer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={`site-loader ${leaving ? "site-loader--leaving" : ""}`}>
      <BrandMark animated className="h-28 w-auto text-background sm:h-36" />
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-background/60">
        Impronta Growth
      </p>
    </div>
  );
}
