"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Clock3,
  Home,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/pages/Reveal";
import type { ServiceEntry } from "@/components/services/serviceData";

export default function ServiceDetailPage({
  service,
}: {
  service: ServiceEntry;
}) {
  const reduceMotion = useReducedMotion();
  const isCommercial = service.category === "Commercial";
  const faqs = [
    {
      question: `What happens during ${service.title.toLowerCase()}?`,
      answer:
        "The technician will discuss the signs you have noticed, inspect relevant areas where possible and explain suitable treatment and prevention options for the property.",
    },
    {
      question: "How should I prepare?",
      answer:
        "Preparation depends on the pest, treatment and rooms involved. Follow the instructions provided for your situation and ask before moving suspected nests or applying other products.",
    },
    {
      question: "Can this service be used at my property?",
      answer: isCommercial
        ? "This service is intended for business premises. The approach can be discussed around site access and how the premises operate."
        : "The service may be relevant to homes and other properties. An assessment can confirm whether it suits your situation.",
    },
  ];

  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-brand-navy px-page pb-16 pt-14 text-white sm:pb-20 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-40 size-[34rem] rounded-full bg-brand-purple/30 blur-[120px]"
        />
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto grid max-w-content items-center gap-10 lg:grid-cols-[1fr_0.88fr] lg:gap-16"
        >
          <div>
            <Link
              href="/services"
              className="text-sm font-semibold text-violet-200 transition hover:text-white"
            >
              Services <span aria-hidden="true">/</span> {service.category}
            </Link>
            <p className="mt-7 inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-violet-200">
              <ShieldCheck className="size-4 text-brand-red" aria-hidden="true" />
              London pest control
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[1.05] tracking-[-0.05em]">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {service.shortDesc}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-red-hover"
              >
                Request a quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 font-bold text-white transition hover:bg-white/5"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div
            role="img"
            aria-label={service.imageAlt}
            className="relative min-h-[19rem] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 bg-cover bg-center shadow-2xl sm:min-h-[25rem]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgb(6 8 33 / 5%), rgb(6 8 33 / 72%)), url("${service.image}")`,
            }}
          >
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-brand-navy-deep/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                <BadgeCheck className="size-4 text-emerald-300" aria-hidden="true" />
                {service.badge}
              </span>
              <p className="mt-4 max-w-md font-display text-xl font-bold text-white sm:text-2xl">
                Professional assessment and a plan shaped around your property.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-page py-section">
        <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.13em] text-brand-purple">
                Understanding the problem
              </p>
              <h2 className="mt-3 font-display text-heading-xl font-bold leading-tight tracking-tight text-brand-navy">
                A considered response starts with the signs you have noticed.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-text-secondary">
                {service.fullDesc}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-text-secondary">
                Pest activity can affect comfort, food storage, property
                condition and the way a space is used. A professional can
                assess the location and activity, explain appropriate
                treatment options and discuss practical steps to help reduce
                the chance of repeat access.
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-12">
                <p className="text-sm font-bold uppercase tracking-[0.13em] text-brand-purple">
                  What to expect
                </p>
                <h2 className="mt-3 font-display text-heading-lg font-bold leading-tight text-brand-navy">
                  A clear process from inspection to prevention.
                </h2>
                <ol className="mt-7 space-y-4">
                  {service.steps.map((step, index) => (
                    <motion.li
                      key={step.title}
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.4,
                        delay: reduceMotion ? 0 : index * 0.07,
                      }}
                      className="grid gap-4 rounded-2xl border border-border bg-surface p-5 shadow-soft sm:grid-cols-[3rem_1fr] sm:items-start sm:p-6"
                    >
                      <span className="grid size-11 place-items-center rounded-xl bg-brand-purple/10 font-display text-sm font-bold text-brand-purple">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold text-brand-navy">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {step.desc}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          <aside className="space-y-4">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft sm:p-6">
                <h2 className="font-display text-lg font-bold text-brand-navy">
                  Service information
                </h2>
                <dl className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 size-4 shrink-0 text-brand-purple" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                        Response information
                      </dt>
                      <dd className="mt-1 text-sm font-bold text-text-primary">
                        {service.responseTime}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-purple" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                        Service area
                      </dt>
                      <dd className="mt-1 text-sm font-bold text-text-primary">
                        London and nearby areas
                      </dd>
                    </div>
                  </div>
                </dl>
                <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-text-secondary">
                  Timing and availability can depend on the location and the
                  nature of the issue. Confirm when enquiring.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="rounded-2xl bg-brand-navy p-5 text-white shadow-card sm:p-6">
                <h2 className="font-display text-lg font-bold">Who we help</h2>
                <div className="mt-4 flex items-start gap-3">
                  {isCommercial ? (
                    <Building2 className="mt-0.5 size-5 shrink-0 text-violet-300" aria-hidden="true" />
                  ) : (
                    <Home className="mt-0.5 size-5 shrink-0 text-violet-300" aria-hidden="true" />
                  )}
                  <p className="text-sm leading-relaxed text-slate-300">
                    {isCommercial
                      ? "For offices, hospitality, retail, warehouses and other business premises."
                      : "For residential properties, with service options discussed around the people and pets using the space."}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-pill border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-200"
                    >
                      <Check className="size-3 text-emerald-300" aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-surface px-page py-section">
        <div className="mx-auto max-w-reading">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.13em] text-brand-purple">
              Common questions
            </p>
            <h2 className="mt-3 font-display text-heading-xl font-bold tracking-tight text-brand-navy">
              About {service.title.toLowerCase()}
            </h2>
          </Reveal>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-background px-5 sm:px-7">
            {faqs.map((faq) => (
              <Reveal key={faq.question}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-brand-navy marker:hidden">
                    {faq.question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-brand-purple transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-page py-section">
        <Reveal>
          <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 rounded-3xl bg-brand-purple px-6 py-8 text-white sm:px-10 sm:py-10 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-violet-100">
                Take the next step
              </p>
              <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Tell us about the {service.title.toLowerCase()} you need.
              </h2>
            </div>
            <Link
              href="/quote"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-brand-purple-strong transition hover:bg-violet-50"
            >
              Request a quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
