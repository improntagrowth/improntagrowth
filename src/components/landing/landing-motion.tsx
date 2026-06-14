"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type MotionScopeProps = {
  children: ReactNode;
  className?: string;
};

export function MethodMotion({ children, className }: MotionScopeProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = scopeRef.current;

      if (!scope) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-method-card]", scope);

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: scope,
            start: "top 78%",
            once: true,
          },
        }
      );
    },
    { scope: scopeRef }
  );

  return (
    <div ref={scopeRef} className={className}>
      {children}
    </div>
  );
}

export function GuaranteeMotion({ children, className }: MotionScopeProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = scopeRef.current;

      if (!scope) {
        return;
      }

      const seal = scope.querySelector("[data-guarantee-seal]");
      const line = scope.querySelector("[data-guarantee-line]");

      if (prefersReducedMotion()) {
        gsap.set([seal, line], { autoAlpha: 1, scale: 1, scaleX: 1, rotate: 0 });
        return;
      }

      gsap.fromTo(
        seal,
        { autoAlpha: 0, scale: 0.78, rotate: -8 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.75,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: scope,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.95,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope,
            start: "top 78%",
            once: true,
          },
        }
      );
    },
    { scope: scopeRef }
  );

  return (
    <div ref={scopeRef} className={className}>
      {children}
    </div>
  );
}
