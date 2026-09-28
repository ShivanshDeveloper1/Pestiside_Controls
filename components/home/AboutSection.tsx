"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { BadgeCheck, Building2, Leaf, ShieldCheck, Wrench } from "lucide-react";

// TODO: swap for a real branded photo (technician on-site, or the actual
// property). If you change the photo, re-tune the `spot` coordinates below so
// the hotspots land on the right parts of the building.
const ABOUT_IMAGE = {
  src: "https://plus.unsplash.com/premium_photo-1661306479139-2ba81f1a5cd6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt: "Residential property protected by Speedy Pest Control",
};

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 5000;

const FEATURES = [
  {
    title: "Certified technicians",
    body: "Insured, background-checked pros with a decade of hands-on field experience.",
    tag: "Technician on site",
    icon: BadgeCheck,
    spot: { x: 30, y: 62 },
  },
  {
    title: "Safe, modern methods",
    body: "Low-odour, EPA-approved treatments that are safe around kids, pets and staff.",
    tag: "Low-odour treatment",
    icon: Leaf,
    spot: { x: 68, y: 40 },
  },
  {
    title: "Built-in prevention",
    body: "We seal entry points and monitor after treatment — not just spray and go.",
    tag: "Entry point sealed",
    icon: ShieldCheck,
    spot: { x: 46, y: 78 },
  },
  {
    title: "Homes & businesses",
    body: "One team for houses, restaurants, offices, warehouses and commercial sites.",
    tag: "Homes to warehouses",
    icon: Building2,
    spot: { x: 74, y: 68 },
  },
] as const;

const PESTS = ["Rats", "Mice", "Cockroaches", "Bed bugs", "Wasps"] as const;

/* ---------- small helpers ---------- */

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      delay: 0.5,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{value}</span>;
}

/** Headline line that slides up out of a mask. */
function MaskLine({
  children,
  variants,
  className = "",
}: {
  children: React.ReactNode;
  variants: Variants;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span variants={variants} className={`block ${className}`}>
        {children}
      </motion.span>
    </span>
  );
}

/* ---------- main component ---------- */

export default function AboutSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplay = inView && !paused && !reduce;

  // Auto-tour the features until the visitor takes over.
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % FEATURES.length),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(id);
  }, [autoplay, active]);

  // Gentle parallax on the photo.
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const lineUp: Variants = {
    hidden: reduce ? { y: 0 } : { y: "108%" },
    show: { y: 0, transition: { duration: reduce ? 0 : 0.85, ease: EASE } },
  };

  const fadeUp: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: EASE },
    },
  };

  const imageReveal: Variants = {
    hidden: reduce
      ? { opacity: 1 }
      : { clipPath: "inset(14% 10% 14% 10% round 40px)", opacity: 0.4 },
    show: {
      clipPath: "inset(0% 0% 0% 0% round 28px)",
      opacity: 1,
      transition: { duration: reduce ? 0 : 1.1, ease: EASE },
    },
  };

  const badgePop: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6, rotate: -8 },
    show: {
      opacity: 1,
      scale: 1,
      rotate: -3,
      transition: {
        type: "spring",
        stiffness: 220,
        damping: 16,
        delay: reduce ? 0 : 0.7,
      },
    },
  };

  const current = FEATURES[active];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-background px-page py-section"
    >
      {/* Decorative dot field, fades out toward the centre */}
      <div
        aria-hidden
        className="bg-dot-grid pointer-events-none absolute -right-10 -top-10 h-[26rem] w-[34rem] text-brand-purple/25"
      />
      <ShieldCheck
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 h-96 w-96 text-brand-purple/[0.04]"
        strokeWidth={1}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mx-auto grid max-w-content items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20"
      >
        {/* ============ Copy column ============ */}
        <div>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-pill border border-border bg-surface py-1.5 pl-2.5 pr-4 text-sm font-bold text-brand-purple-strong shadow-card"
          >
            <span className="relative flex h-2.5 w-2.5">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-brand-red opacity-60" />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-pill bg-brand-red" />
            </span>
            About Speedy Pest Control
          </motion.span>

          <h2 className="mt-6 font-display text-heading-xl font-bold leading-[1.02] tracking-[-0.035em] text-brand-navy">
            <MaskLine variants={lineUp}>Professional pest control</MaskLine>
            <MaskLine variants={lineUp} className="text-brand-purple">
              for homes &amp; businesses
            </MaskLine>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[48ch] text-base leading-relaxed text-text-secondary"
          >
            Speedy Pest Control has spent the last 10 years clearing rats, mice,
            cockroaches, bed bugs and wasps from properties across the region.
            Every visit pairs modern, low-impact treatment with a plan to stop
            the problem coming back — whether it&apos;s a single kitchen or a
            full commercial site.
          </motion.p>

          {/* Pests we handle */}
          <motion.ul
            variants={fadeUp}
            aria-label="Pests we treat"
            className="mt-6 flex flex-wrap gap-2"
          >
            {PESTS.map((pest) => (
              <li
                key={pest}
                className="rounded-pill border border-border bg-surface px-3.5 py-1.5 text-sm font-bold text-text-primary"
              >
                {pest}
              </li>
            ))}
          </motion.ul>

          {/* Interactive feature list */}
          <motion.div
            variants={fadeUp}
            role="tablist"
            aria-label="Why choose us"
            className="mt-9 flex flex-col gap-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              const isActive = i === active;
              return (
                <button
                  key={feature.title}
                  type="button"
                  role="tab"
                  id={`about-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls={`about-panel-${i}`}
                  onClick={() => setActive(i)}
                  className="group relative w-full rounded-lg px-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                >
                  {/* Sliding highlight shared between rows */}
                  {isActive && (
                    <motion.span
                      layoutId="about-active-bg"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute inset-0 rounded-lg border border-border bg-surface shadow-card"
                    />
                  )}

                  <span className="relative flex items-start gap-3.5">
                    <span
                      className={`mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-pill transition-colors duration-300 ${
                        isActive
                          ? "bg-brand-purple text-white"
                          : "bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple/20"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[0.95rem] font-bold transition-colors duration-300 ${
                          isActive ? "text-brand-navy" : "text-text-primary"
                        }`}
                      >
                        {feature.title}
                      </span>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            key="body"
                            id={`about-panel-${i}`}
                            role="tabpanel"
                            aria-labelledby={`about-tab-${i}`}
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                            className="block overflow-hidden"
                          >
                            <span className="block pt-1 text-sm leading-snug text-text-secondary">
                              {feature.body}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </span>

                  {/* Autoplay progress line */}
                  {isActive && (
                    <span className="absolute inset-x-4 bottom-0 h-0.5 overflow-hidden rounded-pill bg-brand-purple/10">
                      <motion.span
                        key={`${active}-${autoplay}`}
                        initial={{ scaleX: autoplay ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: autoplay ? AUTOPLAY_MS / 1000 : 0,
                          ease: "linear",
                        }}
                        style={{ transformOrigin: "left" }}
                        className="block h-full bg-brand-purple"
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ============ Image column ============ */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            ref={imageWrapRef}
            variants={imageReveal}
            className="relative aspect-[4/3] w-full overflow-hidden shadow-raised sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            {/* Parallax layer (oversized so it never shows an edge) */}
            <motion.div
              style={reduce ? undefined : { y: parallaxY }}
              className="absolute -inset-[8%]"
            >
              <Image
                src={ABOUT_IMAGE.src}
                alt={ABOUT_IMAGE.alt}
                fill
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 90vw"
                className="object-cover"
                priority={false}
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/70 via-brand-navy-deep/5 to-transparent" />

            {/* Hotspots tied to the feature list */}
            {FEATURES.map((feature, i) => {
              const isActive = i === active;
              return (
                <button
                  key={feature.tag}
                  type="button"
                  aria-label={feature.tag}
                  onClick={() => setActive(i)}
                  style={{ left: `${feature.spot.x}%`, top: `${feature.spot.y}%` }}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-pill p-2 outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    {isActive && !reduce && (
                      <motion.span
                        aria-hidden
                        className="absolute h-4 w-4 rounded-pill bg-brand-red"
                        animate={{ scale: [1, 3], opacity: [0.6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <motion.span
                      animate={{ scale: isActive ? 1 : 0.7 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className={`relative h-4 w-4 rounded-pill border-2 border-white shadow-card transition-colors duration-300 ${
                        isActive ? "bg-brand-red" : "bg-white/70"
                      }`}
                    />
                  </span>
                </button>
              );
            })}

            {/* Live caption for the active hotspot */}
            <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 sm:inset-x-6 sm:bottom-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.tag}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="ml-auto flex w-fit items-center gap-2.5 rounded-pill bg-white/90 py-2 pl-2.5 pr-4 text-sm font-bold text-brand-navy shadow-card backdrop-blur"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-pill bg-brand-red text-white">
                    <current.icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {current.tag}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Floating experience badge */}
          <motion.div
            variants={badgePop}
            className="badge-sheen absolute -bottom-7 left-4 z-20 flex items-center gap-3.5 overflow-hidden rounded-lg bg-brand-navy px-5 py-4 text-white shadow-raised sm:-left-4"
          >
            <span className="font-display text-5xl font-bold leading-none tracking-[-0.04em]">
              <CountUp to={10} />
              <span className="text-brand-red">+</span>
            </span>
            <span className="text-xs font-bold leading-tight text-white/80">
              Years of
              <br />
              field experience
            </span>
          </motion.div>

          {/* Small floating tool chip — top right */}
          {!reduce && (
            <motion.div
              aria-hidden
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 -top-5 z-20 hidden h-14 w-14 items-center justify-center rounded-lg border border-border bg-surface text-brand-purple shadow-card sm:flex"
            >
              <Wrench className="h-6 w-6" strokeWidth={2} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}