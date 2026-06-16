"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type InstagramProofCase = {
  name: string;
  handle: string;
  niche: string;
  image: string;
  startingPoint: string;
  result: string;
};

type InstagramProofCarouselProps = {
  cases: InstagramProofCase[];
};

export function InstagramProofCarousel({ cases }: InstagramProofCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    function updateCurrentIndex() {
      const firstCard = carousel?.querySelector<HTMLElement>(
        "[data-instagram-proof-card]",
      );

      if (!carousel || !firstCard) {
        return;
      }

      const gap = 16;
      const cardWidth = firstCard.offsetWidth + gap;
      const nextIndex = Math.round(carousel.scrollLeft / cardWidth);
      setCurrentIndex(Math.min(Math.max(nextIndex, 0), cases.length - 1));
    }

    updateCurrentIndex();
    carousel.addEventListener("scroll", updateCurrentIndex, { passive: true });
    window.addEventListener("resize", updateCurrentIndex);

    return () => {
      carousel.removeEventListener("scroll", updateCurrentIndex);
      window.removeEventListener("resize", updateCurrentIndex);
    };
  }, [cases.length]);

  function scrollToIndex(index: number) {
    const carousel = carouselRef.current;
    const firstCard = carousel?.querySelector<HTMLElement>(
      "[data-instagram-proof-card]",
    );

    if (!carousel || !firstCard) {
      return;
    }

    const nextIndex = Math.min(Math.max(index, 0), cases.length - 1);
    carousel.scrollTo({
      left: nextIndex * (firstCard.offsetWidth + 16),
      behavior: "smooth",
    });
    setCurrentIndex(nextIndex);
  }

  return (
    <div className="relative grid gap-4">
      <div
        ref={carouselRef}
        className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:-mx-7 sm:px-7 md:mx-0 md:px-0 lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {cases.map((item) => (
          <article
            key={item.handle}
            data-instagram-proof-card
            className="relative min-w-[86vw] snap-start overflow-hidden rounded-[28px] border border-mist bg-[#070b0d] text-background shadow-[0_22px_80px_rgba(18,22,19,0.14)] sm:min-w-[390px] lg:min-w-[calc((100%-1rem)/2)]"
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={`Perfil de Instagram de ${item.name}`}
                className="h-[570px] w-full object-cover object-top sm:h-[610px] lg:h-[min(760px,calc(100svh-120px))] lg:min-h-[640px]"
              />
              <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[#070b0d] via-[#070b0d]/42 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="grid gap-2 rounded-[20px] border border-white/10 bg-[#f7fff3] p-4 text-foreground shadow-[0_14px_50px_rgba(0,0,0,0.28)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-x-5 lg:p-5">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sage">
                      {item.handle}
                    </p>
                    <h3 className="mt-1 font-serif text-[clamp(2rem,8vw,2.75rem)] leading-[0.92] tracking-[-0.06em] text-foreground lg:text-[clamp(2.25rem,3vw,3.15rem)]">
                      {item.name}
                    </h3>
                  </div>
                  <div className="grid gap-2">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sage">
                      De dónde partía
                    </p>
                    <p className="text-sm leading-5 text-bark">
                      {item.startingPoint}
                    </p>
                    <p className="pt-1 font-serif text-[clamp(1.85rem,7vw,2.6rem)] leading-[0.94] tracking-[-0.06em] text-foreground lg:text-[clamp(2rem,2.7vw,2.9rem)]">
                      {item.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {currentIndex > 0 ? (
        <button
          type="button"
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="absolute left-2 top-[285px] z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-foreground/75 text-background shadow-[0_12px_36px_rgba(0,0,0,0.24)] backdrop-blur transition hover:bg-foreground sm:top-[305px] lg:top-1/2"
          aria-label="Ver perfil anterior"
        >
          <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      ) : null}

      {currentIndex < cases.length - 1 ? (
        <button
          type="button"
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="absolute right-2 top-[285px] z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-foreground/75 text-background shadow-[0_12px_36px_rgba(0,0,0,0.24)] backdrop-blur transition hover:bg-foreground sm:top-[305px] lg:top-1/2"
          aria-label="Ver siguiente perfil"
        >
          <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
