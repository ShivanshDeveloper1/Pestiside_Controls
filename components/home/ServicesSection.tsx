"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Service = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=400&auto=format&fit=crop",
    imageAlt: "A brown rat in its natural habitat",
    title: "Rat Control",
    description:
      "Targeted baiting and entry-point sealing that clears an active rat problem and keeps it from coming back.",
  },
  {
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=400&auto=format&fit=crop",
    imageAlt: "A small field mouse",
    title: "Mice Removal",
    description:
      "Trap placement and gap-sealing paired with sanitation advice to fully clear a mouse infestation.",
  },
  {
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=400&auto=format&fit=crop",
    imageAlt: "A cockroach on a textured surface",
    title: "Cockroach Treatment",
    description:
      "Gel baiting and crack-and-crevice treatment that reaches roaches where they breed, not just where you see them.",
  },
  {
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=400&auto=format&fit=crop",
    imageAlt: "Close up of a clean mattress",
    title: "Bed Bug Treatment",
    description:
      "Heat and residual treatments for mattresses, frames and furniture that break the breeding cycle for good.",
  },
  {
    image: "https://images.unsplash.com/photo-1585152004491-4f12cf830a34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FzcCUyMG5ldCUyMHJlbW92YWx8ZW58MHx8MHx8fDA%3D",
    imageAlt: "Close up of a wasp with yellow and black markings",
    title: "Wasp Nest Removal",
    description:
      "Safe, same-day nest removal from eaves, sheds and gardens — no ladders or guesswork required.",
  },
  {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop",
    imageAlt: "A large commercial warehouse filled with shelves and boxes",
    title: "Commercial Pest Control",
    description:
      "Scheduled visits and compliance-ready documentation for restaurants, offices and warehouses.",
  },
];

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="services" className="bg-surface px-page py-section">
      <div className="mx-auto max-w-content">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-reading text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.09em] text-brand-purple-strong">
            <span aria-hidden className="h-2 w-2 rounded-pill bg-brand-red" />
            What We Treat
          </span>
          <h2 className="mt-4 font-display text-heading-xl font-bold leading-[1.1] tracking-[-0.03em] text-brand-navy">
            Pest control services built around you
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            From a single rat in the loft to a full commercial contract, every
            treatment is matched to the pest, the property and how fast you
            need it gone.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.article
              key={service.title}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative flex flex-col rounded-lg border border-border bg-surface p-card shadow-soft transition-shadow duration-300 hover:shadow-raised"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 rounded-t-lg bg-gradient-to-r from-brand-purple to-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="mb-5 flex h-16 w-16 overflow-hidden rounded-md bg-surface-muted transition-all duration-300 group-hover:scale-110">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <h3 className="font-display text-lg font-bold text-brand-navy">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                {service.description}
              </p>

              <button
                type="button"
                aria-label={`Learn more about ${service.title} — detail page coming soon`}
                className="mt-6 inline-flex w-fit cursor-default items-center gap-2 text-sm font-bold text-brand-red transition-colors duration-200 group-hover:text-brand-red-hover"
              >
                Learn More
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.25}
                />
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}