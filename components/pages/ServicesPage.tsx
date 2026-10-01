"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Bug,
  ChevronDown,
  Home,
  Search,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/pages/Reveal";
import { SERVICE_CATALOG } from "@/components/services/serviceCatalog";

const CATEGORIES = [
  "All services",
  ...new Set(SERVICE_CATALOG.map((service) => service.category)),
];

const GUIDES = [
  {
    title: "Notice activity early",
    description:
      "Look out for repeat sightings, droppings or damage, and note where and when they appear.",
    icon: Search,
  },
  {
    title: "Reduce easy access",
    description:
      "Keep food stored securely, manage waste carefully and check gaps around doors and pipes.",
    icon: ShieldCheck,
  },
  {
    title: "Get advice before disturbing a nest",
    description:
      "If you find an active wasp nest, keep your distance and ask for professional guidance.",
    icon: Bug,
  },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All services");
  const [searchQuery, setSearchQuery] = useState("");
  const [openService, setOpenService] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const visibleServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SERVICE_CATALOG.filter((service) => {
      const matchesCategory =
        selectedCategory === "All services" ||
        service.category === selectedCategory;
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.shortDesc.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="bg-slate-950 text-slate-100">
      <section className="relative isolate overflow-hidden px-page pb-14 pt-14 sm:pb-20 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-indigo-800/20 blur-[130px]"
        />
        <div className="relative mx-auto max-w-content">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55 }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 rounded-pill border border-indigo-300/15 bg-indigo-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-indigo-200">
              <Bug className="size-4" aria-hidden="true" />
              London pest-control services
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.05em] text-white">
              The right response starts with{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-rose-300 bg-clip-text text-transparent">
                understanding the problem.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Browse our pest-control services for homes and businesses. Open a
              service to learn more, then share a few details to discuss the
              next step.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 md:grid-cols-[1fr_auto] md:items-center">
            <label className="relative block">
              <span className="sr-only">Search pest-control services</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search a pest or service"
                className="min-h-12 w-full rounded-xl border border-white/10 bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10"
              />
            </label>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:justify-end">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-10 shrink-0 rounded-pill border px-4 text-xs font-bold transition sm:text-sm ${
                    selectedCategory === category
                      ? "border-indigo-400 bg-indigo-500/20 text-indigo-100"
                      : "border-white/10 bg-slate-900/50 text-slate-300 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-page pb-20" aria-labelledby="service-list-title">
        <div className="mx-auto max-w-content">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.13em] text-indigo-300">
                Explore services
              </p>
              <h2
                id="service-list-title"
                className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl"
              >
                {selectedCategory === "All services"
                  ? "Pest control, tailored to your property."
                  : selectedCategory}
              </h2>
            </div>
            <span className="hidden text-sm text-slate-400 sm:block">
              {visibleServices.length}{" "}
              {visibleServices.length === 1 ? "service" : "services"}
            </span>
          </div>

          {visibleServices.length ? (
            <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visibleServices.map((service) => {
                  const isOpen = openService === service.id;
                  const Icon =
                    service.category === "Commercial"
                      ? Building2
                      : service.category === "Rodents"
                        ? Home
                        : Bug;

                  return (
                    <motion.article
                      key={service.id}
                      layout
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: reduceMotion ? 0 : 0.25 }}
                      className="flex flex-col rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/70 p-5 shadow-card sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="rounded-pill border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-slate-300">
                          {service.category}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-xl font-bold leading-snug text-white">
                        {service.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                        {service.shortDesc}
                      </p>
                      <Link
                        href={`/services/${service.id}`}
                        className="mt-5 inline-flex min-h-10 items-center gap-2 self-start rounded-lg bg-indigo-500/15 px-3.5 text-sm font-bold text-indigo-200 transition hover:bg-indigo-500/25 hover:text-white"
                      >
                        View service
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpenService(isOpen ? null : service.id)
                        }
                        className="mt-6 inline-flex min-h-11 items-center justify-between gap-3 border-t border-slate-800 pt-4 text-left text-sm font-bold text-indigo-200 transition hover:text-white"
                      >
                        {isOpen ? "Close service details" : "View service details"}
                        <ChevronDown
                          className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`service-details-${service.id}`}
                            initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-slate-800 pt-4">
                              <p className="text-sm leading-relaxed text-slate-300">
                                The approach depends on the pest activity,
                                affected areas and property. A site-specific
                                assessment helps establish suitable treatment
                                and prevention options.
                              </p>
                              <Link
                                href="/quote"
                                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-indigo-500/15 px-3.5 text-sm font-bold text-indigo-200 transition hover:bg-indigo-500/25"
                              >
                                Discuss this service
                                <ArrowUpRight className="size-4" aria-hidden="true" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
              <p className="font-semibold text-white">No matching services</p>
              <p className="mt-2 text-sm text-slate-400">
                Try another search, or reset the category to see all services.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All services");
                }}
                className="mt-4 text-sm font-bold text-indigo-300 underline underline-offset-4"
              >
                Show all services
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        id="pest-guides"
        className="scroll-mt-24 border-t border-slate-800 bg-slate-900/60 px-page py-section"
        aria-labelledby="guides-title"
      >
        <div className="mx-auto max-w-content">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.13em] text-rose-300">
                Helpful pest notes
              </p>
              <h2
                id="guides-title"
                className="mt-3 font-display text-heading-xl font-bold leading-tight tracking-tight text-white"
              >
                A few sensible first steps.
              </h2>
              <p className="mt-3 leading-relaxed text-slate-400">
                Simple guidance for common situations while you decide what
                support you need.
              </p>
            </div>
          </Reveal>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {GUIDES.map(({ title, description, icon: Icon }) => (
              <Reveal key={title}>
                <article className="h-full rounded-2xl border border-slate-800 bg-slate-950 p-6">
                  <Icon className="size-5 text-rose-300" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border border-indigo-300/15 bg-indigo-400/[0.07] p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="font-bold text-white">Not sure which service fits?</p>
              <p className="mt-1 text-sm text-slate-400">
                Share what you have noticed and we can help you work out the
                next step.
              </p>
            </div>
            <Link
              href="/quote"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-red-hover"
            >
              Request a quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
