"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SVGProps } from "react";

/**
 * Customer Reviews — homepage section.
 *
 * IMPORTANT: The array below is DEMO / PLACEHOLDER content only, created for
 * visual design purposes. These are not real customers and are not sourced
 * from Google Reviews or any verified review platform. No "verified" or
 * Google-review badges are used anywhere in this component. Replace with
 * real, consented customer reviews before this goes live.
 */
const demoReviews = [
  {
    name: "Sarah Whitfield",
    area: "Clapham, London",
    service: "Rat Treatment",
    rating: 5,
    quote:
      "Had a rat problem in the garden that I'd been putting off dealing with. The technician found the entry point straight away and talked me through everything before starting. Hasn't come back since.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&auto=format&fit=crop&crop=faces",
  },
  {
    name: "Daniel Okafor",
    area: "Croydon, London",
    service: "Wasp Nest Removal",
    rating: 5,
    quote:
      "Called about a wasp nest right by the back door and they had someone out the same afternoon. Quick, careful, and explained what to expect over the next few days.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&auto=format&fit=crop&crop=faces",
  },
  {
    name: "Priya Nair",
    area: "Ealing, London",
    service: "Mice Control",
    rating: 4,
    quote:
      "Good, professional service from start to finish. Took a couple of visits to fully sort out but they kept me updated and the pricing was exactly what was quoted upfront.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&q=80&auto=format&fit=crop&crop=faces",
  },
  {
    name: "Tom Bradley",
    area: "Greenwich, London",
    service: "Bed Bug Treatment",
    rating: 5,
    quote:
      "Stressful situation made a lot easier by a technician who actually knew what he was doing. Clear advice on preparing the room and a follow-up visit included as part of the plan.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&q=80&auto=format&fit=crop&crop=faces",
  },
  {
    name: "Amelia Hughes",
    area: "Hackney, London",
    service: "Ant Infestation",
    rating: 5,
    quote:
      "Booked online in the evening and had someone round the next morning. Friendly, tidy, and the ants were gone within a week.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&q=80&auto=format&fit=crop&crop=faces",
  },
  {
    name: "James Carter",
    area: "Wandsworth, London",
    service: "Commercial Pest Contract",
    rating: 5,
    quote:
      "We use them for ongoing pest management at our warehouse. Reliable scheduling, proper documentation for every visit, and easy to get hold of if anything comes up between visits.",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=160&h=160&q=80&auto=format&fit=crop&crop=faces",
  },
];

function StarIcon({ filled, ...props }: SVGProps<SVGSVGElement> & { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      {...props}
    >
      <path d="M10 1.8l2.47 5.24 5.68.62-4.24 3.94 1.2 5.6L10 14.4l-5.11 2.8 1.2-5.6L1.85 7.66l5.68-.62L10 1.8Z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-brand-red" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < rating} className="h-4 w-4" aria-hidden="true" />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Reviews() {
  return (
    <section className="py-section px-page">
      <div className="mx-auto max-w-content">
        <div className="mx-auto max-w-[38ch\] text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.09em] text-brand-purple-strong">
            <span className="h-2 w-2 rounded-pill bg-brand-red" aria-hidden="true" />
            Customer Reviews
          </span>
          <h2 className="mt-4 font-display text-heading-xl font-bold leading-tight tracking-tight text-brand-navy">
            What our customers say
          </h2>
          <p className="mt-4 text-text-secondary">
            A few words from homeowners and businesses we&apos;ve helped across London.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {demoReviews.map((review) => (
            <motion.figure
              key={review.name}
              variants={cardVariants}
              className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-soft"
            >
              <StarRating rating={review.rating} />

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-primary">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <Image
                  src={review.avatar}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 flex-none rounded-pill object-cover"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold text-brand-navy">
                    {review.name}
                  </p>
                  <p className="truncate text-xs text-text-secondary">
                    {review.area} &middot; {review.service}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}