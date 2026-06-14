"use client";

import { useId, useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { faq } from "@/content/landing";

type FaqItemProps = {
  answer: string;
  question: string;
};

function FaqItem({ answer, question }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <article className="py-5">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-start justify-between gap-5 text-left text-xl leading-7 tracking-[-0.035em] text-foreground md:text-2xl"
      >
        <span>{question}</span>
        <span className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition duration-300 ${isOpen ? "rotate-45 border-voltage text-foreground" : "border-mist text-sage"}`}>
          +
        </span>
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-1 pt-4 text-base leading-7 text-bark md:text-lg md:leading-8">
            {answer}
          </p>
        </div>
      </div>
    </article>
  );
}

export function FaqSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
      <div className="grid gap-10 border-t border-mist pt-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)] lg:pt-10">
        <div className="space-y-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
            {faq.label}
          </p>
          <ScrollReveal>
            <h2 className="max-w-[13ch] font-serif text-[clamp(2.85rem,4.8vw,6.25rem)] leading-[0.94] tracking-[-0.055em]">
              {faq.title}
            </h2>
          </ScrollReveal>
        </div>

        <div className="divide-y divide-mist border-y border-mist">
          {faq.items.map((item, index) => (
            <ScrollReveal key={item.question} delay={index * 0.035}>
              <FaqItem answer={item.answer} question={item.question} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
