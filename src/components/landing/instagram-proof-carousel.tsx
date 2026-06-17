"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const activeIndexRef = useRef(0);
  const [maxIndex, setMaxIndex] = useState(Math.max(0, cases.length - 1));

  const scrollToIndex = useCallback((index: number) => {
    const carousel = carouselRef.current;
    const cards = carousel?.querySelectorAll<HTMLElement>(
      "[data-instagram-proof-card]",
    );

    if (!carousel || !cards?.length) {
      return;
    }

    const firstCard = cards[0];
    const nextIndex = Math.min(Math.max(index, 0), maxIndex);
    const nextCard = cards[nextIndex];

    if (!firstCard || !nextCard) {
      return;
    }

    activeIndexRef.current = nextIndex;
    carousel.scrollTo({
      left: nextCard.offsetLeft - firstCard.offsetLeft,
      behavior: "smooth",
    });
  }, [maxIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    function getVisibleCards() {
      if (typeof window === "undefined") {
        return 1;
      }

      if (window.matchMedia("(min-width: 1024px)").matches) {
        return 3;
      }

      if (window.matchMedia("(min-width: 640px)").matches) {
        return 2;
      }

      return 1;
    }

    function updateCurrentIndex() {
      const firstCard = carousel?.querySelector<HTMLElement>(
        "[data-instagram-proof-card]",
      );

      if (!carousel || !firstCard) {
        return;
      }

      const cardOffsets = Array.from(
        carousel.querySelectorAll<HTMLElement>("[data-instagram-proof-card]"),
      ).map((card) => card.offsetLeft - firstCard.offsetLeft);
      const nextMaxIndex = Math.max(0, cases.length - getVisibleCards());
      const nextIndex = cardOffsets.reduce((nearestIndex, offset, index) => {
        const nearestDistance = Math.abs(
          carousel.scrollLeft - cardOffsets[nearestIndex],
        );
        const distance = Math.abs(carousel.scrollLeft - offset);

        return distance < nearestDistance ? index : nearestIndex;
      }, 0);
      const clampedIndex = Math.min(Math.max(nextIndex, 0), nextMaxIndex);

      setMaxIndex(nextMaxIndex);
      activeIndexRef.current = clampedIndex;
    }

    updateCurrentIndex();
    carousel.addEventListener("scroll", updateCurrentIndex, { passive: true });
    window.addEventListener("resize", updateCurrentIndex);

    return () => {
      carousel.removeEventListener("scroll", updateCurrentIndex);
      window.removeEventListener("resize", updateCurrentIndex);
    };
  }, [cases.length]);

  useEffect(() => {
    if (cases.length <= 1) {
      return;
    }

    const autoplay = window.setInterval(() => {
      const nextIndex = activeIndexRef.current >= maxIndex ? 0 : activeIndexRef.current + 1;
      scrollToIndex(nextIndex);
    }, 3600);

    return () => window.clearInterval(autoplay);
  }, [cases.length, maxIndex, scrollToIndex]);

  return (
    <div className="relative grid gap-4">
      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-3 [scrollbar-width:none] sm:px-3 md:px-4 lg:px-6 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {cases.map((item) => (
          <article
            key={item.handle}
            data-instagram-proof-card
            className="relative min-w-[72vw] snap-center rounded-[22px] bg-[#101714] p-2 text-background shadow-[0_18px_60px_rgba(18,22,19,0.16)] sm:min-w-[270px] lg:min-w-[280px] xl:min-w-[300px]"
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={`Perfil de Instagram de ${item.name}`}
                className="h-[305px] w-full rounded-[17px] border border-white/10 object-cover object-top sm:h-[330px] lg:h-[315px] xl:h-[335px]"
              />
            </div>

            <div className="grid gap-3 pt-2">
              <div className="grid gap-1 rounded-[15px] border border-white/10 bg-[#17211d] p-2.5 text-background">
                  <div>
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-background/48">
                      {item.handle}
                    </p>
                    <h3 className="mt-0.5 text-base font-semibold leading-tight tracking-[-0.04em] text-background">
                      {item.name}
                    </h3>
                  </div>
                <p className="text-[0.72rem] leading-4 text-background/70">
                  {item.startingPoint}
                </p>
                <p className="font-serif text-[clamp(1.22rem,4.2vw,1.58rem)] leading-[0.94] tracking-[-0.055em] text-background">
                  {item.result}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
