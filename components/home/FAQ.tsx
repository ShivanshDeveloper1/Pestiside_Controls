"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * FAQ — homepage section.
 * Single-open accordion: opening one question closes any other, which keeps
 * the section from growing indefinitely on mobile. Answers are written from
 * the supplied source content; no chemical/treatment instructions invented.
 */

const faqs = [
  {
    question: "Is pest control safe for babies and pets?",
    answer:
      "Your household's safety is the starting point for how we plan every treatment. Our technicians will always talk you through what's being used, any rooms to avoid, and how long to stay clear for before we start — so you can make arrangements for children and pets in advance.",
  },
  {
    question: "How long does pest elimination take?",
    answer:
      "It depends on the type and scale of the infestation. Many problems are brought under control within a couple of visits, while larger or more established infestations can take several weeks of treatment and follow-up monitoring to fully resolve. Your technician will give you a realistic timeline after the first inspection.",
  },
  {
    question: "What if rats or mice are coming from a neighbour's property?",
    answer:
      "We'll still treat your property to deal with the immediate problem, but if the source looks like it's next door, we'll let you know what we've found. In that situation, it's often worth raising it with your neighbour directly, or with your local council's environmental health team if it doesn't get resolved.",
  },
  {
    question: "Can I treat a pest infestation myself?",
    answer:
      "Shop-bought products can sometimes help with very minor, contained issues, but they rarely reach nests or breeding sites, which is why pests often return. A professional treatment gets to the source of the problem and comes with follow-up support if it isn't fully resolved first time.",
  },
];

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reactId = useId();
  const panelId = `faq-panel-${reactId}`;
  const buttonId = `faq-button-${reactId}`;

  return (
    <div className="border-b border-border">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-base font-bold text-brand-navy transition-colors duration-150 hover:text-brand-purple-strong sm:text-lg"
        >
          <span>{question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="grid h-7 w-7 flex-none place-items-center rounded-pill bg-surface-muted text-brand-purple"
          >
            <ChevronIcon className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-11 text-sm leading-relaxed text-text-secondary">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-section px-page">
      <div className="mx-auto max-w-content grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.09em] text-brand-purple-strong">
            <span className="h-2 w-2 rounded-pill bg-brand-red" aria-hidden="true" />
            FAQ
          </span>
          <h2 className="mt-4 max-w-[16ch] font-display text-heading-xl font-bold leading-tight tracking-tight text-brand-navy">
            Common questions, answered
          </h2>
          <p className="mt-4 max-w-[40ch] text-text-secondary">
            Can&apos;t find what you&apos;re looking for? Get in touch and we&apos;ll talk you
            through it before you book anything.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-border bg-surface px-5 shadow-soft sm:px-7"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}