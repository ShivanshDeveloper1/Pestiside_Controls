"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ARTICLES } from "@/components/blog/articleData";
import Reveal from "@/components/pages/Reveal";

const CATEGORIES = ["All articles", ...new Set(ARTICLES.map((item) => item.category))];

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const [category, setCategory] = useState("All articles");
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();
  const articles = useMemo(() => {
    const search = query.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const matchesCategory =
        category === "All articles" || article.category === category;
      const matchesQuery =
        !search ||
        `${article.title} ${article.description} ${article.category}`
          .toLowerCase()
          .includes(search);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-brand-navy px-page pb-16 pt-14 text-white sm:pb-20 sm:pt-20">
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
          <p className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-violet-200">
            <BookOpen className="size-4 text-brand-red" aria-hidden="true" />
            The Speedo Pest Control blog
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[1.05] tracking-[-0.05em]">
            Helpful guidance for a more pest-aware property.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Explore practical prevention ideas, common pest signs and
            professional advice for homes and businesses.
          </p>
        </motion.div>
      </section>

      <section className="px-page py-12 sm:py-16">
        <div className="mx-auto max-w-content">
          <div className="grid gap-4 rounded-3xl border border-border bg-surface p-4 shadow-soft sm:p-5 lg:grid-cols-[minmax(15rem,0.7fr)_1.3fr] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search articles</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pest advice"
                className="min-h-12 w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-text-primary outline-none placeholder:text-text-secondary/60 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
              />
            </label>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:justify-end">
              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`min-h-10 shrink-0 rounded-pill border px-4 text-xs font-bold transition sm:text-sm ${
                    category === item
                      ? "border-brand-purple bg-brand-purple/10 text-brand-purple-strong"
                      : "border-border bg-surface text-text-secondary hover:border-brand-purple/40 hover:text-brand-purple-strong"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-9 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.13em] text-brand-purple">
                Advice and insights
              </p>
              <h2 className="mt-2 font-display text-heading-lg font-bold text-brand-navy">
                Browse the latest articles
              </h2>
            </div>
            <span className="text-sm text-text-secondary">
              {articles.length} {articles.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {articles.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <Reveal key={article.slug}>
                  <motion.article
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-shadow hover:shadow-card"
                  >
                    <Link
                      href={`/blog/${article.slug}`}
                      aria-label={`Read article: ${article.title}`}
                      className="group block"
                    >
                      <div
                        role="img"
                        aria-label={article.imageAlt}
                        className="relative aspect-[16/10] overflow-hidden bg-brand-navy bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                        style={{
                          backgroundImage: `linear-gradient(180deg, transparent 55%, rgb(6 8 33 / 28%)), url("${article.image}")`,
                        }}
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <span className="self-start rounded-pill bg-brand-purple/10 px-3 py-1 text-xs font-bold text-brand-purple-strong">
                        {article.category}
                      </span>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="mt-4 font-display text-xl font-bold leading-snug text-brand-navy transition hover:text-brand-purple"
                      >
                        {article.title}
                      </Link>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                        {article.description}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-xs font-medium text-text-secondary">
                        <time dateTime={article.publishedAt}>
                          {formatDate(article.publishedAt)}
                        </time>
                        <span>{article.readingTime}</span>
                      </div>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="mt-4 inline-flex min-h-10 items-center gap-2 self-start text-sm font-bold text-brand-purple-strong hover:text-brand-red"
                      >
                        Read article
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-border bg-surface p-8 text-center">
              <p className="font-bold text-brand-navy">No matching articles</p>
              <p className="mt-2 text-sm text-text-secondary">
                Try a different search or choose another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory("All articles");
                  setQuery("");
                }}
                className="mt-4 text-sm font-bold text-brand-purple underline underline-offset-4"
              >
                Show all articles
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
