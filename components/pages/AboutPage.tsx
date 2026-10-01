"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/pages/Reveal";

const APPROACH = [
  {
    number: "01",
    title: "Listen & inspect",
    description:
      "Understand what you have noticed, then assess the affected areas and likely access points.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Explain the options",
    description:
      "Talk through a suitable plan, what to expect and any preparation that may be needed.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Treat & help prevent",
    description:
      "Carry out appropriate treatment and share practical next steps for reducing future activity.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-background">
      <section className="relative isolate overflow-hidden bg-brand-navy px-page pb-20 pt-16 text-white sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-36 size-[30rem] rounded-full bg-brand-purple/30 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/3 size-[32rem] rounded-full bg-brand-red/15 blur-[110px]"
        />
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16"
        >
          <div>
            <p className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-200">
              <MapPin className="size-4 text-brand-red" aria-hidden="true" />
              London pest control
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,7vw,5.25rem)] font-bold leading-[1.04] tracking-[-0.055em]">
              Thoughtful pest control.{" "}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-rose-300 bg-clip-text text-transparent">
                A more confident home or workplace.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Speedy Pest Control helps London households and businesses deal
              with pest concerns through a professional, considered approach —
              from understanding the problem to practical prevention advice.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 font-bold text-white shadow-lg shadow-rose-950/20 transition hover:-translate-y-0.5 hover:bg-brand-red-hover"
              >
                Request a quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 font-bold text-white transition hover:border-white/50 hover:bg-white/5"
              >
                Talk to our team
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2rem] border border-white/10" />
            <div className="relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-6 shadow-2xl backdrop-blur sm:p-8">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-purple/20 text-violet-200">
                  <ShieldCheck className="size-6" aria-hidden="true" />
                </span>
                <span className="rounded-pill border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  Care at every step
                </span>
              </div>
              <h2 className="mt-12 max-w-sm font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                Clear advice. Considered treatment. Practical prevention.
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-slate-300">
                We focus on understanding each property and making the next
                steps clear for the people who live or work there.
              </p>
              <div className="mt-9 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-brand-navy-deep/50 p-4">
                  <Home className="size-5 text-violet-300" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold">Homes</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    A considerate approach around your household.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-brand-navy-deep/50 p-4">
                  <Building2 className="size-5 text-rose-300" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold">Businesses</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Solutions shaped around your workplace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-page py-section">
        <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-purple">
              Who we are
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold leading-tight tracking-tight text-brand-navy">
              Professional service, centred on people.
            </h2>
          </Reveal>
          <Reveal>
            <div className="space-y-5 text-base leading-8 text-text-secondary">
              <p>
                Speedy Pest Control provides pest-control services for
                residential and commercial customers across London. Every
                property and pest concern is different, so good service starts
                with listening and a careful assessment.
              </p>
              <p>
                Our aim is to make the process straightforward: explain what
                has been found, discuss appropriate options, and offer clear
                guidance before and after treatment. We want customers to feel
                informed and supported, not left guessing about what happens
                next.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface px-page py-section">
        <div className="mx-auto max-w-content">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-purple">
                Our approach
              </p>
              <h2 className="mt-3 font-display text-heading-xl font-bold leading-tight tracking-tight text-brand-navy">
                A professional process, made easy to understand.
              </h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {APPROACH.map(({ number, title, description, icon: Icon }) => (
              <Reveal key={number}>
                <article className="h-full rounded-2xl border border-border bg-background p-6 shadow-soft sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold tracking-[0.12em] text-brand-purple">
                      {number}
                    </span>
                    <Icon className="size-5 text-brand-red" aria-hidden="true" />
                  </div>
                  <h3 className="mt-7 font-display text-xl font-bold text-brand-navy">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-page py-section">
        <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-navy p-7 text-white shadow-raised sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full border border-white/10"
              />
              <BadgeCheck className="size-9 text-violet-300" aria-hidden="true" />
              <h2 className="mt-7 max-w-lg font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Trust is built through clear, consistent care.
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-slate-300">
                Experience matters when it leads to careful assessments, clear
                communication and respect for the people and property
                affected. We take time to understand each issue and explain
                practical options in plain language.
              </p>
              <ul className="mt-7 space-y-3 text-sm font-semibold text-slate-200">
                <li className="flex gap-3">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-brand-red" />
                  Straightforward discussion of findings and options
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-brand-red" />
                  Treatment planned around the property and its use
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-brand-red" />
                  Practical prevention guidance, not just a quick fix
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-purple">
                For London customers
              </p>
              <h2 className="mt-3 font-display text-heading-xl font-bold leading-tight tracking-tight text-brand-navy">
                Residential and commercial support.
              </h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                From a family home to a busy workplace, our service begins with
                the needs of the people using the space.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
                  <Home className="size-5 text-brand-purple" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-brand-navy">Residential</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Homes, flats and shared residential properties.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
                  <Building2 className="size-5 text-brand-purple" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-brand-navy">Commercial</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Offices, hospitality, retail and other workplaces.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-text-secondary">
                Serving London and nearby areas. Share your postcode to confirm
                availability for your location.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-page pb-20">
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 rounded-3xl bg-brand-purple px-6 py-8 text-white sm:px-10 sm:py-10 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-violet-100">
              Let’s take the next step
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Tell us what is happening at your property.
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
      </section>
    </main>
  );
}
