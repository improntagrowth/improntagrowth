"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = elementRef.current;

      if (!element) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(element, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
        });

        return;
      }

      gsap.fromTo(
        element,
        {
          autoAlpha: 0,
          y: 28,
          filter: "blur(8px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    { scope: elementRef, dependencies: [delay] },
  );

  return (
    <div ref={elementRef} className={`scroll-reveal ${className ?? ""}`}>
      {children}
    </div>
  );
}
