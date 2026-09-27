"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Stats / Trust Metrics — homepage section.
 * Numbers are the supplied demo/source figures. Count-up is a small,
 * dependency-free requestAnimationFrame hook — no counter library.
 */

const stats = [
  { value: 10, label: "Expert Technicians" },
  { value: 1027, label: "Projects Completed" },
  { value: 1340, label: "Satisfied Clients" },
  { value: 165, label: "Emergency Support" },
];

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame: number;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return value;
}

function StatCard({ value, label, index }: { value: number; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const count = useCountUp(value, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-center sm:p-7"
    >
      <p className="font-display text-4xl font-bold tabular-nums text-text-inverse sm:text-5xl">
        {count.toLocaleString("en-GB")}
        <span className="text-brand-red">+</span>
      </p>
      <p className="mt-2 text-sm font-semibold text-white/70">{label}</p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-section px-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 85% 0%, color-mix(in srgb, var(--brand-purple) 22%, transparent), transparent 40rem)",
        }}
      />

      <div className="relative mx-auto max-w-content">
        <div className="max-w-[36ch]">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.09em] text-white/60">
            <span className="h-2 w-2 rounded-pill bg-brand-red" aria-hidden="true" />
            Our Track Record
          </span>
          <h2 className="mt-4 font-display text-heading-lg font-bold leading-tight text-text-inverse">
            Numbers London homeowners and businesses rely on
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}