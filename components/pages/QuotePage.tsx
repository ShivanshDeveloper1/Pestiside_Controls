"use client";

import Link from "next/link";
import { ArrowRight, ClipboardCheck, MapPin, ShieldCheck } from "lucide-react";
import EnquiryForm from "@/components/pages/EnquiryForm";
import Reveal from "@/components/pages/Reveal";

export default function QuotePage() {
  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-brand-navy px-page pb-16 pt-14 text-white sm:pb-20 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-40 size-[32rem] rounded-full bg-brand-purple/25 blur-[110px]"
        />
        <div className="relative mx-auto max-w-content">
          <p className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-violet-200">
            <ClipboardCheck className="size-4 text-brand-red" aria-hidden="true" />
            Request a free quote
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[1.05] tracking-[-0.05em]">
            A clear starting point for pest control.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Tell us what you have noticed, where you are and how you would
            prefer to be contacted. A suitable service and next steps depend on
            the property and the issue.
          </p>
        </div>
      </section>

      <section className="px-page py-12 sm:py-16">
        <div className="mx-auto grid max-w-content gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start lg:gap-12">
          <Reveal>
            <EnquiryForm mode="quote" />
          </Reveal>
          <aside className="space-y-4 lg:pt-2">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <MapPin className="size-5 text-brand-purple" aria-hidden="true" />
                <h2 className="mt-4 font-display text-xl font-bold text-brand-navy">
                  London and nearby areas
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Add your area or postcode. Service availability can be
                  confirmed for your location.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <ShieldCheck className="size-5 text-brand-purple" aria-hidden="true" />
                <h2 className="mt-4 font-display text-xl font-bold text-brand-navy">
                  No guesswork or instant price promises
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Treatment options and costs can depend on the pest, activity
                  and property. This form gathers information for a considered
                  discussion rather than generating a made-up estimate.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="rounded-2xl bg-brand-purple p-6 text-white">
                <h2 className="font-display text-xl font-bold">
                  Want to ask a question first?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-violet-100">
                  Visit the contact page for service-area information and
                  general enquiries.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-white px-3.5 text-sm font-bold text-brand-purple-strong transition hover:bg-violet-50"
                >
                  Contact us
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </main>
  );
}
