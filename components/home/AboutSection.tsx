"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";

// TODO: swap for a real branded photo (technician on-site, or the actual
// property) — this is a verified, free-to-use Unsplash placeholder so the
// layout ships with a real image instead of a broken src.
const ABOUT_IMAGE = {
  src: "https://plus.unsplash.com/premium_photo-1661306479139-2ba81f1a5cd6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt: "Residential property protected by Speedy Pest Control",
};

const FEATURES = [
  {
    title: "Certified technicians",
    body: "Insured, background-checked pros with a decade of hands-on field experience.",
  },
  {
    title: "Safe, modern methods",
    body: "Low-odour, EPA-approved treatments that are safe around kids, pets and staff.",
  },
  {
    title: "Built-in prevention",
    body: "We seal entry points and monitor after treatment — not just spray and go.",
  },
  {
    title: "Homes & businesses",
    body: "One team for houses, restaurants, offices, warehouses and commercial sites.",
  },
] as const;

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const textVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const badgeVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7, y: 12 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background px-page py-section"
    >
      {/* Subtle decorative mark — sits behind the copy, never competes with it */}
      <ShieldCheck
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 text-brand-purple/[0.05] sm:-right-10 sm:-top-24"
        strokeWidth={1}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto grid max-w-content items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
      >
        {/* Copy column */}
        <motion.div variants={textVariants}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.09em] text-brand-purple-strong">
            <span aria-hidden className="h-2 w-2 rounded-pill bg-brand-red" />
            About Speedy Pest Control
          </span>

          <h2 className="mt-4 max-w-[16ch] font-display text-heading-xl font-bold leading-[1.05] tracking-[-0.03em] text-brand-navy">
            Professional Pest Control Solutions
            <span className="block text-brand-purple">For Homes &amp; Businesses</span>
          </h2>

          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-text-secondary">
            Speedy Pest Control has spent the last 10 years clearing rats, mice,
            cockroaches, bed bugs and wasps from properties across the region.
            Every visit pairs modern, low-impact treatment with a plan to stop
            the problem coming back — whether it&apos;s a single kitchen or a
            full commercial site.
          </p>

          <ul className="mt-9 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-pill bg-brand-purple/10 text-brand-purple">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-sm font-bold text-text-primary">{feature.title}</p>
                  <p className="mt-0.5 text-sm leading-snug text-text-secondary">{feature.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Image column */}
        <motion.div variants={imageVariants} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/3] w-full max-h-72 overflow-hidden rounded-xl shadow-raised sm:max-h-none sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={ABOUT_IMAGE.src}
              alt={ABOUT_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/60 via-transparent to-transparent" />
          </div>

          {/* Floating experience badge */}
          <motion.div
            variants={badgeVariants}
            className="absolute -bottom-6 left-5 flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3.5 shadow-card sm:left-8 sm:px-5 sm:py-4"
          >
            <span className="font-display text-2xl font-bold text-brand-purple">10</span>
            <span className="text-[0.7rem] font-bold leading-tight text-text-secondary">
              Years of
              <br />
              Experience
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}