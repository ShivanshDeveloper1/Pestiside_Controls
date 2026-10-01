"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ARTICLES, type Article } from "@/components/blog/articleData";
import Reveal from "@/components/pages/Reveal";

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticlePage({ article }: { article: Article }) {
  const reduceMotion = useReducedMotion();
  const related = ARTICLES.filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      candidate.category === article.category,
  ).concat(ARTICLES.filter((candidate) => candidate.slug !== article.slug))
    .filter(
      (candidate, index, all) =>
        all.findIndex((item) => item.slug === candidate.slug) === index,
    )
    .slice(0, 3);

  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-brand-navy px-page pb-0 pt-14 text-white sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 size-[34rem] rounded-full bg-brand-purple/25 blur-[120px]"
        />
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55 }}
          className="relative mx-auto max-w-content"
        >
          <Link
            href="/blog"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-violet-200 transition hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All articles
          </Link>
          <div className="mt-8 max-w-4xl">
            <span className="inline-flex rounded-pill border border-violet-200/20 bg-violet-200/10 px-3 py-1.5 text-xs font-bold text-violet-100">
              {article.category}
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.07] tracking-[-0.05em]">
              {article.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {article.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4" aria-hidden="true" />
                {article.readingTime}
              </span>
            </div>
          </div>
          <div
            role="img"
            aria-label={article.imageAlt}
            className="mt-10 aspect-[16/8] min-h-52 rounded-t-3xl border-x border-t border-white/10 bg-slate-900 bg-cover bg-center shadow-2xl sm:mt-12 sm:min-h-80"
            style={{
              backgroundImage: `linear-gradient(180deg, transparent 45%, rgb(6 8 33 / 22%)), url("${article.image}")`,
            }}
          />
        </motion.div>
      </section>

      <article className="px-page py-12 sm:py-16">
        <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="max-w-reading">
            <Reveal>
              <p className="text-lg leading-8 text-text-primary">
                {article.introduction}
              </p>
            </Reveal>
            <div className="mt-9 space-y-9">
              {article.sections.map((section) => (
                <Reveal key={section.heading}>
                  <section>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-brand-navy">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-8 text-text-secondary">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 border-t border-border pt-5 text-xs leading-relaxed text-text-secondary">
              This article provides general information only. The right
              response depends on the pest, property and circumstances; ask a
              qualified professional for advice specific to your situation.
            </p>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <p className="text-sm font-bold text-brand-purple">
                Need property-specific advice?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Share what you have noticed and where you are located.
              </p>
              <Link
                href="/quote"
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-4 text-sm font-bold text-white transition hover:bg-brand-red-hover"
              >
                Request a quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-border text-sm font-bold text-brand-navy transition hover:border-brand-purple hover:text-brand-purple"
              >
                Contact us
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <section className="bg-surface px-page py-section">
        <div className="mx-auto max-w-content">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.13em] text-brand-purple">
              Keep exploring
            </p>
            <h2 className="mt-2 font-display text-heading-lg font-bold text-brand-navy">
              Related advice
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Reveal key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="group block h-full rounded-2xl border border-border bg-background p-5 transition hover:-translate-y-1 hover:shadow-card sm:p-6"
                >
                  <span className="text-xs font-bold text-brand-purple-strong">
                    {item.category}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-brand-navy group-hover:text-brand-purple">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-purple-strong">
                    Read article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
